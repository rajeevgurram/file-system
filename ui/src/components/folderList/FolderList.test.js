import { render, fireEvent, waitFor, screen, getByLabelText } from '@testing-library/react';
import FolderList from './FolderList';

test('renders folder list component', () => {
    const {container} = render(<FolderList />);
    const folderList = container.getElementsByClassName('folder-list-table');
    expect(folderList.length).toBe(1);
});

test('renders folder list component with no folders prop', () => {
    render(<FolderList />);
    const folderList = screen.getByText(/No folders to be displayed/i);
    expect(folderList).toBeInTheDocument();
});

test('renders folder list component with zero folders', () => {
    const {container} = render(<FolderList folders = {[]} />);
    const folderList = container.getElementsByClassName('row');
    expect(folderList).toHaveLength(0);
});

test('renders folder list component with folders', () => {
    const folderTree = {
        "var" : {
            type: 'folder',
            name: 'var',
            absolute_path: "/var",
            childrens: {},
            expanded: false,
            selected: false
        },
        "lib" : {
            type: 'folder',
            name: 'lib',
            absolute_path: "/lib",
            childrens: {},
            expanded: false,
            selected: false
        },
        "file1" : {
            type: 'file',
            name: 'file1',
            absolute_path: "/file1.txt",
            modified: '05-05-2022',
            childrens: {},
            expanded: false,
            selected: false
        }
    };

    render(<FolderList folders = {Object.values(folderTree)} />);
    for(let folder in folderTree) {
        const folderList = screen.getByText(folder);
        expect(folderList).toBeInTheDocument();
    }
    const date = screen.getByText('05-05-2022');
    expect(date).toBeInTheDocument();
});
