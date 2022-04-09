async function loadExperiment(participantID, experimentType) {
    if (participantID > 20 || participantID < 1 || participantID == NaN) {
        throw new Error("This participant ID does not exist !");
    }
    const nbTrials1key = 30;
    var out;
    switch (experimentType) {
        case ONEKEY:
            const response1Key = await fetch('./config/1key.csv');
            const text1Key = await response1Key.text();
            out = parseCSV(text1Key).slice((participantID - 1) * nbTrials1key, participantID * nbTrials1key);
            break;
        case TWOKEY:
            const nbTrials2key = 450;
            const response2Key = await fetch('./config/old/2key450.csv');
            const text2Key = await response2Key.text();
            out = parseCSV(text2Key).slice((participantID - 1) * nbTrials2key, participantID * nbTrials2key)//.sort(() => Math.random() - 0.5).splice(0, nbTrials1key);
            break;
        case ONEDIR:
            const nbTrials1dir = 80;
            const response1Dir = await fetch('./config/1dir.csv');
            const text1Dir = await response1Dir.text();
            out = parseCSV(text1Dir).slice((participantID - 1) * nbTrials1dir, participantID * nbTrials1dir)//.sort(() => Math.random() - 0.5).splice(0, nbTrials1key);
            break;
        case TWODIR: case TWODIRONEDRAW:  
            const nbTrials2dir = 128;
            const response2Dir = await fetch('./config/2dir.csv');
            const text2Dir = await response2Dir.text();
            out = parseCSV(text2Dir).slice((participantID - 1) * nbTrials2dir, participantID * nbTrials2dir)//.sort(() => Math.random() - 0.5).splice(0, nbTrials1key);
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