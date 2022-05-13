async function home() {
    user_id = document.getElementById("user_id");
    experiment_type = document.getElementById("experiment_type");
    browser = document.getElementById("browser");
    // id = document.getElementById("id");
    // type = document.getElementById("type");
    // descri = document.getElementById("descri");

    experiment_type.value = Math.floor(Math.random() * experimentNb);
    user_id.value = Math.floor(Math.random() * (participantNb-1)) + 1;
    browser.value = navigator.appCodeName;

    cpt = 0;

    while ((await fetch('./logs/' + types[experiment_type.value] + user_id.value + '.csv')).ok && cpt<1000) {
        experiment_type.value = Math.floor(Math.random() * experimentNb);
        user_id.value = Math.floor(Math.random() * (participantNb-1)) + 1;
        cpt++;
    }

    if (cpt >= 1000) {
        alert("Sorry, All the tests have been taken, but thank you anyway!");
        window.location.assign(dirname+"thankyou");
    }

    // id.innerHTML = "Participant " + user_id.value;
    // type.innerHTML = types[experiment_type.value];
    // descri.innerHTML = description[experiment_type.value];

}

async function tuto() {
    const params = new URLSearchParams(document.location.search);

    const user_id = params.get("user_id");
    const experimentType = Number(params.get("experiment_type"));
    const keyboard_layout = params.get("keyboard_layout");
    const mouse_type = params.get("mouse_type");
    const browser = params.get("browser");

    if (!(parseInt(user_id) > 0 && allKeyboardLayouts.includes(keyboard_layout) && allMouseTypes.includes(mouse_type))) {
        alert("Broken experiment parameters in the URL, go back to the home page !");
        window.location.assign(dirname);
    }

    JSONObject = {
        "DesignName": types[experimentType],
        "ParticipantID": user_id,
        "keyboardLayout": keyboard_layout,
        "mouseType": mouse_type,
        "browser": browser,
        "user_age": "NaN",
        "user_gender": "NaN",
        "frequency": "NaN"
    };

    csvUserData =  await convertUserToCSV([JSONObject]);
    sendToUserLogger(csvUserData);

    type = document.getElementById("type");
    text = document.getElementById("text");

    t1 = document.getElementById("t1");
    t2 = document.getElementById("t2");
    t3 = document.getElementById("t3");

    // type.innerHTML = types[experimentType];
    // text.innerHTML = texts[experimentType];

    t1.innerHTML = tutos[experimentType][0];
    t2.innerHTML = tutos[experimentType][1];
    t3.innerHTML = tutos[experimentType][2];

    gif = document.getElementById("gif");
    gif.src = "res/" + types[experimentType] + ".gif";
    gif.alt = "GIF tutorial for " + types[experimentType];
}


function next(){
    const params = new URLSearchParams(document.location.search);

    const user_id = params.get("user_id");
    const experimentType = Number(params.get("experiment_type"));

    window.location.assign(dirname+"experiment?user_id="+user_id+"&experiment_type="+experimentType);
}

function endform() {
    const params = new URLSearchParams(document.location.search);
    const user_id = params.get("user_id");
    const experimentType = Number(params.get("experiment_type"));

    document.getElementById("user_id").value = user_id;
    document.getElementById("experiment_type").value = experimentType;
}

function thankyou(){
    const params = new URLSearchParams(document.location.search);
    const user_id = params.get("user_id");
    const experimentType = Number(params.get("experiment_type"));

    if (!(parseInt(user_id) > 0)) {
        alert("Broken experiment parameters in the URL, go back to the home page !");
        window.location.assign(dirname);
    }

    id = document.getElementById("id");
    type = document.getElementById("type");

    id.innerHTML = user_id;
    type.innerHTML = types[experimentType];

}