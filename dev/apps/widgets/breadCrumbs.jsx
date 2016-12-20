import React, { Component, PropTypes } from 'react';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router';

// 导航栏
export class BreadCrumbs extends Component {

  componentWillMount() {
    var { titleBar, titlePrev, handleComponentWillMount } = this.props;
    document.title = titlePrev ? `${titlePrev}-${titleBar}` : titleBar;
    if (handleComponentWillMount && typeof handleComponentWillMount === 'function') {
      handleComponentWillMount();
    }
  }

  componentWillReceiveProps(nextProps) {
    var { titleBar, titlePrev } = nextProps;
    document.title = titlePrev ? `${titlePrev}-${titleBar}` : titleBar;
  }

  render() {
    const { link, titleBar, titlePrev } = this.props;
    return (
      <div className="ant-layout-breadcrumb">
        {titlePrev
          ? <Breadcrumb>
            <Breadcrumb.Item>
              {link ?
                <Link to={link} activeClassName="active-link" className="breadcrumb-link">
                  {titlePrev}
                </Link> : titlePrev}
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              {titleBar}
            </Breadcrumb.Item>
          </Breadcrumb>
          : <Breadcrumb>
            <Breadcrumb.Item>
              {link ? <Link to={link}>{titleBar}</Link> : titleBar}
            </Breadcrumb.Item>
          </Breadcrumb>
        }
      </div>
    );
  }
}

BreadCrumbs.propTypes = {
  link: PropTypes.string.isRequired,
  titleBar: PropTypes.string.isRequired,
  titlePrev: PropTypes.string,
  handleComponentWillMount: PropTypes.func
};
