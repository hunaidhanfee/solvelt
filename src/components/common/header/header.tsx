import * as React from "react";
import { Stack } from "@fluentui/react";
import { makeStyles } from '@material-ui/core/styles';
import { Select, MenuItem } from "@material-ui/core";
import { getSubject, getSubjects } from "../../../api/subject-api";

import "./header.scss";
import { ISubject } from "../../../models/subject";
interface IHeaderProps {
    subjectId: string;
}

const useStyles = makeStyles((theme) => ({
    select: {
        '&:before': {
            borderColor: "white",
        },
        '&:after': {
            borderColor: "white",
        }
    },
    icon: {
        fill: "white",
    },
  }));

/** Renders navigation bar */
const Header: React.FC<IHeaderProps> = props => {
    const classes = useStyles();
    const [subjects, setSubjects] = React.useState<ISubject[]>([]);
    const [defaultSub, setDefaultSub] = React.useState<ISubject>({
        subjectDescription: "",
        subjectId: "",
        subjectName: ""
    });

    React.useEffect(() => {
        let subs =  getSubjects();
        setSubjects(subs);
        getSub();
    },[props.subjectId]);

    const getSub = () => {
        let sub = getSubject(props.subjectId);
        setDefaultSub(sub!);
    }

    const getDefaults = () => {
        console.log(defaultSub);
        return defaultSub.subjectName;
    }

    const getHeaderBody = () => {
        return <Stack className="header-container">
            <Stack verticalAlign="end" className="dropdown-contianer">
                <Select
                    MenuProps={{
                    anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "left"
                    },
                    transformOrigin: {
                        vertical: "top",
                        horizontal: "left"
                    },
                    getContentAnchorEl: null
                    }}
                    className={"subject-dropdown " + classes.select}
                    defaultValue={"phy"}
                    inputProps={{
                        classes: {
                            icon: classes.icon,
                        },
                    }}>
                        {subjects.map((subject: ISubject) => <MenuItem value={subject.subjectId}>{subject.subjectName}</MenuItem>)}
                </Select>
            </Stack>
        </Stack>
    }
    
    const renderHeader = () => {
        return <Stack horizontal className="header-page">
            {getHeaderBody()}
        </Stack>
    };

    return renderHeader();
}

export default Header;