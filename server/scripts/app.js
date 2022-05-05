/* To-Do */
/* - Randomiser l'experience */
/* - Faire en sorte que la position de la cible soit celle des experiences */
/* - Faire la page d'accueil */

const params = new URLSearchParams(document.location.search);

const user_id = params.get("user_id");
const keyboard_layout = params.get("keyboard_layout");
const mouse_type = params.get("mouse_type");
const experimentType = Number(params.get("experiment_type"));

var participantID = 0;

if (!(parseInt(user_id) > 0 && allKeyboardLayouts.includes(keyboard_layout) && allMouseTypes.includes(mouse_type))) {
    alert("Broken experiment parameters in the URL, go back to the home page !");
    window.location.assign(dirname);
}

participantID = user_id;

var isRecording = false;

const angles = {
    "N": 90,
    "S": 270,
    "E": 360,
    "W": 180,
    "NE": 45,
    "NW": 135,
    "SE": 315,
    "SW": 225
}

const emoji = {
    "N": "⬆️",
    "S": "⬇️",
    "E": "➡️",
    "W": "⬅️",
    "NE": "↗️",
    "NW": "↖️",
    "SE": "↘️",
    "SW": "↙️"
}

var shortcutElement;

var target = document.createElement("div");
target.id = "target";
target.style.position = "fixed";
var targetSize
target.style.borderRadius = "50%";
target.style.border = "2px solid black";

var shortcutIndex;
var toDraw = [];
var canvas;
var ctx;
let coord = { x: 0, y: 0 };
lines = []

document.body.appendChild(target);

var experiments;
var experiments;
var currentExperiment;

var startTime;
var cpt = 0;
var lv = 0;
var cptMultiKey = 0;
var cptMultiDir = 0;
var attempts = 0;
var totalNb;
var nbRepeat = 1;
var lines = [];

var pressing = false;
var cmdDone = false;
var altDone = false;
var shiftDone = false;
var keyDone = false;

var sensitivity = 0.9;
var M = 500;
var angleThreshold = 360 / M / 2 / sensitivity;
var shortcutSuccess = false;
var next = document.getElementById("next");
var instruction = document.getElementById("instruction");

launch();

