import os
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt
import pandas as pd

# Load csv
header = [
        #CSV Data
        "DesignName", "ParticipantID", "TrialID", "Block1", "Block2", "Size", "Dir", "NbModi", "NbAngle", "Repeat",
        
        #For Keyboard
        "letter1", "modifiers1",
        "execTimeCMD1", "execTimeAlt1", "execTimeShift1", "execTimeKey1", 

        "letter2", "modifiers2",
        "execTimeCMD2", "execTimeAlt2", "execTimeShift2", "execTimeKey2", 

        "letter3", "modifiers3",
        "execTimeCMD3", "execTimeAlt3", "execTimeShift3", "execTimeKey3", 
    
        #For Gestures
        "angle1", "userAngle1", "drawDist1",
        "angle2", "userAngle2", "drawDist2",

        #For Both
        "mouseClick1", "totalExecTime1", "nbOfAttempts1",
        "mouseClick2", "totalExecTime2", "nbOfAttempts2",
        "mouseClick3", "totalExecTime3", "nbOfAttempts3",
        "targetDist", "keyboardLayout", "mouseType"
    ]

path = os.path.dirname(os.path.abspath(__file__))
df = pd.read_csv(path + "/all.csv",skiprows=1, names=header, na_values="-1")
df = df.sort_values('Size')
df = df.sort_values('NbModi')
# df.fillna('', inplace=True)

finalExecTime = ["totalExecTime1", "totalExecTime2", "totalExecTime3"]
df['finalExecTime'] = df[finalExecTime].sum(axis=1)

df.Size = df.Size.replace({1:"Tiny", 2:"Small", 3:"Medium", 4:"Large"})
df.NbModi = df.NbModi.replace({0:"0 Modifier" ,1:"1 Modifier", 2:"2 Modifiers", 3:"3 Modifiers"})
df.modifiers1 = df.modifiers1.replace({'Option':'Alt/Option', 'CMD':'Ctrl/CMD', 'Alt':'Alt/Option', 'Ctrl':'Ctrl/CMD'})
df.modifiers2 = df.modifiers2.replace({'Option':'Alt/Option', 'CMD':'Ctrl/CMD', 'Alt':'Alt/Option', 'Ctrl':'Ctrl/CMD'})
df.modifiers3 = df.modifiers3.replace({'Option':'Alt/Option', 'CMD':'Ctrl/CMD', 'Alt':'Alt/Option', 'Ctrl':'Ctrl/CMD'})

def remove_outliers(df, col):
    return df[np.abs(df[col] - df[col].mean()) <= (3*df[col].std())]

########## ALL ##########

# All_Size_mouseClick
data1 = remove_outliers(df, 'mouseClick1')
data2 = remove_outliers(df, 'mouseClick2')

sns.lineplot(
    x="Size", 
    y="mouseClick1", 
    data=data1,
    label="mouseClick1", 
    color="r",
    )
sns.lineplot(
    x="Size", 
    y="mouseClick2", 
    data=data2,
    label="mouseClick2", 
    color="g",
    )
plt.title("Mouse click time by the size")
plt.ylabel('time (s)')
plt.xlabel('Size')
plt.ylim(0, 8)
plt.legend()
plt.savefig(path + '/graphs/All_Size_mouseClick.png')
# plt.show()
plt.clf()

########## KEY ##########

#### KeyMultiModi ####
data = df[(df.DesignName == 'KeyMultiModi')]
data1 = remove_outliers(data, 'finalExecTime')
data2 = remove_outliers(data, 'nbOfAttempts1')

#KeyMultiModi_NbModi_finalExecTime
sns.lineplot(
    x="NbModi", 
    y="finalExecTime", 
    data=data1
    )
plt.title("Execution time by the number of modifier in KeyMultiModi")
plt.ylabel('time (s)')
plt.xlabel('Number of modifiers')
plt.ylim(0, 8)
plt.savefig(path + '/graphs/KeyMultiModi_NbModi_finalExecTime.png')
plt.clf()

