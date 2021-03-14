<script>
/*  文字提示:
    props:{
        content: 提示的内容, 也可使用slot name='content' 使用slot时可显示多行内容;
        position: 提示框的位置 top bottom left right ;
        bgColor: 提示框的背景色 ;
        trigger: 触发提示框的方式: 鼠标悬浮,点击
    }

*/
import { offListener, onListener } from "../../../src/utils/handleDom";

export default {
  name: "MinTextTip",
  data() {
    return {
      show: false,
      tempEle: null,
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
    trigger: {
      type: String,
      default: "hover",
      validator: (value) => ["click", "hover"].indexOf(value) > -1,
    },
    animation: {
      type: Boolean,
      default: true,
    },
  },

  computed: {},
  mounted() {
    onListener(this.$refs.textTip, "click", this.handleClickTip);
  },
  methods: {
    handleHoverTip() {
      if (this.trigger === "hover") {
        this.show = true;
      }
    },
    handleCloseTip() {
      if (this.trigger === "hover") {
        this.show = false;
      }
    },
    handleClickTip(e) {
      this.tempEle = e.target;
      this.show = !this.show;
      onListener(document, "click", this.handleDocumentClick);
    },
    handleDocumentClick(e) {
      if (this.tempEle == e.target) return;
      this.show = false;
    },
  },
  destroyed() {
    offListener(document, "click", this.handleDocumentClick);
    offListener(this.$refs.textTip, "click", this.handleClickTip);
  },
  render() {
    const {
      content,
      $slots,
      position,
      handleHoverTip,
      handleCloseTip,
      animation,
    } = this;
    const textTip = (
      <div
        ref="textTip"
        class={["min-text-tip ", this.show ? `min-text-tip-${position}` : ""]}
        onMouseenter={handleHoverTip}
        onMouseleave={handleCloseTip}
      >
        {this.show && (
          <transition name="texttip-opacity">
            <div
              class={[
                "min-text-tip-item",
                `is-${position} `,
                { "text-tip-animation": animation },
              ]}
            >
              {content || $slots.content}
            </div>
          </transition>
        )}
        {$slots.default}
      </div>
    );
    return textTip;
  },
};
</script>
