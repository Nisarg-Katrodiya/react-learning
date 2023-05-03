import React from "react";
import FormikForm from './formikForm';
import HookForm from './hookForm';

const Forms: React.FC = () => {
  return (
    <>
      <HookForm />
      <FormikForm />
    </>
  );
};

export default Forms;
