
索引

* [概述](#ref_description)

---

!(#ref_description)

### 概述

`ht.ui.TimeLine` 时间轴组件示例，可以选择添加时间点或事件，事件又包含事件图标（icon）、事件头（header）、事件内容（content），后两者可传入字符串或 UI 组件。

使用此组件需要先引入 `js` 文件

    <script src="ht.js"></script>
    <script src="ht-ui.js"></script>
    <script src="ht-ui-timeline.js"></script>

示范例子：

!(#example_demo@500)

    timeline.addTimeEvents([
        {
            header: '事件默认样式'
        },
        {
            iconBackground: '#409EFF', // 设置背景色
            header: '自定义背景色'
        },
        {
            icon: 'star', // 添加图标
            iconBackground: '#409EFF',
            header: '支持添加图标'
        },
        {
            icon: 'star',
            iconWidth: 15, // 设置图标宽度
            iconHeight:15, // 设置图标高度
            iconBackground: '#409EFF',
            header: '支持修改图标大小'
        },
        {
            icon: 'star',
            iconBackground: '#409EFF',
            background: '#409EFF', // 设置事件背景
            header: '支持修改内容样式',
            headerFont: '15px KaiTi',
            headerColor: 'rgb(255, 255, 255)'
        }
    ]);

组件支持全局配置时间点和事件样式。

!(#example_demo1@460)

    timeline.setLabelFont('14px Arial'); // 设置时间点字体
    timeline.setLabelBackground(new ht.ui.drawable.ColorDrawable('#FF7C7C', 5)); // 设置时间点背景
    timeline.setHeaderFont('12px SimSun'); // 设置事件头字体
    timeline.setHeaderColor('#000'); // 设置事件头字体颜色
    timeline.setEventBackground(new ht.ui.drawable.ColorDrawable('rgb(255,235,195)', 5)); // 设置事件背景

组件也可通过传入参数单独设置每个时间点和事件样式。

!(#example_demo2@460)

    timeline.addTimeEvent({
        iconBackground: 'rgb(157,224,235)',
        header: '《肖申克的救赎》',
        headerFont: '16px Arial',
        headerBackground: 'rgb(157,224,235)',
        content: '该片改编自斯蒂芬·金《四季奇谭》中收录的同名小说，该片中涵盖全片的主题是“希望”，全片透过监狱</br>' +
                 '这一强制剥夺自由、高度强调纪律的特殊背景来展现作为个体的人对“时间流逝、环境改造”的恐惧。影片</br>' +
                 '的结局有《基督山伯爵》式的复仇宣泄。',
        contentFont: '15px KaiTi',
        contentColor: 'black'
    });

清空所有时间点和事件代码如下：

    timeline.clear();