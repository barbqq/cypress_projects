class CommonUtils{
    getBaseAuth(username, password){
        // return Buffer.from(`${username}:${password}`).toString("base64")
        return btoa(`${username}:${password}`)
    }
}

export default new CommonUtils()