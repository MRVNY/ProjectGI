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

function convertExpToCSV(listJSON) {
    out = ""
    for(i=0;i<listJSON.length;i++){
        for(j=0;j<header.length;j++){
            if (listJSON[i].hasOwnProperty(header[j])){
                out += listJSON[i][header[j]] + ",";
            }
            else out += "NaN,"
        }
        out = out.replace(/.$/,"\n");
    }
    return out;
}

async function convertUserToCSV(JSONUserData) {
    const replacer = (key, value) => value === null ? '' : value;
    const header = Object.keys(JSONUserData[0]);
    
    if (!(await fetch(dirname + '/logs/userdata.csv')).ok){
        var csv = [
            header.join(','),
            ...JSONUserData.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
        ].join('\r\n');
    }
    else{
        var csv = [
            ...JSONUserData.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
        ].join('\r\n');
    }

    csv += '\n';

    return csv;
}

async function fileExist(filepath) {
    const response = await fetch(filepath);
    return response.ok;
}