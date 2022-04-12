const allKeyboardLayouts = ["AZERTY", "QWERTY"];
const allMouseTypes = ["touchpad", "classic_mouse"];

description = {
    0: "1 keyboard shortcut with 1-4 keys",
    1: "2 keyboard shortcuts with 1-4 keys",
    2: "1 gesture shortcut of 1 direction",
    3: "2 gesture shortcuts of 1 direction",
    4: "1 gesture shortcut of 2 directions"
}

types = {
    0: "ONEKEY",
    1: "TWOKEY",
    2: "ONEDIR",
    3: "TWODIR",
    4: "TWODIRONEDRAW"
}

texts = {
    0: "Move the mouse cursor to the circle and click on the circle, then, press on the keys required in the instruction, when the instruction is correctly executed, the \"Next\" button will turn green",
    1: "Move the mouse cursor to the circle and click on the circle, press on the keys required in the first instruction, if correctly executed, the \"Next\" button will turn light green, then press on the keys required in the second instruction, if correctly executed, the \"Next\" button will turn green",
    2: "Move the mouse cursor to the circle, click on the circle and drag it towards the required direction, when the instruction is correctly executed, the \"Next\" button will turn green",
    3: "Move the mouse cursor to the circle, click on the circle and drag it towards the first required direction, if correctly executed, the \"Next\" button will turn light green, do the same thing with the second instruction, if correctly executed, the \"Next\" button will turn green",
    4: "Move the mouse cursor to the circle, click on the circle and drag it towards the first required direction, then, without releasing the mouse, drag the cursor to the second required direction, when both instructions are correctly executed, the \"Next\" button will turn green"
}

async function home() {
    user_id = document.getElementById("user_id");
    experiment_type = document.getElementById("experiment_type");
    id = document.getElementById("id");
    type = document.getElementById("type");
    descri = document.getElementById("descri");

    const tmp = await fetch('./logs/availability.txt');
    const availability = await tmp.text();

    experiment_type.value = Math.floor(Math.random() * 5);
    user_id.value = Math.floor(Math.random() * 19) + 1;

    cpt = 0;

    while (await fetch('./logs/' + type[experiment_type.value] + user_id.value + '.csv').ok && cpt<1000) {
        experiment_type.value = Math.floor(Math.random() * 5);
        user_id.value = Math.floor(Math.random() * 19) + 1;
        cpt++;
    }

    if (cpt >= 1000) {
        alert("Sorry, All the tests have been taken, but thank you anyway!");
        window.location.assign("http://localhost:4000/thankyou");
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
        window.location.assign("http://localhost:4000/");
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
    window.location.assign("http://localhost:4000/");
}

function next(){
    const params = new URLSearchParams(document.location.search);
    const user_id = params.get("user_id");
    const keyboard_layout = params.get("keyboard_layout");
    const mouse_type = params.get("mouse_type");
    const experimentType = Number(params.get("experiment_type"));
    window.location.assign("http://localhost:4000/experiment?user_id="+user_id+"&experiment_type="+experimentType+"&keyboard_layout="+keyboard_layout+"&mouse_type="+mouse_type);
}

function thankyou(){
    const params = new URLSearchParams(document.location.search);
    const user_id = params.get("user_id");
    const experimentType = Number(params.get("experiment_type"));

    if (!(parseInt(user_id) > 0)) {
        alert("Broken experiment parameters in the URL, go back to the home page !");
        window.location.assign("http://localhost:4000/");
    }

    id = document.getElementById("id");
    type = document.getElementById("type");

    id.innerHTML = user_id;
    type.innerHTML = types[experimentType];

}