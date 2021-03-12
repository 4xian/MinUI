<script>
/*  超链接:
    props:{
        color: 字符串,自定义颜色, 值为#xxxxx,rgb()都可;
        underline: 布尔值, 鼠标悬浮时是否需要下划线;
        size: 字符串或数字, 字体的大小,默认12px, size默认为1  即12px * 1; 需要24px字体则size为2即可;
        disabled: 布尔值, 是否可点击;
        href: 原生属性,填入前往的链接地址即可;
        target: 原生属性, 打开链接的方式, 默认打开新窗口;
        bold: 字体是否加粗.
    }
    slot:{
        name:img 可添加图片
    }
    事件:{
        click:点击事件
    }
*/
export default {
  name: "MinLink",
  data() {
    return {};
  },
  props: {
    color: {
      type: String,
      default: "#007aff",
    },
    underline: {
      type: Boolean,
      default: false,
    },
    size: {
      type: [String, Number],
      default: "1",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    href: {
      type: String,
      default: null,
    },
    target: {
      type: String,
      default: "_blank",
    },
    bold: Boolean,
  },
  methods: {
    handleClick(e) {
      if (!this.disabled) {
        if (this.href !== null) {
          this.$emit("click", e);
        }
      }
    },
  },
  render() {
    const {
      disabled,
      color,
      size,
      underline,
      href,
      target,
      bold,
      handleClick,
      $slots,
    } = this;
    const linkClass = [
      "min-link",
      {
        "has-underline": underline,
        "has-disabled": disabled,
        "has-bold": bold,
      },
    ];
    const linkStyle = {
      color: color ? color : "",
      fontSize: size ? `${12 * size}px` : "12px",
    };
    const MinLink = (
      <a
        href={disabled ? null : href}
        target={target}
        onClick={handleClick}
        class={linkClass}
        style={linkStyle}
      >
        {$slots.default}
        {$slots.img}
      </a>
    );
    return MinLink;
  },
};
</script>
