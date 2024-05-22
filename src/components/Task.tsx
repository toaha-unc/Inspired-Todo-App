import { useState } from "react";
import * as http from "../HttpCalls";
import "../App.css";

function Task() {
  const [taskData, setTaskData] = useState(null);

  const onTaskClick = async () => {
    const task = await http.getTask();
    setTaskData(task);
  };

  return (
    <div>
      <div
        onClick={onTaskClick}
        className="btn btn-light mb-3"
        style={{
          width: "100%",
          height: "102px",
          borderRadius: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          fontWeight: "bold",
          fontFamily: "Helvetica, Arial, sans-serif",
        }}
      >
        <p id="taskBtn" className="mb-0">
          Take a break! Here&apos;s something to do
        </p>
      </div>
      <br />
      <br />
      <div
        style={{
          textAlign: "center", height: "20px"
        }}
      >
        {taskData && <h3>{taskData}</h3>}
      </div>
    </div>
  );
}

export default Task;
