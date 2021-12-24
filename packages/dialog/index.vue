<!-- 弹窗 @Jian -->
<!-- 
    // 使用
    emits:['open','close']
    关闭弹窗: this.$refs.dialog.close()
    
    <MinDialog :visible.sync="showModal" ref="dialog" @close="closeDialog">
    ...自定义内容
    </MinDialog>
 -->
<template>
  <transition :name="animationName">
    <div
      v-if="visible"
      :class="['min-dialog-box min-dialog-center', rootClass]"
      :style="boxStyle"
    >
      <div :class="itemClass" :style="contentStyle">
        <slot></slot>
      </div>
      <div :class="[{ 'min-dialog-mask': mask }]" @click="clickMask"></div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'MinDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    // 弹窗宽度
    width: {
      type: Number,
      default: ''
    },
    // 是否需要遮罩层
    mask: {
      type: Boolean,
      default: true
    },
    // 点击遮罩层是否关闭弹窗
    clickMaskClose: {
      type: Boolean,
      default: true
    },
    rootClass: {
      type: [String, Array],
      default: ''
    },
    contentClass: {
      type: [String, Array],
      default: ''
    },
    // 是否全屏弹窗
    fullscreen: {
      type: Boolean,
      default: false
    },
    // 自定义transition动画名称,空则无动画
    animationName: {
      type: String,
      default: 'min-dialog-fade'
    },
    // 内容是否居中
    center: {
      type: Boolean,
      default: true
    },
    // 是否依赖父级进行弹窗,默认父级,true则以屏幕为基准
    fixed: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },

  computed: {
    boxStyle() {
      return {
        position: this.fixed ? 'fixed' : 'absolute'
      }
    },
    contentStyle() {
      const { width } = this
      return {
        width: width ? `${width}px` : 'auto'
      }
    },
    itemClass() {
      const { fullscreen, contentClass, center } = this
      return [
        'min-dialog',
        contentClass,
        { 'min-dialog-fullscreen': fullscreen },
        { 'min-dialog-center': center }
      ]
    }
  },
  watch: {
    visible: {
      handler(val) {
        if (val) {
          this.$emit('open')
        }
      },
      immediate: true
    }
  },
  methods: {
    close() {
      this.$emit('update:visible', false)
      this.$emit('close')
    },
    clickMask() {
      if (this.clickMaskClose) {
        this.close()
      }
    }
  }
}
</script>

<style scoped>
@import './index.scss';
</style>
