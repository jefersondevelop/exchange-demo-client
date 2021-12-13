import React from "react";
import Dashboard from "./dashboards";

import { useMain } from '../context/mainContext'
import Auth from "./auth";
import Landing from "./landing/landing"
import { ExchangeProvider } from "../context/exchange";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const MainLayout = () => {

    const { user }: any = useMain();

    return (
        <Router >
            {
                (user && user.logged) ?
                    <Dashboard />
                    :
                    <Switch>
                        <Route exact path="/">
                            <ExchangeProvider>
                                <Landing />
                            </ExchangeProvider>
                        </Route>
                        <Route exact path="/login">
                            <Auth />
                        </Route>
                    </Switch>
            }

        </Router>
    )
}

export default MainLayout;