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

    p1 = "DesignName,ParticipantID,TrialID,Block1,First,Size\ntest2,1,1,1,E,1\ntest2,1,2,2,NW,2\ntest2,1,3,3,NE,1\ntest2,1,4,4,SE,3\ntest2,1,5,5,SW,1\ntest2,1,6,6,W,3\ntest2,1,7,7,SW,2\ntest2,1,8,8,N,1\ntest2,1,9,9,NE,2\ntest2,1,10,10,W,2\ntest2,1,11,11,SE,1\ntest2,1,12,12,S,2\ntest2,1,13,13,W,1\ntest2,1,14,14,SW,3\ntest2,1,15,15,N,2\ntest2,1,16,16,N,3\ntest2,1,17,17,E,3\ntest2,1,18,18,NE,3\ntest2,1,19,19,NW,1\ntest2,1,20,20,S,1\ntest2,1,21,21,NW,3\ntest2,1,22,22,SE,2\ntest2,1,23,23,S,3\ntest2,1,24,24,E,2\ntest2,1,25,25,SW,2\ntest2,1,26,26,E,3\ntest2,1,27,27,W,1\ntest2,1,28,28,NW,3\ntest2,1,29,29,SE,2\ntest2,1,30,30,S,2\ntest2,1,31,31,S,3\ntest2,1,32,32,E,1\ntest2,1,33,33,SW,3\ntest2,1,34,34,SE,1\ntest2,1,35,35,NW,1\ntest2,1,36,36,SW,1\ntest2,1,37,37,W,2\ntest2,1,38,38,E,2\ntest2,1,39,39,NW,2\ntest2,1,40,40,NE,1\ntest2,1,41,41,NE,2\ntest2,1,42,42,N,2\ntest2,1,43,43,N,3\ntest2,1,44,44,SE,3\ntest2,1,45,45,NE,3\ntest2,1,46,46,S,1\ntest2,1,47,47,W,3\ntest2,1,48,48,N,1"
    p2 = "DesignName,ParticipantID,TrialID,Block1,First,Size\ntest2,2,49,1,E,2\ntest2,2,50,2,NW,3\ntest2,2,51,3,NE,2\ntest2,2,52,4,SW,1\ntest2,2,53,5,SW,2\ntest2,2,54,6,NE,1\ntest2,2,55,7,SW,3\ntest2,2,56,8,N,2\ntest2,2,57,9,NE,3\ntest2,2,58,10,W,3\ntest2,2,59,11,SE,2\ntest2,2,60,12,S,3\ntest2,2,61,13,W,2\ntest2,2,62,14,N,1\ntest2,2,63,15,N,3\ntest2,2,64,16,S,1\ntest2,2,65,17,W,1\ntest2,2,66,18,NW,1\ntest2,2,67,19,NW,2\ntest2,2,68,20,S,2\ntest2,2,69,21,SE,1\ntest2,2,70,22,SE,3\ntest2,2,71,23,E,1\ntest2,2,72,24,E,3\ntest2,2,73,25,SW,3\ntest2,2,74,26,W,1\ntest2,2,75,27,W,2\ntest2,2,76,28,SE,1\ntest2,2,77,29,SE,3\ntest2,2,78,30,S,3\ntest2,2,79,31,E,1\ntest2,2,80,32,E,2\ntest2,2,81,33,N,1\ntest2,2,82,34,SE,2\ntest2,2,83,35,NW,2\ntest2,2,84,36,SW,2\ntest2,2,85,37,W,3\ntest2,2,86,38,E,3\ntest2,2,87,39,NW,3\ntest2,2,88,40,NE,2\ntest2,2,89,41,NE,3\ntest2,2,90,42,N,3\ntest2,2,91,43,S,1\ntest2,2,92,44,SW,1\ntest2,2,93,45,NW,1\ntest2,2,94,46,S,2\ntest2,2,95,47,NE,1\ntest2,2,96,48,N,2"
    p3 = "DesignName,ParticipantID,TrialID,Block1,First,Size\ntest2,3,97,1,E,3\ntest2,3,98,2,SE,1\ntest2,3,99,3,NE,3\ntest2,3,100,4,SW,2\ntest2,3,101,5,SW,3\ntest2,3,102,6,NE,2\ntest2,3,103,7,N,1\ntest2,3,104,8,N,3\ntest2,3,105,9,NW,1\ntest2,3,106,10,NE,1\ntest2,3,107,11,SE,3\ntest2,3,108,12,E,1\ntest2,3,109,13,W,3\ntest2,3,110,14,N,2\ntest2,3,111,15,S,1\ntest2,3,112,16,S,2\ntest2,3,113,17,W,2\ntest2,3,114,18,NW,2\ntest2,3,115,19,NW,3\ntest2,3,116,20,S,3\ntest2,3,117,21,SE,2\ntest2,3,118,22,SW,1\ntest2,3,119,23,E,2\ntest2,3,120,24,W,1\ntest2,3,121,25,N,1\ntest2,3,122,26,W,2\ntest2,3,123,27,W,3\ntest2,3,124,28,SE,2\ntest2,3,125,29,SW,1\ntest2,3,126,30,E,1\ntest2,3,127,31,E,2\ntest2,3,128,32,E,3\ntest2,3,129,33,N,2\ntest2,3,130,34,SE,3\ntest2,3,131,35,NW,3\ntest2,3,132,36,SW,3\ntest2,3,133,37,NE,1\ntest2,3,134,38,W,1\ntest2,3,135,39,SE,1\ntest2,3,136,40,NE,3\ntest2,3,137,41,NW,1\ntest2,3,138,42,S,1\ntest2,3,139,43,S,2\ntest2,3,140,44,SW,2\ntest2,3,141,45,NW,2\ntest2,3,142,46,S,3\ntest2,3,143,47,NE,2\ntest2,3,144,48,N,3"
    p4 = "DesignName,ParticipantID,TrialID,Block1,First,Size\ntest2,4,145,1,W,1\ntest2,4,146,2,SE,2\ntest2,4,147,3,NW,1\ntest2,4,148,4,SW,3\ntest2,4,149,5,N,1\ntest2,4,150,6,NE,3\ntest2,4,151,7,N,2\ntest2,4,152,8,S,1\ntest2,4,153,9,NW,2\ntest2,4,154,10,NE,2\ntest2,4,155,11,SW,1\ntest2,4,156,12,E,2\ntest2,4,157,13,NE,1\ntest2,4,158,14,N,3\ntest2,4,159,15,S,2\ntest2,4,160,16,S,3\ntest2,4,161,17,W,3\ntest2,4,162,18,NW,3\ntest2,4,163,19,SE,1\ntest2,4,164,20,E,1\ntest2,4,165,21,SE,3\ntest2,4,166,22,SW,2\ntest2,4,167,23,E,3\ntest2,4,168,24,W,2\ntest2,4,169,25,N,2\ntest2,4,170,26,W,3\ntest2,4,171,27,NE,1\ntest2,4,172,28,SE,3\ntest2,4,173,29,SW,2\ntest2,4,174,30,E,2\ntest2,4,175,31,E,3\ntest2,4,176,32,W,1\ntest2,4,177,33,N,3\ntest2,4,178,34,SW,1\ntest2,4,179,35,SE,1\ntest2,4,180,36,N,1\ntest2,4,181,37,NE,2\ntest2,4,182,38,W,2\ntest2,4,183,39,SE,2\ntest2,4,184,40,NW,1\ntest2,4,185,41,NW,2\ntest2,4,186,42,S,2\ntest2,4,187,43,S,3\ntest2,4,188,44,SW,3\ntest2,4,189,45,NW,3\ntest2,4,190,46,E,1\ntest2,4,191,47,NE,3\ntest2,4,192,48,S,1"
    p5 = "DesignName,ParticipantID,TrialID,Block1,First,Size\ntest2,5,193,1,W,2\ntest2,5,194,2,SE,3\ntest2,5,195,3,NW,2\ntest2,5,196,4,N,1\ntest2,5,197,5,N,2\ntest2,5,198,6,NW,1\ntest2,5,199,7,N,3\ntest2,5,200,8,S,2\ntest2,5,201,9,NW,3\ntest2,5,202,10,NE,3\ntest2,5,203,11,SW,2\ntest2,5,204,12,E,3\ntest2,5,205,13,NE,2\ntest2,5,206,14,S,1\ntest2,5,207,15,S,3\ntest2,5,208,16,E,1\ntest2,5,209,17,NE,1\ntest2,5,210,18,SE,1\ntest2,5,211,19,SE,2\ntest2,5,212,20,E,2\ntest2,5,213,21,SW,1\ntest2,5,214,22,SW,3\ntest2,5,215,23,W,1\ntest2,5,216,24,W,3\ntest2,5,217,25,N,3\ntest2,5,218,26,NE,1\ntest2,5,219,27,NE,2\ntest2,5,220,28,SW,1\ntest2,5,221,29,SW,3\ntest2,5,222,30,E,3\ntest2,5,223,31,W,1\ntest2,5,224,32,W,2\ntest2,5,225,33,S,1\ntest2,5,226,34,SW,2\ntest2,5,227,35,SE,2\ntest2,5,228,36,N,2\ntest2,5,229,37,NE,3\ntest2,5,230,38,W,3\ntest2,5,231,39,SE,3\ntest2,5,232,40,NW,2\ntest2,5,233,41,NW,3\ntest2,5,234,42,S,3\ntest2,5,235,43,E,1\ntest2,5,236,44,N,1\ntest2,5,237,45,SE,1\ntest2,5,238,46,E,2\ntest2,5,239,47,NW,1\ntest2,5,240,48,S,2"
    p6 = "DesignName,ParticipantID,TrialID,Block1,First,Size\ntest2,6,241,1,W,3\ntest2,6,242,2,SW,1\ntest2,6,243,3,NW,3\ntest2,6,244,4,N,2\ntest2,6,245,5,N,3\ntest2,6,246,6,NW,2\ntest2,6,247,7,S,1\ntest2,6,248,8,S,3\ntest2,6,249,9,SE,1\ntest2,6,250,10,NW,1\ntest2,6,251,11,SW,3\ntest2,6,252,12,W,1\ntest2,6,253,13,NE,3\ntest2,6,254,14,S,2\ntest2,6,255,15,E,1\ntest2,6,256,16,E,2\ntest2,6,257,17,NE,2\ntest2,6,258,18,SE,2\ntest2,6,259,19,SE,3\ntest2,6,260,20,E,3\ntest2,6,261,21,SW,2\ntest2,6,262,22,N,1\ntest2,6,263,23,W,2\ntest2,6,264,24,NE,1\ntest2,6,265,25,S,1\ntest2,6,266,26,NE,2\ntest2,6,267,27,NE,3\ntest2,6,268,28,SW,2\ntest2,6,269,29,N,1\ntest2,6,270,30,W,1\ntest2,6,271,31,W,2\ntest2,6,272,32,W,3\ntest2,6,273,33,S,2\ntest2,6,274,34,SW,3\ntest2,6,275,35,SE,3\ntest2,6,276,36,N,3\ntest2,6,277,37,NW,1\ntest2,6,278,38,NE,1\ntest2,6,279,39,SW,1\ntest2,6,280,40,NW,3\ntest2,6,281,41,SE,1\ntest2,6,282,42,E,1\ntest2,6,283,43,E,2\ntest2,6,284,44,N,2\ntest2,6,285,45,SE,2\ntest2,6,286,46,E,3\ntest2,6,287,47,NW,2\ntest2,6,288,48,S,3"
    p7 = "DesignName,ParticipantID,TrialID,Block1,First,Size\ntest2,7,289,1,NE,1\ntest2,7,290,2,SW,2\ntest2,7,291,3,SE,1\ntest2,7,292,4,N,3\ntest2,7,293,5,S,1\ntest2,7,294,6,NW,3\ntest2,7,295,7,S,2\ntest2,7,296,8,E,1\ntest2,7,297,9,SE,2\ntest2,7,298,10,NW,2\ntest2,7,299,11,N,1\ntest2,7,300,12,W,2\ntest2,7,301,13,NW,1\ntest2,7,302,14,S,3\ntest2,7,303,15,E,2\ntest2,7,304,16,E,3\ntest2,7,305,17,NE,3\ntest2,7,306,18,SE,3\ntest2,7,307,19,SW,1\ntest2,7,308,20,W,1\ntest2,7,309,21,SW,3\ntest2,7,310,22,N,2\ntest2,7,311,23,W,3\ntest2,7,312,24,NE,2\ntest2,7,313,25,S,2\ntest2,7,314,26,NE,3\ntest2,7,315,27,NW,1\ntest2,7,316,28,SW,3\ntest2,7,317,29,N,2\ntest2,7,318,30,W,2\ntest2,7,319,31,W,3\ntest2,7,320,32,NE,1\ntest2,7,321,33,S,3\ntest2,7,322,34,N,1\ntest2,7,323,35,SW,1\ntest2,7,324,36,S,1\ntest2,7,325,37,NW,2\ntest2,7,326,38,NE,2\ntest2,7,327,39,SW,2\ntest2,7,328,40,SE,1\ntest2,7,329,41,SE,2\ntest2,7,330,42,E,2\ntest2,7,331,43,E,3\ntest2,7,332,44,N,3\ntest2,7,333,45,SE,3\ntest2,7,334,46,W,1\ntest2,7,335,47,NW,3\ntest2,7,336,48,E,1"
    p8 = "DesignName,ParticipantID,TrialID,Block1,First,Size\ntest2,8,337,1,NE,2\ntest2,8,338,2,SW,3\ntest2,8,339,3,SE,2\ntest2,8,340,4,S,1\ntest2,8,341,5,S,2\ntest2,8,342,6,SE,1\ntest2,8,343,7,S,3\ntest2,8,344,8,E,2\ntest2,8,345,9,SE,3\ntest2,8,346,10,NW,3\ntest2,8,347,11,N,2\ntest2,8,348,12,W,3\ntest2,8,349,13,NW,2\ntest2,8,350,14,E,1\ntest2,8,351,15,E,3\ntest2,8,352,16,W,1\ntest2,8,353,17,NW,1\ntest2,8,354,18,SW,1\ntest2,8,355,19,SW,2\ntest2,8,356,20,W,2\ntest2,8,357,21,N,1\ntest2,8,358,22,N,3\ntest2,8,359,23,NE,1\ntest2,8,360,24,NE,3\ntest2,8,361,25,S,3\ntest2,8,362,26,NW,1\ntest2,8,363,27,NW,2\ntest2,8,364,28,N,1\ntest2,8,365,29,N,3\ntest2,8,366,30,W,3\ntest2,8,367,31,NE,1\ntest2,8,368,32,NE,2\ntest2,8,369,33,E,1\ntest2,8,370,34,N,2\ntest2,8,371,35,SW,2\ntest2,8,372,36,S,2\ntest2,8,373,37,NW,3\ntest2,8,374,38,NE,3\ntest2,8,375,39,SW,3\ntest2,8,376,40,SE,2\ntest2,8,377,41,SE,3\ntest2,8,378,42,E,3\ntest2,8,379,43,W,1\ntest2,8,380,44,S,1\ntest2,8,381,45,SW,1\ntest2,8,382,46,W,2\ntest2,8,383,47,SE,1\ntest2,8,384,48,E,2"
    p9 = "DesignName,ParticipantID,TrialID,Block1,First,Size\ntest2,9,385,1,NE,3\ntest2,9,386,2,N,1\ntest2,9,387,3,SE,3\ntest2,9,388,4,S,2\ntest2,9,389,5,S,3\ntest2,9,390,6,SE,2\ntest2,9,391,7,E,1\ntest2,9,392,8,E,3\ntest2,9,393,9,SW,1\ntest2,9,394,10,SE,1\ntest2,9,395,11,N,3\ntest2,9,396,12,NE,1\ntest2,9,397,13,NW,3\ntest2,9,398,14,E,2\ntest2,9,399,15,W,1\ntest2,9,400,16,W,2\ntest2,9,401,17,NW,2\ntest2,9,402,18,SW,2\ntest2,9,403,19,SW,3\ntest2,9,404,20,W,3\ntest2,9,405,21,N,2\ntest2,9,406,22,S,1\ntest2,9,407,23,NE,2\ntest2,9,408,24,NW,1\ntest2,9,409,25,E,1\ntest2,9,410,26,NW,2\ntest2,9,411,27,NW,3\ntest2,9,412,28,N,2\ntest2,9,413,29,S,1\ntest2,9,414,30,NE,1\ntest2,9,415,31,NE,2\ntest2,9,416,32,NE,3\ntest2,9,417,33,E,2\ntest2,9,418,34,N,3\ntest2,9,419,35,SW,3\ntest2,9,420,36,S,3\ntest2,9,421,37,SE,1\ntest2,9,422,38,NW,1\ntest2,9,423,39,N,1\ntest2,9,424,40,SE,3\ntest2,9,425,41,SW,1\ntest2,9,426,42,W,1\ntest2,9,427,43,W,2\ntest2,9,428,44,S,2\ntest2,9,429,45,SW,2\ntest2,9,430,46,W,3\ntest2,9,431,47,SE,2\ntest2,9,432,48,E,3"
    p10 = "DesignName,ParticipantID,TrialID,Block1,First,Size\ntest2,10,433,1,NW,1\ntest2,10,434,2,N,2\ntest2,10,435,3,SW,1\ntest2,10,436,4,S,3\ntest2,10,437,5,E,1\ntest2,10,438,6,SE,3\ntest2,10,439,7,E,2\ntest2,10,440,8,W,1\ntest2,10,441,9,SW,2\ntest2,10,442,10,SE,2\ntest2,10,443,11,S,1\ntest2,10,444,12,NE,2\ntest2,10,445,13,SE,1\ntest2,10,446,14,E,3\ntest2,10,447,15,W,2\ntest2,10,448,16,W,3\ntest2,10,449,17,NW,3\ntest2,10,450,18,SW,3\ntest2,10,451,19,N,1\ntest2,10,452,20,NE,1\ntest2,10,453,21,N,3\ntest2,10,454,22,S,2\ntest2,10,455,23,NE,3\ntest2,10,456,24,NW,2\ntest2,10,457,25,E,2\ntest2,10,458,26,NW,3\ntest2,10,459,27,SE,1\ntest2,10,460,28,N,3\ntest2,10,461,29,S,2\ntest2,10,462,30,NE,2\ntest2,10,463,31,NE,3\ntest2,10,464,32,NW,1\ntest2,10,465,33,E,3\ntest2,10,466,34,S,1\ntest2,10,467,35,N,1\ntest2,10,468,36,E,1\ntest2,10,469,37,SE,2\ntest2,10,470,38,NW,2\ntest2,10,471,39,N,2\ntest2,10,472,40,SW,1\ntest2,10,473,41,SW,2\ntest2,10,474,42,W,2\ntest2,10,475,43,W,3\ntest2,10,476,44,S,3\ntest2,10,477,45,SW,3\ntest2,10,478,46,NE,1\ntest2,10,479,47,SE,3\ntest2,10,480,48,W,1"
    p11 = "DesignName,ParticipantID,TrialID,Block1,First,Size\ntest2,11,481,1,NW,2\ntest2,11,482,2,N,3\ntest2,11,483,3,SW,2\ntest2,11,484,4,E,1\ntest2,11,485,5,E,2\ntest2,11,486,6,SW,1\ntest2,11,487,7,E,3\ntest2,11,488,8,W,2\ntest2,11,489,9,SW,3\ntest2,11,490,10,SE,3\ntest2,11,491,11,S,2\ntest2,11,492,12,NE,3\ntest2,11,493,13,SE,2\ntest2,11,494,14,W,1\ntest2,11,495,15,W,3\ntest2,11,496,16,NE,1\ntest2,11,497,17,SE,1\ntest2,11,498,18,N,1\ntest2,11,499,19,N,2\ntest2,11,500,20,NE,2\ntest2,11,501,21,S,1\ntest2,11,502,22,S,3\ntest2,11,503,23,NW,1\ntest2,11,504,24,NW,3\ntest2,11,505,25,E,3\ntest2,11,506,26,SE,1\ntest2,11,507,27,SE,2\ntest2,11,508,28,S,1\ntest2,11,509,29,S,3\ntest2,11,510,30,NE,3\ntest2,11,511,31,NW,1\ntest2,11,512,32,NW,2\ntest2,11,513,33,W,1\ntest2,11,514,34,S,2\ntest2,11,515,35,N,2\ntest2,11,516,36,E,2\ntest2,11,517,37,SE,3\ntest2,11,518,38,NW,3\ntest2,11,519,39,N,3\ntest2,11,520,40,SW,2\ntest2,11,521,41,SW,3\ntest2,11,522,42,W,3\ntest2,11,523,43,NE,1\ntest2,11,524,44,E,1\ntest2,11,525,45,N,1\ntest2,11,526,46,NE,2\ntest2,11,527,47,SW,1\ntest2,11,528,48,W,2"
    p12 = "DesignName,ParticipantID,TrialID,Block1,First,Size\ntest2,12,529,1,NW,3\ntest2,12,530,2,S,1\ntest2,12,531,3,SW,3\ntest2,12,532,4,E,2\ntest2,12,533,5,E,3\ntest2,12,534,6,SW,2\ntest2,12,535,7,W,1\ntest2,12,536,8,W,3\ntest2,12,537,9,N,1\ntest2,12,538,10,SW,1\ntest2,12,539,11,S,3\ntest2,12,540,12,NW,1\ntest2,12,541,13,SE,3\ntest2,12,542,14,W,2\ntest2,12,543,15,NE,1\ntest2,12,544,16,NE,2\ntest2,12,545,17,SE,2\ntest2,12,546,18,N,2\ntest2,12,547,19,N,3\ntest2,12,548,20,NE,3\ntest2,12,549,21,S,2\ntest2,12,550,22,E,1\ntest2,12,551,23,NW,2\ntest2,12,552,24,SE,1\ntest2,12,553,25,W,1\ntest2,12,554,26,SE,2\ntest2,12,555,27,SE,3\ntest2,12,556,28,S,2\ntest2,12,557,29,E,1\ntest2,12,558,30,NW,1\ntest2,12,559,31,NW,2\ntest2,12,560,32,NW,3\ntest2,12,561,33,W,2\ntest2,12,562,34,S,3\ntest2,12,563,35,N,3\ntest2,12,564,36,E,3\ntest2,12,565,37,SW,1\ntest2,12,566,38,SE,1\ntest2,12,567,39,S,1\ntest2,12,568,40,SW,3\ntest2,12,569,41,N,1\ntest2,12,570,42,NE,1\ntest2,12,571,43,NE,2\ntest2,12,572,44,E,2\ntest2,12,573,45,N,2\ntest2,12,574,46,NE,3\ntest2,12,575,47,SW,2\ntest2,12,576,48,W,3"
    p13 = "DesignName,ParticipantID,TrialID,Block1,First,Size\ntest2,13,577,1,SE,1\ntest2,13,578,2,S,2\ntest2,13,579,3,N,1\ntest2,13,580,4,E,3\ntest2,13,581,5,W,1\ntest2,13,582,6,SW,3\ntest2,13,583,7,W,2\ntest2,13,584,8,NE,1\ntest2,13,585,9,N,2\ntest2,13,586,10,SW,2\ntest2,13,587,11,E,1\ntest2,13,588,12,NW,2\ntest2,13,589,13,SW,1\ntest2,13,590,14,W,3\ntest2,13,591,15,NE,2\ntest2,13,592,16,NE,3\ntest2,13,593,17,SE,3\ntest2,13,594,18,N,3\ntest2,13,595,19,S,1\ntest2,13,596,20,NW,1\ntest2,13,597,21,S,3\ntest2,13,598,22,E,2\ntest2,13,599,23,NW,3\ntest2,13,600,24,SE,2\ntest2,13,601,25,W,2\ntest2,13,602,26,SE,3\ntest2,13,603,27,SW,1\ntest2,13,604,28,S,3\ntest2,13,605,29,E,2\ntest2,13,606,30,NW,2\ntest2,13,607,31,NW,3\ntest2,13,608,32,SE,1\ntest2,13,609,33,W,3\ntest2,13,610,34,E,1\ntest2,13,611,35,S,1\ntest2,13,612,36,W,1\ntest2,13,613,37,SW,2\ntest2,13,614,38,SE,2\ntest2,13,615,39,S,2\ntest2,13,616,40,N,1\ntest2,13,617,41,N,2\ntest2,13,618,42,NE,2\ntest2,13,619,43,NE,3\ntest2,13,620,44,E,3\ntest2,13,621,45,N,3\ntest2,13,622,46,NW,1\ntest2,13,623,47,SW,3\ntest2,13,624,48,NE,1"
    p14 = "DesignName,ParticipantID,TrialID,Block1,First,Size\ntest2,14,625,1,SE,2\ntest2,14,626,2,S,3\ntest2,14,627,3,N,2\ntest2,14,628,4,W,1\ntest2,14,629,5,W,2\ntest2,14,630,6,N,1\ntest2,14,631,7,W,3\ntest2,14,632,8,NE,2\ntest2,14,633,9,N,3\ntest2,14,634,10,SW,3\ntest2,14,635,11,E,2\ntest2,14,636,12,NW,3\ntest2,14,637,13,SW,2\ntest2,14,638,14,NE,1\ntest2,14,639,15,NE,3\ntest2,14,640,16,NW,1\ntest2,14,641,17,SW,1\ntest2,14,642,18,S,1\ntest2,14,643,19,S,2\ntest2,14,644,20,NW,2\ntest2,14,645,21,E,1\ntest2,14,646,22,E,3\ntest2,14,647,23,SE,1\ntest2,14,648,24,SE,3\ntest2,14,649,25,W,3\ntest2,14,650,26,SW,1\ntest2,14,651,27,SW,2\ntest2,14,652,28,E,1\ntest2,14,653,29,E,3\ntest2,14,654,30,NW,3\ntest2,14,655,31,SE,1\ntest2,14,656,32,SE,2\ntest2,14,657,33,NE,1\ntest2,14,658,34,E,2\ntest2,14,659,35,S,2\ntest2,14,660,36,W,2\ntest2,14,661,37,SW,3\ntest2,14,662,38,SE,3\ntest2,14,663,39,S,3\ntest2,14,664,40,N,2\ntest2,14,665,41,N,3\ntest2,14,666,42,NE,3\ntest2,14,667,43,NW,1\ntest2,14,668,44,W,1\ntest2,14,669,45,S,1\ntest2,14,670,46,NW,2\ntest2,14,671,47,N,1\ntest2,14,672,48,NE,2"
    p15 = "DesignName,ParticipantID,TrialID,Block1,First,Size\ntest2,15,673,1,SE,3\ntest2,15,674,2,E,1\ntest2,15,675,3,N,3\ntest2,15,676,4,W,2\ntest2,15,677,5,W,3\ntest2,15,678,6,N,2\ntest2,15,679,7,NE,1\ntest2,15,680,8,NE,3\ntest2,15,681,9,S,1\ntest2,15,682,10,N,1\ntest2,15,683,11,E,3\ntest2,15,684,12,SE,1\ntest2,15,685,13,SW,3\ntest2,15,686,14,NE,2\ntest2,15,687,15,NW,1\ntest2,15,688,16,NW,2\ntest2,15,689,17,SW,2\ntest2,15,690,18,S,2\ntest2,15,691,19,S,3\ntest2,15,692,20,NW,3\ntest2,15,693,21,E,2\ntest2,15,694,22,W,1\ntest2,15,695,23,SE,2\ntest2,15,696,24,SW,1\ntest2,15,697,25,NE,1\ntest2,15,698,26,SW,2\ntest2,15,699,27,SW,3\ntest2,15,700,28,E,2\ntest2,15,701,29,W,1\ntest2,15,702,30,SE,1\ntest2,15,703,31,SE,2\ntest2,15,704,32,SE,3\ntest2,15,705,33,NE,2\ntest2,15,706,34,E,3\ntest2,15,707,35,S,3\ntest2,15,708,36,W,3\ntest2,15,709,37,N,1\ntest2,15,710,38,SW,1\ntest2,15,711,39,E,1\ntest2,15,712,40,N,3\ntest2,15,713,41,S,1\ntest2,15,714,42,NW,1\ntest2,15,715,43,NW,2\ntest2,15,716,44,W,2\ntest2,15,717,45,S,2\ntest2,15,718,46,NW,3\ntest2,15,719,47,N,2\ntest2,15,720,48,NE,3"
    p16 = "DesignName,ParticipantID,TrialID,Block1,First,Size\ntest2,16,721,1,SW,1\ntest2,16,722,2,E,2\ntest2,16,723,3,S,1\ntest2,16,724,4,W,3\ntest2,16,725,5,NE,1\ntest2,16,726,6,N,3\ntest2,16,727,7,NE,2\ntest2,16,728,8,NW,1\ntest2,16,729,9,S,2\ntest2,16,730,10,N,2\ntest2,16,731,11,W,1\ntest2,16,732,12,SE,2\ntest2,16,733,13,N,1\ntest2,16,734,14,NE,3\ntest2,16,735,15,NW,2\ntest2,16,736,16,NW,3\ntest2,16,737,17,SW,3\ntest2,16,738,18,S,3\ntest2,16,739,19,E,1\ntest2,16,740,20,SE,1\ntest2,16,741,21,E,3\ntest2,16,742,22,W,2\ntest2,16,743,23,SE,3\ntest2,16,744,24,SW,2\ntest2,16,745,25,NE,2\ntest2,16,746,26,SW,3\ntest2,16,747,27,N,1\ntest2,16,748,28,E,3\ntest2,16,749,29,W,2\ntest2,16,750,30,SE,2\ntest2,16,751,31,SE,3\ntest2,16,752,32,SW,1\ntest2,16,753,33,NE,3\ntest2,16,754,34,W,1\ntest2,16,755,35,E,1\ntest2,16,756,36,NE,1\ntest2,16,757,37,N,2\ntest2,16,758,38,SW,2\ntest2,16,759,39,E,2\ntest2,16,760,40,S,1\ntest2,16,761,41,S,2\ntest2,16,762,42,NW,2\ntest2,16,763,43,NW,3\ntest2,16,764,44,W,3\ntest2,16,765,45,S,3\ntest2,16,766,46,SE,1\ntest2,16,767,47,N,3\ntest2,16,768,48,NW,1"
    p17 = "DesignName,ParticipantID,TrialID,Block1,First,Size\ntest2,17,769,1,SW,2\ntest2,17,770,2,E,3\ntest2,17,771,3,S,2\ntest2,17,772,4,NE,1\ntest2,17,773,5,NE,2\ntest2,17,774,6,S,1\ntest2,17,775,7,NE,3\ntest2,17,776,8,NW,2\ntest2,17,777,9,S,3\ntest2,17,778,10,N,3\ntest2,17,779,11,W,2\ntest2,17,780,12,SE,3\ntest2,17,781,13,N,2\ntest2,17,782,14,NW,1\ntest2,17,783,15,NW,3\ntest2,17,784,16,SE,1\ntest2,17,785,17,N,1\ntest2,17,786,18,E,1\ntest2,17,787,19,E,2\ntest2,17,788,20,SE,2\ntest2,17,789,21,W,1\ntest2,17,790,22,W,3\ntest2,17,791,23,SW,1\ntest2,17,792,24,SW,3\ntest2,17,793,25,NE,3\ntest2,17,794,26,N,1\ntest2,17,795,27,N,2\ntest2,17,796,28,W,1\ntest2,17,797,29,W,3\ntest2,17,798,30,SE,3\ntest2,17,799,31,SW,1\ntest2,17,800,32,SW,2\ntest2,17,801,33,NW,1\ntest2,17,802,34,W,2\ntest2,17,803,35,E,2\ntest2,17,804,36,NE,2\ntest2,17,805,37,N,3\ntest2,17,806,38,SW,3\ntest2,17,807,39,E,3\ntest2,17,808,40,S,2\ntest2,17,809,41,S,3\ntest2,17,810,42,NW,3\ntest2,17,811,43,SE,1\ntest2,17,812,44,NE,1\ntest2,17,813,45,E,1\ntest2,17,814,46,SE,2\ntest2,17,815,47,S,1\ntest2,17,816,48,NW,2"
    p18 = "DesignName,ParticipantID,TrialID,Block1,First,Size\ntest2,18,817,1,SW,3\ntest2,18,818,2,W,1\ntest2,18,819,3,S,3\ntest2,18,820,4,NE,2\ntest2,18,821,5,NE,3\ntest2,18,822,6,S,2\ntest2,18,823,7,NW,1\ntest2,18,824,8,NW,3\ntest2,18,825,9,E,1\ntest2,18,826,10,S,1\ntest2,18,827,11,W,3\ntest2,18,828,12,SW,1\ntest2,18,829,13,N,3\ntest2,18,830,14,NW,2\ntest2,18,831,15,SE,1\ntest2,18,832,16,SE,2\ntest2,18,833,17,N,2\ntest2,18,834,18,E,2\ntest2,18,835,19,E,3\ntest2,18,836,20,SE,3\ntest2,18,837,21,W,2\ntest2,18,838,22,NE,1\ntest2,18,839,23,SW,2\ntest2,18,840,24,N,1\ntest2,18,841,25,NW,1\ntest2,18,842,26,N,2\ntest2,18,843,27,N,3\ntest2,18,844,28,W,2\ntest2,18,845,29,NE,1\ntest2,18,846,30,SW,1\ntest2,18,847,31,SW,2\ntest2,18,848,32,SW,3\ntest2,18,849,33,NW,2\ntest2,18,850,34,W,3\ntest2,18,851,35,E,3\ntest2,18,852,36,NE,3\ntest2,18,853,37,S,1\ntest2,18,854,38,N,1\ntest2,18,855,39,W,1\ntest2,18,856,40,S,3\ntest2,18,857,41,E,1\ntest2,18,858,42,SE,1\ntest2,18,859,43,SE,2\ntest2,18,860,44,NE,2\ntest2,18,861,45,E,2\ntest2,18,862,46,SE,3\ntest2,18,863,47,S,2\ntest2,18,864,48,NW,3"
    p19 = "DesignName,ParticipantID,TrialID,Block1,First,Size\ntest2,19,865,1,N,1\ntest2,19,866,2,W,2\ntest2,19,867,3,E,1\ntest2,19,868,4,NE,3\ntest2,19,869,5,NW,1\ntest2,19,870,6,S,3\ntest2,19,871,7,NW,2\ntest2,19,872,8,SE,1\ntest2,19,873,9,E,2\ntest2,19,874,10,S,2\ntest2,19,875,11,NE,1\ntest2,19,876,12,SW,2\ntest2,19,877,13,S,1\ntest2,19,878,14,NW,3\ntest2,19,879,15,SE,2\ntest2,19,880,16,SE,3\ntest2,19,881,17,N,3\ntest2,19,882,18,E,3\ntest2,19,883,19,W,1\ntest2,19,884,20,SW,1\ntest2,19,885,21,W,3\ntest2,19,886,22,NE,2\ntest2,19,887,23,SW,3\ntest2,19,888,24,N,2\ntest2,19,889,25,NW,2\ntest2,19,890,26,N,3\ntest2,19,891,27,S,1\ntest2,19,892,28,W,3\ntest2,19,893,29,NE,2\ntest2,19,894,30,SW,2\ntest2,19,895,31,SW,3\ntest2,19,896,32,N,1\ntest2,19,897,33,NW,3\ntest2,19,898,34,NE,1\ntest2,19,899,35,W,1\ntest2,19,900,36,NW,1\ntest2,19,901,37,S,2\ntest2,19,902,38,N,2\ntest2,19,903,39,W,2\ntest2,19,904,40,E,1\ntest2,19,905,41,E,2\ntest2,19,906,42,SE,2\ntest2,19,907,43,SE,3\ntest2,19,908,44,NE,3\ntest2,19,909,45,E,3\ntest2,19,910,46,SW,1\ntest2,19,911,47,S,3\ntest2,19,912,48,SE,1"
    p20 = "DesignName,ParticipantID,TrialID,Block1,First,Size\ntest2,20,913,1,N,2\ntest2,20,914,2,W,3\ntest2,20,915,3,E,2\ntest2,20,916,4,NW,1\ntest2,20,917,5,NW,2\ntest2,20,918,6,E,1\ntest2,20,919,7,NW,3\ntest2,20,920,8,SE,2\ntest2,20,921,9,E,3\ntest2,20,922,10,S,3\ntest2,20,923,11,NE,2\ntest2,20,924,12,SW,3\ntest2,20,925,13,S,2\ntest2,20,926,14,SE,1\ntest2,20,927,15,SE,3\ntest2,20,928,16,SW,1\ntest2,20,929,17,S,1\ntest2,20,930,18,W,1\ntest2,20,931,19,W,2\ntest2,20,932,20,SW,2\ntest2,20,933,21,NE,1\ntest2,20,934,22,NE,3\ntest2,20,935,23,N,1\ntest2,20,936,24,N,3\ntest2,20,937,25,NW,3\ntest2,20,938,26,S,1\ntest2,20,939,27,S,2\ntest2,20,940,28,NE,1\ntest2,20,941,29,NE,3\ntest2,20,942,30,SW,3\ntest2,20,943,31,N,1\ntest2,20,944,32,N,2\ntest2,20,945,33,SE,1\ntest2,20,946,34,NE,2\ntest2,20,947,35,W,2\ntest2,20,948,36,NW,2\ntest2,20,949,37,S,3\ntest2,20,950,38,N,3\ntest2,20,951,39,W,3\ntest2,20,952,40,E,2\ntest2,20,953,41,E,3\ntest2,20,954,42,SE,3\ntest2,20,955,43,SW,1\ntest2,20,956,44,NW,1\ntest2,20,957,45,W,1\ntest2,20,958,46,SW,2\ntest2,20,959,47,E,1\ntest2,20,960,48,SE,2"
    
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

