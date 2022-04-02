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

// function recordTime() {
//     var time = new Date();
//     var timeString = time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
//     return timeString;

//     return Date.now();
// }

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

var mod1Done = false;
var mod2Done = false;
var mod3Done = false;
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
    experimentResults = generateExperimentsResults(experiments);
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

    /*
    If randomBetween0And3 gives 0-1 it is the corresponding keyboard experiment
    If 2 or 3, it's gestures, so in the end the probability is half gestures and 1/4
    for each keyboard experiment type
    Final var experimentType val is 0 : 1 key, 1 : 2 keys, 2 : gestures
    */

   
    currentExperiment = experiments[experimentType][cpt];
    toggleExperimentType(experimentType);

    //console.log(currentExperiment);

    if (experimentType == ONEKEY) { //1key
        var shortcut = "";
        var modifiers = currentExperiment.Modifier1.split("_");

        currentExperiment.mod1 = false;
        currentExperiment.mod2 = false;
        currentExperiment.mod3 = false;

        if (modifiers.includes("CMD")) {
            currentExperiment.mod1 = true;
            shortcut = shortcut.concat(osModKey + " + ");
        }

        if (modifiers.includes("Shift")) {
            currentExperiment.mod2 = true;
            shortcut = shortcut.concat("Shift + ");
        }

        if (modifiers.includes("Alt")) {
            currentExperiment.mod3 = true;
            shortcut = shortcut.concat("Alt + ");
        }

        currentExperiment.Key = getKeyFromKeyboardZone(currentExperiment.Letter1).toLowerCase();

        shortcut = shortcut.concat(currentExperiment.Key.toUpperCase());
        shortcutElement.innerHTML = shortcut;
    }

    else if (experimentType == TWOKEY) { //2key
        console.log(currentExperiment)
        var shortcut = "";
        var modifiers1 = currentExperiment.Modifier1.split("_");
        var modifiers2 = currentExperiment.Modifier2.split("_");

        currentExperiment.mod1 = false;
        currentExperiment.mod2 = false;
        currentExperiment.mod3 = false;

        // First
        if (modifiers1.includes("CMD")) {
            currentExperiment.mod1 = true;
            shortcut = shortcut.concat(osModKey + " + ");
        }

        if (modifiers1.includes("Shift")) {
            currentExperiment.mod2 = true;
            shortcut = shortcut.concat("Shift + ");
        }

        if (modifiers1.includes("Alt")) {
            currentExperiment.mod3 = true;
            shortcut = shortcut.concat("Alt + ");
        }

        currentExperiment.Key1 = getKeyFromKeyboardZone(currentExperiment.Letter1).toLowerCase();
        shortcut = shortcut.concat(currentExperiment.Key1.toUpperCase());
        shortcut = shortcut.concat(" and then ");


        //Second
        if (modifiers2.includes("CMD")) {
            // currentExperiment.mod1 = true;
            shortcut = shortcut.concat(osModKey + " + ");
        }

        if (modifiers2.includes("Shift")) {
            // currentExperiment.mod2 = true;
            shortcut = shortcut.concat("Shift + ");
        }

        if (modifiers2.includes("Alt")) {
            // currentExperiment.mod3 = true;
            shortcut = shortcut.concat("Alt + ");
        }

        currentExperiment.Key2 = getKeyFromKeyboardZone(currentExperiment.Letter2).toLowerCase();
        shortcut = shortcut.concat(currentExperiment.Key2.toUpperCase());
        
        shortcutElement.innerHTML = shortcut;
    } 

    else if (experimentType == ONEDIR) { //1dir
        angle1 = angles[currentExperiment.First];
        //angle2 = angles[currentExperiment.Second];
        shortcutElement.innerHTML = emoji[currentExperiment.First];
        //shortcutElement.innerHTML = currentExperiment.firstDirection + " " + currentExperiment.Second;
    }

    else if (experimentType == TWODIR) { //2dir
        angle1 = angles[currentExperiment.First];
        angle2 = angles[currentExperiment.Second];
        shortcutElement.innerHTML = emoji[currentExperiment.First];
        shortcutElement.innerHTML = emoji[currentExperiment.First] + " " + emoji[currentExperiment.Second];
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
        var expTypeVerbose = (experimentType == ONEKEY || experimentType == TWOKEY) ? "keyboard" : "gestures";
        experimentResults[cpt].experimentType.push(expTypeVerbose);

        experimentResults[cpt].targetDist.push(Math.sqrt(Math.pow(target.offsetLeft - next.offsetLeft, 2) + Math.pow(target.offsetTop - next.offsetHeight, 2)));
        experimentResults[cpt].travelTime.push(Date.now() - startTime);

        experimentResults[cpt].targetSize.push(targetSize);
        startTime = Date.now();
    }
    isRecording = true;
    target.classList.add("selected");

    if (experimentType == ONEDIR) {
        document.addEventListener("mousemove", draw);
        mouseMove(event);
    }
}

