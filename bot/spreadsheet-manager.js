const { GoogleSpreadsheet } = require('google-spreadsheet');

// Info for the document we are accessing
const spreadsheetId = '1W_MEdfZjn1JqKJ47eTjqXING2W4DMKozCV5Lk0T4AzE';
const doc = new GoogleSpreadsheet(spreadsheetId);

// Variables to hold info we will be searching through
let trackRows = [];
let carPackRows = [];

/**
 * Fetches the spreadsheet and loads the row info 
 */
const loadSpreadsheetInfo = async function loadSpreadsheetInfo() {
    await doc.useServiceAccountAuth(require('../cfg/google-auth.json'));

    await doc.loadInfo();

    let carPackSheet = doc.sheetsByIndex[1];
    let trackSheet = doc.sheetsByIndex[2];

    trackRows = await trackSheet.getRows();
    carPackRows = await carPackSheet.getRows();

    console.log('Spreadsheet info loaded');
}

/**
 * Executes a search based on the command given
 * 
 * @param {modType: string, searchTerm: string} command 
 */
const search = (command) => {
    let results = [];

    sheetToSearch = (command.modType === 'track' ? trackRows : carPackRows);

    for (let row of sheetToSearch) {
        if (row.searchTerms.toLowerCase().indexOf(command.searchTerm.toLowerCase()) !== -1) {
            results.push(row);
        }
    }

    return results;
};

let exportedMethods = {
    loadSpreadsheetInfo: loadSpreadsheetInfo,
    search: search
};

exports.methods = exportedMethods;