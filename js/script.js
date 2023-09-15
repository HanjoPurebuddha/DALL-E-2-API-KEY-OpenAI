async function makeAPICall() {
    try {
      const apiKey = localStorage.getItem('apiKey');
      if (!apiKey) {
        console.error("API key is missing. Please reload the page and enter your API key.");
        return;
      }
  
      const image1 = document.getElementById('image1').files[0];
      const mask = document.getElementById('mask').files[0];
      const prompt = document.getElementById('prompt').value;
      const apiSelection = document.getElementById('apiSelection').value;
      const apiEndpoint = 'https://api.openai.com/v1/images'; // Replace with the actual API endpoint
  
      let response;
      const formData = new FormData();
      formData.append('prompt', prompt);
      formData.append('n', 1);
      formData.append('size', '1024x1024');
  
      if (apiSelection === 'edit' && image1 && mask) {
        formData.append('image', image1, image1.name);
        formData.append('mask', mask, mask.name);
        response = await axios.post(`${apiEndpoint}/create_edit`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${apiKey}`
          }
        });
      } else if (apiSelection === 'variation' && image1) {
        formData.append('image', image1, image1.name);
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
        console.error(error.response.status);
        console.error(error.response.data);
        console.error(`Error: ${error.response.status}\n${JSON.stringify(error.response.data)}`);
      } else {
        console.error(error.message);
        console.error(`Error: ${error.message}`);
      }
    }
  }
  

// Function to download the generated images (if any)
function downloadImages() {
    const generatedImages = JSON.parse(localStorage.getItem('generatedImages'));
    if (generatedImages && generatedImages.length > 0) {
        generatedImages.forEach(imgData => {
            const link = document.createElement('a');
            link.href = imgData.url;
            link.download = 'generated_image.png'; // You might want to generate unique names here
            link.click();
        });
        alert('Download initiated for all generated images.');
    } else {
        alert('No generated images found to download.');
    }
}