var isRecording = false;

var block = 0
var trial
var start
var end

var angles = {
    "N" : 90,
    "S" : 270,
    "E" : 360,
    "W" : 180,
    "NE" : 45,
    "NW" : 135, 
    "SE" : 315, 
    "SW" : 225
}

var emoji = {
    "N" : "⬆️",
    "S" : "⬇️",
    "E" : "➡️",
    "W" : "⬅️",
    "NE" : "↗️",
    "NW" : "↖️", 
    "SE" : "↘️", 
    "SW" : "↙️"
}

//console.log(experiment);

const shortcutElement = document.getElementById("shortcut");

var target = document.createElement("div");
target.id = "target";
target.style.position = "fixed";
var targetSize
target.style.borderRadius = "50%";
target.style.border = "2px solid black";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let coord = { x: 0, y: 0 };
lines = [[]]

document.addEventListener("mousedown", mouseDown);
document.addEventListener("mouseup", mouseUp);
window.addEventListener("resize", resize);

document.body.appendChild(target);
var next = document.getElementById("next");


nextTest();

function nextTest() {
    start = recordTime();
    trial = experiments[block]
    console.log(trial)

    var shortcut = emoji[trial["First"]]// + " " + emoji[trial["Second"]]
    shortcutElement.innerHTML = shortcut;

    target.style.backgroundColor = "";

    target.style.top = 100 + Math.floor(Math.random() * (window.innerHeight - target.clientHeight - 200)) + "px";
    
    target.style.left = 100 + Math.floor(Math.random() * (window.innerHeight - target.clientHeight - 200)) + "px";
    
    targetSize = 40 * parseInt(trial["Size"]);
    target.style.width = targetSize + "px";
    target.style.height = targetSize + "px";

    isRecording = false;
    next.disabled = true;

    block += 1;
    if(block == experiments.length){
        console.log(data)
    }
}


