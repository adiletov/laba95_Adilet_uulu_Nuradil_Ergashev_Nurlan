import React from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import {apiUrl} from "../../apiUrl";
import noimage from '../../assets/images/noimage.jpeg';
import Grid from "@material-ui/core/Grid";
import IngredientList from "../IngredientList/IngredientList";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ControlButtons from "../ControlButtons/ControlButtons";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));

const CardCocktail = ({cocktail, user, children}) => {

    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <CardActionArea>
                {
                    cocktail.image ?
                        <CardMedia
                            component="img"
                            alt={cocktail.title}
                            height="340"
                            image={apiUrl + '/uploads/' + cocktail.image}
                        /> :
                        <CardMedia
                            component="img"
                            alt="no image"
                            height="340"
                            image={noimage}
                        />
                }
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {cocktail.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {cocktail.recipes}
                    </Typography>
                    <Grid item xs>
                        <ExpansionPanel variant="outlined">
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon/>}
                            >
                                <Typography className={classes.heading}> Ingredients:
                                </Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <IngredientList ingredients={JSON.parse(cocktail.ingredients)}/>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    </Grid>
                </CardContent>
            </CardActionArea>
            <CardActions>
                {
                    user &&
                    <Grid item xs>
                        <ControlButtons cocktail={cocktail} user={user} />
                    </Grid>
                }
                {children}
            </CardActions>
        </Card>
    );
};

export default CardCocktail;