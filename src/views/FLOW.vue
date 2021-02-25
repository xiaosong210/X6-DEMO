<template>
  <div class="flow">
    <div class="header">X6-流程图DEMO</div>
    <div class="content">
      <!--左侧工具栏-->
      <div id="stencil" class="sider" />
      <!--画布组件-->
      <div id="canvas-panel" class="panel">
        <!--<div class="toolbar">-->
        <!--  <tool-bar :flowGraph="flowGraph" />-->
        <!--</div>-->
        <!--绘图面板组件-->
        <div id="container" class="x6-graph"/>
        <!--小地图容器-->
        <div id="minimapContainer" class="minimap"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import FlowGraph from '@/components/flow/graph/index'
// @ is an alias to /src

export default {
  name: 'Home',
  data(){
    return{
      flowGraph: null
    }
  },
  mounted () {
    this.init();//初始化画布
  },
  methods: {
    init () {
      this.flowGraph = new FlowGraph()
    }
  }
}
</script>

<style lang="stylus" scoped>
.flow
  height: 100%
  width: 100%
  .header
    display flex
    padding-left 32px
    height 48px
    line-height: 48px
    box-shadow: 0 2px 6px 0 rgba(0,0,0,.1);
  .content
    position relative
    display: flex;
    height: calc(100% - 48px);
    .sider
      position: relative;
      width: 290px;
      height: 100%;
      border-right: 1px solid rgba(0,0,0,.08);
    .panel
      flex 1
    .minimap
      position absolute
      width: 300px
      height: 200px
      left:300px
      bottom 20px
</style>
