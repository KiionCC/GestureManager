const { ipcRenderer } = require('electron')
const activeWin = require('active-win');
const child_process = require('child_process');

var pid = -1
var pypc

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
            if (pid != -1) {
                console.log('killing python...',pid)
                pypc.kill('SIGINT')
                
            }
            else {
                //运行py
                
                var workerProcess = child_process.spawn('python',['real_time.py','4242'])
                if (workerProcess != null) {
                    console.log('python process start successful',workerProcess.pid)
                  }
                workerProcess.on('close', (code, signal) => {
                    console.log(`子进程收到信号 ${signal} 而终止`);
                    pid = -1
                  });
                pid = workerProcess.pid
                pypc = workerProcess
            }


        }
    }
})