#KeyMultiModi_NbModi_nbOfAttempts1
sns.lineplot(
    x="NbModi", 
    y="nbOfAttempts1", 
    data=data2
    )
plt.title("Number of attempts by the number of modifiers in KeyMultiModi")
plt.ylabel('Number of attempts')
plt.xlabel('Nubmer of modifiers')
plt.ylim(0, 8)
plt.savefig(path + '/graphs/KeyMultiModi_NbModi_nbOfAttempts1.png')
plt.clf()

#### KeyMultiRepeat ####
data = df[(df.DesignName == 'KeyMultiRepeat')]

data1 = remove_outliers(data, 'totalExecTime1')
data2 = remove_outliers(data, 'totalExecTime2')
data3 = remove_outliers(data, 'totalExecTime3')

#KeyMultiRepeat_modifiers123_totalExecTime123
sns.lineplot(
    x="modifiers1", 
    y="totalExecTime1", 
    data=data1, 
    label="first modifier", 
    color="r"
    )
sns.lineplot(
    x="modifiers2", 
    y="totalExecTime2", 
    data=data2, 
    label="second modifier", 
    color="g"
    )
sns.lineplot(
    x="modifiers3", 
    y="totalExecTime3", 
    data=data3, 
    label="third modifier", 
    color="b"
    )
plt.title("Execution time by the modifiers in KeyMultiRepeat")
plt.ylabel('time (s)')
plt.xlabel('Modifier')
plt.ylim(0, 8)
plt.legend()
plt.savefig(path + '/graphs/KeyMultiRepeat_modifiers123_totalExecTime123.png')
# plt.show()
plt.clf()



########## GESTURE ##########


#### GestureMultiAngle ####

data1 = df[(df.DesignName == 'GestureMultiAngle') & (df.NbAngle == 1)]
data2 = df[(df.DesignName == 'GestureMultiAngle') & (df.NbAngle == 2)]

data1 = remove_outliers(data1, 'finalExecTime')
data2 = remove_outliers(data2, 'finalExecTime')

#GestureMultiAngle_Size_finalExecTime for Gestures

sns.lineplot(
    x="Size", 
    y="finalExecTime", 
    data=data1, 
    color="red", 
    label="1 angle",
    )
sns.lineplot(
    x="Size", 
    y="finalExecTime", 
    data=data2, 
    color="blue", 
    label="2 angles",
    )
plt.title("Execution time by the size in GestureMultiAngle")
plt.legend()
plt.ylabel('time (s)')
plt.xlabel('Size')
plt.ylim(0, 8)
plt.savefig(path + '/graphs/GestureMultiAngle_Size_finalExecTime.png')
# plt.show()
plt.clf()


#### GestureMultiRepeat ####

data1 = df[(df.DesignName == 'GestureMultiRepeat') & (df.Repeat == 1)]
data2 = df[(df.DesignName == 'GestureMultiRepeat') & (df.Repeat == 2)]

data1 = remove_outliers(data1, 'finalExecTime')
data2 = remove_outliers(data2, 'finalExecTime')

#GestureMultiRepeat_Size_finalExecTime for Gestures
sns.lineplot(
    x="Size", 
    y="finalExecTime", 
    data=df[(df.DesignName == 'GestureMultiRepeat') & (df.Repeat == 1)], 
    color="red", 
    label="1 repeat"
)
sns.lineplot(
    x="Size", 
    y="finalExecTime", 
    data=df[(df.DesignName == 'GestureMultiRepeat') & (df.Repeat == 2)], 
    color="blue", 
    label="2 repeats"
)
plt.title("Execution time by the size in GestureMultiRepeat")
plt.legend()
plt.ylabel('time (s)')
plt.xlabel('Size')
plt.ylim(0, 8)
plt.savefig(path + '/graphs/GestureMultiRepeat_Size_finalExecTime.png')
# plt.show()
plt.clf()
