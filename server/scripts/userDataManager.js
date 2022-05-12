async function sendUserData(experimentType,user_id, user_age, user_gender, frequency) {
    JSONObject = {
        "DesignName" : types[experimentType],
        "ParticipantID": user_id,
        "keyboardLayout" : -1, 
        "mouseType" : -1,
        "user_age": user_age,
        "user_gender": user_gender,
        "frequency": frequency
    };

    csvUserData = await convertUserToCSV([JSONObject]);
    sendToUserLogger(csvUserData);
}

const params = new URLSearchParams(document.location.search);

const user_id = params.get("user_id");
const experimentType = Number(params.get("experiment_type"));
const user_age = params.get("user_age");
const user_gender = params.get("user_gender");
const frequency = params.get("frequency");

if(parseInt(user_id) > 0 && parseInt(user_age) > 0 && user_gender != null && frequency != null) {
    sendUserData(experimentType,user_id, user_age, user_gender, frequency);
}