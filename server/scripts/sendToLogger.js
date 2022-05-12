// AJAX function to send several experiment's trial results to the logger

// How many trials should a block of trials to send contain
var blockSize = {
    0 : 16,
    1 : 12,
    2 : 24,
    3 : 24
}

function formatParams(params) {
    return "?" + Object
        .keys(params)
        .map(function(key) {
            return key + "=" + encodeURIComponent(params[key])
        })
        .join("&")
}

function checkLogging(cpt, data, participantID, experimentType) {
    if ((cpt != 0 && (cpt + 1) % blockSize[experimentType] == 0) || cpt == data.length - 1) {
        var indexStart = blockSize[experimentType] * Math.floor(cpt / blockSize[experimentType]);
        //console.log(data);

        var slicedData = data.slice(indexStart, cpt + 1);
        console.log(slicedData, indexStart, cpt + 1);
        var csv = convertExpToCSV(slicedData);
        if(indexStart==0) csv = header.join(", ") + '\n' + csv;
        sendToLogger(csv, participantID, experimentType);
    }
}

function sendToLogger(csv, participantID, experimentType) {
    var http = new XMLHttpRequest();
    var encodedcsv = encodeURIComponent(csv);
    filename = types[experimentType] + participantID;

    http.open("POST", dirname+"logger?filename=" + filename + "&csv=" + encodedcsv, true);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.send();
}

function sendToUserLogger(csv, participantID) {
    var http = new XMLHttpRequest();
    var encodedcsv = encodeURIComponent(csv);
    filename = participantID + "_data";

    http.open("POST", dirname+"userlogger?filename=" + filename + "&csv=" + encodedcsv, true);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.send();
}
