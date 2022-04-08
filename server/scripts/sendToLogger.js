// AJAX function to send several experiment's trial results to the logger

var sentBlockSize = 10; // How many trials should a block of trials to send contain

function formatParams(params) {
    return "?" + Object
        .keys(params)
        .map(function(key) {
            return key + "=" + encodeURIComponent(params[key])
        })
        .join("&")
}

function checkLogging(cpt, data, participantID) {
    if (cpt != 0 && (cpt + 1) % sentBlockSize == 0) {
        var indexStart = cpt + 1 - sentBlockSize;
        console.log(data);

        var slicedData = data.slice(indexStart, cpt + 1);
        console.log(slicedData, indexStart, cpt + 1);
        var csv = convertToCSV(slicedData);
        sendToLogger(csv, participantID);
    }
}

function sendToLogger(csv, participantID) {
    var http = new XMLHttpRequest();
    var encodedcsv = encodeURIComponent(csv);

    http.open("POST", "http://localhost:4000/logger?part_id=" + participantID + "&csv=" + encodedcsv, true);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.send();

}