function fillInEmptyFields() {
    if (experimentType == ONEDIR) {
        experimentResults[cpt].executionTimeMod1.push(-1);
        experimentResults[cpt].executionTimeMod2.push(-1);
        experimentResults[cpt].executionTimeMod3.push(-1);
        experimentResults[cpt].executionTimeKey.push(-1);
        experimentResults[cpt].key.push("null");
    } else {
        experimentResults[cpt].firstDirection.push("null");
        experimentResults[cpt].secondDirection.push("null");
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
    var modKey1 = navigator.userAgent.match(/Mac/i) ? e.metaKey : e.ctrlKey;
    var modKey2 = e.shiftKey;
    var modKey3 = e.altKey;

    var key = e.keyCode + 32;

    if (modKey1) {
        e.preventDefault();
    }

    if (isRecording && !mod1Done && modKey1 == currentExperiment.mod1 && modKey1 == true) {
        experimentResults[cpt].executionTimeMod1.push(Date.now() - startTime);
        mod1Done = true;
    }
    if (isRecording && !mod2Done && modKey2 == currentExperiment.mod2 && modKey2 == true) {
        experimentResults[cpt].executionTimeMod2.push(Date.now() - startTime);
        mod2Done = true;
    }
    if (isRecording && !mod3Done && modKey3 == currentExperiment.mod3 && modKey3 == true) {
        experimentResults[cpt].executionTimeMod3.push(Date.now() - startTime);
        mod3Done = true;
    }
    if (isRecording && !keyDone && key == currentExperiment.Key.charCodeAt()) {
        experimentResults[cpt].executionTimeKey.push(Date.now() - startTime);
        keyDone = true;
    }

    var shortcutSuccess = isRecording &&
        modKey1 == currentExperiment.mod1 &&
        modKey2 == currentExperiment.mod2 &&
        modKey3 == currentExperiment.mod3 &&
        key == currentExperiment.Key.charCodeAt();

    if (shortcutSuccess) {
        if (currentExperiment.mod1 == false) {
            experimentResults[cpt].executionTimeMod1.push(-1);
        }
        if (currentExperiment.mod2 == false) {
            experimentResults[cpt].executionTimeMod2.push(-1);
        }
        if (currentExperiment.mod3 == false) {
            experimentResults[cpt].executionTimeMod3.push(-1);
        }

        experimentResults[cpt].key.push(currentExperiment.Key);
        experimentResults[cpt].totalExecutionTime.push(Date.now() - startTime);

        mod1Done = false;
        mod2Done = false;
        mod3Done = false;
        keyDone = false;

        var next = document.getElementById("next");
        next.disabled = false;

        fillInEmptyFields();
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
        // l1firstP = lines[0][0][0]
        // l1lastP = lines[0][lines[0].length-1][1]
        // l2firstP = lines[1][0][0]
        // l2lastP = lines[1][lines[1].length-1][1]
        firstP = lines[0][0][0]
        lastP = lines[0][lines[0].length - 1][1]
            //console.log(getAngle(firstP, lastP))

        firstDrawn = getAngle(firstP, lastP)
            // firstDrawn = getAngle()%20/20 * 360 + getAngle()
            // secondDrawn = getAngle()%20 * 360 + getAngle()

        keys = Object.keys(angles);
        shortcutSuccess = isRecording && Math.abs(angle1 - firstDrawn) < 20 //&& Math.abs(secondAngle-secondDrawn) < 20 && lines.length==2

        if (shortcutSuccess) {
            var next = document.getElementById("next");
            next.disabled = false;

            experimentResults[cpt].firstDirection.push(currentExperiment.First);
            experimentResults[cpt].secondDirection.push("null");
            experimentResults[cpt].totalExecutionTime.push(Date.now() - startTime);

            fillInEmptyFields();
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

    //E = length of input stroke / menu depth
    // E = 50 / 2

    // W = E * 0.3

    // sensitivity = 0.75

    // if(lines.length>0 && lines[lines.length-1].length>5 && lines[lines.length-1][0].length>0){
    //     current = lines[lines.length-1]
    //     A = current[0][0]
    //     C = tmp2

    //     for(i=0;i<current.length;i++){
    //         B = current[i][1]
    //         if(Math.abs(getAngle(A,B)-getAngle(B,C))>30){
    //             lines.push([])
    //             console.log(getAngle(A,B),getAngle(B,C))
    //             break;
    //         }
    //     }

    // pastSeqP2 = current[current.length-4][1]
    // currentSeqP = current[current.length-3][0]
    // if(Math.abs(getAngle(currentSeqP,tmp2)-getAngle(pastSeqP1,pastSeqP2))>40 && (pastSeqP2[0]-tmp2[0]>5 || pastSeqP2[1]-tmp2[1]>5)){
    //     lines.push([])
    //     console.log(getAngle(currentSeqP,tmp2),getAngle(pastSeqP1,pastSeqP2),pastSeqP2[0]-tmp2[0],pastSeqP2[1]-tmp2[1])
    // }
    // }
    lines[lines.length - 1].push([tmp1, tmp2]);

    ctx.stroke();
}