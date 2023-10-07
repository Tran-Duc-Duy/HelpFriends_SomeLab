import React from 'react';
import {Redirect, Route, Switch} from "react-router";
import {BrowserRouter} from "react-router-dom";
import './App.css';
import {CommentPage} from "./component/CommentPage";

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path={"/"} component={CommentPage}/>
                <Redirect to={"/"}/>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
