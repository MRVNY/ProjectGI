var maxTrials = 100;

async function loadExperiment() {
    console.log("Loading CSV file...");
    const response = await fetch('./config.csv');
    console.log("CSV file loaded.");
    console.log("Fetching CSV file...");
    const text = await response.text();
    console.log("CSV file fetched.");
    return parseCSV(text).sort(() => Math.random() - 0.5);

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