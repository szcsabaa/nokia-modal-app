import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import {zodResolver} from "@hookform/resolvers/zod";

const passwordValidator = z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/\d/, "Password must contain at least one digit")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character")

const registerSchema = z.object({
  name: z.string().min(1, {message: "Name is required"}),
  mobilePhone: z.string().min(10, {message: "Invalid phone number"}),
  email: z.string().email({message: "Invalid email address"}),
  username: z.string().min(4, {message: "Username must be at least 4 characters"}),
  password: passwordValidator,
  confirmPassword: passwordValidator,
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
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

  const submitMutation = useMutation({
    mutationFn: () => {
      return new Promise((resolve) => setTimeout(resolve, 3000)); // Mocking API response
    },
    onSuccess: () => {
      onSubmitSuccess();
    },
  });

  const onSubmit = () => {
    submitMutation.mutate();
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

      <div>
        <label htmlFor="confirmPassword" className="block">Confirm Password</label>
        <input
          id="confirmPassword"
          type="password"
          className="w-full p-2 border rounded bg-gray-100"
          {...register('confirmPassword')}
        />
        {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
      </div>

      <button
        type="submit"
        disabled={submitMutation.isPending}
        className="w-full py-2 bg-blue-500 text-white rounded"
      >
        {submitMutation.isPending ? 'Submitting...' : 'Register'}
      </button>
    </form>
  );
};

export default RegisterForm;
