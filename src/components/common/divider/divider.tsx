import * as React from "react";;

interface IDividerProps {
    width: string;
    height: string;
    marginTop: string;
    marginBottom: string;
}

/** Renders navigation bar */
const Divider: React.FC<IDividerProps> = props => {
    
    const renderDivider = () => {
        let style: React.CSSProperties = {
            "width": props.width,
            "height": props.height, 
            "backgroundColor": "#e0ddda",
            "marginTop": props.marginTop,
            "marginBottom": props.marginBottom,
        }
        return <div style={style}>                        
        </div>
    };

    return renderDivider();
}

export default Divider;