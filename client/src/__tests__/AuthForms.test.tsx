import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';

const authMocks = vi.hoisted(() => ({
  login: vi.fn(),
  register: vi.fn(),
}));

vi.mock('../context/AuthContext', () => ({
  useAuth: () => ({
    login: authMocks.login,
    register: authMocks.register,
  }),
}));

describe('authentication forms', () => {
  beforeEach(() => {
    authMocks.login.mockResolvedValue({});
    authMocks.register.mockResolvedValue({});
  });

  afterEach(() => {
    cleanup();
  });

  it('shows login schema errors and does not submit invalid values', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>,
    );

    await user.click(screen.getByRole('button', { name: 'Sign in' }));

    expect(await screen.findByText('Invalid email address')).toBeTruthy();
    expect(screen.getByText('Too small: expected string to have >=1 characters')).toBeTruthy();
    expect(authMocks.login).not.toHaveBeenCalled();
  });

  it('calls login with validated values', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>,
    );

    await user.type(screen.getByLabelText('Email'), 'astha@example.com');
    await user.type(screen.getByLabelText('Password'), 'secret');
    await user.click(screen.getByRole('button', { name: 'Sign in' }));

    await waitFor(() => {
      expect(authMocks.login).toHaveBeenCalledWith({
        email: 'astha@example.com',
        password: 'secret',
      });
    });
  });

  it('shows registration schema errors and does not submit invalid values', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <RegisterPage />
      </MemoryRouter>,
    );

    await user.click(screen.getByRole('button', { name: 'Create account' }));

    expect(await screen.findByText('Too small: expected string to have >=1 characters')).toBeTruthy();
    expect(screen.getByText('Invalid email address')).toBeTruthy();
    expect(authMocks.register).not.toHaveBeenCalled();
  });

  it('calls register with valid form data and the detected timezone', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <RegisterPage />
      </MemoryRouter>,
    );

    await user.type(screen.getByLabelText('Name'), 'Astha Goswami');
    await user.type(screen.getByLabelText('Email'), 'astha@example.com');
    await user.type(screen.getByLabelText('Username / handle'), 'astha_01');
    await user.type(screen.getByLabelText('Password'), 'StrongPass123!');
    await user.type(screen.getByLabelText('Confirm password'), 'StrongPass123!');
    await user.click(screen.getByRole('button', { name: 'Create account' }));

    await waitFor(() => {
      expect(authMocks.register).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'Astha Goswami',
          email: 'astha@example.com',
          handle: 'astha_01',
          password: 'StrongPass123!',
          confirmPassword: 'StrongPass123!',
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC',
        }),
      );
    });
  });
});
