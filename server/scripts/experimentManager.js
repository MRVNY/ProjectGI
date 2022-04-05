var maxTrials = 100;

async function loadExperiment(participantID) {
    const response1Key = await fetch('./config/1key.csv');
    const response2Key = await fetch('./config/2key.csv');
    const text1Key = await response1Key.text();
    const text2Key = await response2Key.text();
    csv1Key = parseCSV(text1Key);
    csv2Key = parseCSV(text2Key);
    onekey = [];
    twokey = [];

    var containsParticipantID = false;

    for (let i = 0; i < csv1Key.length; i++) {
        if (csv1Key[i].ParticipantID == participantID) {
            onekey.push(csv1Key[i])
            containsParticipantID = true;
        }
    }

    if (!containsParticipantID) {
        throw new Error("This participant ID does not exist !");
    }

    for (let i = 0; i < csv2Key.length; i++) {
        if (csv2Key[i].ParticipantID == participantID) {
            twokey.push(csv2Key[i])
            containsParticipantID = true;
        }
    }

    const response1Dir = await fetch('./config/1dir.csv');
    const response2Dir = await fetch('./config/2dir.csv');
    const text1Dir = await response1Dir.text();
    const text2Dir = await response2Dir.text();
    csv1Dir = parseCSV(text1Dir);
    csv2Dir = parseCSV(text2Dir);
    onedir = []
    twodir = []

    for (let i = 0; i < csv1Dir.length; i++) {
        if (csv1Dir[i].ParticipantID == participantID) {
            onedir.push(csv1Dir[i])
        }
    }

    for (let i = 0; i < csv2Dir.length; i++) {
        if (csv2Dir[i].ParticipantID == participantID) {
            twodir.push(csv2Dir[i])
        }
    }

    return [csv1Key, csv2Key, csv1Dir, csv2Dir];
}


function toggleExperimentType(experimentType) {
    let selector = "#info";

    if (experimentType == 2) {
        document.querySelector(selector + " p").innerHTML = "Draw <b id=\"shortcut\"></b> to unlock next level.";
    } else {
        document.querySelector(selector + " p").innerHTML = "Press <b id=\"shortcut\"></b> to unlock next level.";
    }

    shortcutElement = document.getElementById("shortcut");
}