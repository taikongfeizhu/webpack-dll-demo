import React from 'react'
// eg: const HotFoot3 = AsyncComponent(() =>
// import(/* webpackChunkName: "HotFoot-3" */ "./components/HotFoot3"));

const AsyncComponent = loadComponent => (
  class AsyncComponent extends React.Component {
    state = {
      Component: null,
    }

    componentWillMount() {
      if (this.hasLoadedComponent()) {
        return;
      }

      loadComponent()
        .then(module => module.default)
        .then((Component) => {
          this.setState({Component});
        })
        .catch((err) => {
          console.error(`Cannot load component in <AsyncComponent />`);
          throw err;
        });
    }

    hasLoadedComponent() {
      return this.state.Component !== null;
    }

    render() {
      const {Component} = this.state;
      return (Component) ? <Component {...this.props} /> : null;
    }
  }
);

export default AsyncComponent;
