/* To-Do */
/* - Faire en sorte que le bouton "Next" soit toujours visible */
/* - Afficher au dessus du bouton "Next" le nom du raccourci */
/* - Rendre solide la cible */
/* - Trouver un moyen de montrer que la cible est cliquée */
/* - Acceder au fichier config.csv */
/* - Randomiser l'experience */
/* - Faire en sorte que la position de la cible soit celle des experiences */
/* - Enregistrer les temps de chaque experience */
/* - Enregistrer les résultats dans un fichier CSV */
/* - Faire la page d'accueil */

var ONEKEY = 0
var TWOKEY = 1
var ONEDIR = 2
var TWODIR = 3


var participantID = 0;
var isRecording = false;

var osModKey = navigator.userAgent.match(/Mac/i) ? "CMD" : "Ctrl";

var angles = {
    "N": 90,
    "S": 270,
    "E": 360,
    "W": 180,
    "NE": 45,
    "NW": 135,
    "SE": 315,
    "SW": 225
}

var emoji = {
    "N" : "⬆️",
    "S" : "⬇️",
    "E" : "➡️",
    "W" : "⬅️",
    "NE" : "↗️",
    "NW" : "↖️", 
    "SE" : "↘️", 
    "SW" : "↙️"
}

var shortcutElement;

var target = document.createElement("div");
target.id = "target";
target.style.position = "fixed";
var targetSize
target.style.borderRadius = "50%";
target.style.border = "2px solid black";

var shortcutIndex, angle1, angle2;
var canvas;
var ctx;
let coord = { x: 0, y: 0 };
lines = [[]]

document.body.appendChild(target);

var experiments;
var experimentResults;
var experimentsNames;
var currentExperiment;
var experimentType;

var startTime;
var cpt = 0;

var cmd1Done = false;
var alt1Done = false;
var shift1Done = false;
var keyDone = false;

var zoneLeft = ["A", "Z", "E", "S", "D", "X", "C", "R"];
var zoneMiddle = ["R", "F", "V", "G", "B", "Y", "H"];
var zoneRight = ["U", "I", "J", "O", "K", "P", "L", "M"];

launch();

async function launch() {
    experimentType = Math.floor(Math.random() * 4); //randomBetween0And3

    if (experimentType==ONEDIR || experimentType==TWODIR){
        document.addEventListener("mousedown", mouseDown);
        document.addEventListener("mouseup", mouseUp);
        window.addEventListener("resize", resize);
    }

    while (participantID == 0 || participantID == null) {
        participantID = parseInt(window.prompt("Enter your participant ID"));
    }

    experiments = await loadExperiment(participantID);
    experimentResults = experiments[experimentType];
    //experimentResults = generateExperimentsResults(experiments);
    experimentsNames = experiments.map(({ name }) => name);

    toggleExperimentType();

    canvas = document.createElement("canvas");
    canvas.id = "canvas";
    document.querySelector("body").prepend(canvas);

    ctx = canvas.getContext("2d");
    ctx.fillStyle = "blue";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    resize();
    nextTest();
}

function nextTest() {
    var next = document.getElementById("next");

    currentExperiment = experiments[experimentType][cpt];
    toggleExperimentType(experimentType);

    switch(experimentType) {
        case ONEKEY: case TWOKEY:
            var shortcut = "";

            //First
            var modifiers1 = currentExperiment.Modifier1.split("_");
    
            currentExperiment.cmd1 = modifiers1.includes("CMD");
            currentExperiment.alt1 = modifiers1.includes("Alt");
            currentExperiment.shift1 = modifiers1.includes("Shift");
            currentExperiment.key1 = getKeyFromKeyboardZone(currentExperiment.Letter1).toLowerCase();
    
            for(i=0;i<modifiers1.length;i++){
                if(modifiers1[i]=="CMD") shortcut += osModKey + " + ";
                else if(modifiers1[i]=="None") shortcut += " ";
                else shortcut += modifiers1[i] + " + ";
            }
            shortcut += currentExperiment.key1.toUpperCase();

            //Second
            if(experimentType==TWOKEY){
                shortcut += " and then "
                //var modifiers2 = currentExperiment.Modifier2.split("_");
                var modifiers2 = currentExperiment.Modifier1.split("_");
        
                currentExperiment.cmd2 = modifiers2.includes("CMD");
                currentExperiment.alt2 = modifiers2.includes("Alt");
                currentExperiment.shift2 = modifiers2.includes("Shift");
                currentExperiment.key2 = getKeyFromKeyboardZone(currentExperiment.Letter2).toLowerCase();
        
                for(i=0;i<modifiers2.length;i++){
                    if(modifiers2[i]=="CMD") shortcut += osModKey + " + ";
                    else if(modifiers2[i]=="None") shortcut += " ";
                    else shortcut += modifiers2[i] + " + ";
                }
                shortcut += currentExperiment.key2.toUpperCase();
            }

            shortcutElement.innerHTML = shortcut;
            break;

        case ONEDIR:
            angle1 = angles[currentExperiment.First];
            shortcutElement.innerHTML = emoji[currentExperiment.First];
            break;

        case TWODIR:
            angle1 = angles[currentExperiment.First];
            angle2 = angles[currentExperiment.Second];
            shortcutElement.innerHTML = emoji[currentExperiment.First] + " " + emoji[currentExperiment.Second];
            break;
      }
    


    target.style.backgroundColor = "";
    target.style.top = 100 + Math.floor(Math.random() * (window.innerHeight - target.clientHeight - 200)) + "px";
    target.style.left = 100 + Math.floor(Math.random() * (window.innerWidth - target.clientWidth - 200)) + "px";
    targetSize = Math.random() * 100 + 25;
    target.style.width = targetSize + "px";
    target.style.height = targetSize + "px";

    isRecording = false;
    target.classList.remove("selected");

    next.disabled = true;
    startTime = Date.now();
}

