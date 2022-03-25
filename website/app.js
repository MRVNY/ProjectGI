/* To-Do */
/* - Rendre solide la cible */
/* - Trouver un moyen de montrer que la cible est cliquée */
/* - Acceder au fichier config.csv */
/* - Enregister les résultats dans un fichier CSV */
/* - Faire la page d'accueil */
/* Log toutes les actions */

function moveTarget(size) {
    target.classList.remove("selected");
    target.style.top = 100 + Math.floor(Math.random() * (window.innerHeight - target.clientHeight - 200)) + "px";
    target.style.left = 100 +  Math.floor(Math.random() * (window.innerWidth - target.clientWidth - 200)) + "px";
    var targetSize =  size * 25;
    target.style.width = targetSize + "px";
    target.style.height = targetSize + "px";
}

// fetch keyboard configuration (Mac/Windows)
var osModKey = navigator.userAgent.match(/Mac/i) ? "cmd" : "ctrl";

// init useful global variables
var cpt = 0;
var isRecording = false;
var startTime = Date.now();
var mod1Done = false;
var mod2Done = false;
var mod3Done = false;
var keyDone = false;

// load experiment
var experiments = loadExperiment();
var experimentResults = generateExperimentsResults(experiments);
var experimentsNames = experiments.map(({name}) => name);
var experimentIndex = Math.floor(Math.random() * experimentsNames.length);

// website interactivity

const nextButton = document.getElementById("next");

function nextTest() {
    experimentIndex = Math.floor(Math.random() * experimentsNames.length);
    shortcutElement.innerHTML = experimentsNames[experimentIndex];
    moveTarget(experiments[experimentIndex].targetSize);
    isRecording = false;
    nextButton.disabled = true;
    startTime = Date.now();
}


const shortcutElement = document.getElementById("shortcut");
shortcutElement.innerHTML = experimentsNames[experimentIndex];


var target = document.createElement("div");
target.className = "target";
moveTarget(experiments[experimentIndex].targetSize);

target.onclick = function() {
    if (!isRecording) {
        experimentResults[experiments[experimentIndex].experimentID].targetDist.push(Math.sqrt(Math.pow(target.offsetLeft - nextButton.offsetLeft, 2) + Math.pow(target.offsetTop - nextButton.offsetHeight, 2)));
        experimentResults[experiments[experimentIndex].experimentID].travelTime.push(Date.now() - startTime);
        startTime = Date.now();
    }
    isRecording = true;
    target.classList.add("selected");
}

document.body.appendChild(target);


document.onkeydown = function(e) {
    var modKey1 = navigator.userAgent.match(/Mac/i) ? e.metaKey : e.ctrlKey;
    var modKey2 = e.shiftKey;
    var modKey3 = e.altKey;
    var currentExperiment = experiments[experimentIndex];
    var currentExperimentID = currentExperiment.experimentID;

    if (modKey1) {
        e.preventDefault();
    }

    if (isRecording && !mod1Done && modKey1 == currentExperiment.mod1 && modKey1 == true) {
        experimentResults[currentExperimentID].executionTimeMod1.push(Date.now() - startTime);
        mod1Done = true;
    }
    if (isRecording && !mod2Done && modKey2 == currentExperiment.mod2 && modKey2 == true) {
        experimentResults[currentExperimentID].executionTimeMod2.push(Date.now() - startTime);
        mod2Done = true;
    }
    if (isRecording && !mod3Done && modKey3 == currentExperiment.mod3 && modKey3 == true) {
        experimentResults[currentExperimentID].executionTimeMod3.push(Date.now() - startTime);
        mod3Done = true;
    }
    if (isRecording && !keyDone && e.keyCode == currentExperiment.key.charCodeAt()) {
        experimentResults[currentExperimentID].executionTimeKey.push(Date.now() - startTime);
        keyDone = true;
    }

    var shortcutSuccess = isRecording && 
        modKey1 == currentExperiment.mod1 &&
        modKey2 == currentExperiment.mod2 &&
        modKey3 == currentExperiment.mod3 &&
        e.keyCode == currentExperiment.key.charCodeAt();
    if (shortcutSuccess) {
        if (currentExperiment.mod1 == false) {
            experimentResults[currentExperimentID].executionTimeMod1.push(-1);
        }
        if (currentExperiment.mod2 == false) {
            experimentResults[currentExperimentID].executionTimeMod2.push(-1);
        }
        if (currentExperiment.mod3 == false) {
            experimentResults[currentExperimentID].executionTimeMod3.push(-1);
        }
        experimentResults[currentExperimentID].totalExecutionTime.push(Date.now() - startTime);

        nextButton.disabled = false;
        mod1Done = false;
        mod2Done = false;
        mod3Done = false;
        keyDone = false;

        cpt += 1;
        if (cpt == 10) {
            exportCSVFile(experimentResults, "results");
            cpt = 0;
        }
        startTime = Date.now();
    }
}
