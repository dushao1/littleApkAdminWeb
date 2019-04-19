
// 全局方法
let _public = {
    /**
     * 日期格式化.
     * @param {Date} date 日期
     * @param {String} fmt 时间格式
     * @returns {String} fmt 格式化后的时间.
     */
    // 例子：
    // formatDate(date, "yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
    // formatDate(date, "yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
    formatDate: function (time, fmt) {
        var date = '';
        if (time === 'null') {
            return '-'
        }
        if (isNaN(time)) {
            var _date = new Date(time).getTime();
            date = new Date(_date);
        } else {
            date = new Date(parseInt(time));
        }
        var o = {
            'M+': date.getMonth() + 1, // 月份
            'd+': date.getDate(), // 日
            'h+': date.getHours(), // 小时
            'm+': date.getMinutes(), // 分
            's+': date.getSeconds(), // 秒
            'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
            'S': date.getMilliseconds() // 毫秒
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp('(' + k + ')').test(fmt)) {
                fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
            }
        }
        return fmt;
    }
};

export {
    _public
};
