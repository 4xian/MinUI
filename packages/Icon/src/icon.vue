<template>
  <i
    :class="iconfont ? `iconfont-${name}` : `min-icon-${name}`"
    :style="{ fontSize: `${size}px` }"
  ></i>
</template>

<script>
export default {
  name: "MinIcon",
  props: {
    name: String,
    iconfont: {
      type: Boolean,
      default: false,
    },
    size: {
      type: [String, Number],
      default: 16,
    },
  },
};
</script>
