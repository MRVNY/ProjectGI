async function loadExperiment(participantID, experimentType) {
    if (participantID > participantNb || participantID < 1 || participantID == NaN) {
        throw new Error("This participant ID does not exist !");
    }
    var out;
    switch (experimentType) {
        //ver2    
        case KEY_MULTI_MODI:
            var nbTrials = 96;
            var response = await fetch('./config/ver2/KeyMultiModi.csv');
            var text = await response.text();
            out = parseCSV(text).slice((participantID - 1) * nbTrials, participantID * nbTrials)
            break;

        case KEY_MULTI_REPEAT:
            var nbTrials = 72;
            var response = await fetch('./config/ver2/KeyMultiRepeat.csv');
            var text = await response.text();
            out = parseCSV(text).slice((participantID - 1) * nbTrials, participantID * nbTrials)
            break;

        case GESTURE_MULTI_ANGLE:
            var nbTrials = 96;
            var response = await fetch('./config/ver2/GestureMultiAngle.csv');
            var text = await response.text();
            out = parseCSV(text).slice((participantID - 1) * nbTrials, participantID * nbTrials)
            break;

        case GESTURE_MULTI_REPEAT:
            var nbTrials = 96;
            var response = await fetch('./config/ver2/GestureMultiRepeat.csv');
            var text = await response.text();
            out = parseCSV(text).slice((participantID - 1) * nbTrials, participantID * nbTrials)
            break;

        default:
            throw new Error("This experiment type does not exist !");
    }
    return out;
}


function toggleExperimentType(experimentType) {
    let selector = "#info";

    if (experimentType == ONEDIR || experimentType == TWODIR || experimentType == TWODIRONEDRAW) {
        document.querySelector(selector + " p").innerHTML = "Level "+(lv+1)+"/"+totalNb+": Draw<br> <b id=\"shortcut\"></b> <br>to unlock next level.";
    } else {
        document.querySelector(selector + " p").innerHTML = "Level " + (lv + 1) + "/" + totalNb +": Click on the circle and press<br> <b id=\"shortcut\"></b> <br>to unlock next level.";
    }

    shortcutElement = document.getElementById("shortcut");
}