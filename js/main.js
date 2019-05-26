//手势列表
new Vue({
    el: '#demo',
    data: {
        posts: [{
            name: "手势1",
            isopen: true,
            img_res: "res/default.png"

        }, {
            name: "手势2",
            isopen: true,
            img_res: "res/default.png"

        }, {
            name: "手势3",
            isopen: true,
            img_res: "res/default.png"

        }, {
            name: "手势4",
            isopen: true,
            img_res: "res/default.png"

        }, {
            name: "手势5",
            isopen: true,
            img_res: "res/default.png"

        }, {
            name: "手势6",
            isopen: true,
            img_res: "res/default.png"

        }
        ]
    }
})
new Vue({
    el:'#bang',
    data:{
        bins:[{
            bindname:"手势1"
        },{
            bindname:"手势2"
        },{
            bindname:"手势3"
        },{
            bindname:"手势4"
        },{
            bindname:"手势5"
        },{
            bindname:"手势6"
        }
        ]
    }
})