<script>
import {
  on,
  off,
  getScrollContainer,
  isInContainer,
} from "../../../src/utils/dom";
import ImgPreview from "./img-preview";
import { isString, isHtmlElement } from "../../../src/utils/istypes";
import { throttle } from "throttle-debounce";
// 是否支持object-fit属性
const hasObjectfit = () =>
  document.documentElement.style.objectFit !== undefined;
let previousBody = "";

export default {
  name: "MinImg",
  inheritAttrs: false,
  data() {
    return {
      loading: false,
      fail: false,
      immediately: !this.lazy,
      imgWidth: 0,
      imgHeight: 0,
      showPreview: false,
    };
  },
  components: {
    ImgPreview,
  },
  props: {
    src: String,
    mode: String,
    width: {
      type: [String, Number],
      default: 200,
    },
    height: {
      type: [String, Number],
      default: 200,
    },
    lazy: Boolean,
    zIndex: {
      type: [Number, String],
      default: 2000,
    },
    container: {},
    previewData: {
      type: Array,
      default: () => [],
    },
    radius: String,
  },
  computed: {
    handleStyle() {
      if (!this.$isServer && this.mode) {
        return hasObjectfit()
          ? { "object-fit": this.mode, "border-radius": `${this.radius}px` }
          : this.handleImgMode(this.mode);
      }
      return {};
    },
    preview() {
      const { previewData } = this;
      return Array.isArray(previewData) && previewData.length > 0;
    },
    isCenter() {
      return !this.$isServer && this.mode !== "fill";
    },
    imgIndex() {
      let previewIndex = 0;
      const srcIndex = this.previewData.indexOf(this.src);
      if (srcIndex >= 0) {
        previewIndex = srcIndex;
      }
      return previewIndex;
    },
  },
  watch: {
    immediately(val) {
      val && this.loadImg();
    },
    src() {
      this.immediately && this.loadImg();
    },
  },
  mounted() {
    if (this.lazy) {
      this.addLazyLoad();
    } else {
      this.loadImg();
    }
  },
  beforeDestroy() {
    this.lazy && this.removeLazyLoad();
  },
  methods: {
    loadImg() {
      if (this.$isServer) return;

      this.loading = true;
      this.fail = false;
      const img = new Image();
      img.onload = (e) => this.handleLoad(e, img);
      img.onerror = this.handleFail.bind(this);

      Object.keys(this.$attrs).forEach((key) => {
        const val = this.$attrs[key];
        img.setAttribute(key, val);
      });
      img.src = this.src;
    },
    handleLoad(e, img) {
      this.imgWidth = img.width;
      this.imgHeight = img.height;
      this.loading = false;
      this.fail = false;
    },
    handleFail(e) {
      this.loading = false;
      this.fail = true;
      this.$emit("fail", e);
    },
    addLazyLoad() {
      // console.log("123");
      if (this.$isServer) return;
      const { container } = this;
      let _container = null;
      if (isHtmlElement(container)) {
        _container = container;
      } else if (isString(container)) {
        _container = document.querySelector(container);
      } else {
        _container = getScrollContainer(this.$el);
      }
      // console.log(_container);
      if (_container) {
        this._container = _container;
        this._handleLazyLoad = throttle(500, this.handleLazyLoad);
        on(_container, "scroll", this._handleLazyLoad);
        this.handleLazyLoad();
      }
    },
    handleLazyLoad() {
      // console.log(isInContainer(this.$el, this._container));
      if (isInContainer(this.$el, this._container)) {
        this.immediately = true;
        this.removeLazyLoad();
      }
    },
    removeLazyLoad() {
      const { _container, _handleLazyLoad } = this;
      if (this.$isServer || !_container || _handleLazyLoad) return;
      off(_container, "scroll", _handleLazyLoad);
      this._container = null;
      this._handleLazyLoad = null;
    },
    handleImgMode(mode) {
      const { imgWidth, imgHeight } = this;
      const {
        clientWidth: containerWidth,
        clientHeight: containerHeight,
      } = this.$el;
      if (!imgWidth || !imgHeight || !containerWidth || !containerHeight)
        return {};
      const vertical = imgWidth / imgHeight < 1;

      if (mode === "scale-down") {
        const smaller =
          imgWidth < containerWidth && imgHeight < containerHeight;
        mode = smaller ? "none" : "contain";
      }

      switch (mode) {
        case "none":
          return {
            width: "auto",
            height: "auto",
          };
        case "contain":
          return vertical ? { width: "auto" } : { height: "auto" };
        case "cover":
          return vertical ? { height: "auto" } : { width: "auto" };
        default:
          return {};
      }
    },
    handleClick() {
      if (!this.preview) return;
      previousBody = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      this.showPreview = true;
    },
    closePreview() {
      document.body.style.overflow = previousBody;
      this.showPreview = false;
      console.log(1);
    },
  },
  render() {
    const {
      loading,
      fail,
      $listeners,
      $attrs,
      handleClick,
      $slots,
      height,
      width,
      isCenter,
      zIndex,
      src,
      preview,
      imgIndex,
      closePreview,
      showPreview,
      previewData,
      handleStyle,
    } = this;
    let imgEle;

    if (loading) {
      imgEle = (
        <div class="min-img-loading ">
          {$slots.loading ? $slots.loading : <span>Image is loading...</span>}
        </div>
      );
    } else if (fail) {
      imgEle = (
        <div class="min-img-fail ">
          {$slots.fail ? (
            $slots.fail
          ) : (
            <span>
              Failed to load image
              <i class="min-icon-picture-outline"></i>
            </span>
          )}
        </div>
      );
    } else {
      imgEle = (
        <div class="min-img-box">
          <img
            attrs={$attrs}
            class={[
              "min-img-success",
              {
                "min-img-success-center": isCenter,
                "el-image__preview": preview,
              },
            ]}
            onClick={handleClick}
            style={handleStyle}
            src={src}
            on={$listeners}
          />
          {showPreview && (
            <ImgPreview
              z-index={zIndex}
              inittial-index={imgIndex}
              close={closePreview}
              url-list={previewData}
            />
          )}
        </div>
      );
    }

    return (
      <div
        class="min-img"
        style={{ width: `${width}px`, height: `${height}px` }}
      >
        {imgEle}
      </div>
    );
  },
};
</script>
