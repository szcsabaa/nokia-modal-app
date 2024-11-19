import {render, screen, waitFor} from '@testing-library/react';
import {ModalProvider} from "../context/ModalContext.tsx";
import MultipleModalsPage from "../components/pages/MultipleModalPage.tsx";

describe('MultipleModalsPage', () => {
  it('opens all three modals automatically', async () => {
    render(
      <ModalProvider>
        <MultipleModalsPage />
      </ModalProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("This is a small modal with custom content!")).toBeInTheDocument();
      expect(screen.getByText("This is a large modal with custom content!")).toBeInTheDocument();
      expect(screen.getByText("This is a Extra Large modal with custom content!")).toBeInTheDocument();
    }, {timeout: 5000});

  });
});