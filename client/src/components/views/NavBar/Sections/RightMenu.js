/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Menu } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import { UploadOutlined } from '@ant-design/icons';
import { UserOutlined } from '@ant-design/icons';
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
              fontSize: "1.75rem",
              fontWeight: 'bold',
              marginBottom: 3,
              color: '#1890ff'
            }} />
          </a>
        </Menu.Item>
        {/* <Menu.Item key="app">
          <a href="/register">Signup</a>
        </Menu.Item> */}
      </Menu>
    )
  } else {
    return (
      <Menu mode={props.mode}>

        <Menu.Item key="upload">
          <a href="/photo/upload">
            <UploadOutlined style={{ fontSize: "1.75rem", marginBottom: 3, color: '#1890ff' }} />
          </a>
        </Menu.Item>


        <Menu.Item key="logout" >
          <a onClick={logoutHandler}>
            <FontAwesomeIcon
              icon={faDoorOpen}
              style={{ color: "1890ff", fontSize: "22px", cursor: "pointer" }}
            />


          </a>
        </Menu.Item>
      </Menu>
    )
  }
}

export default withRouter(RightMenu);

