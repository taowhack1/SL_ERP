import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";

export const columns = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Chinese Score",
    dataIndex: "chinese",
    sorter: {
      compare: (a, b) => a.chinese - b.chinese,
      multiple: 3,
    },
  },
  {
    title: "Math Score",
    dataIndex: "math",
    sorter: {
      compare: (a, b) => a.math - b.math,
      multiple: 2,
    },
  },
  {
    title: "English Score",
    dataIndex: "english",
    sorter: {
      compare: (a, b) => a.english - b.english,
      multiple: 1,
    },
  },
  {
    title: "Address",
    dataIndex: "address",
    ellipsis: true,
  },
];

export const data = [
  {
    key: "1",
    name: "John Brown",
    chinese: 98,
    math: 60,
    english: 70,
    address: "London, Park Lane no. 46 Display tree structure data in Table",
  },
  {
    key: "2",
    name: "Jim Green",
    chinese: 98,
    math: 66,
    english: 89,
    address:
      "New York No. 1 Lake Park Display tree structure data in Table when there is field key",
  },
  {
    key: "3",
    name: "Joe Black",
    chinese: 98,
    math: 90,
    english: 70,
    address: "Display tree structure data in Table when there is field key",
  },
  {
    key: "4",
    name: "Jim Red",
    chinese: 88,
    math: 99,
    english: 89,
    address: "New York No. 1 Lake Park",
  },
  {
    key: "5",
    name: "John Brown",
    chinese: 98,
    math: 60,
    english: 70,
    address: "London, Park Lane no. 46 Display tree structure data in Table",
  },
  {
    key: "6",
    name: "Jim Green",
    chinese: 98,
    math: 66,
    english: 89,
    address:
      "New York No. 1 Lake Park Display tree structure data in Table when there is field key",
  },
  {
    key: "7",
    name: "Joe Black",
    chinese: 98,
    math: 90,
    english: 70,
    address: "Display tree structure data in Table when there is field key",
  },
  {
    key: "8",
    name: "Jim Red",
    chinese: 88,
    math: 99,
    english: 89,
    address: "New York No. 1 Lake Park",
  },
  {
    key: "9",
    name: "Jim Green",
    chinese: 98,
    math: 66,
    english: 89,
    address:
      "New York No. 1 Lake Park Display tree structure data in Table when there is field key",
  },
  {
    key: "10",
    name: "Joe Black",
    chinese: 98,
    math: 90,
    english: 70,
    address: "Display tree structure data in Table when there is field key",
  },
  {
    key: "11",
    name: "Jim Red",
    chinese: 88,
    math: 99,
    english: 89,
    address: "New York No. 1 Lake Park",
  },
];

export const menuReport = (
  <Menu>
    <Menu.Item>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="http://www.alipay.com/"
      >
    key: '1',
    name: 'John Brown',
    chinese: 98,
    math: 60,
    english: 70,
    address: 'London, Park Lane no. 46 Display tree structure data in Table'
  },
  {
    key: '2',
    name: 'Jim Green',
    chinese: 98,
    math: 66,
    english: 89,
    address: 'New York No. 1 Lake Park Display tree structure data in Table when there is field key'
  },
  {
    key: '3',
    name: 'Joe Black',
    chinese: 98,
    math: 90,
    english: 70,
    address: 'Display tree structure data in Table when there is field key'
  },
  {
    key: '4',
    name: 'Jim Red',
    chinese: 88,
    math: 99,
    english: 89,
    address: 'New York No. 1 Lake Park'
  },
  {
    key: '5',
    name: 'John Brown',
    chinese: 98,
    math: 60,
    english: 70,
    address: 'London, Park Lane no. 46 Display tree structure data in Table'
  },
  {
    key: '6',
    name: 'Jim Green',
    chinese: 98,
    math: 66,
    english: 89,
    address: 'New York No. 1 Lake Park Display tree structure data in Table when there is field key'
  },
  {
    key: '7',
    name: 'Joe Black',
    chinese: 98,
    math: 90,
    english: 70,
    address: 'Display tree structure data in Table when there is field key'
  },
  {
    key: '8',
    name: 'Jim Red',
    chinese: 88,
    math: 99,
    english: 89,
    address: 'New York No. 1 Lake Park'
  },
  {
    key: '9',
    name: 'Jim Green',
    chinese: 98,
    math: 66,
    english: 89,
    address: 'New York No. 1 Lake Park Display tree structure data in Table when there is field key'
  },
  {
    key: '10',
    name: 'Joe Black',
    chinese: 98,
    math: 90,
    english: 70,
    address: 'Display tree structure data in Table when there is field key'
  },
  {
    key: '11',
    name: 'Jim Red',
    chinese: 88,
    math: 99,
    english: 89,
    address: 'New York No. 1 Lake Park'
  }
];


export const menuReport = (
  <Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
        1st menu item
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
        2nd menu item
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
        3rd menu item
      </a>
    </Menu.Item>
  </Menu>
);

export const menuConfig = (
  <Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
        1st menu item
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
        3rd menu item
      </a>
    </Menu.Item>
  </Menu>
);


export const menuConfig = (
  <Menu>
    <Menu.Item>
      <Link>To 1</Link>
    </Menu.Item>
    <Menu.Item>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="http://www.taobao.com/"
      >

export const menuProfile = (
  <Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
        1st menu item
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
        3rd menu item
      </a>
    </Menu.Item>
  </Menu>
);


export const operationsMenu = (
  <Menu>
    <Menu.Item>
      <Link to="/inventory/requisition">Requisition</Link>
    </Menu.Item>
    <Menu.Item>
      <Link to="/inventory/location">Location</Link>
    </Menu.Item>
  </Menu>
);

export const menuProfile = (
  <Menu>
    <Menu.Item>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="http://www.alipay.com/"
      >
        1st menu item
      </a>
    </Menu.Item>
    <Menu.Item>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="http://www.taobao.com/"
      >
        2nd menu item
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
        3rd menu item
      </a>
    </Menu.Item>
  </Menu>
);


export const dataComments = [
  {
    author:'UserA',
    content:'We supply a series of design principles, practical patterns and high quality design',
    datetime:'2020-09-22 09:40:32'
  },
  {
    author:'UserB',
    content:'Amazing A We supply a series of design principles, practical patterns and high quality designer website',
    datetime:'2020-09-22 10:48:39'
  }
]

