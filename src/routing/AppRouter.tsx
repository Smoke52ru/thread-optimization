import React from "react";
import { useRoutes} from 'react-router-dom';

import {RoutingConfig} from 'routing/RoutingConfig';

export const AppRouter = () => (
  useRoutes(RoutingConfig)
);
