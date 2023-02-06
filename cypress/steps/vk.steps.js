import CommonUtils from "../utils/common.util.js";
import StatusCodes from 'http-status-codes';
import VkApiSteps from "./vkapi.steps.js";
import { locators} from "../resources/locators.js";
import { parameterizedLocators} from "../resources/parametrized.loc.js";

class VkSteps{
    static post = {}

    static loginToMyPage(){
        cy.fixture("testdata").then((data) => {
            cy.xpath(locators.mainPageLoc).should("be.visible")
            cy.xpath(locators.phoneInputLocator).type(data.login)
            cy.xpath(locators.signInBtnLoc).click()
            cy.xpath(locators.loginPageLoc).should("be.visible")
            cy.xpath(locators.passwordInputLoc).type(data.password)
            cy.xpath(locators.continueBtnLoc).click()
            cy.xpath(locators.newsPageLoc).should("be.visible")
            cy.xpath(locators.myProfileBtnLoc).click()
            cy.xpath(locators.myProfilePageLoc).should("be.visible")
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
            cy.xpath(parameterizedLocators.post(randomString)).should("be.visible")
            cy.xpath(parameterizedLocators.post(randomString,locators.parentDiv)).invoke("attr",data.post_id_attr)
                .should('contain',data.owner_id)
        })
    }


    static editPost(){
        cy.fixture('testdata').then((data)=>{
            let randomString = CommonUtils.generateRandomString(data.random_string_len)
            this.post.message = randomString
            VkApiSteps.updateWallPost(randomString,this.post.post_id)
            cy.xpath(parameterizedLocators.post(randomString)).should("be.visible")
        })
        this.compareImages()
    }

    static addComment(){
        cy.log("Adding comment")
        cy.fixture("testdata").then((data) => {
            let randomStringComment = CommonUtils.generateRandomString(data.random_string_len)
            VkApiSteps.addComment(randomStringComment,this.post.post_id).then((resp) => {
                expect(resp.status).to.eq(StatusCodes.OK)
            })
            cy.xpath(parameterizedLocators.post(this.post.message,locators.checkCommentLoc))
                .click()
            cy.xpath(parameterizedLocators.post(randomStringComment,locators.parentDiv)).invoke("attr",data.post_id_attr)
                .should('contain',data.owner_id)
        })
    }

    static addLike(){
        cy.fixture("testdata").then((data) => {
            cy.xpath(parameterizedLocators.post(this.post.message,locators.clickLikeLoc))
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
            cy.xpath(parameterizedLocators.post(this.post.message)).should('not.be.visible')
        })
    }

    static compareImages(){
        cy.fixture("testdata").then((data) => {
            cy.xpath(parameterizedLocators.post(this.post.message,locators.linkParentDiv))
                .click()
            cy.xpath(locators.imgLoc).invoke("attr",data.image_attr)
                .then((url) => {
                    cy.log(url)
                    cy.downloadFile(url,data.fixture_folder,data.actual_image_name)
                })
            cy.xpath(locators.closeBtnLoc).click()
            cy.task("compareImages",{
                actualPath: data.actual_image_path,
                expectedPath: data.expected_image_path
            }).then((equal)=>{
                expect(equal).to.be.true
            })
        })
    }
}

export default VkSteps;