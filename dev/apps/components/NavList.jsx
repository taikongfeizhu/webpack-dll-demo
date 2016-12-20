import React, { Component, PropTypes } from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router';
import classnames from 'classnames';
import menuList from '../config/MenuList';

const SubMenu = Menu.SubMenu;

class NavList extends Component {
  constructor (props) {
    super(props);
    this.state = {
      active: true,
      current: 'menu-item-0-0',
      theme: 'light'
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.setState({
      current: e.key
    });
  }

  renderMenuItem(children, loop) {
    return children.map((node, index) => {
      return (
        <Menu.Item key={`menu-item-${loop}-${index}`}>
          <Link to={node.path}>{node.text}</Link>
        </Menu.Item>
      );
    });
  }

  renderSubMenu () {
    return menuList.map((node, index) => {
      let subMenu = null;
      if (node.children) {
        subMenu = (
          <SubMenu
            key={`sub-menu-${index}`}
            title={<span><Icon type={node.icon}/><span>{node.text}</span></span>}>
            {this.renderMenuItem(node.children, index)}
          </SubMenu>
        );
      } else {
        subMenu = (
          <SubMenu
            key={`sub-menu-${index}`}
            title={<span><Icon type={node.icon}/><span>{node.text}</span></span>}/>
        );
      }
      return subMenu;
    });
  }

  render () {
    return (
      <div
        style={{ display: this.props.sideBarStatus ? 'block' : 'none' }}
        className={classnames('nav', { active: this.state.active })}>
        <div className="nav-inner">
          <div ref="list" className="nav-list">
            <Menu
              theme={this.state.theme}
              onClick={this.handleClick}
              defaultOpenKeys={['sub-menu-0']}
              selectedKeys={[this.state.current]}
              mode="inline"
            >
              {this.renderSubMenu()}
            </Menu>
          </div>
        </div>
      </div>
    );
  }
}

NavList.propTypes = {
  onToggle: PropTypes.func,
  sideBarStatus: PropTypes.bool
};

NavList.contextTypes = {
  router: PropTypes.object.isRequired
};

export default NavList;
