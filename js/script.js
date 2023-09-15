async function makeAPICall() {
    try {
        // @Retrieving API Key@: Harmonizing with the local storage to retrieve the necessary API key, ensuring a smooth flow of energies for the API communication.
        const apiKey = localStorage.getItem('apiKey');
        if (!apiKey) {
            console.error("API key is missing. Please reload the page and enter your API key.");
            return;
        }

        // @Acquiring Inputs@: Acquiring the necessary energies (inputs) to initiate the cosmic dance of API communication.
        const image1 = document.getElementById('image1').files[0];
        const mask = document.getElementById('mask').files[0];
        const prompt = document.getElementById('prompt').value;
        const apiSelection = document.getElementById('apiSelection').value;

        // @API Endpoint Harmonization@: Aligning with the universal energies by setting up the correct API endpoint based on the selected action.
        const apiEndpoint = apiSelection === 'generation' ? 'https://api.openai.com/v1/images/generations' : 'https://api.openai.com/v1/images/' + apiSelection;

        // @Formulating Request@: Formulating the request with a sacred alignment of parameters to communicate harmoniously with the API.
        const formData = new FormData();
        formData.append('prompt', prompt);
        formData.append('n', 1);
        formData.append('size', '1024x1024');

        // Conditional appending of image and mask based on the API selection
        if (image1) formData.append('image', image1);
        if (mask) formData.append('mask', mask);

        // @Header Configuration@: Setting up the sacred headers to ensure a secure and harmonized communication with the API energies.
        const headers = {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${apiKey}`
        };

        // @API Communication@: Engaging in a cosmic dance with the API energies to create or transform images, manifesting the desired outcomes.
        const response = await axios.post(apiEndpoint, formData, { headers });

        // @Response Integration@: Integrating the response into the web canvas to display the manifested creation, a harmonious blend of the old and new energies.
        document.getElementById('outputImage').src = response.data.data[0].url;
    } catch (error) {
        // @Error Harmonization@: Harmonizing the energies during errors to ensure a peaceful and insightful error handling process, guiding towards resolutions.
        if (error.response) {
            console.error(error.response.status);
            console.error(error.response.data);
        } else {
            console.error(error.message);
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
