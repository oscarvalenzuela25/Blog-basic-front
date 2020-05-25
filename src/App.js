import React from "react";
//Cambiado BrowserRouter por HashRouter
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import routes from "./config/routes";
import AuthProvider from "./providers/AuthProviders";

//Estilos
import "./App.scss";

/*Componentes de prueba para probar de otra forma
import LayoutAdmin from "./layout/LayoutAdmin";
import LayoutBasic from "./layout/LayoutBasic";
*/

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          {routes.map((route, index) => {
            return <RouteWithSubRoutes key={index} {...route} />;
          })}

          {/* Otra forma  de tener multiples layout, los Route dentro del Layout y insertando los props.children dentro del layout
          <Route
            path={"/admin"}
            exact={false}
            render={() => (
              <LayoutAdmin>
                <Route exact={true} path={"/admin"} render={() => <Admin />} />
                <Route
                  exact={true}
                  path={"/admin/login"}
                  render={() => <SigIn />}
                />
              </LayoutAdmin>
            )}
          />

          <Route
            path={"/"}
            exact={true}
            render={() => (
              <LayoutBasic>
                <Route exact={true} path={"/"} render={() => <Home />} />
                <Route
                  exact={true}
                  path={"/contact"}
                  render={() => <Contact />}
                />
              </LayoutBasic>
            )}
          />
          */}
          {/* Otra forma mas de tener multiples layout, las rutas van dentro del archivo Layout distintivo, creo que asi queda mas ordenado
          <Route path={"/admin"} exact={true} render={() => <LayoutAdmin />} />
          <Route path={"/"} exact={true} render={() => <LayoutBasic />} />
          */}
        </Switch>
      </Router>
    </AuthProvider>
  );
};

function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={(props) => <route.component routes={route.routes} {...props} />}
    />
  );
}

export default App;
