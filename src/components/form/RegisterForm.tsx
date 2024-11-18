// src/components/RegisterForm.tsx

import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import {zodResolver} from "@hookform/resolvers/zod";

// Define Zod validation schema
const registerSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  mobilePhone: z.string().min(10, { message: "Invalid phone number" }),
  email: z.string().email({ message: "Invalid email address" }),
  username: z.string().min(4, { message: "Username must be at least 4 characters" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type RegisterFormData = z.infer<typeof registerSchema>;

interface RegisterFormProps {
  onSubmitSuccess: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmitSuccess }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  // Mocking the mutation with TanStack Query
  const mutation = useMutation({
    mutationFn: () => {
      return new Promise((resolve) => setTimeout(resolve, 5000)); // Mocking API response
    },
    onSuccess: () => {
      onSubmitSuccess(); // Close the register form modal and open the confirmation modal
    },
  });

  const onSubmit = () => {
    mutation.mutate();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="name" className="block">Name</label>
        <input
          id="name"
          type="text"
          className="w-full p-2 border rounded bg-gray-100"
          {...register('name')}
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="mobilePhone" className="block">Mobile Phone</label>
        <input
          id="mobilePhone"
          type="text"
          className="w-full p-2 border rounded bg-gray-100"
          {...register('mobilePhone')}
        />
        {errors.mobilePhone && <p className="text-red-500">{errors.mobilePhone.message}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block">Email</label>
        <input
          id="email"
          type="email"
          className="w-full p-2 border rounded bg-gray-100"
          {...register('email')}
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="username" className="block">Username</label>
        <input
          id="username"
          type="text"
          className="w-full p-2 border rounded bg-gray-100"
          {...register('username')}
        />
        {errors.username && <p className="text-red-500">{errors.username.message}</p>}
      </div>

      <div>
        <label htmlFor="password" className="block">Password</label>
        <input
          id="password"
          type="password"
          className="w-full p-2 border rounded bg-gray-100"
          {...register('password')}
        />
        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
      </div>

      <button
        type="submit"
        disabled={mutation.isPending}
        className="w-full py-2 bg-blue-500 text-white rounded"
      >
        {mutation.isPending ? 'Submitting...' : 'Register'}
      </button>
    </form>
  );
};

export default RegisterForm;
