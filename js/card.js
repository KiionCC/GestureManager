Vue.component('card', {
    props: ["post"],
    data: function() {
        return {
            img_res: this.post.img_res,
            name: this.post.name,
            isopen: this.post.isopen
        }
    },
    template: `
    <div>
        <el-card class="card_box" :body-style="{ padding: '20px' }">
            <div slot="header" >
                <span>{{ name }}</span>
                <el-switch style="float: right; padding: 3px 0" v-model="isopen" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
            </div>
            <img :src="img_res">
        </el-card>
    </div>
    `
})