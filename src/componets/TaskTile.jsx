import React,{useCallback,useState} from "react";
import CheckedBlue from "../assets/blue-checked.svg";
import AlarmClock from "../assets/alarm-clock.svg";
import Edit from "../assets/edit.svg";
import Delete from "../assets/delete.svg";
import moment from "moment";
import DeleteTask from "../componets/ui/DeleteTask"



export default function TaskTile( { task, onClick, fetchAllTasks, setActiveTask, showEditTaskScreen }) {
  const [showDeleteTaskPopup, setShowDeleteTaskPopup] = useState(false);

  const handleEditTask = useCallback(
    (event) => {
      // In this case, this element and one of its ancestors (div with className `task-tile-container`)
      // have handlers for the same event (onClick). We don't want to fire the onClick handler on the parent.
      // So we stop event bubbling with `event.stopPropagation()`
      event.stopPropagation();
      setActiveTask(task);
      showEditTaskScreen();
    },
    [setActiveTask, showEditTaskScreen, task]
  );
  const handleDeleteTask = useCallback((event) => {
    event.stopPropagation();
    setShowDeleteTaskPopup(true);
  }, []);

  const closeDeleteTaskPopup = useCallback(
    () => setShowDeleteTaskPopup(false),
    []
  );

  return (
    // The empty JSX tag <></> is shorthand for <React.Fragment></React.Fragment> in most cases
    <>
      <div className="task-tile-container cursor-pointer" onClick={onClick}>
        <span className="task-icon-wrapper">
          <img src={CheckedBlue} className="task-icon" alt="Task icon" />
        </span>
        <div className="task-text-wrapper">
          <p className="task-primary-text">{task.title}</p>
          <p className="task-secondary-text">{task.description}</p>
        </div>
        <div className="action-items-container">
          {task.due_date && (
            <div className="flex date-container">
              <img src={AlarmClock} alt="clock-icon" />
              <p className="date-text">
                {moment(task.due_date).format("DD MMM YYYY")}
              </p>
            </div>
          )}
          <div
            className="edit-container cursor-pointer"
            onClick={handleEditTask}
          >
            <img src={Edit} alt="Edit Task icon" />
          </div>
          <div
            className="delete-container cursor-pointer"
            onClick={handleDeleteTask}
          >
            <img src={Delete} alt="Delete Task icon" />
          </div>
        </div>
      </div>
      <DeleteTask
        isOpen={showDeleteTaskPopup}
        onClose={closeDeleteTaskPopup}
        task={task}
        fetchAllTasks={fetchAllTasks}
      />
    </>
  );
};


