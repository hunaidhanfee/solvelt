import { BottomNavigation } from "@material-ui/core";
import * as React from "react";
import ReactQuill from 'react-quill';

import 'react-quill/dist/quill.snow.css';

interface ITextEditorProps {
    handleChange: (content: string) => void;
    placeholder: string;
}

/** Renders navigation bar */
const TextEditor: React.FC<ITextEditorProps> = props => {
    const [value, setValue] = React.useState<string>("");
    const [content, setContent] = React.useState<string>("");

    const modules = {
        formula: true,
        toolbar: [
          [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
          [{size: []}],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{'list': 'ordered'}, {'list': 'bullet'}, 
           {'indent': '-1'}, {'indent': '+1'}],
          ['link', 'image', 'video'],
          ['clean'],
          ['formula'],
          [{ 'color': [] }],
        ],
        clipboard: {
          // toggle to add extra line breaks when pasting HTML:
          matchVisual: false,
        }
    }

    const formats = [
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote','color',
        'list', 'bullet', 'indent',
        'link', 'image', 'video','formula'
    ]
    const cc = (a: string) => {
        setValue(a);
        props.handleChange(a);
    }

    const getTextEditor = () => {

        return <div style={{height: "10rem", marginBottom: "5rem"}} id="hunaid"><ReactQuill 
        theme={"snow"}
        onChange={cc}
        value={value}
        modules={modules}
        formats={formats}
        placeholder={"Something"}
        bounds={document.getElementById("hunaid")!}
        style={{height: "10rem"}}
       /></div>
    }
    
    const renderNavBar = () => {
        return getTextEditor();
    };

    return renderNavBar();
}

export default TextEditor;