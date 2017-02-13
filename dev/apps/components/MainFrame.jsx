import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Icon } from 'antd';
import NavList from './NavList';
import classnames from 'classnames';

class MainFrame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sideBarShow: true
    };
    this.handleSideBarToggle = this.handleSideBarToggle.bind(this);
  }

  handleSideBarToggle() {
    this.setState({
      sideBarShow: !this.state.sideBarShow
    });
  }

  render() {
    const { sideBarShow } = this.state;
    const wrapperClass = classnames({
      wrapper: true,
      'wrapper-full': !sideBarShow
    });
    return (
      <div>
        <header>
          <Link to="/" className="logo">Github Search</Link>
          <a className="navbar-btn sidebar-toggle" onClick={this.handleSideBarToggle}>
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </a>
          <a
             className="exit-button"
             target="_blank"
             href="https://github.com/taikongfeizhu/webpack-dll-demo">
            <Icon type="github" />
          </a>
          <a className="user-name">
            {window.merseaConf ? merseaConf.employeeName : ''}
          </a>
        </header>
        <div className={wrapperClass}>
          <NavList sideBarStatus={sideBarShow}/>
          <div className="main-layout-aside">{this.props.children}</div>
          <div style={{ clear: 'both' }}/>
        </div>
      </div>
    );
  }
}

MainFrame.propTypes = {
  children: PropTypes.any
}

export default MainFrame;
