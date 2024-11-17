// Imports
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent  from '@testing-library/user-event';

// To Test
import AppLayout from '../components/layout/AppLayout.tsx';

// Tests
describe('Renders main page correctly', async () => {
    /**
     * Passes - shows title correctly
     */
    it('Should render the page correctly', async () => {
        // Setup
        render(<AppLayout/>);
        const h1 = screen.queryByText('Vite + React');

        // Post Expectations
        expect(h1).toBeInTheDocument();
    });

    /**
     * Passes - shows the button count correctly present
     */
    it('Should show the button count set to 0', async () => {
        // Setup
        render(<AppLayout/>);
        const button = screen.queryByText('count is 0');

        // Expectations
        expect(button).toBeInTheDocument();
    });

    /**
     * Passes - clicks the button 3 times and shows the correct count
     */
    it('Should show the button count set to 3', async () => {
        // Setup
        const user = userEvent.setup();
        render(<AppLayout/>);
        const button = screen.queryByText('count is 0');

        // Pre Expectations
        expect(button).toBeInTheDocument();

        // Actions
        await user.click(button as HTMLElement);
        await user.click(button as HTMLElement);
        await user.click(button as HTMLElement);

        // Post Expectations
        expect(button?.innerHTML).toBe('count is 3');
    });
});