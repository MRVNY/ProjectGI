function parseCSV(csv) {
    var test = "";
    test.split
    var lines = csv.split(/\r\n|\n/);
    var result = [];
    var headers = lines[0].split(",");
    console.log(headers);
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

function convertToCSV(listJSON) {
    out = ""
    for(i=0;i<listJSON.length;i++){
        for(j=0;j<header.length;j++){
            if (listJSON[i].hasOwnProperty(header[j])){
                out += listJSON[i][header[j]] + ",";
            }
            else out += "-1,"
        }
        out = out.replace(/.$/,"\n");
    }
    return out;
}