target.onmouseover = function() {
    isRecording = true;
    target.style.backgroundColor = "lightgray";
}

function resize() {
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
}
  
resize();

function getAngle(firstP,lastP){
    dy = firstP[1] - lastP[1]
    dx = firstP[0] - lastP[0]
    var theta = Math.atan2(dy, dx);
    theta *= 180 / Math.PI;
    angle = -theta + 180

    if(angle<20){
        angle += 360
    }
    return angle
}

function mouseDown(event) {
    document.addEventListener("mousemove", draw);
    mouseMove(event);
}

function mouseUp() {
    document.removeEventListener("mousemove", draw);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if(lines[0].length>0){
        // l1firstP = lines[0][0][0]
        // l1lastP = lines[0][lines[0].length-1][1]
        // l2firstP = lines[1][0][0]
        // l2lastP = lines[1][lines[1].length-1][1]
        firstP = lines[0][0][0]
        lastP = lines[0][lines[0].length-1][1]
        console.log(getAngle(firstP,lastP))

        firstDrawn = getAngle(firstP,lastP)
        // firstDrawn = getAngle()%20/20 * 360 + getAngle()
        // secondDrawn = getAngle()%20 * 360 + getAngle()
        
        firstAngle = angles[trial["First"]]
        //secondAngle = angles[trial["Second"]]

        shortcutSuccess = next.disabled && isRecording && Math.abs(firstAngle-firstDrawn) < 20 //&& Math.abs(secondAngle-secondDrawn) < 20 && lines.length==2
        
        if (shortcutSuccess) {
            next.disabled = false;
            end = recordTime()
            time = (end-start)/1000
            out = trial["DesignName"]+","+trial["ParticipantID"]+","+trial["TrialID"]+","+trial["Block1"]+","+trial["First"]+","+trial["Size"]+","+time
            data += out+'\n'
            console.log(out)
        }
    }
    lines = [[]]
}

