import seaborn as sns
import matplotlib.pyplot as plt
import pandas as pd
import pingouin as pg

# Load csv
#df = pd.read_csv("all.csv", sep=",", index_col=2, engine="python")
tiles = ["DesignName", "ParticipantID", "TrialID", "Block1", "Letter1", "Letter2", 
        "Modifier1", "Modifier2", "First", "Second", "Size", "keyboardLayout", "mouseType", "targetDist", 
        "executionTimeCMD1", "executionTimeAlt1", "executionTimeShift1", "executionTimeKey1", 
        "userAngle1", "drawDist1", "mouseClick1", "totalExecutionTime1", "NbOfAttempts1",
        "executionTimeCMD2", "executionTimeAlt2", "executionTimeShift2", "executionTimeKey2", 
        "userAngle2", "drawDist2", "mouseClick2", "totalExecutionTime2", "NbOfAttempts2"]

df = pd.read_csv("TWODIR9.csv", usecols=tiles)

# KEY
# sns.boxplot(x="Modifier1", y="totalExecutionTime1", order=["None","CMD","Alt","CMD_Shift","CMD_Alt_Shift"], data=df).set_title("Time for each modifier")
# plt.ylabel('time (s)')
# plt.xlabel('Modifier')
# plt.show()

# sns.boxplot(x="Letter1", y="totalExecutionTime2", order=["Left","Middle","Right"], data=df).set_title("Time for each letter")
# plt.xlabel('Position of letter')
# plt.ylabel('time (s)')
# plt.show()

# sns.boxplot(x="Size", y="Time", order=[1,2], data=df).set_title("Time for each size")
# plt.xlabel('Circle size')
# plt.ylabel('time (s)')
# plt.show()

# sns.boxplot(x="Block1", y="Time", data=df).set_title("Time for each trial")
# plt.xlabel('Block number')
# plt.ylabel('time (s)')
# plt.show()

# sns.scatterplot(x="Block1", y="Time", data=df).set_title("Time for each trial")
# plt.xlabel('Block number')
# plt.ylabel('time (s)')
# plt.show()

# GESTURE
# sns.boxplot(x="First", y="totalExecutionTime1", data=df, order=["N","S","E","W","NE","SE","NW","SW"], color="blue").set_title("Time for each gesture")
# sns.boxplot(x="Second", y="totalExecutionTime2", data=df, order=["N","S","E","W","NE","SE","NW","SW"], color="red")
# plt.ylabel('time (s) (First:blue, Second:red)')
# plt.xlabel('Direction')
# plt.show()

# sns.boxplot(x="Size", y="totalExecutionTime1", data=df, color="blue").set_title("Time for each size")
# sns.boxplot(x="Size", y="totalExecutionTime2", data=df, color="red")
# plt.ylabel('time (s)')
# plt.xlabel('Circle size (First:blue, Second:red)')
# plt.show()

sns.scatterplot(x="drawDist1", y="totalExecutionTime2", data=df, color="blue").set_title("drawDist1")
plt.show()



