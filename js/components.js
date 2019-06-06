const Store = require('electron-store');

const store = new Store();


//获取配置文件
store.name = "test"
var conf = store.get()
//配置文件初始化
if (JSON.stringify(conf) === '{}') {
    conf = {
        "gesture_list": [
            {
                "name": "手势1",
                "gesture": "1",
                "isopen": false,
                "img_res": "res/default.png",
                "action": []
            },
            {
                "name": "手势2",
                "gesture": "2",
                "isopen": false,
                "img_res": "res/default.png",
                "action": []
            },
            {
                "name": "手势3",
                "gesture": "3",
                "isopen": false,
                "img_res": "res/default.png",
                "action": []
            },
            {
                "name": "手势4",
                "gesture": "4",
                "isopen": false,
                "img_res": "res/default.png",
                "action": []
            },
            {
                "name": "手势5",
                "gesture": "5",
                "isopen": false,
                "img_res": "res/default.png",
                "action": []
            },
            {
                "name": "手势6",
                "gesture": "6",
                "isopen": false,
                "img_res": "res/default.png",
                "action": []
            }
        ]
    }
    store.set(conf)
}
//console.log(conf)
console.log(store.path)
/*
var isfocus = false;
var Ctrled = false;
var Entered = false;
var Shifted = false;
var Alted = false;
document.onkeydown = function (event) {
    event = event || window.event;

    if (event.keyCode == 17 & isfocus & !Ctrled) {
        document.getElementById('action_input').value = document.getElementById('action_input').value + 'Ctrl'
        Ctrled = true;
    }
    else if (event.keyCode == 13 & isfocus & !Entered) {//Enter
        document.getElementById('action_input').value = document.getElementById('action_input').value + 'Enter'
        Entered = true;
    }
    else if (event.keyCode == 16 & isfocus & !Shifted) {//Shift
        document.getElementById('action_input').value = document.getElementById('action_input').value + 'Shift'
        Shifted = true;
    }
    else if (event.keyCode == 18 & isfocus & !Alted) {//Alt
        document.getElementById('action_input').value = document.getElementById('action_input').value + 'Alt'
        Alted = true;
    }
}
*/

Vue.component('card', {
    props: ["post"],
    data: function() {
        return {
            form: {
                name: this.post.name,
                action: this.post.action.join('+')
            },  
            dialogVisible: false,
            img_res: this.post.img_res,
            gesture: this.post.gesture,
            name: this.post.name,
            isopen: this.post.isopen,
            action: this.post.action
        }
    },
    watch: {
        dialogVisible: function () {
            this.form.name = this.name;
            this.form.action = this.action.join('+');
        },
        name: function () {
            for (i = 0; i < conf.gesture_list.length; i++) {
                if (conf.gesture_list[i].gesture === this.gesture) {
                    conf.gesture_list[i].name = this.name
                    break;
                }
            }
            store.set("gesture_list", conf.gesture_list)
        },
        isopen: function () {
            for (i = 0; i < conf.gesture_list.length; i++) {
                if (conf.gesture_list[i].gesture === this.gesture) {
                    conf.gesture_list[i].isopen = this.isopen
                    break;
                }
            }
            store.set("gesture_list", conf.gesture_list)
        },
        action: function () {
            for (i = 0; i < conf.gesture_list.length; i++) {
                if (conf.gesture_list[i].gesture === this.gesture) {
                    conf.gesture_list[i].action = this.action
                    break;
                }
            }
            store.set("gesture_list", conf.gesture_list)
        }
    },
    methods: {
        onSubmit: function () {
            this.dialogVisible = false;
            this.name = this.form.name;
            //this.action = document.getElementById('action_input').value.split('+');
            this.action = this.form.action.split('+');
        },
        onCancel: function () {
            this.dialogVisible = false;
        },
        clear: function () {
            this.form.action = "";
            /*
            document.getElementById('action_input').value = '';
            Ctrled = false;
            Entered = false;
            Shifted = false;
            Alted = false;
            isfocus = true;
            */
        },
        blur: function () {
            /*
            isfocus = false;
            */
        }
    },
    template: `
    <div>
        <el-card class="card_box" :body-style="{ padding: '20px' }">
            <div slot="header" >
                <span>{{ name }}</span>
                <el-switch style="float: right; padding: 3px 0" v-model="isopen" inactive-color="#DCDFE6" active-color="#13ce66"></el-switch>
            </div>
            <img :src="img_res">
            <el-button round @click="dialogVisible = true" v-bind:disabled="!isopen" class="card_botton">设 置</el-button>
            <el-dialog title="手势设置" :visible.sync="dialogVisible" width="600px">
                <img :src="img_res">
                <div class="brief">
                    <el-form ref="form" :model="form" label-width="80px" labelPosition="left">
                        <el-form-item label="名称">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                        <el-form-item label="快捷键">
                            <el-input v-model="form.action" id="action_input" v-on:focus="clear" v-on:blur="blur"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit">修改</el-button>
                            <el-button @click="onCancel">取消</el-button>
                        </el-form-item>
                    </el-form>
                </div>
                
            </el-dialog>
        </el-card>
    </div>
    `
})
