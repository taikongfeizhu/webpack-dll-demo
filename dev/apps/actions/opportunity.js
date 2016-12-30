import { createAction } from 'redux-actions';
import { OPPORTUNITY } from '../constants/ActionTypes';
import { makeFetchOpportunityList } from '../api/opportunityFetch';
import { processApiError, processFetchError } from '../helper/ErrorMessageHelper';

// 列表
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

