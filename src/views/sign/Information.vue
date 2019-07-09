<template>
  <div class="Information">
    <van-nav-bar title="签署信息" left-text left-arrow @click-left="onClickLeft"/>
    <van-cell-group>
      <van-field readonly label="签署任务" v-model="signInfo.taskName"/>
      <van-field readonly label="签署平台" v-model="signInfo.platform"/>
      <van-field readonly label="签署模式" :value="signInfo.taskMode+'('+isZD+')'"/>
      <van-field readonly label="文档名称" v-model="signInfo.fileName"/>
      <van-field readonly label="发起人"  v-model="signInfo.fqName"/>
      <van-field readonly label="发起时间" v-model="signInfo.taskStartTime"/>
      <van-field readonly label="签署截止时间" v-model="signInfo.endTime"/>
    </van-cell-group>
    <div class="people cont">
      <div class="people-cate">签署人</div>
      <ul class="people-ul">
        
        <li v-for="(tmp,index) of signInfo.historyList" :key="index">
          <div class="people-top">
            <div class="people-left">{{tmp.userName}}</div>
            <button :class="tmp.color">{{tmp.operContent.split(":")[0]}}</button>

          </div>
          <div class="people-bottom" v-if='tmp.operContent.split(":")[0]=="拒签"'>
            <a @click='cause(tmp.operContent.split(":")[1])'>拒签原因</a>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import Vue from "vue";

import { NavBar, CellGroup, Field, Button,Dialog, Toast } from "vant";
import { 
  taskSignInfo,

} from "@/api/fileSigning";
import { mapState } from "vuex";
Vue.use(NavBar)
  .use(CellGroup)
  .use(Field)
  .use(Button)
  .use(Dialog);
export default {
  name: "Information",
  data() {
    return {
      signInfo:{},
      isZD:""
    };
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    })
  },
  created() {
    this.loadInfo(this.$route.query.taskId, this.userInfo.userId);
  },
  methods: {
    onClickLeft(){
        this.$router.go(-1)
    },
    loadInfo(taskId, userId) {
      taskSignInfo(taskId, userId).then(res => {
        console.log(res);
        if (res.code === 0) {
          let info = res.data;
          this.isZD = info.list[0].signX ? '指定签署位置' : '未指定签署位置'
          for(var tmp of info.historyList){
            if(tmp.operContent.split(":")[0]=="已签"){
              tmp.color="bgGreen"
            }else if(tmp.operContent.split(":")[0]=="待签"){
                tmp.color="bgOrange"
            }else if(tmp.operContent.split(":")[0]=="拒签"){
                tmp.color="bgRed"
            }
           
          }
          this.signInfo = {
            taskName: info.taskName,
            platform: info.platform,
            taskMode: ["一人签", "多人有序签", "多人无序签"][
              parseInt(info.taskMode)
            ],
            fileName: info.fileName,
            fqName: info.fqName,
            taskStartTime: info.taskStartTime,
            endTime: info.endTime,
            historyList: info.historyList
          };
          
        }
             console.log(this.signInfo);
      });
    },
    cause(msg){
      Dialog.alert({
        message: msg,
        messageAlign:"left"
      })
    }
  }
};
</script>
<style lang="less" scoped>
.van-cell:not(:last-child)::after {
  left: 0;
}
.cont {
  width: 702 * @precision;
  margin: 0 auto;
}
.people {
  text-align: left;
    .people-cate{
        margin-top: 15*@precision;
    }
  .people-ul {
    li {
      padding: 10*@precision 0;
      .people-top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        button {
          padding:0 20*@precision;
          height: 55 * @precision;
          border-radius: 10 * @precision;
          border: 0;
          color: #ffffff;
        }
      }
    }
    .people-bottom {
      display: flex;
      justify-content: flex-end;
      margin-top: 10* @precision;
      a {
        color: #4f99f9;
      }
    }
  }
}
.bgGreen {
  background: #1abc9c;
}
.bgOrange {
  background: #ffbd5c;
}
.bgRed {
  background: #ff8585;
}
</style>
<style lang="less">
.Information .van-field__label {
  width: auto;
  margin-right: 10 * @precision;
}

.Information .van-field__control {
  text-align: right;
}
</style>