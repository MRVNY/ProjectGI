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

    text = "DesignName,ParticipantID,TrialID,Block1,Letter,Modifier,Position,Size\nProjectGI,1,1,1,E,CMD Shift,2,1\nProjectGI,1,2,1,E,CMD Shift,2,1\nProjectGI,1,3,2,P, ,2,2\nProjectGI,1,4,2,P, ,2,2\nProjectGI,1,5,3,E,CMD,1,2\nProjectGI,1,6,3,E,CMD,1,2\nProjectGI,1,7,4,J,CMD,1,1\nProjectGI,1,8,4,J,CMD,1,1\nProjectGI,1,9,5,E,CMD,2,1\nProjectGI,1,10,5,E,CMD,2,1\nProjectGI,1,11,6,P,Alt,1,1\nProjectGI,1,12,6,P,Alt,1,1\nProjectGI,1,13,7,M,Alt,1,2\nProjectGI,1,14,7,M,Alt,1,2\nProjectGI,1,15,8,M,CMD Shift,2,2\nProjectGI,1,16,8,M,CMD Shift,2,2\nProjectGI,1,17,9,Z,CMD Shift,2,1\nProjectGI,1,18,9,Z,CMD Shift,2,1\nProjectGI,1,19,10,P, ,1,1\nProjectGI,1,20,10,P, ,1,1\nProjectGI,1,21,11,P,Alt,2,1\nProjectGI,1,22,11,P,Alt,2,1\nProjectGI,1,23,12,P,CMD,2,2\nProjectGI,1,24,12,P,CMD,2,2\nProjectGI,1,25,13,P,CMD Shift,2,2\nProjectGI,1,26,13,P,CMD Shift,2,2\nProjectGI,1,27,14,Z, ,1,1\nProjectGI,1,28,14,Z, ,1,1\nProjectGI,1,29,15,M,CMD,1,1\nProjectGI,1,30,15,M,CMD,1,1\nProjectGI,1,31,16,Z,CMD Shift,1,2\nProjectGI,1,32,16,Z,CMD Shift,1,2\nProjectGI,1,33,17,F,Alt,1,1\nProjectGI,1,34,17,F,Alt,1,1\nProjectGI,1,35,18,M,Alt,2,2\nProjectGI,1,36,18,M,Alt,2,2\nProjectGI,1,37,19,Z,Alt,2,2\nProjectGI,1,38,19,Z,Alt,2,2\nProjectGI,1,39,20,Z,CMD Shift,1,1\nProjectGI,1,40,20,Z,CMD Shift,1,1\nProjectGI,1,41,21,J, ,1,2\nProjectGI,1,42,21,J, ,1,2\nProjectGI,1,43,22,J, ,2,2\nProjectGI,1,44,22,J, ,2,2\nProjectGI,1,45,23,F,CMD,1,2\nProjectGI,1,46,23,F,CMD,1,2\nProjectGI,1,47,24,F,CMD,2,2\nProjectGI,1,48,24,F,CMD,2,2\nProjectGI,1,49,25,M, ,2,2\nProjectGI,1,50,25,M, ,2,2\nProjectGI,1,51,26,M,CMD,2,1\nProjectGI,1,52,26,M,CMD,2,1\nProjectGI,1,53,27,F,Alt,2,2\nProjectGI,1,54,27,F,Alt,2,2\nProjectGI,1,55,28,E, ,1,1\nProjectGI,1,56,28,E, ,1,1\nProjectGI,1,57,29,J,CMD,2,1\nProjectGI,1,58,29,J,CMD,2,1\nProjectGI,1,59,30,J,Alt,1,2\nProjectGI,1,60,30,J,Alt,1,2\nProjectGI,1,61,31,Z, ,2,2\nProjectGI,1,62,31,Z, ,2,2\nProjectGI,1,63,32,E,Alt,1,1\nProjectGI,1,64,32,E,Alt,1,1\nProjectGI,1,65,33,F, ,1,1\nProjectGI,1,66,33,F, ,1,1\nProjectGI,1,67,34,P,Alt,2,2\nProjectGI,1,68,34,P,Alt,2,2\nProjectGI,1,69,35,J,CMD,1,2\nProjectGI,1,70,35,J,CMD,1,2\nProjectGI,1,71,36,P,CMD,1,1\nProjectGI,1,72,36,P,CMD,1,1\nProjectGI,1,73,37,P,CMD Shift,2,1\nProjectGI,1,74,37,P,CMD Shift,2,1\nProjectGI,1,75,38,Z,CMD,1,1\nProjectGI,1,76,38,Z,CMD,1,1\nProjectGI,1,77,39,Z,CMD,1,2\nProjectGI,1,78,39,Z,CMD,1,2\nProjectGI,1,79,40,F,CMD Shift,2,2\nProjectGI,1,80,40,F,CMD Shift,2,2\nProjectGI,1,81,41,M, ,2,1\nProjectGI,1,82,41,M, ,2,1\nProjectGI,1,83,42,J,CMD Shift,2,1\nProjectGI,1,84,42,J,CMD Shift,2,1\nProjectGI,1,85,43,M,CMD Shift,1,2\nProjectGI,1,86,43,M,CMD Shift,1,2\nProjectGI,1,87,44,J, ,1,1\nProjectGI,1,88,44,J, ,1,1\nProjectGI,1,89,45,F,Alt,1,2\nProjectGI,1,90,45,F,Alt,1,2\nProjectGI,1,91,46,J, ,2,1\nProjectGI,1,92,46,J, ,2,1\nProjectGI,1,93,47,Z,CMD Shift,2,2\nProjectGI,1,94,47,Z,CMD Shift,2,2\nProjectGI,1,95,48,F,CMD Shift,1,1\nProjectGI,1,96,48,F,CMD Shift,1,1\nProjectGI,1,97,49,F,Alt,2,1\nProjectGI,1,98,49,F,Alt,2,1\nProjectGI,1,99,50,F,CMD,1,1\nProjectGI,1,100,50,F,CMD,1,1\nProjectGI,1,101,51,E,Alt,2,2\nProjectGI,1,102,51,E,Alt,2,2\nProjectGI,1,103,52,P, ,2,1\nProjectGI,1,104,52,P, ,2,1\nProjectGI,1,105,53,E, ,1,2\nProjectGI,1,106,53,E, ,1,2\nProjectGI,1,107,54,P,CMD Shift,1,1\nProjectGI,1,108,54,P,CMD Shift,1,1\nProjectGI,1,109,55,Z, ,1,2\nProjectGI,1,110,55,Z, ,1,2\nProjectGI,1,111,56,M,CMD Shift,2,1\nProjectGI,1,112,56,M,CMD Shift,2,1\nProjectGI,1,113,57,M, ,1,1\nProjectGI,1,114,57,M, ,1,1\nProjectGI,1,115,58,E,CMD,1,1\nProjectGI,1,116,58,E,CMD,1,1\nProjectGI,1,117,59,E,CMD Shift,1,2\nProjectGI,1,118,59,E,CMD Shift,1,2\nProjectGI,1,119,60,E,Alt,2,1\nProjectGI,1,120,60,E,Alt,2,1\nProjectGI,1,121,61,J,Alt,2,1\nProjectGI,1,122,61,J,Alt,2,1\nProjectGI,1,123,62,Z,Alt,2,1\nProjectGI,1,124,62,Z,Alt,2,1\nProjectGI,1,125,63,M,CMD,1,2\nProjectGI,1,126,63,M,CMD,1,2\nProjectGI,1,127,64,E,CMD Shift,1,1\nProjectGI,1,128,64,E,CMD Shift,1,1\nProjectGI,1,129,65,J,CMD,2,2\nProjectGI,1,130,65,J,CMD,2,2\nProjectGI,1,131,66,P,CMD Shift,1,2\nProjectGI,1,132,66,P,CMD Shift,1,2\nProjectGI,1,133,67,J,Alt,1,1\nProjectGI,1,134,67,J,Alt,1,1\nProjectGI,1,135,68,J,CMD Shift,1,1\nProjectGI,1,136,68,J,CMD Shift,1,1\nProjectGI,1,137,69,E,CMD Shift,2,2\nProjectGI,1,138,69,E,CMD Shift,2,2\nProjectGI,1,139,70,Z,CMD,2,1\nProjectGI,1,140,70,Z,CMD,2,1\nProjectGI,1,141,71,E, ,2,1\nProjectGI,1,142,71,E, ,2,1\nProjectGI,1,143,72,Z,Alt,1,2\nProjectGI,1,144,72,Z,Alt,1,2\nProjectGI,1,145,73,P,CMD,2,1\nProjectGI,1,146,73,P,CMD,2,1\nProjectGI,1,147,74,F,CMD Shift,2,1\nProjectGI,1,148,74,F,CMD Shift,2,1\nProjectGI,1,149,75,M, ,1,2\nProjectGI,1,150,75,M, ,1,2\nProjectGI,1,151,76,E,CMD,2,2\nProjectGI,1,152,76,E,CMD,2,2\nProjectGI,1,153,77,F, ,2,2\nProjectGI,1,154,77,F, ,2,2\nProjectGI,1,155,78,F, ,2,1\nProjectGI,1,156,78,F, ,2,1\nProjectGI,1,157,79,J,CMD Shift,2,2\nProjectGI,1,158,79,J,CMD Shift,2,2\nProjectGI,1,159,80,F,CMD,2,1\nProjectGI,1,160,80,F,CMD,2,1\nProjectGI,1,161,81,M,CMD Shift,1,1\nProjectGI,1,162,81,M,CMD Shift,1,1\nProjectGI,1,163,82,F,CMD Shift,1,2\nProjectGI,1,164,82,F,CMD Shift,1,2\nProjectGI,1,165,83,Z,Alt,1,1\nProjectGI,1,166,83,Z,Alt,1,1\nProjectGI,1,167,84,P,CMD,1,2\nProjectGI,1,168,84,P,CMD,1,2\nProjectGI,1,169,85,F, ,1,2\nProjectGI,1,170,85,F, ,1,2\nProjectGI,1,171,86,J,Alt,2,2\nProjectGI,1,172,86,J,Alt,2,2\nProjectGI,1,173,87,E,Alt,1,2\nProjectGI,1,174,87,E,Alt,1,2\nProjectGI,1,175,88,Z,CMD,2,2\nProjectGI,1,176,88,Z,CMD,2,2\nProjectGI,1,177,89,Z, ,2,1\nProjectGI,1,178,89,Z, ,2,1\nProjectGI,1,179,90,E, ,2,2\nProjectGI,1,180,90,E, ,2,2\nProjectGI,1,181,91,M,CMD,2,2\nProjectGI,1,182,91,M,CMD,2,2\nProjectGI,1,183,92,M,Alt,2,1\nProjectGI,1,184,92,M,Alt,2,1\nProjectGI,1,185,93,M,Alt,1,1\nProjectGI,1,186,93,M,Alt,1,1\nProjectGI,1,187,94,J,CMD Shift,1,2\nProjectGI,1,188,94,J,CMD Shift,1,2\nProjectGI,1,189,95,P, ,1,2\nProjectGI,1,190,95,P, ,1,2\nProjectGI,1,191,96,P,Alt,1,2\nProjectGI,1,192,96,P,Alt,1,2"
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
    block += 1;
    trial = experiments[block]
    console.log(trial)

    var next = document.getElementById("next");
    //shortcutIndex = Math.floor(Math.random() * shortcuts.length);
    var shortcut = trial["Modifier"] + " " + trial["Letter"]
    shortcutElement.innerHTML = shortcut;

    target.style.backgroundColor = "";

    target.style.top = 100 + Math.floor(Math.random() * (window.innerHeight - target.clientHeight - 200)) + "px";
    
    if(trial["Position"]=="1"){
        target.style.left = 100 + Math.floor(Math.random() * (window.innerHeight - target.clientHeight - 200))/3 + "px";
    }
    else{
        target.style.right = 100 + Math.floor(Math.random() * (window.innerHeight - target.clientHeight - 200))/3 + "px";
    }
    
    targetSize = 50 * parseInt(trial["Size"]);
    target.style.width = targetSize + "px";
    target.style.height = targetSize + "px";

    isRecording = false;
    next.disabled = true;
}


// target.onclick = function() {
//     isRecording = true;
//     target.style.backgroundColor = "lightgray";
// }

target.onmouseover = function(e){
    isRecording = true;
    target.style.backgroundColor = "lightgray";
}

target.onmouseout = function(e){
    isRecording = false;
    target.style.backgroundColor = "";
}

document.onkeydown = function(e) {

    var modKey1 = navigator.userAgent.match(/Mac/i) ? e.metaKey : e.ctrlKey;
    var modKey2 = e.shiftKey;
    var modKey3 = e.altKey;

    switch(trial["Modifier"]) {
        case "CMD":
            key1 = true
            key2 = false
            key3 = false
        break;

        case "CMD Shift":
            key1 = true
            key2 = true
            key3 = false
        break;

        case "Alt":
            key1 = false
            key2 = false
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
    shortcutSuccess = isRecording && e.code.toUpperCase() == "KEY"+trial["Letter"] && key1==modKey1 && key2==modKey2 && key3==modKey3
    if (shortcutSuccess) {
        var next = document.getElementById("next");
        next.disabled = false;
        end = recordTime()
        console.log((end-start)/1000 + "s")
    }
}