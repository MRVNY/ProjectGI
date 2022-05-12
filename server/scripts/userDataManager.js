function sendUserData(user_id, user_age, user_gender, frequency) {
    JSONObject = {
        "user_id": user_id,
        "user_age": user_age,
        "user_gender": user_gender,
        "frequency": frequency
    };

    csvUserData = convertUserToCSV([JSONObject]);
    sendToUserLogger(csvUserData, user_id);
}

const params = new URLSearchParams(document.location.search);

const user_id = params.get("user_id");
const user_age = params.get("user_age");
const user_gender = params.get("user_gender");
const frequency = params.get("frequency");

if(parseInt(user_id) > 0 && parseInt(user_age) > 0 && user_gender != null && frequency != null) {
    sendUserData(user_id, user_age, user_gender, frequency);
}