
document.addEventListener("DOMContentLoaded", function () {
    const videoElement = document.getElementById("videoElement");
    const fallbackImage = document.getElementById("fallbackImage");

    // Check if video source is valid
    videoElement.onerror = function () {
        videoElement.classList.add("d-none"); // Hide video if not valid
        fallbackImage.classList.remove("d-none"); // Show fallback image
    };

    // If video element has no source
    if (!videoElement.querySelector("source").getAttribute("src")) {
        videoElement.classList.add("d-none"); // Hide video
        fallbackImage.classList.remove("d-none"); // Show fallback image
    }
});

// JavaScript to change button to Thank you message
document.getElementById('findOutMoreButton').addEventListener('click', function () {
    const emailInput = document.getElementById('emailInput');
    const thankYouMessage = document.getElementById('thankYouMessage');
    const findOutMoreButton = document.getElementById('findOutMoreButton');

    // If input is not empty, change button to "Thank you"
    if (emailInput.value) {
        // Hide button and input, show thank you message
        findOutMoreButton.style.display = 'none';
        emailInput.style.display = 'none';
        thankYouMessage.style.display = 'block';
    }
});

//Mail saving to database
document.addEventListener("DOMContentLoaded", function () {
    const button = document.getElementById("findOutMoreButton");
    const emailInput = document.getElementById("emailInput");
    const thankYouMessage = document.getElementById("thankYouMessage");

    if (button && emailInput) {
        button.addEventListener("click", function () {
            const email = emailInput.value;
            const styleName = document.title; // Get the page title dynamically
            const folderName = window.location.pathname.split('/')[1]; // Extract folder name

            // Determine API base URL dynamically
            const apiBaseUrl = window.location.hostname.includes("localhost")
                ? "https://localhost:7111"
                : "https://intseaissmdscdprd01.azurewebsites.net"; // Replace with your Azure Web App URL

            if (email) {
                fetch(`${apiBaseUrl}/api/viewerRequests`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, styleName, folder: folderName }) // Send folder name
                })
                    .then(response => {
                        if (response.ok) {
                            thankYouMessage.style.display = "block";
                        } else {
                            alert("Failed to submit data. Please try again.");
                        }
                    })
                    .catch(error => {
                        console.error("Error:", error);
                        alert("An error occurred. Please try again.");
                    });
            } else {
                alert("Please enter an email address.");
            }
        });
    }
});

