import Jimp from 'jimp';
import fs from 'fs';


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
}

export default CommonUtils;