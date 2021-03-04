<template>
  <div class="navbar">
    <hamburger
      id="hamburger-container"
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />

    <div class="right-menu">
      <template v-if="device !== DeviceType.Mobile">
        <search id="header-search" class="right-menu-item" />

        <error-log class="errLog-container right-menu-item hover-effect" />

        <screenfull id="screenfull" class="right-menu-item hover-effect" />

        <el-tooltip content="Global Size" effect="dark" placement="bottom">
          <size-select id="size-select" class="right-menu-item hover-effect" />
        </el-tooltip>
      </template>

      <el-dropdown
        class="avatar-container right-menu-item hover-effect"
        trigger="click"
      >
        <div class="avatar-wrapper">
          <img :src="avatar + '?imageView2/1/w/80/h/80'" class="user-avatar" />
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <router-link to="/profile/index">
              <el-dropdown-item>个人中心</el-dropdown-item>
            </router-link>

            <router-link to="/">
              <el-dropdown-item>Dashboard</el-dropdown-item>
            </router-link>
            <el-dropdown-item divided @click="logout">
              <span style="display:block;">退出</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import Breadcrumb from "@/components/Breadcrumb/index.vue";
import Hamburger from "@/components/Hamburger/index.vue";
import ErrorLog from "@/components/ErrorLog/index.vue";
import Screenfull from "@/components/Screenfull/index.vue";
import SizeSelect from "@/components/SizeSelect/index.vue";
import Search from "@/components/HeaderSearch/index.vue";
import { DeviceType, AppTypes } from "@/store/modules/app/AppTypes";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  components: {
    Breadcrumb,
    Hamburger,
    ErrorLog,
    Screenfull,
    SizeSelect,
    Search
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const sidebar = computed(() => {
      return store.state.app.sidebar;
    });
    const device = computed<DeviceType>(() => {
      return store.state.app.device;
    });
    const avatar = computed<string>(() => {
      return store.state.user.avatar;
    });

    const toggleSideBar = () => {
      store.dispatch(AppTypes.APP_TOGGLE_SIDEBAR);
    };
    const logout = async () => {
      await store.dispatch("user/logout");
      await router.push(`/login?redirect=${route.fullPath}`);
    };
    return {
      sidebar,
      device,
      avatar,
      toggleSideBar,
      logout,
      DeviceType
    };
  }
});
</script>

<style lang="scss">
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;
        line-height: 50px;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
