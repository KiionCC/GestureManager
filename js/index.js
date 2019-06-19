

var urlinfo = window.location.href;
var id = decodeURI(urlinfo.split("?")[1].split("=")[1]);

new Vue({
    el: '#title',
    data: {
        name: conf.program_list[id].name
    },
    methods: {
        back: function () {
            window.location.href = "./main.html";
        }
    }

})

//手势列表
new Vue({
    el: '#card_list',
    data: {
        program_id: parseInt(id),
        gesture_list_length: conf.program_list[id].gesture_list.length
    },
    computed: {
        gesture_list: function () {
            var tmp = [];
            for (i = 0; i < this.gesture_list_length; i++) {
                tmp.push([this.program_id, i]);
            }
            console.log(tmp)
            return tmp;
        }
    }
})