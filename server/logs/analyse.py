import os
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt
import pandas as pd
import pingouin as pg


#ylim = np.floor(df.finalExecTime.max())+1
ylim = 6
path = os.path.dirname(os.path.abspath(__file__))
sns.set(rc={"figure.figsize":(12, 9)})
    
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
            "targetDist", "keyboardLayout", "mouseType"
        ]

    path = os.path.dirname(os.path.abspath(__file__))
    df = pd.read_csv(path + "/all.csv",skiprows=1, names=header, na_values="-1")
    # df.fillna('', inplace=True)

    finalExecTime = ["totalExecTime1", "totalExecTime2", "totalExecTime3"]
    df['finalExecTime'] = df[finalExecTime].sum(axis=1)

    df['SizeName'] = df.Size.replace({1:"Tiny", 2:"Small", 3:"Medium", 4:"Large"})
    df['NbModiNames'] = df.NbModi.replace({0:"0 Modifier" ,1:"1 Modifier", 2:"2 Modifiers", 3:"3 Modifiers"})
    df['Name'] = df.DesignName.replace({'KeyMultiModi':'Key', 'KeyMultiRepeat':'Key', 'GestureMultiAngle':'Gesture', 'GestureMultiRepeat':'Gesture'})
    df.modifiers1 = df.modifiers1.replace({'Option':'Alt/Option', 'CMD':'Ctrl/CMD', 'Alt':'Alt/Option', 'Ctrl':'Ctrl/CMD'})
    df.modifiers2 = df.modifiers2.replace({'Option':'Alt/Option', 'CMD':'Ctrl/CMD', 'Alt':'Alt/Option', 'Ctrl':'Ctrl/CMD'})
    df.modifiers3 = df.modifiers3.replace({'Option':'Alt/Option', 'CMD':'Ctrl/CMD', 'Alt':'Alt/Option', 'Ctrl':'Ctrl/CMD'})
    
    return df


