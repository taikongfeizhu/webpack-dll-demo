import React from 'react'
import { Route } from 'react-router-dom'
import ReactChildrenMap from './ReactChildrenMap'
import CoreLayout from "layout/CoreLayout";
import Home from "./Home";

const RouteMap = ({ location, store })=> {
  return (
    <ReactChildrenMap key={location.pathname}>
      <Route location={location} exact path="/" component={CoreLayout}></Route>
      <Route location={location} exact path="/home" component={Home}></Route>
    </ReactChildrenMap>
  )
}

export default RouteMap
