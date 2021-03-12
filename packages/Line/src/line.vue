<script>
/*  分割线
    props:{

    }
*/

export default {
  name: "MinLine",
  data() {
    return {};
  },
  props: {
    color: {
      type: String,
      default: "",
    },
    margin: {
      type: [String, Number],
      default: "10",
    },
    height: {
      type: [String, Number],
      default: "5",
    },
    position: {
      type: String,
      default: "center",
    },
    direction: {
      type: String,
      default: "horizontal",
    },
  },
  computed: {},
  methods: {},
  render() {
    const { color, direction, position, $slots } = this;
    const lineStyle = {
      "background-color": color,
    };
    const lineEl = (
      <div
        class={["min-line", `min-line-${direction}`]}
        style={color ? lineStyle : ""}
      >
        <div class={["min-line-content", `is-${position}`]}>
          {$slots.default}
        </div>
      </div>
    );
    return lineEl;
  },
};
</script>
