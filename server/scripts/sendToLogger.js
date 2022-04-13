// AJAX function to send several experiment's trial results to the logger

var sentBlockSize = 5; // How many trials should a block of trials to send contain

part_id
function formatParams(params) {
    return "?" + Object
        .keys(params)
        .map(function(key) {
            return key + "=" + encodeURIComponent(params[key])
        })
        .join("&")
}

function checkLogging(cpt, data, participantID, experimentType) {
    if (cpt != 0 && (cpt + 1) % sentBlockSize == 0) {
        var indexStart = cpt + 1 - sentBlockSize;
        //console.log(data);

        var slicedData = data.slice(indexStart, cpt + 1);
        console.log(slicedData, indexStart, cpt + 1);
        var csv = convertToCSV(slicedData);
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

function logAll(data, participantID, experimentType) {
    var csv = convertToCSV(data);
    var http = new XMLHttpRequest();
    var encodedcsv = encodeURIComponent(csv);
    filename = types[experimentType] + participantID;

    http.open("POST", dirname+"logall?filename=" + filename + "&csv=" + encodedcsv, true);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.send();
}