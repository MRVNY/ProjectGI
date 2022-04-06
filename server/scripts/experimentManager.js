var maxTrials = 100;

async function loadExperiment(participantID, experimentType) {

    var containsParticipantID = false;
    var out = [];

    switch (experimentType) {
        case ONEKEY:
            const response1Key = await fetch('./config/1key.csv');
            const text1Key = await response1Key.text();
            csv1Key = parseCSV(text1Key);
            out = [];
            for (let i = 0; i < csv1Key.length; i++) {
                if (csv1Key[i].ParticipantID == participantID) {
                    out.push(csv1Key[i])
                    containsParticipantID = true;
                }
            }
            break;

        case TWOKEY:
            const response2Key = await fetch('./config/2key.csv');
            const text2Key = await response2Key.text();
            csv2Key = parseCSV(text2Key);
            out = [];
            for (let i = 0; i < csv2Key.length; i++) {
                if (csv2Key[i].ParticipantID == participantID) {
                    out.push(csv2Key[i])
                    containsParticipantID = true;
                }
            }
            break;

        case ONEDIR:
            const response1Dir = await fetch('./config/1dir.csv');
            const text1Dir = await response1Dir.text();
            csv1Dir = parseCSV(text1Dir);
            out = []
            for (let i = 0; i < csv1Dir.length; i++) {
                if (csv1Dir[i].ParticipantID == participantID) {
                    out.push(csv1Dir[i]);
                    containsParticipantID = true;
                }
            }
            break;

        case TWODIR:
            const response2Dir = await fetch('./config/2dir.csv');
            const text2Dir = await response2Dir.text();
            csv2Dir = parseCSV(text2Dir);
            out = []
            for (let i = 0; i < csv2Dir.length; i++) {
                if (csv2Dir[i].ParticipantID == participantID) {
                    out.push(csv2Dir[i]);
                    containsParticipantID = true;
                }
            }
            break;
    }

    if (!containsParticipantID) {
        throw new Error("This participant ID does not exist !");
    }

    return out;
}


function toggleExperimentType(experimentType) {
    let selector = "#info";

    if (experimentType == 2) {
        document.querySelector(selector + " p").innerHTML = "Level "+(cpt+1)+"/"+totalNb+": Draw <b id=\"shortcut\"></b> to unlock next level.";
    } else {
        document.querySelector(selector + " p").innerHTML = "Level "+(cpt+1)+"/"+totalNb+": Press <b id=\"shortcut\"></b> to unlock next level.";
    }

    shortcutElement = document.getElementById("shortcut");
}