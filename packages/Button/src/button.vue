<template>
  <button
    class="min-button"
    @click="btnClick"
    :style="btnStyle"
    :disabled="disabled"
    :class="[
      type ? `button-type-${type}` : '',
      btnClass,
      className,
      simple ? `button-simple-${simple}` : '',
    ]"
  >
    <slot></slot>
  </button>
</template>

<script>
/* 
  按钮:
  props:{
    
  }
*/

export default {
  name: "MinButton",
  data() {
    return {};
  },
  props: {
    size: {
      type: [String, Number],
      default: "",
    },

    type: {
      type: String,
      default: "",
    },
    borderRadius: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    text: {
      type: String,
      default: "",
    },
    underline: {
      type: Boolean,
      default: false,
    },
    simple: {
      type: String,
      default: "",
    },
    className: {
      type: String,
      default: "",
    },
  },
  computed: {
    btnStyle() {
      const { size, borderRadius, text } = this;
      const temp = {};
      if (size) {
        temp["fontSize"] = this.handleFontSize;
        temp["padding"] = this.handlePadding;
      }
      if (borderRadius) {
        temp["borderRadius"] = borderRadius;
      }
      if (text) {
        temp["color"] = text;
      }
      return temp;
    },
    btnClass() {
      return {
        "has-disabled": this.disabled,
        "has-text": this.text ? true : false,
        "has-underline": this.underline,
      };
    },
    handleFontSize() {
      return this.size <= 1 ? "" : `${12 * this.size}px`;
    },
    handlePadding() {
      return `${5 * this.size}px ${10 * this.size}px`;
    },
  },
  methods: {
    btnClick(e) {
      this.$emit("click", e);
    },
  },
};
</script>
