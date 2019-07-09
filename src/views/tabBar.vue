<template>
  <div class="nav">
    <router-view></router-view>
    
    <van-tabbar v-model="active" active-color="#1abc9c" @change="onChnage">
    
      <van-tabbar-item v-for="(tmp,index) in tabbars" :key="index" :to="tmp.name">
        <span>{{tmp.title}}</span>
        <img slot="icon" slot-scope="props" :src="props.active ? tmp.active : tmp.normal" />
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>


<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import Vue from "vue";
import { Tabbar, TabbarItem } from "vant";
Vue.use(Tabbar).use(TabbarItem);

export default {
  data() {
    return {
      active: 0,
      tabbars: [
        {
          name: "home",
          title: "首页",
          normal: require("../static/images/ios/tabbar1.png"),
          active: require("../static/images/ios/tabbar2.png")
        },
        {
          name: "document",
          title: "文档",
          normal: require("../static/images/ios/tabbar3.png"),
          active: require("../static/images/ios/tabbar4.png")
        },
        {
          name: "evidence",
          title: "证据",
          normal: require("../static/images/ios/tabbar5.png"),
          active: require("../static/images/ios/tabbar6.png")
        },
        {
          name: "userIndication",
          title: "我的",
          normal: require("../static/images/ios/tabbar7.png"),
          active: require("../static/images/ios/tabbar8.png")
        }
      ]
    };
  },
  created() {
    this.active = Number(sessionStorage.getItem("active")) || 0;
  },
  watch: {
    $route(to, form) {
      if(to.name=="document"){
        this.active =1;
        sessionStorage.setItem("active",1)
      }
      
    }
  },

  methods: {
    //标签栏切换
    onChnage(active) {
      sessionStorage.setItem("active", active);
    }
  }
};
</script>
<style scoped lang="less">
.nav {
  background: #f2f2f2;
  font-size: 30 * @precision;

  min-height: 100vh;
}
.van-tabbar{
  border-top: 1px solid #f2f2f2;
  box-sizing: border-box;
}
</style>


