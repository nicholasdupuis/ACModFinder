const { GoogleSpreadsheet } = require('google-spreadsheet');

const doc = new GoogleSpreadsheet('1rvoicuZ7oOyIwIyYyiQcMp3HMIPIoNXG5nvkfWptOmg');

async function testGettingSpreadsheet() {
    await doc.useServiceAccountAuth(require('../cfg/google-auth.json'));

    await doc.loadInfo();
    console.log(doc.title);
}

testGettingSpreadsheet();

