/* 
Filename: sophisticated_code.js
Purpose: Demonstrating a sophisticated and complex JavaScript code

Please note that the code provided below is a fictional example, which may not necessarily serve any practical purpose. It is intended solely to meet the requirements outlined in the prompt.

*/

// Import required modules
const request = require('request');
const fs = require('fs');
const path = require('path');

// Define global variables
const apiUrl = 'https://api.example.com/data';
let data = [];

// Function to make an API call
function fetchData() {
  return new Promise((resolve, reject) => {
    request(apiUrl, (error, response, body) => {
      if (error) {
        reject(error);
      } else {
        resolve(JSON.parse(body));
      }
    });
  });
}

// Function to process and transform the data
function processData(rawData) {
  return new Promise((resolve, reject) => {
    try {
      let transformedData = [];

      // Perform complex data transformation and filtering
      rawData.forEach((item) => {
        if (item.isActive) {
          const transformedItem = {
            id: item._id,
            name: item.name,
            category: item.category.toUpperCase(),
            price: item.price.toFixed(2),
            quantity: item.quantity,
          };

          transformedData.push(transformedItem);
        }
      });

      resolve(transformedData);
    } catch (error) {
      reject(error);
    }
  });
}

// Function to save the processed data to a file
function saveDataToFile(data) {
  return new Promise((resolve, reject) => {
    const filePath = path.join(__dirname, 'processed_data.json');

    fs.writeFile(filePath, JSON.stringify(data, null, 2), (error) => {
      if (error) {
        reject(error);
      } else {
        resolve(filePath);
      }
    });
  });
}

// Main function to orchestrate the entire process
async function main() {
  try {
    console.log('Fetching data from API...');
    data = await fetchData();

    console.log('Processing the data...');
    const processedData = await processData(data);

    console.log('Saving the processed data to a file...');
    const filePath = await saveDataToFile(processedData);

    console.log(`Data successfully processed and saved to ${filePath}.`);
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

// Execute the main function
main().catch(console.error);