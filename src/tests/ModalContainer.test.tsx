import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {ModalState} from "../types/modal.ts";
import ModalContainer from "../components/modal/ModalContainer.tsx";
import {vi} from "vitest";

describe('ModalContainer', () => {
  const modals: ModalState[] = [
    {
      config: {
        id: 'modal-1',
        title: 'Test Modal 1',
        closeOnEsc: true,
        showCloseButton: true,
        buttons: [],
      },
      content: <div>Content for Modal 1</div>,
    },
    {
      config: {
        id: 'modal-2',
        title: 'Test Modal 2',
        closeOnEsc: false,
        showCloseButton: true,
        buttons: [],
      },
      content: <div>Content for Modal 2</div>,
    },
  ];

  it('renders no modals when the modals array is empty', () => {
    render(<ModalContainer modals={[]} onClose={vi.fn()} />);

    expect(screen.queryByText("Test Modal")).not.toBeInTheDocument();
  });

  it('renders all modals passed via props', () => {
    render(<ModalContainer modals={modals} onClose={vi.fn()} />);

    expect(screen.getByText('Test Modal 1')).toBeInTheDocument();
    expect(screen.getByText('Test Modal 2')).toBeInTheDocument();
  });

  it('calls onClose with the correct modal ID when the x close button is clicked', async () => {
    const onCloseMock = vi.fn();

    render(<ModalContainer modals={[modals[1]]} onClose={onCloseMock} />);

    await userEvent.click(screen.getByRole('button'));

    expect(onCloseMock).toHaveBeenCalledWith('modal-2');
  });

  it('closes the modal with closeOnEsc enabled when the Escape key is pressed', async () => {
    const onCloseMock = vi.fn();
    render(<ModalContainer modals={[modals[0]]} onClose={onCloseMock} />);

    await userEvent.keyboard('{Escape}');

    expect(onCloseMock).toHaveBeenCalledWith('modal-1');
  });

  it('does not close modal without closeOnEsc disabled when Escape is pressed', async () => {
    const onCloseMock = vi.fn();
    render(<ModalContainer modals={[modals[1]]} onClose={onCloseMock} />);

    await userEvent.keyboard('{Escape}');

    expect(onCloseMock).not.toHaveBeenCalled();
  });
});
