import { createAction } from 'redux-actions';
import { OPPORTUNITY } from '../constants/ActionTypes';
import { makeFetchOpportunityList, makeFetchRequestOpportunity, makeFetchStatusChange, makeFetchOpportunityHistoryList,
  makeFetchHistoryCreate, makeFetchSubmitOpportunity, makeFetchRequestOpportunityNum,
  makeFetchMakeCall, makeFetchOpportunitySource, makeFetchOpportunityUnholdReason, makeFetchTrackingHistoryType }
  from '../api/opportunityFetch';
import { processApiError, processFetchError } from '../helper/ErrorMessageHelper';

const receiveFetching = createAction(OPPORTUNITY.RECEIVE_FETCHING, (fetching) => { return { fetching } });

const receiveOpportunityList = createAction(OPPORTUNITY.RECEIVE_OPPORTUNITY_LIST, (json) => { return { json } });

const receiveRequestOpportunity = createAction(OPPORTUNITY.RECEIVE_REQUST_OPPORTUNITY, (json) => { return { json } });

const receiveGetOpportunityNum = createAction(OPPORTUNITY.RECEIVE_GET_OPPORTUNITY_NUM, (json) => { return { json } });

const receiveOpportunityStatusSubmit = createAction(OPPORTUNITY.RECEIVE_OPPORTUNITY_STATUS_SUBMIT, (json) => { return { json } });

const receiveOpportunityHistoryList = createAction(OPPORTUNITY.RECEIVE_OPPORTUNITY_HISTORY_LIST, (json) => { return { json } });

const receiveOpportunityHistorySubmit = createAction(OPPORTUNITY.RECEIVE_OPPORTUNITY_HISTORY_SUBMIT, (json) => { return { json } });

const receiveOpportunitySubmit = createAction(OPPORTUNITY.RECEIVE_OPPORTUNITY_SUBMIT, (json) => { return { json } });

const receiveMakeCall = createAction(OPPORTUNITY.RECEIVE_MAKE_CALL, (json) => { return { json } });

const receiveOpportunitySource = createAction(OPPORTUNITY.RECEIVE_OPPORTUNITY_SOURCE, (json) => { return { json } });

const receiveOpportunityUnholdReason = createAction(OPPORTUNITY.RECEIVE_OPPORTUNITY_UNHOLD_REASON, (json) => { return { json } });

const receiveTrackingHistoryType = createAction(OPPORTUNITY.RECEIVE_TRACKING_HISTORY_TYPE, (json) => { return { json } });

// 商机列表
export const getOpportunityList = params => dispatch => {
  const fetchData = makeFetchOpportunityList(params, fetchedPromise => {
    fetchedPromise.then(json => {
      if (json.success) {
        dispatch(receiveOpportunityList(json));
        if (params.success) {
          params.success(json);
        }
      } else {
        const msg = processApiError(json);
        if (params.error) {
          params.error(msg);
        }
      }
      dispatch(receiveFetching(false));
    })
    .catch((err) => {
      const msg = processFetchError(err.message);
      console.log(msg);
      dispatch(receiveFetching(false));
    })
  });
  dispatch(receiveFetching(true));
  dispatch(fetchData);
};

// 认领商机
export const requestOpportunity = params => dispatch => {
  const fetchData = makeFetchRequestOpportunity(params, fetchedPromise => {
    fetchedPromise.then(json => {
      if (json.success) {
        dispatch(receiveRequestOpportunity(json));
        if (params.success) {
          params.success(json);
        }
      } else {
        const msg = processApiError(json);
        if (params.error) {
          params.error(msg);
        }
        console.log(msg);
      }
    });
    fetchedPromise.catch((err) => {
      const msg = processFetchError(err.message);
      console.log(msg);
    });
  });
  dispatch(fetchData);
};

// 获取可认领商机条数
export const getOpportunityNum = params => dispatch => {
  const fetchData = makeFetchRequestOpportunityNum(params, fetchedPromise => {
    fetchedPromise.then(json => {
      if (json.success) {
        dispatch(receiveGetOpportunityNum(json));
      } else {
        const msg = processApiError(json);
        console.log(msg);
      }
    });
    fetchedPromise.catch((err) => {
      const msg = processFetchError(err.message);
      console.log(msg);
    });
  });
  dispatch(fetchData);
};

