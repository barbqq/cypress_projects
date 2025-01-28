class HttpUtils{
    sendRequest(options = {}, respKey){
        return cy.request({
            method : options.method,
            url: options.url,
            failOnStatusCode: false
        }).then(function(response){
            this[respKey] = response
        })
    }
}

export default new HttpUtils()