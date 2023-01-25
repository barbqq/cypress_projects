import HttpMethod from 'http-method-enum';
import VKEndpoints from '../fixtures/vkendpoints.json'

class VkApiSteps{

    static createPost(message){
        let params = this.commonParams()
        params.message = message
        return cy.request({
            method: HttpMethod.POST,
            url: VKEndpoints.create_post_path,
            qs : params
        })
    }

    static addComment(message,postId){
        let params = this.commonParams()
        params.message = message
        params.post_id = postId
        return cy.request({
            method: HttpMethod.POST,
            url: VKEndpoints.create_comment_path,
            qs : params
        })
    }

    static checkLikes(ownerId,type,itemId){
        let params = this.commonParams()
        params.user_id = ownerId
        params.type = type
        params.item_id = itemId
        return cy.request({
            method: HttpMethod.POST,
            url: VKEndpoints.check_likes_path,
            qs : params
        })
    }

    static deletePost(postId){
        let params = this.commonParams()
        params.post_id = postId
        return cy.request({
            method: HttpMethod.POST,
            url: VKEndpoints.delete_post_path,
            qs : params
        })
    }

    static getWallPhohoUploadUrl(){
        let params = this.commonParams()
        return cy.request({
            method: HttpMethod.POST,
            url: VKEndpoints.vk_api_url + VKEndpoints.get_wall_upload_path,
            qs: params
        })
    }

    static uploadPhoto(){
        this.getWallPhohoUploadUrl().then(resp=>{
            let url = resp.body.response.upload_url
            cy.customerUploadFile(url,'expected.jpg','expected.jpg','image/jpeg')
                .then(resp=>{
                    cy.log(resp)
                })
        })
    }

    static uploadPhotoTwo(){
        this.getWallPhohoUploadUrl().then(resp=>{
            let url = resp.body.response.upload_url
            const data = new FormData();
            cy.intercept('POST',url).as('hoho')
            cy.fixture('expected.jpg', "base64")
                .then((binary) => Cypress.Blob.base64StringToBlob(binary,'image/jpg'))
                .then((blob) => {
                    const xhr = new XMLHttpRequest();
                    data.set("photo", blob);
                    cy.log(data.get('photo').toString())
                    xhr.open('POST', url);
                    xhr.setRequestHeader("Content-Type", `multipart/form-data`);
                    xhr.send(data);
                });
            cy.wait('@hoho').then(resp=>{
                cy.log(resp)
            })
        })
    }

    static commonParams(){
        return {
            access_token: VKEndpoints.token,
            v: VKEndpoints.api_version,
            owner_id: VKEndpoints.owner_id
        };
    }
}

export default VkApiSteps