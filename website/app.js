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
    return result;
}

async function loadExperiment() {
    console.log("Loading CSV file...");
    const response = await fetch('./config.csv');
    console.log("CSV file loaded.");
    console.log("Fetching CSV file...");
    const text = await response.text();
    console.log("CSV file fetched.");
    return parseCSV(text);

}

// var experiment = async () => {
//     let res = await loadExperiment();
//     return res;
// };

function recordTime() {
    var time = new Date();
    var timeString = time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
    return timeString;
}

var experiments = loadExperiment();


var osModKey = navigator.userAgent.match(/Mac/i) ? "cmd" : "ctrl";

var isRecording = false;



//console.log(experiment);

var shortcuts = ["h", osModKey+"+x", osModKey+"+shift+g", osModKey+"+shift+alt+k"];
const shortcutElement = document.getElementById("shortcut");
var shortcutIndex = Math.floor(Math.random() * shortcuts.length);
shortcutElement.innerHTML = shortcuts[shortcutIndex];

var target = document.createElement("div");
target.id = "target";
target.style.position = "fixed";
target.style.top = 100 + Math.floor(Math.random() * (window.innerHeight - target.clientHeight - 200)) + "px";
target.style.left = 100 +  Math.floor(Math.random() * (window.innerWidth - target.clientWidth - 200)) + "px";
var targetSize = Math.random() * 100 + 25;
target.style.width = targetSize + "px";
target.style.height = targetSize + "px";
target.style.borderRadius = "50%";
target.style.border = "2px solid black";
target.onclick = function() {
    isRecording = true;
    target.style.backgroundColor = "lightgray";
}
document.body.appendChild(target);

function nextTest() {
    var next = document.getElementById("next");
    shortcutIndex = Math.floor(Math.random() * shortcuts.length);
    shortcutElement.innerHTML = shortcuts[shortcutIndex];
    target.style.backgroundColor = "";
    target.style.top = 100 + Math.floor(Math.random() * (window.innerHeight - target.clientHeight - 200)) + "px";
    target.style.left = 100 +  Math.floor(Math.random() * (window.innerWidth - target.clientWidth - 200)) + "px";
    var targetSize = Math.random() * 100 + 25;
    target.style.width = targetSize + "px";
    target.style.height = targetSize + "px";
    isRecording = false;
    next.disabled = true;
}

document.onkeydown = function(e) {
    var modKey1 = navigator.userAgent.match(/Mac/i) ? e.metaKey : e.ctrlKey;
    var modKey2 = e.shiftKey;
    var modKey3 = e.altKey;
    if (modKey1) {
        e.preventDefault();
    }
    shortcutSuccess = isRecording && (
        (shortcutIndex == 0 && e.keyCode == 72 && !modKey1 && !modKey2 && !modKey3) ||
        (shortcutIndex == 1 && e.keyCode == 88 &&  modKey1 && !modKey2 && !modKey3) ||
        (shortcutIndex == 2 && e.keyCode == 71 &&  modKey1 &&  modKey2 && !modKey3) ||
        (shortcutIndex == 3 && e.keyCode == 75 &&  modKey1 &&  modKey2 &&  modKey3));
    if (shortcutSuccess) {
        var next = document.getElementById("next");
        next.disabled = false;
    }
}