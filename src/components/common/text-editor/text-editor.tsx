import { BottomNavigation } from "@material-ui/core";
import * as React from "react";
import ReactQuill from 'react-quill';

import 'react-quill/dist/quill.snow.css';

interface ITextEditorProps {
    handleChange: (content: string) => void;
    placeholder: string;
    formats: Array<any>;
    modules: any;
    value?: string;
    bound: string;
}

/** Renders navigation bar */
const TextEditor: React.FC<ITextEditorProps> = props => {
    const [value, setValue] = React.useState<string>(props.value === undefined ? "" : props.value);
    const [content, setContent] = React.useState<string>("");

    
    const cc = (a: string) => {
        setValue(a);
        props.handleChange(a);
    }

    const getTextEditor = () => {

        return <div style={{height: "10rem", marginBottom: "5rem", maxWidth: 949}} id={props.bound}><ReactQuill 
        theme={"snow"}
        onChange={cc}
        value={value}
        modules={props.modules}
        formats={props.formats}
        placeholder={props.placeholder}
        style={{height: "10rem", maxWidth: 949}}
       /></div>
    }
    
    const renderNavBar = () => {
        return getTextEditor();
    };

    return renderNavBar();
}

export default TextEditor;