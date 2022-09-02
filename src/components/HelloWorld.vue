<script setup lang="ts">
import * as echarts from 'echarts'
import { onMounted } from 'vue'

onMounted(() => {
  let myEchart = echarts.init(document.getElementById('test') as HTMLElement, 'dark')
  let a = 2
  let total = 0
  let newOption = []
  let i = 0
  const data = [
    {
      value: 1048, name: '强力除尘'
    },
    { value: 735, name: '消毒仓净化' },
    { value: 580, name: '光氢离子净化' },
    { value: 580, name: '紫外空气消毒' },
    { value: 484, name: '消毒循环' },
    { value: 300, name: '消毒后处理' }
  ]
  const options = {
    title: [{
      show: true,
      text: '{a|总时长}\n\n222244',
      left: '45%',
      top: '30%',
      textStyle: {
        rich: {
          a: { fontSize: '15' }
        }
      },
    }],
    tooltip: {
      trigger: 'item',
      show: false,
      // formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
      top: 'bottom',
      left: 'center',
      orient: 'vertical',
      type: 'scroll',
      formatter: (name: string) => {
        if (total === 0) {
          options.series[0].data.forEach(item => {
            total += item.value
          })
        }
        let pie: string = ''
        let val: number = 0
        options.series[0].data.forEach(item => {
          if (item.name === name) {
            pie = ((item.value / total) * 100).toFixed(2)
            val = item.value
          }
        })
        if (newOption.length > 0) {
          options.series[0].data.forEach(item => { })
        }

        return name === 's' ? '' : `${name} ${pie}% ${val}h`
      },
      disabled: false,
      show: true,
      icon: "circle",
      selectedMode: true,
      tooltip: {
        show: true
      },
    },
    series: [
      {
        name: '数据可视化',
        type: 'pie',
        radius: ['70px', '100px'],
        avoidLabelOverlap: true,
        top: '-30%',
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: {
          show: false,
          // position: 'center',
          // formatter: (params) => {
          //   return `{a|总时长}\n{c|${total}}`
          // },
          // rich: {
          //   a: {
          //     fontSize: '20'
          //   },
          //   c: {
          //     color: 'gray'
          //   }
          // },
          // selectedMode: false
        },
        tooltip: {
          show: true
        },
        // emphasis: {
        //   label: {
        //     show: true,
        //     fontSize: '20',
        //     fontWeight: 'bold',
        //     positon: 'center'
        //   },
        //   focus: 'self',
        //   disabled: false
        // },
        // labelLine: {
        //   show: true
        // },
        data: [
          {
            value: 1048, name: '强力除尘'
          },
          { value: 735, name: '消毒仓净化' },
          { value: 580, name: '光氢离子净化' },
          { value: 580, name: '紫外空气消毒' },
          { value: 484, name: '消毒循环' },
          { value: 300, name: '消毒后处理' }
        ],
        // tooltip: {
        //   position: [10, 10]
        // }
      }
    ]
  };
  let currentIndex = -1;
  myEchart.setOption((options), true)
  // myEchart.on('mouseover', (params) => {
  //   console.log(params)
  // })
  myEchart.dispatchAction({
    type: 'pieselectchanged',
    tooltip: {
      show: true
    }
  })
  myEchart.on('legendselectchanged', (params: any) => {
    total = 0
    let optionCopy = Object.create(options)
    console.log(optionCopy === options)
    for (let item in params.selected) {
      if (params.selected[item] === false) {
        for (let ot in optionCopy.series[0].data) {
          if (optionCopy.series[0].data[ot].name === item) {
            optionCopy.series[0].data[ot].value = 0

          }
        }
      } else {
        for (let k in data) {
          if (data[k].name === item) {
            optionCopy.series[0].data[k].value = data[k].value
          }
        }
      }
    }
    myEchart.setOption(optionCopy)
  })
  // myEchart.getZr().on('click', function (event) {
  //   options.series[0].data[0].value = 0
  //   myEchart.setOption(options)
  // })
  // myEchart.dispatchAction({
  //   type: 'highlight',
  //   seriesIndex: 0,
  //   dataIndex: currentIndex
  // });

  // setInterval(function () {
  //   var dataLen = 6
  //   // 取消之前高亮的图形
  //   myEchart.dispatchAction({
  //     type: 'downplay',
  //     seriesIndex: 0,
  //     dataIndex: currentIndex
  //   });
  //   currentIndex = (currentIndex + 1) % dataLen;
  //   // 高亮当前图形
  //   myEchart.dispatchAction({
  //     type: 'highlight',
  //     seriesIndex: 0,
  //     dataIndex: currentIndex
  //   });
  //   // 显示 tooltip
  //   myEchart.dispatchAction({
  //     type: 'showTip',
  //     seriesIndex: 0,
  //     dataIndex: currentIndex
  //   });
  // }, 1000);
})
</script>

<template>
  <div id="test" style="width: 500px;height: 400px;"></div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
