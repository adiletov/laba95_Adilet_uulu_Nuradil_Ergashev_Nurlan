import React from 'react';
import Avatar from "@material-ui/core/Avatar";
import {apiUrl} from "../../apiUrl";

const AvatarBlock = ({user}) => {
    if (user.avatar){
        if (user.facebookId) {
                return <Avatar style={styles} src={user.avatar} alt="avatar"/>
            } else {
                return <Avatar style={styles} src={apiUrl + '/uploads/' + user.avatar} alt="avatar"/>
            }
    }else{
        return <Avatar style={styles}/>
    }
};
const styles = {
    marginRight: '10px'
};
export default AvatarBlock;