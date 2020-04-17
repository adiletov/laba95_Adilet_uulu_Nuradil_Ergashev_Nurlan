import React, {Component} from 'react';
import FacebookLogin from 'react-facebook-login';
import {connect} from "react-redux";
import {registerFacebookUser} from "../../Store/action/actionUsers";


class FacebookButton extends Component {
    responseFacebook = (response) => {
        this.props.registerFacebookUser(response)
    };
    render() {
        return (
            <FacebookLogin
                appId="1342251599302385"
                fields="name,email,picture"
                render={renderProps => (
                    <button onClick={renderProps.onClick}>This is my custom FB button</button>
                )}
                callback={this.responseFacebook}
            />
        );
    }
}


const mapDispatchToProps = dispatch => ({
    registerFacebookUser : (user) => dispatch(registerFacebookUser(user))
});

export default connect(null, mapDispatchToProps)(FacebookButton);