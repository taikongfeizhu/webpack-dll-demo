export function processFetchError(originMessage) {
  const defaultMessage = '无法检测到您的网络';
  const isNetworkErr = originMessage === 'Network request failed';
  const finalMessage = isNetworkErr ? defaultMessage : originMessage;
  return finalMessage;
}

export function processApiError(result) {
  let msgContent;
  const msg = result.msg;
  if (msg) {
    msgContent = msg;
  }
  if (result.errors) {
    const consoleLog = `请核对字段:${result.errors.toString()}`;
    if (consoleLog.includes('content')) {
      msgContent = '评论不能为空，请添加后重试';
    } else {
      msgContent = '提交失败，请钉钉联系效率工程团队';
    }
  }
  return msgContent;
}
