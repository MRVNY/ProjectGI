/* To-Do */
/* - Faire en sorte que le bouton "Next" soit toujours visible */
/* - Afficher au dessus du bouton "Next" le nom du raccourci */
/* - Rendre solide la cible */
/* - Trouver un moyen de montrer que la cible est cliquée */
/* - Acceder au fichier config.csv */
/* - Randomiser l'experience */
/* - Faire en sorte que la position de la cible soit celle des experiences */
/* - Enregistrer les temps de chaque experience */
/* - Enregister les résultats dans un fichier CSV */
/* - Faire la page d'accueil */


function parseCSV(csv) {
    var lines = csv.split("\n");
    var result = [];
    var headers = lines[0].split(",");
    for (var i = 1; i < lines.length; i++) {
        var obj = {};
        var currentline = lines[i].split(",");
        for (var j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j];
        }
        result.push(obj);
    }
    //console.log(result)
    return result;
}

function loadExperiment() {
    // console.log("Loading CSV file...");
    // const response = await fetch('./config.csv');
    // console.log("CSV file loaded.");
    // console.log("Fetching CSV file...");
    // const text = await response.text();
    // console.log("CSV file fetched.");

    text = "DesignName,ParticipantID,TrialID,Block1,Letter,Modifier,Size\ntest1,1,1,1,M,CMD_Shift,1\ntest1,1,2,2,M,CMD,2\ntest1,1,3,3,X,CMD_Shift,2\ntest1,1,4,4,O, ,1\ntest1,1,5,5,X,CMD_Alt_Shift,1\ntest1,1,6,6,O,Alt,1\ntest1,1,7,7,X,Alt,2\ntest1,1,8,8,X,CMD_Shift,1\ntest1,1,9,9,X, ,2\ntest1,1,10,10,M,CMD_Alt_Shift,1\ntest1,1,11,11,M,Alt,2\ntest1,1,12,12,M,CMD_Alt_Shift,2\ntest1,1,13,13,M,Alt,1\ntest1,1,14,14,O,CMD,2\ntest1,1,15,15,F, ,2\ntest1,1,16,16,F,CMD,1\ntest1,1,17,17,F,CMD_Alt_Shift,1\ntest1,1,18,18,E,Alt,1\ntest1,1,19,19,X,CMD_Alt_Shift,2\ntest1,1,20,20,F,CMD,2\ntest1,1,21,21,E,CMD_Shift,2\ntest1,1,22,22,E,CMD_Alt_Shift,2\ntest1,1,23,23,F,Alt,2\ntest1,1,24,24,F,CMD_Shift,2\ntest1,1,25,25,O,CMD_Shift,1\ntest1,1,26,26,M, ,2\ntest1,1,27,27,E, ,2\ntest1,1,28,28,X,CMD,1\ntest1,1,29,29,O,CMD,1\ntest1,1,30,30,O,Alt,2\ntest1,1,31,31,O,CMD_Alt_Shift,1\ntest1,1,32,32,M, ,1\ntest1,1,33,33,F, ,1\ntest1,1,34,34,M,CMD,1\ntest1,1,35,35,O, ,2\ntest1,1,36,36,X,CMD,2\ntest1,1,37,37,O,CMD_Shift,2\ntest1,1,38,38,M,CMD_Shift,2\ntest1,1,39,39,X,Alt,1\ntest1,1,40,40,E,Alt,2\ntest1,1,41,41,E,CMD,2\ntest1,1,42,42,X, ,1\ntest1,1,43,43,O,CMD_Alt_Shift,2\ntest1,1,44,44,E,CMD_Shift,1\ntest1,1,45,45,F,CMD_Alt_Shift,2\ntest1,1,46,46,E,CMD_Alt_Shift,1\ntest1,1,47,47,F,CMD_Shift,1\ntest1,1,48,48,E,CMD,1\ntest1,1,49,49,E, ,1\ntest1,1,50,50,F,Alt,1\ntest1,1,51,51,F,CMD_Shift,1\ntest1,1,52,52,E,CMD_Shift,1\ntest1,1,53,53,M,CMD_Shift,2\ntest1,1,54,54,E,CMD_Shift,2\ntest1,1,55,55,X,Alt,1\ntest1,1,56,56,O,CMD_Shift,1\ntest1,1,57,57,X,CMD,2\ntest1,1,58,58,O,CMD_Shift,2\ntest1,1,59,59,M, ,1\ntest1,1,60,60,E, ,1\ntest1,1,61,61,E,CMD_Alt_Shift,1\ntest1,1,62,62,F,Alt,1\ntest1,1,63,63,F,CMD_Alt_Shift,2\ntest1,1,64,64,F,CMD_Shift,2\ntest1,1,65,65,M,CMD,2\ntest1,1,66,66,X,CMD_Shift,2\ntest1,1,67,67,X, ,2\ntest1,1,68,68,F, ,2\ntest1,1,69,69,E,Alt,2\ntest1,1,70,70,O, ,1\ntest1,1,71,71,E,Alt,1\ntest1,1,72,72,F,CMD,2\ntest1,1,73,73,O,Alt,1\ntest1,1,74,74,X,CMD_Shift,1\ntest1,1,75,75,E, ,2\ntest1,1,76,76,X, ,1\ntest1,1,77,77,M,CMD_Alt_Shift,2\ntest1,1,78,78,F, ,1\ntest1,1,79,79,F,Alt,2\ntest1,1,80,80,M, ,2\ntest1,1,81,81,O,CMD,1\ntest1,1,82,82,E,CMD,2\ntest1,1,83,83,M,CMD_Shift,1\ntest1,1,84,84,O,CMD_Alt_Shift,2\ntest1,1,85,85,E,CMD_Alt_Shift,2\ntest1,1,86,86,M,CMD,1\ntest1,1,87,87,X,CMD,1\ntest1,1,88,88,E,CMD,1\ntest1,1,89,89,O, ,2\ntest1,1,90,90,F,CMD,1\ntest1,1,91,91,O,CMD,2\ntest1,1,92,92,O,CMD_Alt_Shift,1\ntest1,1,93,93,O,Alt,2\ntest1,1,94,94,F,CMD_Alt_Shift,1\ntest1,1,95,95,M,CMD_Alt_Shift,1\ntest1,1,96,96,X,CMD_Alt_Shift,2\ntest1,1,97,97,X,Alt,2\ntest1,1,98,98,M,Alt,1\ntest1,1,99,99,M,Alt,2\ntest1,1,100,100,X,CMD_Alt_Shift,1"
    return parseCSV(text);

}

