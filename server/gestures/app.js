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

//sendToLogger("test1", 1, 1, 1, "M", "CMD_Shift", 1, 2.463);


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

    text = "DesignName,ParticipantID,TrialID,Block1,First,Second,Size\ntest2,1,1,1,S,SW,2\ntest2,1,2,2,E,S,1\ntest2,1,3,3,NE,SE,1\ntest2,1,4,4,N,SE,3\ntest2,1,5,5,S,NE,3\ntest2,1,6,6,NE,S,1\ntest2,1,7,7,W,NW,3\ntest2,1,8,8,W,SW,3\ntest2,1,9,9,W,E,1\ntest2,1,10,10,E,N,1\ntest2,1,11,11,NW,SE,2\ntest2,1,12,12,E,E,2\ntest2,1,13,13,E,NW,1\ntest2,1,14,14,E,NW,2\ntest2,1,15,15,W,NE,1\ntest2,1,16,16,NW,S,2\ntest2,1,17,17,SE,SE,3\ntest2,1,18,18,NW,NE,2\ntest2,1,19,19,SE,W,1\ntest2,1,20,20,W,S,2\ntest2,1,21,21,NE,NW,2\ntest2,1,22,22,SW,SW,3\ntest2,1,23,23,SW,SE,1\ntest2,1,24,24,NE,SE,3\ntest2,1,25,25,SE,SE,2\ntest2,1,26,26,W,NE,3\ntest2,1,27,27,NE,E,3\ntest2,1,28,28,SW,W,2\ntest2,1,29,29,SE,NE,2\ntest2,1,30,30,SE,SE,1\ntest2,1,31,31,E,SE,2\ntest2,1,32,32,SW,S,3\ntest2,1,33,33,N,N,1\ntest2,1,34,34,E,W,3\ntest2,1,35,35,SE,NW,3\ntest2,1,36,36,E,S,2\ntest2,1,37,37,E,NE,3\ntest2,1,38,38,E,SE,3\ntest2,1,39,39,E,SW,1\ntest2,1,40,40,N,NW,1\ntest2,1,41,41,W,W,2\ntest2,1,42,42,SW,SW,2\ntest2,1,43,43,SE,NW,1\ntest2,1,44,44,SE,S,2\ntest2,1,45,45,N,W,1\ntest2,1,46,46,SW,NW,2\ntest2,1,47,47,NW,NW,1\ntest2,1,48,48,N,NE,1\ntest2,1,49,49,NE,NE,1\ntest2,1,50,50,SW,W,3\ntest2,1,51,51,SW,E,3\ntest2,1,52,52,E,N,3\ntest2,1,53,53,SW,NE,1\ntest2,1,54,54,E,NE,1\ntest2,1,55,55,SW,SE,2\ntest2,1,56,56,NW,N,2\ntest2,1,57,57,W,E,3\ntest2,1,58,58,S,NE,1\ntest2,1,59,59,S,SW,1\ntest2,1,60,60,NE,S,2\ntest2,1,61,61,S,N,3\ntest2,1,62,62,NE,NE,3\ntest2,1,63,63,NW,E,1\ntest2,1,64,64,S,SE,3\ntest2,1,65,65,N,SW,3\ntest2,1,66,66,SE,N,1\ntest2,1,67,67,S,N,1\ntest2,1,68,68,SE,S,3\ntest2,1,69,69,S,SW,3\ntest2,1,70,70,E,SW,2\ntest2,1,71,71,NW,W,3\ntest2,1,72,72,SE,N,2\ntest2,1,73,73,E,E,1\ntest2,1,74,74,NE,SW,1\ntest2,1,75,75,W,W,1\ntest2,1,76,76,NE,N,1\ntest2,1,77,77,N,S,1\ntest2,1,78,78,N,N,3\ntest2,1,79,79,NE,E,2\ntest2,1,80,80,N,E,1\ntest2,1,81,81,W,SE,3\ntest2,1,82,82,SE,SW,3\ntest2,1,83,83,W,N,1\ntest2,1,84,84,SW,N,3\ntest2,1,85,85,SW,E,2\ntest2,1,86,86,S,S,1\ntest2,1,87,87,S,NW,3\ntest2,1,88,88,E,SW,3\ntest2,1,89,89,E,SE,1\ntest2,1,90,90,SW,SW,1\ntest2,1,91,91,NE,NE,2\ntest2,1,92,92,NE,W,3\ntest2,1,93,93,W,NW,2\ntest2,1,94,94,S,S,3\ntest2,1,95,95,E,N,2\ntest2,1,96,96,E,W,1\ntest2,1,97,97,NW,E,2\ntest2,1,98,98,NW,NE,1\ntest2,1,99,99,NE,SW,3\ntest2,1,100,100,E,E,3\ntest2,1,101,101,S,SE,1\ntest2,1,102,102,NE,SE,2\ntest2,1,103,103,W,S,3\ntest2,1,104,104,S,E,2\ntest2,1,105,105,N,W,3\ntest2,1,106,106,NE,N,2\ntest2,1,107,107,SW,N,2\ntest2,1,108,108,SW,NW,1\ntest2,1,109,109,NW,N,1\ntest2,1,110,110,W,NW,1\ntest2,1,111,111,NW,SE,1\ntest2,1,112,112,SW,S,1\ntest2,1,113,113,N,NW,3\ntest2,1,114,114,S,NE,2\ntest2,1,115,115,NE,NW,3\ntest2,1,116,116,NW,W,2\ntest2,1,117,117,SE,S,1\ntest2,1,118,118,NW,SW,2\ntest2,1,119,119,NE,W,1\ntest2,1,120,120,S,E,3\ntest2,1,121,121,N,W,2\ntest2,1,122,122,NW,NE,3\ntest2,1,123,123,SW,W,1\ntest2,1,124,124,N,SW,1\ntest2,1,125,125,NE,E,1\ntest2,1,126,126,NW,SW,3\ntest2,1,127,127,SW,E,1\ntest2,1,128,128,NW,SE,3\ntest2,1,129,129,NE,N,3\ntest2,1,130,130,W,W,3\ntest2,1,131,131,NE,SW,2\ntest2,1,132,132,SE,E,1\ntest2,1,133,133,SW,NE,3\ntest2,1,134,134,W,SE,2\ntest2,1,135,135,W,SW,2\ntest2,1,136,136,W,E,2\ntest2,1,137,137,N,E,3\ntest2,1,138,138,SE,NE,1\ntest2,1,139,139,SW,N,1\ntest2,1,140,140,E,W,2\ntest2,1,141,141,S,NW,1\ntest2,1,142,142,N,NW,2\ntest2,1,143,143,N,NE,3\ntest2,1,144,144,NW,SW,1\ntest2,1,145,145,NW,NW,3\ntest2,1,146,146,SE,SW,1\ntest2,1,147,147,S,W,2\ntest2,1,148,148,NE,S,3\ntest2,1,149,149,NW,S,3\ntest2,1,150,150,S,S,2\ntest2,1,151,151,SE,N,3\ntest2,1,152,152,N,N,2\ntest2,1,153,153,W,NE,2\ntest2,1,154,154,W,S,1\ntest2,1,155,155,S,NW,2\ntest2,1,156,156,S,E,1\ntest2,1,157,157,E,NE,2\ntest2,1,158,158,N,SW,2\ntest2,1,159,159,SE,E,3\ntest2,1,160,160,W,SW,1\ntest2,1,161,161,SE,NE,3\ntest2,1,162,162,NW,S,1\ntest2,1,163,163,S,N,2\ntest2,1,164,164,NW,W,1\ntest2,1,165,165,NW,NW,2\ntest2,1,166,166,W,N,2\ntest2,1,167,167,N,SE,2\ntest2,1,168,168,N,NE,2\ntest2,1,169,169,W,N,3\ntest2,1,170,170,E,S,3\ntest2,1,171,171,NE,W,2\ntest2,1,172,172,SW,SE,3\ntest2,1,173,173,N,S,3\ntest2,1,174,174,SE,W,2\ntest2,1,175,175,SE,NW,2\ntest2,1,176,176,NW,N,3\ntest2,1,177,177,S,SE,2\ntest2,1,178,178,SW,NW,3\ntest2,1,179,179,NW,E,3\ntest2,1,180,180,N,S,2\ntest2,1,181,181,S,W,1\ntest2,1,182,182,N,SE,1\ntest2,1,183,183,N,E,2\ntest2,1,184,184,W,SE,1\ntest2,1,185,185,SW,NE,2\ntest2,1,186,186,NE,NW,1\ntest2,1,187,187,SW,S,2\ntest2,1,188,188,E,NW,3\ntest2,1,189,189,SE,E,2\ntest2,1,190,190,S,W,3\ntest2,1,191,191,SE,W,3\ntest2,1,192,192,SE,SW,2\ntest2,1,193,193,NW,NW,1\ntest2,1,194,194,E,N,3\ntest2,1,195,195,NE,NW,3\ntest2,1,196,196,NE,NW,2\ntest2,1,197,197,E,SW,1\ntest2,1,198,198,E,E,3\ntest2,1,199,199,SW,SW,1\ntest2,1,200,200,E,W,1\ntest2,1,201,201,NE,E,2\ntest2,1,202,202,NE,NE,1\ntest2,1,203,203,E,W,2\ntest2,1,204,204,NW,N,2\ntest2,1,205,205,S,SE,3\ntest2,1,206,206,N,SW,3\ntest2,1,207,207,SW,E,2\ntest2,1,208,208,NE,E,1\ntest2,1,209,209,NW,NW,2\ntest2,1,210,210,W,SE,2\ntest2,1,211,211,W,S,1\ntest2,1,212,212,N,S,1\ntest2,1,213,213,N,NW,3\ntest2,1,214,214,SE,SW,2\ntest2,1,215,215,SW,S,2\ntest2,1,216,216,SE,S,1\ntest2,1,217,217,NW,W,1\ntest2,1,218,218,S,NW,3\ntest2,1,219,219,N,W,3\ntest2,1,220,220,NW,E,3\ntest2,1,221,221,N,SW,2\ntest2,1,222,222,S,N,2\ntest2,1,223,223,SE,S,3\ntest2,1,224,224,SE,W,2\ntest2,1,225,225,S,SW,2\ntest2,1,226,226,NE,S,2\ntest2,1,227,227,NW,S,1\ntest2,1,228,228,SW,NE,1\ntest2,1,229,229,NW,E,1\ntest2,1,230,230,S,SW,3\ntest2,1,231,231,E,SW,2\ntest2,1,232,232,NW,S,2\ntest2,1,233,233,W,N,1\ntest2,1,234,234,SE,W,3\ntest2,1,235,235,W,SW,1\ntest2,1,236,236,NW,S,3\ntest2,1,237,237,E,N,1\ntest2,1,238,238,SW,NE,2\ntest2,1,239,239,W,E,2\ntest2,1,240,240,E,NW,1\ntest2,1,241,241,NW,N,1\ntest2,1,242,242,N,S,2\ntest2,1,243,243,S,SE,2\ntest2,1,244,244,SW,E,3\ntest2,1,245,245,S,W,1\ntest2,1,246,246,S,N,3\ntest2,1,247,247,E,NW,3\ntest2,1,248,248,NW,NE,3\ntest2,1,249,249,W,SE,3\ntest2,1,250,250,E,NE,3\ntest2,1,251,251,SW,NW,2\ntest2,1,252,252,S,SE,1\ntest2,1,253,253,NE,E,3\ntest2,1,254,254,NW,SE,1\ntest2,1,255,255,SW,E,1\ntest2,1,256,256,N,W,1\ntest2,1,257,257,NE,SE,3\ntest2,1,258,258,NW,NW,3\ntest2,1,259,259,SE,SE,2\ntest2,1,260,260,S,S,2\ntest2,1,261,261,N,NE,1\ntest2,1,262,262,NW,W,3\ntest2,1,263,263,SE,E,1\ntest2,1,264,264,SE,SW,1\ntest2,1,265,265,SW,SE,2\ntest2,1,266,266,NW,SW,2\ntest2,1,267,267,SE,SW,3\ntest2,1,268,268,NW,E,2\ntest2,1,269,269,N,SE,3\ntest2,1,270,270,NE,SE,1\ntest2,1,271,271,S,E,2\ntest2,1,272,272,W,NW,3\ntest2,1,273,273,W,NW,2\ntest2,1,274,274,N,NE,2\ntest2,1,275,275,E,E,1\ntest2,1,276,276,NE,W,2\ntest2,1,277,277,NW,N,3\ntest2,1,278,278,SW,W,2\ntest2,1,279,279,SW,SW,2\ntest2,1,280,280,SE,N,2\ntest2,1,281,281,S,N,1\ntest2,1,282,282,S,W,3\ntest2,1,283,283,W,NW,1\ntest2,1,284,284,SW,NW,1\ntest2,1,285,285,E,SE,1\ntest2,1,286,286,SE,SE,1\ntest2,1,287,287,SW,W,3\ntest2,1,288,288,S,NE,1\ntest2,1,289,289,NW,SE,3\ntest2,1,290,290,SW,NE,3\ntest2,1,291,291,S,E,3\ntest2,1,292,292,W,E,3\ntest2,1,293,293,SE,NW,1\ntest2,1,294,294,NW,W,2\ntest2,1,295,295,N,N,3\ntest2,1,296,296,SW,S,3\ntest2,1,297,297,E,E,2\ntest2,1,298,298,NW,NE,1\ntest2,1,299,299,E,S,3\ntest2,1,300,300,W,SE,1\ntest2,1,301,301,N,W,2\ntest2,1,302,302,E,SW,3\ntest2,1,303,303,SW,N,1\ntest2,1,304,304,SW,SE,3\ntest2,1,305,305,NW,NE,2\ntest2,1,306,306,E,SE,3\ntest2,1,307,307,S,NE,2\ntest2,1,308,308,NE,SW,2\ntest2,1,309,309,NE,S,3\ntest2,1,310,310,N,NE,3\ntest2,1,311,311,NE,N,2\ntest2,1,312,312,N,N,1\ntest2,1,313,313,NW,SE,2\ntest2,1,314,314,W,SW,2\ntest2,1,315,315,SW,NW,3\ntest2,1,316,316,SW,SW,3\ntest2,1,317,317,W,S,3\ntest2,1,318,318,NW,SW,1\ntest2,1,319,319,SE,NW,2\ntest2,1,320,320,S,NW,1\ntest2,1,321,321,NE,SW,3\ntest2,1,322,322,SW,N,3\ntest2,1,323,323,NE,W,1\ntest2,1,324,324,SE,N,3\ntest2,1,325,325,N,E,2\ntest2,1,326,326,NE,W,3\ntest2,1,327,327,E,N,2\ntest2,1,328,328,N,E,1\ntest2,1,329,329,W,E,1\ntest2,1,330,330,E,NE,2\ntest2,1,331,331,W,N,3\ntest2,1,332,332,S,SW,1\ntest2,1,333,333,N,NW,1\ntest2,1,334,334,SE,SE,3\ntest2,1,335,335,W,NE,1\ntest2,1,336,336,N,NW,2\ntest2,1,337,337,SE,NE,1\ntest2,1,338,338,W,N,2\ntest2,1,339,339,SE,NW,3\ntest2,1,340,340,NE,SE,2\ntest2,1,341,341,NW,SW,3\ntest2,1,342,342,SE,NE,2\ntest2,1,343,343,S,W,2\ntest2,1,344,344,E,S,1\ntest2,1,345,345,S,S,1\ntest2,1,346,346,NE,N,1\ntest2,1,347,347,W,W,2\ntest2,1,348,348,E,SE,2\ntest2,1,349,349,NE,NE,3\ntest2,1,350,350,SW,SE,1\ntest2,1,351,351,W,NE,2\ntest2,1,352,352,S,S,3\ntest2,1,353,353,SE,E,3\ntest2,1,354,354,N,SW,1\ntest2,1,355,355,W,NE,3\ntest2,1,356,356,W,W,3\ntest2,1,357,357,N,E,3\ntest2,1,358,358,NE,SW,1\ntest2,1,359,359,W,S,2\ntest2,1,360,360,E,NW,2\ntest2,1,361,361,W,W,1\ntest2,1,362,362,E,NE,1\ntest2,1,363,363,SW,N,2\ntest2,1,364,364,SE,E,2\ntest2,1,365,365,NE,S,1\ntest2,1,366,366,S,NW,2\ntest2,1,367,367,SE,NE,3\ntest2,1,368,368,SW,W,1\ntest2,1,369,369,SE,S,2\ntest2,1,370,370,NE,NW,1\ntest2,1,371,371,NE,N,3\ntest2,1,372,372,S,NE,3\ntest2,1,373,373,E,W,3\ntest2,1,374,374,SE,W,1\ntest2,1,375,375,W,SW,3\ntest2,1,376,376,NE,NE,2\ntest2,1,377,377,N,SE,1\ntest2,1,378,378,SW,S,1\ntest2,1,379,379,N,S,3\ntest2,1,380,380,SE,N,1\ntest2,1,381,381,N,N,2\ntest2,1,382,382,E,S,2\ntest2,1,383,383,S,E,1\ntest2,1,384,384,N,SE,2"
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

