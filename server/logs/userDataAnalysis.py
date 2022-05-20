from email import header
import os
from textwrap import indent
import numpy as np
import pandas as pd
import seaborn as sns
import pingouin as pg
import matplotlib.pyplot as plt
import json

ylim = 8
path = os.path.dirname(os.path.abspath(__file__))
sns.set(rc={'figure.figsize': (12, 9)})

#### Usefull functions ####

def get_categories(df):
    ndf = df.to_numpy()
    cats = {
        "age": {
            "10-19": [],
            "20-29": [],
            "30-39": [],
            "40-49": [],
            "50-59": [],
            "60-69": [],
            "70-79": [],
            "80+": []
        },
        "gender": {
            "man": [],
            "woman": [],
            "non_binary": [],
        },
        "frequency": {
            "-1": [],
            "1-3": [],
            "3-6": [],
            "6+": []
        },
        "keyboard": {
            "QWERTY": [],
            "AZERTY": [],
        },
        "mouse": {
            "touchpad": [],
            "classic_mouse": []
        }
    }
    for entry in ndf:
        entry_id = str(entry[1])
        parsed_age = f'{str(entry[5])[0]}0-{str(entry[5])[0]}9'
        cats["age"][parsed_age].append(entry_id)
        cats["gender"][entry[6]].append(entry_id)
        cats["frequency"][entry[7]].append(entry_id)
        cats["keyboard"][entry[2]].append(entry_id)
        cats["mouse"][entry[3]].append(entry_id)
    return cats

def plot_distribution(ax, cat, title, rot=0):
    ax.bar(range(len(cat)), [len(cat[subcat]) for subcat in cat.keys()])
    ax.set_xticks(range(len(cat)), list(cat.keys()), rotation=rot, fontsize=18)
    ax.tick_params(axis='y', labelsize=18)
    ax.set_title(title, fontsize=20)

def remove_empty(cats):
    empty_cats = {
        "age": [cat for cat in cats["age"].keys() if len(cats["age"][cat]) == 0],
        "gender": [cat for cat in cats["gender"].keys() if len(cats["gender"][cat]) == 0],
        "frequency": [cat for cat in cats["frequency"].keys() if len(cats["frequency"][cat]) == 0],
        "keyboard": [cat for cat in cats["keyboard"].keys() if len(cats["keyboard"][cat]) == 0],
        "mouse": [cat for cat in cats["mouse"].keys() if len(cats["mouse"][cat]) == 0]
    }
    for cat in empty_cats.keys():
        for to_remove in empty_cats[cat]:
            del cats[cat][to_remove]
    return cats


#### Ressources loading ####

def load_userdata():
    """
    Load data from a csv file.
    """
    headers = ["DesignName", "ParticipantID", "keyboardLayout", "browser", "mouseType", "user_age", "user_gender", "frequency", "comment"]
    return pd.read_csv(path + "/userdata.csv", skiprows=1, names=headers, na_values="null")

def load():
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

    finalExecTime = ["totalExecTime1", "totalExecTime2", "totalExecTime3"]
    df['finalExecTime'] = df[finalExecTime].sum(axis=1)

    df['SizeName'] = df.Size.replace({1:"Tiny", 2:"Small", 3:"Medium", 4:"Large"})
    df['NbModiNames'] = df.NbModi.replace({0:"0 Modifier" ,1:"1 Modifier", 2:"2 Modifiers", 3:"3 Modifiers"})
    df['Name'] = df.DesignName.replace({'KeyMultiModi':'Key', 'KeyMultiRepeat':'Key', 'GestureMultiAngle':'Gesture', 'GestureMultiRepeat':'Gesture'})
    df.ParticipantID = df.ParticipantID.astype(str)
    df["experimentID"] = df.DesignName.replace({'KeyMultiModi':'KM', 'KeyMultiRepeat':'KR', 'GestureMultiAngle':'GA', 'GestureMultiRepeat':'GR'}) + df.ParticipantID
    
    return df


#### Data analysis ####

