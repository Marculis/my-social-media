import { useState, useEffect } from "react";
import css from "./profileInfo.module.css";

const Status = (props) => {
  const [editMode, setEditMode] = useState(false);
  const [status, setStatus] = useState(props.status);
  useEffect(() => {}, [status]);

  const sendStatus = (status) => {
    props.putStatus(status);
    setEditMode(false);
  };

  return (
    <div
      className={css.status}
      onClick={() => props.isMyProfile && setEditMode(true)}
    >
      {editMode ? (
        props.isMyProfile && (
          <input
            autoFocus
            value={status}
            onBlur={() => sendStatus(status)}
            onChange={(e) => setStatus(e.currentTarget.value)}
          />
        )
      ) : (
        <span> {props.status} </span>
      )}
    </div>
  );
};

export default Status;
