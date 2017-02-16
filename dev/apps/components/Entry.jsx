import React, {Component, PropTypes} from "react";
import * as d3 from "d3";
import DateFilter from './DateFilter';
import { BreadCrumbs } from '../widgets/breadCrumbs';
import { withRouter } from "react-router";


class Entry extends Component {

  getChildContext() {
    return {
      color: 'gray'
    };
  }

  constructor(arg) {
    super(...arg);
    this.state = {
      searchParam: null
    };
    this.node = null;
    this.fetchData = this.fetchData.bind(this);
  }

  fetchData(pageInfo) {

  }

  componentDidMount() {
    // d3.select(this.node).text('hello page');
    const node = this.node;
    const a = [1 ,2, 3];
    var b = a;
    b = [4, 5, 6];
    console.log(a);
    console.log(b);

  }

  handleOnChange = (value) => {
    console.log(value,'>>>');
  }

  render() {
    return (
      <div>
        <div className="header">
          <BreadCrumbs titleBar="资源搜索" titlePrev="接口查询" link="/entry/"/>
        </div>
        <div className="content">
          <div id="target" ref={(c) => this.node = c}>
            <DateFilter onChange={this.handleOnChange}/>
          </div>
        </div>
      </div>
    );
  }
}

Entry.propTypes = {

}

Entry.childContextTypes = {
  color: PropTypes.string.isRequired
};

export default withRouter(Entry);