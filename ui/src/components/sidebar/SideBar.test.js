import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import SideBar from './SideBar';

test('renders side bar component', () => {
  const {container} = render(<SideBar />);
  const sideBar = container.getElementsByClassName('folders');
  expect(sideBar.length).toBe(1);
});

test('renders side bar component with no folders prop', () => {
    render(<SideBar />);
    const sideBar = screen.getByText(/No folders available to display/i);
    expect(sideBar).toBeInTheDocument();
});

test('renders side bar component with zero folders', () => {
    const {container} = render(<SideBar folders = {[]} />);
    const sideBar = container.getElementsByClassName('folders');
    expect(sideBar[0].textContent).toBe('');
});

test('renders side bar component with root folder', () => {
    const folderTree = {
        "/" : {
            type: 'folder',
            name: 'Files',
            absolute_path: "/",
            childrens: {},
            expanded: true,
            selected: true
        }
    };

    render(<SideBar folders = {Object.values(folderTree)} />);
    const sideBar = screen.getByText('Files');
    expect(sideBar).toBeInTheDocument();
});

test('renders side bar component with root folder and childrens', () => {
    const folderTree = {
        "/" : {
            type: 'folder',
            name: 'Files',
            absolute_path: "/",
            childrens: {
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
                    childrens: {},
                    expanded: false,
                    selected: false
                }
            },
            expanded: true,
            selected: true
        }
    };

    render(<SideBar folders = {Object.values(folderTree)} />);
    for(let folder in folderTree["/"].childrens) {
        const sideBar = screen.getByText(folder);
        expect(sideBar).toBeInTheDocument();
    }
});

test('renders side bar component with root folder and childrens selected and expanded true', () => {
    const folderTree = {
        "/" : {
            type: 'folder',
            name: 'Files',
            absolute_path: "/",
            childrens: {
                "var" : {
                    type: 'folder',
                    name: 'var',
                    absolute_path: "/var",
                    modified: '05-05-2022',
                    childrens: {},
                    expanded: false,
                    selected: false
                },
                "lib" : {
                    type: 'folder',
                    name: 'lib',
                    absolute_path: "/lib",
                    childrens: {},
                    expanded: true,
                    selected: true
                },
                "file1" : {
                    type: 'file',
                    name: 'file1',
                    absolute_path: "/file1.txt",
                    childrens: {},
                    expanded: false,
                    selected: false
                }
            },
            expanded: true,
            selected: true
        }
    };

    const {container} = render(<SideBar folders = {Object.values(folderTree)} />);
    const folders = container.getElementsByClassName('selected');
    expect(folders[1].textContent.trim()).toBe('lib');
});

test('renders side bar component with root folder and childrens hierarchy', () => {
    const folderTree = {
        "/" : {
            type: 'folder',
            name: 'Files',
            absolute_path: "/",
            childrens: {
                "var" : {
                    type: 'folder',
                    name: 'var',
                    absolute_path: "/var",
                    childrens: {
                        "lib" : {
                            type: 'folder',
                            name: 'lib',
                            absolute_path: "/var/lib",
                            childrens: {},
                            expanded: false,
                            selected: false
                        },
                        "file1" : {
                            type: 'file',
                            name: 'file1',
                            absolute_path: "/var/file1.txt",
                            childrens: {},
                            expanded: false,
                            selected: false
                        }
                    },
                    expanded: true,
                    selected: true
                }
            },
            expanded: true,
            selected: true
        }
    };

    render(<SideBar folders = {Object.values(folderTree)} />);
    for(let folder in folderTree["/"].childrens.var.childrens) {
        const sideBar = screen.getByText(folder);
        expect(sideBar).toBeInTheDocument();
    }
});
