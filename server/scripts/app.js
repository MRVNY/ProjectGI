/* To-Do */
/* - Randomiser l'experience */
/* - Faire en sorte que la position de la cible soit celle des experiences */
/* - Faire la page d'accueil */

const ONEKEY = 0
const TWOKEY = 1
const ONEDIR = 2
const TWODIR = 3
const TWODIRONEDRAW = 4;

const zoneLeft = ["A", "Z", "E", "S", "D", "X", "C", "R"];
const zoneMiddle = ["R", "F", "V", "G", "B", "Y", "H"];
const zoneRight = ["U", "I", "J", "K", "P", "M"];

const allKeyboardLayouts = ["AZERTY", "QWERTY"];
const allMouseTypes = ["touchpad", "classic_mouse"];

var params = new URLSearchParams(document.location.search);

var user_id = params.get("user_id");
var keyboard_layout = params.get("keyboard_layout");
var mouse_type = params.get("mouse_type");

var participantID = 0;

if (!(parseInt(user_id) > 0 && allKeyboardLayouts.includes(keyboard_layout) && allMouseTypes.includes(mouse_type))) {
    die("Broken experiment parameters in the URL, go back to the home page !");
}

participantID = user_id;

var isRecording = false;

var osModKey = navigator.userAgent.match(/Mac/i) ? "CMD" : "Ctrl";

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
var experimentType;

var startTime;
var cpt = 0;
var lv = 0;
var cptMultiKey = 0;
var cptMultiDir = 0;
var attempts = 0;
var totalNb;

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

launch();

