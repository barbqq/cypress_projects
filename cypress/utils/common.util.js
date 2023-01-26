import HttpMethod from "http-method-enum";

class CommonUtils{

    static generateRandomString(length){
        const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let result = "";
        for ( let i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    static formRequest(url, formData) {
        const request = new XMLHttpRequest();
        request.open(HttpMethod.POST, url, false);
        request.send(formData);
        return JSON.parse(request.response);
    }

    static customerUploadFile(url, file, fileName, fileType) {
        return cy.fixture(file,'base64').then((binary) => {
            return Cypress.Blob.base64StringToBlob(binary,fileType)
        })
            .then((blob) => {
                const formData = new FormData();
                formData.set('file', blob, fileName);
                return CommonUtils.formRequest(url, formData);
            })
    }
}

export default CommonUtils;