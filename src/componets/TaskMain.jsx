import React from "react";
import NoTask from "./NoTask";
import CreateTask from "./CreateTask";
import EditTask from "./EditTask";
import TaskList from "./TaskList";
import ViewTask from "./ViewTask";
// import Delete from "./ui/DeleteTask.jsx";
import Loading from "./ui/Loading";
import fetchTasksAPI from "../componets/api/fetchtasks.js";
import { useState,useEffect,useCallback } from "react";




export default function TaskMain() {

  const [currComponent, setCurrComponent] = useState("loading");
 const [tasks, setTasks] = useState([]);
 const [activeTask, setActiveTask] = useState();

  const showNoTaskScreen = useCallback(function () {
    setCurrComponent("noTask");
  }, []);
  const showCreateTaskScreen = useCallback(function () {
    setCurrComponent("createTask");
  }, []);
  const showTaskListScreen = useCallback(function () {
    setCurrComponent("taskList");
  }, []);
  const showEditTaskScreen = useCallback(function () {
    setCurrComponent("editTask");
  }, []);
  const showViewTaskScreen = useCallback(function () {
    setCurrComponent("viewTask");
  }, []);

  
  const handleResponse = useCallback(
    function (responseData) {
      const extractedTasks = responseData.tasks;
      setTasks(extractedTasks);
      if (extractedTasks.length) {
        showTaskListScreen();
      } else {
        showNoTaskScreen();
      }
    },
    [showNoTaskScreen, showTaskListScreen]
  );

  const handleError = useCallback(function (errorMsg) {
  
    alert(errorMsg);
    console.error(errorMsg);
  }, []);

  const fetchAllTasks = useCallback(
    function () {
   
      fetchTasksAPI(handleResponse, handleError);
    },
    [handleError, handleResponse]
  );

  // Initial effect
  useEffect(() => {
    fetchAllTasks();
  }, [fetchAllTasks]);

    
  

  return (
  <>
  {currComponent === "loading" && <Loading/>}
  <div id="container-div">
  {currComponent === "noTask" && <NoTask showCreateTaskScreen={showCreateTaskScreen}/>}
  {currComponent === "taskList" && <TaskList 
  tasks={tasks}
  setActiveTask={setActiveTask}
  fetchAllTasks={fetchAllTasks}
  showCreateTaskScreen={showCreateTaskScreen}
  showViewTaskScreen={showViewTaskScreen}
  showEditTaskScreen={showEditTaskScreen} />}
  {currComponent === "createTask" && <CreateTask fetchAllTasks={fetchAllTasks} showTaskListScreen={showTaskListScreen} />}
  {currComponent === "viewTask" && <ViewTask task={activeTask}
            showTaskListScreen={showTaskListScreen}
            fetchAllTasks={fetchAllTasks}
            setActiveTask={setActiveTask}
            showEditTaskScreen={showEditTaskScreen} />}
  {currComponent === "editTask" && <EditTask task={activeTask}
  fetchAllTasks={fetchAllTasks}
  showTaskListScreen={showTaskListScreen} />}
</div>


  </>
  );
   
  
}
