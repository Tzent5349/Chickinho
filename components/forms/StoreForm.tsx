"use client"
import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import StoreDropdown from '@/components/dropdowns/StoreDropDown';
import UserDropdown from '../dropdowns/userDropDown';

const StoreForm = () => {
  const methods = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <StoreDropdown />
        <button type="submit">Submit</button>
      </form>
    </FormProvider>
  );
};

export default StoreForm;
