Vue.component('card', {
    props: ["post"],
    data: function() {
        return {
            img_res: this.post.img_res,
            name: this.post.name,
            isopen: this.post.isopen,
            dialogVisible: false
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
            <el-dialog :title="name" :visible.sync="dialogVisible" width="600px">
                <img :src="img_res">
                <p>test</p>
                
            </el-dialog>
        </el-card>
    </div>
    `
})
