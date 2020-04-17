import React from 'react';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Container from "@material-ui/core/Container";
import {NavLink} from "react-router-dom";
import Button from "@material-ui/core/Button";
import {useDispatch, useSelector} from "react-redux";
import UserMenu from "../../Component/UserMenu/UserMenu";
import {logoutUser} from "../../Store/action/actionUsers";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        textDecoration: 'none',
        color: 'white'
    },
}));

const AppBarBlock = () => {
    const user = useSelector(state => state.users.user);
    const dispatch = useDispatch();
    const classes = useStyles();
    return (
        <AppBar position="static">
            <Container>
                <Toolbar>
                    <Typography variant="h6" className={classes.title} component={NavLink} to="/" >
                        Coctail builder
                    </Typography>
                    {
                        user && (user.role === 'user' ?
                        <Typography variant="h6" className={classes.title} component={NavLink} to="/cocktails" >
                            My cocktails
                        </Typography> :
                            <Typography variant="h6" className={classes.title} component={NavLink} to="/cocktails" >
                                Control cocktails
                            </Typography>)
                    }
                    {
                        user ?
                            <UserMenu user={user} logout={()=> dispatch(logoutUser())}/>
                            :
                            <Button  component={NavLink} to="/login" color="inherit"> Login</Button>
                    }
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default AppBarBlock;