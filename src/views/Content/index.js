import React from 'react';
import LazyLoader from 'components/LazyLoader';
import { Button, Table, DatePicker } from 'antd';
import fetchAPI from 'api';

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadModules: false,
      bookList: []
    };
    this.handleLoadHot = this.handleLoadHot.bind(this);
    this.handleFetchData = this.handleFetchData.bind(this);
  }

  handleLoadHot() {
    if (!this.state.loadModules) {
      this.setState({
        loadModules: true
      });
    }
  }

  handleFetchData() {
    fetchAPI.get('/book/list/')
      .then((resp) => {
        const { status, data } = resp;
        if (status === 200) {
          this.setState({
            bookList: data.data
          });
        }
      });
  }

  listContent = () => {
    return (
      <LazyLoader
        modules={{
          List1: () => import(/* webpackChunkName: "List-1" */ './hotList/List1'),
          List2: () => import(/* webpackChunkName: "List-2" */ './hotList/List2')
        }}
      >
        {({ List1, List2 }) => (
          <div>
            <List1 name="list1" />
            <List2 name="list2" />
          </div>
        )}
      </LazyLoader>
    );
  };

  columns() {
    const columns = [{
      title: '书名',
      dataIndex: 'title'
    },
      {
        title: '作者',
        dataIndex: 'author'
      },
      {
        title: '售价',
        dataIndex: 'currentPrice'
      },
      {
        title: '出版社',
        dataIndex: 'press'
      },
      {
        title: '发行日期',
        dataIndex: 'publishedDate'
      }];
    return columns;
  }

  render() {
    const { loadModules, bookList } = this.state;
    return (
      <div title="脚本异步加载模块">
        <Button onClick={this.handleLoadHot}>load</Button>
        <Button onClick={this.handleFetchData}>Fetch</Button>
        <DatePicker />
        <div>
          {loadModules && this.listContent()}
        </div>
        <Table
          rowKey={(record) => record._id}
          dataSource={bookList}
          columns={this.columns()}
        />
      </div>
    );
  }
}

export default Content;
