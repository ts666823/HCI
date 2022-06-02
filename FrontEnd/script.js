var stackAreadom = document.getElementById('stackAreaContainer');
var stackAreaChart = echarts.init(stackAreadom, null, {
    renderer: 'canvas',
    useDirtyRect: false
});
var app = {};

var stackAreaOption;

stackAreaOption = {
    title: {
        text: 'Number of Apps by Category'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
        }
    },
    legend: {
        left: 'right',
        data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
    },
    toolbox: {
        left: 'right',
        top: 'center',
        orient: 'vertical',
        feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar', 'stack'] },
            restore: { show: true },
            saveAsImage: { show: true }
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: [{
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    }],
    yAxis: [{
        type: 'value'
    }],
    series: []
};

stackAreaOption.legend.data = ['Email1', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']

if (stackAreaOption && typeof stackAreaOption === 'object') {
    stackAreaChart.setOption(stackAreaOption);
}

window.addEventListener('resize', stackAreaChart.resize);

var columnDom = document.getElementById('columnContainer');
var columnChart = echarts.init(columnDom, null, {
    renderer: 'canvas',
    useDirtyRect: false
});

var columnOption;

const posList = [
    'left',
    'right',
    'top',
    'bottom',
    'inside',
    'insideTop',
    'insideLeft',
    'insideRight',
    'insideBottom',
    'insideTopLeft',
    'insideTopRight',
    'insideBottomLeft',
    'insideBottomRight'
];
app.configParameters = {
    rotate: {
        min: -90,
        max: 90
    },
    align: {
        options: {
            left: 'left',
            center: 'center',
            right: 'right'
        }
    },
    verticalAlign: {
        options: {
            top: 'top',
            middle: 'middle',
            bottom: 'bottom'
        }
    },
    position: {
        options: posList.reduce(function(map, pos) {
            map[pos] = pos;
            return map;
        }, {})
    },
    distance: {
        min: 0,
        max: 100
    }
};
app.config = {
    rotate: 90,
    align: 'left',
    verticalAlign: 'middle',
    position: 'insideBottom',
    distance: 15,
    onChange: function() {
        const labelOption = {
            rotate: app.config.rotate,
            align: app.config.align,
            verticalAlign: app.config.verticalAlign,
            position: app.config.position,
            distance: app.config.distance
        };
        columnChart.setOption({
            series: [{
                    label: labelOption
                },
                {
                    label: labelOption
                },
                {
                    label: labelOption
                },
                {
                    label: labelOption
                }
            ]
        });
    }
};
const labelOption = {
    show: true,
    position: app.config.position,
    distance: app.config.distance,
    align: app.config.align,
    verticalAlign: app.config.verticalAlign,
    rotate: app.config.rotate,
    formatter: '{c}  {name|{a}}',
    fontSize: 16,
    rich: {
        name: {}
    }
};
columnOption = {
    title: {
        text: 'Highest Rating app'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {
        top: 'top',
        left: 'right',
        data: ['Forest', 'Steppe', 'Desert', 'Wetland']
    },
    toolbox: {
        show: true,
        orient: 'vertical',
        left: 'right',
        top: 'center',
        feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar', 'stack'] },
            restore: { show: true },
            saveAsImage: { show: true }
        }
    },
    xAxis: [{
        type: 'category',
        axisTick: { show: false },
        axisLabel: {
            show: true,
            rotate: 45
        },
        data: ['2012', '2013', '2014', '2015', '2016']
    }],
    yAxis: [{
        type: 'value'
    }],
    series: [{
            name: 'Forest',
            type: 'bar',
            barGap: 0,
            label: labelOption,
            emphasis: {
                focus: 'series'
            },
            data: [320, 332, 301, 334, 390]
        },
        {
            name: 'Steppe',
            type: 'bar',
            label: labelOption,
            emphasis: {
                focus: 'series'
            },
            data: [220, 182, 191, 234, 290]
        },
        {
            name: 'Desert',
            type: 'bar',
            label: labelOption,
            emphasis: {
                focus: 'series'
            },
            data: [150, 232, 201, 154, 190]
        },
        {
            name: 'Wetland',
            type: 'bar',
            label: labelOption,
            emphasis: {
                focus: 'series'
            },
            data: [98, 77, 101, 99, 40]
        }
    ]
};

if (columnOption && typeof columnOption === 'object') {
    columnChart.setOption(columnOption);
}

window.addEventListener('resize', columnChart.resize);

var columnDom1 = document.getElementById('columnContainer1');
var columnChart1 = echarts.init(columnDom1, null, {
    renderer: 'canvas',
    useDirtyRect: false
});

var columnOption1;

columnOption1 = {
    title: {
        text: 'Most Reviews Apps'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {
        top: 'top',
        left: 'right',
        data: ['Forest', 'Steppe', 'Desert', 'Wetland']
    },
    toolbox: {
        show: true,
        orient: 'vertical',
        left: 'right',
        top: 'center',
        feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar', 'stack'] },
            restore: { show: true },
            saveAsImage: { show: true }
        }
    },
    xAxis: [{
        type: 'category',
        axisTick: { show: false },
        axisLabel: {
            show: true,
            rotate: 45
        },
        data: ['2012', '2013', '2014', '2015', '2016']
    }],
    yAxis: [{
        type: 'value'
    }],
    series: [{
            name: 'Forest',
            type: 'bar',
            barGap: 0,
            label: labelOption,
            emphasis: {
                focus: 'series'
            },
            data: [320, 332, 301, 334, 390]
        },
        {
            name: 'Steppe',
            type: 'bar',
            label: labelOption,
            emphasis: {
                focus: 'series'
            },
            data: [220, 182, 191, 234, 290]
        },
        {
            name: 'Desert',
            type: 'bar',
            label: labelOption,
            emphasis: {
                focus: 'series'
            },
            data: [150, 232, 201, 154, 190]
        },
        {
            name: 'Wetland',
            type: 'bar',
            label: labelOption,
            emphasis: {
                focus: 'series'
            },
            data: [98, 77, 101, 99, 40]
        }
    ]
};

if (columnOption1 && typeof columnOption1 === 'object') {
    columnChart1.setOption(columnOption1);
}

window.addEventListener('resize', columnChart1.resize);

var columnDom2 = document.getElementById('columnContainer2');
var columnChart2 = echarts.init(columnDom2, null, {
    renderer: 'canvas',
    useDirtyRect: false
});

var columnOption2;

columnOption2 = {
    title: {
        text: 'Most Installed apps'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {
        top: 'top',
        left: 'right',
        data: ['Forest', 'Steppe', 'Desert', 'Wetland']
    },
    toolbox: {
        show: true,
        orient: 'vertical',
        left: 'right',
        top: 'center',
        feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar', 'stack'] },
            restore: { show: true },
            saveAsImage: { show: true }
        }
    },
    xAxis: [{
        type: 'category',
        axisTick: { show: true },
        axisLabel: {
            show: true,
            rotate: 45
        },
        data: ['2012', '2013', '2014', '2015', '2016']
    }],
    yAxis: [{
        type: 'value'
    }],
    series: [{
            name: 'Forest',
            type: 'bar',
            barGap: 0,
            label: labelOption,
            emphasis: {
                focus: 'series'
            },
            data: [320, 332, 301, 334, 390]
        },
        {
            name: 'Steppe',
            type: 'bar',
            label: labelOption,
            emphasis: {
                focus: 'series'
            },
            data: [220, 182, 191, 234, 290]
        },
        {
            name: 'Desert',
            type: 'bar',
            label: labelOption,
            emphasis: {
                focus: 'series'
            },
            data: [150, 232, 201, 154, 190]
        },
        {
            name: 'Wetland',
            type: 'bar',
            label: labelOption,
            emphasis: {
                focus: 'series'
            },
            data: [98, 77, 101, 99, 40]
        }
    ]
};

if (columnOption2 && typeof columnOption2 === 'object') {
    columnChart2.setOption(columnOption2);
}

window.addEventListener('resize', columnChart2.resize);

var nightingaleDom = document.getElementById('nightingaleContainer');
var nightingaleChart = echarts.init(nightingaleDom, null, {
    renderer: 'canvas',
    useDirtyRect: false
});

var nightingaleOption;

nightingaleOption = {
    title: {
        text: 'The EVENTS Category App Rating'
    },
    tooltip: {
        trigger: 'item'
    },
    legend: {
        top: '5%',
        left: 'center'
    },
    series: [{
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
        },
        label: {
            show: false,
            position: 'center'
        },
        emphasis: {
            label: {
                show: true,
                fontSize: '40',
                fontWeight: 'bold'
            }
        },
        labelLine: {
            show: true
        },
        data: [
            { value: 1048, name: 'Search Engine' },
            { value: 735, name: 'Direct' },
            { value: 580, name: 'Email' },
            { value: 484, name: 'Union Ads' },
            { value: 300, name: 'Video Ads' }
        ]
    }]
};

