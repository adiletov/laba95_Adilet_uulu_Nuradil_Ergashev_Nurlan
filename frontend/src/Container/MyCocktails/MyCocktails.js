import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getAllCocktails, getCocktailsUser} from "../../Store/action/actionCocktails";
import CardCocktail from "../../Component/CardCocktail/CardCocktail";
import Grid from "@material-ui/core/Grid";

const MyCocktails = () => {
    const user = useSelector(state=> state.users.user);
    const dispatch = useDispatch();
    useEffect(() => {
        if (user.role === 'admin'){
            dispatch(getAllCocktails())
        }else{
            dispatch(getCocktailsUser())
        }
    }, [dispatch, user]);
    const cocktails = useSelector(state => state.cocktails.cocktails);
    return (
        <>
            <Grid container direction="row" spacing={2}>
                {cocktails && cocktails.map(cocktail =>
                    <Grid key={cocktail._id} item xs>
                        <CardCocktail cocktail={cocktail} user={user}/>
                    </Grid>
                )}
            </Grid>
        </>
    );
};

export default MyCocktails;