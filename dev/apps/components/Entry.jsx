import React, {Component, PropTypes} from "react";
import { BreadCrumbs } from '../widgets/breadCrumbs';
import { withRouter } from "react-router";

@withRouter
class Entry extends Component {

  constructor(arg){
    super(...arg);
    this.state = {
      searchParam: null
    }
    this.fetchData = this.fetchData.bind(this);
  }

  fetchData(pageInfo) {

  }

  componentDidMount() {
    const { routing:{ query } } = this.props;
    this.fetchData(query);
  }

  render() {
    return (
      <div>
        <div className="header">
          <BreadCrumbs titleBar="资源搜索" titlePrev="接口查询" link="/entry/"/>
        </div>
        <div className="content">
          Entry Page
        </div>
      </div>
    );
  }
}

Entry.propTypes = {

}

export default Entry;
