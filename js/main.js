/*============================================================================================
    # Wrapper Overlay
============================================================================================*/
// document.getElementById("toggle-content").addEventListener("click", function () {
//     // Hide the overlay
//     const overlay = document.getElementById("overlay");
//     overlay.style.display = "none";

    // Play the audio
//    const audioPlayer = document.getElementById("audio-player");
//    audioPlayer.play();  // Start playing the audio
// });

document.getElementById("toggle-content").addEventListener("click", function () {
    var wrapper = document.querySelector(".wrapper"); // Change to wrapper
    var card = document.querySelector(".card");

    // Add the 'hidden' class to start the fade out transition
    wrapper.classList.add("hidden");

    // Wait for the transition to complete
    wrapper.addEventListener("transitionend", function () {
        // After fade out is complete, hide the wrapper and show the card
        wrapper.style.display = "none"; // Hide the wrapper
        card.style.display = "block";   // Show the card
    }, { once: true });

    // Play the audio
    const audioPlayer = document.getElementById("audio-player");
    audioPlayer.play();  // Start playing the audio
});







/** =====================================================
 *  Timer Countdown
  ======================================================= */

function setupCountdown(campaignSelector, startTimeMillis, endTimeMillis) {
    var second = 1000;
    var minute = second * 60;
    var hour = minute * 60;
    var day = hour * 24;

    function calculateRemaining() {
        var now = new Date().getTime();
        return now >= startTimeMillis && now < endTimeMillis ? endTimeMillis - now : 0;
    }

    var didRefresh = false;
    var previousGap = calculateRemaining();

    function countdown() {
        var gap = calculateRemaining();
        var shouldRefresh = previousGap > day && gap <= day || previousGap > 0 && gap === 0;

        previousGap = gap;

        var textDay = Math.floor(gap / day);
        var textHour = Math.floor((gap % day) / hour);
        var textMinute = Math.floor((gap % hour) / minute);
        var textSecond = Math.floor((gap % minute) / second);

        if (document.querySelector(campaignSelector + ' .timer')) {
            document.querySelector(campaignSelector + ' .day').innerText = textDay;
            document.querySelector(campaignSelector + ' .hour').innerText = textHour;
            document.querySelector(campaignSelector + ' .minute').innerText = textMinute;
            document.querySelector(campaignSelector + ' .second').innerText = textSecond;
        }

        if (shouldRefresh && !didRefresh) {
            didRefresh = true;
            setTimeout(function () {
                window.location.reload();
            }, 30000 + Math.random() * 90000);
        }
    }

    countdown();
    setInterval(countdown, 1000);
}

document.addEventListener("DOMContentLoaded", function (event) {
    if (!document.querySelectorAll || !document.body.classList) {
        return;
    }

});

setupCountdown(".campaign-0", new Date().getMilliseconds(), 1924920000000);





/** =====================================================
 *  Add to Calendar
  ======================================================= */
const event = {
    title: "Jemputan Kenduri Kahwin John & Sarah",
    startDate: "99991231T033000Z", // YYYYMMDDTHHmmssZ (UTC)
    endDate: "99991231T090000Z",
    location: "10A Jalan Seri Ampang 2, Kampung Pisang, 47300 Subang, Selangor, Malaysia",
    description: "Kami menjemput tuan/puan hadir ke majlis perkahwinan anakanda kami.",
};

// Function to generate Google Calendar URL
function generateGoogleCalendarLink(event) {
    const { title, startDate, endDate, location, description } = event;

    const baseUrl = "https://calendar.google.com/calendar/render?action=TEMPLATE";
    const params = new URLSearchParams({
        text: title,
        dates: `${startDate}/${endDate}`,
        details: description,
        location: location,
    });

    return `${baseUrl}&${params.toString()}`;
}

// Function to generate ICS file content
function generateICS(event) {
    const { title, startDate, endDate, location, description } = event;

    return `
        BEGIN:VCALENDAR
        VERSION:2.0
        BEGIN:VEVENT
        SUMMARY:${title}
        DTSTART:${startDate}
        DTEND:${endDate}
        LOCATION:${location}
        DESCRIPTION:${description}
        END:VEVENT
        END:VCALENDAR
    `.trim();
}

