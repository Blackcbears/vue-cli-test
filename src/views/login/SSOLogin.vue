<template>
  <div class="exception-page">
    <div class="img">
      <img :src="data.src" />
    </div>
    <div class="content">
      <h1>{{ data.title }}</h1>
      <div class="desc">{{ data.desc }}</div>
      <div class="action">
        <el-button type="primary" @click="backHome">重新登录</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { SSOlogin } from "@/services/user";
import { setAuthorization } from "@/utils/request";
import { mapState } from "vuex";

const loading = {
  desc: "正在登录中",
  title: "加载中",
  src: "https://gw.alipayobjects.com/zos/rmsportal/RVRUAYdCGeYNBWoKiIwB.svg"
};

const error = {
  desc: "服务器发生了错误！",
  title: "服务器错误",
  src: "https://gw.alipayobjects.com/zos/rmsportal/RVRUAYdCGeYNBWoKiIwB.svg"
};
export default {
  name: "loading",
  computed: {
    ...mapState("setting", ["pageMinHeight"]),
    minHeight() {
      return this.pageMinHeight ? this.pageMinHeight + "px" : "100vh";
    }
  },
  data() {
    return {
      data: { ...loading }
    };
  },
  created() {
    this.getSSOLogin();
  },
  methods: {
    backHome() {
      window.location = `http://sso.tul.cn:9080/sso/login?service=${encodeURIComponent(
        this.delParam("ticket")
      )}`;
    },
    getSSOLogin() {
      let ticket = this.$route.query.ticket
        ? this.$route.query.ticket
        : undefined;
      if (ticket) {
        ticket = ticket.isArray ? ticket[0] : ticket;
        SSOlogin(ticket, encodeURIComponent(this.delParam('ticket'))).then(res => {

          if (res.data.success) {
            setAuthorization({
              token: res.data.data.token,
              refreshToken: res.data.data.refreshToken
            });
            this.$store.commit("account/settoken", res.data.data.token);
            this.$store.commit(
                "account/setrefreshToken",
                res.data.data.refreshToken
              );
            const redirect = decodeURIComponent(
              this.$route.query.redirect || this.$route.path
            );
            if (redirect === "/login" || redirect === "/") {
              this.$router.push({ name: "workplace" });
            } else {
              if (this.$route.path === redirect) {
                this.$router.push({ path: redirect, replace: true });
                // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
              } else {
                // 跳转到目的路由
                this.$router.push({ path: redirect });
              }
            }
          }
        })
          .catch(() => {
            this.data = { ...error };
      } else {
        window.location = `http://sso.tul.cn:9080/sso/login?service=${encodeURIComponent(
          this.delParam("ticket")
      }
    }
    },
    /**
     * 去除url中指定参数
     * @param paramKey
     * @returns {string}
     */
    delParam(paramKey) {
      let url = window.location.href; //页面url
      const urlParam = window.location.search.substr(1); //页面参数
      const beforeUrl =
        url.indexOf("?") > 0 ? url.substr(0, url.indexOf("?")) : url; //页面主地址（参数之前地址）
      let nextUrl = "";

      const arr = [];
      if (urlParam !== "") {
        const urlParamArr = urlParam.split("&"); //将参数按照&符分成数组
        for (let i = 0; i < urlParamArr.length; i++) {
          const paramArr = urlParamArr[i].split("="); //将参数键，值拆开
          //如果键雨要删除的不一致，则加入到参数中
          if (paramArr[0] !== paramKey) {
            arr.push(urlParamArr[i]);
          }
        }
      }
      if (arr.length > 0) {
        nextUrl = "?" + arr.join("&");
      }
      url = beforeUrl + nextUrl;
      return url;
    }
  }
};
</script>
<style lang="less" scoped>
.exception-page {
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: @base-bg-color;
  .img {
    padding-right: 52px;
    zoom: 1;
    img {
      max-width: 430px;
    }
  }
  .content {
    h1 {
      color: #434e59;
      font-size: 72px;
      font-weight: 600;
      line-height: 72px;
      margin-bottom: 24px;
    }
    .desc {
      color: @text-color-second;
      font-size: 20px;
      line-height: 28px;
      margin-bottom: 16px;
    }
  }
}
</style>
