import * as React from "react";
import { Text } from "@fluentui/react-northstar";
import "./nav-bar.scss";
import { Stack } from "@fluentui/react";

/** Renders navigation bar */
const NavBar: React.FC = props => {

    const getNavBarAction = () => {
        return <Stack className="nav-bar-action" verticalAlign="center">
            Home
        </Stack>
    }
    
    const renderNavBar = () => {
        return <Stack horizontal className="nav-bar">
            <Text style={{marginLeft: "4rem"}}/>
            {getNavBarAction()}
        </Stack>
    };

    return renderNavBar();
}

export default NavBar;