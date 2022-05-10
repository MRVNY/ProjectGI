// AJAX function to send several experiment's trial results to the logger

var sentBlockSize = 20; // How many trials should a block of trials to send contain

function formatParams(params) {
    return "?" + Object
        .keys(params)
        .map(function(key) {
            return key + "=" + encodeURIComponent(params[key])
        })
        .join("&")
}

function checkLogging(cpt, data, participantID, experimentType) {
    if ((cpt != 0 && (cpt + 1) % sentBlockSize == 0) || cpt == data.length - 1) {
        var indexStart = sentBlockSize * Math.floor(cpt / sentBlockSize);
        //console.log(data);

        var slicedData = data.slice(indexStart, cpt + 1);
        console.log(slicedData, indexStart, cpt + 1);
        var csv = convertToCSV(slicedData);
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