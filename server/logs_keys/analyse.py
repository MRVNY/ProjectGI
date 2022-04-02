import seaborn as sns
import matplotlib.pyplot as plt
import pandas as pd
import pingouin as pg

# Load csv
#df = pd.read_csv("all.csv", sep=",", index_col=2, engine="python")
tiles=["DesignName","ParticipantID","TrialID","Block1","Letter1","Modifier1","Size","Time"]

df = pd.read_csv("all.csv", usecols=tiles)

# Display the data with seaborn
sns.boxplot(x="Modifier1", y="Time", order=["None","CMD","Alt","CMD_Shift","CMD_Alt_Shift"], data=df).set_title("Time for each modifier")
plt.ylabel('time (s)')
plt.xlabel('Modifier')
plt.show()

sns.boxplot(x="Letter1", y="Time", order=["Left","Middle","Right"], data=df).set_title("Time for each letter")
plt.xlabel('Position of letter')
plt.ylabel('time (s)')
plt.show()

sns.boxplot(x="Size", y="Time", order=[1,2], data=df).set_title("Time for each size")
plt.xlabel('Circle size')
plt.ylabel('time (s)')
plt.show()

sns.boxplot(x="Block1", y="Time", data=df).set_title("Time for each trial")
plt.xlabel('Block number')
plt.ylabel('time (s)')
plt.show()

sns.scatterplot(x="Block1", y="Time", data=df).set_title("Time for each trial")
plt.xlabel('Block number')
plt.ylabel('time (s)')
plt.show()



