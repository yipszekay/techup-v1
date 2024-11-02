function displayList() {
    // Retrieve the title and items from localStorage
    const title = localStorage.getItem("title") || "No Title";
    const items = JSON.parse(localStorage.getItem("items")) || [];

    // Display the title
    document.getElementById("listTitle").textContent = title;

    // Display each item and description in the ordered list
    const list = document.getElementById("orderedList");
    items.forEach(({ item, description }) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `<strong>${item}</strong>: ${description}`;
        list.appendChild(listItem);
    });
}

window.onload = displayList;

function goBack() {
    localStorage.clear(); // Clear local storage
    window.location.href = 'pageTwo.html'; // Redirect to page two
}
