import fetchAPI from 'api';

const receiveNav = (response) => ({
  type: 'RECEIVE_NAV',
  navMain: response.data
});

export const getNav = () => async (dispatch) => {
  try {
    const response = await fetchAPI.get('/book/navigation');
    await dispatch(receiveNav(response.data));
  } catch (error) {
    console.log('error: ', error);
  }
};

const receiveBook = (response) => ({
  type: 'RECEIVE_BOOK',
  bookDetails: response.data
});

export const getBook = () => async (dispatch) => {
  try {
    const response = await fetchAPI.get('/book/list');
    await dispatch(receiveBook(response.data));
    return response;
  } catch (error) {
    console.log('error: ', error);
  }
};
