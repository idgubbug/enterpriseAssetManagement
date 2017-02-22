Vue.component('header-label', {
    props: ['data'],
    template: '<div v-if="data != null" class="row wrapper border-bottom white-bg page-heading">'
    +'<div class="col-lg-10">'
    +'<h2>{{data.name}}</h2>'
    +'<ol v-if="data.path != null" class="breadcrumb">'
    +'<li v-for="item in data.path.parent">'
    +'<a v-if="item.url == null">{{item.name}}</a>'
    +'<router-link v-else v-bind:to="item.url">{{item.name}}</router-link>'
    +'</li>'
    +'<li class="active"><strong>{{data.path.active}}</strong></li>'
    +'</ol>'
    +'</div>'
    +'<div class="col-lg-2"></div>'
    +'</div>'
});

Vue.component('tt-table', {
    props: ['value','data','selection'],
    template: '<table v-if="data != null" class="table table-striped table-hover">' +
    '<thead>' +
    '<slot name="tt-title">' +
    '<tr>' +
    //复选框美化
    '<th v-if="selection">' +
    '<div class="checkbox checkbox-success tt-table-checkbox">' +
    '<input v-model="allSelected" v-on:click="updateAllSelect" type="checkbox">' +
    '<label></label>' +
    '</div>' +
    '</th>' +
    //标题栏默认样式
    '<slot v-for="(item,key) in data.title" v-bind:name="\'tt-title-\'+key">' +
    '<th v-if="isString(item)">{{item}}</th>' +
    '<th v-else :width="item.width">{{item.name}}</th>' +
    '</slot>' +
    '</tr>' +
    '</slot>' +
    '</thead>' +
    '<tbody>' +
    '<slot name="tt-body">' +
    '<tr v-for="(item,index) in data.data">' +
    //复选框美化
    '<td v-if="selection">' +
    '<div class="checkbox checkbox-success tt-table-checkbox">' +
    '<input v-model="checkedData" v-bind:value="item" v-on:click="updateSelect" type="checkbox">' +
    '<label></label>' +
    '</div>' +
    '</td>' +
    //表格主体默认样式
    '<td v-for="(value,key) in data.title">' +
    '<slot v-bind:name="\'tt-body-\'+key" v-bind:row="item" v-bind:index="index">' +
    '<div v-if="key == \'$index\'">{{index}}</div>' +
    '<div v-else>{{item[key]}}</div>' +
    '</slot>' +
    '</td>' +
    '</tr>' +
    '</slot>' +
    '</tbody>' +
    '</table>',
    data:function () {
        return{
            tableDate:this.data,
            checkedData:[]
        }
    },
    computed:{
        allSelected:function () {
            return this.checkedData.length != 0;
        }
    },
    mounted:function () {
        this.$emit('input',this.checkedData);
    },
    methods:{
        isString:function (str) {
            return Object.prototype.toString.call(str) == "[object String]"
        },
        updateAllSelect:function () {
            if (this.allSelected){
                this.checkedData = [];
            }else {
                this.checkedData = this.tableDate.data.slice(0);
            }
            this.$emit('input',this.checkedData)
        },
        updateSelect:function () {
            this.$emit('input',this.checkedData)
        }
    }
});

Vue.component('tt-simple-input', {
    props: ['value','label','type','placeholder'],
    template: '<div class="form-group tt-from-input">' +
    '<label>{{label}}</label>' +
    '<input :value="value" @input="updateValue($event.target.value)" :type="baseType" :placeholder="placeholder" class="form-control">' +
    '</div>',
    data:function(){
        return{
        }
    },
    computed: {
        baseType: function () {
            return this.type||"text";
        }
    },
    created:function () {
    },
    methods:{
        updateValue:function (value) {
            this.$emit('input',value)
        }
    }
});

Vue.component('tt-btn-toolbar', {
    template: '<div class="btn-toolbar" role="toolbar">' +
    '<slot></slot>' +
    '</div>'
});
Vue.component('tt-btn-group', {
    template: '<div class="btn-group" role="group">' +
    '<slot></slot>' +
    '</div>'
});
Vue.component('tt-button', {
    props: ['value','type'],
    template: '<button :type="innerType" class="btn">' +
    '{{value}}' +
    '<slot></slot>' +
    '</button>',
    computed: {
        innerType: function () {
            return this.type||"button";
        }
    }
});