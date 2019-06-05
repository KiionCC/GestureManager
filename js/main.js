const { ipcRenderer } = require('electron')
const activeWin = require('active-win');

document.onkeydown = function (event) {
    event = event || window.event;
    if (event.keyCode == 17) {//Ctrl
        console.log("Ctrl")
    }
    else if (event.keyCode == 13) {//Enter
        console.log("Enter")
    }
    else if (event.keyCode == 16) {//Shift
        console.log("Shift")
    }
    else if (event.keyCode == 18) {//Alt
        console.log("Alt")
    }
}

ipcRenderer.on('ping', function (event, message) {
    console.log(message);
    (async () => {
        console.log(await activeWin());        
    })();
});

//手势列表
new Vue({
    el: '#card_list',
    data: {
        gesture_list: [{
            name: "手势1",
            isopen: false,
            img_res: "res/default.png",
            action: "Ctrl+d+v"

        }, {
            name: "手势2",
            isopen: true,
            img_res: "res/default.png",
            action: ""

        }, {
            name: "手势3",
            isopen: true,
            img_res: "res/default.png",
            action: ""

        }, {
            name: "手势4",
            isopen: true,
            img_res: "res/default.png",
            action: ""

        }, {
            name: "手势5",
            isopen: true,
            img_res: "res/default.png",
            action: ""

        }, {
            name: "手势6",
            isopen: true,
            img_res: "res/default.png",
            action: ""

        }
        ]
    }
})