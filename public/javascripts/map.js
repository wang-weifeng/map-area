var map = {};

map.init = function () {
    map.bindEvent();
    map.renderMap();
};

map.bindEvent = function () {

}

map.renderMap = function () {
    $.get('/v1/map', function (result) {
        if (result.status === 200) {
            var total = [];
            var total_name = [];
            result.data[0].forEach(function (item) {
                var everyVal = {};
                everyVal.name = item.name;
                everyVal.data = item.data;
                everyVal.type = "map";
                everyVal.mapType = "china";
                everyVal.itemStyle = {
                    normal: { label: { show: true } },
                    emphasis: { label: { show: true } }
                };
               total.push(everyVal);
               total_name.push(item.name);
            });
            console.log(total);
            console.log(total_name);
            var myChart = echarts.init(document.getElementById('main'));
            option = {
                title: {
                    text: '全国分布图',
                    subtext: '如图',
                    x: 'center'
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient: 'vertical',
                    x: 'left',
                    data: total_name
                },
                dataRange: {
                    min: 0,
                    max: 2500,
                    x: 'left',
                    y: 'bottom',
                    text: ['高', '低'],           // 文本，默认为数值文本
                    calculable: true
                },
                toolbox: {
                    show: true,
                    orient: 'vertical',
                    x: 'right',
                    y: 'center',
                    feature: {
                        mark: { show: true },
                        dataView: { show: true, readOnly: false },
                        restore: { show: true },
                        saveAsImage: { show: true }
                    }
                },
                roamController: {
                    show: true,
                    x: 'right',
                    mapTypeControl: {
                        'china': true
                    }
                },
                series: total
            };

            myChart.setOption(option);
        }
    })
}

$(function () {
    map.init();
});