<script>
export default {
  name: "MinLoop",
  componentName: "MinLoop",
  provide() {
    return {
      loop: this,
    };
  },
  data() {
    return {};
  },
  props: {},
  computed: {},
  watch: {},
  mounted() {},
  methods: {},
  render() {
    const loopEle = <div class="min-loop">{this.$slots.default}</div>;
    return loopEle;
  },
};
</script>
