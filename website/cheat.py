import numpy as np

results = np.array([2.463,1.345,2.119,1.503,2.057,1.51,1.291,2.335,1.565,2.031,2.497,2.242,1.933,2.127,1.517,1.333,2.299,1.766,1.456,1.885,2.415,2.572,1.479,2.421,1.663,1.537,1.213,1.588,1.551,2.122,1.719,1.41,1.254,2.069,1.031,1.958,1.665,1.566,1.838,1.764,1.655,2.057,2.654,2.067,1.709,1.546,3.01,1.523,1.513,1.949,2.918,1.611,1.435,1.345,1.534,2.252,1.746,1.626,1.211,1.409,1.784,1.517,1.257,2.19,1.707,2.063,1.532,1.13,1.434,1.111,1.285,1.748,1.364,1.515,1.214,1.39,2.213,1.404,1.706,1.232,4.967,1.453,1.534,1.873,1.416,1.318,3.19,3.089,1.141,1.828,2.397,4.932,1.573,1.458,1.704,1.263,1.498,1.302,1.345,2.874])
header = ["DesignName","ParticipantID","TrialID","Block1","Letter","Modifier","Size"]

csv1 = np.array(["test1",1,1,1,"M","CMD_Shift",1,"test1",1,2,2,"M","CMD",2,"test1",1,3,3,"X","CMD_Shift",2,"test1",1,4,4,"O"," ",1,"test1",1,5,5,"X","CMD_Alt_Shift",1,"test1",1,6,6,"O","Alt",1,"test1",1,7,7,"X","Alt",2,"test1",1,8,8,"X","CMD_Shift",1,"test1",1,9,9,"X"," ",2,"test1",1,10,10,"M","CMD_Alt_Shift",1,"test1",1,11,11,"M","Alt",2,"test1",1,12,12,"M","CMD_Alt_Shift",2,"test1",1,13,13,"M","Alt",1,"test1",1,14,14,"O","CMD",2,"test1",1,15,15,"F"," ",2,"test1",1,16,16,"F","CMD",1,"test1",1,17,17,"F","CMD_Alt_Shift",1,"test1",1,18,18,"E","Alt",1,"test1",1,19,19,"X","CMD_Alt_Shift",2,"test1",1,20,20,"F","CMD",2,"test1",1,21,21,"E","CMD_Shift",2,"test1",1,22,22,"E","CMD_Alt_Shift",2,"test1",1,23,23,"F","Alt",2,"test1",1,24,24,"F","CMD_Shift",2,"test1",1,25,25,"O","CMD_Shift",1,"test1",1,26,26,"M"," ",2,"test1",1,27,27,"E"," ",2,"test1",1,28,28,"X","CMD",1,"test1",1,29,29,"O","CMD",1,"test1",1,30,30,"O","Alt",2,"test1",1,31,31,"O","CMD_Alt_Shift",1,"test1",1,32,32,"M"," ",1,"test1",1,33,33,"F"," ",1,"test1",1,34,34,"M","CMD",1,"test1",1,35,35,"O"," ",2,"test1",1,36,36,"X","CMD",2,"test1",1,37,37,"O","CMD_Shift",2,"test1",1,38,38,"M","CMD_Shift",2,"test1",1,39,39,"X","Alt",1,"test1",1,40,40,"E","Alt",2,"test1",1,41,41,"E","CMD",2,"test1",1,42,42,"X"," ",1,"test1",1,43,43,"O","CMD_Alt_Shift",2,"test1",1,44,44,"E","CMD_Shift",1,"test1",1,45,45,"F","CMD_Alt_Shift",2,"test1",1,46,46,"E","CMD_Alt_Shift",1,"test1",1,47,47,"F","CMD_Shift",1,"test1",1,48,48,"E","CMD",1,"test1",1,49,49,"E"," ",1,"test1",1,50,50,"F","Alt",1,"test1",1,51,51,"F","CMD_Shift",1,"test1",1,52,52,"E","CMD_Shift",1,"test1",1,53,53,"M","CMD_Shift",2,"test1",1,54,54,"E","CMD_Shift",2,"test1",1,55,55,"X","Alt",1,"test1",1,56,56,"O","CMD_Shift",1,"test1",1,57,57,"X","CMD",2,"test1",1,58,58,"O","CMD_Shift",2,"test1",1,59,59,"M"," ",1,"test1",1,60,60,"E"," ",1,"test1",1,61,61,"E","CMD_Alt_Shift",1,"test1",1,62,62,"F","Alt",1,"test1",1,63,63,"F","CMD_Alt_Shift",2,"test1",1,64,64,"F","CMD_Shift",2,"test1",1,65,65,"M","CMD",2,"test1",1,66,66,"X","CMD_Shift",2,"test1",1,67,67,"X"," ",2,"test1",1,68,68,"F"," ",2,"test1",1,69,69,"E","Alt",2,"test1",1,70,70,"O"," ",1,"test1",1,71,71,"E","Alt",1,"test1",1,72,72,"F","CMD",2,"test1",1,73,73,"O","Alt",1,"test1",1,74,74,"X","CMD_Shift",1,"test1",1,75,75,"E"," ",2,"test1",1,76,76,"X"," ",1,"test1",1,77,77,"M","CMD_Alt_Shift",2,"test1",1,78,78,"F"," ",1,"test1",1,79,79,"F","Alt",2,"test1",1,80,80,"M"," ",2,"test1",1,81,81,"O","CMD",1,"test1",1,82,82,"E","CMD",2,"test1",1,83,83,"M","CMD_Shift",1,"test1",1,84,84,"O","CMD_Alt_Shift",2,"test1",1,85,85,"E","CMD_Alt_Shift",2,"test1",1,86,86,"M","CMD",1,"test1",1,87,87,"X","CMD",1,"test1",1,88,88,"E","CMD",1,"test1",1,89,89,"O"," ",2,"test1",1,90,90,"F","CMD",1,"test1",1,91,91,"O","CMD",2,"test1",1,92,92,"O","CMD_Alt_Shift",1,"test1",1,93,93,"O","Alt",2,"test1",1,94,94,"F","CMD_Alt_Shift",1,"test1",1,95,95,"M","CMD_Alt_Shift",1,"test1",1,96,96,"X","CMD_Alt_Shift",2,"test1",1,97,97,"X","Alt",2,"test1",1,98,98,"M","Alt",1,"test1",1,99,99,"M","Alt",2,"test1",1,100,100,"X","CMD_Alt_Shift",1])
csv1 = csv1.reshape((100,7))

res2 = np.array([5.422,6.511,3.784,4.253,12.548,4.209,4.459,4.477,6.446,6.48,6.144,3.639,3.069,3.894,7.361,5.102,4.154,7.57,4.105,4.357,6.024,6.083,6.187,6.289,6.395,4.481,4.732,4.765,4.052,4.301,4.332,4.365,4.399,4.995,5.028,5.06,5.093,5.128,5.163,4.139,4.199,4.303,   4.434,4.493,3.577,3.827,2.809,3.812,4.065,4.097,4.129,   3.909,3.537,3.851,2.952,3.466,3.501,3.535,3.568,3.601,3.637,3.67,3.705,3.738,3.772,3.806,3.839,3.874,3.91,3.942,7.014,3.544,3.953,6.204,3.813,3.611,4.954,3.196,3.878,2.938,3.714,3.087,3.474,3.508,3.542,3.578,3.609,3.643,3.676,3.71,3.744,3.776,2.966,4.225,3.713,3.212,4.055,3.1,2.921,6.043])

csv1 = np.vstack([csv1.T,results]).T
csv2 = np.vstack([csv1.T,res2]).T
print(csv2)

mod = csv1.T[5]
print(mod)