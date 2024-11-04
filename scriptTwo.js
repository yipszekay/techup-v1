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

// Function to add item, description, and link, and save to localStorage
function addItem() {
    const itemInput = document.getElementById("itemInput").value.trim();
    const descInput = document.getElementById("descInput").value.trim();
    const list = document.getElementById("orderedList");

    // Display each item and description below the title
    if (itemInput !== "" && descInput !== "") {
        // Create list item for display
        const listItem = document.createElement("li");
        listItem.innerHTML = `<strong>${itemInput}</strong>: ${descInput}`;

        // Create YouTube button
        const youtubeButton = document.createElement("button");
        youtubeButton.textContent = "YouTube Search";
        youtubeButton.onclick = () => searchYouTube(itemInput); // Set up the YouTube search function

        // Create the link input
        const linkInput = document.createElement("input");
        linkInput.type = "text";
        linkInput.placeholder = "Link";

        // Append elements to the list item
        listItem.appendChild(youtubeButton);
        listItem.appendChild(linkInput);
        list.appendChild(listItem);

        // Save the item, description, and link to localStorage
        const items = JSON.parse(localStorage.getItem("items")) || [];
        // Capture the link value correctly when saving
        items.push({ item: itemInput, description: descInput, link: linkInput.value });
        localStorage.setItem("items", JSON.stringify(items));

        // Show a message if a link was added
        if (linkInput) {
            const message = document.createElement("p");
            message.textContent = "Link added!";
            message.style.color = "green"; // Optional: make the message green
            document.body.appendChild(message);
            setTimeout(() => message.remove(), 2000); // Remove message after 2 seconds
        }

        // Clear the item, description, and link input fields
        document.getElementById("itemInput").value = "";
        document.getElementById("descInput").value = "";
        document.getElementById("linkInput").value = ""; // Clear link input
    } else {
        console.warn("Item or description input is empty. Please enter both fields.");
    }

// Function to load saved title, items, and link from localStorage
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

        // If there's a link, add it as a hyperlink
        if (itemObj.link) {
            const link = document.createElement("a");
            link.href = itemObj.link;
            link.textContent = "Link";
            link.target = "_blank"; // Open link in a new tab
            listItem.appendChild(link);
        }

        list.appendChild(listItem);
    });
}

// Load data when the page is loaded
window.onload = loadFromLocalStorage;

function searchYouTube(item) {
    const query = encodeURIComponent(`${item}`);
    const youtubeUrl = `https://www.youtube.com/results?search_query=${query}`;
    window.open(youtubeUrl, '_blank');
}
