const Store = require('electron-store');

const store = new Store();


//获取配置文件
//store.name = "test"

var def_conf = {
    "path": "",
    "name": "默认设置",
    "gesture_list": [
        {
            "name": "后滚",
            "gesture": "0",
            "isopen": false,
            "img_res": "res/后滚.png",
            "action": []
        }, {
            "name": "前滚",
            "gesture": "1",
            "isopen": false,
            "img_res": "res/前滚.png",
            "action": []
        }, {
            "name": "前推",
            "gesture": "2",
            "isopen": false,
            "img_res": "res/前推.png",
            "action": []
        }, {
            "name": "右滑",
            "gesture": "3",
            "isopen": false,
            "img_res": "res/右滑.png",
            "action": []
        }, {
            "name": "左滑",
            "gesture": "4",
            "isopen": false,
            "img_res": "res/左滑.png",
            "action": []
        }
    ]
}

var conf = store.get()
//配置文件初始化
if (JSON.stringify(conf) === '{}') {
    conf = {
        "program_list": [def_conf]
    }
    store.set(conf)
}

console.log(store.path)

Vue.component('gesture', {
    props: ["post"],
    data: function() {
        return {
            dialogVisible: false,
            img_res: conf.program_list[this.post[0]].gesture_list[this.post[1]].img_res,
            gesture: conf.program_list[this.post[0]].gesture_list[this.post[1]].gesture,
            name: conf.program_list[this.post[0]].gesture_list[this.post[1]].name,
            isopen: conf.program_list[this.post[0]].gesture_list[this.post[1]].isopen,
            action: conf.program_list[this.post[0]].gesture_list[this.post[1]].action,
            form: {
                name: this.name,
                action: conf.program_list[this.post[0]].gesture_list[this.post[1]].action.join('+')
            }
        }
    },
    watch: {
        dialogVisible: function () {
            this.form.name = this.name;
            this.form.action = this.action.join('+');
        },
        name: function () {
            conf.program_list[this.post[0]].gesture_list[this.post[1]].name = this.name;
            store.set("program_list", conf.program_list);
        },
        isopen: function () {
            conf.program_list[this.post[0]].gesture_list[this.post[1]].isopen = this.isopen;
            store.set("program_list", conf.program_list);
        },
        action: function () {
            conf.program_list[this.post[0]].gesture_list[this.post[1]].action = this.action;
            store.set("program_list", conf.program_list);
        }
    },
    methods: {
        onSubmit: function () {
            this.name = this.form.name;
            this.action = this.form.action.split('+');
            this.dialogVisible = false;
        },
        onCancel: function () {
            this.dialogVisible = false;
        },
        clear: function () {
            this.form.action = "";
        }
    },
    template: `
    <div>
        <el-card class="gesture_box" :body-style="{ padding: '20px' }">
            <div slot="header" >
                <span>{{ name }}</span>
                <el-switch style="float: right; padding: 3px 0" v-model="isopen" inactive-color="#DCDFE6" active-color="#13ce66"></el-switch>
            </div>
            <img :src="img_res">
            <el-button round @click="dialogVisible = true" v-bind:disabled="!isopen" class="set_button">设 置</el-button>
            <el-dialog title="手势设置" :visible.sync="dialogVisible" width="600px">
                <img :src="img_res" class="gest_img">
                <div class="brief">
                    <el-form ref="form" :model="form" label-width="80px" labelPosition="left">
                        <el-form-item label="名称">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                        <el-form-item label="快捷键">
                            <el-input v-model="form.action" id="action_input" v-on:focus="clear"></el-input>
                        </el-form-item>
                            <p class="tips">*可以识别a~z，0~9，f1~f12，up，down，right，left，esc，</p>
                            <p class="tips">&nbsp;&nbsp;tab，capslock，shift，ctrl，win，alt，space，enter，home，</p>
                            <p class="tips">&nbsp;&nbsp;end，insert，delete，backspace，pageup，pagedown，</p>
                            <p class="tips">&nbsp;&nbsp;\` - = [ ] , . ; ' / \\ </p>

                        <el-form-item>
                            <el-button type="primary" @click="onSubmit" class="gesture_button">修改</el-button>
                            <el-button @click="onCancel" class="gesture_button">取消</el-button>
                        </el-form-item>
                    </el-form>
                </div>
                
            </el-dialog>
        </el-card>
    </div>
    `
})


Vue.component('program', {
    props: ["post"],
    data: function () {
        return {
            name: conf.program_list[this.post].name,
            path: conf.program_list[this.post].path,
            confirmVisible: false,
            fixVisible: false
        }
    },
    methods: {
        skipToFix: function () {
            this.fixVisible = true;
        },
        onDelete: function () {
            this.confirmVisible = true;
        },
        onYes: function () {
            conf.program_list.splice(this.post, 1);
            store.set("program_list", conf.program_list);
            this.confirmVisible = false;
            window.location.href = "./main.html";
        },
        onNo: function () {
            this.confirmVisible = false;
        },
        onYesFix: function () {
            this.fixVisible = false;
            window.location.href = "./index.html?id=" + this.post;
        },
        onNoFix: function () {
            this.fixVisible = false;
        }
    },
    template: `
    <div>
        <el-card class="program_box" :body-style="{ padding: '0px' }" v-if="path != ''">
            <p>{{ name }} </p>
            <el-divider></el-divider>
            <el-tooltip class="item" effect="light" :content="path" placement="top-start">
                <p class="path">{{ path }}</p>
            </el-tooltip>
            <el-button type="primary" round plain class="fix_button" @click="skipToFix">修改</el-button>
            <el-button type="danger" round plain class="delete_button" @click="onDelete">删除</el-button>
            <el-dialog title="确认删除该应用下的绑定设置？" :visible.sync="confirmVisible" width="300px">
                <div class="button_box">
                    <el-button @click="onNo" class="no_button">否</el-button>
                    <el-button type="primary" @click="onYes" class="yes_button">是</el-button>
                </div>
            </el-dialog>
            <el-dialog title="修改将关闭手势识别，是否继续？" :visible.sync="fixVisible" width="320px">
                <div class="button_box">
                    <el-button @click="onNoFix" class="no_button">否</el-button>
                    <el-button type="primary" @click="onYesFix" class="yes_button">是</el-button>
                </div>
            </el-dialog>
        </el-card>

        <el-card class="program_box" :body-style="{ padding: '0px' }" v-else>
            <p>{{ name }}</p>
            <el-divider></el-divider>
            <el-button type="primary" round plain class="fix_button" @click="skipToFix">修改</el-button>
            <el-dialog title="修改将关闭手势识别，是否继续？" :visible.sync="fixVisible" width="320px">
                <div class="button_box">
                    <el-button @click="onNoFix" class="no_button">否</el-button>
                    <el-button type="primary" @click="onYesFix" class="yes_button">是</el-button>
                </div>
            </el-dialog>
        </el-card>
    </div>
    `

})