// @flow
import React from "react";

import RecipesSingle from './RecipesSingle';
import type { Recipe } from "./utils/types";

type Props = {
  recipeList: Array<Recipe>,
  onDialogOpen: (selectedRecipe?: ?Recipe) => void,
  onRecipeDelete: (selectedRecipe: Recipe) => void,
}

const RecipesGroup = ({ recipeList, onDialogOpen, onRecipeDelete }: Props) => {
  return (
    <div className="recipes-group">
      {recipeList.length
        ? recipeList.map((recipe, i) => (
          <RecipesSingle
            key={recipe.id}
            counter={i + 1}
            data={recipe}
            onDialogOpen={onDialogOpen}
            onRecipeDelete={onRecipeDelete}
          />
        ))
        :
        <div className="recipes-group__info">
          <h3>Add your first recipe!</h3>
        </div>
      }
    </div>
  );
};

export default RecipesGroup;