const { ipcRenderer } = require('electron')
const activeWin = require('active-win');

ipcRenderer.on('ping', function (event, message) {
    console.log(message);
    (async () => {
        console.log(await activeWin());        
    })();
});

//console.log(conf)

//手势列表
new Vue({
    el: '#card_list',
    data: {
        gesture_list: conf.gesture_list
    },
    methods: {
        start: function () {

        }
    }
})