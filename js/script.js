
const tips = [
    "Always check for toilet paper before sitting down.",
    "Never trust a restroom with a mysterious puddle.",
    "Keep hand sanitizer within reach.",
    "If the smell hits you at the door, reconsider.",
    "When in doubt, find another pit stop."
];

const tipButton = document.getElementById("tip-button");
const tipResult = document.getElementById("tip-result");

if (tipButton && tipResult) {
    tipButton.addEventListener("click", function() {
        const randomIndex = Math.floor(Math.random() * tips.length);
        tipResult.textContent = tips[randomIndex];
    });
}