def all(df):
    ########## ALL ##########
    df = df.sort_values('Size')

    # All_Key_Gesture
    data1 = df
    nbLines = data1.Name.unique().shape[0]
    palette = sns.color_palette("mako_r", nbLines)

    sns.lineplot(
        x="Repeat", 
        y="finalExecTime", 
        data=data1,
        style="Name",
        hue = "Name",
        markers=True, 
        dashes=False,
        palette=palette,
        )

    plt.title("The average total execution time for each repeat for key and gesture")
    plt.ylabel('time (seconds)')
    plt.xlabel('Repeat')
    plt.xticks(np.arange(1, 4))
    plt.ylim(0, ylim)
    plt.savefig(path + '/graphs/All_Key_Gesture.png')
    plt.clf()

    # All_Size_mouseClick
    
    palette = sns.color_palette("mako_r", 2)

    sns.lineplot(
        x="SizeName", 
        y="mouseClick1", 
        data=df,
        label="mouseClick1", 
        color=palette[0],
        marker='o'
        )
    sns.lineplot(
        x="SizeName", 
        y="mouseClick2", 
        data=df,
        label="mouseClick2", 
        color=palette[1],
        marker='X'
    )
    plt.title("The average time it takes to click on the target for each size of the target")
    plt.ylabel('time (seconds)')
    plt.xlabel('Size')
    plt.ylim(0, ylim)
    plt.legend()
    plt.savefig(path + '/graphs/All_Size_mouseClick.png')
    plt.clf()
    
    # All_Size_Key_Gesture
    df = df.sort_values('Name')
    data1 = df[df.SizeName == 'Tiny']
    data2 = df[df.SizeName == 'Small']
    data3 = df[df.SizeName == 'Medium']
    data4 = df[df.SizeName == 'Large']
    
    nbLines = data1.Name.unique().shape[0]
    palette = sns.color_palette("mako_r", nbLines)
    fig, axes = plt.subplots(2, 2)
    fig.suptitle('The average total execution time for each repeat for key and gesture categorized by size')

    ax1 = sns.lineplot(
        x="Repeat", 
        y="finalExecTime", 
        data=data1,
        style="Name",
        hue = "Name",
        markers=True, 
        dashes=False,
        palette=palette,
        ax=axes[0,0]
        )
    ax1.set_title("Tiny", y=-0.01)
    ax1.set_ylabel('time (seconds)')
    ax1.set_xlabel('Repeat')
    ax1.set_ylim(0, ylim)
    ax1.set_xticks(range(1,4))

    
    ax2 = sns.lineplot(
        x="Repeat", 
        y="finalExecTime", 
        data=data2,
        style="Name",
        hue = "Name",
        markers=True, 
        dashes=False,
        palette=palette,
        ax=axes[0,1]
        )
    ax2.set_title("Small", y=-0.01)
    ax2.set_ylabel('time (seconds)')
    ax2.set_xlabel('Repeat')
    ax2.set_ylim(0, ylim)
    ax2.set_xticks(range(1,4))

    ax3 = sns.lineplot(
        x="Repeat", 
        y="finalExecTime", 
        data=data3,
        style="Name",
        hue = "Name",
        markers=True, 
        dashes=False,
        palette=palette,
        ax=axes[1,0]
        )
    ax3.set_title("Medium", y=-0.01)
    ax3.set_ylabel('time (seconds)')
    ax3.set_xlabel('Repeat')
    ax3.set_ylim(0, ylim)
    ax3.set_xticks(range(1,4))

    ax4 = sns.lineplot(
        x="Repeat", 
        y="finalExecTime", 
        data=data4,
        style="Name",
        hue = "Name",
        markers=True, 
        dashes=False,
        palette=palette,
        ax=axes[1,1]
        )
    ax4.set_title("Large", y=-0.01)
    ax4.set_ylabel('time (seconds)')
    ax4.set_xlabel('Repeat')
    ax4.set_ylim(0, ylim)
    ax4.set_xticks(range(1,4))
    
    fig.savefig(path + '/graphs/All_Size_Key_Gesture.png')
    fig.clf()
    
    
    # All_Block_DesignName
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
    data = df[(df.DesignName == 'KeyMultiRepeat')]
    palette = sns.color_palette("mako_r", 3)

    #KeyMultiRepeat_Repeat_totalExecTime
    
    sns.lineplot(
        x="Repeat", 
        y="finalExecTime", 
        data=data,
        markers=True, 
        dashes=False,
        palette=palette,
        )
    plt.title("The average execution time for each modifier in KeyMultiRepeat")
    plt.ylabel('time (seconds)')
    plt.xlabel('Repeat')
    plt.xticks(np.arange(1, 4))
    plt.ylim(0, ylim)
    plt.savefig(path + '/graphs/KeyMultiRepeat_Repeat_totalExecTime.png')
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
    plt.xlabel('Size')
    plt.ylim(0, ylim)
    plt.savefig(path + '/graphs/GestureMultiRepeat_Size_finalExecTime.png')
    plt.clf()


#### KeyMultiModi ####
def key_modi(df):
    # df = df.sort_values('NbModi')

    # data = df[(df.DesignName == 'KeyMultiModi')]
    # data1 = remove_outliers(data, 'finalExecTime')
    # data2 = remove_outliers(data, 'nbOfAttempts1')

    # #KeyMultiModi_NbModi_finalExecTime
    # sns.lineplot(
    #     x="NbModiNames", 
    #     y="finalExecTime", 
    #     data=data1,
    #     color=palette[0],
    #     marker='o'
    #     )
    # plt.title("The average execution time for each number of modifiers in KeyMultiModi")
    # plt.ylabel(' time (seconds)')
    # plt.xlabel('Number of modifiers')
    # plt.ylim(0, ylim)
    # plt.savefig(path + '/graphs/KeyMultiModi_NbModi_finalExecTime.png')
    # plt.clf()

    # #KeyMultiModi_NbModi_nbOfAttempts1
    # sns.lineplot(
    #     x="NbModiNames", 
    #     y="nbOfAttempts1", 
    #     data=data2,
    #     color=palette[0],
    #     marker='o'
    #     )
    # plt.title("The average number of attempts for each number of modifiers in KeyMultiModi")
    # plt.ylabel('Number of attempts')
    # plt.xlabel('Nubmer of modifiers')
    # plt.ylim(0, ylim)
    # plt.savefig(path + '/graphs/KeyMultiModi_NbModi_nbOfAttempts1.png')
    # plt.clf()
    pass


