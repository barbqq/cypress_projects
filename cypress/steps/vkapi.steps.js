import HttpMethod from 'http-method-enum';
import VKEndpoints from '../fixtures/vkendpoints.json'
import testData from '../fixtures/testdata.json'

class VkApiSteps{

    static createPost(message){
        let params = this.commonParams()
        params.message = message
        return cy.request({
            method: HttpMethod.POST,
            url: this.formUrl(VKEndpoints.create_post_path),
            qs : params
        })
    }

    static addComment(message,postId){
        let params = this.commonParams()
        params.message = message
        params.post_id = postId
        return cy.request({
            method: HttpMethod.POST,
            url: this.formUrl(VKEndpoints.create_comment_path),
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
            url: this.formUrl(VKEndpoints.check_likes_path),
            qs : params
        })
    }

    static deletePost(postId){
        let params = this.commonParams()
        params.post_id = postId
        return cy.request({
            method: HttpMethod.POST,
            url: this.formUrl(VKEndpoints.delete_post_path),
            qs : params
        })
    }

    static getWallPhotoUploadUrl(){
        let params = this.commonParams()
        return cy.request({
            method: HttpMethod.POST,
            url: this.formUrl(VKEndpoints.get_wall_upload_path),
            qs: params
        })
    }

    static updatePost(text,photoId,postId){
        let params = this.commonParams()
        params.post_id = postId
        params.message = text
        params.attachments = VKEndpoints.type_of_upload_file + VKEndpoints.owner_id + "_" + photoId
        return cy.request({
            method: HttpMethod.POST,
            url: this.formUrl(VKEndpoints.edit_wall_post_path),
            qs: params
        })
    }

    static updateWallPost(randomString,postId){
        return this.getWallPhotoUploadUrl().then((resp)=>{
            let url = resp.body.response.upload_url
            cy.customerUploadFile(url,testData.expected_image_name,testData.expected_image_name,testData.mime_type)
                .then(resp=>{
                    this.saveUploadWallPhoto(resp).then((subResp)=>{
                        let photoId = subResp.body.response[0].id
                        this.updatePost(randomString,photoId,postId)
                    })
                })
        })
    }

    static saveUploadWallPhoto(uploadPhoto){
        let params = this.commonParams()
        params.photo = uploadPhoto.photo
        params.server = uploadPhoto.server
        params.hash = uploadPhoto.hash
        return cy.request({
            method: HttpMethod.POST,
            url: this.formUrl(VKEndpoints.save_wall_photo_path),
            qs: params
        })

    }

    static commonParams(){
        return {
            access_token: VKEndpoints.token,
            v: VKEndpoints.api_version,
            owner_id: VKEndpoints.owner_id
        };
    }

    static formUrl(endpoint){
        return VKEndpoints.vk_api_url + endpoint
    }
}

export default VkApiSteps