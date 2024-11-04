// Function to add title and save it to localStorage
function addTitle() {
    const titleInput = document.getElementById("titleInput").value.trim();
    const titleDisplay = document.getElementById("titleDisplay");
    
    if (titleInput !== "") {
        titleDisplay.textContent = titleInput;
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

        // Create a container for the content and buttons
        const itemContainer = document.createElement("div");
        itemContainer.style.display = "flex";
        itemContainer.style.alignItems = "center";

        // Add item text to the container
        itemContainer.innerHTML = `<strong>${itemInput}</strong>: ${descInput}`;

        // Create buttons for various services
        const googleButton = createIconButton("fab fa-google", () => searchGoogle(itemInput));
        const mapsButton = createIconButton("fas fa-map-marker-alt", () => searchGoogleMaps(itemInput));
        const youtubeButton = createIconButton("fab fa-youtube", () => searchYouTube(itemInput));
        const amazonButton = createIconButton("fab fa-amazon", () => searchAmazon(itemInput));
        
        // Append search buttons to the item container
        itemContainer.appendChild(googleButton);
        itemContainer.appendChild(mapsButton);
        itemContainer.appendChild(youtubeButton);
        itemContainer.appendChild(amazonButton);

        // Link input and button
        const linkInput = document.createElement("input");
        linkInput.type = "text";
        linkInput.placeholder = "Enter link";

        const addLinkButton = document.createElement("button");
        addLinkButton.textContent = "Add Link";
        const linkDisplay = document.createElement("span");
        linkDisplay.style.marginLeft = "10px"; // Ensure there's space between the link and buttons

        // Initialize the item object with the basic information
        const itemObject = {
            id: itemId,
            item: itemInput,
            description: descInput,
            link: null // Initialize with no link
        };

        // Log item object
        console.log("Item object before saving:", itemObject);

        // Save the new item to localStorage
        const items = JSON.parse(localStorage.getItem("items")) || [];
        items.push(itemObject);
        localStorage.setItem("items", JSON.stringify(items));


        addLinkButton.onclick = () => {
            const linkValue = linkInput.value.trim();
            if (linkValue) {
                const link = document.createElement("a");
                link.href = linkValue;
                link.textContent = "Link";
                link.target = "_blank";
                linkDisplay.innerHTML = ""; // Clear previous link display
                linkDisplay.appendChild(link);

                const message = document.createElement("p");
                message.textContent = "Link added!";
                message.style.color = "green";
                document.body.appendChild(message);
                setTimeout(() => message.remove(), 2000);

                // Update the item object with the link value
                itemObject.link = linkValue;

                // Save the new item to localStorage with the link
                const items = JSON.parse(localStorage.getItem("items")) || [];
                items.push(itemObject);
                localStorage.setItem("items", JSON.stringify(items));

                linkInput.style.display = "none";
                addLinkButton.style.display = "none";
                linkInput.value = "";
            } else {
                console.warn("Link input is empty. Please enter a link.");
            }
        };

        // Append the link input, add link button, link display, and delete button to the container
        itemContainer.appendChild(linkInput);
        itemContainer.appendChild(addLinkButton);
        itemContainer.appendChild(linkDisplay);

        // Create delete button
        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>'; // Add Font Awesome trash icon
        deleteButton.style.marginLeft = "10px"; // Optional spacing
        deleteButton.onclick = () => deleteItem(itemId);
        
        // Append the delete button to the container
        itemContainer.appendChild(deleteButton);

        // Append the entire container to the list item
        listItem.appendChild(itemContainer);
        list.appendChild(listItem);

        if (!firstItemAdded) {
            const messageParagraph = document.createElement("p");
            messageParagraph.id = "linkMessage";
            messageParagraph.textContent = "Now add a handy link for each item. Use the buttons to search, or add your own!";
            messageParagraph.style.marginTop = "20px";
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

// Event listener for the reset button
document.getElementById("resetBtn").addEventListener("click", deleteList);

window.onload = loadFromLocalStorage;