if (nightingaleOption && typeof nightingaleOption === 'object') {
    nightingaleChart.setOption(nightingaleOption);
}

window.addEventListener('resize', nightingaleChart.resize);

$.ajax({
    url: 'http://127.0.0.1:8080/getVerCategoryInfo',
    // 参数
    // data: { a: 100, b: 200 },
    // 请求类型
    type: 'GET',
    // 响应体结果
    dataType: 'json',
    // 成功的回调
    success: function(data) {
        stackAreaOption.legend.data = data["Category"];
        stackAreaOption.xAxis[0].data = data["AndroidVer"];
        stackAreaOption.series = []
        data["Category"].forEach(function(category) {
            stackAreaOption.series.push({
                name: category,
                type: 'line',
                stack: 'Total',
                areaStyle: {},
                emphasis: {
                    focus: 'series'
                },
                data: data[category]
            });
        });
        stackAreaChart.setOption(stackAreaOption);
    },
    // 超时时间
    timeout: 2000,
    // 失败的回调
    error: function() {
        console.log('出错啦~');
    },
    // 头信息
    // headers: {
    //     c: 300,
    //     d: 400
    // }
});

$.ajax({
    url: 'http://127.0.0.1:8080/getColumnData/Rating',
    // 参数
    //data: { 'key': 'Rating' },
    // 请求类型
    type: 'GET',
    // 响应体结果
    dataType: 'json',
    // 成功的回调
    success: function(data) {
        columnOption.legend.data = data['x']
        columnOption.xAxis[0].data = data['categories']
        columnOption.series = []
        data["x"].forEach(function(category) {
            columnOption.series.push({
                name: category,
                type: 'bar',
                barGap: 0,
                label: labelOption,
                emphasis: {
                    focus: 'series'
                },
                data: data[category]
            });
        });
        columnChart.setOption(columnOption)
    },
    // 超时时间
    timeout: 2000,
    // 失败的回调
    error: function() {
        console.log('出错啦~');
    },
    // 头信息
    // headers: {
    //     c: 300,
    //     d: 400
    // }
})

