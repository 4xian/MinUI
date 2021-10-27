<!-- 表格 -->
<template>
  <div
    :class="['min-table', { 'table-is-center': isCenter }]"
    :style="{ fontSize: `${fontSize}px` }"
  >
    <div class="min-table-title" :style="itemGap">
      <div class="table-title-item" v-for="head in tableHead" :key="head.key">
        <div class="table-title-item-name" :style="handleHeadStyle(head)">
          {{ head.name }}
        </div>
      </div>
    </div>
    <div class="min-table-content" :style="itemGap">
      <div
        class="table-content-item"
        v-for="(v, idx) in list"
        :key="`min-table${idx}`"
        :style="itemGap"
      >
        <div
          class="content-item-value"
          :style="handleBodyStyle(vhead, idx)"
          v-for="vhead in tableHead"
          :key="vhead.key"
        >
          {{ vhead.key === "index" ? idx + 1 : v[vhead.key] || empty }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MinTable",
  props: {
    // 整体间隙
    gap: {
      type: [Number],
      default: 1,
    },
    // 头部标题数据
    tableHead: {
      type: [Array],
      default: () => [],
    },
    // 主体数据
    tableData: {
      type: [Array],
      default: () => [],
    },
    // 标题样式
    headStyle: {
      type: [Object],
      default: () => {
        return {};
      },
    },
    // 主体样式
    bodyStyle: {
      type: [Object],
      default: () => {
        return {
          padding: "3px 0",
          color: "rgba(205, 233, 255, 0.8)",
        };
      },
    },
    // 格式化空内容
    empty: {
      type: [String],
      default: "",
    },
    // 是否显示索引
    isIndex: {
      type: [Boolean],
      default: true,
    },
    // 整体文字是否居中
    isCenter: {
      type: [Boolean],
      default: true,
    },
    // 整体字体大小
    fontSize: {
      type: [Number],
      default: 16,
    },
    // 奇偶行颜色
    crossBg: {
      type: [String],
      default: "",
    },
    // 主体背景色
    bodyBg: {
      type: [String],
      default: "transparent",
    },
    ellipsis: {
      type: [Number],
      default: 1,
    },
  },
  data() {
    return {
      list: [],
    };
  },

  components: {},
  watch: {
    tableData: {
      handler(newVal, old = []) {
        if (newVal.length && newVal.length !== old.length) {
          this.handleData();
        }
      },
      immediate: true,
    },
  },
  computed: {
    itemGap() {
      return {
        gap: `${this.gap}px`,
      };
    },
  },

  mounted() {},

  methods: {
    handleData() {
      this.list = [...this.tableData];
    },
    handleHeadStyle(v) {
      if (v.width) return { ...this.headStyle, width: `${v.width}px` };
      return { ...this.headStyle };
    },
    handleBodyStyle(v, idx) {
      let bg = this.crossBg
        ? idx % 2 === 0
          ? this.crossBg
          : this.bodyBg
        : this.bodyBg;
      if (v.width)
        return { ...this.bodyStyle, width: `${v.width}px`, background: bg };
      return { ...this.bodyStyle, background: bg };
    },
  },
};
</script>

<style scoped>
.min-table {
  overflow: hidden;
  width: 100%;
  height: 100%;
}
.min-table-title {
  display: flex;
  justify-content: space-between;
}
.table-is-center {
  text-align: center;
}
.min-table-content {
  display: flex;
  flex-direction: column;
}
.table-content-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.content-item-value {
  letter-spacing: 1px;
}
.content-item-value,
.table-title-item-name {
  overflow: hidden;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
</style>
