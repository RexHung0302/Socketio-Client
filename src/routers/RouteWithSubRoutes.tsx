import React from "react";
import { Route } from "react-router-dom";

// TS
import { routeType } from ".";

const RouteWithSubRoutes = (route: routeType) => {
  return (
    <Route
      {...route}
      path={route.path}
      render={(props) => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes} />
      )}
    />
  );
};

export default RouteWithSubRoutes;
