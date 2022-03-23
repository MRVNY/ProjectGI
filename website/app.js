/* To-Do */
/* - Faire en sorte que le bouton "Next" soit toujours visible */
/* - Afficher au dessus du bouton "Next" le nom du raccourci */
/* - Rendre solide la cible */
/* - Trouver un moyen de montrer que la cible est cliquée */
/* - Acceder au fichier config.csv */
/* - Randomiser l'experience */
/* - Faire en sorte que la position de la cible soit celle des experiences */
/* - Enregistrer les temps de chaque experience */
/* - Enregister les résultats dans un fichier CSV */
/* - Faire la page d'accueil */


function parseCSV(csv) {
    var lines = csv.split("\n");
    var result = [];
    var headers = lines[0].split(",");
    for (var i = 1; i < lines.length; i++) {
        var obj = {};
        var currentline = lines[i].split(",");
        for (var j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
        }
        result.push(obj);
    }
    //console.log(result)
    return result;
}

function loadExperiment() {
    // console.log("Loading CSV file...");
    // const response = await fetch('./config.csv');
    // console.log("CSV file loaded.");
    // console.log("Fetching CSV file...");
    // const text = await response.text();
    // console.log("CSV file fetched.");

    p1 = "DesignName,ParticipantID,TrialID,Block1,Letter1,Modifier1,Size\n1key,1,1,1,Left,CMD_Shift,1\n1key,1,2,2,Middle,CMD_Shift,1\n1key,1,3,3,Middle,CMD,1\n1key,1,4,4,Right,None,1\n1key,1,5,5,Right,None,2\n1key,1,6,6,Right,Alt,1\n1key,1,7,7,Right,CMD_Alt_Shift,2\n1key,1,8,8,Right,CMD_Shift,2\n1key,1,9,9,Middle,CMD,2\n1key,1,10,10,Middle,None,1\n1key,1,11,11,Middle,CMD_Alt_Shift,1\n1key,1,12,12,Left,Alt,1\n1key,1,13,13,Left,CMD_Alt_Shift,2\n1key,1,14,14,Right,CMD,2\n1key,1,15,15,Left,None,2\n1key,1,16,16,Left,CMD,1\n1key,1,17,17,Left,CMD_Alt_Shift,1\n1key,1,18,18,Middle,Alt,1\n1key,1,19,19,Middle,Alt,2\n1key,1,20,20,Left,CMD,2\n1key,1,21,21,Middle,CMD_Shift,2\n1key,1,22,22,Middle,CMD_Alt_Shift,2\n1key,1,23,23,Left,Alt,2\n1key,1,24,24,Left,CMD_Shift,2\n1key,1,25,25,Right,CMD_Shift,1\n1key,1,26,26,Right,CMD_Alt_Shift,1\n1key,1,27,27,Middle,None,2\n1key,1,28,28,Left,None,1\n1key,1,29,29,Right,CMD,1\n1key,1,30,30,Right,Alt,2"
    p2 = "DesignName,ParticipantID,TrialID,Block1,Letter1,Modifier1,Size\n1key,2,31,1,Left,CMD_Shift,2\n1key,2,32,2,Middle,CMD_Shift,2\n1key,2,33,3,Middle,CMD,2\n1key,2,34,4,Right,None,2\n1key,2,35,5,Right,CMD,1\n1key,2,36,6,Right,Alt,2\n1key,2,37,7,Left,None,1\n1key,2,38,8,Right,CMD_Alt_Shift,1\n1key,2,39,9,Middle,Alt,1\n1key,2,40,10,Middle,None,2\n1key,2,41,11,Middle,CMD_Alt_Shift,2\n1key,2,42,12,Left,Alt,2\n1key,2,43,13,Middle,None,1\n1key,2,44,14,Right,Alt,1\n1key,2,45,15,Left,CMD,1\n1key,2,46,16,Left,CMD,2\n1key,2,47,17,Left,CMD_Alt_Shift,2\n1key,2,48,18,Middle,Alt,2\n1key,2,49,19,Middle,CMD_Shift,1\n1key,2,50,20,Left,Alt,1\n1key,2,51,21,Middle,CMD_Alt_Shift,1\n1key,2,52,22,Right,None,1\n1key,2,53,23,Left,CMD_Shift,1\n1key,2,54,24,Left,CMD_Alt_Shift,1\n1key,2,55,25,Right,CMD_Shift,2\n1key,2,56,26,Right,CMD_Alt_Shift,2\n1key,2,57,27,Middle,CMD,1\n1key,2,58,28,Left,None,2\n1key,2,59,29,Right,CMD,2\n1key,2,60,30,Right,CMD_Shift,1"
    p3 = "DesignName,ParticipantID,TrialID,Block1,Letter1,Modifier1,Size\n1key,3,61,1,Left,CMD_Alt_Shift,1\n1key,3,62,2,Middle,CMD_Alt_Shift,1\n1key,3,63,3,Middle,Alt,1\n1key,3,64,4,Right,CMD,1\n1key,3,65,5,Right,CMD,2\n1key,3,66,6,Right,CMD_Shift,1\n1key,3,67,7,Left,None,2\n1key,3,68,8,Right,CMD_Alt_Shift,2\n1key,3,69,9,Middle,Alt,2\n1key,3,70,10,Middle,CMD,1\n1key,3,71,11,Right,None,1\n1key,3,72,12,Left,CMD_Shift,1\n1key,3,73,13,Middle,None,2\n1key,3,74,14,Right,Alt,2\n1key,3,75,15,Left,CMD,2\n1key,3,76,16,Left,Alt,1\n1key,3,77,17,Middle,None,1\n1key,3,78,18,Middle,CMD_Shift,1\n1key,3,79,19,Middle,CMD_Shift,2\n1key,3,80,20,Left,Alt,2\n1key,3,81,21,Middle,CMD_Alt_Shift,2\n1key,3,82,22,Right,None,2\n1key,3,83,23,Left,CMD_Shift,2\n1key,3,84,24,Left,CMD_Alt_Shift,2\n1key,3,85,25,Right,CMD_Alt_Shift,1\n1key,3,86,26,Left,None,1\n1key,3,87,27,Middle,CMD,2\n1key,3,88,28,Left,CMD,1\n1key,3,89,29,Right,Alt,1\n1key,3,90,30,Right,CMD_Shift,2"
    p4 = "DesignName,ParticipantID,TrialID,Block1,Letter1,Modifier1,Size\n1key,4,91,1,Left,CMD_Alt_Shift,2\n1key,4,92,2,Middle,CMD_Alt_Shift,2\n1key,4,93,3,Middle,Alt,2\n1key,4,94,4,Right,CMD,2\n1key,4,95,5,Right,Alt,1\n1key,4,96,6,Right,CMD_Shift,2\n1key,4,97,7,Left,CMD,1\n1key,4,98,8,Left,None,1\n1key,4,99,9,Middle,CMD_Shift,1\n1key,4,100,10,Middle,CMD,2\n1key,4,101,11,Right,None,2\n1key,4,102,12,Left,CMD_Shift,2\n1key,4,103,13,Middle,CMD,1\n1key,4,104,14,Right,CMD_Shift,1\n1key,4,105,15,Left,Alt,1\n1key,4,106,16,Left,Alt,2\n1key,4,107,17,Middle,None,2\n1key,4,108,18,Middle,CMD_Shift,2\n1key,4,109,19,Middle,CMD_Alt_Shift,1\n1key,4,110,20,Left,CMD_Shift,1\n1key,4,111,21,Right,None,1\n1key,4,112,22,Right,CMD,1\n1key,4,113,23,Left,CMD_Alt_Shift,1\n1key,4,114,24,Middle,None,1\n1key,4,115,25,Right,CMD_Alt_Shift,2\n1key,4,116,26,Left,None,2\n1key,4,117,27,Middle,Alt,1\n1key,4,118,28,Left,CMD,2\n1key,4,119,29,Right,Alt,2\n1key,4,120,30,Right,CMD_Alt_Shift,1"
    p5 = "DesignName,ParticipantID,TrialID,Block1,Letter1,Modifier1,Size\n1key,5,121,1,Middle,None,1\n1key,5,122,2,Right,None,1\n1key,5,123,3,Middle,CMD_Shift,1\n1key,5,124,4,Right,Alt,1\n1key,5,125,5,Right,Alt,2\n1key,5,126,6,Right,CMD_Alt_Shift,1\n1key,5,127,7,Left,CMD,2\n1key,5,128,8,Left,None,2\n1key,5,129,9,Middle,CMD_Shift,2\n1key,5,130,10,Middle,Alt,1\n1key,5,131,11,Right,CMD,1\n1key,5,132,12,Left,CMD_Alt_Shift,1\n1key,5,133,13,Middle,CMD,2\n1key,5,134,14,Right,CMD_Shift,2\n1key,5,135,15,Left,Alt,2\n1key,5,136,16,Left,CMD_Shift,1\n1key,5,137,17,Middle,CMD,1\n1key,5,138,18,Middle,CMD_Alt_Shift,1\n1key,5,139,19,Middle,CMD_Alt_Shift,2\n1key,5,140,20,Left,CMD_Shift,2\n1key,5,141,21,Right,None,2\n1key,5,142,22,Right,CMD,2\n1key,5,143,23,Left,CMD_Alt_Shift,2\n1key,5,144,24,Middle,None,2\n1key,5,145,25,Left,None,1\n1key,5,146,26,Left,CMD,1\n1key,5,147,27,Middle,Alt,2\n1key,5,148,28,Left,Alt,1\n1key,5,149,29,Right,CMD_Shift,1\n1key,5,150,30,Right,CMD_Alt_Shift,2"
    p6 = "DesignName,ParticipantID,TrialID,Block1,Letter1,Modifier1,Size\n1key,6,151,1,Middle,None,2\n1key,6,152,2,Right,None,2\n1key,6,153,3,Middle,CMD_Shift,2\n1key,6,154,4,Right,Alt,2\n1key,6,155,5,Right,CMD_Shift,1\n1key,6,156,6,Right,CMD_Alt_Shift,2\n1key,6,157,7,Left,Alt,1\n1key,6,158,8,Left,CMD,1\n1key,6,159,9,Middle,CMD_Alt_Shift,1\n1key,6,160,10,Middle,Alt,2\n1key,6,161,11,Right,CMD,2\n1key,6,162,12,Left,CMD_Alt_Shift,2\n1key,6,163,13,Middle,Alt,1\n1key,6,164,14,Right,CMD_Alt_Shift,1\n1key,6,165,15,Left,CMD_Shift,1\n1key,6,166,16,Left,CMD_Shift,2\n1key,6,167,17,Middle,CMD,2\n1key,6,168,18,Middle,CMD_Alt_Shift,2\n1key,6,169,19,Right,None,1\n1key,6,170,20,Left,CMD_Alt_Shift,1\n1key,6,171,21,Right,CMD,1\n1key,6,172,22,Right,Alt,1\n1key,6,173,23,Middle,None,1\n1key,6,174,24,Middle,CMD,1\n1key,6,175,25,Left,None,2\n1key,6,176,26,Left,CMD,2\n1key,6,177,27,Middle,CMD_Shift,1\n1key,6,178,28,Left,Alt,2\n1key,6,179,29,Right,CMD_Shift,2\n1key,6,180,30,Left,None,1"
    p7 = "DesignName,ParticipantID,TrialID,Block1,Letter1,Modifier1,Size\n1key,7,181,1,Middle,CMD,1\n1key,7,182,2,Right,CMD,1\n1key,7,183,3,Middle,CMD_Alt_Shift,1\n1key,7,184,4,Right,CMD_Shift,1\n1key,7,185,5,Right,CMD_Shift,2\n1key,7,186,6,Left,None,1\n1key,7,187,7,Left,Alt,2\n1key,7,188,8,Left,CMD,2\n1key,7,189,9,Middle,CMD_Alt_Shift,2\n1key,7,190,10,Middle,CMD_Shift,1\n1key,7,191,11,Right,Alt,1\n1key,7,192,12,Middle,None,1\n1key,7,193,13,Middle,Alt,2\n1key,7,194,14,Right,CMD_Alt_Shift,2\n1key,7,195,15,Left,CMD_Shift,2\n1key,7,196,16,Left,CMD_Alt_Shift,1\n1key,7,197,17,Middle,Alt,1\n1key,7,198,18,Right,None,1\n1key,7,199,19,Right,None,2\n1key,7,200,20,Left,CMD_Alt_Shift,2\n1key,7,201,21,Right,CMD,2\n1key,7,202,22,Right,Alt,2\n1key,7,203,23,Middle,None,2\n1key,7,204,24,Middle,CMD,2\n1key,7,205,25,Left,CMD,1\n1key,7,206,26,Left,Alt,1\n1key,7,207,27,Middle,CMD_Shift,2\n1key,7,208,28,Left,CMD_Shift,1\n1key,7,209,29,Right,CMD_Alt_Shift,1\n1key,7,210,30,Left,None,2"
    p8 = "DesignName,ParticipantID,TrialID,Block1,Letter1,Modifier1,Size\n1key,8,211,1,Middle,CMD,2\n1key,8,212,2,Right,CMD,2\n1key,8,213,3,Middle,CMD_Alt_Shift,2\n1key,8,214,4,Right,CMD_Shift,2\n1key,8,215,5,Right,CMD_Alt_Shift,1\n1key,8,216,6,Left,None,2\n1key,8,217,7,Left,CMD_Shift,1\n1key,8,218,8,Left,Alt,1\n1key,8,219,9,Right,None,1\n1key,8,220,10,Middle,CMD_Shift,2\n1key,8,221,11,Right,Alt,2\n1key,8,222,12,Middle,None,2\n1key,8,223,13,Middle,CMD_Shift,1\n1key,8,224,14,Left,None,1\n1key,8,225,15,Left,CMD_Alt_Shift,1\n1key,8,226,16,Left,CMD_Alt_Shift,2\n1key,8,227,17,Middle,Alt,2\n1key,8,228,18,Right,None,2\n1key,8,229,19,Right,CMD,1\n1key,8,230,20,Middle,None,1\n1key,8,231,21,Right,Alt,1\n1key,8,232,22,Right,CMD_Shift,1\n1key,8,233,23,Middle,CMD,1\n1key,8,234,24,Middle,Alt,1\n1key,8,235,25,Left,CMD,2\n1key,8,236,26,Left,Alt,2\n1key,8,237,27,Middle,CMD_Alt_Shift,1\n1key,8,238,28,Left,CMD_Shift,2\n1key,8,239,29,Right,CMD_Alt_Shift,2\n1key,8,240,30,Left,CMD,1"
    p9 = "DesignName,ParticipantID,TrialID,Block1,Letter1,Modifier1,Size\n1key,9,241,1,Middle,Alt,1\n1key,9,242,2,Right,Alt,1\n1key,9,243,3,Right,None,1\n1key,9,244,4,Right,CMD_Alt_Shift,1\n1key,9,245,5,Right,CMD_Alt_Shift,2\n1key,9,246,6,Left,CMD,1\n1key,9,247,7,Left,CMD_Shift,2\n1key,9,248,8,Left,Alt,2\n1key,9,249,9,Right,None,2\n1key,9,250,10,Middle,CMD_Alt_Shift,1\n1key,9,251,11,Right,CMD_Shift,1\n1key,9,252,12,Middle,CMD,1\n1key,9,253,13,Middle,CMD_Shift,2\n1key,9,254,14,Left,None,2\n1key,9,255,15,Left,CMD_Alt_Shift,2\n1key,9,256,16,Middle,None,1\n1key,9,257,17,Middle,CMD_Shift,1\n1key,9,258,18,Right,CMD,1\n1key,9,259,19,Right,CMD,2\n1key,9,260,20,Middle,None,2\n1key,9,261,21,Right,Alt,2\n1key,9,262,22,Right,CMD_Shift,2\n1key,9,263,23,Middle,CMD,2\n1key,9,264,24,Middle,Alt,2\n1key,9,265,25,Left,Alt,1\n1key,9,266,26,Left,CMD_Shift,1\n1key,9,267,27,Middle,CMD_Alt_Shift,2\n1key,9,268,28,Left,CMD_Alt_Shift,1\n1key,9,269,29,Left,None,1\n1key,9,270,30,Left,CMD,2"
    p10 = "DesignName,ParticipantID,TrialID,Block1,Letter1,Modifier1,Size\n1key,10,271,1,Middle,Alt,2\n1key,10,272,2,Right,Alt,2\n1key,10,273,3,Right,None,2\n1key,10,274,4,Right,CMD_Alt_Shift,2\n1key,10,275,5,Left,None,1\n1key,10,276,6,Left,CMD,2\n1key,10,277,7,Left,CMD_Alt_Shift,1\n1key,10,278,8,Left,CMD_Shift,1\n1key,10,279,9,Right,CMD,1\n1key,10,280,10,Middle,CMD_Alt_Shift,2\n1key,10,281,11,Right,CMD_Shift,2\n1key,10,282,12,Middle,CMD,2\n1key,10,283,13,Middle,CMD_Alt_Shift,1\n1key,10,284,14,Left,CMD,1\n1key,10,285,15,Middle,None,1\n1key,10,286,16,Middle,None,2\n1key,10,287,17,Middle,CMD_Shift,2\n1key,10,288,18,Right,CMD,2\n1key,10,289,19,Right,Alt,1\n1key,10,290,20,Middle,CMD,1\n1key,10,291,21,Right,CMD_Shift,1\n1key,10,292,22,Right,CMD_Alt_Shift,1\n1key,10,293,23,Middle,Alt,1\n1key,10,294,24,Middle,CMD_Shift,1\n1key,10,295,25,Left,Alt,2\n1key,10,296,26,Left,CMD_Shift,2\n1key,10,297,27,Right,None,1\n1key,10,298,28,Left,CMD_Alt_Shift,2\n1key,10,299,29,Left,None,2\n1key,10,300,30,Left,Alt,1"
    p11 = "DesignName,ParticipantID,TrialID,Block1,Letter1,Modifier1,Size\n1key,11,301,1,Middle,CMD_Shift,1\n1key,11,302,2,Right,CMD_Shift,1\n1key,11,303,3,Right,CMD,1\n1key,11,304,4,Left,None,1\n1key,11,305,5,Left,None,2\n1key,11,306,6,Left,Alt,1\n1key,11,307,7,Left,CMD_Alt_Shift,2\n1key,11,308,8,Left,CMD_Shift,2\n1key,11,309,9,Right,CMD,2\n1key,11,310,10,Right,None,1\n1key,11,311,11,Right,CMD_Alt_Shift,1\n1key,11,312,12,Middle,Alt,1\n1key,11,313,13,Middle,CMD_Alt_Shift,2\n1key,11,314,14,Left,CMD,2\n1key,11,315,15,Middle,None,2\n1key,11,316,16,Middle,CMD,1\n1key,11,317,17,Middle,CMD_Alt_Shift,1\n1key,11,318,18,Right,Alt,1\n1key,11,319,19,Right,Alt,2\n1key,11,320,20,Middle,CMD,2\n1key,11,321,21,Right,CMD_Shift,2\n1key,11,322,22,Right,CMD_Alt_Shift,2\n1key,11,323,23,Middle,Alt,2\n1key,11,324,24,Middle,CMD_Shift,2\n1key,11,325,25,Left,CMD_Shift,1\n1key,11,326,26,Left,CMD_Alt_Shift,1\n1key,11,327,27,Right,None,2\n1key,11,328,28,Middle,None,1\n1key,11,329,29,Left,CMD,1\n1key,11,330,30,Left,Alt,2"
    p12 = "DesignName,ParticipantID,TrialID,Block1,Letter1,Modifier1,Size\n1key,12,331,1,Middle,CMD_Shift,2\n1key,12,332,2,Right,CMD_Shift,2\n1key,12,333,3,Right,CMD,2\n1key,12,334,4,Left,None,2\n1key,12,335,5,Left,CMD,1\n1key,12,336,6,Left,Alt,2\n1key,12,337,7,Middle,None,1\n1key,12,338,8,Left,CMD_Alt_Shift,1\n1key,12,339,9,Right,Alt,1\n1key,12,340,10,Right,None,2\n1key,12,341,11,Right,CMD_Alt_Shift,2\n1key,12,342,12,Middle,Alt,2\n1key,12,343,13,Right,None,1\n1key,12,344,14,Left,Alt,1\n1key,12,345,15,Middle,CMD,1\n1key,12,346,16,Middle,CMD,2\n1key,12,347,17,Middle,CMD_Alt_Shift,2\n1key,12,348,18,Right,Alt,2\n1key,12,349,19,Right,CMD_Shift,1\n1key,12,350,20,Middle,Alt,1\n1key,12,351,21,Right,CMD_Alt_Shift,1\n1key,12,352,22,Left,None,1\n1key,12,353,23,Middle,CMD_Shift,1\n1key,12,354,24,Middle,CMD_Alt_Shift,1\n1key,12,355,25,Left,CMD_Shift,2\n1key,12,356,26,Left,CMD_Alt_Shift,2\n1key,12,357,27,Right,CMD,1\n1key,12,358,28,Middle,None,2\n1key,12,359,29,Left,CMD,2\n1key,12,360,30,Left,CMD_Shift,1"
    p13 = "DesignName,ParticipantID,TrialID,Block1,Letter1,Modifier1,Size\n1key,13,361,1,Middle,CMD_Alt_Shift,1\n1key,13,362,2,Right,CMD_Alt_Shift,1\n1key,13,363,3,Right,Alt,1\n1key,13,364,4,Left,CMD,1\n1key,13,365,5,Left,CMD,2\n1key,13,366,6,Left,CMD_Shift,1\n1key,13,367,7,Middle,None,2\n1key,13,368,8,Left,CMD_Alt_Shift,2\n1key,13,369,9,Right,Alt,2\n1key,13,370,10,Right,CMD,1\n1key,13,371,11,Left,None,1\n1key,13,372,12,Middle,CMD_Shift,1\n1key,13,373,13,Right,None,2\n1key,13,374,14,Left,Alt,2\n1key,13,375,15,Middle,CMD,2\n1key,13,376,16,Middle,Alt,1\n1key,13,377,17,Right,None,1\n1key,13,378,18,Right,CMD_Shift,1\n1key,13,379,19,Right,CMD_Shift,2\n1key,13,380,20,Middle,Alt,2\n1key,13,381,21,Right,CMD_Alt_Shift,2\n1key,13,382,22,Left,None,2\n1key,13,383,23,Middle,CMD_Shift,2\n1key,13,384,24,Middle,CMD_Alt_Shift,2\n1key,13,385,25,Left,CMD_Alt_Shift,1\n1key,13,386,26,Middle,None,1\n1key,13,387,27,Right,CMD,2\n1key,13,388,28,Middle,CMD,1\n1key,13,389,29,Left,Alt,1\n1key,13,390,30,Left,CMD_Shift,2"
    p14 = "DesignName,ParticipantID,TrialID,Block1,Letter1,Modifier1,Size\n1key,14,391,1,Middle,CMD_Alt_Shift,2\n1key,14,392,2,Right,CMD_Alt_Shift,2\n1key,14,393,3,Right,Alt,2\n1key,14,394,4,Left,CMD,2\n1key,14,395,5,Left,Alt,1\n1key,14,396,6,Left,CMD_Shift,2\n1key,14,397,7,Middle,CMD,1\n1key,14,398,8,Middle,None,1\n1key,14,399,9,Right,CMD_Shift,1\n1key,14,400,10,Right,CMD,2\n1key,14,401,11,Left,None,2\n1key,14,402,12,Middle,CMD_Shift,2\n1key,14,403,13,Right,CMD,1\n1key,14,404,14,Left,CMD_Shift,1\n1key,14,405,15,Middle,Alt,1\n1key,14,406,16,Middle,Alt,2\n1key,14,407,17,Right,None,2\n1key,14,408,18,Right,CMD_Shift,2\n1key,14,409,19,Right,CMD_Alt_Shift,1\n1key,14,410,20,Middle,CMD_Shift,1\n1key,14,411,21,Left,None,1\n1key,14,412,22,Left,CMD,1\n1key,14,413,23,Middle,CMD_Alt_Shift,1\n1key,14,414,24,Right,None,1\n1key,14,415,25,Left,CMD_Alt_Shift,2\n1key,14,416,26,Middle,None,2\n1key,14,417,27,Right,Alt,1\n1key,14,418,28,Middle,CMD,2\n1key,14,419,29,Left,Alt,2\n1key,14,420,30,Left,CMD_Alt_Shift,1"
    p15 = "DesignName,ParticipantID,TrialID,Block1,Letter1,Modifier1,Size\n1key,15,421,1,Right,None,1\n1key,15,422,2,Left,None,1\n1key,15,423,3,Right,CMD_Shift,1\n1key,15,424,4,Left,Alt,1\n1key,15,425,5,Left,Alt,2\n1key,15,426,6,Left,CMD_Alt_Shift,1\n1key,15,427,7,Middle,CMD,2\n1key,15,428,8,Middle,None,2\n1key,15,429,9,Right,CMD_Shift,2\n1key,15,430,10,Right,Alt,1\n1key,15,431,11,Left,CMD,1\n1key,15,432,12,Middle,CMD_Alt_Shift,1\n1key,15,433,13,Right,CMD,2\n1key,15,434,14,Left,CMD_Shift,2\n1key,15,435,15,Middle,Alt,2\n1key,15,436,16,Middle,CMD_Shift,1\n1key,15,437,17,Right,CMD,1\n1key,15,438,18,Right,CMD_Alt_Shift,1\n1key,15,439,19,Right,CMD_Alt_Shift,2\n1key,15,440,20,Middle,CMD_Shift,2\n1key,15,441,21,Left,None,2\n1key,15,442,22,Left,CMD,2\n1key,15,443,23,Middle,CMD_Alt_Shift,2\n1key,15,444,24,Right,None,2\n1key,15,445,25,Middle,None,1\n1key,15,446,26,Middle,CMD,1\n1key,15,447,27,Right,Alt,2\n1key,15,448,28,Middle,Alt,1\n1key,15,449,29,Left,CMD_Shift,1\n1key,15,450,30,Left,CMD_Alt_Shift,2"
    p16 = "DesignName,ParticipantID,TrialID,Block1,Letter1,Modifier1,Size\n1key,16,451,1,Right,None,2\n1key,16,452,2,Left,None,2\n1key,16,453,3,Right,CMD_Shift,2\n1key,16,454,4,Left,Alt,2\n1key,16,455,5,Left,CMD_Shift,1\n1key,16,456,6,Left,CMD_Alt_Shift,2\n1key,16,457,7,Middle,Alt,1\n1key,16,458,8,Middle,CMD,1\n1key,16,459,9,Right,CMD_Alt_Shift,1\n1key,16,460,10,Right,Alt,2\n1key,16,461,11,Left,CMD,2\n1key,16,462,12,Middle,CMD_Alt_Shift,2\n1key,16,463,13,Right,Alt,1\n1key,16,464,14,Left,CMD_Alt_Shift,1\n1key,16,465,15,Middle,CMD_Shift,1\n1key,16,466,16,Middle,CMD_Shift,2\n1key,16,467,17,Right,CMD,2\n1key,16,468,18,Right,CMD_Alt_Shift,2\n1key,16,469,19,Left,None,1\n1key,16,470,20,Middle,CMD_Alt_Shift,1\n1key,16,471,21,Left,CMD,1\n1key,16,472,22,Left,Alt,1\n1key,16,473,23,Right,None,1\n1key,16,474,24,Right,CMD,1\n1key,16,475,25,Middle,None,2\n1key,16,476,26,Middle,CMD,2\n1key,16,477,27,Right,CMD_Shift,1\n1key,16,478,28,Middle,Alt,2\n1key,16,479,29,Left,CMD_Shift,2\n1key,16,480,30,Middle,None,1"
    p17 = "DesignName,ParticipantID,TrialID,Block1,Letter1,Modifier1,Size\n1key,17,481,1,Right,CMD,1\n1key,17,482,2,Left,CMD,1\n1key,17,483,3,Right,CMD_Alt_Shift,1\n1key,17,484,4,Left,CMD_Shift,1\n1key,17,485,5,Left,CMD_Shift,2\n1key,17,486,6,Middle,None,1\n1key,17,487,7,Middle,Alt,2\n1key,17,488,8,Middle,CMD,2\n1key,17,489,9,Right,CMD_Alt_Shift,2\n1key,17,490,10,Right,CMD_Shift,1\n1key,17,491,11,Left,Alt,1\n1key,17,492,12,Right,None,1\n1key,17,493,13,Right,Alt,2\n1key,17,494,14,Left,CMD_Alt_Shift,2\n1key,17,495,15,Middle,CMD_Shift,2\n1key,17,496,16,Middle,CMD_Alt_Shift,1\n1key,17,497,17,Right,Alt,1\n1key,17,498,18,Left,None,1\n1key,17,499,19,Left,None,2\n1key,17,500,20,Middle,CMD_Alt_Shift,2\n1key,17,501,21,Left,CMD,2\n1key,17,502,22,Left,Alt,2\n1key,17,503,23,Right,None,2\n1key,17,504,24,Right,CMD,2\n1key,17,505,25,Middle,CMD,1\n1key,17,506,26,Middle,Alt,1\n1key,17,507,27,Right,CMD_Shift,2\n1key,17,508,28,Middle,CMD_Shift,1\n1key,17,509,29,Left,CMD_Alt_Shift,1\n1key,17,510,30,Middle,None,2"
    p18 = "DesignName,ParticipantID,TrialID,Block1,Letter1,Modifier1,Size\n1key,18,511,1,Right,CMD,2\n1key,18,512,2,Left,CMD,2\n1key,18,513,3,Right,CMD_Alt_Shift,2\n1key,18,514,4,Left,CMD_Shift,2\n1key,18,515,5,Left,CMD_Alt_Shift,1\n1key,18,516,6,Middle,None,2\n1key,18,517,7,Middle,CMD_Shift,1\n1key,18,518,8,Middle,Alt,1\n1key,18,519,9,Left,None,1\n1key,18,520,10,Right,CMD_Shift,2\n1key,18,521,11,Left,Alt,2\n1key,18,522,12,Right,None,2\n1key,18,523,13,Right,CMD_Shift,1\n1key,18,524,14,Middle,None,1\n1key,18,525,15,Middle,CMD_Alt_Shift,1\n1key,18,526,16,Middle,CMD_Alt_Shift,2\n1key,18,527,17,Right,Alt,2\n1key,18,528,18,Left,None,2\n1key,18,529,19,Left,CMD,1\n1key,18,530,20,Right,None,1\n1key,18,531,21,Left,Alt,1\n1key,18,532,22,Left,CMD_Shift,1\n1key,18,533,23,Right,CMD,1\n1key,18,534,24,Right,Alt,1\n1key,18,535,25,Middle,CMD,2\n1key,18,536,26,Middle,Alt,2\n1key,18,537,27,Right,CMD_Alt_Shift,1\n1key,18,538,28,Middle,CMD_Shift,2\n1key,18,539,29,Left,CMD_Alt_Shift,2\n1key,18,540,30,Middle,CMD,1"
    p19 = "DesignName,ParticipantID,TrialID,Block1,Letter1,Modifier1,Size\n1key,19,541,1,Right,Alt,1\n1key,19,542,2,Left,Alt,1\n1key,19,543,3,Left,None,1\n1key,19,544,4,Left,CMD_Alt_Shift,1\n1key,19,545,5,Left,CMD_Alt_Shift,2\n1key,19,546,6,Middle,CMD,1\n1key,19,547,7,Middle,CMD_Shift,2\n1key,19,548,8,Middle,Alt,2\n1key,19,549,9,Left,None,2\n1key,19,550,10,Right,CMD_Alt_Shift,1\n1key,19,551,11,Left,CMD_Shift,1\n1key,19,552,12,Right,CMD,1\n1key,19,553,13,Right,CMD_Shift,2\n1key,19,554,14,Middle,None,2\n1key,19,555,15,Middle,CMD_Alt_Shift,2\n1key,19,556,16,Right,None,1\n1key,19,557,17,Right,CMD_Shift,1\n1key,19,558,18,Left,CMD,1\n1key,19,559,19,Left,CMD,2\n1key,19,560,20,Right,None,2\n1key,19,561,21,Left,Alt,2\n1key,19,562,22,Left,CMD_Shift,2\n1key,19,563,23,Right,CMD,2\n1key,19,564,24,Right,Alt,2\n1key,19,565,25,Middle,Alt,1\n1key,19,566,26,Middle,CMD_Shift,1\n1key,19,567,27,Right,CMD_Alt_Shift,2\n1key,19,568,28,Middle,CMD_Alt_Shift,1\n1key,19,569,29,Middle,None,1\n1key,19,570,30,Middle,CMD,2"
    p20 = "DesignName,ParticipantID,TrialID,Block1,Letter1,Modifier1,Size\n1key,20,571,1,Right,Alt,2\n1key,20,572,2,Left,Alt,2\n1key,20,573,3,Left,None,2\n1key,20,574,4,Left,CMD_Alt_Shift,2\n1key,20,575,5,Middle,None,1\n1key,20,576,6,Middle,CMD,2\n1key,20,577,7,Middle,CMD_Alt_Shift,1\n1key,20,578,8,Middle,CMD_Shift,1\n1key,20,579,9,Left,CMD,1\n1key,20,580,10,Right,CMD_Alt_Shift,2\n1key,20,581,11,Left,CMD_Shift,2\n1key,20,582,12,Right,CMD,2\n1key,20,583,13,Right,CMD_Alt_Shift,1\n1key,20,584,14,Middle,CMD,1\n1key,20,585,15,Right,None,1\n1key,20,586,16,Right,None,2\n1key,20,587,17,Right,CMD_Shift,2\n1key,20,588,18,Left,CMD,2\n1key,20,589,19,Left,Alt,1\n1key,20,590,20,Right,CMD,1\n1key,20,591,21,Left,CMD_Shift,1\n1key,20,592,22,Left,CMD_Alt_Shift,1\n1key,20,593,23,Right,Alt,1\n1key,20,594,24,Right,CMD_Shift,1\n1key,20,595,25,Middle,Alt,2\n1key,20,596,26,Middle,CMD_Shift,2\n1key,20,597,27,Left,None,1\n1key,20,598,28,Middle,CMD_Alt_Shift,2\n1key,20,599,29,Middle,None,2\n1key,20,600,30,Middle,Alt,1"

    return parseCSV(p2);

}

