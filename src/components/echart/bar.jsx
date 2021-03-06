import React, { Component } from 'react';
import echarts from 'echarts';
// import PropTypes from 'prop-types';
import $ from 'jquery';

class PageComponent extends Component {
  // constructor(props) {
  //   super(props);
  // }
  componentDidMount() {
    window[this.props.id] = echarts.init(document.getElementById(this.props.id));
    this.initLines();
    const that = this;
    $(window).on('resize', () => {
      window[that.props.id].resize();
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.props = nextProps;
      this.initLines();
    }
  }

  componentWillUnmount() {
    $(window).off('resize');
    window[this.props.id] = null;
  }

  initLines() {
    const { param } = this.props;
    const colors = ['#138760','#89B45A','#6F7C85','#2EBDFF', '#53FED9', '#60B1CC', '#CFA448', '#6ED6C2', '#6C85BD', '#BAC3D2', '#F45C47'];
    const tempArry = [];
    param.serrydata.map((item,index) => {
      const tempObj = {};
      tempObj.type = 'bar';
      tempObj.areaStyle = item.areaStyle === null ? null : {
        normal: {
          color: '#EFF9FC'
        }
      };
      tempObj.smooth = item.smooth ? item.smooth : false;
      tempObj.symbolSize = item.symbolSize ? item.symbolSize : 5;
      tempObj.name = item.name;
      tempObj.barWidth = item.barWidth === undefined ? 10 : item.barWidth;// x轴柱状的宽度
      tempObj.label = {
        normal: {
          show: false,
          color: '#800000',
          position: 'top' // 显示在头部的每条y轴的值
        }
      };
      if (item.yAxisIndex !== undefined) {
        tempObj.yAxisIndex = item.yAxisIndex;
      }
      tempObj.itemStyle = {

        normal: {
          // 柱形图圆角，初始化效果
          barBorderRadius: [5, 5, 0, 0],
        //  color: new echarts.graphic.LinearGradient(
        //    0, 0, 0, 1,
        //    param.LinearGradientColors === undefined ? [
        //  { offset: 0, color: '#0F6CFF' },
        //  { offset: 0.5, color: '#0A35FF' },
        //  { offset: 1, color: '#0603FF' }
        //]:param.LinearGradientColors[index]
        //  ),
          color:colors[index],

          // label: {
          //   show: true, // 是否展示
          //   textStyle: {
          //     fontWeight: 'bolder',
          //     fontSize: '12',
          //     fontFamily: '微软雅黑'
          //   }
        }
      };
      tempObj.data = item.data;
      tempArry.push(tempObj);
      return tempArry;
    });
    const option = {
      title: {
        text: param.title,
        x: '0',
        y:'10',
        textStyle: {
          color: '#7A7A7A',
          fontSize:12
        }
      },
      legend: {
        data:param.legend,
        top: '5%',
        right: '0',
        itemHeight: 8,
        itemWidth: 10,
        formatter: function (name) {
          return (name.length > 6 ? (name.slice(0, 6) + ".") : name);
        },
      },
      color: ['138760','89B45A','6F7C85','#2EBDFF', '#53FED9', '#60B1CC', '#CFA448', '#6ED6C2', '#6C85BD', '#BAC3D2', '#F45C47'],
      tooltip: {
        trigger: 'axis'
      },
      grid: {
        left: '4%',
        right: '8%',
        bottom: '12%',
        top: '20%',
        containLabel: true,
        borderWidth: 0,
        borderColor: '#666666'
      },
      xAxis: [{
        type: param.xAxisType === undefined ? 'category':param.xAxisType,
        axisLabel: {
          textStyle: {
            color: param.colorOption === undefined ? '#800000' : param.colorOption.xTxtColor // x轴，y轴的数字颜色，如图1
          }
        },
        boundaryGap: true, // x轴不从0点开始
        axisLine: {
          onZero: true,
          lineStyle: {
            color: param.colorOption === undefined ? '#800000' : param.colorOption.xLineColor,
            width: 1,
            type: 'solid'
          }
        },
        splitLine: { // 终于找到了，背景图的内置表格中“边框”的颜色线条  竖线
          show: false,
          lineStyle: {
            color: param.colorOption === undefined ? '#666666' : param.colorOption.backgroundLineColor,
            type: 'solid'
          }
        },
        data: param.xdata
      }],
      yAxis: param.yAxis === undefined ? [{
        type: param.yAxisType === undefined ? 'value':param.yAxisType,
        //min: param.yMin ? param.yMin : 0,
        //max: param.yMax ? param.yMax : 0,
        //interval: 100,
        min:0,
        minInterval:1,
        axisLabel: {
          textStyle: {
            color: param.colorOption === undefined ? '#800000' : param.colorOption.yTxtColor,
            fontSize: '12',
            extraCssText: 'line-height:30px'
          },

        },
        axisLine: { // 坐标轴样式
          onZero: true,
          lineStyle: {
            color: param.colorOption === undefined ? '#800000' : param.colorOption.yLineColor,
            width: 1,
            type: 'solid'
          }
        },
        // axisTick: { // 刻度
        //   show: false
        // },
        splitLine: { // 置表格中分割线线条  这个是x跟y轴轴的线
          show: false,
          lineStyle: {
            color: param.colorOption === undefined ? '#800000' : param.colorOption.backgroundLineColor,
            type: 'solid'
          }
        }
      }] : param.yAxis,
      series: tempArry, // param.serrydata
      dataZoom: [{ // 区域缩放
        type: 'inside',
        show: true,
        xAxisIndex: [0],
        start: 0,
        end: 100,
        startValue: 0,
        endValue: 2000
      }]
    };

    // LineChart.setOption(option);
    window[this.props.id].setOption(option);
  }

  render() {
    const { id } = this.props;
    return (
      <div id={id} style={{ width: '98%', height: '100%' }} />
    );
  }
}

// PageComponent.propTypes = {
  // param: PropTypes.object().isRequired
// };
export default PageComponent;
