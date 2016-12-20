const Utils = {
  formatCost(n) {
    if (typeof n === 'string' || n instanceof String) return n;
    return n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  },

  formatParams: function (router, params, method = 'push') {
    const resultParams = {};
    for (let key in params) {
      if (params[key] && params[key] !== '') {
        resultParams[key] = params[key];
      }
    }
    return resultParams;
  },

  params: function (param, key, encode, add) {
    if (param === null) return '';
    var paramStr = '';
    var t = typeof (param);
    if (t === 'string' || t === 'number' || t === 'boolean') {
      paramStr += '&' + key + '=' + ((encode === null || encode) ? encodeURIComponent(param) : param);
    } else {
      for (var i in param) {
        if (typeof param[i] !== 'undefined' && param[i] !== '') {
          var k = key === null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i);
          paramStr += Utils.params(param[i], k, encode, true);
        }
      }
    }
    if (!add) {
      paramStr = paramStr.substr(1);
    }
    return paramStr;
  },

  getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      var cookies = document.cookie.split(';');
      for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === (`${name}=`)) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  },

  isObjectValueEqual(a, b) {
    if (!a && b) return false;
    if (a && !b) return false;
    if (!a && !b) return true;
    var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);
    if (aProps.length !== bProps.length) {
      return false;
    }
    for (var i = 0; i < aProps.length; i++) {
      var propName = aProps[i];
      if (a[propName] !== b[propName]) {
        return false;
      }
    }
    return true;
  }
};

export {
  Utils
};
