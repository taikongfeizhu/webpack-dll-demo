import React from 'react'

class AsyncComponent extends React.Component {
  constructor (props) {
    super(props)
    
    this.state = {
      Component: null
    }
  }
  
  componentWillReceiveProps(nextProps) {
    if (nextProps.component !== this.props.component) {
      this.setState({loaded: false});
      this.loadComponent(nextProps.component, nextProps.store);
    }
  }
  
  componentDidMount () {
    if (this.hasLoadedComponent()) {
      return
    }
    const { component, store } = this.props
    this.loadComponent(component, store);
  }
  
  checkComponent (component) {
    // 适配组件传入和路由注入传入两种写法
    if (typeof component === 'function') {
      return { lazyComp: component }
    }
    return component
  }
  
  loadComponent(component, store) {
    const { lazyComp, injector = null, key } = this.checkComponent(component)
    lazyComp()
      .then(module => module.default)
      .then((Component) => {
        this.setState({ Component })
        if(injector){
          injector(store, key)
        }
      })
      .catch((err) => {
        console.error(`Cannot load component in <AsyncComponent />`)
        throw err
      })
  }
  
  hasLoadedComponent () {
    return this.state.Component !== null
  }
  
  render () {
    const { Component } = this.state
    return (Component) ? <Component {...this.props} /> : <span>Loading...</span>
  }
}

export default AsyncComponent
