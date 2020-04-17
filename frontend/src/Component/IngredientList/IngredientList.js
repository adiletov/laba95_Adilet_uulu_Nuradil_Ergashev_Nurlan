import React from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";



const useStyles = makeStyles((theme) => ({
    title: {
        margin: theme.spacing(1, 0, 1),
    }
}));
const IngredientList = ({ingredients}) => {
    const classes = useStyles();

    return (
        <>
            <Grid item xs={2} md={11} >
            {ingredients.map((ingredient, i) =>
                <Grid container key={i} >
                    <Grid item xs>
                        <Typography   className={classes.title}>
                            {ingredient.name}
                        </Typography>
                    </Grid>
                    <Grid item >
                        <Typography key={i}  className={classes.title}>
                            {ingredient.amount}
                        </Typography>
                    </Grid>
                </Grid>
            )}
            </Grid>
        </>
    );
};

export default IngredientList;