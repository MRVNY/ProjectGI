async function home() {
    user_id = document.getElementById("user_id");
    experiment_type = document.getElementById("experiment_type");
    id = document.getElementById("id");
    type = document.getElementById("type");
    descri = document.getElementById("descri");

    experiment_type.value = Math.floor(Math.random() * 5);
    user_id.value = Math.floor(Math.random() * 19) + 1;

    cpt = 0;

    while (await fetch('./logs/' + types[experiment_type.value] + user_id.value + '.csv').ok && cpt<1000) {
        experiment_type.value = Math.floor(Math.random() * 5);
        user_id.value = Math.floor(Math.random() * 19) + 1;
        cpt++;
    }

    if (cpt >= 1000) {
        alert("Sorry, All the tests have been taken, but thank you anyway!");
        window.location.assign(dirname+"thankyou");
    }

    id.innerHTML = "Participant " + user_id.value;
    type.innerHTML = types[experiment_type.value];
    descri.innerHTML = description[experiment_type.value];

}

async function tuto() {
    const params = new URLSearchParams(document.location.search);

    const user_id = params.get("user_id");
    const keyboard_layout = params.get("keyboard_layout");
    const mouse_type = params.get("mouse_type");
    const experimentType = Number(params.get("experiment_type"));

    if (!(parseInt(user_id) > 0 && allKeyboardLayouts.includes(keyboard_layout) && allMouseTypes.includes(mouse_type))) {
        alert("Broken experiment parameters in the URL, go back to the home page !");
        window.location.assign(dirname);
    }

    type = document.getElementById("type");
    text = document.getElementById("text");

    type.innerHTML = types[experimentType];
    text.innerHTML = texts[experimentType];

    tutorial_gif = document.getElementById("tutorial_gif");
    tutorial_gif.alt = "GIF tutorial for " + types[experimentType];
    tutorial_gif.src = "res/" + types[experimentType] + ".gif";
}

function goBack(){
    window.location.assign(dirname);
}

function next(){
    const params = new URLSearchParams(document.location.search);
    const user_id = params.get("user_id");
    const keyboard_layout = params.get("keyboard_layout");
    const mouse_type = params.get("mouse_type");
    const experimentType = Number(params.get("experiment_type"));
    window.location.assign(dirname+"experiment?user_id="+user_id+"&experiment_type="+experimentType+"&keyboard_layout="+keyboard_layout+"&mouse_type="+mouse_type);
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