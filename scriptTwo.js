
// Function to add title and save it to localStorage
function addTitle() {
    const titleInput = document.getElementById("titleInput").value.trim();
    const titleDisplay = document.getElementById("titleDisplay");

    // Display the title below the title input
    if (titleInput !== "") {
        titleDisplay.textContent = titleInput;
        localStorage.setItem("title", titleInput);
        document.getElementById("titleInput").value = ""; // Clear the input
    } else {
        console.warn("Title input is empty. Please enter a title.");
    }
}

// Function to add item and description, and save to localStorage
function addItem() {
    const itemInput = document.getElementById("itemInput").value.trim();
    const descInput = document.getElementById("descInput").value.trim();
    const list = document.getElementById("orderedList");

    // Display each item and description below the title
    if (itemInput !== "" && descInput !== "") {
        const listItem = document.createElement("li");
        listItem.innerHTML = `<strong>${itemInput}</strong>: ${descInput}`;
        list.appendChild(listItem);

        // Save the item and description to localStorage
        const items = JSON.parse(localStorage.getItem("items")) || [];
        items.push({ item: itemInput, description: descInput });
        localStorage.setItem("items", JSON.stringify(items));

        // Clear the item and description input fields
        document.getElementById("itemInput").value = "";
        document.getElementById("descInput").value = "";
    } else {
        console.warn("Item or description input is empty. Please enter both fields.");
    }
}

// Function to load saved title and items from localStorage
function loadFromLocalStorage() {
    // Load and display title
    const savedTitle = localStorage.getItem("title");
    if (savedTitle) {
        document.getElementById("titleDisplay").textContent = savedTitle;
    }

    // Load and display items
    const savedItems = JSON.parse(localStorage.getItem("items")) || [];
    const list = document.getElementById("orderedList");
    savedItems.forEach(itemObj => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `<strong>${itemObj.item}</strong>: ${itemObj.description}`;
        list.appendChild(listItem);
    });
}

// Load data when the page is loaded
window.onload = loadFromLocalStorage;

// Save the title in localStorage
localStorage.setItem("title", titleInput);

// Save the items array as a JSON string in localStorage
const items = JSON.parse(localStorage.getItem("items")) || [];
items.push({ item: itemInput, description: descInput });
localStorage.setItem("items", JSON.stringify(items));