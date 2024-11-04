document.getElementById('shareListButton').onclick = function() {
    const title = localStorage.getItem("title") || "No Title";
    const items = JSON.parse(localStorage.getItem("items")) || [];
    const listContent = items.map(itemObj => `${itemObj.item}: ${itemObj.description}`).join('\n');

    // Format the message for sharing
    const message = `Check out my list: ${title}\n\n${listContent}`;
    
    // Encode the message for use in a URL
    const encodedMessage = encodeURIComponent(message);

    // Prompt user to select a platform
    const platform = prompt("Where would you like to share your list? Type 'WA' for WhatsApp or 'TELE' for Telegram.");

    if (platform) {
        const lowerCasePlatform = platform.toLowerCase();
        if (lowerCasePlatform === 'wa') {
            // WhatsApp sharing link
            const whatsappUrl = `https://api.whatsapp.com/send?text=${encodedMessage}`;
            window.open(whatsappUrl, '_blank');
        } else if (lowerCasePlatform === 'tele') {
            // Telegram sharing link
            const telegramUrl = `https://t.me/share/url?url=${encodedMessage}`;
            window.open(telegramUrl, '_blank');
        } else {
            alert("Invalid choice. Please type 'WA' or 'TELE'.");
        }
    }
};
