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

document.onkeyup = function() {
    pressing = false;
}

document.onkeydown = function(e) {
    if (exKey.includes(experimentType)) {
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
                cptMultiKey = 0;
            } else {
                cptMultiKey++;
                shortcutElement.innerHTML = "";
                for(i=0; i<nbRepeat; i++) {
                    if(i<cptMultiKey) lines[i] = "<grey>"+lines[i]+"</grey>";
                    shortcutElement.innerHTML += lines[i];
                }
                next.style.backgroundColor = '#4caf4f4a';
            }

            startTime = Date.now();
        }
    }
}