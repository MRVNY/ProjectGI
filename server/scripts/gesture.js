/* Gestural interaction part */

function getAngle(firstP, lastP) {
    dy = firstP[1] - lastP[1]
    dx = firstP[0] - lastP[0]
    var theta = Math.atan2(dy, dx);
    theta *= 180 / Math.PI;
    angle = -theta + 180

    if (angle < 20) {
        angle += 360
    }
    return angle
}

function get3PointsAngle(A, B, C) {
    var AB = Math.sqrt(Math.pow(B[0] - A[0], 2) + Math.pow(B[1] - A[1], 2));
    var BC = Math.sqrt(Math.pow(B[0] - C[0], 2) + Math.pow(B[1] - C[1], 2));
    var AC = Math.sqrt(Math.pow(C[0] - A[0], 2) + Math.pow(C[1] - A[1], 2));

    return Math.acos((BC * BC + AB * AB - AC * AC) / (2 * BC * AB));
}

function getTotalDistance(lines) {
    var total = 0;

    for (let i = 1; i < lines.length; i++) {
        let x1 = parseInt(lines[i - 1][0]);
        let y1 = parseInt(lines[i - 1][1]);
        let x2 = parseInt(lines[i][0]);
        let y2 = parseInt(lines[i][1]);

        let norm = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        total += norm;
    }

    return total;
}

