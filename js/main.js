const { ipcRenderer } = require('electron')
const activeWin = require('active-win');
const child_process = require('child_process');

var pid = -1;
var pypc;

//console.log(conf)


//启动按钮
new Vue({
    el: '#start_button',
    methods: {
        start: function () {
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            if (pid != -1) {

                console.log('killing python...', pid)
                pypc.kill('SIGINT')

            }
            //首次开启
            //运行py
            var workerProcess = child_process.spawn('python', ['real_time.py'])
            if (workerProcess != null) {
                //启动成功
                console.log('python process start successful', workerProcess.pid)
                workerProcess.on('close', (code, signal) => {
                    //关闭成功
                    console.log(`子进程收到信号 ${signal} 而终止，退出码${code}`);
                    pid = -1
                });
                workerProcess.stdout.on('data', (data) => {
                    var tmp = data.toString();
                    console.log(data);
                    if (tmp == "pythonstarted\r\n") {
                        console.log("yes")
                        loading.close();
                        this.$message({
                            message: '手势识别已启动！',
                            type: 'success'
                        });
                    }
                    else {
                        console.log("no")
                    }
                });
                workerProcess.stderr.on('data', (data) => {
                    console.log('stderr:',data.toString());
                });
                pid = workerProcess.pid
                pypc = workerProcess
            }
        }
    }
})

//应用列表
new Vue({
    el: '#card_list',
    data: {
        dialogVisible: false,
        confirmVisible: false,
        form: {
            name: "",
            path: ""
        },
        new_name: "",
        new_path: ""
    },
    computed: {
        program_list_length: function () {
            return conf.program_list.length
        }
    },
    methods: {
        onAdd: function () {
            this.dialogVisible = true;
        },
        onSubmit: function () {
            this.new_name = this.form.name;
            this.new_path = this.form.path;
            this.dialogVisible = false;
            this.confirmVisible = true;
        },
        onCancel: function () {
            this.dialogVisible = false;
        },
        onYes: function () {
            this.confirmVisible = false;
            var new_list = JSON.parse(JSON.stringify(conf.program_list[0]));
            new_list.name = this.new_name;
            new_list.path = this.new_path;
            conf.program_list.push(new_list);
            store.set(conf)
            window.location.href = "./main.html";
        },
        onNo: function () {
            this.confirmVisible = false;
            var new_list = JSON.parse(JSON.stringify(def_conf));
            new_list.name = this.new_name;
            new_list.path = this.new_path;
            conf.program_list.push(new_list);
            store.set(conf)
            window.location.href = "./main.html";
        }
    },
    watch: {
        dialogVisible: function () {
            var that = this;
            this.form.name = "";
            this.form.path = "";
            if (this.dialogVisible === true) {
                ipcRenderer.on('ping', function (event, message) {
                    console.log(message);
                    (async () => {
                        var tmp = await activeWin();
                        that.form.name = tmp.owner.name;
                        that.form.path = tmp.owner.path;
                    })();
                });
            }
        }
    }
})