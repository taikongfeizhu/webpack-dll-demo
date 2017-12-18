import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Layout, Menu, Breadcrumb, Icon } from 'antd';

import styles from './CoreLayout.less'

const { Header, Content, Footer, Sider } = Layout;

const SubMenu = Menu.SubMenu;

class CoreLayout extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      collapsed: false,
    };
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  render() {
    return (
     <Layout style={{ minHeight: '100vh' }}>
       <Sider
        trigger={null}
        collapsible
        collapsed={this.state.collapsed}
       >
         <div className={styles.logo} />
         <ul className={styles.nav}>
           <li>
             <Icon type="pie-chart" />
             <span><Link to="/home">Home</Link></span>
           </li>
           <li>
             <Icon type="desktop" />
             <span><Link to="/list">List</Link></span>
           </li>
           <li>
             <Icon type="user" />
             <span><Link to="/detail">Detail</Link></span>
           </li>
           <li>
             <Icon type="upload" />
             <span><Link to="/async-componet">Async</Link></span>
           </li>
           <li>
             <Icon type="pie-chart" />
             <span><Link to="/dashboard">dashboard</Link></span>
           </li>
           <li>
             <Icon type="pie-chart" />
             <span><Link to="/inject">inject</Link></span>
           </li>
         </ul>
       </Sider>
       <Layout>
         <Header style={{ background: '#fff', padding: 0 }}>
           <Icon
            className={styles.trigger}
            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={this.toggle}
           />
         </Header>
         <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
           {this.props.children}
         </Content>
       </Layout>
     </Layout>
    );
  }
}

CoreLayout.propTypes = {
  children: PropTypes.object
}

export default CoreLayout
