import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

interface FormInputs {
  name: string;
  email: string;
  phone: string;
  address: string;
  country: string;
}

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup
    .string()
    .matches(
      /^[0-9]{10}$/,
      "Invalid phone number, must be 10 digits without spaces or dashes"
    )
    .required("Phone number is required"),
  address: yup.string().required("Address is required"),
});

const HookForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormInputs) => {
    console.log(data);
  };

  return (
    <>
      <h1>Hook Form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" {...register("name")} />
          {errors.name && <span>{errors.name.message}</span>}
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="text" id="email" {...register("email")} />
          {errors.email && <span>{errors.email.message}</span>}
        </div>
        <div>
          <label htmlFor="phone">Phone number</label>
          <input type="text" id="phone" {...register("phone")} />
          {errors.phone && <span>{errors.phone.message}</span>}
        </div>
        <div>
          <label htmlFor="address">Address</label>
          <input type="text" id="address" {...register("address")} />
          {errors.address && <span>{errors.address.message}</span>}
        </div>
        <div>
          <label htmlFor="country">Country</label>
          <select id="country" {...register("country")}>
            <option value="">Select a country</option>
            <option value="india">India</option>
            <option value="usa">USA</option>
            <option value="canada">Canada</option>
            <option value="uk">UK</option>
          </select>
          {errors.country && (
            <span>{errors.country.message}</span>
          )}
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default HookForm;
