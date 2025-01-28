import CommonUtils from "./commonUtils";
import HTTPMethod from "http-method-enum";
class UploadUtils{
    addQueryParams(url, params) {
        const urlObj = new URL(url);
        Object.keys(params).forEach(key => urlObj.searchParams.append(key, params[key]));
        return urlObj.toString();
    }


    formRequest(url, formData,token,userName,queryParams = {}) {
        const urlWithParams = this.addQueryParams(url, queryParams);
        const request = new XMLHttpRequest();
        request.open(HTTPMethod.POST, urlWithParams, false);
        request.setRequestHeader("Authorization",`Basic ${CommonUtils.getBaseAuth(userName,token)}`)
        // request.setRequestHeader("Content-Type",`multipart/form-data`)
        request.setRequestHeader("accept",`application/json`)
        request.send(formData);
        return JSON.parse(request.response);
    }

    // uploadFile(url,file,token,projectId,queryParams) {
    //     return cy.fixture(file,'base64').then((binary) => {
    //         return Cypress.Blob.base64StringToBlob(btoa(JSON.stringify(binary)),"application/json")
    //     })
    //         .then((blob) => {
    //             const formData = new FormData();
    //             console.log(blob)
    //             formData.append('uploadFile0', blob);
    //             return this.formRequest(url,formData,token,projectId,queryParams);
    //         })
    // }
    // uploadFile(url, file, token, userName, queryParams = {}) {
    //     return cy.fixture(file).then((jsonData) => {
    //         return this.formRequest(url, jsonData, token, userName, queryParams);
    //     });
    // }

    uploadFile(url, file, token, projectId, queryParams = {}) {
        return cy.fixture(file).then((jsonData) => {
            const blob = new Blob([JSON.stringify(jsonData)], { type: "application/json" });
            const formData = new FormData();
            formData.append('uploadFile0', blob, "fileName");
            return this.formRequest(url, formData, token, projectId, queryParams);
        });
    }

}

export default new UploadUtils()