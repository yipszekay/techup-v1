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
        // Create list item for display
        const listItem = document.createElement("li");
        listItem.innerHTML = `<strong>${itemInput}</strong>: ${descInput}`;

        // Create buttons
        const googleButton = createIconButton("fab fa-google", () => searchGoogle(itemInput));
        const mapsButton = createIconButton("fas fa-map-marker-alt", () => searchGoogleMaps(itemInput));
        const youtubeButton = createIconButton("fab fa-youtube", () => searchYouTube(itemInput));
        const amazonButton = createIconButton("fab fa-amazon", () => searchAmazon(itemInput));

        // Append buttons to list item
        listItem.appendChild(googleButton);
        listItem.appendChild(mapsButton);
        listItem.appendChild(youtubeButton);
        listItem.appendChild(amazonButton);
        
        list.appendChild(listItem);

        // Create link input field
        const linkInput = document.createElement("input");
        linkInput.type = "text";
        linkInput.placeholder = "Enter link";

        // Create "Add Link" button
        const addLinkButton = document.createElement("button");
        addLinkButton.textContent = "Add Link";

        // Create a placeholder for the link to be added
        const linkDisplay = document.createElement("span");

        // Add event listener to the "Add Link" button
        addLinkButton.onclick = () => {
            const linkValue = linkInput.value.trim();
            if (linkValue) {
                const link = document.createElement("a");
                link.href = linkValue;
                link.textContent = "Link";
                link.target = "_blank"; // Open link in a new tab
                linkDisplay.innerHTML = ""; // Clear previous links
                linkDisplay.appendChild(link); // Append the clickable link
                
                // Save the item, description, and link to localStorage
                const items = JSON.parse(localStorage.getItem("items")) || [];
                items.push({ item: itemInput, description: descInput, link: linkValue });
                localStorage.setItem("items", JSON.stringify(items));
                
                // Show a message if a link was added
                const message = document.createElement("p");
                message.textContent = "Link added!";
                message.style.color = "green"; // Optional: make the message green
                document.body.appendChild(message);
                setTimeout(() => message.remove(), 2000); // Remove message after 2 seconds
                
                // Hide the link input field and button
                linkInput.style.display = "none";
                addLinkButton.style.display = "none";

                // Clear the link input field
                linkInput.value = ""; 
            } else {
                console.warn("Link input is empty. Please enter a link.");
            }
        };

        // Append elements to the list item
        listItem.appendChild(linkInput);
        listItem.appendChild(addLinkButton);
        listItem.appendChild(linkDisplay); // Append link display area
        list.appendChild(listItem);

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
        
        // Create link display area
        const linkDisplay = document.createElement("span");
        
        // If there's a link, add it as a hyperlink
        if (itemObj.link) {
            const link = document.createElement("a");
            link.href = itemObj.link;
            link.textContent = "Link";
            link.target = "_blank"; // Open link in a new tab
            linkDisplay.appendChild(link);
        }

        listItem.appendChild(linkDisplay); // Append link display area
        list.appendChild(listItem);
    });
}

// Load data when the page is loaded
window.onload = loadFromLocalStorage;

// Function to create an icon button
function createIconButton(iconClass, clickHandler) {
    const button = document.createElement("button");
    button.innerHTML = `<i class="${iconClass}"></i>`; // Set the icon
    button.onclick = clickHandler; // Set the click handler
    return button;
}

// Search functions for Google, Google Maps, and Amazon
function searchGoogle(query) {
    const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    window.open(googleUrl, '_blank');
}

function searchGoogleMaps(location) {
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;
    window.open(mapsUrl, '_blank');
}

function searchAmazon(query) {
    const amazonUrl = `https://www.amazon.com/s?k=${encodeURIComponent(query)}`;
    window.open(amazonUrl, '_blank');
}