// var experiment = async () => {
//     let res = await loadExperiment();
//     return res;
// };

function recordTime() {
    var time = new Date();
    //var timeString = time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
    return time;
}

var experiments = loadExperiment()
var data = ""

var osModKey = navigator.userAgent.match(/Mac/i) ? "cmd" : "ctrl";

var isRecording = false;

var block = 0
var trial
var letter = ""
var modi = ""
var start
var end

letters = {
    "Left" : ["E","Z","X","C"],
    "Middle" : ["V","B","H","U"],
    "Right" : ["I","J","M","P"]
}

modifiers = {
    "None" : "",
    "CMD" : "CMD",
    "Alt" : "Alt",
    "CMD_Shift" : "CMD Shift",
    "CMD_Alt_Shift" : "CMD Alt Shift"
}

//console.log(experiment);

const shortcutElement = document.getElementById("shortcut");

var target = document.createElement("div");
target.id = "target";
target.style.position = "fixed";
var targetSize
target.style.borderRadius = "50%";
target.style.border = "2px solid black";

document.body.appendChild(target);

nextTest();

function nextTest() {
    start = recordTime();
    trial = experiments[block]
    letter = letters[trial["Letter1"]][Math.floor(Math.random() * 4)]
    modi = modifiers[trial["Modifier1"]]

    var next = document.getElementById("next");
    var shortcut = modi + " " + letter
    shortcutElement.innerHTML = shortcut;

    target.style.backgroundColor = "";

    target.style.top = 100 + Math.floor(Math.random() * (window.innerHeight - target.clientHeight - 200)) + "px";
    
    target.style.right = 100 + Math.floor(Math.random() * (window.innerHeight - target.clientHeight - 200)) + "px";
    
    targetSize = 50 * parseInt(trial["Size"]);
    target.style.width = targetSize + "px";
    target.style.height = targetSize + "px";

    isRecording = false;
    next.disabled = true;

    block += 1;
    if(block == experiments.length){
        console.log(data)
    }
}


