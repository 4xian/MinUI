<script>
/*  角标:
    props:{
        content: 角标内容 可为字符串或数字;
        bgColor: 角标背景色 ;
        dot: 是否只显示小圆点;
        max: content超过max值则显示 max+ (仅当content为数字有效);
        visible: 角标是否显示, 默认显示; 
    }
*/

export default {
  name: "MinMark",
  data() {
    return {};
  },
  props: {
    content: {
      type: [String, Number],
      default: "",
    },
    bgColor: {
      type: String,
      default: "#ff3b30",
    },
    dot: {
      type: Boolean,
      default: false,
    },
    max: {
      type: Number,
    },
    visible: {
      type: Boolean,
      default: true,
    },
  },
  methods: {},
  computed: {
    handleContent() {
      const { max, content, dot } = this;
      if (dot) return;
      if (typeof content === "number" && typeof max === "number") {
        return content < max ? content : `${max}+`;
      }
      return content;
    },
  },
  render() {
    const { $slots, bgColor, handleContent, dot, visible } = this;
    const markStyle = {
      backgroundColor: bgColor ? bgColor : "",
      // fontSize: size ? `${12 * size}px` : "12px",
    };
    const markClass = [
      "min-mark-item",
      {
        "has-dot": dot,
      },
    ];
    const mark = (
      <div class="min-mark">
        {$slots.default}
        {visible && (
          <span class={markClass} style={markStyle}>
            {handleContent}
          </span>
        )}
      </div>
    );
    return mark;
  },
};
</script>
