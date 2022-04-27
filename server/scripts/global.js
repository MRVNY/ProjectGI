var direname;

if(window.location.hostname == "localhost") {
    dirname = "http://localhost:4000/"
}
else {
    dirname = "https://project-gi.ml/"
}

header = [
        //CSV Data
        "DesignName", "ParticipantID", "TrialID", "Block1", "Block2", "Size", "Dir", "NbModi", "NbAngle", "Repeat",
        
        //For Keyboard
        "letter1", "modifiers1",
        "execTimeCMD1", "execTimeAlt1", "execTimeShift1", "execTimeKey1", 

        "letter2", "modifiers2",
        "execTimeCMD2", "execTimeAlt2", "execTimeShift2", "execTimeKey2", 

        "letter3", "modifiers3",
        "execTimeCMD3", "execTimeAlt3", "execTimeShift3", "execTimeKey3", 
    
        //For Gestures
        "angle1", "userAngle1", "drawDist1",
        "angle2", "userAngle2", "drawDist2",

        //For Both
        "mouseClick1", "totalExecTime1", "nbOfAttempts1",
        "mouseClick2", "totalExecTime2", "nbOfAttempts2",
        "mouseClick3", "totalExecTime3", "nbOfAttempts3",
        "targetDist", "keyboardLayout", "mouseType"
    ];

//Ver1
const ONEKEY = 0
const TWOKEY = 1
const ONEDIR = 2
const TWODIR = 3
const TWODIRONEDRAW = 4;

//Ver2
const KEY_MULTI_MODI = 0;
const KEY_MULTI_REPEAT = 1;
const GESTURE_MULTI_ANGLE = 2;
const GESTURE_MULTI_REPEAT = 3;

const exKey = [ONEKEY, TWOKEY, KEY_MULTI_MODI, KEY_MULTI_REPEAT];
const exGesture = [ONEDIR, TWODIR, TWODIRONEDRAW,GESTURE_MULTI_ANGLE, GESTURE_MULTI_REPEAT];
const exRepeat = [TWODIR, TWOKEY, KEY_MULTI_REPEAT, GESTURE_MULTI_REPEAT];

types = {
    0 : "KEY_MULTI_MODI",
    1 : "KEY_MULTI_REPEAT",
    2 : "GESTURE_MULTI_ANGLE",
    3 : "GESTURE_MULTI_REPEAT",
}

description = {
    0: "1 keyboard shortcut with 0-3 modifiers",
    1: "1-3 keyboard shortcuts with 1 modifier",
    2: "1 gesture shortcut of 1 angle",
    3: "1-2 gesture shortcuts of 1-2 consecutive angles",
}

texts = {
    0: "Move the mouse cursor to the circle and click on the circle, then, press on the keys required in the instruction, when the instruction is correctly executed, the \"Next\" button will turn green",
    1: "Move the mouse cursor to the circle and click on the circle, press on the keys required in the first instruction, if correctly executed, the \"Next\" button will turn light green, then press on the keys required in the rest of the instructions (if there are), if correctly executed, the \"Next\" button will turn green",
    2: "Move the mouse cursor to the circle, click on the circle and drag it towards the first required direction, if there is another direction in the instruction, without releasing the mouse, drag the cursor to the second required direction, when both instructions are correctly executed, the \"Next\" button will turn green",
    3: "Move the mouse cursor to the circle, click on the circle and drag it towards the first required direction, if correctly executed, the \"Next\" button will turn light green, do the same thing with the rest of the instructions (if there are), if correctly executed, the \"Next\" button will turn green",
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