target.onclick = function() {
    isRecording = true;
    target.style.backgroundColor = "lightgray";
}

document.onkeydown = function(e) {

    var modKey1 = navigator.userAgent.match(/Mac/i) ? e.metaKey : e.ctrlKey;
    var modKey2 = e.shiftKey;
    var modKey3 = e.altKey;

    switch(trial["Modifier1"]) {
        case "CMD":
            key1 = true
            key2 = false
            key3 = false
        break;

        case "CMD_Shift":
            key1 = true
            key2 = true
            key3 = false
        break;

        case "Alt":
            key1 = false
            key2 = false
            key3 = true
        break;

        case "CMD_Alt_Shift":
            key1 = true
            key2 = true
            key3 = true
        break;

        case "None":
            key1 = false
            key2 = false
            key3 = false
        break;
    }
    
    if (modKey1) {
        e.preventDefault();
    }
    shortcutSuccess = isRecording && e.code.toUpperCase() == "KEY"+letter && key1==modKey1 && key2==modKey2 && key3==modKey3
    if (shortcutSuccess) {
        var next = document.getElementById("next");
        if (next.disabled){
            end = recordTime()
            time = (end-start)/1000
            out = trial["DesignName"]+","+trial["ParticipantID"]+","+trial["TrialID"]+","+trial["Block1"]+","+trial["Letter1"]+","+trial["Modifier1"]+","+trial["Size"]+","+time
            data += out+'\n'
            console.log(out)
        }
        next.disabled = false;
    }
}