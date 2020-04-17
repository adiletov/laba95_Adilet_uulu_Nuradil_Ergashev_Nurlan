import React from 'react';
import Chip from "@material-ui/core/Chip";
import {useDispatch} from "react-redux";
import {deleteCocktailId, publishCocktail} from "../../Store/action/actionCocktails";
import IconButton from "@material-ui/core/IconButton";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const ControlButtons = ({cocktail, user}) => {
    const dispatch = useDispatch();

    const publishControl = (id) => {
        dispatch(publishCocktail(id))
    };

    const deleteCocktail = (cocktailId) => {
        dispatch(deleteCocktailId(cocktailId))
    };


    if (user.role === 'admin') {
        if (cocktail.publish) {
            return <><Chip label="Published" style={{background: 'green', color: 'white'}}
                           onClick={() => publishControl(cocktail._id)}/>
                <IconButton color="primary" onClick={() => deleteCocktail(cocktail._id)} component="span">
                    <DeleteForeverIcon/>
                </IconButton>
            </>
        } else {
            return <><Chip label="Unpublished" color="primary" onClick={() => publishControl(cocktail._id)}/>
                <IconButton color="primary" onClick={() => deleteCocktail(cocktail._id)} component="span">
                    <DeleteForeverIcon/>
                </IconButton>
            </>
        }
    } else {
        if (cocktail.publish) {
            return <><Chip label="Published" color="primary" disabled/>
                <IconButton color="primary" onClick={() => deleteCocktail(cocktail._id)} component="span">
                    <DeleteForeverIcon/>
                </IconButton>
            </>
        } else {
            return <><Chip label="your cocktail is under review by the moderator" color="secondary" disabled/>
                <IconButton color="primary" onClick={() => deleteCocktail(cocktail._id)} component="span">
                <DeleteForeverIcon/>
                </IconButton>
        </>
        }
    }
};

export default ControlButtons;