const makeFetchAction = (url, options, receivePromiseFunc) => {
  return { type: 'FETCH', url, options, receive: receivePromiseFunc }
};

export default makeFetchAction;
