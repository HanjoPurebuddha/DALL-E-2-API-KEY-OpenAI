// Initialize the function to make the API call
async function makeAPICall() {
    try {
      // Retrieve the API key from the local storage. If not present, alert the user.
      const apiKey = localStorage.getItem('apiKey');
      if (!apiKey) {
        alert("API key is missing. Please reload the page and enter your API key.");
        return;
      }
  
      // Retrieve the uploaded image, mask (if applicable), and prompt from the user inputs on the webpage
      const image1 = document.getElementById('image1').files[0];
      const mask = document.getElementById('mask').files[0];
      const prompt = document.getElementById('prompt').value;
      const apiSelection = document.getElementById('apiSelection').value;
  
      // Define the API endpoint as a base URL
      const apiEndpoint = '/api/v1/images';
  
      // Initialize the FormData object to store the data to be sent in the API request
      let formData = new FormData();
  
      // Append the prompt, number of images, and size to the FormData object
      formData.append('prompt', prompt);
      formData.append('n', 1);
      formData.append('size', '1024x1024');
  
      // Initialize the response variable to store the API response
      let response;
  
      // Based on the API selection (create, edit, or variation), make the appropriate API call with the necessary data
      // For 'edit', both image and mask are required
      // For 'variation', only the image is required
      // For 'create', only the prompt is required
      if (apiSelection === 'edit' && image1 && mask) {
        // Append the image and mask to the FormData object
        formData.append('image', image1);
        formData.append('mask', mask);
  
        // Make the API call to the 'create_edit' endpoint with the necessary headers (including the API key)
        // The response_format is set to 'url' to get the image URL in the response
        response = await axios.post(`${apiEndpoint}/edits`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${apiKey}`
          }
        });
      } else if (apiSelection === 'variation' && image1) {
        // Append the image to the FormData object
        formData.append('image', image1);
  
        // Make the API call to the 'create_variation' endpoint with the necessary headers (including the API key)
        // The response_format is set to 'url' to get the image URL in the response
        response = await axios.post(`${apiEndpoint}/variations`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${apiKey}`
          }
        });
      } else {
        // Make the API call to the 'create' endpoint with the necessary headers (including the API key)
        // The response_format is set to 'url' to get the image URL in the response
        response = await axios.post(`${apiEndpoint}/generations`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${apiKey}`
          }
        });
      }
  
      // Set the source of the output image element to the URL received in the API response
      document.getElementById('outputImage').src = response.data.data[0].url;
    } catch (error) {
      // Error handling: If there is an error in the API response, it is caught here and the details are logged to the console and alerted to the user
      if (error.response) {
        console.log(error.response.status);
        console.log(error.response.data);
        alert(`Error: ${error.response.status}\n${JSON.stringify(error.response.data)}`);
      } else {
        console.log(error.message);
        alert(`Error: ${error.message}`);
      }
    }
  }
  