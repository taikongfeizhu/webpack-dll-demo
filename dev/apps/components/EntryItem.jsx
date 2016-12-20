import React, {Component, PropTypes} from "react";
import { withRouter } from "react-router";

@withRouter
class EntryItem extends Component {

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
        hello page
      </div>
    );
  }
}

EntryItem.propTypes = {

}

export default EntryItem;
