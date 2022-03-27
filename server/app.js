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

async function loadExperiment() {
    console.log("Loading CSV file...");
    const response = await fetch('./config.csv');
    console.log("CSV file loaded.");
    console.log("Fetching CSV file...");
    const text = await response.text();
    console.log("CSV file fetched.");
    return parseCSV(text);

}

function recordTime() {
    var time = new Date();
    var timeString = time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
    return timeString;
}

var data = []

var isRecording = false;

var osModKey = navigator.userAgent.match(/Mac/i) ? "cmd" : "ctrl";
var shortcuts = ["h", osModKey + "+x", osModKey + "+shift+g", osModKey + "+shift+alt+k"];

var block = 0
var trial
var start
var end

var isGestures = false;

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

var shortcutElement;

var target = document.createElement("div");
target.id = "target";
target.style.position = "fixed";
var targetSize
target.style.borderRadius = "50%";
target.style.border = "2px solid black";

var shortcutIndex, angleIndex1, angleIndex2;
var canvas;
var ctx;
let coord = { x: 0, y: 0 };
lines = [
    []
]

document.addEventListener("mousedown", mouseDown);
document.addEventListener("mouseup", mouseUp);
window.addEventListener("resize", resize);

document.body.appendChild(target);

var experiments;

launch();

async function launch() {
    experiments = await loadExperiment();
    toggleExperimentType();
    resize();
    nextTest();
}

function toggleExperimentType() {
    let selector = "#info";
    isGestures = isGestures == true ? false : true;

    if (isGestures) {
        document.querySelector(selector + " p").innerHTML = "Draw <b id=\"shortcut\"></b> to unlock next level.";

        canvas = document.createElement("canvas");
        canvas.id = "canvas";
        document.querySelector("body").prepend(canvas);

        ctx = canvas.getContext("2d");
        ctx.fillStyle = "blue";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    } else {
        document.querySelector(selector + " p").innerHTML = "Press <b id=\"shortcut\"></b> to unlock next level.";
    }

    shortcutElement = document.getElementById("shortcut");
}

function nextTest() {
    var next = document.getElementById("next");

    start = recordTime();
    block += 1;
    trial = experiments[block]
        //console.log(trial)

    if (block % 5 == 0) toggleExperimentType();

    if (isGestures) {
        keys = Object.keys(angles);
        angleIndex1 = Math.floor(Math.random() * keys.length);
        angleIndex2 = Math.floor(Math.random() * keys.length);
        shortcutElement.innerHTML = keys[angleIndex1] + " " + keys[angleIndex2];
    } else {
        shortcutIndex = Math.floor(Math.random() * shortcuts.length);
        shortcutElement.innerHTML = shortcuts[shortcutIndex];
    }

    target.style.backgroundColor = "";
    target.style.top = 100 + Math.floor(Math.random() * (window.innerHeight - target.clientHeight - 200)) + "px";
    target.style.left = 100 + Math.floor(Math.random() * (window.innerWidth - target.clientWidth - 200)) + "px";
    var targetSize = Math.random() * 100 + 25;
    target.style.width = targetSize + "px";
    target.style.height = targetSize + "px";

    isRecording = true;
    next.disabled = true;
}

function resize() {
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
}

/* Keyboard shortcuts part */

document.onkeydown = function(e) {
    var modKey1 = navigator.userAgent.match(/Mac/i) ? e.metaKey : e.ctrlKey;
    var modKey2 = e.shiftKey;
    var modKey3 = e.altKey;
    if (modKey1) {
        e.preventDefault();
    }
    shortcutSuccess = isRecording && (
        (shortcutIndex == 0 && e.keyCode == 72 && !modKey1 && !modKey2 && !modKey3) ||
        (shortcutIndex == 1 && e.keyCode == 88 && modKey1 && !modKey2 && !modKey3) ||
        (shortcutIndex == 2 && e.keyCode == 71 && modKey1 && modKey2 && !modKey3) ||
        (shortcutIndex == 3 && e.keyCode == 75 && modKey1 && modKey2 && modKey3));
    if (shortcutSuccess) {
        var next = document.getElementById("next");
        next.disabled = false;

        exp = experiments[block];

        sendToLogger(
            exp["DesignName"],
            exp["ParticipantID"],
            exp["TrialID"],
            exp["Block1"],
            exp["First"],
            exp["Second"],
            exp["Size"],
            time
        );
    }
}

/* Gestural interaction part */

target.onmouseover = function() {
    target.style.backgroundColor = "lightgray";
}

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
        console.log(getAngle(firstP, lastP))

        firstDrawn = getAngle(firstP, lastP)
            // firstDrawn = getAngle()%20/20 * 360 + getAngle()
            // secondDrawn = getAngle()%20 * 360 + getAngle()

        keys = Object.keys(angles);
        firstAngle = angles[keys[angleIndex1]]
        secondAngle = angles[keys[angleIndex2]]

        shortcutSuccess = isRecording && Math.abs(firstAngle - firstDrawn) < 20 //&& Math.abs(secondAngle-secondDrawn) < 20 && lines.length==2

        if (shortcutSuccess) {
            var next = document.getElementById("next");
            next.disabled = false;
            end = recordTime()
            time = (end - start) / 1000
            console.log(time + "s")

            exp = experiments[block];

            sendToLogger(
                exp["DesignName"],
                exp["ParticipantID"],
                exp["TrialID"],
                exp["Block1"],
                exp["First"],
                exp["Second"],
                exp["Size"],
                time
            );
        }
    }
    lines = [
        []
    ]
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