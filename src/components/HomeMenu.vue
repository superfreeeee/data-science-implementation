<template>
  <a-menu theme="dark" mode="inline" v-model="selectedKeys">
    <!-- 主页面 -->
    <a-menu-item
      :key="MenuItemKeys.HOME"
      @click="menuChange(MenuItemKeys.HOME)"
    >
      <a-icon type="pie-chart" />
      <span>主页</span>
    </a-menu-item>
    <!-- 语义搜索页面 -->
    <a-menu-item :key="MenuItemKeys.QA" @click="menuChange(MenuItemKeys.QA)">
      <a-icon type="bell" />
      <span>问答服务</span>
    </a-menu-item>
    <!-- 自动构建 -->
    <a-menu-item
      :key="MenuItemKeys.RECOMMEND"
      @click="menuChange(MenuItemKeys.RECOMMEND)"
    >
      <a-icon type="like" />
      <span>推荐服务</span>
    </a-menu-item>
    <!-- 生成关联图谱 -->
    <a-sub-menu>
      <span slot="title">
        <a-icon type="global" />
        <span>所有节点</span>
      </span>
      <a-sub-menu v-for="(value, key) in nodeList" :key="key">
        <span slot="title">
          <a-icon type="plus-circle" />
          <span>{{ key }}</span>
        </span>
        <a-sub-menu v-for="(value1, key1) in value" :key="key + key1">
          <span slot="title">
            <a-icon type="plus-circle" />
            <span>{{ key1 }}</span>
          </span>
          <a-sub-menu v-for="(value2, key2) in value1" :key="key + key1 + key2">
            <span slot="title">
              <a-icon type="check-circle" />
              <span>{{ key2 }}</span>
            </span>
            <a-menu-item
              v-for="item in value2"
              :key="item.identity"
              @click="addGraph(item.identity)"
            >
              {{ item.properties.name }}
            </a-menu-item>
          </a-sub-menu>
        </a-sub-menu>
      </a-sub-menu>
    </a-sub-menu>
  </a-menu>
</template>

<script>
import { MenuItemKeys } from '@/common/config.js';

export default {
  name: 'HomeMenu',
  props: {
    nodeList: {
      type: Object,
    },
    menuChange: {
      type: Function,
    },
    addGraph: {
      type: Function,
    },
  },
  data() {
    return {
      MenuItemKeys,
      selectedKeys: [MenuItemKeys.HOME],
    };
  },
  methods: {
    switchMenuKey(item) {
      this.selectedKeys = [item];
    },
  },
  watch: {
    selectedKeys() {
      console.log('[HomeMenu] selectedKeys', this.selectedKeys);
    },
  },
};
</script>
