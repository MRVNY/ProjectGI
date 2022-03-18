// AJAX function to send experiment result to the logger

function formatParams(params) {
    return "?" + Object
        .keys(params)
        .map(function(key) {
            return key + "=" + encodeURIComponent(params[key])
        })
        .join("&")
}

function sendToLogger(design_name, participant_ID, trial_ID, block1, letter, modifier, size, time) {
    params = {
        "DesignName": design_name,
        "ParticipantID": participant_ID,
        "TrialID": trial_ID,
        "Block1": block1,
        "Letter": letter,
        "Modifier": modifier,
        "Size": size,
        "Time": time
    };

    formatted_params = formatParams(params);

    var http = new XMLHttpRequest();

    http.open("GET", "/logger" + formatted_params, true);
    http.onreadystatechange = function() {
        if (http.readyState == 4 && http.status == 200) {
            console.log(http.responseText);
        }
    }
    http.send(null);

}