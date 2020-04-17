import React, {Component} from 'react';
import FormElement from "../../Component/Form/FormElement";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import FacebookButton from "../../Component/FacebookButton/FacebookButton";
import Divider from "@material-ui/core/Divider";
import {connect} from "react-redux";
import {loginUser} from "../../Store/action/actionUsers";
import Alert from "@material-ui/lab/Alert";

class Login extends Component {
    state = {
        username: '',
        password: ''
    };
    inputChangeHandler = e => {
        this.setState({[e.target.name]: e.target.value})
    };

    submitChangeHandler = (e) => {
        e.preventDefault();
        this.props.loginUser({...this.state})
    };


    render() {
        return (
            <>
                <Grid container justify="center" spacing={2}>
                    <Grid item xs={10} md={6} lg={3}
                          style={{border: '1px solid black', padding: '30px', textAlign: 'center'}}>
                        <form onSubmit={this.submitChangeHandler}>
                            {this.props.loginError &&
                            <Grid item xs>
                                <Alert severity="error">{this.props.loginError.error}</Alert>
                            </Grid>
                            }
                            <Grid container direction="column" spacing={2}>
                                <Grid item xs>
                                    <FormElement
                                        type="text"
                                        propertyName="username"
                                        label="Username"
                                        title="Имя пользователя"
                                        value={this.state.username}
                                        onChange={this.inputChangeHandler}
                                    />
                                </Grid>
                                <Grid item xs>
                                    <FormElement
                                        type="password"
                                        propertyName="password"
                                        label="password"
                                        title="Пароль"
                                        value={this.state.password}
                                        onChange={this.inputChangeHandler}
                                    />
                                </Grid>
                                <Grid item xs>
                                    <Button type="submit" fullWidth variant="contained" color="primary">Войти</Button>
                                </Grid>
                                <Divider/>
                                <Grid item xs>
                                    <FacebookButton/>
                                </Grid>
                            </Grid>
                        </form>
                    </Grid>
                </Grid>
            </>
        );
    }
}

const mapStateToProps = state => ({
    loginError: state.users.loginError,
});
const mapDispatchToProps = dispatch => ({
    loginUser: (user)=> dispatch(loginUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);