import React from 'react'
import TaskTile from './TaskTile'
import folderImg from "../assets/folder-white.svg";
import { useCallback } from 'react';

export default function TaskList({setActiveTask,
    tasks,
    fetchAllTasks,
    showCreateTaskScreen,
    showViewTaskScreen,
    showEditTaskScreen}) {

    const viewTask = useCallback(
            (task) => {
              setActiveTask(task);
              showViewTaskScreen();
            },
            [setActiveTask, showViewTaskScreen]
          );
  return (
<div className='task-list-screen content-section'>
    <div className='content-section-container'>
        <div className='task-list-header-main'>
            <p className='task-heading'>🔥Task</p>
            <button onClick={showCreateTaskScreen} className='add-task-btn cursor-pointer'>
                <img src={folderImg} alt="add task icon" />
                add new task
            </button>
        </div>
        <div className="task-list-container">
        {tasks.map((task) => (
            <TaskTile
              key={task._id + "-task-tile"}
              task={task}
              onClick={() => viewTask(task)}
              fetchAllTasks={fetchAllTasks}
              setActiveTask={setActiveTask}
              showEditTaskScreen={showEditTaskScreen}
            />
          ))}
        </div>
    </div>
</div>
  )
}
