import * as React from "react";
import { Text } from "@fluentui/react-northstar";
import { Stack } from "@fluentui/react";
import { ISubSubject } from "../../../models/sub-subject";
import { ISubject } from "../../../models/subject";
import { getSubject } from "../../../api/subject-api";
import { isSubjectFound, getSubSubject } from "../../../api/sub-subject-api";
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded';

import "./subject-header.scss";

interface ISubjectHeaderState {
    subject: ISubject;
    subSubject: ISubSubject;
}

interface ISubjectHeaderProps {
    subjectId: string;
    subSubjectId: string;
}

/** Renders navigation bar */
 class SubjectHeader extends React.Component<ISubjectHeaderProps, ISubjectHeaderState> {

    constructor(props: ISubjectHeaderProps) {
        super(props);
        this.state = {
            subject: {
                subjectDescription: "",
                subjectId: "",
                subjectName: "",
            },
            subSubject: {
                subSubjectDescription: "",
                subjectId: "",
                subSubjectName: "",
                subSubjectId: "",
            }
        }
    }

    componentWillMount() {
        this.getSubjectDetail();
        this.getSubSubjectDetail();
    }

    getSubjectDetail = () => {
        let response = getSubject(this.props.subjectId);
        this.setState({
            subject: response!,
        })
    }

    getSubSubjectDetail = () => {
        if (this.props.subSubjectId !== ""){
            let response =  getSubSubject(this.props.subSubjectId);
            this.setState({
                subSubject: response!,
            })
        }
    }
    
    renderSubjectHeader = () => {
        return <Stack horizontal verticalAlign="center" className="subject-header-container">
            <Text content={this.state.subject.subjectName} className="subject-title"/>
            {this.props.subSubjectId === "" ? <></> : (isSubjectFound(this.props.subSubjectId, this.props.subjectId) && <Stack horizontal verticalAlign="center">
                    <ArrowForwardIosRoundedIcon fontSize="small" className="subject-separator"/>
                    <Text content={this.state.subSubject.subSubjectName} className="sub-subject-title"/>
                </Stack>)
            }
        </Stack>
    };

    render() {
        return this.renderSubjectHeader();
    };
}

export default SubjectHeader;