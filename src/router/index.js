// 配置路由的地方
import Vue from 'vue';
import VueRouter from 'vue-router';//使用插件
Vue.use(VueRouter);

import ShopCar from '@/pages/ShopCar'
export default new VueRouter({
//配置路由
    routes:[
      {
        path:'/shopcar',
        component:ShopCar
      }
    ]
})