#### GestureMultiAngle ####
def gesture_angle(df):

    #GestureMultiAngle_Size_finalExecTime for Gestures
    # data = df[df.DesignName == 'GestureMultiAngle']
    # nbLines = data.NbAngle.unique().shape[0]
    # palette = sns.color_palette("mako_r", nbLines)

    # sns.lineplot(
    #     x="SizeName", 
    #     y="finalExecTime", 
    #     data=data, 
    #     style="NbAngle",
    #     hue = "NbAngle",
    #     markers=True, 
    #     dashes=False,
    #     palette=palette,
    #     )

    # plt.title("The average execution time for each size of the target in GestureMultiAngle")
    # # plt.legend()
    # plt.ylabel('time (seconds)')
    # plt.xlabel('Size')
    # plt.ylim(0, ylim)
    # plt.savefig(path + '/graphs/GestureMultiAngle_Size_finalExecTime.png')
    # plt.clf()
    return


########## KEY ##########
def key(df):

    key_repeat(df)
    #key_modi(df)


########## GESTURE ##########
def gesture(df):
    df = df.sort_values('Size')
    
    #### BOTH ####
    # # Gesture_Dir
    # data = df[(df.Name == 'Gesture') & ((df.Repeat == 2) | (df.NbAngle == 2))]
    # nbLines = data.DesignName.unique().shape[0]
    # palette = sns.color_palette("mako_r", nbLines)

    # sns.lineplot(
    #     x="Dir", 
    #     y="finalExecTime", 
    #     data=data, 
    #     style="DesignName",
    #     hue = "DesignName",
    #     markers=True, 
    #     dashes=False,
    #     palette=palette,
    #     )

    # plt.title("The time difference between drawing a gesture separately and consecutively")
    # # plt.legend()
    # plt.ylabel('time (seconds)')
    # plt.xlabel('Size')
    # plt.ylim(0, ylim)
    # plt.savefig(path + '/graphs/Gesture_Dir.png')
    # plt.clf()
    
    gesture_repeat(df)
    gesture_angle(df)

# ANOVA test
def anova(df):
    
    KeyMultiModi = df[(df.DesignName == 'KeyMultiModi')]
    KeyMultiRepeat = df[(df.DesignName == 'KeyMultiRepeat')]
    GestureMultiAngle = df[(df.DesignName == 'GestureMultiAngle')]
    GestureMultiRepeat = df[(df.DesignName == 'GestureMultiRepeat')]
    
    res1 = pg.rm_anova(data=KeyMultiRepeat, dv="finalExecTime", within=["Repeat", "Size"], subject="ParticipantID")
    res2 = pg.rm_anova(data=GestureMultiRepeat, dv="finalExecTime", within=["Repeat", "Size"], subject="ParticipantID")

    print(res1)
    print(res2)
    
    # # Posthoc test (if necessary)
    # posthocs = pg.pairwise_ttests(dv='Time', within=['Condition', 'Size'], subject='Participant ID', data=df)
    # pg.print_table(posthocs)



if __name__=="__main__":
    df = load()
    
    #print(df.corr()["Size"].sort_values(ascending=False))
    
    all(df)
    key(df)
    gesture(df)
    
    anova(df)
