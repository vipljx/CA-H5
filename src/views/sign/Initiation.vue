<template>
  <div class="Initiation">
    <van-nav-bar title="发起签署" left-text left-arrow @click-left="onClickLeft" />
    <div class="cate">
      <div class="cont cate-cont">
        <img src="../../static/images/ios/圆角矩形4@2x.png" alt class="cate-ico1" />
        <span class="cate-bt">上传文档</span>
      </div>
    </div>
    <div class="file">
      <div class="cont">
        <div class="unFile" v-show="!show5">
          <div class="unFile-tp">
            <van-uploader accept="file" :after-read="afterRead">
              <van-image :src="ico1" />
            </van-uploader>
          </div>

          <p class="unFile-p">仅支持.doc/.docx/.pdf格式，文档大小需＜20MB</p>
        </div>
        <div class="filed" v-show="show5">
          <div class="filed-tp">
            <img src="../../static/images/ios/file2.png" alt />
            <img src="../../static/images/ios/file3.png" alt class="filed-close" @click="close" />
          </div>
          <p class="filed-p">{{param.fileList.name}}</p>
        </div>
      </div>
    </div>
    <div class="cate">
      <div class="cont cate-cont">
        <img src="../../static/images/ios/圆角矩形4@2x.png" alt class="cate-ico1" />
        <span class="cate-bt">基本信息</span>
      </div>
    </div>
    <van-cell-group>
      <van-field
        clearable
        label="签署任务"
        placeholder="填写任务名称"
        maxlength="20"
        v-model="form.taskName"
      />
      <van-field
        v-model="param.endTime"
        label="截止时间"
        :right-icon="arrow1"
        placeholder="选择签署截止时间"
        readonly
        @click="showPopup1"
      />
    </van-cell-group>

    <div class="cate">
      <div class="cont cate-cont">
        <img src="../../static/images/ios/圆角矩形4@2x.png" alt class="cate-ico1" />
        <span class="cate-bt">签署模式</span>
      </div>
    </div>
    <van-cell-group>
      <van-field
        v-model="param.pattern"
        label="签署模式"
        :right-icon="arrow1"
        placeholder="选择签署模式"
        readonly
        @click="showPopup2"
      />
      <van-field
        v-model="param.isAssignPosition "
        label="指定位置"
        :right-icon="arrow1"
        @click="showPopup3"
        readonly
      />
    </van-cell-group>

    <div class="cate">
      <div class="cont cate-cont">
        <img src="../../static/images/ios/圆角矩形4@2x.png" alt class="cate-ico1" />
        <span>签署人</span>
        <span class="cate-note" v-show="form.pattern">（*签署顺序为自左向右的顺序）</span>
      </div>
    </div>
    <div class="people">
      <ul class="people-ul cont">
        <li v-for="(tmp,index) of people" :key="index">
          <div class="people-tp">
            <van-uploader>
              <img src="../../static/images/ios/people1.png" alt />
            </van-uploader>
          </div>
          <div class="people-bt">{{tmp.userName}}</div>
          <div class="people-close" v-show="index>0" @click="del(index)">
            <img src="../../static/images/ios/file3.png" alt />
          </div>
        </li>

        <li>
          <div class="people-tp" @click="add">
            <img src="../../static/images/ios/people2.png" alt />
          </div>
        </li>
        <div class="clear"></div>
      </ul>
    </div>

    <ul class="btn-ul cont">
      <li>
        <button @click="next(1)">{{form.isAssignPosition?"下一步":"发起签署"}}</button>
      </li>
      <li>
        <button @click="next(0)">保存到草稿箱</button>
      </li>
    </ul>
    <!--截止时间弹出层 -->
    <van-popup v-model="show1" position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        type="datetime"
        title="选择时间"
        :formatter="formatter"
        @cancel="show1 = false"
        @confirm="onConfirm1"
      />
    </van-popup>

    <!--签署模式弹出层 -->
    <van-popup v-model="show2" position="bottom">
      <van-picker
        title="签署模式"
        :columns="columns2"
        show-toolbar
        @cancel="show2 = false"
        @confirm="onConfirm2"
      />
    </van-popup>

    <!--指定位置 -->
    <van-popup v-model="show3" position="bottom">
      <van-picker
        title="指定位置"
        :columns="columns3"
        show-toolbar
        @cancel="show3 = false"
        @confirm="onConfirm3"
      />
    </van-popup>

    <!-- 添加签署人 -->
    <van-popup
      v-model="show4"
      position="right"
      :style="{ width: '100%',height:'100%' }"
      class="bgGray"
    >
      <van-cell-group>
        <van-field clearable label="姓名" maxlength="10" v-model="obj.userName" placeholder="填写真实姓名" />
        <van-field clearable label="手机号码" v-model="obj.userPhone" placeholder="填写手机号码" />
      </van-cell-group>
      <ul class="btn-ul cont">
        <li>
          <button @click="save">保存</button>
        </li>
        <li>
          <button @click="back">返回</button>
        </li>
      </ul>
    </van-popup>
  </div>
