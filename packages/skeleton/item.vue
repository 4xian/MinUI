<template>
  <div
    :class="['min-skeleton-item', type === 'image' ? `min-skeleton-image` : '']"
  >
    <SkeletonImage v-if="type === 'image'" />
  </div>
</template>

<script>
import SkeletonImage from "./image.vue";

export default {
  name: "MinSkeletonItem",
  props: {
    type: {
      type: String,
      default: "p",
    },
  },
  components: { SkeletonImage },
};
</script>
<style scoped>
.min-skeleton-first {
  width: 30%;
}
.min-skeleton-content {
  margin-top: 15px;
  margin-bottom: 15px;
}
.min-skeleton-last {
  width: 50%;
}
.min-skeleton-item {
  height: 20px;
  border-radius: 8px;
  background: #f2f2f2;
  display: flex;
  align-items: center;
  justify-content: center;
}
.skeleton-animation .min-skeleton-item {
  background: linear-gradient(90deg, #f2f2f2 10%, #e6e6e6 50%, #f2f2f2 60%);
  background-size: 400% 100%;
  animation: skeleton-show 1.4s ease infinite;
}
.min-skeleton-image svg {
  fill: #dcdde0;
  width: 25%;
  height: 25%;
}
</style>
