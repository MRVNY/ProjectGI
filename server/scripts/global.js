var direname;

if(window.location.hostname == "localhost") {
    dirname = "http://localhost:4000/"
}
else {
    dirname = "https://project-gi.ml/"
}

header = ["DesignName", "ParticipantID", "TrialID", "Block1", "Letter1", "Letter2", 
        "Modifier1", "Modifier2", "First", "Second", "Size", "keyboardLayout", "mouseType", "targetDist", 
        "executionTimeCMD1", "executionTimeAlt1", "executionTimeShift1", "executionTimeKey1", 
        "userAngle1", "drawDist1", "mouseClick1", "totalExecutionTime1", "NbOfAttempts1",
        "executionTimeCMD2", "executionTimeAlt2", "executionTimeShift2", "executionTimeKey2", 
        "userAngle2", "drawDist2", "mouseClick2", "totalExecutionTime2", "NbOfAttempts2"];

//Ver1
const ONEKEY = 0
const TWOKEY = 1
const ONEDIR = 2
const TWODIR = 3
const TWODIRONEDRAW = 4;

//Ver2
const MULTIMODI = 5;
const MULTIREPEAT = 6;

const exKey = [ONEKEY, TWOKEY, MULTIMODI, MULTIREPEAT];
const exGesture = [ONEDIR, TWODIR, TWODIRONEDRAW];
const exRepeat = [TWODIR, TWOKEY, MULTIREPEAT];

types = {
    0 : "ONEKEY",
    1 : "TWOKEY",
    2 : "ONEDIR",
    3 : "TWODIR",
    4 : "TWODIRONEDRAW",

    5 : "MULTIMODI",
    6 : "MULTIREPEAT"
}

description = {
    0: "1 keyboard shortcut with 1-4 keys",
    1: "2 keyboard shortcuts with 1-4 keys",
    2: "1 gesture shortcut of 1 direction",
    3: "2 gesture shortcuts of 1 direction",
    4: "1 gesture shortcut of 2 directions",

    5: "1 keyboard shortcut multiple modifiers",
    6: "multiple keyboard shortcuts with multiple modifiers"
}

texts = {
    0: "Move the mouse cursor to the circle and click on the circle, then, press on the keys required in the instruction, when the instruction is correctly executed, the \"Next\" button will turn green",
    1: "Move the mouse cursor to the circle and click on the circle, press on the keys required in the first instruction, if correctly executed, the \"Next\" button will turn light green, then press on the keys required in the second instruction, if correctly executed, the \"Next\" button will turn green",
    2: "Move the mouse cursor to the circle, click on the circle and drag it towards the required direction, when the instruction is correctly executed, the \"Next\" button will turn green",
    3: "Move the mouse cursor to the circle, click on the circle and drag it towards the first required direction, if correctly executed, the \"Next\" button will turn light green, do the same thing with the second instruction, if correctly executed, the \"Next\" button will turn green",
    4: "Move the mouse cursor to the circle, click on the circle and drag it towards the first required direction, then, without releasing the mouse, drag the cursor to the second required direction, when both instructions are correctly executed, the \"Next\" button will turn green",
    
    5: "Move the mouse cursor to the circle and click on the circle, then, press on the keys required in the instruction, when the instruction is correctly executed, the \"Next\" button will turn green",
    6: "Move the mouse cursor to the circle and click on the circle, press on the keys required in the first instruction, if correctly executed, the \"Next\" button will turn light green, then press on the keys required in the second instruction, if correctly executed, the \"Next\" button will turn green"
}

const experimentNb = Object.keys(types).length;
const participantNb = 20;

const zoneLeft = ["A", "Z", "E", "S", "D", "X", "C", "R"];
const zoneMiddle = ["R", "F", "V", "G", "B", "Y", "H"];
const zoneRight = ["U", "I", "J", "K", "P", "M"];

const allKeys = [...zoneLeft, ...zoneMiddle, ...zoneRight];

const allKeyboardLayouts = ["AZERTY", "QWERTY"];
const allMouseTypes = ["touchpad", "classic_mouse"];
var allModi = ["Alt", "Shift", "CMD"];
const osCMDKey = navigator.userAgent.match(/Mac/i) ? "CMD" : "Ctrl";
const osALTKey = navigator.userAgent.match(/Mac/i) ? "Option" : "Alt";


