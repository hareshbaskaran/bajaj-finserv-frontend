document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('jsonForm');
    const jsonInput = document.getElementById('jsonInput');
    const errorElem = document.getElementById('error');
    const filterOptions = document.getElementById('filterOptions');
    const responseOutput = document.getElementById('responseOutput');
  
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const jsonString = jsonInput.value;
  
      try {
        const jsonData = JSON.parse(jsonString);
        errorElem.textContent = '';
        filterOptions.style.display = 'block';
  
        // Send the data to the backend API
        const response = await fetch('https://bajaj-finserv-fastapi.onrender.com/bhfl', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(jsonData)
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const data = await response.json();
        updateResponse(data);
      } catch (error) {
        errorElem.textContent = 'Invalid JSON input or error fetching data';
        responseOutput.textContent = '';
      }
    });
  
    filterOptions.addEventListener('change', () => {
      const selectedOptions = Array.from(filterOptions.selectedOptions).map(option => option.value);
      const responseData = JSON.parse(responseOutput.textContent || '[]');
      const filteredData = filterResponse(responseData, selectedOptions);
      responseOutput.textContent = JSON.stringify(filteredData, null, 2);
    });
  
    function updateResponse(data) {
      responseOutput.textContent = JSON.stringify(data, null, 2);
    }
  
    function filterResponse(data, options) {
      return data.filter(item => {
        if (options.includes('Alphabets') && isNaN(item)) return true;
        if (options.includes('Numbers') && !isNaN(item)) return true;
        return false;
      });
    }
  });
  