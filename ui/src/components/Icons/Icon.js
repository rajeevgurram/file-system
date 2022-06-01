import React from 'react';
import { FcOpenedFolder as FolderIcon, FcFile as FileIcon } from "react-icons/fc";
import { AiOutlineCaretRight as CollapseIcon, 
         AiOutlineCaretDown as ExpandIcon,
         AiFillFilePdf as PdfIcon,
         AiFillFileText as TxtIcon,
         AiOutlineFileWord as WordIcon,
         AiOutlineFileZip as ZipIcon,
         AiOutlineFilePpt as PPTIcon,
         AiFillFileExcel as ExcelIcon,
         AiFillVideoCamera as VideoIcon,
         AiFillFileImage as ImageIcon,
         AiFillHtml5 as HtmlIcon} from "react-icons/ai";
import { DiJsBadge as JsIcon,
         DiCss3 as CssIcon,
         DiDatabase as DBIcon,
         DiPython as PyIcon,
         DiTerminal as ShellIcon,
         DiJava as JavaIcon } from "react-icons/di";


const getIcon = (props) => {
    const fileExtensionSeparator = props.folder.name.split(".");
    const extension = fileExtensionSeparator[fileExtensionSeparator.length - 1];

    let icon;
    switch(extension) {
        case 'txt':
        case 'json':
        case 'yml':
        case 'yaml':
            icon = <TxtIcon />;
            break;
        case 'pdf':
        case 'pub':
        case 'epub':
            icon = <PdfIcon />;
            break;
        case 'doc':
        case 'docx':
            icon = <WordIcon />;
            break;
        case 'xls':
        case 'xlsx':
        case 'csv':
            icon = <ExcelIcon />;
            break;
        case 'ppt':
        case 'pptx':
            icon = <PPTIcon />;
            break;
        case 'zip':
        case 'jar':
        case '7z':
        case 'rar':
        case 'tar':
        case 'tz':
            icon = <ZipIcon />;
            break;
        case 'mp4':
        case 'mov':
            icon = <VideoIcon />;
            break;
        case 'png':
        case 'jpeg':
        case 'jpg':
        case 'gif':
            icon = <ImageIcon />;
            break;
        case 'html':
            icon = <HtmlIcon />;
            break;
        case 'js':
            icon = <JsIcon />;
            break;
        case 'css':
            icon = <CssIcon />;
            break;
        case 'sql':
            icon = <DBIcon />;
            break;
        case 'py':
            icon = <PyIcon />;
            break;
        case 'sh':
        case 'bat':
            icon = <ShellIcon />
            break;
        case 'java':
        case 'class':
            icon = <JavaIcon />
            break;
        default:
            icon = <FileIcon />;
            break;
    }

    return icon;
}

const Icon = (props) => {
    return (
        <React.Fragment>
            {
                props.folder.type === 'folder' ? <FolderIcon /> : getIcon(props)

            }
        </React.Fragment>
    )
}

export default Icon;