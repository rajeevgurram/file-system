import React from 'react';
import './SideBar.css';
import { AiOutlineCaretRight as CollapseIcon, AiOutlineCaretDown as ExpandIcon } from "react-icons/ai";
import Icon from '../Icons/Icon';

class SideBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='folders'>
                {
                    this.props.folders.map((folder, i) => {
                        const is_directory = folder.type === 'folder';
                        return (
                            <React.Fragment key={ i }>
                                <div className= {folder.selected ? 'folder selected' : 'folder'} data-path={folder.absolute_path} onClick={ is_directory ? this.props.onExpandDirectory : undefined }>
                                    { is_directory ? 
                                        <span> {folder.expanded ? <ExpandIcon /> : <CollapseIcon />} </span> 
                                        : ''
                                    }
                                    <div style={{'display': 'flex', 'top': '1px', 'position': 'relative', 'left': !is_directory ? '26px' : ''}} >
                                        <span><Icon folder = { folder } /></span>
                                        <span>{folder.name}</span>
                                    </div>
                                </div>
                                
                                {/* Subdirectories here, displayed only when it is expanded and it has sub directories */}
                                { 
                                    folder.expanded && folder.childrens && Object.values(folder.childrens).length > 0 ? 
                                        <SideBar 
                                            folders = { Object.values(folder.childrens) } 
                                            onExpandDirectory={this.props.onExpandDirectory} /> 
                                    : ''
                                }
                            </React.Fragment>
                        )
                    })
                }
            </div>
        );
    }
}

export default SideBar;