async function launch() {
    if (exGesture.includes(experimentType)) {
        document.addEventListener("mouseup", mouseUp);
        window.addEventListener("resize", resize);
    }

    experiments = await loadExperiment(participantID, experimentType);
    console.log(experiments)
    totalNb = experiments.length;

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
    if(cpt==totalNb){
        logAll(experiments, participantID, experimentType);
        window.location.assign(dirname+"thankyou?user_id="+user_id+"&experiment_type="+experimentType);
        return;
    }
    
    currentExperiment = experiments[cpt];
    toggleExperimentType(experimentType);
    currentExperiment.keyboardLayout = keyboard_layout;
    currentExperiment.mouseType = mouse_type;
    if(experimentType==TWODIRONEDRAW) currentExperiment.DesignName = "2dir1draw";

    switch (experimentType) {
        // //ver1
        // case ONEKEY:
        //     var shortcut = "";

        //     //First
        //     var modifiers = currentExperiment.Modifier1.split("_");

        //     currentExperiment.cmds = [modifiers.includes("CMD")];
        //     currentExperiment.alts = [modifiers.includes("Alt")];
        //     currentExperiment.shifts = [modifiers.includes("Shift")];
        //     currentExperiment.keys = [getKeyFromKeyboardZone(currentExperiment.Letter1).toLowerCase()];

        //     for (i = 0; i < modifiers.length; i++) {
        //         if (modifiers[i] == "CMD") shortcut += osCMDKey + " + ";
        //         else if (modifiers[i] == "Alt") shortcut += osALTKey + " + ";
        //         else if (modifiers[i] == "None") shortcut += " ";
        //         else shortcut += modifiers[i] + " + ";
        //     }
        //     shortcut += currentExperiment.keys[0].toUpperCase();

        //     shortcutElement.innerHTML = shortcut;
        //     break;

        // case TWOKEY:
        //     nbRepeat = 2;
        //     var shortcut = "";
        //     //First
        //     //var modifiers = [currentExperiment.Modifier1.split("_"), currentExperiment.Modifier2.split("_")];
        //     var modifiers = [currentExperiment.Modifier1.split("_"), currentExperiment.Modifier1.split("_")];


        //     currentExperiment.cmds = [modifiers[0].includes("CMD"), modifiers[1].includes("CMD")];
        //     currentExperiment.alts = [modifiers[0].includes("Alt"), modifiers[1].includes("Alt")];
        //     currentExperiment.shifts = [modifiers[0].includes("Shift"), modifiers[1].includes("Shift")];
        //     currentExperiment.keys = [
        //         getKeyFromKeyboardZone(currentExperiment.Letter1).toLowerCase(),
        //         getKeyFromKeyboardZone(currentExperiment.Letter2).toLowerCase()
        //     ];
            
        //     for (i = 0; i < nbRepeat; i++) {
        //         if (currentExperiment.cmds[i]) shortcut += osCMDKey + " + ";
        //         if (currentExperiment.alts[i]) shortcut += osALTKey + " + ";
        //         if (currentExperiment.shifts[i]) shortcut += "Shift + ";
        //         shortcut += currentExperiment.keys[i].toUpperCase();
        //         if (i < nbRepeat - 1) shortcut += ", then ";
        //     }

        //     shortcutElement.innerHTML = shortcut;
        //     break;

        // case ONEDIR:
        //     toDraw = [];
        //     toDraw.push(angles[currentExperiment.First]);
        //     shortcutElement.innerHTML = emoji[currentExperiment.First];
        //     break;

        // case TWODIRONEDRAW:
        //     toDraw = [];
        //     toDraw.push(angles[currentExperiment.First]);
        //     toDraw.push(angles[currentExperiment.Second]);
        //     if(Math.abs(toDraw[0]-toDraw[1])==180 || toDraw[0]==toDraw[1]){
        //         cpt++;
        //         nextTest();
        //     }
        //     shortcutElement.innerHTML = emoji[currentExperiment.First] + " " + emoji[currentExperiment.Second] + " consecutively";
        //     break;

        // case TWODIR:
        //     toDraw = [];
        //     toDraw.push(angles[currentExperiment.First]);
        //     toDraw.push(angles[currentExperiment.Second]);
        //     shortcutElement.innerHTML = emoji[currentExperiment.First] + " and then " + emoji[currentExperiment.Second];
        //     break;

        //ve2
        case KEY_MULTI_MODI:
            var shortcut = "";

            var nbModi = currentExperiment.NbModi;
            //Pick random modifiers
            modifiers = allModi.sort(() => Math.random() - 0.5).slice(0, nbModi);

            currentExperiment.cmds = [modifiers.includes("CMD")];
            currentExperiment.alts = [modifiers.includes("Alt")];
            currentExperiment.shifts = [modifiers.includes("Shift")];

            //Pick random letter
            currentExperiment.keys = [allKeys[Math.floor(Math.random() * allKeys.length)].toLowerCase()];

            for (i = 0; i < nbModi; i++) {
                if (currentExperiment.cmds[i]) shortcut += osCMDKey + " + ";
                if (currentExperiment.alts[i]) shortcut += osALTKey + " + ";
                if (currentExperiment.shifts[i]) shortcut += "Shift + ";
            }

            currentExperiment.modifiers1 = shortcut.slice(0, -3);
            currentExperiment.letter1 = currentExperiment.keys[0].toUpperCase();

            shortcut += currentExperiment.keys[0].toUpperCase();


            shortcutElement.innerHTML = shortcut;
            break;

        case KEY_MULTI_REPEAT:
            var shortcut = "";
            
            nbRepeat = currentExperiment.Repeat;
            var modifiers = [];

            currentExperiment.cmds = [];
            currentExperiment.alts = [];
            currentExperiment.shifts = [];
            currentExperiment.keys = [];

            lines = [];
            for(let i=0; i<nbRepeat; i++){
                lines.push("");
                modifiers.push(allModi[Math.floor(Math.random() * allModi.length)]); //generate new modifier on the fly

                currentExperiment.cmds.push(modifiers[i].includes("CMD"));
                currentExperiment.alts.push(modifiers[i].includes("Alt"));
                currentExperiment.shifts.push(modifiers[i].includes("Shift"));

                currentExperiment.keys.push(allKeys[Math.floor(Math.random() * allKeys.length)].toLowerCase());
        

                if (currentExperiment.cmds[i]) lines[i] += osCMDKey + " + ";
                if (currentExperiment.alts[i]) lines[i] += osALTKey + " + ";
                if (currentExperiment.shifts[i]) lines[i] += "Shift + ";

                currentExperiment["modifiers"+(i+1)] = lines[i].slice(0, -3);
                currentExperiment["letter"+(i+1)] = currentExperiment.keys[i].toUpperCase();

                lines[i] += currentExperiment.keys[i].toUpperCase();
                if (i < nbRepeat - 1) lines[i] += "<br>";

                shortcut += lines[i];
            }

            shortcutElement.innerHTML = shortcut;
            break;

        case GESTURE_MULTI_ANGLE:
            dir = currentExperiment.Dir.split("_");
            toDraw = [angles[dir[0]]];

            if(currentExperiment.NbAngle==1){
                shortcutElement.innerHTML = emoji[dir[0]];
            }
            else{
                toDraw.push(angles[dir[1]]);
                shortcutElement.innerHTML = "consecutively " + emoji[dir[0]] + " " + emoji[dir[1]];
            }
            break;

        case GESTURE_MULTI_REPEAT:
            dir = currentExperiment.Dir.split("_");
            toDraw = [angles[dir[0]]];

            if(currentExperiment.Repeat==1){
                shortcutElement.innerHTML = emoji[dir[0]];
            }
            else{
                toDraw.push(angles[dir[1]]);
                shortcutElement.innerHTML = "separately " + emoji[dir[0]] + " and " + emoji[dir[1]];
            }
            break;
    }

    console.log(currentExperiment);

    target.style.backgroundColor = "";
    targetSize = (currentExperiment.Size-1) * 50 + 30;
    target.style.bottom = 200 + Math.floor(Math.random() * (window.innerHeight - target.clientHeight - 300 - targetSize)) + "px";
    target.style.left = 100 + Math.floor(Math.random() * (window.innerWidth - target.clientWidth - 200 - targetSize)) + "px";
    target.style.width = targetSize + "px";
    target.style.height = targetSize + "px";

    isRecording = false;
    target.classList.remove("selected");

    next.disabled = true;
    target.hidden = false;
    instruction.hidden = false;
    next.style.backgroundColor = "#ccc";
    startTime = Date.now();
}

function resize() {
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
}

target.onmousedown = function(event) {
    if (!isRecording) {
        targetDist = Math.sqrt(Math.pow(target.offsetLeft - next.offsetLeft, 2) + Math.pow(target.offsetTop - next.offsetHeight, 2));
        currentExperiment.targetDist = parseInt(targetDist);
    }
    currentExperiment["mouseClick"+(cptMultiDir+1)] = (Date.now() - startTime)/1000;
    isRecording = true;
    target.classList.add("selected");

    if (exGesture.includes(experimentType) && next.disabled) {
        attempts++;
        //console.log("attempts"+attempts);
        document.addEventListener("mousemove", draw);
        mouseMove(event);
    }
}