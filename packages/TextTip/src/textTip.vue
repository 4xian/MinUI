<script>
/*  文字提示:
    props:{
        content: 提示的内容, 也可使用slot name='content' 使用slot时可显示多行内容;
        position: 提示框的位置 top bottom left right ;
        bgColor: 提示框的背景色 ;

    }

*/

export default {
  name: "MinTextTip",
  data() {
    return {
      show: false,
    };
  },
  props: {
    content: {
      type: String,
      default: "",
    },
    position: {
      type: String,
      default: "top",
    },
    bgColor: {
      type: String,
      default: "#000000",
    },
  },

  computed: {},
  methods: {
    handleShowTip() {
      this.show = true;
    },
    handleCloseTip() {
      this.show = false;
    },
  },
  render() {
    const { content, $slots, position, handleShowTip, handleCloseTip } = this;
    const textTip = (
      <transition name="fade-transform" mode="out-in">
        <div
          class={["min-text-tip ", this.show ? `min-text-tip-${position}` : ""]}
          onMouseenter={handleShowTip}
          onMouseleave={handleCloseTip}
        >
          {this.show && (
            <div class={["min-text-tip-item", `is-${position} `]}>
              {content || $slots.content}
            </div>
          )}
          {$slots.default}
        </div>
      </transition>
    );
    return textTip;
  },
};
</script>
