import os
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt
import pandas as pd
import pingouin as pg
from scipy.stats import f_oneway
from statsmodels.stats.anova import AnovaRM



#ylim = np.floor(df.finalExecTime.max())+1
ylim = 5
path = os.path.dirname(os.path.abspath(__file__))
sns.set(rc={"figure.figsize":(8, 6)})
    
# Load csv
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
            "targetDist"
        ]

    path = os.path.dirname(os.path.abspath(__file__))
    df = pd.read_csv(path + "/all.csv",skiprows=1, names=header, na_values="-1")
    # df.fillna('', inplace=True)

    finalExecTime = ["totalExecTime1", "totalExecTime2", "totalExecTime3"]
    df['finalExecTime'] = df[finalExecTime].sum(axis=1)

    df['SizeName'] = df.Size.replace({1:"Tiny", 2:"Small", 3:"Medium", 4:"Large"})
    df['NbModiNames'] = df.NbModi.replace({0:"0 Modifier" ,1:"1 Modifier", 2:"2 Modifiers", 3:"3 Modifiers"})
    df['Name'] = df.DesignName.replace({'KeyMultiModi':'Key', 'KeyMultiRepeat':'Key', 'GestureMultiAngle':'Gesture', 'GestureMultiRepeat':'Gesture'})
    df.ParticipantID = df.ParticipantID.astype(str)
    df["experimentID"] = df.DesignName.replace({'KeyMultiModi':'KM', 'KeyMultiRepeat':'KR', 'GestureMultiAngle':'GA', 'GestureMultiRepeat':'GR'}) + df.ParticipantID
    df["DesignID"] = df.DesignName.replace({'KeyMultiModi':0, 'KeyMultiRepeat':1, 'GestureMultiAngle':2, 'GestureMultiRepeat':3})
    # df.modifiers1 = df.modifiers1.replace({'Option':'Alt/Option', 'CMD':'Ctrl/CMD', 'Alt':'Alt/Option', 'Ctrl':'Ctrl/CMD'})
    # df.modifiers2 = df.modifiers2.replace({'Option':'Alt/Option', 'CMD':'Ctrl/CMD', 'Alt':'Alt/Option', 'Ctrl':'Ctrl/CMD'})
    # df.modifiers3 = df.modifiers3.replace({'Option':'Alt/Option', 'CMD':'Ctrl/CMD', 'Alt':'Alt/Option', 'Ctrl':'Ctrl/CMD'})
        
    # Outliers
    #df = df[df.Block1 > 1]
    df = df[(df.nbOfAttempts1==1) | ((df.nbOfAttempts1==1) & (df.nbOfAttempts2==1) & (df.Repeat==2)) | ((df.nbOfAttempts1==1) & (df.nbOfAttempts2==1) & (df.nbOfAttempts3==1) & (df.Repeat==3))]
    
    for i in range(1,5):
        for j in range(1,4):
                
            tmp = df[(df.Size==i) & (df.Repeat==j)][np.abs(df['finalExecTime'] - df['finalExecTime'].mean()) <= (3*df['finalExecTime'].std())]
            
            if(i==1 and j==1):
                out = tmp
            else: 
                out = pd.concat([out, tmp],ignore_index=True)
        
    df = out
    
    return df

def outliers(df):
    #All_User_Performance
    sns.barplot(
        x='experimentID',
        y="finalExecTime", 
        data=df,
        )
    plt.title("The average time it takes to execute a trial for each participant")
    plt.ylabel('time (seconds)')
    plt.xlabel('Participant')
    plt.ylim(0, 8)
    plt.savefig(path + '/graphs/All_User_Performance.png')
    plt.show()
    plt.clf()

def all(df):
    ########## ALL ##########
    df = df.sort_values('Size')
    
    #outliers(df)
    
    # All_Size_mouseClick
    nbLines = df.DesignName.unique().shape[0]
    palette = sns.color_palette("mako_r", nbLines)

    sns.lineplot(
        x="SizeName",
        y="mouseClick1", 
        data=df,
        style="DesignName",
        hue = "DesignName",
        markers=True, 
        dashes=False,
        palette=palette,
        )
    plt.title("The average time it takes to click on the target for each size of the target")
    plt.ylabel('time (seconds)')
    plt.xlabel('Size')
    plt.ylim(0, ylim)
    plt.legend()
    plt.savefig(path + '/graphs/All_Size_mouseClick.png')
    plt.clf()
    
    
    # All_Size
    df = df.sort_values('Size')

    nbLines = df.DesignName.unique().shape[0]
    palette = sns.color_palette("mako_r", nbLines)

    sns.lineplot(
        x="SizeName", 
        y="finalExecTime", 
        data=df,
        style="DesignName",
        hue = "DesignName",
        markers=True, 
        dashes=False,
        palette=palette,
        )

    plt.title("The average execution time for each experiment by size")
    plt.ylabel('time (seconds)')
    plt.xlabel('Repeat')
    plt.ylim(0, ylim)
    plt.savefig(path + '/graphs/All_Size.png')
    plt.clf()

  
    
    #All_Block_DesignName
    data1 = df
    nbLines = data1.DesignName.unique().shape[0]
    palette = sns.color_palette("mako_r", nbLines)

    sns.lineplot(
        x="Block1", 
        y="finalExecTime", 
        data=data1,
        style="DesignName",
        hue = "DesignName",
        markers=True, 
        dashes=False,
        palette=palette,
        )

    plt.title("The average total execution time with evolution of block for each experiment")
    plt.ylabel('time (seconds)')
    plt.xlabel('Block')
    plt.ylim(0, ylim)
    plt.savefig(path + '/graphs/All_Block_DesignName.png')
    plt.clf()


