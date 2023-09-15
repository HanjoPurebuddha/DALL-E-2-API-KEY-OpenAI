async function makeAPICall() {
    try {
      const apiKey = localStorage.getItem('apiKey');
      if (!apiKey) {
        alert("API key is missing. Please reload the page and enter your API key.");
        return;
      }
  
      const image1 = document.getElementById('image1').files[0];
      const mask = document.getElementById('mask').files[0];
      const prompt = document.getElementById('prompt').value;
      const apiSelection = document.getElementById('apiSelection').value;
      const apiEndpoint = '/api/v1/images'; // Adjusted to work with Netlify's redirect & proxy
  
      let response;
      const formData = new FormData();
      formData.append('prompt', prompt);
      formData.append('n', 1);
      formData.append('size', '1024x1024');
  
      if (apiSelection === 'edit' && image1 && mask) {
        formData.append('image', image1);
        formData.append('mask', mask);
        response = await axios.post(`${apiEndpoint}/create_edit`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${apiKey}`
          }
        });
      } else if (apiSelection === 'variation' && image1) {
        formData.append('image', image1);
        response = await axios.post(`${apiEndpoint}/create_variation`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${apiKey}`
          }
        });
      } else {
        response = await axios.post(`${apiEndpoint}/create`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${apiKey}`
          }
        });
      }
  
      document.getElementById('outputImage').src = response.data.data[0].url;
    } catch (error) {
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
  