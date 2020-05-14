const { GoogleSpreadsheet } = require('google-spreadsheet');

// Info for the document we are accessing
const spreadsheetId = '1W_MEdfZjn1JqKJ47eTjqXING2W4DMKozCV5Lk0T4AzE';
const doc = new GoogleSpreadsheet(spreadsheetId);

// Variables to hold info we will be searching through
let trackRows = [];
let carPackRows = [];

const loadSpreadsheetInfo = async function loadSpreadsheetInfo() {
    await doc.useServiceAccountAuth(require('../cfg/google-auth.json'));

    await doc.loadInfo();

    let carPackSheet = doc.sheetsByIndex[1];
    let trackSheet = doc.sheetsByIndex[2];

    trackRows = await trackSheet.getRows();
    carPackRows = await carPackSheet.getRows();

    console.log('Spreadsheet info loaded');
}

const searchForTrack = (searchString) => {
    let result = '';

    for (let row of trackRows) {
        if (row.trackName.indexOf(searchString) !== -1) {
            result = row;
            break;
        }
    }

    return result;
};

let exportedMethods = {
    loadSpreadsheetInfo: loadSpreadsheetInfo,
    searchForTrack: searchForTrack
};

exports.methods = exportedMethods;