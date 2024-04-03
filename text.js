async function performOCR() {
    const fileInput = document.getElementById('fileInput');
    const ocrResult = document.getElementById('ocrResult');

    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const formData = new FormData();
        formData.append('file', file);
        formData.append('apikey', 'YOUR_API_KEY'); // Replace 'YOUR_API_KEY' with your actual OCR.space API key

        try {
            const response = await fetch('https://api.ocr.space/parse/image', {
                method: 'POST',
                body: formData
            });
            const data = await response.json();

            if (data && data.ParsedResults && data.ParsedResults.length > 0) {
                const extractedText = data.ParsedResults[0].ParsedText;
                ocrResult.textContent = extractedText;
            } else {
                ocrResult.textContent = 'No text extracted.';
            }
        } catch (error) {
            console.error('Error:', error);
            ocrResult.textContent = 'Error processing the image.';
        }
    } else {
        ocrResult.textContent = 'Please select an image to process.';
    }
}