const axios = require('axios');
// const path = require('path');
// const fs = require('fs');

// after(() =>{
//     const reportPath = path.join(__dirname, '..', 'reports', 'report.json');
//     fs.readFile(reportPath, 'utf8', (err, data) => {
//         if (err) {
//             console.error('Error reading report file:', err);
//             return;
//         }
//
//         // Parse the report data (if necessary, here assuming it's JSON)
//         // let reportData = JSON.parse(data);
//
//         let reportData = {
//             "kaartlaagid": 4067,
//             "location": "",
//             "content": "sadfdsa",
//             "sender": "1@1.com",
//             "permalinkUrl": ""
//         }
//
//         // Send the API request
//         axios.post('https://atlas-test.apps.geodan.nl/configuration/api/v1/melding/email/', reportData)
//             .then(response => {
//                 console.log('Report successfully sent:', response.data);
//             })
//             .catch(error => {
//                 console.error('Error sending report:', error);
//             });
//     });
// })

// after(() =>{
//     const reportData = {
//         "projectId": 1,
//         "suite": "From_postman_3",
//         "format": "Cucumber",
//         "environment": "Test"
//     }
//     axios.post('http://localhost:8888/api/import',reportData)
//         .then(response => {
//             cy.log(response.data)
//         })
//         .catch(error => {
//             cy.log(error)
//         })
// })