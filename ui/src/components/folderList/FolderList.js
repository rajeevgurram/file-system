import React from 'react';
import './FolderList.css';
import humanize from 'humanize';
import Icon from '../Icons/Icon';

class FolderList extends React.Component {
    render() {
        return (
            <div className = "folder-list-table">
                <header>
                    <div className = "column1">Name</div>
                    <div className = "column2">Date Modified</div>
                    <div className = "column3">File Size</div>
                </header>
                {
                    this.props.folders ? this.props.folders.map((folder, i) => {
                        const is_directory = folder.type === 'folder';
                        return <div key = { i } className='row' data-path={ folder.absolute_path } onClick={ is_directory ? this.props.onSelectDirectory : undefined }>
                            <div className='column1'>
                                <Icon folder = {folder} /> &nbsp;&nbsp;
                                <span className = "fileName">{ folder.name }</span>
                            </div>
                            <div className='column2'>{ folder.modified }</div>
                            <div className='column3'>{ is_directory ? '' : humanize.filesize(folder.size) }</div>
                        </div>
                    }) : 'No folders to be displayed'
                }
            </div>
        );
    }
}

export default FolderList;
