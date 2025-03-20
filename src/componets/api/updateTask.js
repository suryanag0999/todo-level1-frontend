async function updateTaskAPI(
    values,
    taskId,
    handleResponse,
    handleError,
    setLoading
  ) {
    setLoading(true);
    try {
        const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;
        const endpoint = "/task/" + taskId;
        const url = `${baseUrl}${endpoint}`
        
     // Construct the request body with the values provided
     const requestBody = JSON.stringify({
         title: values.taskTitle,
         description: values.taskDescription,
         due_date: values.taskDueDate?.toISOString(),
       });
       // Send a POST request to the constructed URL to create the task
       const response = await fetch(url, {
         method: "PUT",
         headers: {
           "Content-Type": "application/json",
         },
         body: requestBody,
       });
       
       //handel data coming from fetch
       const jsonData = await response.json();
       if (!response.ok) {
         const errorMessage = jsonData.message || "Unknown error occurred";
         throw new Error(errorMessage);
       }
 
         
       handleResponse(jsonData);
     } catch (error) {
         const errorMessage= error.response?.data?.message||errorMessage||"unkown error";
       handleError(new Error(errorMessage));
     } finally {
       setLoading(false);
     }
 }  
  export default updateTaskAPI;
