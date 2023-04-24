/**
 * 时间轴组件
 */
ui.Timeline = function () {
    ht.ui.Timeline.superClass.constructor.call(this);
};

def('ht.ui.Timeline', ht.ui.ViewGroup, {

    // 样式属性
    ui_ac: [
        'lineColor', 'lineWidth', 'labelFont', 'labelColor', 'labelBackground',
        'iconBackground', 'headerFont', 'headerColor', 'contentFont', 'contentColor', 
        'eventBorder', 'eventBackground', 'icon', 'iconWidth', 'iconHeight', 'gap',
        'iconContentGap', 'placement', 'is:center', 'type'
    ],

    __lineColor: 'rgb(228, 231, 237)', // 默认时间轴线颜色
    __lineWidth: 1, // 默认时间轴线宽度
    __labelFont: '14px arial,sans-serif', // 默认时间点字体
    __labelColor: '#909399', // 默认时间点颜色
    __labelBackground: ['ht.ui.drawable.ColorDrawable', '#F5F7FA', 5], // 默认时间点背景
    __iconBackground: '#c7c8cb', // 默认事件图标背景色
    __headerFont: '12px arial,sans-serif', // 默认事件头字体
    __headerColor: '#909399', // 默认事件头颜色
    __contentFont: '14px arial,sans-serif', // 默认事件内容字体
    __contentColor: '#303133', // 默认事件内容颜色
    __icon: 'ht_ui_timeline_icon', // 默认图标
    __iconWidth: 22, // 默认图标宽度
    __iconHeight: 22, // 默认图标高度
    __padding: 10, // 默认组件内边距
    __gap: 15, // 默认孩子节点间距
    __iconContentGap: 10, // 默认图标和内容间距
    __placement: 'top', // 默认 header 在上方
    __center: false, // 默认 icon 不居中
    __type: '', // 默认图标类型，优先级高于 iconBackground

    /**
     * @override
     */
    figurePreferredSize: function () {
        var self = this,
            children = self.getVisibleChildren(),
            size = {
                width: self.getPaddingLeft() + self.getPaddingRight() +
                    self.getBorderLeft() + self.getBorderRight(),
                height: self.getPaddingTop() + self.getPaddingBottom() +
                    self.getBorderTop() + self.getBorderBottom()
            },
            lineAreaWidth = self._getLineAreaWidth(),
            width = 0,
            gap = self.getGap(),
            iconContentGap = self.getIconContentGap();

        children.each(function(child, index) {
            var childPreferredSize = child.getPreferredSize(),
                layoutParams = self.getChildLayoutParams(child) || {},
                marginLeft = layoutParams.marginLeft || 0,
                marginRight = layoutParams.marginRight || 0,
                marginTop = layoutParams.marginTop || 0,
                marginBottom = layoutParams.marginBottom || 0,
                type = child.a('$type'),
                isEvent = type === 'event',
                iconHeight,
                addHeight = childPreferredSize.height + marginTop + marginBottom;

            if (isEvent) {
                var info = child.a('$info');

                iconHeight = info.iconHeight || self.getIconHeight();
            }

            width = Math.max(width, marginLeft + marginRight + childPreferredSize.width + (isEvent ? lineAreaWidth + iconContentGap : 0));
            size.height += iconHeight ? Math.max(iconHeight, addHeight) : addHeight;
            if (index) size.height += gap;
        });
        size.width +=  width;

        return size;
    },

    /**
     * @override
     */
    getPreferredSizeProperties: function() {
        var preferredSizeProperties = ht.ui.Timeline.superClass.getPreferredSizeProperties.call(this);

        preferredSizeProperties = ht.Default.clone(preferredSizeProperties);
        preferredSizeProperties.iconWidth = true;
        preferredSizeProperties.iconHeight = true;
        preferredSizeProperties.gap = true;
        preferredSizeProperties.iconContentGap = true;

        // 返回 map
        return preferredSizeProperties;
    },

    /**
     * @override
     */
    onPropertyChanged: function(e) {
        ht.ui.Timeline.superClass.onPropertyChanged.call(this, e);

        if (e.property === 'placement') {
            this.getChildren().each(function(child) {
                var type = child.a('$type');

                if (type === 'event') {
                    child.getChildren().sort(child._sortFunc);
                    child.iv();
                }
            });
        }
    },

    getCurrentIconBackground: function(type, iconBackground) {
        var colorMap = {
            'primary': '#5BB5F9',
            'success': '#3DCEC4',
            'warning': '#FFAD2B',
            'danger': '#F56C6C',
            'info': '#909399'
        };
        var color;

        if (!type) type = this.getType();
        if (!iconBackground) iconBackground = this.getIconBackground();

        color = colorMap[type];
        if (!color) color = iconBackground;

        return color;
    },
    
    /**
     * 绘制时间轴线和图标
     * @param x
     * @param y
     * @param width
     * @param height
     * @override
     */
    validateImpl: function (x, y, width, height) {
        var self = this;
        ht.ui.Timeline.superClass.validateImpl.call(self, x, y, width, height);

        var g = self.getRootContext(),
            lineColor = self.getLineColor(),
            lineWidth = self.getLineWidth(),
            children = self.getVisibleChildren(),
            icon = self.getIcon(),
            iconWidth = self.getIconWidth(),
            iconHeight = self.getIconHeight(),
            iconBackground = self.getIconBackground(),
            lineAreaWidth = self._getLineAreaWidth(),
            layoutY = 0,
            ty = self.ty(),
            scrollWidth = 0,
            scrollHeight = 0,
            gap = self.getGap(),
            iconContentGap = self.getIconContentGap(),
            center = self.isCenter();

        g.save();
        g.translate(x, y + ty);
        g.beginPath();
        g.rect(0, -ty, width, height);
        g.clip();

        var funcArr = [];
        g.beginPath();
        children.each(function(child, index) {
            var preferredSize = child.getPreferredSize(),
                layoutParams = self.getChildLayoutParams(child) || {},
                marginLeft = layoutParams.marginLeft || 0,
                marginRight = layoutParams.marginRight || 0,
                marginTop = layoutParams.marginTop || 0,
                marginBottom = layoutParams.marginBottom || 0,
                type = child.a('$type'),
                isEvent = type === 'event',
                sy = layoutY;

            if (index) sy += gap;

            var _center, _icon, _iconWidth, _iconHeight, _iconBackground, _type;
            if (isEvent) {
                var info = child.a('$info');
                _center = info.center || center;
                _icon = info.icon || icon;
                _iconWidth = info.iconWidth || iconWidth;
                _iconHeight = info.iconHeight || iconHeight;
                _iconBackground = info.iconBackground || iconBackground;
                _type = info.type || self.getType();
                var currentIconBackground = self.getCurrentIconBackground(_type, _iconBackground);

                var func = function() {
                    var x = (lineAreaWidth - _iconWidth) / 2, y = sy, width = _iconWidth, height = _iconHeight;
                    if (_center) {
                        var max = Math.max(_iconHeight, marginTop + preferredSize.height + marginBottom);
                        y = sy + (max - _iconHeight) / 2;
                    }
                    ht.Default.drawImage(
                        g,
                        ht.Default.getImage(_icon),
                        x,y,width,height,
                        null, null, currentIconBackground
                    );
                };
                funcArr.push(func);
            }

            if (index === 0) {
                if (isEvent) {
                    if (_center) {
                        g.moveTo(lineAreaWidth / 2, preferredSize.height / 2);
                    }
                    else {
                        g.moveTo(lineAreaWidth / 2, _iconHeight / 2);
                    }
                }
                else {
                    g.moveTo(lineAreaWidth / 2, marginTop + preferredSize.height / 2);
                }
            }
            else if (index === children.size() - 1) {
                if (isEvent) {
                    if (_center) {
                        g.lineTo(lineAreaWidth / 2, sy + preferredSize.height / 2);
                    }
                    else {
                        g.lineTo(lineAreaWidth / 2, sy + _iconHeight / 2);
                    }
                }
                else {
                    g.lineTo(lineAreaWidth / 2, sy + marginTop + preferredSize.height / 2);
                }
            }
            funcArr.push(function() {
                var top = sy + marginTop;
                if (isEvent && _center) {
                    var height = marginTop + preferredSize.height + marginBottom;
                    var max = Math.max(_iconHeight, height);

                    top = sy + (max - height) / 2;
                }
                self.layoutChild(child, (isEvent ? lineAreaWidth + iconContentGap : 0) + marginLeft, top, preferredSize.width, preferredSize.height);
            });
            layoutY = sy;
            if (isEvent) {
                layoutY += Math.max(_iconHeight, marginTop + preferredSize.height + marginBottom);
            }
            else layoutY += marginTop + preferredSize.height + marginBottom;
        });
        g.lineWidth = lineWidth;
        g.strokeStyle = lineColor;
        g.stroke();

        funcArr.forEach(function(func) {
            func();
        });
        self.updateScrollBar(width, height, scrollWidth, layoutY);

        g.restore();
    },

    _getLineAreaWidth: function() {
        var self = this,
            children = self.getVisibleChildren(),
            iconWidth = self.getIconWidth(),
            width = iconWidth;

        children.each(function(child) {
            var type = child.a('$type');

            if (type === 'event') {
                var info = child.a('$info');

                width = Math.max(width, info.iconWidth || 0);
            }
        });

        return width;
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

        label.a('$type', 'label');
        label.setText(time);
        label.setTextFont(font || this.getLabelFont());
        label.setTextColor(color || this.getLabelColor());
        label.setBackground(background || this.getLabelBackground());
        label.setPadding(8);

        this.addView(label, {
            width: 'wrap_content',
            height: 'wrap_content'
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
     *      placement // header 位置，默认在上
     *      center // 是否居中，默认不居中
     * }
     * @param index 插入到时间轴中的位置
     */
    addTimeEvent: function(event, index) {
        if (!event) return;

        var self = this,
            icon = event.icon,
            iconWidth = event.iconWidth || this.getIconWidth(),
            iconHeight = event.iconHeight || this.getIconHeight(),
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
            background = event.background || self.getEventBackground(),
            placement = event.placement || self.getPlacement(),
            center = event.center || self.isCenter();

        var hbox = new ht.ui.HBoxLayout(),
            iconLabel = new ht.ui.Label(),
            vbox = new ht.ui.VBoxLayout();
        
        vbox.a('$type', 'event');
        vbox.a('$info', event);
        vbox.setGap(5);

        // 绘制时间轴上的图标
        iconLabel.setIcon(icon);
        iconLabel.setAlign('center');
        iconLabel.setVAlign('middle');
        iconLabel.setIconWidth(iconWidth);
        iconLabel.setIconHeight(iconHeight);
        iconLabel.setPreferredSize(iconWidth, iconHeight);
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
        
        // hbox.addView(iconLabel, {
        //     width: 'wrap_content',
        //     height: 'wrap_content'
        // });

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
        }
        else if (header instanceof ht.ui.View) {
            headerView = header;
        }

        if (headerView) {
            headerView.a('$type', 'header');
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
        }
        else if (content instanceof ht.ui.View) {
            contentView = content;
        }

        if (contentView) {
            contentView.a('$type', 'content');
            vbox.addView(contentView, {
                width: 'match_parent',
                height: 'wrap_content'
            });
        }

        vbox.setBorder(border);
        vbox.setBackground(background);
        var sortFunc = function(a,b) {
            var aType = a.a('$type');
            var placement = event.placement || self.getPlacement();
            var flag = -1;

            if (aType === 'header') flag = placement === 'top' ? -1 : 1;
            else flag = placement === 'top' ? 1 : -1;

            return flag;
        };
        vbox.getChildren().sort(sortFunc);
        vbox._sortFunc = sortFunc;
        // hbox.addView(vbox, {
        //     width: 'match_parent',
        //     height: 'wrap_content'
        // });

        self.addView(vbox, {
            width: 'wrap_content',
            height: 'wrap_content'
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
        var parentProperties = ht.ui.Timeline.superClass.getSerializableProperties.call(this);
        
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
            eventBackground: true,
            icon: true,
            iconWidth: true,
            iconHeight: true,
            gap: true,
            iconContentGap: true,
            placement: true,
            'is:center': true,
            type: true
        });
    }   
});

ui.TimeLine = ui.Timeline;