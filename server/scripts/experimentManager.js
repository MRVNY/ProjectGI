var maxTrials = 100;

async function loadExperiment(participantID) {
    // console.log("Loading CSV file...");
    const response1Key = await fetch('./config/1key.csv');
    const response2Key = await fetch('./config/2key.csv');
    // console.log("CSV file loaded.");
    // console.log("Fetching CSV file...");
    const text1Key = await response1Key.text();
    const text2Key = await response2Key.text();
    // console.log("CSV file fetched.");
    csv1Key = parseCSV(text1Key).sort(() => Math.random() - 0.5);
    csv2Key = parseCSV(text2Key).sort(() => Math.random() - 0.5);

    var containsParticipantID = false;

    for (let i = 0; i < csv1Key.length; i++) {
        if (csv1Key[i].ParticipantID != participantID) {
            csv1Key.splice(i, i + 1);
        } else {
            containsParticipantID = true;
        }
    }

    for (let i = 0; i < csv2Key.length; i++) {
        if (csv2Key[i].ParticipantID != participantID) {
            csv2Key.splice(i, i + 1);
        } else {
            containsParticipantID = true;
        }
    }

    if (!containsParticipantID) {
        throw new Error("This participant ID does not exist !");
    }

    const response1Dir = await fetch('./config/1dir.csv');
    const response2Dir = await fetch('./config/2dir.csv');
    const text1Dir = await response1Dir.text();
    const text2Dir = await response2Dir.text();
    csv1Dir = parseCSV(text1Dir).sort(() => Math.random() - 0.5);
    csv2Dir = parseCSV(text2Dir).sort(() => Math.random() - 0.5);

    for (let i = 0; i < csv1Dir.length; i++) {
        if (csv1Dir[i].ParticipantID != participantID) {
            csv1Dir.splice(i, i + 1);
        }
    }

    for (let i = 0; i < csv2Dir.length; i++) {
        if (csv2Dir[i].ParticipantID != participantID) {
            csv2Dir.splice(i, i + 1);
        }
    }

    return [csv1Key, csv2Key, csv1Dir, csv2Dir];
}

function generateExperimentsResults(experiments) {
    var results = [];
    for (var i = 0; i < maxTrials; i++) {
        results[i] = {
            "experimentType": [],
            "travelTime": [],
            "targetDist": [],

            "firstDirection": [],
            "secondDirection": [],

            "key": [],
            "executionTimeMod1": [],
            "executionTimeMod2": [],
            "executionTimeMod3": [],
            "executionTimeKey": [],

            "totalExecutionTime": [],
            "targetSize": [],
        };
    }
    return results;
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