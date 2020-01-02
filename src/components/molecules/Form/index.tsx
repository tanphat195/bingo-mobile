import { useState, useImperativeHandle, forwardRef } from 'react';
import { isRequired, isEmail, minLength, maxLength, validateForm, checkForm, getFormErrors, getFormValues } from './validate';

type isRequired = {
  isRequired?: boolean, 
  message: string,
};

type isEmail = {
  isEmail?: boolean, 
  message: string,
};

type isNumber = {
  isNumber?: boolean, 
  message: string,
};

type minLength = {
  min: number,
  message: string,
};

type maxLength = {
  max: number,
  message: string,
};

type validateType = isRequired | isEmail | isNumber | minLength | maxLength

type InitialFormType = {
  [key:string]: {
    value: string | boolean,
    error?: string,
    validate?: validateType[],
  }
}

interface Props {
  initialForm: InitialFormType;
  children: any;
};

const Form = (props: Props, ref) => {
  const [form, setForm] = useState(props.initialForm);
  useImperativeHandle(ref, () => ({
    submit
  }));

  const updateFormKey = (key, value) => {
    const newForm = {
      ...form,
      [key]: {
        ...form[key],
        value,
      }
    }
    setForm(newForm)
  };

  const setFormKeys = Object.keys(form).reduce(
    (prev, key) => ({
      ...prev,
      [key]: updateFormKey.bind(this, key)
    }), {});

  

  const submit = (callback) => {
    const newForm = validateForm(form);
    setForm(newForm);
    if (!checkForm(newForm)) {
      const values = getFormValues(newForm);
      callback(false, values);
    } else {
      const errors = getFormErrors(newForm);
      callback(true, errors)
    }
  };
  
  return (
    props.children(form, setFormKeys)
  )
}
export default forwardRef(Form);