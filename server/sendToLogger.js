// AJAX function to send several experiment's trial results to the logger

var sentBlockSize = 2; // How many trials should a block of trials to send contain

function formatParams(params) {
    return "?" + Object
        .keys(params)
        .map(function(key) {
            return key + "=" + encodeURIComponent(params[key])
        })
        .join("&")
}

function checkLogging(cpt, data) {
    if (cpt % sentBlockSize == 0 && cpt > 0) {
        var indexStart = cpt - sentBlockSize;

        var slicedData = data.slice(indexStart, cpt);
        var csv = convertToCSV(slicedData, 1);
        sendToLogger(csv);
    }
}

function sendToLogger(csv) {
    var http = new XMLHttpRequest();
    var encodedcsv = encodeURIComponent(csv);

    http.open("POST", "http://localhost:4000/logger", true);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.send("csv=" + encodedcsv);

}