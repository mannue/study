import React from "react";
import {CallbackButton} from "./CallbackButton";

export function Summary(props) {

    if (props.name.length >= 4) {
        return <>
            <td>{props.index + 1}</td>
            <td>{props.name}</td>
            <td>{props.name.length}</td>
            <td>
                <CallbackButton theme='primary' callback={props.reverseCallback} text="Reverse"/>
                <CallbackButton theme='info' callback={() => props.promoteCallback(props.name)} text="Promote"/>
            </td>
        </>
    } else {
        return null;
    }
}