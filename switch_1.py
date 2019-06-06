import cv2
import numpy as np
from  pynput import mouse, keyboard
from pynput.keyboard import Key
from pykeyboard import PyKeyboard

k = PyKeyboard()
keyboards= keyboard.Controller()
mouses = mouse.Controller()

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

def controll_PC(index,configObj):
    # print(configObj['gesture_list'][index]['isopen'])
    if configObj['gesture_list'][index]['isopen']:
        for i in configObj['gesture_list'][index]['action']:
            k.press_key(keyMap.get(i))
            print(i)
        for i in configObj['gesture_list'][index]['action']:
            k.release_key(keyMap.get(i))
