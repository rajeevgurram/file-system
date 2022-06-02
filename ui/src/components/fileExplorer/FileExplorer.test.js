import {rest} from 'msw';
import { setupServer } from 'msw/node';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import FileExplorer from './FileExplorer';

const rootFolders = [
  {
    type: 'folder',
    name: 'var',
    absolute_path: "/var",
    childrens: {},
    expanded: false,
    selected: false
  },
  {
    type: 'folder',
    name: 'lib',
    absolute_path: "/lib",
    childrens: {},
    expanded: false,
    selected: false
  },
  {
    type: 'file',
    name: 'file1',
    absolute_path: "/file1.txt",
    childrens: {},
    expanded: false,
    selected: false
  }
];

const libFolders = [
  {
    type: 'folder',
    name: 'test',
    absolute_path: "/lib/test",
    expanded: false,
    selected: false
  },
  {
    type: 'folder',
    name: 'test1',
    absolute_path: "/lib/test1",
    childrens: {},
    expanded: false,
    selected: false
  },
  {
    type: 'file',
    name: 'file1',
    absolute_path: "/lib/file1.txt",
    childrens: {},
    expanded: false,
    selected: false
  }
];

const error = {
  error: true,
  message: 'Permission Denied'
};

const server = setupServer(
  rest.get('/directories/', (req, res, ctx) => {
    return res(ctx.json(rootFolders));
  }),
  rest.get('/directories//lib', (req, res, ctx) => {
    return res(ctx.json(libFolders));
  }),
  rest.get('/directories//var', (req, res, ctx) => {
    return res(ctx.status(500), ctx.json(error));
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('renders file explorer', () => {
  const {container} = render(<FileExplorer />);
  const fileSystem = container.getElementsByClassName('file-system');
  expect(fileSystem.length).toBe(1);
});

test('renders file explorer and wait for data to be rendered', async () => {
  const {container} = render(<FileExplorer />);
  await waitFor(() => screen.findAllByText(/lib/i));
});

test('renders file explorer and expand the directory on sidebar', async () => {
  const {container} = render(<FileExplorer />);
  await waitFor(() => screen.findAllByText(/lib/i));
  fireEvent.click(document.getElementsByClassName("folder")[2]);
  await waitFor(() => screen.findAllByText(/test1/i));
  expect(await screen.findAllByText(/lib/i)).toHaveLength(1);
  //expanding and collapsing
  fireEvent.click(document.getElementsByClassName("folder")[2]);
  fireEvent.click(document.getElementsByClassName("folder")[2]);
});

test('renders file explorer and expand the directory which does not have permissions', async () => {
  const {container} = render(<FileExplorer />);
  await waitFor(() => screen.findAllByText(/var/i));
  fireEvent.click(document.getElementsByClassName("folder")[1]);
  //expanding and collapsing
  fireEvent.click(document.getElementsByClassName("folder")[1]);
  fireEvent.click(document.getElementsByClassName("folder")[1]);
});

test('renders file explorer and expand the directory and click folder from the right side list', async () => {
  const {container} = render(<FileExplorer />);
  await waitFor(() => screen.findAllByText(/var/i));
  fireEvent.click(document.getElementsByClassName("folder")[2]);
  await waitFor(() => screen.findAllByText(/test/i));
  fireEvent.click(document.getElementsByClassName("column1")[1]);
});
