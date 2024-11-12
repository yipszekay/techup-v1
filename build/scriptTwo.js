// Function to add title and save it to localStorage
function addTitle() {
    const titleInput = document.getElementById("titleInput").value.trim();
    const titleDisplay = document.getElementById("titleDisplay");
    
    if (titleInput !== "") {
        titleDisplay.textContent = titleInput; // Display the title on the right
        localStorage.setItem("title", titleInput);
        document.getElementById("titleInput").value = "";
    } else {
        console.warn("Title input is empty. Please enter a title.");
    }
}

let firstItemAdded = false;

function addItem() {
    const itemInput = document.getElementById("itemInput").value.trim();
    const descInput = document.getElementById("descInput").value.trim();
    const list = document.getElementById("orderedList");

    if (itemInput !== "" && descInput !== "") {
        const itemId = `item-${Date.now()}`;
        const listItem = document.createElement("li");
        listItem.id = itemId;

        // Create container for item rows
        const itemContainer = document.createElement("div");
        itemContainer.className = "item-container";

        // Row 1: Display item and description
        const itemRow = document.createElement("div");
        itemRow.className = "item-row";
        itemRow.innerHTML = `<strong>${itemInput}</strong>: ${descInput}`;

        // Link input and button
        const linkInput = document.createElement("input");
        linkInput.type = "text";
        linkInput.placeholder = "Enter link";

        const addLinkButton = document.createElement("button");
        addLinkButton.textContent = "Add Link";

        const linkDisplay = document.createElement("span");
        linkDisplay.style.marginLeft = "10px"; // Ensure there's space between the link and buttons

        // Create delete button
        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>'; // Add Font Awesome trash icon
        deleteButton.style.marginLeft = "10px"; // Optional spacing
        deleteButton.onclick = () => deleteItem(itemId);

         // Append all elements to itemRow
         itemRow.appendChild(linkInput);
         itemRow.appendChild(addLinkButton);
         itemRow.appendChild(linkDisplay);
         itemRow.appendChild(deleteButton);

        // Initialize the item object with the basic information
        const itemObject = {
            id: itemId,
            item: itemInput,
            description: descInput,
            link: null // Initialize with no link
        };

        // Log item object
        console.log("Item object before saving:", itemObject);

        // Add link button click handler
        addLinkButton.onclick = () => {
            const linkValue = linkInput.value.trim();
            if (linkValue) {
                const link = document.createElement("a");
                link.href = linkValue;
                link.textContent = "Link";
                link.target = "_blank";
                linkDisplay.innerHTML = ""; // Clear previous link display
                linkDisplay.appendChild(link);
                
                // Update the item object with the link value
                itemObject.link = linkValue;

                // Save the new item to localStorage with the link
                const items = JSON.parse(localStorage.getItem("items")) || [];
                items.push(itemObject);
                localStorage.setItem("items", JSON.stringify(items));

                // Hide the link input, add link button, and search buttons after successful link addition
                linkInput.style.display = "none";
                addLinkButton.style.display = "none";

                // Hide all search buttons
                const searchButtons = buttonRow.querySelectorAll("button");
                searchButtons.forEach(button => {
                    button.style.display = "none";
                });

                // Clear the input field for the next entry
                linkInput.value = "";
            } else {
                console.warn("Link input is empty. Please enter a link.");
            }
        };

        // Row 2: Display buttons and link elements
        const buttonRow = document.createElement("div");
        buttonRow.className = "button-row";

        // Create buttons for various services
        const googleButton = createIconButton("fab fa-google", () => searchGoogle(itemInput));
        const mapsButton = createIconButton("fas fa-map-marker-alt", () => searchGoogleMaps(itemInput));
        const youtubeButton = createIconButton("fab fa-youtube", () => searchYouTube(itemInput));
        const amazonButton = createIconButton("fab fa-amazon", () => searchAmazon(itemInput));
        
        // Append search buttons to buttonRow 
        buttonRow.appendChild(googleButton);
        buttonRow.appendChild(mapsButton);
        buttonRow.appendChild(youtubeButton);
        buttonRow.appendChild(amazonButton);

        // Append rows to item container and then to list item
        itemContainer.appendChild(itemRow);
        itemContainer.appendChild(buttonRow);
        listItem.appendChild(itemContainer);
        list.appendChild(listItem);

        // Display message if it's the first item added
        if (!firstItemAdded) {
            const messageParagraph = document.createElement("p");
            messageParagraph.id = "linkMessage";
            messageParagraph.textContent = "Now add a handy link for each item. Use the buttons to search, or add your own!";
            messageParagraph.style.marginTop = "10px";
            messageParagraph.style.fontStyle = "italic"; // Italicize the message
            messageParagraph.style.fontFamily = "Trebuchet MS";
            messageParagraph.style.color = "#191919"; // Change message color

            // Insert the message above the list
            list.parentNode.insertBefore(messageParagraph, list);
            firstItemAdded = true;
        }

        // Clear input fields
        document.getElementById("itemInput").value = "";
        document.getElementById("descInput").value = "";
    } else {
        console.warn("Item or description input is empty. Please enter both fields.");
    }
}

