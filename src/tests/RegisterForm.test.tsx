import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import RegisterForm from "../components/form/RegisterForm.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

describe('RegisterForm', () => {
  it('renders the inputs correctly', () => {
    render(
      <QueryClientProvider client={new QueryClient} >
        <RegisterForm onSubmitSuccess={vi.fn()} />
      </QueryClientProvider>
    );
    expect(screen.getByLabelText("Name", {selector: 'input'})).toBeInTheDocument();
    expect(screen.getByLabelText("Mobile Phone", {selector: 'input'})).toBeInTheDocument();
    expect(screen.getByLabelText("Email", {selector: 'input'})).toBeInTheDocument();
    expect(screen.getByLabelText("Username", {selector: 'input'})).toBeInTheDocument();
    expect(screen.getByLabelText("Password", {selector: 'input'})).toBeInTheDocument();
    expect(screen.getByLabelText("Confirm Password", {selector: 'input'})).toBeInTheDocument();
  });

  it('shows validation errors on empty input', async () => {
    render(
      <QueryClientProvider client={new QueryClient} >
        <RegisterForm onSubmitSuccess={vi.fn()} />
      </QueryClientProvider>
    );
    await userEvent.click(screen.getByRole('button'));

    expect(await screen.findByText("Name is required")).toBeInTheDocument();
    expect(await screen.findByText("Invalid phone number")).toBeInTheDocument();
    expect(await screen.findByText("Invalid email address")).toBeInTheDocument();
    expect(await screen.findByText("Username must be at least 4 characters")).toBeInTheDocument();
    expect((await screen.findAllByText("Password must be at least 8 characters"))[0]).toBeInTheDocument();
    expect((await screen.findAllByText("Password must be at least 8 characters"))[1]).toBeInTheDocument();
  });

  it('calls onSubmitSuccess when the form is valid', async () => {
    const mockSuccess = vi.fn();
    render(
      <QueryClientProvider client={new QueryClient} >
        <RegisterForm onSubmitSuccess={mockSuccess} />
      </QueryClientProvider>
    );

    await userEvent.type(screen.getByLabelText("Name"), 'John Doe');
    await userEvent.type(screen.getByLabelText("Mobile Phone"), '+36303337171');
    await userEvent.type(screen.getByLabelText("Email"), 'mock@email.com');
    await userEvent.type(screen.getByLabelText("Username"), 'administrator');
    await userEvent.type(screen.getByLabelText("Password"), 'Password1234$!');
    await userEvent.type(screen.getByLabelText("Confirm Password"), 'Password1234$!');
    await userEvent.click(screen.getByText('Register'));

    await waitFor(() => expect(mockSuccess).toHaveBeenCalled(), {timeout: 5000});
  });
});
