const { GoogleSpreadsheet } = require('google-spreadsheet');

const spreadsheetId = '1rvoicuZ7oOyIwIyYyiQcMp3HMIPIoNXG5nvkfWptOmg';
const doc = new GoogleSpreadsheet(spreadsheetId);

async function testGettingSpreadsheet() {
    await doc.useServiceAccountAuth(require('../cfg/google-auth.json'));

    await doc.loadInfo();
    console.log(doc);
}

testGettingSpreadsheet();