// Function to delete item from the DOM and update localStorage
function deleteItem(itemId) {
    // Remove item from the DOM
    const listItem = document.getElementById(itemId);
    if (listItem) {
        listItem.remove();
    }

    // Remove item from localStorage
    const items = JSON.parse(localStorage.getItem("items")) || [];
    const updatedItems = items.filter(item => item.id !== itemId); // Filter out the deleted item
    localStorage.setItem("items", JSON.stringify(updatedItems)); // Save the updated list back to localStorage
}

// Function to load saved title and items from localStorage
function loadFromLocalStorage() {
    const savedTitle = localStorage.getItem("title");
    if (savedTitle) {
        document.getElementById("titleDisplay").textContent = savedTitle;
    }

    const savedItems = JSON.parse(localStorage.getItem("items")) || [];
    const list = document.getElementById("orderedList");
    
    savedItems.forEach(itemObj => {
        const listItem = document.createElement("li");
        listItem.id = itemObj.id;

        // Create a container for the content and buttons
        const itemContainer = document.createElement("div");
        itemContainer.style.display = "flex";  // Ensure items are aligned in a row
        itemContainer.style.alignItems = "center";  // Center align the items vertically

        // Add item text to the container
        itemContainer.innerHTML = `<strong>${itemObj.item}</strong>: ${itemObj.description}`;

        const linkDisplay = document.createElement("span");
        linkDisplay.style.marginLeft = "10px"; // Ensure there's space between the description and the link
        
        if (itemObj.link) {
            const link = document.createElement("a");
            link.href = itemObj.link;
            link.textContent = "Link";
            link.target = "_blank";
            linkDisplay.appendChild(link);
        }

        // Append the link display to the container
        itemContainer.appendChild(linkDisplay);

        // Create and configure the delete button
        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>'; // Add Font Awesome trash icon
        deleteButton.style.marginLeft = "10px"; // Optional spacing
        deleteButton.onclick = () => deleteItem(itemObj.id);
        
        // Append the delete button to the container
        itemContainer.appendChild(deleteButton);

        // Append the entire item container to the list item
        listItem.appendChild(itemContainer);
        list.appendChild(listItem);
    });
}

// Function to create an icon button
function createIconButton(iconClass, clickHandler) {
    const button = document.createElement("button");
    button.innerHTML = `<i class="${iconClass}"></i>`;
    button.onclick = clickHandler;
    return button;
}

// Function to search Google
function searchGoogle(query) {
    window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
}
// Function to search Google Maps
function searchGoogleMaps(query) {
    window.open(`https://www.google.com/maps/search/${encodeURIComponent(query)}`, '_blank');
}
// Function to search YouTube
function searchYouTube(query) {
    window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`, '_blank');
}
// Function to search Amazon
function searchAmazon(query) {
    window.open(`https://www.amazon.com/s?k=${encodeURIComponent(query)}`, '_blank');
}

// Function to reset the entire list, clear inputs, and redirect
function deleteList() {
    // Clear localStorage for items
    localStorage.clear(); // Clear all localStorage items

    // Redirect to a clean version of pageTwo
    window.location.href = 'pageTwo.html'; // Change this to the correct URL for your clean pageTwo
}

// Event listener for the reset button
const resetBtn = document.getElementById("resetBtn");
if (resetBtn) {
    resetBtn.addEventListener("click", deleteList);
}

document.getElementById("resetBtn").addEventListener("click", deleteList);

function goBackToMain() {
    // Clear local storage
    localStorage.clear();
    
    // Redirect to index.html
    window.location.href = 'index.html';
}

window.onload = loadFromLocalStorage;
