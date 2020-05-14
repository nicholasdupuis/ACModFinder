const { GoogleSpreadsheet } = require('google-spreadsheet');

const spreadsheetId = '1W_MEdfZjn1JqKJ47eTjqXING2W4DMKozCV5Lk0T4AzE';
const doc = new GoogleSpreadsheet(spreadsheetId);

async function loadSpreadsheetInfo() {
    await doc.useServiceAccountAuth(require('../cfg/google-auth.json'));

    await doc.loadInfo();

    let carPackSheet = doc.sheetsByIndex[1];
    let trackSheet = doc.sheetsByIndex[2];

    const rows = await trackSheet.getRows();
    
    console.log(rows[0].trackName);
    console.log(rows[0].link)
}

loadSpreadsheetInfo();

