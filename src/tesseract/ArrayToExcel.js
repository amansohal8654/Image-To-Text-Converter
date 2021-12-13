export const arrayToExcel = {
    convertArrayToTable : async (lines, fileName) => {
        debugger;
        //use keys from the first array object to form table column headers
        const tableHeaders = `<tr>${lines[0].text.split(' ').map(text => `<td>${text}</td>`).join('')}</tr>`;
        lines.shift();
        //now loop through all array objects to form table rows
        const tableRows = lines.map(obj =>
           [`<tr>
              ${obj.text.split(' ').map(text => `<td>${text === null ||    text === '' ? '' : text}</td>`).join('')}
           <tr/>`]).join('');
        const table = `<table>${tableHeaders}${tableRows}</table>`.trim();
            console.log(table);
     
        const xmlTable = createXMLTable(table, fileName);
        const downloadURL = createFileUrl(xmlTable);
        downloadFile(downloadURL, fileName);
     }
};

const createXMLTable = (table, fileName) => {
    const xmlTable = `
          <html xmlns:o="urn:schemas-microsoft-com:office:office xmlns:x="urn:schemas-microsoft-com:office:excel"
         xmlns="http://www.w3.org/TR/REC-html40"
          >
             <meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8"/>
             <head>
                <xml>
                  <x:ExcelWorkbook>
                      <x:ExcelWorksheets>
                          <x:ExcelWorksheet>
                              <x:Name>${fileName}</x:Name>
                              <x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions>
                          </x:ExcelWorksheet>
                      </x:ExcelWorksheets>
                  </x:ExcelWorkbook>
                </xml>
             </head>
             <body>
               ${table}
             </body>
          </html> `
          return xmlTable;
      }

    const createFileUrl = (xmlTable) => {
        const tableBlob = new Blob([xmlTable], {type: 'application/vnd.ms-excel;base64,' });
        const downloadURL = URL.createObjectURL(tableBlob);
        return downloadURL;
    }

    const downloadFile = (downloadURL, fileName) => {
        const downloadLink = document.createElement('a');
        document.body.appendChild(downloadLink);
        downloadLink.download = fileName;
        downloadLink.href = downloadURL;
        downloadLink.click();
    }