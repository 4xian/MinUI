<template>
  <div id="app">
    <div class="test-btn">
      <min-button size="0.5" text="green">按钮</min-button>
      <min-button simple="gray" size="0.5">Button</min-button>
      <min-button type="blue">默认按钮</min-button>
      <min-button>默认按钮</min-button>
      <min-button type="yellow">上一页</min-button>
      <min-button type="red">下一页</min-button>
      <min-button type="green">默认按钮</min-button>
      <min-button type="blue" size="1.2">
        <i>@</i>
      </min-button>
      <min-button type="red" size="2" @click="testBtn" disabled
        >Apple</min-button
      >
    </div>

    <div class="test-tag">
      <min-tag text="red">
        默认标签
      </min-tag>
      <min-tag text="blue">
        默认标签
      </min-tag>
      <min-tag simple="info">
        默认标签
      </min-tag>
      <min-tag simple="default" underline>
        默认标签
      </min-tag>
      <min-tag simple="green">
        默认标签
      </min-tag>
      <min-tag simple="yellow">
        默认标签
      </min-tag>
      <min-tag simple="red">
        默认标签
      </min-tag>
      <min-tag>
        默认标签
      </min-tag>
      <min-tag type="blue">
        默认标签
      </min-tag>
      <min-tag type="red">
        默认标签
      </min-tag>
      <min-tag type="info">
        默认标签
      </min-tag>
      <min-tag type="yellow" close @close="iconClose">
        默认标签
      </min-tag>
      <min-tag type="green" @close="iconClose">
        默认标签
      </min-tag>
    </div>

    <div class="test-tag">
      <min-link underline href="http://www.baidu.com">
        默认连接
      </min-link>
      <min-link disabled>
        默认连接
      </min-link>
      <min-link color="red" bold size="1.5" @click="testLink">
        默认连接
        <template slot="img">
          <img src="./assets/logo.png" width="20" height="20" />
        </template>
      </min-link>
    </div>

    <div class="test-tag">
      <min-mark content="9">
        <min-button>默认按钮</min-button>
      </min-mark>
      <min-mark :content="66" :max="50">
        <min-button type="blue">默认按钮</min-button>
      </min-mark>
      <min-mark content="new" bgColor="orange">
        <min-button type="red">默认按钮</min-button>
      </min-mark>
      <min-mark dot :visible="false">
        <min-button type="yellow">默认按钮</min-button>
      </min-mark>
    </div>
    <div class="test-tag">
      <!-- <min-text-tip>
        <min-button>默认按钮</min-button>
      </min-text-tip> -->
      <min-text-tip position="left">
        <div slot="content">我是一个提示<br />我是一个提示我是一个提示</div>
        <min-button type="blue">默认按钮默认按钮</min-button>
      </min-text-tip>
      <min-text-tip position="top">
        <div slot="content">我是一个提示<br />我是一个提示我是一个提示</div>
        <min-button type="blue">默认按钮默认按钮</min-button>
      </min-text-tip>
      <min-text-tip position="bottom">
        <div slot="content">我是一个提示<br />我是一个提示我是一个提示</div>
        <min-button type="blue">默认按钮默认按钮</min-button>
      </min-text-tip>
      <min-text-tip position="right">
        <div slot="content">我是一个提示<br />我是一个提示我是一个提示</div>
        <min-button type="blue" size="1.5">默认按钮默认按钮</min-button>
      </min-text-tip>
    </div>

    <div class="test-line">
      <min-line position="left">
        start
      </min-line>
      <!-- <span>这是尼日尔</span> -->
      <min-line color="red">
        center
      </min-line>
      <min-line color="red"> </min-line>
      <!-- <span>这是尼日尔</span> -->
      <min-line position="right" color="blue">
        end
      </min-line>
      <min-line direction="vertical" color="blue" position="top"> </min-line>
      <span>这是部分内容</span>
      <min-line direction="vertical" color="red" position="center"> </min-line>
      <span>这是部分内容</span>
      <min-line direction="vertical" color="orange" position="bottom">
      </min-line>
    </div>
  </div>
</template>

<script>
import MinButton from "../packages/Button/src/button";
import MinTag from "../packages/Tag/src/tag";
import MinLink from "../packages/Link/src/link";
import MinMark from "../packages/Mark/src/mark";
import MinTextTip from "../packages/TextTip/src/textTip";
import MinLine from "../packages/Line/src/line";

export default {
  name: "App",
  components: {
    MinButton,
    MinTag,
    MinLink,
    MinMark,
    MinTextTip,
    MinLine,
  },
  methods: {
    testBtn(e) {
      console.log(e);
    },
    iconClose(e) {
      console.log(e);
    },
    testLink(e) {
      console.log(e);
    },
  },
};
</script>

<style>
#app {
  font-family: "Apple";
  /* font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: #2c3e50;
  margin-top: 60px;
  letter-spacing: 1px;
  /* line-height: 1.5; */
  font-weight: 500;
}
.test-btn,
.test-tag {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px 0;
  width: 100%;
  /* height: 100px; */
}
.test-line {
  height: 100px;
  margin: 10px 0;
  width: 100%;
}
</style>
