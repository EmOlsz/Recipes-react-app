// @flow
import React from "react";
import { isEqual } from 'lodash';

import RecipesGroup from './RecipesGroup';
import Dialog from './Dialog/index';
import Button from './Button';
import type { Recipe } from "./utils/types";

type State = {
  isDialogOpen: boolean,
  recipeList: Array<Recipe>,
  selectedRecipe: ?Recipe,
}

class App extends React.Component<{}, State> {
  state = {
    isDialogOpen: false,
    recipeList: [],
    selectedRecipe: null,
  };
  
  componentDidMount() {
    const storageRecipeListJson = localStorage.getItem('recipeList') || '[]';
    const storageRecipeList = JSON.parse(storageRecipeListJson);
    this.setState({
      recipeList: storageRecipeList
    })
  }
  
  componentDidUpdate() {
    const { recipeList } = this.state;
    const storageRecipeListJson = localStorage.getItem('recipeList') || '[]';
    const storageRecipeList = JSON.parse(storageRecipeListJson);
    if (!isEqual(recipeList, storageRecipeList)) {
      localStorage.setItem('recipeList', JSON.stringify(recipeList));
    }
  }
  
  handleRecipeAdd = (recipe: Recipe) => {
    this.setState({
      recipeList: [...this.state.recipeList, recipe]
    })
  };
  
  handleRecipeEdit = (editedRecipe: Recipe) => {
    const { recipeList } = this.state;
    const editedRecipeIndex = recipeList.findIndex(({ id }) => id === editedRecipe.id);
    const reducedRecipeList = recipeList.filter(({ id }) => editedRecipe.id !== id);
    reducedRecipeList.splice(editedRecipeIndex, 0, editedRecipe);
    this.setState({
      recipeList: [...reducedRecipeList]
    })
  };
  
  handleRecipeDelete = (deletedRecipe: Recipe) => {
    const { recipeList } = this.state;
    const reducedRecipeList = recipeList.filter(({ id }) => deletedRecipe.id !== id);
    this.setState({
      recipeList: [...reducedRecipeList]
    })
  };
  
  handleDialogOpen = (selectedRecipe: ?Recipe = null) => {
    this.setState({
      isDialogOpen: true,
      selectedRecipe
    })
  };
  
  handleDialogClose = () => {
    this.setState({
      isDialogOpen: false,
      selectedRecipe: null
    })
  };
  
  render() {
    const { isDialogOpen, recipeList, selectedRecipe } = this.state;
    
    return (
      <div className="main-content">
        <header className="main-content__header">
          <h2 className="main-content__header-text container">Your handy recipe list</h2>
        </header>
        <main className="main-content__body container">
          <RecipesGroup
            recipeList={recipeList}
            onDialogOpen={this.handleDialogOpen}
            onRecipeDelete={this.handleRecipeDelete}
          />
          <div className="main-content__body-controls">
            <h4>
              <span>You've got</span>
              <span className="main-content__body-controls-counter">{recipeList.length}</span>
              <span>recipes</span>
            </h4>
            <Button
              text="Add Recipe"
              intent="primary"
              onClick={() => this.handleDialogOpen()}
            />
          </div>
        </main>
        <Dialog
          isOpen={isDialogOpen}
          recipe={selectedRecipe}
          onRecipeAdd={this.handleRecipeAdd}
          onRecipeEdit={this.handleRecipeEdit}
          onDialogClose={this.handleDialogClose}
        />
      </div>
    );
  }
}

export default App;