// Function to download an ICS file
function downloadICS(filename, content) {
    const blob = new Blob([content], { type: "text/calendar" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Handler for Google Calendar button
function addGoogleCalendar() {
    const googleLink = generateGoogleCalendarLink(event);
    window.open(googleLink, "_blank");
}

// Handler for Apple Calendar button
function addAppleCalendar() {
    const icsContent = generateICS(event);
    downloadICS("event.ics", icsContent);
}





/** =====================================================
 *  Location for Google and Waze
  ======================================================= */
function openGoogleMaps() {
    const latitude = 3.1575;  // Example latitude
    const longitude = 101.7116;  // Example longitude
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}&travelmode=driving`;

    window.open(googleMapsUrl, "_blank");  // Open in a new tab
}

function openWaze() {
    const latitude = 3.1575;  // Example latitude
    const longitude = 101.7116;  // Example longitude
    //const wazeUrl = `https://waze.com/ul?ll=${latitude},${longitude}&navigate=yes`;
    const wazeUrl = `waze://?ll=${latitude},${longitude}&navigate=yes`

    window.open(wazeUrl, "_blank");  // Open in a new tab
}





/** =====================================================
    Contact
  ======================================================= */
function openWhatsApp(phoneNumber) {
    const message = "https://kad-jemputan-kahwin.vercel.app/\n\nHello, maaf menggangu. Saya ingin bertanyakan sesuatu berkenaan majlis perkahwinan ini.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");  // Opens WhatsApp in a new tab
}

function makePhoneCall(phoneNumber) {
    const callUrl = `tel:${phoneNumber}`;
    window.location.href = callUrl;  // Opens the phone dialer
}







/** =====================================================
 *  Animation
  ======================================================= */
function reveal() {
    var reveals = document.querySelectorAll(".reveal");

    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 10;

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        } else {
            reveals[i].classList.remove("active");
        }
    }
}

window.addEventListener("scroll", reveal);





/** =====================================================
 *  Background Animation
  ======================================================= */
const petalContainer = document.querySelector('.petal-container');

const maxPetals = 70; // Maximum number of petals allowed at once
const petalInterval = 100; // Interval for creating petals (100 milliseconds)

function createPetal() {
    if (petalContainer.childElementCount < maxPetals) {
        const petal = document.createElement('div');
        petal.className = 'petal';

        const startY = Math.random() * 100; // Randomized vertical start position
        const duration = 4 + Math.random() * 2; // Randomized animation duration (4 to 6 seconds)

        const petalSize = 5 + Math.random() * 10; // Random size between 5px and 20px

        // Randomize the opacity between 0.3 and 0.8 for varied transparency
        const petalOpacity = 0.3 + Math.random() * 0.5; // Randomized opacity

        petal.style.top = `${startY}%`; // Randomized starting vertical position
        petal.style.width = `${petalSize}px`;
        petal.style.height = `${petalSize}px`;
        petal.style.opacity = petalOpacity; // Set the random opacity
        petal.style.animationDuration = `${duration}s`; // Randomized animation duration

        // Randomize the final translation for X and Y for varied movement
        const translateX = 300 + Math.random() * 120; // TranslateX with some randomness
        const translateY = 300 + Math.random() * 120; // TranslateY with some randomness

        petal.style.setProperty('--translate-x', `${translateX}px`); // Set variable for translation X
        petal.style.setProperty('--translate-y', `${translateY}px`); // Set variable for translation Y

        petalContainer.appendChild(petal);

        // Ensure the petal is removed only after the animation completes
        setTimeout(() => {
            petalContainer.removeChild(petal);
        }, duration * 1000); // Convert duration to milliseconds
    }
}

// Create petals at a shorter interval with the defined interval time
setInterval(createPetal, petalInterval); // Create petals every 100 milliseconds




/** =====================================================
 *  Toggle Menu
  ======================================================= */
// ================================== Calendar ==================================
// Get all buttons and their corresponding menus
const toggleButtons = {
    'calendar-btn': 'calendar-menu',
    'location-btn': 'location-menu',
    'music-btn': 'music-menu',
    'rsvp-btn': 'rsvp-menu',
    'ucapan-btn': 'ucapan-menu',
    'contact-btn': 'contact-menu',
    'kehadiran-btn': 'rsvp-menu',
    'btn-hadir': 'success-menu'
    // Add other button-to-menu mappings here
};

