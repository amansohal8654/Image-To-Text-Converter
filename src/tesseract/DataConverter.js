export const DataConverter = {
    convertArrayToTable : async (lines, fileName) => {
        //use keys from the first array object to form table column headers
        const tableRows = lines.map(line => `<tr>${line.text.split(' ').map(text => `<td>${text}</td>`).join('')}</tr>`).join('');
        const table = `<table>${tableRows}</table>`.trim();
        const xmlTable = createXMLTable(table, fileName);
        const downloadURL = createFileUrl(xmlTable, 'application/vnd.ms-excel;base64,');
        downloadFile(downloadURL, fileName);
     },

     convertTextToDocx : async (data, fileName) => {
        const downloadURL = createFileUrl(data, 'application/msword;base64,');
        downloadFile(downloadURL, fileName);
     },

     convertTextToExcel : async (data, fileName) => {
        const downloadURL = createFileUrl(data, 'application/vnd.ms-excel;base64,');
        downloadFile(downloadURL, fileName);
     }
    //  convertTextToPdf : async (data, fileName) => {
    //     let byteArray = new Uint8Array(data)
    //     const downloadURL = createFileUrl(byteArray, "application/pdf");
    //     downloadFile(downloadURL, fileName);
    //  }
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

    const createFileUrl = (data, type) => {
        const blobData = new Blob([data], {type: type});
        const downloadURL = URL.createObjectURL(blobData);
        return downloadURL;
    }

    const downloadFile = (downloadURL, fileName) => {
        const downloadLink = document.createElement('a');
        document.body.appendChild(downloadLink);
        downloadLink.download = fileName;
        downloadLink.href = downloadURL;
        downloadLink.click();
    }