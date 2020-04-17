import React from 'react';
import './App.css';
import AppBarBlock from "./Container/AppBarBlock/AppBarBlock";
import {Route, Switch} from "react-router-dom";
import Login from "./Container/Login/Login";
import Toolbar from "@material-ui/core/Toolbar";
import {ToastContainer} from "react-toastify";
import CssBaseline from "@material-ui/core/CssBaseline";
import AddCocktail from "./Container/AddCocktail/AddCocktail";
import Container from "@material-ui/core/Container";
import MyCocktails from "./Container/MyCocktails/MyCocktails";
import {useSelector} from "react-redux";
import Cocktails from "./Container/Cocktails/Cocktails";

function App() {
    const user = useSelector(state => state.users.user);
    return (
        <>
            <CssBaseline/>
            <ToastContainer autoClose={2000}/>
            <AppBarBlock/>
            <Toolbar/>
            <Container>
                <Switch>
                    {
                        user ?
                            <>
                                <Route exact path="/" component={Cocktails}/>
                                <Route exact path="/cocktails" component={MyCocktails}/>
                                <Route exact path="/cocktail/add" component={AddCocktail}/>
                            </> :
                            <>
                                <Route exact path="/" component={Cocktails}/>
                                <Route exact path="/login" component={Login}/>
                            </>
                    }
                </Switch>
            </Container>
        </>
    );
}

export default App;
