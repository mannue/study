import React, { useState } from "react";
//import { CallbackButton } from "./CallbackButton";
import { SimpleButton } from "./SimpleButton";
import { HooksButton } from "./HooksButton";

export function Summary(props) {


  if (props.name.length >= 4) {
    return (
      <>
        <td>{props.index + 1}</td>
        <td>{props.name}</td>
        <td>{props.name.length}</td>
        <td>
          <SimpleButton
            className="btn btn-warning btn-sm m-1"
            callback={props.reverseCallback}
            text={`Reverse (${props.name})`}
            {...props}
          />
          <HooksButton
            className="btn btn-info btn-sm m-1"
            callback={() => props.promoteCallback(props.name)}
            text={`Promote (${[props.name]})`}
            {...props}
          />
        </td>
      </>
    );
  } else {
    return null;
  }
}
