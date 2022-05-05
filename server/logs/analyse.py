import seaborn as sns
import matplotlib.pyplot as plt
import pandas as pd
import pingouin as pg

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

df = pd.read_csv("all.csv",skiprows=1, names=header, na_values="-1")
# df.fillna('', inplace=True)

finalExecTime = ["totalExecTime1", "totalExecTime2", "totalExecTime3"]
df['finalExecTime'] = df[finalExecTime].sum(axis=1)

# df['allModifiers'] = df.modifiers1 + df.modifiers2 + df.modifiers3
# print(df.allModifiers)

########## ALL ##########

# All_Size_mouseClick
sns.scatterplot(x="Size", y="mouseClick1", data=df, label="mouseClick1", color="r")
sns.scatterplot(x="Size", y="mouseClick2", data=df, label="mouseClick2", color="g")
plt.title("Mouse click time by the size")
plt.ylabel('time (s)')
plt.xlabel('Size')
plt.legend()
plt.savefig('graphs/All_Size_mouseClick.png')
# plt.show()
plt.clf()

########## KEY ##########

#### KeyMultiModi ####

#KeyMultiModi_NbModi_finalExecTime
sns.scatterplot(x="NbModi", y="finalExecTime", data=df[(df.DesignName == 'KeyMultiModi')],)
plt.title("Execution time by the number of modifier in KeyMultiModi")
plt.ylabel('time (s)')
plt.xlabel('Number of modifiers')
plt.savefig('graphs/KeyMultiModi_NbModi_finalExecTime.png')
plt.clf()

#KeyMultiModi_NbModi_nbOfAttempts1
sns.scatterplot(x="NbModi", y="nbOfAttempts1", data=df[(df.DesignName == 'KeyMultiModi')],)
plt.title("Number of attempts by the number of modifiers in KeyMultiModi")
plt.ylabel('Number of attempts')
plt.xlabel('Nubmer of modifiers')
plt.savefig('graphs/KeyMultiModi_NbModi_nbOfAttempts1.png')
plt.clf()

#### KeyMultiRepeat ####

#KeyMultiRepeat_modifiers123_totalExecTime123
sns.scatterplot(x="modifiers1", y="totalExecTime1", data=df[(df.DesignName == 'KeyMultiRepeat')], label="first modifier", color="r")
sns.scatterplot(x="modifiers2", y="totalExecTime2", data=df[(df.DesignName == 'KeyMultiRepeat')], label="second modifier", color="g")
sns.scatterplot(x="modifiers3", y="totalExecTime3", data=df[(df.DesignName == 'KeyMultiRepeat')], label="third modifier", color="b")
plt.title("Execution time by the modifiers in KeyMultiRepeat")
plt.ylabel('time (s)')
plt.xlabel('Modifier')
plt.legend()
plt.savefig('graphs/KeyMultiRepeat_modifiers123_totalExecTime123.png')
# plt.show()
plt.clf()



########## GESTURE ##########


#### GestureMultiAngle ####

#GestureMultiAngle_Size_finalExecTime for Gestures
sns.scatterplot(x="Size", y="finalExecTime", data=df[(df.DesignName == 'GestureMultiAngle') & (df.NbAngle == 1)], color="red", label="1 angle")
sns.scatterplot(x="Size", y="finalExecTime", data=df[(df.DesignName == 'GestureMultiAngle') & (df.NbAngle == 2)],color="blue", label="2 angles")
plt.title("Execution time by the size in GestureMultiAngle")
plt.legend()
plt.ylabel('time (s)')
plt.xlabel('Size')
plt.savefig('graphs/GestureMultiAngle_Size_finalExecTime.png')
# plt.show()
plt.clf()


#### GestureMultiRepeat ####

#GestureMultiRepeat_Size_finalExecTime for Gestures
sns.scatterplot(x="Size", y="finalExecTime", data=df[(df.DesignName == 'GestureMultiRepeat') & (df.Repeat == 1)], color="red", label="1 repeat")
sns.scatterplot(x="Size", y="finalExecTime", data=df[(df.DesignName == 'GestureMultiRepeat') & (df.Repeat == 2)],color="blue", label="2 repeats")
plt.title("Execution time by the size in GestureMultiRepeat")
plt.legend()
plt.ylabel('time (s)')
plt.xlabel('Size')
plt.savefig('graphs/GestureMultiRepeat_Size_finalExecTime.png')
# plt.show()
plt.clf()



