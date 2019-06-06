import cv2
import numpy as np
from  pynput import mouse, keyboard
from pynput.keyboard import Key

keyboards= keyboard.Controller()
mouses = mouse.Controller()
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
        if conf[0] >0.8:
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

def controll_PC(index):
    if index ==0:
        print('do nothing')
    elif index ==1:
        print('do nothing')
    elif index ==2:
        print('do nothing')
    elif index ==3:
        keyboards.press(Key.ctrl)
        keyboards.press(Key.cmd)
        keyboards.press(Key.left)
        
        print('swipe window right')
        print()
        keyboards.release(Key.ctrl)
        keyboards.release(Key.cmd)
        keyboards.release(Key.left)
    elif index ==4:
        keyboards.press(Key.ctrl)
        keyboards.press(Key.cmd)
        keyboards.press(Key.right)
        
        print('swipe window left')
        print()
        keyboards.release(Key.ctrl)
        keyboards.release(Key.cmd)
        keyboards.release(Key.right)