function resize() {
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
}

function moveTarget(size) {
    target.classList.remove("selected");
    target.style.top = 100 + Math.floor(Math.random() * (window.innerHeight - target.clientHeight - 200)) + "px";
    target.style.left = 100 + Math.floor(Math.random() * (window.innerWidth - target.clientWidth - 200)) + "px";
    var targetSize = size * 25;
    target.style.width = targetSize + "px";
    target.style.height = targetSize + "px";
}

target.onmousedown = function(event) {
    if (!isRecording) {
        targetDist = Math.sqrt(Math.pow(target.offsetLeft - next.offsetLeft, 2) + Math.pow(target.offsetTop - next.offsetHeight, 2));
        experimentResults[cpt].targetDist = targetDist;

        //experimentResults[cpt].travelTime.push(Date.now() - startTime);

        experimentResults[cpt].targetSize = targetSize;

        startTime = Date.now();
    }
    isRecording = true;
    target.classList.add("selected");

    if (experimentType == ONEDIR) {
        document.addEventListener("mousemove", draw);
        mouseMove(event);
    }
}

/* Keyboard shortcuts part */

function getKeyFromKeyboardZone(zone) {
    if (zone == "Left") {
        return zoneLeft[Math.floor(Math.random() * zoneLeft.length)];
    } else if (zone == "Middle") {
        return zoneMiddle[Math.floor(Math.random() * zoneMiddle.length)];
    } else {
        return zoneRight[Math.floor(Math.random() * zoneRight.length)];
    }
}

document.onkeydown = function(e) {
    var cmdKey = navigator.userAgent.match(/Mac/i) ? e.metaKey : e.ctrlKey;
    var shiftKey = e.shiftKey;
    var altKey = e.altKey;

    var key = e.keyCode + 32;

    if (cmdKey) {
        e.preventDefault();
    }

    if (isRecording && !cmd1Done && cmdKey == currentExperiment.cmd1 && cmdKey == true) {
        experimentResults[cpt].executionTimeCMD1 =  Date.now() - startTime;
        cmd1Done = true;
    }
    if (isRecording && !alt1Done && altKey == currentExperiment.alt1 && altKey == true) {
        experimentResults[cpt].executionTimeAlt1 = Date.now() - startTime;
        alt1Done = true;
    }
    if (isRecording && !shift1Done && shiftKey == currentExperiment.shift1 && shiftKey == true) {
        experimentResults[cpt].executionTimeShift1 = Date.now() - startTime;
        shift1Done = true;
    }
    if (isRecording && !keyDone && key == currentExperiment.key1.charCodeAt()) {
        experimentResults[cpt].executionTimeKey = Date.now() - startTime;
        keyDone = true;
    }

    var shortcutSuccess = isRecording &&
        cmdKey == currentExperiment.cmd1 &&
        shiftKey == currentExperiment.shift1 &&
        altKey == currentExperiment.alt1 &&
        key == currentExperiment.key1.charCodeAt();

    if (shortcutSuccess) {

        experimentResults[cpt].totalExecutionTime = Date.now() - startTime;
        console.log(experimentResults[cpt])

        cmd1Done = false;
        alt1Done = false;
        shift1Done = false;
        keyDone = false;

        var next = document.getElementById("next");
        next.disabled = false;

        //fillInEmptyFields();
        checkLogging(cpt, experimentResults, participantID);
        startTime = Date.now();
        cpt++;
    }
}

/* Gestural interaction part */

function getAngle(firstP, lastP) {
    dy = firstP[1] - lastP[1]
    dx = firstP[0] - lastP[0]
    var theta = Math.atan2(dy, dx);
    theta *= 180 / Math.PI;
    angle = -theta + 180

    if (angle < 20) {
        angle += 360
    }
    return angle
}

function mouseDown(event) {
    document.addEventListener("mousemove", draw);
    mouseMove(event);
}

function mouseUp() {
    document.removeEventListener("mousemove", draw);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (lines[0].length > 0) {
        firstP = lines[0][0][0]
        lastP = lines[0][lines[0].length - 1][1]

        firstDrawn = getAngle(firstP, lastP)

        keys = Object.keys(angles);
        shortcutSuccess = isRecording && Math.abs(angle1 - firstDrawn) < 20

        if (shortcutSuccess) {
            var next = document.getElementById("next");
            next.disabled = false;

            experimentResults[cpt].totalExecutionTime = Date.now() - startTime;

            drawDist = Math.sqrt(Math.pow(firstP[0]-lastP[0],2) + Math.pow(firstP[1]-lastP[1],2));
            experimentResults[cpt].drawDist = drawDist;

            experimentResults[cpt].userAngle1 = firstDrawn;

            console.log(experimentResults[cpt])
            checkLogging(cpt, experimentResults, participantID);
            startTime = Date.now();
            cpt++;
        }
    }
    lines = [[]]
}

function mouseMove(event) {
    coord.x = event.clientX - canvas.offsetLeft;
    coord.y = event.clientY - canvas.offsetTop;
}

function draw(event) {
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.lineCap = "round";
    ctx.strokeStyle = "black";

    tmp1 = [coord.x, coord.y];
    ctx.moveTo(coord.x, coord.y);

    mouseMove(event);

    ctx.lineTo(coord.x, coord.y);
    tmp2 = [coord.x, coord.y];

    lines[lines.length - 1].push([tmp1, tmp2]);

    ctx.stroke();
}