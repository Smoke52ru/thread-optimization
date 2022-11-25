import React from 'react';
import {Navigate, RouteObject} from "react-router-dom";

import {routes} from 'routing/routes';
import {MainLayout} from "components/MainLayout/MainLayout";
import ProcessPermutation from "components/ProcessPermutation";

export const RoutingConfig: RouteObject[] = [
    {
      path: routes.root,
      element: <MainLayout/>,
      children: [
        {
          index: true,
          element: <Navigate to={routes.permutations}/>,
        },
        {
          path: routes.permutations,
          element: <ProcessPermutation/>,
        },
      ],
    },
  ]
;
