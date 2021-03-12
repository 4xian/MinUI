<template>
  <button
    class="min-button"
    @click="btnClick"
    :style="btnStyle"
    :disabled="disabled"
    :class="[
      type ? `button-type-${type}` : '',
      btnClass,
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
      default: "1",
    },

    type: {
      type: String,
      default: "",
    },
    borderRadius: {
      type: String,
      default: "5px",
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
  },
  computed: {
    btnStyle() {
      const { size, borderRadius, text } = this;
      return {
        fontSize: size ? this.handleFontSize : "12px",
        padding: size ? this.handlePadding : "5px 10px",
        borderRadius: borderRadius ? borderRadius : "3px",
        color: text ? text : "",
      };
    },
    btnClass() {
      return {
        "has-disabled": this.disabled,
        "has-text": this.text ? true : false,
        "has-underline": this.underline,
      };
    },
    handleFontSize() {
      return `${12 * this.size}px`;
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
