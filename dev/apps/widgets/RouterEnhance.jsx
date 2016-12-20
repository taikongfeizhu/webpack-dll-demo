import React from "react";
import { withRouter } from "react-router";

export const RouterEnhance = ComponsedComponent =>

  @withRouter
  class RouterView extends React.Component {

  static defaultProps = {

  }

  formatParams(params) {
    const resultParams = {};
    for (let key in params) {
      if (params[key] && params[key] !== '') {
        if( (key === 'page' && params[key] === 1) || (key === 'limit' && params[key] === 10)){
          continue;
        } else {
          resultParams[key] = params[key];
        }
      }
    }
    return resultParams;
  }

  constructor(props) {
    super(...props);
    this.handleRoutehange = this.handleRoutehange.bind(this);
  }

  handleRoutehange(url, params, method = 'push') {
    this.props.router[method]({
        pathname: url,
        query: this.formatParams(params)
    });
  }

  render() {
    return (
      <ComponsedComponent
        {...this.props}
        {...this.state}
        onRouteChange={this.handleRoutehange}
      />
    );
  }
}
