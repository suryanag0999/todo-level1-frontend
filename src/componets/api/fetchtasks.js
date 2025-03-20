// // Asynchronous function to fetch tasks from the backend server
// async function fetchTasksAPI(handleResponse, handleError) {
//     try {
//       // Base URL for the API endpoint. Stored in an environment variable
//       const baseUrl = import.meta.env.VITE_APP_API_BASE_URL
//       // Endpoint for fetching tasks
//       const endpoint = "/tasks";
  
//       // Construct the full URL using the base URL and endpoint
//       const url = new URL(endpoint, baseUrl)
  
//       // Send a GET request to the constructed URL to fetch tasks
//       // Note: The method argument is omitted here as fetch defaults to GET
//       const response = await fetch(url);
  
//       // Extract JSON data from the response
//       const jsonData = await response.json();
  
//       // Check if the response is not successful
//       if (!response.ok) {
//         // Extract the error message from the JSON data, or use a default message
//         const errorMessage = jsonData.message || "Unknown error occurred";
//         // Throw an error with the extracted error message
//         throw new Error(errorMessage);
//       }
  
//       // Pass the fetched tasks data to the handleResponse function for further processing
//       handleResponse(jsonData);
//     } catch (error) {
//       // If any error occurs during the fetch or processing, handle it using the provided handleError function
//       handleError(error);
//     }
//   }
  
//   export default fetchTasksAPI;
async function fetchTasksAPI(handleResponse, handleError) {
  try {
    const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;
    if (!baseUrl) throw new Error("Base URL is undefined. Check your .env file.");

    const endpoint = "tasks"; // No leading '/'
    const url = `${baseUrl}${endpoint}`
    

    console.log("Fetching from:", url.toString()); // Debugging log

    const response = await fetch(url);
    
    // Debugging: Log the response type
    const contentType = response.headers.get("content-type");
    console.log("Response Content-Type:", contentType);

    if (!response.ok) {
      const errorText = await response.text(); // Read error response
      console.error("Error Response:", errorText);
      throw new Error(`HTTP Error ${response.status}: ${errorText}`);
    }

    const jsonData = await response.json();
    handleResponse(jsonData);
  } catch (error) {
    handleError(error.message);
  }
}
export default fetchTasksAPI;