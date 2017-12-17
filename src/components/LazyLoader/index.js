import React, { Component } from 'react'
import PropTypes from 'prop-types'

/**
 * 懒加载组件
 * 提取自： https://webpack.js.org/guides/lazy-load-react/
 */
class LazilyLoad extends Component {

  constructor (props) {
    super(props)
    this.state = {
      isLoaded: false
    }
  }

  componentDidMount () {
    this._isMounted = true
    this.load()
  }

  componentDidUpdate (previous) {
    const shouldLoad = !!Object.keys(this.props.modules).filter((key) => {
      return this.props.modules[key] !== previous.modules[key]
    }).length
    if (shouldLoad) {
      this.load()
    }
  }

  componentWillUnmount () {
    this._isMounted = false
  }

  load () {
    this.setState({
      isLoaded: false
    })

    const { modules } = this.props
    const keys = Object.keys(modules)

    Promise.all(keys.map((key) => importLazy(modules[key]())))
      .then((values) => (keys.reduce((agg, key, index) => {
        const newAgg = agg
        newAgg[key] = values[index]
        return newAgg
      }, {})))
      .then((result) => {
        if (!this._isMounted) return null
        this.setState({ modules: result, isLoaded: true })
      })
  }

  render () {
    if (!this.state.isLoaded) return null
    return React.Children.only(this.props.children(this.state.modules))
  }
}

LazilyLoad.propTypes = {
  modules: PropTypes.object.isRequired,
  children: PropTypes.func.isRequired
}

/**
 * 高阶函数，用于组件内部懒加载其它组件。
 *
 * @param Component
 * @param modules
 * @returns {function(*): XML}
 * @constructor
 */
export const LazilyLoadFactory = (Component, modules) => {
  return (props) => (
    <LazilyLoad modules={modules}>
      {(mods) => <Component {...mods} {...props} />}
    </LazilyLoad>
  )
}

export const importLazy = (promise) => (
  promise.then((result) => result.default)
)

/**
 * 将单个组件转换为懒加载组件。
 *
 * 用法： lazilyComponent(import('./hotList/List1'))(...props)
 *
 * @param importPromise import('./xxx') 形式， webpack 才可以将相应组件抽离出单独的 chunk 文件
 * @returns {function(*): XML}
 */
export const lazilyComponent = (importPromise) => {
  return props => (
    <LazilyLoad
      modules={{
        Comp: () => importLazy(importPromise)
      }}
    >
      {({ Comp }) => (
        <Comp {...props} />
      )}
    </LazilyLoad>
  )
}

export default LazilyLoad
