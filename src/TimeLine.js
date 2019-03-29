/**
 * 时间轴组件
 */
ui.TimeLine = function () {
    ht.ui.TimeLine.superClass.constructor.call(this);
};

def('ht.ui.TimeLine', ht.ui.VBoxLayout, {

    // 样式属性
    ui_ac: ['lineColor', 'lineWidth', 'labelFont', 'labelColor', 'labelBackground',
            'iconBackground', 'headerFont', 'headerColor', 'contentFont', 'contentColor', 'eventBorder', 'eventBackground'],

    __lineColor: '#eeeeee', // 默认时间轴线颜色
    __lineWidth: 3, // 默认时间轴线宽度
    __labelFont: '16px Arial', // 默认时间点字体
    __labelColor: 'rgb(255, 255, 255)', // 默认时间点颜色
    __labelBackground: ['ht.ui.drawable.ColorDrawable', '#FEB64D', 5], // 默认时间点背景
    __iconBackground: '#eeeeee', // 默认事件图标背景色
    __headerFont: '14px Arial', // 默认事件头字体
    __headerColor: '#000', // 默认事件头颜色
    __contentFont: '12px Arial', // 默认事件内容字体
    __contentColor: '#000', // 默认事件内容颜色
    __padding: 20,

    
    /**
     * 绘制时间轴线
     * @param x
     * @param y
     * @param width
     * @param height
     * @override
     */
    validateImpl: function (x, y, width, height) {
        var self = this;
        ht.ui.TimeLine.superClass.validateImpl.call(self, x, y, width, height);

        var g = self.getRootContext(),
            leftSpacing = self.getPaddingLeft(),
            lineColor = self.getLineColor(),
            lineWidth = self.getLineWidth();

        g.beginPath();
        g.fillStyle = lineColor;
        g.fillRect(x + leftSpacing, y, lineWidth, height);
    },

    /**
     * 添加时间节点
     * @param time 内容
     * @param font 字体
     * @param color 颜色
     * @param background 背景
     * @param index 插入到时间轴中的位置
     */
    addTimeLabel: function(time, font, color, background, index) {
        if (!time) return;
        var label = new ht.ui.Label();

        label.setText(time);
        label.setTextFont(font || this.getLabelFont());
        label.setTextColor(color || this.getLabelColor());
        label.setBackground(background || this.getLabelBackground());
        label.setPadding(8);

        this.addView(label, {
            width: 'wrap_content',
            height: 'wrap_content',
            marginBottom: 15
        }, index);
    },

    /**
     * 添加事件
     * @param event JSON 属性
     * {
     *      icon // 事件图标
     *      iconWidth // 图标宽度
     *      iconHeight // 图标高度
     *      iconBackound // 图标背景色
     *      header // 事件头，可为 string || view
     *      headerFont // 内容字体
     *      headerColor // 内容颜色 
     *      headerBackground // 事件头背景色
     *      content // 事件内容可为 string || view
     *      contentFont // 内容字体
     *      contentColor // 内容颜色 
     *      contentBackground // 事件内容背景色
     *      border // 事件边框
     *      background // 事件背景
     * }
     * @param index 插入到时间轴中的位置
     */

    addTimeEvent: function(event, index) {
        if (!event) return;

        var self = this,
            icon = event.icon,
            iconWidth = event.iconWidth || 12,
            iconHeight = event.iconHeight || 12,
            iconBackground = event.iconBackground || self.getIconBackground(),
            header = event.header,
            headerFont = event.headerFont || self.getHeaderFont(),
            headerColor = event.headerColor || self.getHeaderColor(),
            headerBackground = event.headerBackground,
            content = event.content,
            contentFont = event.contentFont || self.getContentFont(),
            contentColor = event.contentColor || self.getContentColor(),
            contentBackground = event.contentBackground,
            border = event.border || self.getEventBorder(),
            background = event.background || self.getEventBackground();

        var hbox = new ht.ui.HBoxLayout(),
            iconLabel = new ht.ui.Label(),
            vbox = new ht.ui.VBoxLayout();

        // 绘制时间轴上的图标
        iconLabel.setIcon(icon);
        iconLabel.setAlign('center');
        iconLabel.setVAlign('middle');
        iconLabel.setIconWidth(iconWidth);
        iconLabel.setIconHeight(iconHeight),
        iconLabel.setPreferredSize(iconWidth + 5, iconHeight + 5);
        iconLabel.drawBackground = function() {
            var g = this.getRootContext(),
                x = this.getContentWidth() / 2,
                y = this.getContentHeight() / 2,
                r = x > y ? x : y;
            
            g.beginPath();
            g.fillStyle = iconBackground;
            g.arc(x, y, r, 0, Math.PI * 2);
            g.fill();
        }
        
        hbox.addView(iconLabel, {
            width: 'wrap_content',
            height: 'wrap_content',
            marginLeft: self.getPaddingLeft() + self.getLineWidth() / 2 - (iconWidth + 5) / 2
        });

        // 绘制事件
        var headerView, contentView;

        // 添加事件头
        if (typeof header === 'string') {
            var htmlView = new ht.ui.HtmlView();

            htmlView.setContent('<div style="font: ' + headerFont + 
                                            '; color: ' + headerColor + 
                                            '; background: ' + headerBackground + 
                                            '">' + header + 
                                            '</div>');
            headerView = htmlView;
            vbox.addView(headerView, {
                width: 'match_parent',
                height: 'wrap_content'
            });
        }
        else if (header) {
            headerView = header;
            
            vbox.addView(headerView, {
                width: 'match_parent',
                height: 'wrap_content'
            });
        }

        // 添加内容
        if (typeof content === 'string') {
            var htmlView = new ht.ui.HtmlView();
            htmlView.setContent('<div style="font: ' + contentFont + 
                                            '; color: ' + contentColor + 
                                            '; background: ' + contentBackground + 
                                            '">' + content + 
                                            '</div>');
            contentView = htmlView;
            
            vbox.addView(contentView, {
                width: 'match_parent',
                height: 'wrap_content',
                marginTop: 5
            });
        }
        else if (content) {
            contentView = content;
            
            vbox.addView(contentView, {
                width: 'match_parent',
                height: 'wrap_content',
                marginTop: 5
            });
        }

        vbox.setBorder(border);
        vbox.setBackground(background);
        vbox.setPadding(10);
        hbox.addView(vbox, {
            width: 'match_parent',
            height: 'wrap_content',
            marginLeft: 20
        });

        self.addView(hbox, {
            width: 'wrap_content',
            height: 'wrap_content',
            marginBottom: 20
        }, index);
    },
    
    /**
     * 批量添加事件
     * @param events 事件数组
     * @param index 事件组的起始插入位置
     */
    addTimeEvents: function(events, index) {
        var self = this;

        events.forEach(function(event) {     
            self.addTimeEvent(event, index);
            if (index) {
                index++;
            }
        });
    },

    /**
     * 注册可序列化的属性
     * @return {Object}
     * @override
     */
    getSerializableProperties: function() {
        var parentProperties = ht.ui.TimeLine.superClass.getSerializableProperties.call(this);
        
        return ht.Default.addMethod(parentProperties, {
            lineWidth: true,
            lineColor: true,
            labelFont: true, 
            labelColor: true, 
            labelBackground: true,
            iconBackground: true, 
            headerFont: true, 
            headerColor: true, 
            contentFont: true, 
            contentColor: true, 
            eventBorder: true,
            eventBackground: true
        });
    }   
});