import seaborn as sns
import matplotlib.pyplot as plt
import pandas as pd
import pingouin as pg

# Load csv
#df = pd.read_csv("logs/p1.csv", sep=",", index_col=2, engine="python")
tiles=["DesignName","ParticipantID","TrialID","Block1","Letter","Modifier","Size","Time"]

df = pd.read_csv("logs/p1.csv", usecols=tiles)

# Display the data with seaborn
sns.catplot(x="Modifier", y="Time", kind="box", data=df)
plt.show()

sns.catplot(x="Letter", y="Time", kind="box", data=df)
plt.show()

sns.catplot(x="Size", y="Time", kind="box", data=df)
plt.show()

plt.plot(df.TrialID,df.Time)
plt.show()



