/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Menu } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import { CloudUploadOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons';
import axios from 'axios';
import { USER_SERVER } from '../../../Config';
import { withRouter } from 'react-router-dom';
import { useSelector } from "react-redux";

function RightMenu(props) {
  const user = useSelector(state => state.user)

  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then(response => {
      if (response.status === 200) {
        props.history.push("/login");
      } else {
        alert('Log Out Failed')
      }
    });
  };

  if (user.userData && !user.userData.isAuth) {
    return (
      <Menu mode={props.mode} className="rightMenu">
        <Menu.Item key="mail">
          <a href="/login">
            <UserOutlined style={{
              fontSize: "1.25rem",
              fontWeight: 'bold',
              marginBottom: 3,
              color: '#1890ff'
            }} />
            Login
          </a>
        </Menu.Item>
        <Menu.Item key="app">
          <a href="/register">
            <UserAddOutlined style={{
              fontSize: "1.30rem",
              fontWeight: 'bold',
              marginBottom: 3,
              color: '#1890ff'
            }} />



            Signup</a>
        </Menu.Item>
      </Menu>
    )
  } else {
    return (
      <Menu mode={props.mode}>

        <Menu.Item key="upload">
          <a href="/photo/upload">
            <CloudUploadOutlined style={{
              fontSize: "1.50rem",
              color: '#1890ff',
              cursor: "pointer"
            }} />
            {/* {'\u00A0'} */}
            Upload
          </a>
        </Menu.Item>


        <Menu.Item key="logout" >
          <a onClick={logoutHandler}>
            <FontAwesomeIcon
              icon={faDoorOpen}
              style={{ color: "1890ff", fontSize: "1.25rem", cursor: "pointer" }}
            />
            {'\u00A0'}
             Logout


          </a>
        </Menu.Item>
      </Menu>
    )
  }
}

export default withRouter(RightMenu);

