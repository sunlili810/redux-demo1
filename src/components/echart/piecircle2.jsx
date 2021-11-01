import React, { Component } from 'react';
import echarts from 'echarts';
import PropTypes from 'prop-types';
import $ from 'jquery';

let pieChart = echarts;

class PageComponent extends Component {
  static resizePie(chartid) {
    const pieInstance = echarts.getInstanceByDom(document.getElementById(chartid));
    pieInstance.resize();
  }
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id
    };
    this.resizePie = this.resizePie.bind(this);
  }
  componentDidMount() {
    window[this.props.id] = echarts.init(document.getElementById(this.props.id));
    const that = this;
    this.initPie();
    $(window).on('resize', () => {
      window[that.props.id].resize();
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.props = nextProps;
      this.initPie();
    }
  }

  componentWillUnmount() {
    $(window).off('resize');
    window[this.props.id] = null;
  }
  resizePie() {
    const pieInstance = echarts.getInstanceByDom(document.getElementById(this.props.id));
    pieInstance.resize();
  }

  initPie() {
    const { param } = this.props;
    const that = this;
   const colorslist =  param.colors === undefined ? ['#67FAF2', '#FDE102', '#3F79FE', '#FE99E3', '#28DDFC', '#6c85bd', '#bac3d2', '#f45c47']:param.colors;
     window[this.props.id].sum = 0
    param.seriesData.forEach(item => {
      window[this.props.id].sum += (item.value-1);
    });
    const option = {
      title: {
        text: param.titleTxt === undefined ? '':param.titleTxt,
        padding: 10,
        x:'center',
        y:10,
        textStyle: { //主标题文本样式{"fontSize": 18,"fontWeight": "bolder","color": "#333"}
          fontFamily: 'Microsoft YaHei',
          fontSize: 15,
          fontStyle: 'normal',
          fontWeight: 'normal',
          color:'#fff'
        },
      },
      legend: {
         orient: 'vertical',
         top: 'middle',
       // icon:"circle",
        itemHeight: 8,
        itemWidth: 10,
        //bottom: 10,
        x:param.x=== undefined ? 'center':param.x,
        textStyle:{
          rich:{
            a:{
              fontSize:12,
              color:"#2E2E2E",
              padding:0
            },
            b:{
              fontSize:12,
              color:"#2E2E2E"
            }
          }
        },
        formatter:function(name){
          let target;
          for(let i=0;i<param.seriesData.length;i++){
            if(param.seriesData[i].name===name){
              target=param.seriesData[i].value
            }
          }
          //let arr=["{a|"+target+"}","{b|"+name+"}"]
          let arr=["{b|"+(name.length > 4 ? (name.slice(0, 4)) : name)+"}"  +"  "+  "{a|"+target+"}"  ]
         // return arr.join("\n")
          return arr

        },
        data: param.legendData === undefined ? []:param.legendData
      },
      color:  colorslist,
      //  [
      //  new echarts.graphic.LinearGradient(1, 1, 0, 0, [{
      //    offset: 0,
      //    color: colorslist[0]
      //  },
      //    {
      //      offset: 0.9,
      //      color: colorslist[1]
      //    }]), new echarts.graphic.LinearGradient(1, 1, 0, 0, [{
      //    offset: 0,
      //    color: colorslist[2]
      //  },
      //    {
      //      offset: 0.9,
      //      color: colorslist[3]
      //    }])
      //],
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
        //formatter: function (param){
        //  const tempVal=param.value-1;
        //  const tempPercent= tempVal === 0 ? '0%':parseInt(tempVal/(window[that.props.id].sum)*100)+'%'
        //  return param.name+': '+ (param.value - 1)+'('+tempPercent+')'
        //}
      },
      // 圆环中间字
      graphic: {
        show: true,
        type: 'text',
        top: 'center',
        left: param.graphicX === undefined ? 'center':(param.graphicX),
        style: {
          text: param.seriesData.length=== 4 ? (param.seriesData)[0].value+(param.seriesData)[1].value+(param.seriesData)[2].value+(param.seriesData)[3].value:(param.seriesData)[0].value,
          fill: param.centerFontColor ? param.centerFontColor:'#2B2A2A',
          fontSize: 16, // 字体大小
          fontFamily: 'Microsoft YaHei',
         // fontStyle: 'italic'
        }
      },
      // legend: {
      //   orient: 'vertical',
      //   right: '20%',
      //   y: 'center',
      //   data: param.legendData,
      //   // 图例图形
      //   itemWidth: 10,
      //   itemHeight: 10,
      //   itemGap: 10,
      //   // 图例文字两种样式处理
      //   formatter(name) {
      //     let total = 0;
      //     let target;
      //     for (let i = 0, l = param.seriesData.length; i < l; i += 1) {
      //       total += parseFloat(param.seriesData[i].value);
      //       if (param.seriesData[i].name === name) {
      //         target = param.seriesData[i].value;
      //       }
      //     }
      //     const arr = [
      //       `{a|${name}}`,
      //       `{b|  (${((target / total) * 100).toFixed(2)}%)}`
      //     ];
      //     return arr.join('');
      //   },
      //   textStyle: {

      //     color: '#fff',
      //     fontFamily: 'fzcq',
      //     rich: {
      //       a: {
      //         padding: 7,
      //         fontSize: 14
      //       },
      //       b: {
      //         fontSize: 18,
      //         fontFamily: 'fzcq',
      //         fontStyle: 'italic',
      //         color: '#00F4FE'
      //       }
      //     }
      //   }

      // },
      series: [
        {
          name: '数量',
          type: 'pie',
          radius: param.radius=== undefined?'50%':param.radius,
          center:param.center === undefined ? ['50%', '50%']:param.center,
          roseType: 'radius',
          //minAngle:40,
          minRadius:40,
          labelLine: {
            normal: {
              show: false
            }
          },
          label: {
            normal: {
              show: false,//扇形上文字
              position: 'inner'
            },
            emphasis: {
              show: false,
              textStyle: {
                fontSize: '20',
                fontWeight: 'bold'
              }
            }
          },
          data: param.seriesData,
          itemStyle: {
            // 饼图区域间距
            normal: {
              borderColor: '#071A41',
              borderWidth: param.paddingWidth === undefined ? 0 : param.paddingWidth
            },
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };

    window[this.props.id].setOption(option);
  }

  render() {
    return (
      <div id={this.state.id} style={{height:'100%'}} />
    );
  }
}

PageComponent.propTypes = {
  param: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired
};
export default PageComponent;