async function launch() {
    experimentType = Math.floor(Math.random() * 5); //randomBetween0And3

    if (experimentType == ONEDIR || experimentType == TWODIR || experimentType == TWODIRONEDRAW) {
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
        //Go to end screen
        return;
    }
    currentExperiment = experiments[cpt];
    toggleExperimentType(experimentType);
    currentExperiment.keyboardLayout = keyboard_layout;
    currentExperiment.mouseType = mouse_type;
    if(experimentType==TWODIRONEDRAW) currentExperiment.DesignName = "2dir1draw";

    switch (experimentType) {
        case ONEKEY:
            var shortcut = "";

            //First
            var modifiers = currentExperiment.Modifier1.split("_");

            currentExperiment.cmds = [modifiers.includes("CMD")];
            currentExperiment.alts = [modifiers.includes("Alt")];
            currentExperiment.shifts = [modifiers.includes("Shift")];
            currentExperiment.keys = [getKeyFromKeyboardZone(currentExperiment.Letter1).toLowerCase()];

            for (i = 0; i < modifiers.length; i++) {
                if (modifiers[i] == "CMD") shortcut += osModKey + " + ";
                else if (modifiers[i] == "None") shortcut += " ";
                else shortcut += modifiers[i] + " + ";
            }
            shortcut += currentExperiment.keys[0].toUpperCase();

            shortcutElement.innerHTML = shortcut;
            break;
        case TWOKEY:
            var shortcut = "Press ";
            //First
            var modifiers = [currentExperiment.Modifier1.split("_"), currentExperiment.Modifier2.split("_")];

            currentExperiment.cmds = [modifiers[0].includes("CMD"), modifiers[1].includes("CMD")];
            currentExperiment.alts = [modifiers[0].includes("Alt"), modifiers[1].includes("Alt")];
            currentExperiment.shifts = [modifiers[0].includes("Shift"), modifiers[1].includes("Shift")];
            currentExperiment.keys = [
                getKeyFromKeyboardZone(currentExperiment.Letter1).toLowerCase(),
                getKeyFromKeyboardZone(currentExperiment.Letter2).toLowerCase()
            ];
            
            for (i = 0; i < modifiers.length; i++) {
                if (currentExperiment.cmds[i]) shortcut += osModKey + " + ";
                if (currentExperiment.alts[i]) shortcut += "alt + ";
                if (currentExperiment.shifts[i]) shortcut += "shift + ";
                shortcut += currentExperiment.keys[i].toUpperCase();
                if (i < modifiers.length - 1) shortcut += ", then ";
            }

            shortcutElement.innerHTML = shortcut;
            break;

        case ONEDIR:
            toDraw = [];
            toDraw.push(angles[currentExperiment.First]);
            shortcutElement.innerHTML = emoji[currentExperiment.First];
            break;

        case TWODIRONEDRAW:
            toDraw = [];
            toDraw.push(angles[currentExperiment.First]);
            toDraw.push(angles[currentExperiment.Second]);
            if(Math.abs(toDraw[0]-toDraw[1])==180 || toDraw[0]==toDraw[1]){
                console.log(toDraw)
                cpt++;
                nextTest();
            }
            shortcutElement.innerHTML = emoji[currentExperiment.First] + " " + emoji[currentExperiment.Second] + " consecutively";
            break;

        case TWODIR:
            toDraw = [];
            toDraw.push(angles[currentExperiment.First]);
            toDraw.push(angles[currentExperiment.Second]);
            shortcutElement.innerHTML = emoji[currentExperiment.First] + " and then " + emoji[currentExperiment.Second];
            break;
    }

    target.style.backgroundColor = "";
    target.style.top = 100 + Math.floor(Math.random() * (window.innerHeight - target.clientHeight - 350)) + "px";
    target.style.left = 100 + Math.floor(Math.random() * (window.innerWidth - target.clientWidth - 300)) + "px";
    targetSize = (currentExperiment.Size-1) * 60 + 40;
    target.style.width = targetSize + "px";
    target.style.height = targetSize + "px";

    isRecording = false;
    target.classList.remove("selected");

    next.disabled = true;
    target.hidden = false;
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
        currentExperiment.targetDist = targetDist;
        startTime = Date.now();
    }
    isRecording = true;
    target.classList.add("selected");

    if ((experimentType == ONEDIR || experimentType == TWODIR || experimentType==TWODIRONEDRAW) && next.disabled) {
        attempts++;
        console.log("attempts"+attempts);
        currentExperiment["mouseClick"+(cptMultiKey+1)] = Date.now() - startTime;
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

document.onkeyup = function() {
    pressing = false;
}

document.onkeydown = function(e) {
    if (experimentType==ONEKEY || experimentType==TWOKEY) {
        if (!pressing){attempts++; 
            console.log("attempts"+attempts);}
        pressing = true;

        var next = document.getElementById("next");
        if(!next.disabled) isRecording = false;

        var cmdKey = navigator.userAgent.match(/Mac/i) ? e.metaKey : e.ctrlKey;
        var shiftKey = e.shiftKey;
        var altKey = e.altKey;

        var key = e.keyCode + 32;

        if (cmdKey) {
            e.preventDefault();
        }

        if (isRecording && !cmdDone && cmdKey == currentExperiment.cmds[cptMultiKey] && cmdKey == true) {
            currentExperiment["executionTimeCMD"+(cptMultiKey+1)] = Date.now() - startTime;
            cmdDone = true;
        }
        if (isRecording && !altDone && altKey == currentExperiment.alts[cptMultiKey] && altKey == true) {
            currentExperiment["executionTimeAlt"+(cptMultiKey+1)] = Date.now() - startTime;
            altDone = true;
        }
        if (isRecording && !shiftDone && shiftKey == currentExperiment.shifts[cptMultiKey] && shiftKey == true) {
            currentExperiment["executionTimeShift"+(cptMultiKey+1)] = Date.now() - startTime;
            shiftDone = true;
        }
        if (isRecording && !keyDone && key == currentExperiment.keys[cptMultiKey].charCodeAt()) {
            currentExperiment["executionTimeKey"+(cptMultiKey+1)] = Date.now() - startTime;
            keyDone = true;
        }

        var shortcutSuccess = isRecording &&
            cmdKey == currentExperiment.cmds[cptMultiKey] &&
            shiftKey == currentExperiment.shifts[cptMultiKey] &&
            altKey == currentExperiment.alts[cptMultiKey] &&
            key == currentExperiment.keys[cptMultiKey].charCodeAt();

        if (shortcutSuccess) {
            cmdDone = false;
            altDone = false;
            shiftDone = false;
            keyDone = false;

            currentExperiment["totalExecutionTime"+(cptMultiKey+1)] = Date.now() - startTime;
            currentExperiment["NbOfAttempts"+(cptMultiKey+1)] = Date.now() - startTime;
            attempts = 0;

            if (experimentType == ONEKEY || (experimentType == TWOKEY && cptMultiKey == 1)) {
                var next = document.getElementById("next");
                next.disabled = false;
                next.style.backgroundColor = '#4CAF50';
                target.hidden = true;
                checkLogging(cpt, experiments, participantID);
                cpt++;
                lv++;
                cptMultiKey = 0;
            } else {
                cptMultiKey++;
                next.style.backgroundColor = '#4caf4f4a';
            }

            startTime = Date.now();
        }
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

function get3PointsAngle(A, B, C) {
    var AB = Math.sqrt(Math.pow(B[0] - A[0], 2) + Math.pow(B[1] - A[1], 2));
    var BC = Math.sqrt(Math.pow(B[0] - C[0], 2) + Math.pow(B[1] - C[1], 2));
    var AC = Math.sqrt(Math.pow(C[0] - A[0], 2) + Math.pow(C[1] - A[1], 2));

    return Math.acos((BC * BC + AB * AB - AC * AC) / (2 * BC * AB));
}

function getTotalDistance(lines) {
    var total = 0;

    for (let i = 1; i < lines.length; i++) {
        let x1 = parseInt(lines[i - 1][0]);
        let y1 = parseInt(lines[i - 1][1]);
        let x2 = parseInt(lines[i][0]);
        let y2 = parseInt(lines[i][1]);

        let norm = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        total += norm;
    }

    return total;
}

function getDistance(p1, p2) {
    let x1 = parseInt(p1[0]);
    let y1 = parseInt(p1[1]);
    let x2 = parseInt(p2[0]);
    let y2 = parseInt(p2[1]);

    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function mouseUp() {
    document.removeEventListener("mousemove", draw);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    shortcutSuccess = false;
    var firstDrawn, secondDrawn;

    if (lines.length > 0) {

        var articulationPoints = [lines[0]];

        var E = getTotalDistance(lines) / 2;
        var W = E * 0.3;

        var Aindex = 0,
            Bindex = 0,
            Cindex = 0;
        var keepLooping = true;

        //console.log(W);

        while (keepLooping) {
            Cindex = -1;

            for (let i = Aindex + 1; i < lines.length; i++) {
                let slicedLines = lines.slice(Aindex, i);
                if (getTotalDistance(slicedLines) > W) {
                    Cindex = i;
                    break;
                }
            }

            if (Cindex == -1) {
                keepLooping = false;
                break;
            }

            let L_ab_index = -1,
                L_bc_index = -1;

            for (let i = Aindex + 1; i < lines.length; i++) {
                let slicedLines = lines.slice(Aindex, i);
                if (getTotalDistance(slicedLines) > W / 8) {
                    L_ab_index = i;
                    break;
                }
            }

            for (let i = Cindex - 1; i > Aindex; i--) {
                let slicedLines = lines.slice(i, Cindex);
                if (getTotalDistance(slicedLines) > W / 8) {
                    L_bc_index = i;
                    break;
                }
            }

            let maxAngle = -360;

            // console.log(L_ab_index, L_bc_index, Cindex, lines.length)

            for (let j = L_ab_index; j <= L_bc_index; j++) {
                let angle = get3PointsAngle(lines[Aindex], lines[j], lines[Bindex]);

                if (angle > maxAngle) {
                    maxAngle = angle;
                    Bindex = j;
                }
            }

            if (maxAngle > angleThreshold) {
                articulationPoints.push(lines[Bindex]);
                Aindex = Bindex;
            } else {
                Aindex++;
            }
        }

        //console.log(articulationPoints);
        articulationPoints.push(lines[lines.length - 1]);

        var strokeSegments = []

        for (let i = 1; i < articulationPoints.length; i++) {
            let x1 = parseInt(articulationPoints[i - 1][0]);
            let y1 = parseInt(articulationPoints[i - 1][1]);
            let x2 = parseInt(articulationPoints[i][0]);
            let y2 = parseInt(articulationPoints[i][1]);

            let norm = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

            if (norm >= 0.33 * E) {
                strokeSegments.push([articulationPoints[i - 1], articulationPoints[i]]);
            }
        }

        if (strokeSegments.length == 2) {
            firstDrawn = getAngle(strokeSegments[0][0], strokeSegments[0][1]);
            secondDrawn = getAngle(strokeSegments[1][0], strokeSegments[1][1]);
        } else if (strokeSegments.length == 1) {
            firstDrawn = getAngle(strokeSegments[0][0], strokeSegments[0][1]);
            secondDrawn = getAngle(strokeSegments[0][0], strokeSegments[0][1]);
        }


        if (experimentType == ONEDIR || experimentType == TWODIR) shortcutSuccess = isRecording && Math.abs(toDraw[cptMultiDir] - firstDrawn) < 30 && Math.abs(toDraw[cptMultiDir] - secondDrawn) < 30;
        else shortcutSuccess = isRecording && Math.abs(toDraw[0] - firstDrawn) < 30 && Math.abs(toDraw[1] - secondDrawn) < 30;
    }

    if (shortcutSuccess) {
    
        var firstP = lines[0],
            lastP = lines[lines.length - 1];

        var next = document.getElementById("next");

        currentExperiment["totalExecutionTime"+(cptMultiDir+1)] = Date.now() - startTime;
        currentExperiment["NbOfAttempts"+(cptMultiDir+1)] = Date.now() - startTime;
        attempts = 0;

        drawDist = Math.sqrt(Math.pow(firstP[0] - lastP[0], 2) + Math.pow(firstP[1] - lastP[1], 2));
        currentExperiment["drawDist"+(cptMultiKey+1)] = drawDist;
        currentExperiment["userAngle"+(cptMultiKey+1)] = firstDrawn;
        if (experimentType == TWODIRONEDRAW) currentExperiment["userAngle2"] = secondDrawn;

        if(experimentType != TWODIR || (experimentType == TWODIR && cptMultiDir==1)) {
            next.disabled = false;
            target.hidden = true;
            next.style.backgroundColor = '#4CAF50';
            checkLogging(cpt, experiments, participantID);
            cpt++;
            lv++;
            attempts = 0;
            cptMultiDir = 0;
            toDraw = [];
        }
        else{
            cptMultiDir++;
            next.style.backgroundColor = '#4caf4f4a';
        }

        startTime = Date.now();
    }

    lines = [];
}

function mouseMove(event) {
    if(next.disabled) {
        coord.x = event.clientX - canvas.offsetLeft;
        coord.y = event.clientY - canvas.offsetTop;
    }
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

    if (lines.length == 0) {
        lines.push(tmp1);
    }
    lines.push(tmp2);

    ctx.stroke();
}