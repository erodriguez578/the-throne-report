const tips = [
    {
        title: "The Pre-Flight Inspection",
        advice: "Before you sit, check the toilet paper situation. Nothing humbles a person faster than discovering an empty roll after takeoff."
    },
    {
        title: "The Mystery Puddle",
        advice: "If the floor is wet and there's no mop in sight, treat it like a crime scene. You don't need to know what happened. You just need to avoid becoming evidence."
    },
    {
        title: "The Phone Drop",
        advice: "Keep your phone in a secure pocket before approaching the throne. Some things can be replaced. Your dignity and a $900 phone are harder to recover."
    },
    {
        title: "The Emergency Exit",
        advice: "Locate the door before committing to a stall. A broken lock is annoying. Discovering you're trapped inside is the beginning of a documentary."
    },
    {
        title: "The Backup Plan",
        advice: "Carry a small emergency kit with wipes, sanitizer, and toilet paper. It's not paranoia. It's being the most prepared person at the gas station."
    },
    {
        title: "The Flush Zone",
        advice: "Close the lid before flushing when one is available, then wash your hands. Nobody asked for the complimentary aerosol experience."
    },
    {
        title: "The Bag Situation",
        advice: "Never place your bag on a restroom floor. Use a sturdy hook or keep it on your shoulder. That floor has a history, and you don't want the sequel."
    },
    {
        title: "The Stall Audit",
        advice: "Check that the stall door actually locks before you settle in. Making eye contact with a stranger mid-business is a memory neither of you needs."
    },
    {
        title: "The Soap Test",
        advice: "Check for soap before using the restroom when possible. Water alone isn't the hygiene victory you think it is. Bring sanitizer as backup, not a replacement."
    },
    {
        title: "The Shoe Inspection",
        advice: "Before getting back into your car, check your soles. Whatever followed you out of that restroom does not deserve a ride home."
    },
    {
        title: "The Seat Cover Illusion",
        advice: "A paper seat cover isn't a force field. If the seat is visibly dirty, find another stall or clean it first. Hope is not a disinfectant."
    },
    {
        title: "The Door Handle Finale",
        advice: "You washed your hands. Congratulations. Now avoid undoing all that work on the exit handle. Use a paper towel when available, then throw it away properly."
    },
    {
        title: "The Two-Minute Warning",
        advice: "If the restroom smells like a chemical weapon from the parking lot, don't investigate. Sometimes the smartest move is driving to the next exit."
    },
    {
        title: "The Rest Stop Recon",
        advice: "Before a long stretch of highway, check where the next rest stops are. Your bladder should never be the one making navigation decisions."
    },
    {
        title: "The Hands-Free Rule",
        advice: "Don't put your phone on the sink or toilet-paper dispenser. Keep it tucked away until your hands are clean. Your screen doesn't need a souvenir."
    }
];

const tipButton = document.getElementById("tip-button");
const flushSound = new Audio("audio/toilet-flush.mp3");
flushSound.volume = 0.4;
const tipResult = document.getElementById("tip-result");

let previousTip = -1;

if (tipButton && tipResult) {
    tipButton.addEventListener("click", function() {

        // Play the toilet flushing sound
        flushSound.currentTime = 0;
        flushSound.play().catch(() => {});

        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * tips.length);
        } while (randomIndex === previousTip);

        previousTip = randomIndex;

        tipResult.innerHTML =
            "<strong>" + tips[randomIndex].title + "</strong><span>" +
            tips[randomIndex].advice + "</span>";
    });
}

const evidenceGallery = document.querySelector(".evidence-gallery");
const galleryPrevious = document.getElementById("gallery-prev");
const galleryNext = document.getElementById("gallery-next");

if (evidenceGallery && galleryPrevious && galleryNext) {
    galleryPrevious.addEventListener("click", function() {
        evidenceGallery.scrollBy({
            left: -310,
            behavior: "smooth"
        });
    });

    galleryNext.addEventListener("click", function() {
        evidenceGallery.scrollBy({
            left: 310,
            behavior: "smooth"
        });
    });
}

/* Evidence Gallery Lightbox */

const lightbox = document.getElementById("evidence-lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxTitle = document.getElementById("lightbox-title");
const lightboxDescription = document.getElementById("lightbox-description");
const lightboxClose = document.getElementById("lightbox-close");

if (lightbox) {
    const evidenceLinks = document.querySelectorAll(".evidence-card a");
    let previousFocus = null;

    evidenceLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            event.preventDefault();

            const card = link.closest(".evidence-card");
            const image = link.querySelector("img");

            previousFocus = document.activeElement;

            lightboxImage.src = link.href;
            lightboxImage.alt = image.alt;

            lightboxTitle.textContent =
                card.querySelector("figcaption strong").textContent;

            lightboxDescription.textContent =
                card.querySelector("figcaption small").textContent;

            lightbox.classList.add("open");
            lightbox.setAttribute("aria-hidden", "false");
            document.body.style.overflow = "hidden";
            lightboxClose.focus();
        });
    });

    function closeEvidenceLightbox() {
        lightbox.classList.remove("open");
        lightbox.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
        lightboxImage.removeAttribute("src");

        if (previousFocus) {
            previousFocus.focus();
        }
    }

    lightboxClose.addEventListener("click", closeEvidenceLightbox);

    lightbox.addEventListener("click", (event) => {
        if (event.target === lightbox) {
            closeEvidenceLightbox();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && lightbox.classList.contains("open")) {
            closeEvidenceLightbox();
        }

        if (event.key === "Tab" && lightbox.classList.contains("open")) {
            event.preventDefault();
            lightboxClose.focus();
        }
    });
}

/* Home Page Desk Bell Sound */

const exploreButton = document.querySelector(".restroom-sign");

if (exploreButton) {
    const deskBell = new Audio("audio/desk-bell.mp3");
    deskBell.volume = 0.4;

    exploreButton.addEventListener("click", function(event) {
        event.preventDefault();

        deskBell.currentTime = 0;

        // Navigate after the bell finishes ringing
        deskBell.onended = function() {
            window.location.href = exploreButton.href;
        };

        deskBell.play().catch(function() {
            window.location.href = exploreButton.href;
        });
    });
}
