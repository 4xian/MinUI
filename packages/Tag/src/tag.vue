<script>
/* 
  标签：
  props:{
    
  }

*/

export default {
  name: "MinTag",
  data() {
    return {};
  },
  props: {
    size: {
      type: [String, Number],
      default: "",
    },

    // 可改为任意背景色
    type: {
      type: String,
      default: "",
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
    close: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    tagStyle() {
      const { size, text } = this;
      return {
        fontSize: size ? this.handleFontSize : "",
        padding: size ? this.handlePadding : "",
        color: text ? text : "",
      };
    },
    tagClass() {
      return {
        "has-text": this.text,
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
    tagClick(e) {
      this.$emit("click", e);
    },
    iconClose(e) {
      e.stopPropagation();
      this.$emit("close", e);
    },
  },
  render() {
    const {
      type,
      simple,
      tagClass,
      tagStyle,
      tagClick,
      iconClose,
      $slots,
    } = this;
    const TagClass = [
      "min-tag",
      type ? `tag-type-${type}` : "",
      simple ? `tag-simple-${simple}` : "",
      tagClass,
    ];
    const MinTag = (
      <span onClick={tagClick} style={tagStyle} class={TagClass}>
        {$slots.default}
        {this.close && <i class="min-icon-close" onClick={iconClose}></i>}
      </span>
    );
    return MinTag;
  },
};
</script>
