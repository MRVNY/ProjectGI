async function loadExperiment(participantID, experimentType) {
    if (participantID > 20 || participantID < 1 || participantID == NaN) {
        throw new Error("This participant ID does not exist !");
    }
    var out;
    switch (experimentType) {
        //ver1
        case ONEKEY:
            const nbTrials1key = 80;
            const response1Key = await fetch('./config/ver1/1key.csv');
            const text1Key = await response1Key.text();
            out = parseCSV(text1Key).slice((participantID - 1) * nbTrials1key, participantID * nbTrials1key);
            break;
        case TWOKEY:
            //const nbTrials2key = 450;
            //const response2Key = await fetch('./config/old/2key450.csv');
            const nbTrials2key = 90;
            const response2Key = await fetch('./config/ver1/2key.csv');
            const text2Key = await response2Key.text();
            out = parseCSV(text2Key).slice((participantID - 1) * nbTrials2key, participantID * nbTrials2key)
            break;
        case ONEDIR:
            const nbTrials1dir = 80;
            const response1Dir = await fetch('./config/ver1/1dir.csv');
            const text1Dir = await response1Dir.text();
            out = parseCSV(text1Dir).slice((participantID - 1) * nbTrials1dir, participantID * nbTrials1dir)
            break;
        case TWODIR: case TWODIRONEDRAW:  
            const nbTrials2dir = 128;
            const response2Dir = await fetch('./config/ver1/2dir.csv');
            const text2Dir = await response2Dir.text();
            out = parseCSV(text2Dir).slice((participantID - 1) * nbTrials2dir, participantID * nbTrials2dir)
            break;


        //ver2    
        case MULTIMODI:
            const nbTrialsMultiModi = 80;
            const responseMultiModi = await fetch('./config/ver2/MultiModi.csv');
            const textMultiModi = await responseMultiModi.text();
            out = parseCSV(textMultiModi).slice((participantID - 1) * nbTrialsMultiModi, participantID * nbTrialsMultiModi)
            break;

        case MULTIREPEAT:
            const nbTrialsMultiRepeat = 60;
            const responseMultiRepeat = await fetch('./config/ver2/MultiRepeat.csv');
            const textMultiRepeat = await responseMultiRepeat.text();
            out = parseCSV(textMultiRepeat).slice((participantID - 1) * nbTrialsMultiRepeat, participantID * nbTrialsMultiRepeat)
            break;

        default:
            throw new Error("This experiment type does not exist !");
    }
    return out;
}


function toggleExperimentType(experimentType) {
    let selector = "#info";

    if (experimentType == ONEDIR || experimentType == TWODIR || experimentType == TWODIRONEDRAW) {
        document.querySelector(selector + " p").innerHTML = "Level "+(lv+1)+": Draw <b id=\"shortcut\"></b> to unlock next level.";
    } else {
        document.querySelector(selector + " p").innerHTML = "Level "+(lv+1)+": Press <b id=\"shortcut\"></b> to unlock next level.";
    }

    shortcutElement = document.getElementById("shortcut");
}