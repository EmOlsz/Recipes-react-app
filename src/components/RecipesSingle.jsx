// @flow
import React from "react";

import Button from './Button'
import type { Recipe } from "./utils/types";

type Props = {
  counter: number,
  data: Recipe,
  onDialogOpen: (selectedRecipe?: ?Recipe) => void,
  onRecipeDelete: (selectedRecipe: Recipe) => void,
}

type State = {
  isBodyOpen: boolean
}

class RecipesSingle extends React.Component<Props, State> {
  state = {
    isBodyOpen: false,
  };
  
  onRecipeBodyToggle = () => {
    this.setState({ isBodyOpen: !this.state.isBodyOpen })
  };
  
  render() {
    const { counter, data, onDialogOpen, onRecipeDelete } = this.props;
    const { isBodyOpen } = this.state;
    return (
      <div className="recipes-group__recipe">
        <div
          className="recipes-group__recipe-header"
          onClick={this.onRecipeBodyToggle}
        >
          {counter}.&nbsp;{data.name}
        </div>
        <div className={`recipes-group__recipe-body ${isBodyOpen ? 'recipes-group__recipe-body_expanded' : ''}`}>
          <div className="recipes-group__recipe-ingredients">
            <h4 className="recipes-group__recipe-ingredients-title">Ingredients:</h4>
            <div className="recipes-group__recipe-ingredients-content">{data.ingredients}</div>
          </div>
          <div className="recipes-group__recipe-button-group">
            <Button
              text="Delete"
              intent="danger"
              onClick={() => onRecipeDelete(data)}
            />
            <Button
              text="Edit"
              intent="none"
              onClick={() => onDialogOpen(data)}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default RecipesSingle;