/*
Filename: complexCode.js

Description: This complex code implements a dynamic image gallery with filtering and pagination capabilities. It fetches data from an API and allows users to filter images based on different categories. It also supports pagination to load more images as the user navigates through the gallery.

Author: John Doe
Date: October 1, 2022
*/

// Import required libraries
import axios from 'axios';

// Global variables
let images = [];
let filteredImages = [];
let currentPage = 1;
const pageSize = 12;
const categories = ['nature', 'architecture', 'food', 'sports'];
let selectedCategory = '';

// Fetch images from API
const fetchImages = async () => {
  try {
    const response = await axios.get('https://api.example.com/images');
    images = response.data;
    renderGallery();
  } catch (error) {
    console.error('Error fetching images:', error);
  }
};

// Filter images based on selected category
const filterImages = () => {
  filteredImages = selectedCategory
    ? images.filter((image) => image.category === selectedCategory)
    : images;
};

// Render image gallery
const renderGallery = () => {
  filterImages();

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedImages = filteredImages.slice(startIndex, endIndex);

  // Clear previous gallery content
  document.getElementById('gallery').innerHTML = '';

  // Render images
  paginatedImages.forEach((image) => {
    const imgElement = document.createElement('img');
    imgElement.src = image.url;
    imgElement.alt = image.title;
    document.getElementById('gallery').appendChild(imgElement);
  });

  // Render pagination
  const totalPages = Math.ceil(filteredImages.length / pageSize);
  let paginationHtml = '';
  for (let i = 1; i <= totalPages; i++) {
    paginationHtml += `<button class="pagination-button ${
      currentPage === i ? 'active' : ''
    }">${i}</button>`;
  }
  document.getElementById('pagination').innerHTML = paginationHtml;

  // Attach event listeners
  document
    .querySelectorAll('.pagination-button')
    .forEach((button, index) => {
      button.addEventListener('click', () => {
        currentPage = index + 1;
        renderGallery();
      });
    });

  document.getElementById('category-selector').addEventListener('change', (event) => {
    selectedCategory = event.target.value;
    currentPage = 1;
    renderGallery();
  });
};

// Initialize the image gallery
fetchImages();
