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
                <el-switch style="float: right; padding: 3px 0" v-model="isopen" active-color="#13ce66"></el-switch>
            </div>
            <img :src="img_res">
        </el-card>
    </div>
    `
})
Vue.component('binding',{
    props:["bin"],
    data:function () {
        return{
            bindname:this.bin.bindname
        }
    },
    template:`
    <div>
        <div class="bind-t" style="margin-left:100px;border-top-style:groove;height: 78px;width: 600px">
        <p style="float: left;width: 300px;font-size:20px;text-align: center">{{bindname}}</p>
        <input type="text" style="margin-left:100px;margin-top:26px;height:20px;float:left;width: 100px;display: block">
        </div>
    </div>
    `
})