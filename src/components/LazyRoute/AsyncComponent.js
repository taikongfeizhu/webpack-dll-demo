import React, {Component} from 'react'

export default class AsyncComponent extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      showLoader: false
    }
  }

  componentDidMount() {
    this.loadComponent(this.props.component);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.component !== this.props.component) {
      this.setState({loaded: false});
      this.loadComponent(nextProps.component);
    }
  }

  loadComponent(componentPromise) {
    const { injector, store, chunkName: key } = this.props
    componentPromise().then((module) => {
      this.component = module.default;
      this.setState({loaded: true});
      if (injector) {
        injector(store, key)
      }
    }).catch((err) => {
      console.error(`Cannot load component in <LazyRoute />`);
      throw err;
    })
  }

  render() {
    const {loaded} = this.state
    if (loaded === true) {
      return <this.component {...this.props} />
    } else {
      return (<div>Loading...</div>)
    }
  }
}