</template>
<script>
import Vue from "vue";
import { launchSign, reLaunch } from "@/api/fileSigning";
import { mapState } from "vuex";

import {
  NavBar,
  CellGroup,
  Popup,
  Field,
  DatetimePicker,
  Picker,
  Uploader,
  Image,
  Button,
  Toast
} from "vant";
Vue.use(NavBar)
  .use(CellGroup)
  .use(Popup)
  .use(Field)
  .use(DatetimePicker)
  .use(Picker)
  .use(Uploader)
  .use(Image)
  .use(Button)
  .use(Toast);
export default {
  name: "unUpload",
  data() {
    return {
      arrow1: require("../../static/images/ios/arrow2.png"),
      show1: false,
      show2: false,
      show3: false,
      show4: false,
      show5: false,
      currentDate: new Date(),
      columns2: [
        { text: "一人签", index: 0 },
        { text: "多人有序签", index: 1 },
        { text: "多人无序签", index: 2 }
      ],
      columns3: [{ text: "是", index: 1 }, { text: "否", index: 0 }],
      people: [],
      obj: {
        userName: "",
        userPhone: ""
      },
      ico1: require("../../static/images/ios/file1.png"),

      param: {
        fileList: {
          name: ""
        },
        endTime: "",
        isAssignPosition: "否",
        pattern: ""
      },
      form: {
        endTime: "",
        isAssignPosition: 0,
        pattern: "",
        taskName: ""
      },
      isCxqs: 0,
      formatter(type, value) {
        if (type === "year") {
          return `${value}年`;
        } else if (type === "month") {
          return `${value}月`;
        } else if (type === "day") {
          return `${value}日`;
        } else if (type === "hour") {
          return `${value}时`;
        } else if (type === "minute") {
          return `${value}分`;
        }
        return value;
      }
    };
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    })
  },
  created() {
    var obj = {
      userName: this.userInfo.userName,
      userPhone: this.userInfo.userPhone,
      sort: 0
    };

    this.people.push(obj);

    //重新发起 加载之前信息
    if (this.$route.query.taskId) {
      this.reload(this.$route.query.taskId);
      this.isCxqs = 1;
    }

    Date.prototype.format = function(fmt) {
      var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": "00", //秒this.getSeconds()
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        S: this.getMilliseconds() //毫秒
      };
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          (this.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
      }
      for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
          fmt = fmt.replace(
            RegExp.$1,
            RegExp.$1.length == 1
              ? o[k]
              : ("00" + o[k]).substr(("" + o[k]).length)
          );
        }
      }
      return fmt;
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      this.show5 = true;
      this.param.fileList = file.file;
      console.log(file);
    },
    close() {
      this.show5 = false;
      this.param.fileList = {
        name: ""
      };
    },
    //选择截止时间
    showPopup1() {
      this.show1 = true;
    },
    onConfirm1(value) {
      console.log(value);
      this.show1 = false;
      this.param.endTime = new Date(value).format("yyyy-MM-dd hh:mm");
      this.form.endTime = new Date(value).format("yyyy-MM-dd hh:mm:ss");
    },
    //选择签署模式
    showPopup2() {
      this.show2 = true;
    },
    onConfirm2(value) {
      console.log(value);
      this.param.pattern = value.text;
      this.form.pattern = value.index;
      this.show2 = false;
      if (this.form.pattern === 0) {
        this.people.length = 1;
      }
    },
    //指定位置
    showPopup3() {
      this.show3 = true;
    },
    onConfirm3(value) {
      console.log(value);
      this.param.isAssignPosition = value.text;
      this.form.isAssignPosition = value.index;
      this.show3 = false;
    },
    add() {
      console.log();
      if (this.form.pattern === "") {
        Toast("请选择签署模式");
        return;
      } else if (this.form.pattern === 0) {
        Toast("一人签不支持添加签署人");
        return;
      }
      this.show4 = true;
    },
    del(i) {
      this.people.splice(i, 1);
    },
    //添加签署人
    save() {
      if (!/^[\u4E00-\u9FA5]{2,10}/.test(this.obj.userName)) {
        Toast("姓名格式不正确");
        return;
      }
      if (!/^1[3456789]\d{9}$/.test(this.obj.userPhone)) {
        Toast("手机号格式不正确");
        return;
      }
      this.obj.sort = this.people.length;
      this.people.push(JSON.parse(JSON.stringify(this.obj)));
      this.obj.userName = "";
      this.obj.userPhone = "";
      this.show4 = false;
      console.log(this.people);
    },
    back() {
      this.show4 = false;
    },
    //重新发起 加载之前信息
    reload(taskId) {
      reLaunch(taskId).then(res => {
        let info = res.data;
        console.log(info);
        let arr = [];

        // this.fileList = [
        //   {
        //     name: info.fileName,
        //     noUpdate: 1
        //   }
        // ];
        this.form = {
          taskName: info.taskName,
          endTime: info.endTime,
          pattern: parseInt(info.taskMode),
          isAssignPosition: !!info.list[0].signX ? 1 : 0
        };
        this.param = {
          fileList: {
            name: info.fileName,
            noUpdate: 1
          },
          endTime: info.endTime,
          isAssignPosition: !!info.list[0].signX ? "是" : "否",
          pattern: this.columns2[info.taskMode].text
        };
        this.show5 = true;
        info.list.forEach((item, index) => {
          arr.push({
            key: index,
            userName: item.userName,
            userPhone: item.userPhone
          });
        });
        this.people = arr;
      });
    },

    next(type) {
      if (!this.param.fileList.name) {
        Toast("请先上传文档");
        return;
      }
      if (!/^[\u4E00-\u9FA5a-zA-Z0-9]{4,20}$/.test(this.form.taskName)) {
        Toast("任务名称格式不正确");
        return;
      }
      if (!this.form.endTime) {
        Toast("请选择签署截止时间");
        return;
      }
      if (this.form.pattern === "") {
        Toast("请选择签署模式");
        return;
      }
      if (this.form.pattern !== 0 && this.people.length < 2) {
        Toast("请添加签署人");
        return;
      }
      if (new Date(this.form.endTime).getTime() < new Date().getTime()) {
        Toast("截止时间不可小于当前时间");
        return;
      }
      this.request(type);
      // if (true) {
      //   this.$router.push("/waitSign");
      // } else {
      //   this.$router.push("/appoint");
      // }
    },

    request(type) {
      let formData = new FormData();
      let data = {};
      data.endTime = this.form.endTime;
      data.isCxqs = this.isCxqs;
      data.qsType = this.form.isAssignPosition;
      data.list = this.people;
      data.taskMode = this.form.pattern;
      data.taskName = this.form.taskName;
      data.type = type;
      data.userId = this.userInfo.userId;
      //是否为重新发起
      if (this.isCxqs) {
        data.taskId = parseInt(this.$route.query.taskId);
      }
      //文件是否重新上传
      if (!this.param.fileList.noUpdate) {
        formData.append("file", this.param.fileList);
      } else {
        formData.append("file", "");
      }

      formData.append("signStr", JSON.stringify(data));

      Toast.loading({
        mask: true,
        message: "加载中...",
        duration: 0
      });
      launchSign(formData).then(res => {
        console.log(res);
        Toast.clear();
        if (res.code === 0) {
          if (this.form.isAssignPosition) {
            localStorage.setItem("signInfo", JSON.stringify(res.data));
            this.$router.push("/appoint");
          } else {
            if (type == 0) {
              sessionStorage.setItem("active", 1);
              this.$router.push("/document");
            } else {
              this.$router.push({
                path: "/waitSign",
                query: {
                  taskId: res.data.taskId
                }
              });
            }
          }
        } else {
          Toast(res.msg);
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
p {
  margin: 0;
}
.van-nav-bar .van-icon {
  color: #333333;
}
.van-cell:not(:last-child)::after {
  left: 0;
}
.Initiation {
  background: #f2f2f2;
  font-size: 30 * @precision;
  min-height: 100vh;
}
.bgGray {
  background: #f2f2f2;
}
.cont {
  width: 702 * @precision;
  margin: 0 auto;
}
.cate {
  padding: 20 * @precision 0;
  .cate-cont {
    display: flex;
    align-items: center;
    .cate-ico1 {
      width: 9 * @precision;
      margin-right: 15 * @precision;
    }
    .cate-ico2 {
      width: 15 * @precision;
      margin-left: 15 * @precision;
    }
    .cate-bt {
      flex: 1;
      text-align: left;
    }
    .cate-note {
      font-size: 28 * @precision;
      color: #ff0000;
    }
  }
}
.file {
  background: #ffffff;
  padding: 25 * @precision 0;
  .unFile {
    text-align: left;
    .van-image {
      width: 189 * @precision;
    }
    .unFile-p {
      color: #999999;
      font-size: 28 * @precision;
    }
  }
  .filed {
    display: flex;
    align-items: flex-start;
    .filed-tp {
      width: 155 * @precision;
      position: relative;
      img:first-child {
        width: 141 * @precision;
      }
      .filed-close {
        position: absolute;
        width: 28 * @precision;
        right: 0;
        top: -14 * @precision;
      }
    }
    .filed-p {
      margin-left: 25 * @precision;
      word-break: break-all;
      white-space: pre-wrap;
    }
  }
}
.people {
  background: #ffffff;
  .people-ul {
    padding: 10 * @precision 0;
    li {
      float: left;
      position: relative;
      margin: 10 * @precision 38 * @precision 10 * @precision 0;
      img {
        width: 100%;
      }
      .people-tp {
        width: 100 * @precision;
      }
      .people-bt {
        font-size: 28 * @precision;
      }
      .people-close {
        position: absolute;
        width: 28 * @precision;
        top: 0;
        right: 0;
      }
    }
    li:last-child {
      margin: 0;
    }
    .clear {
      clear: both;
    }
  }
}
.btn-ul {
  padding: 20 * @precision 0;
  li {
    padding: 20 * @precision;
    button {
      width: 100%;
      border: 0;
      font-size: 28 * @precision;
      color: #ffffff;
      height: 90 * @precision;
      border-radius: 10 * @precision;
    }
  }
  li:first-child button {
    background: #1abc9c;
  }
  li:nth-child(2) button {
    background: #cccccc;
  }
}
</style>
<style lang="less">
.Initiation .van-field__label {
  width: auto;
  margin-right: 10 * @precision;
}
.Initiation .van-icon__image {
  width: 16 * @precision;
}
.Initiation .van-field__control {
  text-align: right;
}
</style>
