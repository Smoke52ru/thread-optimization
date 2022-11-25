import React from "react";
import {Layout, Space} from "antd";
import {Link, Outlet} from "react-router-dom";
import {routes} from "routing/routes";

const {Header, Content} = Layout

export const MainLayout = () =>
  (
    <Layout>
      <Header>
        <Space>
          <Link to={routes.permutations}>Permutations</Link>
          <Link to={routes.distribution}>Distribution</Link>
        </Space>
      </Header>
      <Content>
        <Outlet/>
      </Content>
    </Layout>
  )