// Function to toggle a menu open/close
function toggleMenu(menuId, event) {
    event.stopPropagation(); // Prevent click from propagating
    const menu = document.getElementById(menuId);

    if (menu.classList.contains('open')) {
        menu.classList.remove('open'); // Close the menu
    } else {
        // Close all other menus first
        closeAllMenus();
        menu.classList.add('open'); // Open the menu
    }
}

// Function to close all menus
function closeAllMenus() {
    for (const menuId of Object.values(toggleButtons)) {
        const menu = document.getElementById(menuId);
        if (menu.classList.contains('open')) {
            menu.classList.remove('open'); // Close the menu
        }
    }
}

// Add click event listeners to all toggle buttons
for (const [buttonId, menuId] of Object.entries(toggleButtons)) {
    const button = document.getElementById(buttonId);
    button.addEventListener('click', (event) => toggleMenu(menuId, event));
}

// Add a global click handler to close all menus when clicking outside
document.addEventListener('click', () => closeAllMenus());

// Prevent clicks within menus from closing them
for (const menuId of Object.values(toggleButtons)) {
    const menu = document.getElementById(menuId);
    menu.addEventListener('click', (event) => event.stopPropagation());
}

// Function to close a specific menu
function closeMenu(menuId) {
    const menu = document.getElementById(menuId);
    if (menu.classList.contains('open')) {
        menu.classList.remove('open'); // Close the menu
    }
}

// Add event listener for the close button inside the ucapan menu
const closeButton = document.querySelector('#ucapan-menu .tutup');
if (closeButton) {
    closeButton.addEventListener('click', (event) => {
        event.stopPropagation(); // Prevent this from propagating and triggering other closures
        closeMenu('ucapan-menu'); // Close the specific menu
    });
}

// Function to open RSVP
const kehadiranBtn = document.getElementById("kehadiran-btn");





/** =====================================================
 *  Handle Form
  ======================================================= */
// function submitUcapan() {
//     document.getElementById("form-ucapan").submit();
// }
document.getElementById("form-ucapan").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    const form = document.getElementById("form-ucapan");
    const formData = new FormData(form); // Collect the form data
    const actionUrl = form.action; // Get the form's target URL

    fetch(actionUrl, {
        method: "POST", // Use the POST method to submit data
        body: formData, // Attach the FormData object
    })
    .then(response => {
        if (response.ok) {
            return response.text(); // Process the response as text
        } else {
            throw new Error("Form submission failed"); // Handle errors
        }
    })
    .then(result => {
        // Display the success message in the success-menu
        const successMenu = document.getElementById("success-menu");
        successMenu.innerHTML = "<div class='success-message'><i class='bx bx-check'></i><p>Mesej anda berjaya dihantar!</p></div>";
        successMenu.classList.add("open"); // Open the success menu

        // Close the ucapan menu after successful submission
        closeMenu('ucapan-menu');

        // Optionally reset the form
        form.reset();
    })
    .catch(error => {
        console.error("Error:", error); // Log any errors
    });
});




/** =====================================================
 *  Handle Kehadiran Count
  ======================================================= */
function incrementCount(endpoint, successMessage, iconClass, closeMenuId) {
    fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'action=increment',
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Request failed");
        }
    })
    .then(data => {
        if (data.attend) {
            // Display the success message
            const successMenu = document.getElementById("success-menu");
            successMenu.innerHTML = `<div class='success-message'><i class='${iconClass}'></i><p>${successMessage}</p></div>`;
            successMenu.classList.add("open"); // Open the success menu

            // Optionally close other menu
            if (closeMenuId) {
                closeMenu(closeMenuId); // Close the specified menu
            }
        } else {
            console.error("Increment count error:", data.error);
            alert("Terjadi kesilapan: " + data.error);
        }
    })
    .catch(error => {
        console.error("AJAX error:", error);
        alert("Error processing the request.");
    });
}

// Attach the click event to the "Hadir" and "Tidak Hadir" buttons
document.getElementById("btn-hadir").onclick = function() {
    incrementCount('count_hadir.php', "Kami menantikan kedatangan anda!", 'bx bxs-wink-smile', 'rsvp-menu'); // Success message and optionally close RSVP menu
};

document.getElementById("btn-tidak-hadir").onclick = function() {
    incrementCount('count_tidak_hadir.php', "Maaf, mungkin lain kali.", 'bx bxs-sad', 'rsvp-menu'); // Success message and optionally close RSVP menu
};





/** =====================================================
 *  Image Carousel
  ======================================================= */