var isRecording = false;

var block = 0
var trial
var start
var end

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

//console.log(experiment);

const shortcutElement = document.getElementById("shortcut");

var target = document.createElement("div");
target.id = "target";
target.style.position = "fixed";
var targetSize
target.style.borderRadius = "50%";
target.style.border = "2px solid black";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let coord = { x: 0, y: 0 };
lines = [
    []
]

document.addEventListener("mousedown", mouseDown);
document.addEventListener("mouseup", mouseUp);
window.addEventListener("resize", resize);

document.body.appendChild(target);

nextTest();

function nextTest() {
    start = recordTime();
    block += 1;
    trial = experiments[block]
    console.log(trial)

    var next = document.getElementById("next");
    var shortcut = trial["First"] + " " + trial["Second"]
    shortcutElement.innerHTML = shortcut;

    target.style.backgroundColor = "";

    target.style.top = 100 + Math.floor(Math.random() * (window.innerHeight - target.clientHeight - 200)) + "px";

    target.style.left = 100 + Math.floor(Math.random() * (window.innerHeight - target.clientHeight - 200)) + "px";

    targetSize = 50 * parseInt(trial["Size"]);
    target.style.width = targetSize + "px";
    target.style.height = targetSize + "px";

    isRecording = false;
    next.disabled = true;
}


target.onmouseover = function() {
    isRecording = true;
    target.style.backgroundColor = "lightgray";
}

function resize() {
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
}

resize();

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

        firstAngle = angles[trial["First"]]
        secondAngle = angles[trial["Second"]]

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