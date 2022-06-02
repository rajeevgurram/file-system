import React from 'react';
import './FileExplorer.css';
import SideBar from '../sidebar/SideBar';
import FolderList from '../folderList/FolderList';
import _ from 'underscore';
import axios from 'axios';

class FileExplorer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            folderTree: {
                "/" : {
                    type: 'folder',
                    name: 'Files',
                    absolute_path: "/",
                    childrens: {},
                    expanded: true,
                    selected: true
                }
            },
            folderList: []
        };
        
        this.onSelectDirectory = this.onSelectDirectory.bind(this);
        this.onExpandDirectory = this.onExpandDirectory.bind(this);

        this.fetchFolders = this.fetchFolders.bind(this);
        this.getFolder = this.getFolder.bind(this);

        this.currentSelectedFolder = this.state.folderTree["/"];
    }

    async componentDidMount() {
        const rootFolders = await this.fetchFolders('/');
        const folderTree = this.state.folderTree;
        rootFolders.forEach(folder => {
            folder.expanded = false;
            folderTree["/"].childrens[folder.name] = folder;
            folderTree["/"].childrens[folder.name].childrens = {};
        });

        this.setState({
            ...this.state,
            folderTree: folderTree,
            folderList: rootFolders
        });
    }

    async fetchFolders(path) {
        let response;
        try {
            const files = await (await axios.get('/directories/' + path)).data;
            response = _.sortBy(files, folder => folder.type === 'file');
        } catch (error) {
            response = {
                error: true
            }
        }
        
        return response;
    }

    onSelectDirectory(event) {
        this.onExpandDirectory(event);
    }

    getFolder(folderPath) {
        let folder = this.state.folderTree["/"];
        const folderPaths = folderPath.split('/');
        
        for(let i = 0; i < folderPaths.length; i ++) {
            if(folderPaths[i].trim() === "") {
                continue;
            }
            folder = folder.childrens[folderPaths[i]];
        }

        return folder;
    }

    async onExpandDirectory(event) {
        event.stopPropagation();
        const folderPath = event.currentTarget.getAttribute('data-path');
        let selectedFolder = this.getFolder(folderPath);
        selectedFolder.expanded = !selectedFolder.expanded;
        selectedFolder.selected = true;
        this.currentSelectedFolder.selected = false;
        this.currentSelectedFolder = selectedFolder;

        if(Object.keys(selectedFolder.childrens).length === 0) { // Subdirectories not loaded
            const selectedFolderChildrens = await this.fetchFolders(folderPath);
            if(selectedFolderChildrens.error) {
                alert("Access Denied to " + folderPath);
                return;
            }

            this.setState({
                ...this.state,
                folderList: selectedFolderChildrens
            });

            selectedFolderChildrens.forEach(folder => {
                selectedFolder.childrens[folder.name] = folder;
                if(!selectedFolder.childrens[folder.name].childrens) {
                    selectedFolder.childrens[folder.name].childrens = {};
                }
            });
        } else {    // already populated the tree
            this.setState({
                ...this.state,
                folderList: Object.values(selectedFolder.childrens)
            });
        }

        this.setState({
            ...this.state.folderTree
        });
    }

    render() {
        return (
            <div className = "file-system">
                <div className = "sidebar">
                    <SideBar 
                        folders = {Object.values(this.state.folderTree)}
                        onExpandDirectory = {this.onExpandDirectory}
                    />
                </div>
                <div className = "folder-list">
                    <FolderList 
                        folders = {this.state.folderList}
                        onSelectDirectory = {this.onSelectDirectory}
                    />
                </div>
            </div>
        );
    }
}

export default FileExplorer;
