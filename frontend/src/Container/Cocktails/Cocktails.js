import React, {Component} from 'react';
import {connect} from "react-redux";
import {getAllCocktails} from "../../Store/action/actionCocktails";
import Grid from "@material-ui/core/Grid";
import CardCocktail from "../../Component/CardCocktail/CardCocktail";

class Cocktails extends Component {

    componentDidMount() {
        this.props.getAllCocktails()
    }


    render() {
        return (
            <>
                <Grid container direction="row" spacing={2}>
                    {this.props.cocktails && this.props.cocktails.map(cocktail =>
                        cocktail.publish &&
                        <Grid key={cocktail._id} item xs>
                            <CardCocktail cocktail={cocktail}/>
                        </Grid>
                    )}
                </Grid>
            </>
        );
    }
}
const mapStateToProps = (state) =>({
    cocktails: state.cocktails.cocktails,
    user: state.users.user,
});
const mapDispatchToProps = dispatch => ({
    getAllCocktails: ()=> dispatch(getAllCocktails()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cocktails);