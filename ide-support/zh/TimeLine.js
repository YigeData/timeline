/**
 * 时间轴组件<br>
 * 样式属性(不含从父类继承)：lineColor, lineWidth, labelFont, labelColor, labelBackground, iconBackground, headerFont, headerColor, contentFont, contentColor, eventBorder, eventBackground
 * @constructor
 * @extends {ht.ui.VBoxLayout}
 */
ht.ui.TimeLine = function() {}

/**
 * 轴线颜色
 * @return {Color} 颜色
 */
ht.ui.TimeLine.prototype.getLineColor = function() {}

/**
 * 设置轴线颜色
 * @param {Color} color 
 */
ht.ui.TimeLine.prototype.setLineColor = function(color) {}

/**
 * 轴线宽度
 * @return {Number} 宽度值 
 */
ht.ui.TimeLine.prototype.getLineWidth = function() {}

/**
 * 设置轴线宽度
 * @param {Number} width 
 */
ht.ui.TimeLine.prototype.setLineWidth = function(width) {}

/**
 * 时间点字体
 * @return {String} 字体
 */
ht.ui.TimeLine.prototype.getLabelFont = function() {}

/**
 * 设置时间点字体
 * @param {String} font 
 */
ht.ui.TimeLine.prototype.setLabelFont = function(font) {}

/**
 * 时间点文字颜色
 * @return {Color} 颜色
 */
ht.ui.TimeLine.prototype.getLabelColor = function() {}

/**
 * 设置时间点文字颜色
 * @param {Color} color 
 */
ht.ui.TimeLine.prototype.setLabelColor = function(color) {}

/**
 * 时间点背景
 * @return {ht.ui.drawable.Drawable} 背景 Drawable
 */
ht.ui.TimeLine.prototype.getLabelBackground = function() {}

/**
 * 设置时间点背景
 * @param {object} background 背景，值为任意 Drawable 值(颜色值、图片名、图片路径等，参考 UI 产品包入门手册) 
 */
ht.ui.TimeLine.prototype.setLabelBackground = function(background) {}

/**
 * 事件图标背景色
 * @return {Color} 颜色
 */
ht.ui.TimeLine.prototype.getIconBackground = function() {}

/**
 * 设置事件图标背景色
 * @param {Color} color 
 */
ht.ui.TimeLine.prototype.setIconBackground = function(color) {}

/**
 * 事件头字体
 * @return {String} 字体
 */
ht.ui.TimeLine.prototype.getHeaderFont = function() {}

/**
 * 设置事件头字体
 * @param {String} font 
 */
ht.ui.TimeLine.prototype.setHeaderFont = function(font) {}

/**
 * 事件头文字颜色
 * @return {Color} 颜色
 */
ht.ui.TimeLine.prototype.getHeaderColor = function() {}

/**
 * 设置事件头文字颜色
 * @param {Color} color 
 */
ht.ui.TimeLine.prototype.setHeaderColor = function(color ) {}

/**
 * 事件内容字体
 * @return {String} 字体
 */
ht.ui.TimeLine.prototype.getContentFont = function() {}

/**
 * 设置事件内容字体
 * @param {String} font 
 */
ht.ui.TimeLine.prototype.setContentFont = function(font) {}

/**
 * 事件内容文字颜色
 * @return {Color} 颜色
 */
ht.ui.TimeLine.prototype.getContentColor = function() {}

/**
 * 设置事件内容文字颜色
 * @param {Color} color 
 */
ht.ui.TimeLine.prototype.setContentColor = function(color ) {}

/**
 * 事件边框
 * @return {ht.ui.border.Border} 边框 Border
 */
ht.ui.TimeLine.prototype.getEventBorder = function() {}

/**
 * 设置事件边框
 * @param {object} border 背景，值为任意 Border 值 
 */
ht.ui.TimeLine.prototype.setEventBorder = function(border) {}

/**
 * 事件背景
 * @return {ht.ui.drawable.Drawable} 背景 Drawable
 */
ht.ui.TimeLine.prototype.getEventBackground = function() {}

/**
 * 设置事件背景
 * @param {object} background 背景，值为任意 Drawable 值(颜色值、图片名、图片路径等，参考 UI 产品包入门手册) 
 */
ht.ui.TimeLine.prototype.setEventBackground = function(background) {}

/**
 * 添加时间点
 * @param time 内容
 * @param font 字体
 * @param color 文字颜色
 * @param background 背景
 * @param index 插入到时间轴中的位置（位置计算包括所有的时间点和事件）
 * @return {ht.ui.View} 时间点组件
 * @example
 * // 设置单独的时间点样式
 * timeline.addTimeLabel('时间点内容', '16px SimHei', 'black', 'rgb(242,83,75)', 10);
 */
ht.ui.TimeLine.prototype.addTimeLabel = function(time, font, color, background, index) {}

/**
 * 添加事件
 * @param {object} event 事件对象
 * {
 *      icon // 事件图标
 *      iconWidth // 图标宽度
 *      iconHeight // 图标高度
 *      iconBackound // 图标背景色
 *      header // 事件头，可为 string || view
 *      headerFont // 内容字体
 *      headerColor // 内容颜色 
 *      content // 事件内容，可为 string || view
 *      contentFont // 内容字体
 *      contentColor // 内容颜色 
 *      border // 事件边框
 *      background // 事件背景
 * }
 * @param index 插入到时间轴中的位置（位置计算包括所有的时间点和事件）
 * @return {ht.ui.View} 时间事件组件
 * @example
 * // 设置单独的事件样式
 * timeline.addTimeEvent(
 *     {
 *          iconBackground: 'pink',
 *          background: new ht.ui.drawable.ColorDrawable('rgb(51,153,255)', 20),
 *          header: '事件头',
 *          headerFont: '16px Arial',
 *          content: '时间内容',
 *          contentFont: '14px KaiTi',
 *          contentColor: 'black'
 *     }, 10
 * );
 */
ht.ui.TimeLine.prototype.addTimeEvent = function(event, index) {}

 /**
  * 批量添加事件
  * @param {Array} events 事件对象数组
  * @param index 批量事件插入的起始位置（位置计算包括所有的时间点和事件）
  * @example
  * timeline.addTimeEvents([
  *    {
  *        header: '第一个事件'
  *    },
  *    {   
  *        header: '第二个事件'
  *    }
  * ], 10);
  */
 ht.ui.TimeLine.prototype.addTimeEvents = function(events, index) {}

 /**
 * 删除所有时间点或事件组件
 */
ht.ui.TimeLine.prototype.clear = function (){};

/**
 * 将时间点或事件组件从时间轴中删除
 * @param {ht.ui.View} view 要删除的时间点或事件
 */
ht.ui.TimeLine.prototype.removeView = function (view){};

/**
 * 删除时间点或事件组件列表中对应下标为 index 的时间点或事件组件
 * @param {Number} index 时间点或事件组件下标
 */
ht.ui.TimeLine.prototype.removeViewAt = function (index){};