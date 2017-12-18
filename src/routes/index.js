import React, { Component } from 'react'
import CoreLayout from '../layout/CoreLayout'
import NotFound from './NotFound'
import LazyRoute from '../components/LazyRoute'

import Home from './Home'
import List from 'views/List'
import Content from 'views/Content'
import Detail from 'views/Detail'
import Welcome from 'views/Welcome'

import {
  Route,
  Redirect,
  Match,
  Switch
} from 'react-router-dom'

const { AsyncComponet } = LazyRoute

class App extends Component {
  constructor(props){
    super(props)
  }

  render() {
    const { store } = this.props
    return (
      <CoreLayout>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/home" component={Home}/>
          <Route path="/detail" component={Detail(store)}/>

          <LazyRoute
            component={Welcome}
            store={store}
            path="/inject"
          />

          <Route path="/async-componet" render={(props)=>
            <AsyncComponet {...props} component={()=>import(/* webpackChunkName: "asyc" */ './Async')} />
          }/>

          <Route path="/list" render={(props)=>
            <List {...props}>
              <Switch>{/*Renders the first child <Route> or <Redirect> that matches the location.*/}
                <Route path="/list/content" component={Content}/>
                <LazyRoute
                  component={Welcome}
                  injector={WelcomeInject}
                  store={store}
                  path="/list/welcome"
                />
                <Redirect from="/list" to="/list/content"/> {/*重定向*/}
              </Switch>
            </List>
          }/>
          <Route component={NotFound}/>
        </Switch>
      </CoreLayout>
    )
  }
}

export default App
