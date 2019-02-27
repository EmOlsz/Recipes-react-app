// @flow
import React from 'react';
import { Field, Form, ErrorMessage } from 'formik';

import Button from '../Button'
import type { Recipe } from "components/utils/types";

type Props = {
  isOpen: boolean,
  recipe: Recipe,
  onDialogClose: () => void,
  handleSubmit: () => void,
}

const DialogView = ({ isOpen, recipe, onDialogClose, handleSubmit }: Props) => {
  
  if (!isOpen) {
    return null;
  }
  return (
    <Form className="dialog" onSubmit={handleSubmit}>
      <div className="dialog__overlay" onClick={onDialogClose} />
      <div className="dialog__content">
        <div className="dialog__content-header">
          <h2 className="dialog__content-header-text dialog-container">
            {recipe ? `Edit Recipe for ${recipe.name}` : 'Add Recipe'}
          </h2>
        </div>
        <div className="dialog__content-body dialog-container">
          <div className="dialog__content-body-form-group">
            <label>Recipe</label>
            <Field className="dialog__content-body-form-input" id="name" type="text" name="name" />
            <ErrorMessage className="dialog__content-warning" name="name" component="div" />
          </div>
          <div className="dialog__content-body-form-group">
            <label>Ingredients</label>
            <Field className="dialog__content-body-form-input dialog__content-body-form-textarea" component="textarea" id="ingredients" type="text" name="ingredients" />
            <ErrorMessage className="dialog__content-warning" name="ingredients" component="div" />
          </div>
        </div>
        <div className="dialog__content-footer">
          <div className="dialog__content-footer-buttons dialog-container">
            <Button text={recipe ? 'Edit Recipe' : 'Add Recipe'} intent="primary" type="submit" />
            <Button text="Close" intent="none" onClick={onDialogClose} />
          </div>
        </div>
      </div>
    </Form>
  );
};

export default DialogView;