$.ajax({
    url: 'http://127.0.0.1:8080/getColumnData/Reviews',
    // 参数
    //data: { 'key': 'Reviews' },
    // 请求类型
    type: 'GET',
    // 响应体结果
    dataType: 'json',
    // 成功的回调
    success: function(data) {
        columnOption1.legend.data = data['x']
        columnOption1.xAxis[0].data = data['categories']
        columnOption1.series = []
        data["x"].forEach(function(category) {
            columnOption1.series.push({
                name: category,
                type: 'bar',
                barGap: 0,
                label: labelOption,
                emphasis: {
                    focus: 'series'
                },
                data: data[category]
            });
        });
        columnChart1.setOption(columnOption1)
    },
    // 超时时间
    timeout: 2000,
    // 失败的回调
    error: function() {
        console.log('出错啦~');
    },
    // 头信息
    // headers: {
    //     c: 300,
    //     d: 400
    // }
})

$.ajax({
    url: 'http://127.0.0.1:8080/getColumnData/Installs',
    // 参数
    //data: { 'key': 'Reviews' },
    // 请求类型
    type: 'GET',
    // 响应体结果
    dataType: 'json',
    // 成功的回调
    success: function(data) {
        columnOption2.legend.data = data['x']
        columnOption2.xAxis[0].data = data['categories']
        columnOption2.series = []
        data["x"].forEach(function(category) {
            columnOption2.series.push({
                name: category,
                type: 'bar',
                barGap: 0,
                label: labelOption,
                emphasis: {
                    focus: 'series'
                },
                data: data[category]
            });
        });
        columnChart2.setOption(columnOption2)
    },
    // 超时时间
    timeout: 2000,
    // 失败的回调
    error: function() {
        console.log('出错啦~');
    },
    // 头信息
    // headers: {
    //     c: 300,
    //     d: 400
    // }
})

$.ajax({
    url: 'http://127.0.0.1:8080/getRating/EVENTS',
    // 参数
    //data: { 'key': 'Installs' },
    // 请求类型
    type: 'GET',
    // 响应体结果
    dataType: 'json',
    // 成功的回调
    success: function(data) {
        nightingaleOption.series[0].data = []
        data["x"].forEach(function(bin) {
            nightingaleOption.series[0].data.push({
                value: data[bin],
                name: bin
            })
        });
        nightingaleChart.setOption(nightingaleOption);
    },
    // 超时时间
    timeout: 2000,
    // 失败的回调
    error: function() {
        console.log('出错啦~');
    },
    // 头信息
    // headers: {
    //     c: 300,
    //     d: 400
    // }
})


$.ajax({
    url: 'http://127.0.0.1:8080/getCategories',
    // 参数
    //data: { 'key': 'Installs' },
    // 请求类型
    type: 'GET',
    // 响应体结果
    dataType: 'json',
    // 成功的回调
    success: function(data) {
        console.log(data);
        var obj = document.getElementById('category_selector');
        data['categories'].forEach(function(category) {
            obj.add(new Option(category, category));
        });
    },
    // 超时时间
    timeout: 2000,
    // 失败的回调
    error: function() {
        console.log('出错啦~');
    },
    // 头信息
    // headers: {
    //     c: 300,
    //     d: 400
    // }
})

$('#category_selector').change(function() {
    var category = $(this).children('option:selected').val();
    $.ajax({
        url: 'http://127.0.0.1:8080/getRating/' + category,
        // 参数
        //data: { 'key': 'Installs' },
        // 请求类型
        type: 'GET',
        // 响应体结果
        dataType: 'json',
        // 成功的回调
        success: function(data) {
            nightingaleOption.title.text = "The " + category + " Category Apps Rating"
            temp = nightingaleOption.series[0]
            temp.data = []
            data["x"].forEach(function(bin) {
                temp.data.push({
                    value: data[bin],
                    name: bin
                })
            });
            nightingaleOption.series[0] = temp
            nightingaleChart.setOption(nightingaleOption);
        },
        // 超时时间
        timeout: 2000,
        // 失败的回调
        error: function() {
            console.log('出错啦~');
        },
        // 头信息
        // headers: {
        //     c: 300,
        //     d: 400
        // }
    })
})