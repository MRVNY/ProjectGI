function loadExperiment() {
    // console.log("Loading CSV file...");
    // const response = await fetch('./config.csv');
    // console.log("CSV file loaded.");
    // console.log("Fetching CSV file...");
    // const text = await response.text();
    // console.log("CSV file fetched.");
    // return parseCSV(text);
    var osModKey = navigator.userAgent.match(/Mac/i) ? "cmd" : "ctrl";
    var exp = [
        {
            "type": "shortcut",
            "mod1": true,
            "mod2": false,
            "mod3": false,
            "key": "X",
            "targetSize": 1,
            "name": osModKey + "+X",
            "experimentID": "1"
        },
        {
            "type": "shortcut",
            "mod1": false,
            "mod2": false,
            "mod3": false,
            "key": "H",
            "targetSize": 2,
            "name": "H",
            "experimentID": "2"
        },
        {
            "type": "shortcut",
            "mod1": true,
            "mod2": true,
            "mod3": false,
            "key": "C",
            "targetSize": 3,
            "name": osModKey + "+shift+C",
            "experimentID": "3"
        },
        {
            "type": "shortcut",
            "mod1": true,
            "mod2": true,
            "mod3": true,
            "key": "M",
            "targetSize": 2,
            "name": osModKey + "+shift+alt+M",
            "experimentID": "4"
        },
    ];
    return exp.sort(() => Math.random() - 0.5);
}

function generateExperimentsResults(experiments) {
    var results = {};
    for (var i = 0; i < experiments.length; i++) {
        results[experiments[i].experimentID] = {
            "travelTime": [],
            "targetDist": [],
            "executionTimeMod1": [],
            "executionTimeMod2": [],
            "executionTimeMod3": [],
            "executionTimeKey": [],
            "totalExecutionTime": [],
            "targetSize": experiments[i].targetSize
        };
    }
    return results;
}