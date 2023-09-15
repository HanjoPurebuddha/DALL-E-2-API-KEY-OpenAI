async function makeAPICall() {
    try {
        // Step 1: Retrieve the API Key from local storage and check its existence
        const apiKey = localStorage.getItem('apiKey');
        if (!apiKey) {
            alert("API key is missing. Please reload the page and enter your API key.");
            return;
        }

        // Step 2: Get the input values from the form
        const image1 = document.getElementById('image1').files[0];
        const mask = document.getElementById('mask').files[0];
        const prompt = document.getElementById('prompt').value;
        const apiSelection = document.getElementById('apiSelection').value;
        const imageSize = document.getElementById('imageSize').value;
        const imageCount = document.getElementById('imageCount').value;

        // Step 3: Set up the API endpoint base URL
        const apiEndpointBase = '/api/v1/images';

        // Step 4: Create a FormData object to hold the input values
        const formData = new FormData();
        formData.append('prompt', prompt);
        formData.append('n', imageCount);
        formData.append('size', imageSize);

        // Step 5: Set up the specific API endpoint and append necessary files to FormData
        let apiEndpoint;
        if (apiSelection === 'edit') {
            apiEndpoint = `${apiEndpointBase}/edits`;
            if (image1) formData.append('image', image1);
            if (mask) formData.append('mask', mask);
        } else if (apiSelection === 'variation') {
            apiEndpoint = `${apiEndpointBase}/variations`;
            if (image1) formData.append('image', image1);
        } else {
            apiEndpoint = `${apiEndpointBase}/generations`;
        }

        // Step 6: Make the API call using Axios
        const response = await axios.post(apiEndpoint, formData, {
            headers: {
                'Authorization': `Bearer ${apiKey}`
            }
        });

        // Step 7: Display the output image
        const outputSection = document.getElementById('outputSection');
        outputSection.innerHTML = ''; // Clear previous output
        response.data.data.forEach(imgData => {
            const img = document.createElement('img');
            img.src = imgData.url;
            img.style.margin = '10px';
            outputSection.appendChild(img);
        });

        // Step 8: Save the generated images URL to local storage
        localStorage.setItem('generatedImages', JSON.stringify(response.data.data));
    } catch (error) {
        // Step 9: Error handling
        if (error.response) {
            console.error('Error response:', error.response);
            alert(`Error: ${error.response.status}\n${JSON.stringify(error.response.data)}`);
        } else {
            console.error('Error message:', error.message);
            alert(`Error: ${error.message}`);
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
