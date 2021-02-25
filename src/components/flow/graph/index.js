import { Graph, FunctionExt, Shape, Addon } from '@antv/x6'
import './shape'
// import graphData from './data'

export default class FlowGraph {
// 类构造方法
  constructor () {
    this.initGraph()
    this.initStencil()
    this.initShape()
    // this.initGraphShape()
    // this.initEvent()
  }

  // 初始化面板
  initGraph () {
    this.graph = new Graph({
      container: document.getElementById('container'),
      width: document.getElementById('canvas-panel').scrollWidth,
      height: document.getElementById('canvas-panel').scrollHeight,
      scroller: {
        enabled: true,
      },
      //小地图展示
      minimap: {
        enabled: true,
        container: document.getElementById('minimapContainer'),
      },
      //滚轮缩放画布
      mousewheel: {
        enabled: true,
        // modifiers: ['ctrl', 'meta'],//按键修饰符
      },
      // 格子属性
      grid: {
        size: 10,
        visible: true,
        type: 'doubleMesh',
        args: [
          {
            color: '#cccccc',
            thickness: 1
          },
          {
            color: '#999999',
            thickness: 1,
            factor: 4
          }
        ]
      },
      selecting: {
        enabled: true,
        multiple: true,
        rubberband: true,
        movable: true,
        showNodeSelectionBox: true
      },
      connecting: {
        anchor: 'center',
        connectionPoint: 'anchor',
        allowBlank: false,
        highlight: true,
        snap: true,
        // 连线
        createEdge () {
          return new Shape.Edge({
            attrs: {
              line: {
                stroke: '#5F95FF',
                strokeWidth: 1,
                targetMarker: {
                  name: 'classic',
                  size: 8
                }
              }
            },
            router: {
              name: 'manhattan'
            }
          })
        },
        validateConnection ({
          sourceView,
          targetView,
          sourceMagnet,
          targetMagnet
        }) {
          if (sourceView === targetView) {
            return false
          }
          if (!sourceMagnet) {
            return false
          }
          if (!targetMagnet) {
            return false
          }
          return true
        }
      },
      highlighting: {
        magnetAvailable: {
          name: 'stroke',
          args: {
            padding: 4,
            attrs: {
              strokeWidth: 4,
              stroke: 'rgba(223,234,255)'
            }
          }
        }
      },
      snapline: true,
      history: true,
      clipboard: {
        enabled: true
      },
      keyboard: {
        enabled: true
      },
      embedding: {
        enabled: true,
        findParent ({ node }) {
          const bbox = node.getBBox()
          return this.getNodes().filter((node) => {
            // 只有 data.parent 为 true 的节点才是父节点
            const data = node.getData()
            if (data && data.parent) {
              const targetBBox = node.getBBox()
              return bbox.isIntersectWithRect(targetBBox)
            }
            return false
          })
        }
      }
    })
  }
  // 初始化左侧组件
  initStencil () {
    this.stencil = new Addon.Stencil({
      target: this.graph,
      stencilGraphWidth: 280,
      search: { rect: true },
      collapsable: true,
      groups: [
        {
          name: 'basic',
          title: '基础节点',
          graphHeight: 180
        },
        {
          name: 'combination',
          title: '组合节点',
          layoutOptions: {
            columns: 1,
            marginX: 60
          },
          graphHeight: 260
        },
        {
          name: 'group',
          title: '节点组',
          graphHeight: 100,
          layoutOptions: {
            columns: 1,
            marginX: 60
          }
        }
      ]
    })
    const stencilContainer = document.querySelector('#stencil')
    if (stencilContainer) {
      stencilContainer.appendChild(this.stencil.container)
    }
  }
  // 数据加载给面板和左侧组件输出化数据
  initShape () {
    const r1 = this.graph.createNode({
      shape: 'flow-chart-rect',
      attrs: {
        body: {
          fill: 'yellow',
          rx: 24,
          ry: 24
        },
        text: {
          text: '起始节点'
        }
      }
    })
    const r2 = this.graph.createNode({
      shape: 'flow-chart-rect',
      attrs: {
        text: {
          text: '流程节点'
        }
      }
    })
    const r3 = this.graph.createNode({
      shape: 'flow-chart-rect',
      width: 52,
      height: 52,
      angle: 45,
      attrs: {
        'edit-text': {
          style: {
            transform: 'rotate(-45deg)'
          }
        },
        text: {
          text: '判断节点',
          transform: 'rotate(-45deg)'
        }
      },
      ports: {
        groups: {
          top: {
            position: {
              name: 'top',
              args: {
                dx: -26
              }
            }
          },
          right: {
            position: {
              name: 'right',
              args: {
                dy: -26
              }
            }
          },
          bottom: {
            position: {
              name: 'bottom',
              args: {
                dx: 26
              }
            }
          },
          left: {
            position: {
              name: 'left',
              args: {
                dy: 26
              }
            }
          }
        }
      }
    })
    const r4 = this.graph.createNode({
      shape: 'flow-chart-rect',
      width: 70,
      height: 70,
      attrs: {
        body: {
          fill: 'red',
          rx: 35,
          ry: 35
        },
        text: {
          text: '链接节点'
        }
      }
    })

    const c1 = this.graph.createNode({
      shape: 'flow-chart-image-rect'
    })
    const c2 = this.graph.createNode({
      shape: 'flow-chart-title-rect'
    })
    const c3 = this.graph.createNode({
      shape: 'flow-chart-animate-text'
    })

    const g1 = this.graph.createNode({
      shape: 'groupNode',
      attrs: {
        text: {
          text: 'Group Name'
        }
      },
      data: {
        parent: true
      }
    })
    this.stencil.load([r1, r2, r3, r4], 'basic')
    this.stencil.load([c1, c2, c3], 'combination')
    this.stencil.load([g1], 'group')
  }
}
