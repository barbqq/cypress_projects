import Jimp from 'jimp';
import fs from 'fs';
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

    // static async createImageFromUrl(url,localPath){
    //     const response = await fetch(url);
    //     const buffer = await response.buffer();
    //     fs.writeFile(localPath, buffer, () =>
    //         console.log('finished downloading!'));
    // }

    static async areEqual(actualPath,expectedPath) {
        const actual = await Jimp.read(actualPath);
        const expected = await Jimp.read(expectedPath);
        const pixelDifference =  Jimp.diff(actual, expected);
        const distance =  Jimp.distance(actual, expected);
        return distance < 0.20 || pixelDifference < 0.20;
    }

    static formRequest(url, formData) {
        const request = new XMLHttpRequest();
        request.open(HttpMethod.POST, url, false);
        request.setRequestHeader("Content-Type", "multipart/form-data");
        request.send(formData);
        return JSON.parse(request.response);
    }

    static customerUploadFile(url, file, fileName, fileType) {
        return cy.fixture(file,'base64').then((binary) => {
            return Cypress.Blob.base64StringToBlob(binary,fileType)
        })
            .then((blob) => {
                const formData = new FormData();
                formData.set('photo', blob, fileName);
                return CommonUtils.formRequest(url, formData);
            })
    }
}

export default CommonUtils;