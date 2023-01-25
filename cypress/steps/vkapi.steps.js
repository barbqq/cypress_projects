import HttpMethod from 'http-method-enum';
import VKEndpoints from '../fixtures/vkendpoints.json'
//import FormData from "form-data";
//import {FormData} from "formdata-node"
import axios from 'axios';

class VkApiSteps{

    static createPost(message){
        let params = this.commonParams()
        params.message = message
        return cy.request({
            method: HttpMethod.POST,
            url: VKEndpoints.vk_api_url + VKEndpoints.create_post_path,
            qs : params
        })
    }

    static addComment(message,postId){
        let params = this.commonParams()
        params.message = message
        params.post_id = postId
        return cy.request({
            method: HttpMethod.POST,
            url: VKEndpoints.vk_api_url + VKEndpoints.create_comment_path,
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
            url: VKEndpoints.vk_api_url + VKEndpoints.check_likes_path,
            qs : params
        })
    }

    static deletePost(postId){
        let params = this.commonParams()
        params.post_id = postId
        return cy.request({
            method: HttpMethod.POST,
            url: VKEndpoints.vk_api_url + VKEndpoints.delete_post_path,
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

    static updateWallPost(text,postId){
        let params = this.commonParams()
        params.post_id = postId
        params.message = text
        return cy.request({
            method: HttpMethod.POST,
            url: VKEndpoints.vk_api_url + VKEndpoints.edit_wall_post_path,
            qs: params
        })
    }



    static getFormData(){
        return cy.fixture('expected.jpg','base64')
            .then((base64)=>{ return Cypress.Blob.base64StringToBlob(base64,'image/jpeg')})

    }

    static uploadPhoto(){
        // this.getFormData().then((blob)=>{
        //     const formData = new FormData()
        //     formData.set('photo',blob)
        //     cy.log(formData.get('photo').toString())
        // })
        // cy.fixture('expected.jpg','base64')
        //     .then((base64)=>{Cypress.Blob.base64StringToBlob(base64)})
        //     .then((blob)=>{
        //        const formData = new FormData()
        //        formData.set('photo',blob)
        //        cy.log(formData.get('photo'))
        //     })


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
            cy.intercept('POST',url).as('hoho')
            this.getFormData()
                .then((blob) => {
                    const data = new FormData();
                    const xhr = new XMLHttpRequest();
                    data.set('photo',blob,'expected.jpg')
                    xhr.open('POST', url);
                    xhr.setRequestHeader("Content-Type", `multipart/form-data`);
                    xhr.send(data);
                });
            cy.wait('@hoho').then(resp=>{
                cy.log(resp)
            })
        })
    }

    static uploadPhotoFour(){
        this.getWallPhohoUploadUrl().then(resp=>{
            let url = resp.body.response.upload_url
            cy.intercept('POST',url).as('hoho')
            cy.fixture('expected.jpg','base64')
                .then((file) => {
                    const data = new FormData();
                    const xhr = new XMLHttpRequest();
                    data.set('photo',file)
                    xhr.open('POST', url);
                    xhr.setRequestHeader("Content-Type", `multipart/form-data`);
                    xhr.send(data);
                });
            cy.wait('@hoho').then(resp=>{
                cy.log(resp)
            })
        })
    }

    static uploadPhotoThree(){
        this.getWallPhohoUploadUrl().then(resp=>{
            let url = resp.body.response.upload_url
        cy.fixture('expected.jpg','binary').then((file)=>{return Cypress.Blob.binaryStringToBlob(file,'image/jpeg')})
            .then((blob)=> {
                let formData = new FormData()
                formData.set('photo',blob)
                cy.request({
                    url: url,
                    method: 'POST',
                    headers: {
                        'Content-Type':'multipart/form-data'
                    },
                    body: formData
                }).then((resp)=>{
                    cy.log(resp.body)
                })
            })
        })
    }

    static uploadPhotoFifth(){
        this.getWallPhohoUploadUrl().then(resp=>{
            let url = resp.body.response.upload_url
            cy.fixture('expected.jpg','binary').then((file) =>{
                const blob = Cypress.Blob.binaryStringToBlob(file,'image/jpeg')
                const formData = new FormData()
                formData.set('photo',blob)
                cy.log(formData.get('photo').toString())
                cy.request({
                    url: url,
                    method: 'POST',
                    // headers: {
                    //     'Content-Type':'multipart/form-data'
                    // },
                    body: formData
                }).then((resp)=>{
                    cy.log(resp.body)
                    const test = String.fromCharCode.apply(null, new Uint8Array(resp.body))
                    cy.log(test)
                })
            })

        })
    }

    static uploadPhotoAxios(){
        this.getWallPhohoUploadUrl().then((resp) =>{
            let url = resp.body.response.upload_url
            cy.readFile("cypress/fixtures/expected.jpg",'base64').then(async (file) => {
                const formData = new FormData()
                const blob = Cypress.Blob.base64StringToBlob(file)
                formData.append('photo', file)
                await axios.post(url, formData).then(resp => {
                    cy.log(resp.data)
                })
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