def all(df, cats):
    ########## ALL ##########
    df = df.sort_values('Size')
    
    # All_User_Performance
    cats = remove_empty(cats)
    for cat_name in cats.keys():
        cat_keys = list(cats[cat_name].keys())
        fig, axs = plt.subplots(len(cat_keys), 1, figsize=(8, 3*len(cat_keys)))

        for i in range(len(cat_keys)):
            sns.barplot(
                x='experimentID',
                y="finalExecTime", 
                data=df[df['ParticipantID'].isin(cats[cat_name][cat_keys[i]])],
                ax=axs[i],
            )
            axs[i].set_ylim(0, 8)
            axs[i].set_title(cat_keys[i])
            
        fig.tight_layout()
        plt.savefig(path + '/graphs/User_Performance_by_' + cat_name + '.png')
        plt.clf()
        plt.close(fig=fig)

    # All_Size_mouseClick
    for cat_name in cats.keys():
        cat_keys = list(cats[cat_name].keys())
        fig, axs = plt.subplots(len(cat_keys), 1, figsize=(8, 3*len(cat_keys)))

        for i in range(len(cat_keys)):
            sns.lineplot(
                x="SizeName",
                y="mouseClick1", 
                data=df[df['ParticipantID'].isin(cats[cat_name][cat_keys[i]])],
                style="Name",
                hue = "Name",
                markers=True, 
                dashes=False,
                ax=axs[i],
            )
            axs[i].set_title(cat_keys[i])
            axs[i].set_ylabel('time (seconds)')
            axs[i].set_xlabel('Size')
            axs[i].set_ylim(0, ylim)
            axs[i].legend(loc='upper left')
        fig.suptitle("The average time it takes to click on the target for each size of the target")
        fig.tight_layout()
        plt.savefig(path + '/graphs/Size_mouseClick_by_' + cat_name + '.png')
        plt.clf()
        plt.close(fig=fig)
        
    # All_Size_Key_Gesture
    df = df.sort_values('Name')
    sizes = ['Tiny', 'Small', 'Medium', 'Large']
    for cat_name in cats.keys():
        cat_keys = list(cats[cat_name].keys())
        fig, axs = plt.subplots(len(cat_keys)*2, 2, figsize=(10, 5*len(cat_keys)))

        for i in range(len(cat_keys)):
            for j in range(len(sizes)):
                x = int(i*2+int(j/2))
                y = j%2
                data = df[df.SizeName == sizes[j]]
                sns.lineplot(
                    x="Repeat", 
                    y="finalExecTime", 
                    data=data[data['ParticipantID'].isin(cats[cat_name][cat_keys[i]])],
                    style="Name",
                    hue = "Name",
                    markers=True, 
                    dashes=False,
                    ax=axs[x, y],
                )
                axs[x, y].set_title(cat_keys[i] + " and " + sizes[j] + " target")
                axs[x, y].set_ylabel('time (seconds)')
                axs[x, y].set_xlabel('Repeat')
                axs[x, y].set_ylim(0, ylim)
                axs[x, y].set_xticks(range(1,4))
        fig.suptitle('The average total execution time for each repeat for key and gesture categorized by size')
        fig.tight_layout() 
        fig.savefig(path + '/graphs/All_Size_Key_Gesture_by_' + cat_name + '.png')
        fig.clf()
        plt.close(fig=fig)
    
    # All_Block_DesignName
    for cat_name in cats.keys():
        cat_keys = list(cats[cat_name].keys())
        fig, axs = plt.subplots(len(cat_keys), 1, figsize=(8, 3*len(cat_keys)))

        for i in range(len(cat_keys)):
            sns.lineplot(
                x="Block1", 
                y="finalExecTime", 
                data=df[df['ParticipantID'].isin(cats[cat_name][cat_keys[i]])],
                style="DesignName",
                hue = "DesignName",
                markers=True, 
                dashes=False,
                ax=axs[i]
            )
            axs[i].set_ylabel('time (seconds)')
            axs[i].set_xlabel('Block')
            axs[i].set_ylim(0, ylim)
            axs[i].set_title(cat_keys[i])

        fig.suptitle("The average total execution time with evolution of block for each experiment")
        fig.tight_layout()
        plt.savefig(path + '/graphs/All_Block_DesignName_by_' + cat_name + '.png')
        plt.clf()
        plt.close(fig=fig)

if __name__ == "__main__":
    userdata_df = load_userdata()
    df = load()
    cats = get_categories(userdata_df)
    all(df, cats)
    fig, axs = plt.subplots(1, 5, figsize=(25,5))
    plot_distribution(axs[0], cats["age"], "Users age", rot=45)
    plot_distribution(axs[1], cats["gender"], "Users gender")
    plot_distribution(axs[2], cats["frequency"], "Users daily computer usage")
    plot_distribution(axs[3], cats["keyboard"], "Users keyboard type")
    plot_distribution(axs[4], cats["mouse"], "Users mouse type")
    # fig.suptitle("Users data distribution", fontsize=24)
    fig.tight_layout()
    plt.savefig("distribution.png")


