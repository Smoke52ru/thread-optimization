import React from "react";
import {Layout} from "antd";
import {Link, Outlet} from "react-router-dom";
import {routes} from "routing/routes";

const {Header, Content} = Layout

export const MainLayout = () =>
  (
    <Layout>
      <Header>
        <Link to={routes.permutations}>Permutations</Link>
      </Header>
      <Content>
        <Outlet/>
      </Content>
    </Layout>
  )