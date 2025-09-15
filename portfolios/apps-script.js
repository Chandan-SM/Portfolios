function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.openById('YOUR_SHEET_ID').getActiveSheet();
    
    sheet.appendRow([
      new Date(),
      data.name,
      data.email
    ]);
    
    return ContentService.createTextOutput('Success');
  } catch {
    return ContentService.createTextOutput('Error');
  }
}
