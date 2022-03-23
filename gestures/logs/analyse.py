import seaborn as sns
import matplotlib.pyplot as plt
import pandas as pd
import pingouin as pg

# Load csv
#df = pd.read_csv("all.csv", sep=",", index_col=2, engine="python")
tiles=["DesignName","ParticipantID","TrialID","Block1","First","Size","Time"]

df = pd.read_csv("all.csv", usecols=tiles)

# Display the data with seaborn
sns.boxplot(x="First", y="Time", data=df, order=["N","S","E","W","NE","SE","NW","SW"]).set_title("Time for each gesture")
plt.ylabel('time (s)')
plt.xlabel('Direction')
plt.show()

sns.boxplot(x="Size", y="Time", data=df).set_title("Time for each size")
plt.ylabel('time (s)')
plt.xlabel('Circle size')
plt.show()

sns.boxplot(x="Block1", y="Time", data=df).set_title("Time for each trial")
plt.ylabel('time (s)')
plt.xlabel('Block number')
plt.show()



