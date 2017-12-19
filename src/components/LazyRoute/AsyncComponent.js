import React from 'react';
import PropTypes from 'prop-types';

class AsyncComponent extends React.Component {
  static checkComponent(component) {
    // 适配组件传入和路由注入传入两种写法
    if (typeof component === 'function') {
      return { lazyComp: component };
    }
    return component;
  }

  constructor(props) {
    super(props);
    this.state = {
      Component: null,
      loaded: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.component.key !== this.props.component.key) {
      this.setState({ loaded: false });
      this.loadComponent(nextProps.component, nextProps.store);
    }
  }

  componentDidMount() {
    if (this.hasLoadedComponent()) {
      return;
    }
    const { component, store } = this.props;
    this.loadComponent(component, store);
  }

  loadComponent(component, store) {
    const { lazyComp, injector = null, key } = AsyncComponent.checkComponent(component);
    lazyComp()
      .then(module => module.default)
      .then((Component) => {
        this.setState({ Component, loaded: true });
        if (injector) {
          injector(store, key);
        }
      })
      .catch((err) => {
        console.error('Cannot load component in <AsyncComponent />');
        throw err;
      });
  }

  hasLoadedComponent() {
    return this.state.Component !== null;
  }

  render() {
    const { Component } = this.state;
    return (Component) ? <Component {...this.props} /> : <span>Loading...</span>;
  }
}

AsyncComponent.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.func
  ]).isRequired,
  store: PropTypes.object.isRequired
};

export default AsyncComponent;
