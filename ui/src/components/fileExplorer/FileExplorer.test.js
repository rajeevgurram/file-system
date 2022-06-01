import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import FileExplorer from './FileExplorer';

test('renders file explorer', () => {
  render(<FileExplorer />);
  const sideBar = screen.getByText(/Files/i);
  expect(sideBar).toBeInTheDocument();

  const folderList = screen.getByText(/Date Modified/i);
  expect(folderList).toBeInTheDocument();
});
