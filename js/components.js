
Vue.component('card', {
    props: ["post"],
    data: function() {
        return {
            form: {
                name: this.post.name,
                action: this.post.action
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
            this.form.action = this.action;
        }
    },
    methods: {
        onSubmit: function () {
            this.dialogVisible = false;
            this.name = this.form.name;
            this.action = this.form.action;
        },
        onCancel: function () {
            this.dialogVisible = false;
        }
    },
    template: `
    <div>
        <el-card class="card_box" :body-style="{ padding: '20px' }">
            <div slot="header" >
                <span>{{ name }}</span>
                <el-switch style="float: right; padding: 3px 0" v-model="isopen" inactive-color="#13ce66" active-color="#DCDFE6"></el-switch>
            </div>
            <img :src="img_res">
            <el-button round @click="dialogVisible = true" v-bind:disabled="isopen" class="card_botton">设 置</el-button>
            <el-dialog title="手势设置" :visible.sync="dialogVisible" width="600px">
                <img :src="img_res">
                <div class="brief">
                    <el-form ref="form" :model="form" label-width="80px" labelPosition="left">
                        <el-form-item label="名称">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                        <el-form-item label="快捷键">
                            <el-input v-model="form.action"></el-input>
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
