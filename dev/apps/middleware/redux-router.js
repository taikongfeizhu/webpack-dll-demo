import { routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';
// docs: https://github.com/reactjs/react-router-redux

const middleware = routerMiddleware(browserHistory);

export default middleware;
