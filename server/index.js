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

app.get('/tuto', (req, res) => {
    res.sendFile(__dirname + "/tuto.html");
});

app.get('/thankyou', (req, res) => {
    res.sendFile(__dirname + "/thankyou.html");
});

app.post('/logger', (req, res) => {
    csv = decodeURIComponent(req.query.csv);
    filename = req.query.filename;
    file_path = __dirname + "/logs/" + filename + ".csv";

    fs.appendFile(file_path, csv, err => {
        if (err) {
            console.error(err)
            return
        }
        //file written successfully
    });
});

app.post('/logall', (req, res) => {
    csv = decodeURIComponent(req.query.csv);
    filename = req.query.filename;
    file_path = __dirname + "/logs/" + filename + ".csv";

    fs.unlink(file_path, (err) => {
        if (err) {
            throw err;
        }
        fs.appendFile(file_path, csv, err => {
            if (err) {
                console.error(err)
                return
            }
        });
    });
});

app.listen(port, () => {
    console.log(`Application lancée en local sur le port ${port}!`)
});