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
    'win':k.windows_l_key,
    'shift':k.shift_key,
    'space':k.space_key,
    'capslock':k.caps_lock_key,
    'enter':k.enter_key,
    'tab':k.tab_key,
    'home':k.home_key,
    'end':k.end_key,
    'insert':k.insert_key,
    'delete':k.delete_key,
    'backspace':k.backspace_key,
    'pageup':k.page_up_key,
    'pagedown':k.page_down_key,
    'esc':k.escape_key,
    'up':k.up_key,
    'down':k.down_key,
    'left':k.left_key,
    'right':k.right_key,
    'a':'a',
    'b':'b',
    'c':'c',
    'd':'d',
    'e':'e',
    'f':'f',
    'g':'g',
    'h':'h',
    'i':'i',
    'j':'j',
    'k':'k',
    'l':'l',
    'm':'m',
    'n':'n',
    'o':'o',
    'p':'p',
    'q':'q',
    'r':'r',
    's':'s',
    't':'t',
    'u':'u',
    'v':'v',
    'w':'w',
    'x':'x',
    'y':'y',
    'z':'z',
    '1':'1',
    '2':'2',
    '3':'3',
    '4':'4',
    '5':'5',
    '6':'6',
    '7':'7',
    '8':'8',
    '9':'9',
    '0':'0',
    '`':'`',
    '-':'-',
    '=':'=',
    '[':'[',
    ']':']',
    ',':',',
    '.':'.',
    ';':';',
    '\'':'\'',
    '\/':'\/',
    '\\':'\\',
    'f1':k.function_keys[1],
    'f2':k.function_keys[2],
    'f3':k.function_keys[3],
    'f4':k.function_keys[4],
    'f5':k.function_keys[5],
    'f6':k.function_keys[6],
    'f7':k.function_keys[7],
    'f8':k.function_keys[8],
    'f9':k.function_keys[9],
    'f10':k.function_keys[10],
    'f11':k.function_keys[11],
    'f12':k.function_keys[12]
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
        if conf[0] >0.9:
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
    if index == 5:
        return
    action = []
    handle = win32gui.GetForegroundWindow()
    threadpid, procpid = win32process.GetWindowThreadProcessId(handle)
    # print(procpid) 快速切换句柄可能错误
    activeApp = 'cannot get path'
    try:
        mypyproc = win32api.OpenProcess(win32con.PROCESS_ALL_ACCESS, False, procpid)
        activeApp = win32process.GetModuleFileNameEx(mypyproc,0)
    except Exception:
        pass

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

