/* Keyboard shortcuts part */

function getKeyFromKeyboardZone(zone) {
    if (zone == "Left") {
        return zoneLeft[Math.floor(Math.random() * zoneLeft.length)];
    } else if (zone == "Middle") {
        return zoneMiddle[Math.floor(Math.random() * zoneMiddle.length)];
    } else {
        return zoneRight[Math.floor(Math.random() * zoneRight.length)];
    }
}

function playAnimation(f, t) {
    const effect = new KeyframeEffect(
        loadingCircle,
        [
            {strokeDashoffset: f},
            {strokeDashoffset: t}
        ],
        {duration: 500, easing: "ease-out"}
    );
    const animation = new Animation(effect, document.timeline);
    animation.play();
}

const impossibleShortcutConditions = [
    {
        cmdKey: false,
        altKey: true,
        shiftKey: false,
        key: "a",
        navigator: "Mozilla",
        os: "Windows",
    },
];

var impossibleShortcut = false;

function checkKeysValidity() {

    for(let i = 0; i < nbRepeat; i++) {
        for(let condition of impossibleShortcutConditions){
            let cmdCond = condition.cmdKey == currentExperiment.cmds[i];
            let altCond = condition.altKey == currentExperiment.alts[i];
            let shiftCond = condition.shiftKey == currentExperiment.shifts[i];
            let keyCond = condition.key == currentExperiment.keys[i];

            let navigatorCond = navigator.userAgent.includes(condition.navigator);
            let OSCond = navigator.userAgent.includes(condition.os);

            if(cmdCond && altCond && shiftCond && keyCond && navigatorCond && OSCond) {
                let invalidShortcut = "";
                if (currentExperiment.cmds[i]) invalidShortcut += osCMDKey + " + ";
                if (currentExperiment.alts[i]) invalidShortcut += osALTKey + " + ";
                if (currentExperiment.shifts[i]) invalidShortcut += "Shift + ";
                invalidShortcut += currentExperiment.keys[i].toUpperCase();

                console.log("Impossible shortcut for this navigator / OS combination detected " + invalidShortcut);

                // // Method 1 : cancelling this part of the experiment entirely
                // impossibleShortcut = true;

                // document.getElementById("info").style.visibility = "hidden";
                // document.getElementById("target").style.visibility = "hidden";
                
                // $( "#incompatibility" ).dialog();

                // break;

                // Method 2 : replacing the key by a random letter and rechecking afterwards
                updateInstructions();
                i = -1; // Loop resets to beginning until we have compatible shortcuts
            }
        }
    }
}

$("#incompatibility").on('dialogclose', function(event) {
    cpt++;
    lv++;
    cptMultiKey = 0;

    startTime = Date.now();

    document.getElementById("info").style.visibility = "visible";
    document.getElementById("target").style.visibility = "visible";
    impossibleShortcut = false;

    nextTest();
});

document.onkeyup = function() {
    pressing = false;
}

document.onkeydown = function(e) {
    var perimeter = (targetSize-5)*Math.PI;
    if (exKey.includes(experimentType) && !impossibleShortcut) {
        if (!pressing){
            attempts++; 
            //console.log("attempts"+attempts);
        }
        pressing = true;

        var next = document.getElementById("next");
        if(!next.disabled) isRecording = false;

        var cmdKey = navigator.userAgent.match(/Mac/i) ? e.metaKey : e.ctrlKey;
        var shiftKey = e.shiftKey;
        var altKey = e.altKey;

        var key = e.keyCode + 32;

        if (cmdKey) {
            e.preventDefault();
        }

        if (isRecording && !cmdDone && cmdKey == currentExperiment.cmds[cptMultiKey] && cmdKey == true) {
            currentExperiment["execTimeCMD"+(cptMultiKey+1)] = (Date.now() - startTime)/1000;
            cmdDone = true;
        }
        if (isRecording && !altDone && altKey == currentExperiment.alts[cptMultiKey] && altKey == true) {
            currentExperiment["execTimeAlt"+(cptMultiKey+1)] = (Date.now() - startTime)/1000;
            altDone = true;
        }
        if (isRecording && !shiftDone && shiftKey == currentExperiment.shifts[cptMultiKey] && shiftKey == true) {
            currentExperiment["execTimeShift"+(cptMultiKey+1)] = (Date.now() - startTime)/1000;
            shiftDone = true;
        }
        if (isRecording && !keyDone && key == currentExperiment.keys[cptMultiKey].charCodeAt()) {
            currentExperiment["execTimeKey"+(cptMultiKey+1)] = (Date.now() - startTime)/1000;
            keyDone = true;
        }

        var shortcutSuccess = isRecording &&
            cmdKey == currentExperiment.cmds[cptMultiKey] &&
            shiftKey == currentExperiment.shifts[cptMultiKey] &&
            altKey == currentExperiment.alts[cptMultiKey] &&
            key == currentExperiment.keys[cptMultiKey].charCodeAt();

        if (e.keyCode == 32) {
            shortcutSuccess = true;
        }

        if (shortcutSuccess) {
            cmdDone = false;
            altDone = false;
            shiftDone = false;
            keyDone = false;

            currentExperiment["totalExecTime"+(cptMultiKey+1)] = (Date.now() - startTime)/1000;
            currentExperiment["nbOfAttempts"+(cptMultiKey+1)] = attempts;
            attempts = 0;

            if (!exRepeat.includes(experimentType) || (exRepeat.includes(experimentType) && cptMultiKey == nbRepeat-1)) {
                var next = document.getElementById("next");
                next.disabled = false;
                next.style.backgroundColor = '#4CAF50';
                target.hidden = true;
                instruction.hidden = true;
                checkLogging(cpt, experiments, participantID, experimentType);
                cpt++;
                lv++;
                loadingCircle.style.strokeDashoffset = 0;
                playAnimation(perimeter * (1 - cptMultiKey/nbRepeat), 0);
                cptMultiKey = 0;
            } else {
                cptMultiKey++;
                shortcutElement.innerHTML = "";
                for(i=0; i<nbRepeat; i++) {
                    if(i<cptMultiKey) lines[i] = "<grey>"+lines[i]+"</grey>";
                    shortcutElement.innerHTML += lines[i];
                }
                next.style.backgroundColor = '#4caf4f4a';
                loadingCircle.style.strokeDashoffset = perimeter * (1 - cptMultiKey/nbRepeat);
                playAnimation(perimeter * (1 - (cptMultiKey-1)/nbRepeat), perimeter * (1 - cptMultiKey/nbRepeat));
            }

            startTime = Date.now();
        }
    }
}
