import React from 'react';
import { Menu } from 'antd';
import { HomeOutlined } from '@ant-design/icons';



// const SubMenu = Menu.SubMenu;
// const MenuItemGroup = Menu.ItemGroup;

function LeftMenu(props) {
  return (
    <Menu mode={props.mode} className="leftMenu">
      {/* <Menu.Item key="mail">

        <a href="/">
          <HomeOutlined style={{
            fontSize: "1.3rem",
            fontWeight: 'bold',
            color: '#1890ff'
          }} />
          Home
        </a>
      </Menu.Item> */}
      {/* <SubMenu title={<span>Blogs</span>}>
        <MenuItemGroup title="Item 1">
          <Menu.Item key="setting:1">Option 1</Menu.Item>
          <Menu.Item key="setting:2">Option 2</Menu.Item>
        </MenuItemGroup>
        <MenuItemGroup title="Item 2">
          <Menu.Item key="setting:3">Option 3</Menu.Item>
          <Menu.Item key="setting:4">Option 4</Menu.Item>
        </MenuItemGroup>
      </SubMenu> */}
    </Menu>
  )
}

export default LeftMenu