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
        "targetDist"
    ];

userDataHeader = ["DesignName", "ParticipantID", "keyboardLayout", "mouseType", "user_id", "user_age", "user_gender", "frequency"]

//Ver1
const ONEKEY = 0
const TWOKEY = 1
const ONEDIR = 2
const TWODIR = 3
const TWODIRONEDRAW = 4;

//Ver2
const KEY_MULTI_MODI = 2;
// const KEY_MULTI_REPEAT = 1;
const GESTURE_MULTI_ANGLE = 3;
// const GESTURE_MULTI_REPEAT = 3;

//Ver3
const KEY_MULTI_REPEAT = 0;
const GESTURE_MULTI_REPEAT = 1;

const exKey = [KEY_MULTI_MODI, KEY_MULTI_REPEAT];
const exGesture = [GESTURE_MULTI_ANGLE, GESTURE_MULTI_REPEAT];
const exRepeat = [KEY_MULTI_REPEAT, GESTURE_MULTI_REPEAT];

// types = {
//     0 : "KEY_MULTI_MODI",
//     1 : "KEY_MULTI_REPEAT",
//     2 : "GESTURE_MULTI_ANGLE",
//     3 : "GESTURE_MULTI_REPEAT",
// }

types = {
    0: "KEY_MULTI_REPEAT",
    1: "GESTURE_MULTI_REPEAT",
}

// description = {
//     0: "1 keyboard shortcut with 0-3 modifiers",
//     1: "1-3 keyboard shortcuts with 1 modifier",
//     2: "1 gesture shortcut of 1-2 angle",
//     3: "1-2 gesture shortcuts of 1 angle",
// }

description = {
    0: "1-3 keyboard shortcuts with 1 modifier",
    1: "1-3 gesture shortcuts of 1 angle",
}

// tutos = {
//     0: ["1 keyboard shortcut ", "keyboard shortcut is ", "keyboard shortcut has "],
//     1: ["1-3 keyboard shortcuts ", "keyboard shortcuts are ", "keyboard shortcuts have "],
//     2: ["1 gestural shortcut ", "gestural shortcut is ", "gestural shortcut has "],
//     3: ["1-3 gestural shortcuts ", "gestural shortcuts are ", "gestural shortcuts have "],
// }

tutos = {
    0: ["1-3 keyboard shortcuts ", "keyboard shortcuts are ", "keyboard shortcuts have "],
    1: ["1-3 gestural shortcuts ", "gestural shortcuts are ", "gestural shortcuts have "],
}

const experimentNb = Object.keys(types).length;
const participantNb = 64;

const zoneLeft = ["A", "X"];
const zoneMiddle = ["B", "Y"];
const zoneRight = ["I", "K"];

const allKeys = [...zoneLeft, ...zoneMiddle, ...zoneRight];

const allAngles = ["N", "S", "E", "W", "NE", "NW", "SE", "SW"]

const allKeyboardLayouts = ["AZERTY", "QWERTY"];
const allMouseTypes = ["touchpad", "classic_mouse"];
var allModi = ["Alt", "Shift", "CMD"];
const osCMDKey = navigator.userAgent.match(/Mac/i) ? "CMD" : "Ctrl";
const osALTKey = navigator.userAgent.match(/Mac/i) ? "Option" : "Alt";


