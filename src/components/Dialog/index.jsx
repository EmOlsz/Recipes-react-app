// @flow
import * as React from 'react';
import * as Yup from 'yup';
import { withFormik, yupToFormErrors } from 'formik';
import uniqid from 'uniqid';

import DialogView from './DialogView';

const Dialog = (withFormik({
  enableReinitialize: true,
  mapPropsToValues: ({ recipe }) =>
    recipe
      ? {
        name: recipe.name,
        ingredients: recipe.ingredients,
      }
      : {
        name: '',
        ingredients: '',
      },
  validate: values => {
    const schema = Yup.object({
      name: Yup.string().max(20).required('Recipe name is required'),
      ingredients: Yup.string().required('Recipe ingredients are required'),
    });
    return schema.validate(values, { abortEarly: false }).catch(e => {
      throw yupToFormErrors(e);
    });
  },
  handleSubmit: (values, { props, setSubmitting, resetForm }) => {
    const { recipe, onDialogClose, onRecipeAdd, onRecipeEdit } = props;
    const handleClose = () => {
      resetForm();
      onDialogClose();
      setSubmitting(false);
    };
    if (!recipe) {
      const id = uniqid();
      onRecipeAdd({ ...values, id })
    } else {
      const { id } = recipe;
      onRecipeEdit({ ...values, id });
    }
    handleClose();
  }
})(DialogView));

export default Dialog;