// var experiment = async () => {
//     let res = await loadExperiment();
//     return res;
// };

function recordTime() {
    var time = new Date();
    //var timeString = time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
    return time;
}

var experiments = loadExperiment()
var data = []

var osModKey = navigator.userAgent.match(/Mac/i) ? "cmd" : "ctrl";

var isRecording = false;

var block = 0
var trial
var start
var end

//console.log(experiment);

//var shortcuts = ["h", osModKey+"+x", osModKey+"+shift+g", osModKey+"+shift+alt+k"];
const shortcutElement = document.getElementById("shortcut");
// var shortcutIndex = Math.floor(Math.random() * shortcuts.length);

var target = document.createElement("div");
target.id = "target";
target.style.position = "fixed";
var targetSize
target.style.borderRadius = "50%";
target.style.border = "2px solid black";

document.body.appendChild(target);

nextTest();

function nextTest() {
    start = recordTime();
    trial = experiments[block]
        //console.log(trial)

    var next = document.getElementById("next");
    //shortcutIndex = Math.floor(Math.random() * shortcuts.length);
    var shortcut = trial["Modifier"] + " " + trial["Letter"]
    shortcutElement.innerHTML = shortcut;

    target.style.backgroundColor = "";

    target.style.top = 100 + Math.floor(Math.random() * (window.innerHeight - target.clientHeight - 200)) + "px";

    target.style.right = 100 + Math.floor(Math.random() * (window.innerHeight - target.clientHeight - 200)) + "px";

    targetSize = 50 * parseInt(trial["Size"]);
    target.style.width = targetSize + "px";
    target.style.height = targetSize + "px";

    isRecording = false;
    next.disabled = true;

    block += 1;
    if (block == experiments.length) {
        console.log(data)
    }
}


// target.onclick = function() {
//     isRecording = true;
//     target.style.backgroundColor = "lightgray";
// }

target.onmouseover = function(e) {
    isRecording = true;
    target.style.backgroundColor = "lightgray";
}

target.onmouseout = function(e) {
    isRecording = false;
    target.style.backgroundColor = "";
}

document.onkeydown = function(e) {

    var modKey1 = navigator.userAgent.match(/Mac/i) ? e.metaKey : e.ctrlKey;
    var modKey2 = e.shiftKey;
    var modKey3 = e.altKey;

    switch (trial["Modifier"]) {
        case "CMD":
            key1 = true
            key2 = false
            key3 = false
            break;

        case "CMD_Shift":
            key1 = true
            key2 = true
            key3 = false
            break;

        case "Alt":
            key1 = false
            key2 = false
            key3 = true
            break;

        case "CMD_Alt_Shift":
            key1 = true
            key2 = true
            key3 = true
            break;

        case " ":
            key1 = false
            key2 = false
            key3 = false
            break;

    }

    if (modKey1) {
        e.preventDefault();
    }
    //console.log(e.code.toUpperCase())
    shortcutSuccess = isRecording && e.code.toUpperCase() == "KEY" + trial["Letter"] && key1 == modKey1 && key2 == modKey2 && key3 == modKey3
    if (shortcutSuccess) {
        var next = document.getElementById("next");
        if (next.disabled) {
            end = recordTime()
            time = (end - start) / 1000
                //console.log(time + "s")
            data.push(time)
        }
        next.disabled = false;
    }
}