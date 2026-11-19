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
const tipResult = document.getElementById("tip-result");

if (tipButton && tipResult) {
    const flushSound = new Audio("audio/toilet-flush.mp3");
    flushSound.volume = 0.4;

    let previousTip = -1;

    tipButton.addEventListener("click", function() {
        flushSound.currentTime = 0;
        flushSound.play().catch(() => {});

        let randomIndex;

        do {
            randomIndex = Math.floor(Math.random() * tips.length);
        } while (randomIndex === previousTip);

        previousTip = randomIndex;

        tipResult.innerHTML =
            "<strong>" + tips[randomIndex].title + "</strong>" +
            "<span>" + tips[randomIndex].advice + "</span>";
    });
}


/* -----------------------------------------
   2. EVIDENCE GALLERY SCROLLING
   ----------------------------------------- */

const evidenceGallery = document.querySelector(".evidence-gallery");
const galleryPrevious = document.getElementById("gallery-prev");
const galleryNext = document.getElementById("gallery-next");

if (evidenceGallery && galleryPrevious && galleryNext) {

    function scrollGallery(direction) {
        const card = evidenceGallery.querySelector(".evidence-card");

        if (!card) return;

        const gap = parseFloat(
            window.getComputedStyle(evidenceGallery).columnGap
        ) || 0;

        const distance = card.getBoundingClientRect().width + gap;

        evidenceGallery.scrollBy({
            left: distance * direction,
            behavior: "smooth"
        });
    }

    galleryPrevious.addEventListener("click", function() {
        scrollGallery(-1);
    });

    galleryNext.addEventListener("click", function() {
        scrollGallery(1);
    });
}


/* -----------------------------------------
   3. EVIDENCE GALLERY LIGHTBOX
   ----------------------------------------- */

const lightbox = document.getElementById("evidence-lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxTitle = document.getElementById("lightbox-title");
const lightboxDescription = document.getElementById("lightbox-description");
const lightboxClose = document.getElementById("lightbox-close");

if (
    lightbox &&
    lightboxImage &&
    lightboxTitle &&
    lightboxDescription &&
    lightboxClose
) {
    const evidenceLinks = document.querySelectorAll(".evidence-card a");
    let previousFocus = null;

    function closeEvidenceLightbox() {
        lightbox.classList.remove("open");
        lightbox.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
        lightboxImage.removeAttribute("src");

        if (previousFocus) {
            previousFocus.focus();
        }
    }

    evidenceLinks.forEach(function(link) {
        link.addEventListener("click", function(event) {
            event.preventDefault();

            const card = link.closest(".evidence-card");
            const image = link.querySelector("img");
            const title = card.querySelector("figcaption strong");
            const description = card.querySelector("figcaption small");
            const rating = card.querySelector(".evidence-rating span");

            previousFocus = document.activeElement;

            lightboxImage.src = link.href;
            lightboxImage.alt = image.alt;
            lightboxTitle.textContent = title.textContent;

            lightboxDescription.textContent =
                description.textContent.trim() +
                (rating ? " | RATING: " + rating.textContent.trim() : "");

            lightbox.classList.add("open");
            lightbox.setAttribute("aria-hidden", "false");
            document.body.style.overflow = "hidden";

            lightboxClose.focus();
        });
    });

    lightboxClose.addEventListener("click", closeEvidenceLightbox);

    lightbox.addEventListener("click", function(event) {
        if (event.target === lightbox) {
            closeEvidenceLightbox();
        }
    });

    document.addEventListener("keydown", function(event) {
        if (!lightbox.classList.contains("open")) return;

        if (event.key === "Escape") {
            closeEvidenceLightbox();
        }

        if (event.key === "Tab") {
            event.preventDefault();
            lightboxClose.focus();
        }
    });
}


/* -----------------------------------------
   4. HOME PAGE DESK BELL
   ----------------------------------------- */

const exploreButton = document.querySelector(".restroom-sign");

if (exploreButton) {
    const deskBell = new Audio("audio/desk-bell.mp3");
    deskBell.volume = 0.4;

    exploreButton.addEventListener("click", function(event) {
        event.preventDefault();

        const destination = exploreButton.href;
        let navigated = false;

        function navigate() {
            if (navigated) return;

            navigated = true;
            window.location.href = destination;
        }

        deskBell.currentTime = 0;
        deskBell.onended = navigate;

        deskBell.play().catch(navigate);

        // Backup in case the audio does not finish.
        setTimeout(navigate, 1500);
    });
}