function getDistance(p1, p2) {
    let x1 = parseInt(p1[0]);
    let y1 = parseInt(p1[1]);
    let x2 = parseInt(p2[0]);
    let y2 = parseInt(p2[1]);

    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
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

function mouseUp() {
    document.removeEventListener("mousemove", draw);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    shortcutSuccess = false;
    var firstDrawn, secondDrawn;

    if (lines.length > 0) {

        var articulationPoints = [lines[0]];

        var E = getTotalDistance(lines) / 2;
        var W = E * 0.3;

        var Aindex = 0,
            Bindex = 0,
            Cindex = 0;
        var keepLooping = true;

        //console.log(W);

        while (keepLooping) {
            Cindex = -1;

            for (let i = Aindex + 1; i < lines.length; i++) {
                let slicedLines = lines.slice(Aindex, i);
                if (getTotalDistance(slicedLines) > W) {
                    Cindex = i;
                    break;
                }
            }

            if (Cindex == -1) {
                keepLooping = false;
                break;
            }

            let L_ab_index = -1,
                L_bc_index = -1;

            for (let i = Aindex + 1; i < lines.length; i++) {
                let slicedLines = lines.slice(Aindex, i);
                if (getTotalDistance(slicedLines) > W / 8) {
                    L_ab_index = i;
                    break;
                }
            }

            for (let i = Cindex - 1; i > Aindex; i--) {
                let slicedLines = lines.slice(i, Cindex);
                if (getTotalDistance(slicedLines) > W / 8) {
                    L_bc_index = i;
                    break;
                }
            }

            let maxAngle = -360;

            // console.log(L_ab_index, L_bc_index, Cindex, lines.length)

            for (let j = L_ab_index; j <= L_bc_index; j++) {
                let angle = get3PointsAngle(lines[Aindex], lines[j], lines[Bindex]);

                if (angle > maxAngle) {
                    maxAngle = angle;
                    Bindex = j;
                }
            }

            if (maxAngle > angleThreshold) {
                articulationPoints.push(lines[Bindex]);
                Aindex = Bindex;
            } else {
                Aindex++;
            }
        }

        //console.log(articulationPoints);
        articulationPoints.push(lines[lines.length - 1]);

        var strokeSegments = []

        for (let i = 1; i < articulationPoints.length; i++) {
            let x1 = parseInt(articulationPoints[i - 1][0]);
            let y1 = parseInt(articulationPoints[i - 1][1]);
            let x2 = parseInt(articulationPoints[i][0]);
            let y2 = parseInt(articulationPoints[i][1]);

            let norm = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

            if (norm >= 0.33 * E) {
                strokeSegments.push([articulationPoints[i - 1], articulationPoints[i]]);
            }
        }

        if (strokeSegments.length == 2) {
            firstDrawn = getAngle(strokeSegments[0][0], strokeSegments[0][1]);
            secondDrawn = getAngle(strokeSegments[1][0], strokeSegments[1][1]);
        } else if (strokeSegments.length == 1) {
            firstDrawn = getAngle(strokeSegments[0][0], strokeSegments[0][1]);
            secondDrawn = getAngle(strokeSegments[0][0], strokeSegments[0][1]);
        }


        if (experimentType == GESTURE_MULTI_REPEAT || toDraw.length==1) shortcutSuccess = isRecording && Math.abs(toDraw[cptMultiDir] - firstDrawn) < 30 && Math.abs(toDraw[cptMultiDir] - secondDrawn) < 30;
        else shortcutSuccess = isRecording && Math.abs(toDraw[0] - firstDrawn) < 30 && Math.abs(toDraw[1] - secondDrawn) < 30;
    }

    if (shortcutSuccess) {
        var perimeter = (targetSize-5)*Math.PI;

        var firstP = lines[0];
        var lastP = lines[lines.length - 1];

        var next = document.getElementById("next");

        currentExperiment["totalExecTime"+(cptMultiDir+1)] = (Date.now() - startTime)/1000;
        currentExperiment["nbOfAttempts"+(cptMultiDir+1)] = attempts;
        attempts = 0;

        drawDist = Math.sqrt(Math.pow(firstP[0] - lastP[0], 2) + Math.pow(firstP[1] - lastP[1], 2));
        currentExperiment["drawDist"+(cptMultiDir+1)] = parseInt(drawDist);
        currentExperiment["userAngle"+(cptMultiDir+1)] = parseInt(firstDrawn);
        currentExperiment["angle"+(cptMultiDir+1)] = toDraw[cptMultiDir];
        if (experimentType == GESTURE_MULTI_ANGLE && toDraw.length==2){
            currentExperiment["userAngle2"] = parseInt(secondDrawn);
            currentExperiment["angle2"] = toDraw[1];
        }

        if(experimentType == GESTURE_MULTI_REPEAT && toDraw.length>=2 && cptMultiDir!=toDraw.length-1){
            cptMultiDir++;
            next.style.backgroundColor = '#4caf4f4a';
            loadingCircle.style.strokeDashoffset = perimeter * (1 - cptMultiDir/toDraw.length);
            playAnimation(perimeter * (1 - (cptMultiDir-1)/toDraw.length), perimeter * (1 - cptMultiDir/toDraw.length))
        }
        else{
            next.disabled = false;
            target.hidden = true;
            instruction.hidden = true;
            next.style.backgroundColor = '#4CAF50';
            checkLogging(cpt, experiments, participantID, experimentType);
            cpt++;
            lv++;
            attempts = 0;
            loadingCircle.style.strokeDashoffset = 0;
            playAnimation(perimeter * (1 - cptMultiDir/toDraw.length), 0);
            toDraw = [];
            cptMultiDir = 0;
        }

        startTime = Date.now();
    }

    lines = [];
}

function mouseMove(event) {
    if(next.disabled) {
        coord.x = event.clientX - canvas.offsetLeft;
        coord.y = event.clientY - canvas.offsetTop;
    }
}

function draw(event) {
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.lineCap = "round";
    ctx.strokeStyle = "black";

    tmp1 = [coord.x, coord.y];
    ctx.moveTo(coord.x, coord.y);

    mouseMove(event);

    ctx.lineTo(coord.x, coord.y);
    tmp2 = [coord.x, coord.y];

    if (lines.length == 0) {
        lines.push(tmp1);
    }
    lines.push(tmp2);

    ctx.stroke();
}
