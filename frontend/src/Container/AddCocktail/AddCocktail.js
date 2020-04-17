import React, {Component} from 'react';
import Grid from "@material-ui/core/Grid";
import FormElement from "../../Component/Form/FormElement";
import Button from "@material-ui/core/Button";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import {connect} from "react-redux";
import {addNewCocktail} from "../../Store/action/actionCocktails";

class AddCocktail extends Component {
    state = {
        title: '',
        ingredients: [],
        recipes: '',
        image: null
    };

    addIngredient = () => {
        this.setState({ingredients: [...this.state.ingredients, {name: '', amount: ''}]})
    };

    inputChangeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    };

    fileChangeHandler = (e) => {
        this.setState({[e.target.name]: e.target.files[0]})
    };

    submitNewCocktail = (e) => {
        e.preventDefault();
        const stateObj = {...this.state}
        const formData = new FormData();
        Object.keys(stateObj).forEach(key => {
                if (key === 'ingredients') {
                    stateObj[key] = JSON.stringify(stateObj[key]);
                }
                formData.append(key, stateObj[key])
            }
        );
        this.props.addNewCocktail(formData)
    };

    removeIngredient = index => {
        const ingredients = [...this.state.ingredients];

        ingredients.splice(index, 1);

        this.setState({ingredients});
    };

    changeIngredient = (i, key, e) => {
        const ingCopy = {...this.state.ingredients[i]};
        ingCopy[key] = e.target.value;

        const ingsCopy = [...this.state.ingredients];
        ingsCopy[i] = ingCopy;

        this.setState({ingredients: ingsCopy})
    };
    errorHandler = (fieldName) => {
            return this.props.error &&
                this.props.error.errors &&
                this.props.error.errors[fieldName].message
    };


    render() {
        return (
            <form onSubmit={this.submitNewCocktail}>
                <Grid container direction="column" spacing={2}>
                    <Grid item xs>
                        <h3>Add new Cocktail</h3>
                    </Grid>
                    <Grid item xs>
                        <FormElement
                            type="text"
                            propertyName="title"
                            label="Title"
                            value={this.state.title}
                            onChange={this.inputChangeHandler}
                            error={this.errorHandler('title')}

                        />
                    </Grid>
                    <Grid item xs>
                        <FormElement
                            type="textarea"
                            propertyName="recipes"
                            label="Recipes"
                            value={this.state.recipes}
                            onChange={this.inputChangeHandler}
                            error={this.errorHandler('recipes')}
                        />
                    </Grid>
                    <Grid item xs>
                        <Button color="secondary" variant="contained" style={{marginBottom: '10px'}}
                                onClick={this.addIngredient}> Add
                            ingredients</Button>
                        {this.state.ingredients.map((ingredient, i) =>
                            <Grid container direction="row" key={i} spacing={2}>
                                <Grid item xs>
                                    <FormElement
                                        propertyName="name"
                                        type="text"
                                        label="Name"
                                        value={ingredient.name}
                                        onChange={(e) => this.changeIngredient(i, "name", e)}
                                    />
                                </Grid>
                                <Grid item xs>
                                    <FormElement
                                        propertyName="amount"
                                        label="Amount"
                                        type="text"
                                        value={ingredient.amount}
                                        onChange={(e) => this.changeIngredient(i, "amount", e)}
                                    />
                                </Grid>
                                <Grid item xs>
                                    <Button color="secondary"
                                            onClick={() => this.removeIngredient(i)}><HighlightOffIcon/></Button>
                                </Grid>
                            </Grid>
                        )}
                    </Grid>
                    <Grid item xs>
                        <FormElement
                            type="file"
                            propertyName="image"
                            onChange={this.fileChangeHandler}
                        />
                    </Grid>
                    <Grid item xs>
                        <Button type="submit" color="primary" variant="contained"> Add new cocktail</Button>
                    </Grid>
                </Grid>
            </form>
        );
    }
}

const mapStateToProps = state => ({
    error: state.cocktails.addCocktailError
});

const mapDispatchToProps = dispatch => ({
    addNewCocktail: (cocktail) => dispatch(addNewCocktail(cocktail))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddCocktail);