import 'whatwg-fetch';

function getErrorMsgByStatusCode(code) {
  let result = '未知错误';
  if (code >= 400 && code < 500) {
    switch (code) {
      case 401:
        result = '您尚未登录,请登录后访问.';
        break;
      case 403:
        result = '您所请求的资源被禁止访问.';
        break;
      case 404:
        result = '您所请求的资源并不存在.';
        break;
      case 405:
        result = '非法请求被禁止.';
        break;
      default:
        result = '客户端程序好像出了些问题.';
    }
  } else if (code >= 500 && code < 600) {
    result = '服务器出错啦.';
  }
  return result;
}

export default () => next => action => {
  if (!action) {
    return null;
  }
  if (typeof action === 'function' || action.type !== 'FETCH') {
    return next(action);
  }
  if (typeof action === 'function' || action.type === 'FETCH') {
    const { url, options } = action;
    const finalOptions = Object.assign({}, { credentials: 'include' }, options);
    const finalUrl = `${url}`;
    const fetchedPromise = fetch(finalUrl, finalOptions).then(response => {
      const status = response.status;
      if (status >= 400) {
        const message = getErrorMsgByStatusCode(status);
        return Promise.reject({ message, response });
      }
      return response;
    }).then(response => response.json());
    action.receive(fetchedPromise);
  }

  return null;
};
