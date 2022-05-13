const params = new URLSearchParams(document.location.search);

const user_id = params.get("user_id");
const experimentType = Number(params.get("experiment_type"));

var participantID = 0;

if (!(parseInt(user_id) > 0 )) {
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

var modis = {
    0 : [],
    1 : ['CMD'],
    2 : ['CMD', 'Shift'],
    3: ['CMD', 'Alt', 'Shift']
}

var letters = {
    0 : [],
    1 : [],
    2 : [],
    3 : []
}

var myDir = [];

var shortcutElement;

// var target = document.createElement("div");
var target = document.querySelector("#target");
var backgroundCircle = document.querySelector('.bg');
var loadingCircle = document.querySelector(".meter");
var targetSize

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

    switch (experimentType) {
        case KEY_MULTI_MODI:
            tmp = allKeys.sort(() => Math.random() - 0.5)
            letters[0].push(tmp[0].toLowerCase());
            letters[0].push(tmp[1].toLowerCase());
            letters[0].push(tmp[2].toLowerCase());

            letters[1].push(tmp[3].toLowerCase());
            letters[2].push(tmp[4].toLowerCase());
            letters[3].push(tmp[5].toLowerCase());
            break;

        case GESTURE_MULTI_REPEAT:
            tmp = allAngles.sort(() => Math.random() - 0.5)
            myDir = tmp.slice(0,6)
    }

    resize();
    nextTest();
}

function updateInstructions() {
    switch (experimentType) {
        case KEY_MULTI_MODI:
            var shortcut = "";

            var nbModi = currentExperiment.NbModi;
            //Pick random modifiers
            modifiers = modis[nbModi];

            currentExperiment.cmds = [modifiers.includes("CMD")];
            currentExperiment.alts = [modifiers.includes("Alt")];
            currentExperiment.shifts = [modifiers.includes("Shift")];

            //Pick random letter
            tmp = letters[nbModi]
            currentExperiment.keys = [tmp[Math.floor(Math.random() * tmp.length)].toLowerCase()];

            for (i = 0; i < nbModi; i++) {
                if (currentExperiment.cmds[i]) shortcut += osCMDKey + " + ";
                if (currentExperiment.alts[i]) shortcut += osALTKey + " + ";
                if (currentExperiment.shifts[i]) shortcut += "Shift + ";
            }

            currentExperiment.modifiers1 = shortcut.slice(0, -3);
            currentExperiment.letter1 = currentExperiment.keys[0].toUpperCase();

            shortcut += currentExperiment.keys[0].toUpperCase();

            shortcutElement.innerHTML = shortcut;

            checkKeysValidity();
            break;

        case KEY_MULTI_REPEAT:
            var shortcut = "";
            
            nbRepeat = currentExperiment.Repeat;
            var modifiers = ['CMD','CMD','CMD'];

            currentExperiment.cmds = [];
            currentExperiment.alts = [];
            currentExperiment.shifts = [];
            currentExperiment.keys = [];

            lines = [];
            for(let i=0; i<nbRepeat; i++){
                lines.push("");

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

            checkKeysValidity();
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
            repeat = currentExperiment.Repeat;
            dir = myDir.sort(() => Math.random() - 0.5).slice(0, repeat)
            toDraw = [angles[dir[0]]];

            if(currentExperiment.Repeat==1){
                shortcutElement.innerHTML = emoji[dir[0]];
            }
            else if(currentExperiment.Repeat==2){
                toDraw.push(angles[dir[1]]);
                shortcutElement.innerHTML = "separately " + emoji[dir[0]] + " and " + emoji[dir[1]];
            }
            else if(currentExperiment.Repeat==3){
                toDraw.push(angles[dir[1]]);
                toDraw.push(angles[dir[2]]);
                shortcutElement.innerHTML = "consecutively " + emoji[dir[0]] + ", " + emoji[dir[1]] + " and " + emoji[dir[2]];
            }
            break;
    }
}

function nextTest() {
    if(cpt==totalNb){
        // window.location.assign(dirname+"thankyou?user_id="+user_id+"&experiment_type="+experimentType);
        window.location.assign(dirname + "endform?user_id=" + user_id + "&experiment_type=" + experimentType);
        return;
    }
    
    currentExperiment = experiments[cpt];
    toggleExperimentType(experimentType);
    if(experimentType==TWODIRONEDRAW) currentExperiment.DesignName = "2dir1draw";

    updateInstructions();

    console.log(currentExperiment);

    // target.style.backgroundColor = "";
    targetSize = (currentExperiment.Size-1) * 50 + 30;
    target.style.bottom = 200 + Math.floor(Math.random() * (window.innerHeight - target.clientHeight - 300 - targetSize)) + "px";
    target.style.left = 100 + Math.floor(Math.random() * (window.innerWidth - target.clientWidth - 200 - targetSize)) + "px";
    target.style.width = targetSize + "px";
    target.style.height = targetSize + "px";
    backgroundCircle.setAttribute("cx", targetSize/2);
    backgroundCircle.setAttribute("cy", targetSize/2);
    backgroundCircle.setAttribute("r", targetSize/2 - 2.5);
    loadingCircle.setAttribute("cx", targetSize/2);
    loadingCircle.setAttribute("cy", targetSize/2);
    loadingCircle.setAttribute("r", targetSize/2 - 2.5);
    loadingCircle.style.strokeDasharray = (targetSize-5)*Math.PI;
    loadingCircle.style.strokeDashoffset = (targetSize-5)*Math.PI;
    loadingCircle.classList.remove("animation");

    isRecording = false;
    backgroundCircle.classList.remove("selected");
    target.classList.remove("selected");

    next.disabled = true;
    // target.hidden = false;
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
        var mouseX = event.clientX;
        var mouseY = event.clientY;
        var nextX = next.offsetLeft + next.offsetWidth / 2;
        var nextY = next.offsetTop + next.offsetHeight / 2;
        targetDist = Math.sqrt(Math.pow(mouseX - nextX, 2) + Math.pow(mouseY - nextY, 2));
        console.log(targetDist);
        currentExperiment.targetDist = parseInt(targetDist);
    }
    currentExperiment["mouseClick"+(cptMultiDir+1)] = (Date.now() - startTime)/1000;
    isRecording = true;
    backgroundCircle.classList.add("selected");
    target.classList.add("selected");

    if (exGesture.includes(experimentType) && next.disabled) {
        attempts++;
        //console.log("attempts"+attempts);
        document.addEventListener("mousemove", draw);
        mouseMove(event);
    }
}