#### KeyMultiRepeat ####
def key_repeat(df):
    df = df.sort_values('Size')
    data = df[(df.DesignName == 'KeyMultiRepeat')]
    
    #KeyMultiRepeat_Size_finalExecTime for Gestures

    nbLines = data.SizeName.unique().shape[0]
    palette = sns.color_palette("mako_r", nbLines)
    sns.lineplot(
        x="Repeat", 
        y="finalExecTime", 
        data=data, 
        style="SizeName",
        hue = "SizeName",
        markers=True, 
        dashes=False,
        palette=palette,
        err_style=None,
    )

    plt.title("The average execution time for each size of the target in KeyMultiRepeat")
    plt.ylabel('time (seconds)')
    plt.xlabel('Repeat')
    plt.ylim(0, ylim)
    plt.xticks(range(1,4))
    plt.savefig(path + '/graphs/KeyMultiRepeat_Size_finalExecTime.png')
    plt.clf()



#### GestureMultiRepeat ####
def gesture_repeat(df):
    df = df.sort_values('Size')
    data = df[(df.DesignName == 'GestureMultiRepeat')]

    #GestureMultiRepeat_Size_finalExecTime for Gestures

    nbLines = data.SizeName.unique().shape[0]
    palette = sns.color_palette("mako_r", nbLines)
    sns.lineplot(
        x="Repeat", 
        y="finalExecTime", 
        data=data, 
        style="SizeName",
        hue = "SizeName",
        markers=True, 
        dashes=False,
        palette=palette,
        err_style=None,
    )

    plt.title("The average execution time for each size of the target in GestureMultiRepeat")
    plt.ylabel('time (seconds)')
    plt.xlabel('Repeat')
    plt.ylim(0, ylim)
    plt.xticks(range(1,4))
    plt.savefig(path + '/graphs/GestureMultiRepeat_Size_finalExecTime.png')
    plt.clf()


#### KeyMultiModi ####
def key_modi(df):
    pass


#### GestureMultiAngle ####
def gesture_angle(df):
    pass


########## KEY ##########
def key(df):

    key_repeat(df)
    #key_modi(df)


########## GESTURE ##########
def gesture(df):
    df = df.sort_values('Size')

    gesture_repeat(df)
    gesture_angle(df)

def four_size(df):
    # All_Repeat_By_Size
    
    sns.set(rc={"figure.figsize":(12, 9)})
    df = df.sort_values('DesignName')
    data1 = df[df.SizeName == 'Tiny']
    data2 = df[df.SizeName == 'Small']
    data3 = df[df.SizeName == 'Medium']
    data4 = df[df.SizeName == 'Large']
    
    nbLines = data1.DesignName.unique().shape[0]
    palette = sns.color_palette("mako_r", nbLines)
    fig, axes = plt.subplots(2, 2)
    fig.suptitle('The average total execution time for each repeat for key and gesture categorized by size')

    ax1 = sns.lineplot(
        x="Repeat", 
        y="finalExecTime", 
        data=data1,
        style="DesignName",
        hue = "DesignName",
        markers=True, 
        dashes=False,
        palette=palette,
        ax=axes[0,0]
        )
    ax1.set_title("Tiny", x=0.09, y=0.85, fontsize=20)
    ax1.set_ylabel('time (seconds)')
    ax1.set_xlabel('Repeat')
    ax1.set_ylim(0, ylim)
    ax1.set_xticks(range(1,4))

    
    ax2 = sns.lineplot(
        x="Repeat", 
        y="finalExecTime", 
        data=data2,
        style="DesignName",
        hue = "DesignName",
        markers=True, 
        dashes=False,
        palette=palette,
        ax=axes[0,1]
        )
    ax2.set_title("Small", x=0.1, y=0.85, fontsize=20)
    ax2.set_ylabel('time (seconds)')
    ax2.set_xlabel('Repeat')
    ax2.set_ylim(0, ylim)
    ax2.set_xticks(range(1,4))

    ax3 = sns.lineplot(
        x="Repeat", 
        y="finalExecTime", 
        data=data3,
        style="DesignName",
        hue = "DesignName",
        markers=True, 
        dashes=False,
        palette=palette,
        ax=axes[1,0]
        )
    ax3.set_title("Medium", x=0.13, y=0.85, fontsize=20)
    ax3.set_ylabel('time (seconds)')
    ax3.set_xlabel('Repeat')
    ax3.set_ylim(0, ylim)
    ax3.set_xticks(range(1,4))

    ax4 = sns.lineplot(
        x="Repeat", 
        y="finalExecTime", 
        data=data4,
        style="DesignName",
        hue = "DesignName",
        markers=True, 
        dashes=False,
        palette=palette,
        ax=axes[1,1]
        )
    ax4.set_title("Large", x=0.1, y=0.85, fontsize=20)
    ax4.set_ylabel('time (seconds)')
    ax4.set_xlabel('Repeat')
    ax4.set_ylim(0, ylim)
    ax4.set_xticks(range(1,4))
    
    fig.savefig(path + '/graphs/All_Repeat_By_Size.png')
    fig.clf()


