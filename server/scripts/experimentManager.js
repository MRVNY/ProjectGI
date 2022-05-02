async function loadExperiment(participantID, experimentType) {
    if (participantID > participantNb || participantID < 1 || participantID == NaN) {
        throw new Error("This participant ID does not exist !");
    }
    var out;
    switch (experimentType) {
        // //ver1
        // case ONEKEY:
        //     var nbTrials1key = 80;
        //     var response1Key = await fetch('./config/ver1/1key.csv');
        //     var text1Key = await response1Key.text();
        //     out = parseCSV(text1Key).slice((participantID - 1) * nbTrials1key, participantID * nbTrials1key);
        //     break;
        // case TWOKEY:
        //     //var nbTrials2key = 450;
        //     //var response2Key = await fetch('./config/old/2key450.csv');
        //     var nbTrials2key = 90;
        //     var response2Key = await fetch('./config/ver1/2key.csv');
        //     var text2Key = await response2Key.text();
        //     out = parseCSV(text2Key).slice((participantID - 1) * nbTrials2key, participantID * nbTrials2key)
        //     break;
        // case ONEDIR:
        //     var nbTrials1dir = 80;
        //     var response1Dir = await fetch('./config/ver1/1dir.csv');
        //     var text1Dir = await response1Dir.text();
        //     out = parseCSV(text1Dir).slice((participantID - 1) * nbTrials1dir, participantID * nbTrials1dir)
        //     break;
        // case TWODIR: case TWODIRONEDRAW:  
        //     var nbTrials2dir = 128;
        //     var response2Dir = await fetch('./config/ver1/2dir.csv');
        //     var text2Dir = await response2Dir.text();
        //     out = parseCSV(text2Dir).slice((participantID - 1) * nbTrials2dir, participantID * nbTrials2dir)
        //     break;


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
            var nbTrials = 128;
            var response = await fetch('./config/ver2/GestureMultiAngle.csv');
            var text = await response.text();
            out = parseCSV(text).slice((participantID - 1) * nbTrials, participantID * nbTrials)
            break;

        case GESTURE_MULTI_REPEAT:
            var nbTrials = 128;
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
        document.querySelector(selector + " p").innerHTML = "Level "+(lv+1)+": Draw<br> <b id=\"shortcut\"></b> <br>to unlock next level.";
    } else {
        document.querySelector(selector + " p").innerHTML = "Level "+(lv+1)+": Press<br> <b id=\"shortcut\"></b> <br>to unlock next level.";
    }

    shortcutElement = document.getElementById("shortcut");
}