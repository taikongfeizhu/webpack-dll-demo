import makeFetchAction from './fetchAction';

const makeFetchOpportunityList = (params, receive) => {
  var url = `/opportunity/list/?page=${params.page}`;
  if (params.status) {
    url += `&status=${params.status}`;
  }
  if (params.source) {
    url += `&source=${params.source}`;
  }
  if (params.search_key_words) {
    url += `&search_key_words=${params.search_key_words}`;
  }
  url += `&limit=${params.limit || 10}`;
  return makeFetchAction(url, {}, receive);
};

// 认领商机
const makeFetchRequestOpportunity = (params, receive) => {
  const url = '/opportunity/request/';
  return makeFetchAction(url, {}, receive);
};

// 获取可认领商机的数目
const makeFetchRequestOpportunityNum = (params, receive) => {
  const url = '/opportunity/request/num/';
  return makeFetchAction(url, {}, receive);
};

// 商机认领状态变更
const makeFetchStatusChange = (params, receive) => {
  const url = '/opportunity/status/change/';
  const { data } = params;
  const body = new FormData();
  body.append('id', data.id);
  body.append('status', data.status);
  body.append('reason', data.reason);
  body.append('province', data.province);
  if (data.customer_id !== '-1') { body.append('customer_id', data.customer_id); }
  if (data.comment) { body.append('comment', data.comment); }
  return makeFetchAction(url, { method: 'post', body }, receive);
};

// 请求跟进记录结果
const makeFetchOpportunityHistoryList = (params, receive) => {
  const url = `/opportunity/history/list/?id=${params.id}&page=${params.page}&limit=10`;
  return makeFetchAction(url, {}, receive);
};

// 打电话
const makeFetchMakeCall = (params, receive) => {
  const url = `/call_center/out_call/?opportunity_id=${params.opportunity_id}&phone=${params.phone}`;
  return makeFetchAction(url, {}, receive);
};

// 新增/修改跟进记录
const makeFetchHistoryCreate = (params, receive) => {
  const url = '/opportunity/history/create/';
  const { data } = params;
  const body = new FormData();
  // 跟进历史id
  if (data.id) { body.append('id', data.id) }
  // 商机id
  body.append('opportunity_id', data.opportunityId);
  body.append('tracking_date', data.date);
  body.append('type', data.type);
  body.append('remark', data.remark);
  return makeFetchAction(url, { method: 'post', body }, receive);
};

// 提交表单
const makeFetchSubmitOpportunity = (params, receive) => {
  const url = '/opportunity/create/';
  const { data } = params;
  const body = new FormData();
  if (data.id) { body.append('id', data.id); }
  body.append('name', data.name);
  body.append('site', data.site);
  body.append('address', data.address);
  if (data.province) { body.append('province', data.province); }
  if (data.city) { body.append('city', data.city); }
  body.append('contacts', data.contacts);
  body.append('phone', data.phone);
  body.append('industry', data.industry);
  if (data.second_industry) { body.append('second_industry', data.second_industry); }

  if (data.info) { body.append('info', data.info); }
  if (data.link) { body.append('link', data.link); }
  if (data.post_time) { body.append('post_time', data.post_time); }
  if (data.register_code) { body.append('register_code', data.register_code); }
  if (data.register_time) { body.append('register_time', data.register_time); }
  if (data.register_capital) { body.append('register_capital', data.register_capital); }
  body.append('mail', data.mail);
  body.append('qq', data.qq);
  if (data.product_name) { body.append('product_name', data.product_name); }
  body.append('remark', data.remark);
  return makeFetchAction(url, { method: 'post', body }, receive);
};

// 获取商机来源
const makeFetchOpportunitySource = (params, receive) => {
  const url = '/opportunity/source/';
  return makeFetchAction(url, {}, receive);
};

// 获取释放商机的原因
const makeFetchOpportunityUnholdReason = (params, receive) => {
  const url = '/opportunity/unhold_history/reason/';
  return makeFetchAction(url, {}, receive);
};

// 获取跟进记录类型
const makeFetchTrackingHistoryType = (params, receive) => {
  const url = '/opportunity/tracking_history/type/';
  return makeFetchAction(url, {}, receive);
};

export {
  makeFetchOpportunityList,
  makeFetchRequestOpportunity,
  makeFetchRequestOpportunityNum,
  makeFetchStatusChange,
  makeFetchOpportunityHistoryList,
  makeFetchHistoryCreate,
  makeFetchSubmitOpportunity,
  makeFetchMakeCall,
  makeFetchOpportunitySource,
  makeFetchOpportunityUnholdReason,
  makeFetchTrackingHistoryType
};

