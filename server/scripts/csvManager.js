function parseCSV(csv) {
    var lines = csv.split("\n");
    var result = [];
    var headers = lines[0].split(",");
    for (var i = 1; i < lines.length; i++) {
        var obj = {};
        var currentline = lines[i].split(",");
        for (var j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j];
        }
        result.push(obj);
    }
    return result;
}


function convertToCSV(jsonObj, userID) {
    var str = "userID,experimentID,";
    ex = Object.keys(jsonObj)
    headers = Object.keys(jsonObj[ex[0]]);
    for (var i = 0; i < headers.length; i++) {
        if (i < headers.length - 1) {
            str += headers[i] + ',';
        } else {
            str += headers[i];
        }
    }
    str += '\n';
    for (var i = 0; i < ex.length; i++) {
        for (var j = 0; j < jsonObj[ex[i]]["travelTime"].length; j++) {
            var line = userID + ',' + ex[i] + ',';
            for (var k = 0; k < headers.length - 1; k++) {
                line += jsonObj[ex[i]][headers[k]][j] + ',';
            }
            str += line + jsonObj[ex[i]]["targetSize"] + '\n';
        }
    }
    return str;
}

function exportCSVFile(jsonObj, fileTitle) {
    var csv = convertToCSV(jsonObj, Math.floor(Math.random() * 100));

    var exportedFilenmae = fileTitle + '.csv' || 'export.csv';

    var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob, exportedFilenmae);
    } else {
        var link = document.createElement("a");
        if (link.download !== undefined) { // feature detection
            // Browsers that support HTML5 download attribute
            var url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", exportedFilenmae);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
}