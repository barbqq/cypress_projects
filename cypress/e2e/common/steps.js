import {Before, Given, When} from "@badeball/cypress-cucumber-preprocessor";
import UploadUtils from "../../utils/uploadUtils";
import CommonUtils from "../../utils/commonUtils";
import HttpUtils from "../../utils/httpUtils";


When("Testing",function(){
    cy.log("working")
})

When("I expect that first string value {string} should be equal to second string value {string}",function(firstValue,secondValue){
    expect(firstValue).to.be.equal(secondValue)

})

When("I expect that first number value {int} should be equal to second number value {int}",function(firstValue,secondValue){
    expect(firstValue).to.be.equal(secondValue)

})

When("I send a GET request to save response code as {string}",function(respKey){
        HttpUtils.sendRequest({method: "GET", url:"https://atlas-acc.apps.geodan.nl/public-api/v3/viewers"},respKey)
})

When("the status code of {string} is {string}",function(key,respCode){
    expect(this[key].status).to.equal(Number(respCode),`Status code should be ${respCode}`)
})

When("I import test result",function(){
    const url = 'http://localhost:8888/api/import'
    const reportData = {
        "projectId": 1,
        "suite": "From_postman_3",
        "format": "Cucumber",
        "environment": "Test"
    }
    // const urlWithParams = UploadUtils.addQueryParams(url, reportData);
    // cy.log(urlWithParams)
    // const auth = CommonUtils.getBaseAuth("project:1","8fb4d48e-76e4-44d9-b79c-3ba28f1a04de1722083221408")
    // cy.log(auth)
    UploadUtils.uploadFile(url,'report.json',"8fb4d48e-76e4-44d9-b79c-3ba28f1a04de1722083221408","project:1",reportData)
        .then(function(response) {
            cy.log(response.code)
        })
})

When("I log report file",function(){
    cy.fixture("report.json").then(jsonData =>{
        cy.log(jsonData)
    })
})

Before(function(){
    cy.visit("/")
})

When("I visit site main page",function (){
    cy.visit("https://statics.teams.cdn.office.net/evergreen-assets/safelinks/1/atp-safelinks.html")
})

When("I click Add element button",function(){
    cy.get("button[onclick='addElement()']")
        .click();
})

When("I click delete element button",function(){
    cy.get("button[onclick='deleteElement()']")
        .click();
})

When("Delete button state should {string}",function(state){
    cy.get("button[onclick='deleteElement()']")
        .should(state);
})

When("I save delete button html as {string}",function(alias){
    cy.get("button[onclick='deleteElement()']")
        .invoke('prop', 'outerHTML')
        .then((outerHtml) => {
            cy.log(outerHtml);
            cy.wrap(outerHtml).as(alias)
        });
})

When("I re-insert the saved delete button into #elements from {string}", function(alias) {
    cy.get(`@${alias}`).then((savedOuterHtml) => {
        cy.get('#elements').then(($container) => {
            // $container - это jQuery-объект
            $container.append(savedOuterHtml);
        });
    });
});

before(() => {
    cy.intercept({ resourceType: /xhr|fetch/ }, { log: false });
});

