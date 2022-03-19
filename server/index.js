const express = require('express');
const fs = require('fs')
const app = express();
const port = 4000;

const params_names = ["DesignName", "ParticipantID", "TrialID", "Block1", "Letter", "Modifier", "Size", "Time"];
const file_prefix = "p";

app.use(express.static(__dirname));

app.get('/', (req, res) => {

    if (req.query.exptype != null && req.query.exptype == "gestures") {
        folder = "gestures"
    } else if (req.query.exptype == null || req.query.exptype == "keyboard") {
        folder = "keyboard_shortcuts"
    }

    res.sendFile(__dirname + "/" + folder + "/experiment.html");
});

app.get('/logger', (req, res) => {
    participant_ID = req.query.ParticipantID
    params = Object.values(req.query);

    CSV_params_names = params_names.join(",");
    CSV_params = params.join(",");

    file_path = __dirname + "/logs/" + file_prefix + participant_ID + ".csv";

    content = (fs.existsSync(file_path)) ? "\n" + params : CSV_params_names + "\n" + params;

    fs.appendFile(file_path, content, err => {
        if (err) {
            console.error(err)
            return
        }
        //file written successfully
    });
});

app.listen(port, () => {
    console.log(`Application lancée en local sur le port ${port}!`)
});