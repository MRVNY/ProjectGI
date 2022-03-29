var maxTrials = 100;

async function loadExperiment(participantID) {
    // console.log("Loading CSV file...");
    const response1Key = await fetch('./config/1key.csv');
    // console.log("CSV file loaded.");
    // console.log("Fetching CSV file...");
    const text1Key = await response1Key.text();
    // console.log("CSV file fetched.");
    csv1Key = parseCSV(text1Key).sort(() => Math.random() - 0.5);

    var containsParticipantID = false;

    for (let i = 0; i < csv1Key.length; i++) {
        if (csv1Key[i].ParticipantID != participantID) {
            csv1Key.splice(i, i + 1);
        } else {
            containsParticipantID = true;
        }
    }

    if (!containsParticipantID) {
        throw new Error("This participant ID does not exist !");
    }

    const responseGestures = await fetch('./config/gesture.csv');
    const textGestures = await responseGestures.text();
    csvGestures = parseCSV(textGestures).sort(() => Math.random() - 0.5);

    for (let i = 0; i < csvGestures.length; i++) {
        if (csvGestures[i].ParticipantID != participantID) {
            csvGestures.splice(i, i + 1);
        }
    }

    return [csv1Key, [], csvGestures];
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

function toggleExperimentType(isGestures) {
    let selector = "#info";

    if (isGestures) {
        document.querySelector(selector + " p").innerHTML = "Draw <b id=\"shortcut\"></b> to unlock next level.";
    } else {
        document.querySelector(selector + " p").innerHTML = "Press <b id=\"shortcut\"></b> to unlock next level.";
    }

    shortcutElement = document.getElementById("shortcut");
}