# ANOVA test
def corr(df):
    
    #print(df.corr()["DesignID"].sort_values(ascending=False))
    
    KeyMultiModi = df[(df.DesignName == 'KeyMultiModi')]
    KeyMultiRepeat = df[(df.DesignName == 'KeyMultiRepeat')]
    GestureMultiAngle = df[(df.DesignName == 'GestureMultiAngle')]
    GestureMultiRepeat = df[(df.DesignName == 'GestureMultiRepeat')]
    
    res = pg.rm_anova(data=df, dv="DesignID", within=["Repeat", "Size"], subject="ParticipantID")
    res1 = pg.rm_anova(data=KeyMultiRepeat, dv="finalExecTime", within=["Repeat", "Size"], subject="ParticipantID")
    res2 = pg.rm_anova(data=GestureMultiRepeat, dv="finalExecTime", within=["Repeat", "Size"], subject="ParticipantID")
    
    print(res)
    print(res1)
    print(res2)
    
    # # Posthoc test (if necessary)
    # posthocs = pg.pairwise_ttests(dv='finalExecTime', within=['Repeat', 'Size'], subject='ParticipantID', data=KeyMultiRepeat)
    # pg.print_table(posthocs)
    
def user(df):
    headers = ["DesignName", "ParticipantID", "keyboardLayout", "mouseType", "browser", "user_age", "user_gender", "frequency", "comment"]
    user_df = pd.read_csv(path + "/userdata.csv", skiprows=1, names=headers, na_values="-1")

    df.ParticipantID = df.ParticipantID.astype(int)
    df = pd.merge(df[["DesignName", "ParticipantID","experimentID","finalExecTime"]],user_df, on=['DesignName','ParticipantID'],how='left')
    #df[["DesignName", "ParticipantID","experimentID","finalExecTime"]]
    
    #print(df.corr()["finalExecTime"].sort_values(ascending=False))
    
    # data1 = df[df.keyboardLayout.notnull() & (df.mouseType.notnull())]
    # data1['keyboardLayout'] = data1.keyboardLayout.replace({'QWERTY':0 , 'AZERTY':1})
    # data1['mouseType'] = data1.mouseType.replace({'touchpad':0 , 'classic_mouse':1})
    # res = pg.rm_anova(data=data1, dv="finalExecTime", within=["keyboardLayout","mouseType"], subject="DesignName")
    # print(res)
    # res2 = AnovaRM(data=data1, depvar='finalExecTime',subject='DesignName', within=['keyboardLayout']).fit()
    # print(res2)
    

    data2 = df[(df.user_age.notnull()) & (df.user_gender.notnull()) & (df.finalExecTime.notnull())]
    #print(AnovaRM(data=data2, depvar='finalExecTime',subject='DesignName', within=['user_gender']).fit())
    #data2.user_gender = data2.user_gender.replace({"man":0, "woman":1, "non-binary":2})
    print(pg.rm_anova(data=data2, dv="finalExecTime", within="user_age", subject="DesignName"))
    print(pg.rm_anova(data=data2, dv="finalExecTime", within="user_gender", subject="DesignName"))


def remove_outliers(df, col):
    return df[np.abs(df[col] - df[col].mean()) <= (3*df[col].std())]

if __name__=="__main__":
    df = load()
    
    # all(df)
    # key(df)
    # gesture(df)
    # four_size(df)
    
    #corr(df)
    user(df)
