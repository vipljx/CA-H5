<template>
  <div class='can-vas' v-if="!isOk">
    <canvas id='can_vans'>您当前浏览器不支持canvas，建议更换浏览器！</canvas>
    <div class="btn-b">
      <button @click='Output'>确定</button>
      <button @click='ClearCanvas'>清空</button>
      <!--      <button @click='Canvas_goBack'>返回</button>-->
    </div>
    <!--    <img :src="ImgSrc" v-if='ImgSrc'>-->
  </div>
  <div v-else class="write-success">
    <img src="../../assets/success.png" alt="">
    <p>绘制成功</p>
  </div>
</template>
<script>
  import Vue from "vue"
  import {addSeal} from '@/api/user'
  import {mapState} from "vuex"
  import {
    Toast
  } from "vant"

  Vue.use(Toast)
  export default {
    data() {
      return {
        ImgSrc: '',
        isOk: false,
        screenWidth: document.documentElement.clientWidth,
        //是否有绘图
        isWrite: false
      }
    },
    mounted() {
      let _this = this
      let canvas = document.getElementById('can_vans')
      let ctx = canvas.getContext('2d')
      let _x = 0,
        _y = 0,
        x = 0,
        y = 0
      canvas.width = this.screenWidth - 20// 设置画布大小
      canvas.height = this.screenWidth - 20
      canvas.addEventListener('touchstart', function (e) {// 开始绘制
        e.preventDefault()
        _this.isWrite = true
        _x = e.touches[0].pageX,
          _y = e.touches[0].pageY
        ctx.beginPath()// 路径开始
        ctx.moveTo(_x - canvas.offsetTop, _y - canvas.offsetLeft)
        this.addEventListener('touchmove', function (e) {// 路径移动
          x = e.touches[0].pageX,
            y = e.touches[0].pageY
          ctx.strokeStyle = 'red'
          ctx.lineWidth = 1
          ctx.lineTo(x - canvas.offsetTop, y - canvas.offsetLeft)
          ctx.stroke()
        })
      })
    },
    computed: {
      ...mapState({
        userInfo: state => state.user.userInfo
      })
    },
    methods: {
      Output() {
        if (!this.isWrite) {
          return Toast('请绘制签章')
        }
        let canvas = document.getElementById('can_vans')
        let ctx = canvas.getContext('2d')
        var oImg = new Image()
        ctx.drawImage(oImg, 0, 0)
        this.ImgSrc = canvas.toDataURL('image/png')
        if (this.ImgSrc) {
          addSeal(this.userInfo.userId, this.ImgSrc).then(res => {
            if (res.code === 0) {
              Toast('操作成功')
              this.isOk = true
              this.$router.go(-1)
            } else {
              Toast(res.msg)
            }
          })
        }
        //this.ImgSrc
      },
      ClearCanvas() {
        this.isWrite = false
        let canvas = document.getElementById('can_vans')
        let ctx = canvas.getContext('2d')
        ctx.clearRect(0, 0, canvas.width, canvas.height)
      },
      Canvas_goBack() {
        console.log(this.ImgSrc)
      }
    }
  }
</script>
<style scoped lang="less">
  body {
    margin: 0;
  }

  #can_vans {
    /*border: 1px solid #ccc;*/
    margin: 10px;
    box-sizing: border-box;
    background-color: #ffffff;
    /*color: red;*/
  }

  .can-vas {
    height: 100vh;
    background-color: #f2f2f2;
  }

  .can-vas > div {
    display: flex;
    justify-content: space-around;
  }

  .can-vas > div > button {
    background: #1abc9c;
    height: 35px;
    width: 100px;
    color: #fff;
    border-radius: 5px;
    outline: none;
    border: none;
  }

  .btn-b {
    /*position: fixed;*/
    bottom: 0;
    width: 100%;
    padding-bottom: 5px;
  }

  .write-success {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    img {
      width: 20%;
    }

    p {
      font-size: 20px;
      margin-top: 20px;
    }

  }

  /*.canvas-b{*/
  /*  height: 90vh;*/
  /*  display: flex;*/
  /*  flex-direction: column;*/
  /*  justify-content: center;*/
  /*}*/
  /*.canvas-b + div{*/
  /*  height: 10vh;*/
  /*}*/
</style>