function mouseMove(event) {
    coord.x = event.clientX - canvas.offsetLeft;
    coord.y = event.clientY - canvas.offsetTop;
}

function draw(event) {
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.lineCap = "round";
    ctx.strokeStyle = "black";

    tmp1 = [coord.x,coord.y];
    ctx.moveTo(coord.x, coord.y);

    mouseMove(event);

    ctx.lineTo(coord.x, coord.y);
    tmp2 = [coord.x,coord.y];

    //E = length of input stroke / menu depth
    // E = 50 / 2

    // W = E * 0.3

    // sensitivity = 0.75

    // if(lines.length>0 && lines[lines.length-1].length>5 && lines[lines.length-1][0].length>0){
    //     current = lines[lines.length-1]
    //     A = current[0][0]
    //     C = tmp2

    //     for(i=0;i<current.length;i++){
    //         B = current[i][1]
    //         if(Math.abs(getAngle(A,B)-getAngle(B,C))>30){
    //             lines.push([])
    //             console.log(getAngle(A,B),getAngle(B,C))
    //             break;
    //         }
    //     }

        // pastSeqP2 = current[current.length-4][1]
        // currentSeqP = current[current.length-3][0]
        // if(Math.abs(getAngle(currentSeqP,tmp2)-getAngle(pastSeqP1,pastSeqP2))>40 && (pastSeqP2[0]-tmp2[0]>5 || pastSeqP2[1]-tmp2[1]>5)){
        //     lines.push([])
        //     console.log(getAngle(currentSeqP,tmp2),getAngle(pastSeqP1,pastSeqP2),pastSeqP2[0]-tmp2[0],pastSeqP2[1]-tmp2[1])
        // }
    // }
    lines[lines.length-1].push([tmp1,tmp2]);

    ctx.stroke();
}