// 保存商机状态
export const submitOpportunityStatus = params => dispatch => {
  const fetchData = makeFetchStatusChange(params, fetchedPromise => {
    fetchedPromise.then(json => {
      if (json.success) {
        dispatch(receiveOpportunityStatusSubmit(json));
        if (params.success) {
          params.success(json);
        }
      } else {
        const msg = processApiError(json);
        if (params.error) {
          params.error(msg);
        }
      }
    });
    fetchedPromise.catch((err) => {
      const msg = processFetchError(err.message);
      console.log(msg);
    });
  });
  dispatch(fetchData);
};

// 商机跟进记录列表
export const getOpportunityHistoryList = params => dispatch => {
  const fetchData = makeFetchOpportunityHistoryList(params, fetchedPromise => {
    fetchedPromise.then(json => {
      if (json.success) {
        dispatch(receiveOpportunityHistoryList(json.data));
        if (params.success) {
          params.success(json);
        }
      } else {
        const msg = processApiError(json);
        if (params.error) {
          params.error(msg);
        }
        console.log(msg);
      }
    });
    fetchedPromise.catch((err) => {
      const msg = processFetchError(err.message);
      console.log(msg);
    });
  });
  dispatch(fetchData);
};

//  新增/修改跟进记录
export const submitOpportunityHistory = params => dispatch => {
  const fetchData = makeFetchHistoryCreate(params, fetchedPromise => {
    fetchedPromise.then(json => {
      if (json.success) {
        dispatch(receiveOpportunityHistorySubmit(json));
        if (params.success) {
          params.success(json);
        }
      } else {
        const msg = processApiError(json);
        if (params.error) {
          params.error(msg);
        }
      }
    });
    fetchedPromise.catch((err) => {
      const msg = processFetchError(err.message);
      console.log(msg);
    });
  });
  dispatch(fetchData);
};

export const submitOpportunity = params => dispatch => {
  const fetchData = makeFetchSubmitOpportunity(params, fetchedPromise => {
    fetchedPromise.then(json => {
      if (json.success) {
        dispatch(receiveOpportunitySubmit(json));
        if (params.success) {
          params.success(json);
        }
      } else {
        const msg = processApiError(json);
        if (params.error) {
          params.error(msg);
        }
      }
    });
    fetchedPromise.catch((err) => {
      const msg = processFetchError(err.message);
      console.log(msg);
    });
  });
  dispatch(fetchData);
};

// 打电话
export const getMakeCall = params => dispatch => {
  const fetchData = makeFetchMakeCall(params, fetchedPromise => {
    fetchedPromise.then(json => {
      if (json.success) {
        dispatch(receiveMakeCall(json.data));
        if (params.success) {
          params.success(json);
        }
      } else {
        const msg = processApiError(json);
        if (params.error) {
          params.error(msg);
        }
        console.log(msg);
      }
    });
    fetchedPromise.catch((err) => {
      const msg = processFetchError(err.message);
      console.log(msg);
    });
  });
  dispatch(fetchData);
};

// 获取商机来源
export const getOpportunitySource = params => dispatch => {
  const fetchData = makeFetchOpportunitySource(params, fetchedPromise => {
    fetchedPromise.then(json => {
      if (json) {
        dispatch(receiveOpportunitySource(json));
        if (params.success) {
          params.success(json);
        }
      } else {
        const msg = processApiError(json);
        if (params.error) {
          params.error(msg);
        }
        console.log(msg);
      }
    });
    fetchedPromise.catch((err) => {
      const msg = processFetchError(err.message);
      console.log(msg);
    });
  });
  dispatch(fetchData);
};

// 获取释放商机的原因
export const getOpportunityUnholdReason = params => dispatch => {
  const fetchData = makeFetchOpportunityUnholdReason(params, fetchedPromise => {
    fetchedPromise.then(json => {
      if (json) {
        dispatch(receiveOpportunityUnholdReason(json));
        if (params.success) {
          params.success(json);
        }
      } else {
        const msg = processApiError(json);
        if (params.error) {
          params.error(msg);
        }
        console.log(msg);
      }
    });
    fetchedPromise.catch((err) => {
      const msg = processFetchError(err.message);
      console.log(msg);
    });
  });
  dispatch(fetchData);
};

// 获取跟进记录类型
export const getTrackingHistoryType = params => dispatch => {
  const fetchData = makeFetchTrackingHistoryType(params, fetchedPromise => {
    fetchedPromise.then(json => {
      if (json) {
        dispatch(receiveTrackingHistoryType(json));
        if (params.success) {
          params.success(json);
        }
      } else {
        const msg = processApiError(json);
        if (params.error) {
          params.error(msg);
        }
        console.log(msg);
      }
    });
    fetchedPromise.catch((err) => {
      const msg = processFetchError(err.message);
      console.log(msg);
    });
  });
  dispatch(fetchData);
};
