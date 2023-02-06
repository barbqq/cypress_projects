import CommonUtils from "../utils/common.util.js";
import HttpMethod from "http-method-enum";
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
require('cypress-downloadfile/lib/downloadFileCommand')


Cypress.Commands.add('customerUploadFile', function(url, file,fileName,fileType) {
    return CommonUtils.customerUploadFile(url, file, fileName, fileType);
});

Cypress.Commands.add("requestFormXHR",(url,formData) =>{
    return cy.intercept({
        method: "POST",
        url: url
    }).as("formRequest").window()
        .then((win) => {
            let xhr = new win.XMLHttpRequest()
            xhr.open('POST',url)
            xhr.send(formData)
        }).wait("@formRequest")
})

Cypress.Commands.add("requestFormXHRNoWin",(url,formData) =>{
    return cy.intercept({
        method: "POST",
        url: url
    }).as("formRequest").window()
        .then((win) => {
            let xhr = new win.XMLHttpRequest()
            xhr.open('POST',url)
            xhr.send(formData)
        }).wait("@formRequest")
})