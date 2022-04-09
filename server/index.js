const express = require('express');
const fs = require('fs')
const app = express();
const port = 4000;

app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/home.html");
});

app.get('/experiment', (req, res) => {
    res.sendFile(__dirname + "/experiment.html");
});

app.post('/logger', (req, res) => {
    csv = decodeURIComponent(req.query.csv);
    filename = req.query.filename;
    file_path = __dirname + "/logs/" + filename + ".csv";

    //csv = fs.existsSync(file_path) ? csv.substring(csv.indexOf("\n") + 1) : csv;

    fs.appendFile(file_path, csv, err => {
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