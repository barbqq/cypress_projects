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

    static commonParams(){
        return {
            access_token: VKEndpoints.token,
            v: VKEndpoints.api_version,
            owner_id: VKEndpoints.owner_id
        };
    }
}

export default VkApiSteps