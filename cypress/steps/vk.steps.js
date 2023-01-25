import CommonUtils from "../utils/common.util.js";
import StatusCodes from 'http-status-codes';
import VkApiSteps from "./vkapi.steps.js";

class VkSteps{
    static post = {}

    static mainPageLoc = "//div[@class=\"VkIdForm__header\"]";
    static signInBtnLoc = "//button[contains(@class,'VkIdForm__signInButton')]";
    static phoneInputLocator = "//input[@name='login']"

    static loginPageLoc = "//div[@class='vkc__StepInfo__body']"
    static continueBtnLoc = "//button[@type='submit']"
    static passwordInputLoc = "//input[@name='password']"

    static newsPageLoc = "//div[@id='main_feed']"
    static myProfileBtnLoc = "//li[@id='l_pr']"
    static myProfilePageLoc = "//div[contains(@class,'ProfileActions')]"
    static postText;
    static wallPostLoc = `//div[contains(text(),'${this.postText}')]`


    static loginToMyPage(){
        cy.fixture("testdata").then((data) => {
            cy.xpath(this.mainPageLoc).should("be.visible")
            cy.xpath(this.phoneInputLocator).type(data.login)
            cy.xpath(this.signInBtnLoc).click()
            cy.xpath(this.loginPageLoc).should("be.visible")
            cy.xpath(this.passwordInputLoc).type(data.password)
            cy.xpath(this.continueBtnLoc).click()
            cy.xpath(this.newsPageLoc).should("be.visible")
            cy.xpath(this.myProfileBtnLoc).click()
            cy.xpath(this.myProfilePageLoc).should("be.visible")
        })
    }

    static createPost(){
        cy.fixture("testdata").then((data) => {
            let randomString = CommonUtils.generateRandomString(data.random_string_len)
            this.post.message = randomString;
            cy.log(this.post.message)
            VkApiSteps.createPost(randomString).then((resp) =>{
                expect(resp.status).to.eq(StatusCodes.OK)
                cy.log(resp.body)
                this.post.post_id = resp.body.response.post_id
                cy.log(this.post.post_id)
            })
            cy.xpath(`//div[contains(text(),'${randomString}')]`).should("be.visible")
            cy.xpath(`//div[contains(text(),'${randomString}')]//parent::div`).invoke("attr",data.post_id_attr)
                .should('contain',data.owner_id)
        })
    }

    static addComment(){
        cy.log("Adding comment")
        cy.fixture("testdata").then((data) => {
            let randomStringComment = CommonUtils.generateRandomString(data.random_string_len)
            VkApiSteps.addComment(randomStringComment,this.post.post_id).then((resp) => {
                expect(resp.status).to.eq(StatusCodes.OK)
            })
            cy.xpath(`//div[contains(text(),'${this.post.message}')]//parent::div//parent::div//parent::div//span[@class='js-replies_next_label']`)
                .click()
            cy.xpath(`//div[contains(text(),'${randomStringComment}')]//parent::div`).invoke("attr",data.post_id_attr)
                .should('contain',data.owner_id)
        })
    }

    static addLike(){
        cy.fixture("testdata").then((data) => {
            cy.xpath(`//div[contains(text(),'${this.post.message}')]//parent::div//parent::div//parent::div//div[contains(@class,'PostButtonReactions--post')]`)
                .click()
            VkApiSteps.checkLikes(data.owner_id,'post',this.post.post_id).then((resp) => {
                expect(resp.status).to.eq(StatusCodes.OK)
                expect(resp.body.response.liked).to.eq(data.number_of_likes)
            })
        })
    }

    static deletePost(){
        cy.fixture("testdata").then((data) => {
            VkApiSteps.deletePost(this.post.post_id).then((resp) => {
                expect(resp.status).to.eq(StatusCodes.OK)
            })
            cy.xpath(`//div[contains(text(),'${this.post.message}')]`).should('not.be.visible')
        })
    }

    static editPost(){
        VkApiSteps.uploadPhotoTwo()
    }


}

export default VkSteps;