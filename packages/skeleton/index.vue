<!--  -->
<template>
  <div>
    <template v-if="isShow">
      <div
        :class="['min-skeleton', animation ? 'skeleton-animation' : '']"
        v-bind="$attrs"
      >
        <template v-for="v in num">
          <slot v-if="show" name="template">
            <MinSkeletonItem
              v-for="item in rows"
              :key="`${v}` - `${item}`"
              :class="[
                item === 1
                  ? 'min-skeleton-first'
                  : item === rows
                  ? 'min-skeleton-last'
                  : 'min-skeleton-content',
              ]"
              type="p"
            />
          </slot>
        </template>
      </div>
    </template>
    <template v-else><slot v-bind="$attrs"></slot></template>
  </div>
</template>
<script>
import MinSkeletonItem from "./item.vue";
export default {
  name: "MinSkeleton",
  components: {
    MinSkeletonItem,
  },
  props: {
    show: {
      type: Boolean,
      default: true,
    },
    delay: {
      type: Number,
      default: 0,
    },
    // num: {
    //   type: Number,
    //   default: 1,
    // },
    rows: {
      type: Number,
      default: 5,
    },
    animation: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      isShow: this.delay <= 0 ? this.show : false,
      timer: null,
      num: 1,
    };
  },
  watch: {
    show: {
      handler(show) {
        if (this.delay <= 0) {
          this.isShow = this.show;
          return;
        }
        if (show) {
          clearTimeout(this.timer);
          this.timer = setTimeout(() => {
            this.isShow = this.show;
          }, this.delay);
        } else {
          this.isShow = this.show;
        }
      },
      immediate: true,
    },
  },
  methods: {},
};
</script>

<style scoped>
.min-skeleton {
  width: 100%;
}
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
}
.skeleton-animation .min-skeleton-item {
  background: linear-gradient(90deg, #f2f2f2 10%, #e6e6e6 50%, #f2f2f2 60%);
  background-size: 400% 100%;
  animation: skeleton-show 1.4s ease infinite;
}
@keyframes skeleton-show {
  0% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0 50%;
  }
}
</style>
