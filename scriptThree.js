// Function to display the list
function displayList() {
    // Retrieve the title and items from localStorage
    const title = localStorage.getItem("title") || "No Title";
    const items = JSON.parse(localStorage.getItem("items")) || []; // Retrieve and parse the list of items

    // Display the title
    document.getElementById("listTitle").textContent = title;

   // Display each item, description, and link in the ordered list
    const list = document.getElementById("orderedList");
    list.innerHTML = ""; // Clear the list before adding items to avoid duplication

    items.forEach(({ item, description, link }) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `<strong>${item}</strong>: ${description}`;

    // If there's a link, add it as a hyperlink
    if (link) {
        const linkElement = document.createElement("a");
        linkElement.href = link;
        linkElement.textContent = "Link";
        linkElement.target = "_blank"; // Open link in a new tab
        listItem.appendChild(linkElement);
    }

    list.appendChild(listItem);
});
}

// Load data when the page is loaded
window.onload = displayList;

function goBack() {
    localStorage.clear(); // Clears all keys from localStorage

    // Redirect back to page two
    window.location.href = 'pageTwo.html';
}

// Event listener for the download button
document.getElementById("downloadBtn").addEventListener("click", () => {
    const downloadOption = prompt("Choose format: PDF or PNG");
    switch (downloadOption.toLowerCase()) {
        case "pdf":
            downloadAsPDF();
            break;
        case "png":
            downloadAsPNG();
            break;
        default:
            alert("Invalid option. Please choose PDF or PNG.");
    }
});

// Function to download the list as a PDF
function downloadAsPDF() {
    const element = document.getElementById("contentToDownload");
    html2pdf().from(element).save("list.pdf");
}

// Function to download the list as a PNG
function downloadAsPNG() {
    const element = document.getElementById("contentToDownload");
    html2canvas(element).then(canvas => {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "list.png";
        link.click();
    });
}