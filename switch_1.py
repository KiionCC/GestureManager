import cv2
import numpy as np
import win32.win32gui as win32gui
import win32.win32process as win32process
import win32.win32api as win32api
import win32.lib.win32con as win32con
from pykeyboard import PyKeyboard

k = PyKeyboard()
#keyboards= keyboard.Controller()
#mouses = mouse.Controller()

keyMap = {
    'ctrl':k.control_key,
    'alt':k.alt_key,
    'home':k.windows_l_key,
    'shift':k.shift_key,
    'space':k.space_key,
    'up':k.up_key,
    'down':k.down_key,
    'left':k.left_key,
    'right':k.right_key
}

def index_threshhold(conf, index):
    if index ==1:
        if conf[0] >0.8:
            return(index)
        else:
            return(5)
    elif index == 0:
        if conf[0] >0.8:
            return(index)
        else:
            return(5)
    elif index == 2 :
        if conf[0] >0.7:
            #print("this is stop")
            return(index)
        else:
            return(5)
    elif index==3:
        if conf[0] >0.8:
            print(conf[0])
            return(index)
        else:
            return(5)
    elif index ==4:
        if conf[0] >0.8:
            print(conf[0])
            return(index)
        else:
            return(5)
    elif index== 5:
            return(5)
def puttext_on(conf, index, classes,frame, font):   
    cv2.putText(frame, 'confidence: ' + str(conf), (10, 100), font, 0.7, (0, 255, 0), 2, 1)
    cv2.putText(frame, 'gesture class: ' + classes[index], (10, 50), font, 0.7, (0, 255, 0), 2, 1)

def detect_fist(frame,fistDetect ):
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    fist = fistDetect.detectMultiScale(gray, 1.3, 5)

# 输入是手势编号，输出为快捷键操作
def controll_PC(index,configObj):
    # print(configObj['gesture_list'][index]['isopen'])
    action = []
    handle = win32gui.GetForegroundWindow()
    threadpid, procpid = win32process.GetWindowThreadProcessId(handle)
    mypyproc = win32api.OpenProcess(win32con.PROCESS_ALL_ACCESS, False, procpid)
    activeApp = win32process.GetModuleFileNameEx(mypyproc,0)
    for app in configObj['program_list']:
        if app['name'] == '默认设置' and app['gesture_list'][index]['isopen']:
            action = app['gesture_list'][index]['action']
        elif activeApp == app['path'] and app['gesture_list'][index]['isopen']:
            action = app['gesture_list'][index]['action']
            break
    for i in action:
            k.press_key(keyMap.get(i))
            print(i)
    for i in action:
        k.release_key(keyMap.get(i))

