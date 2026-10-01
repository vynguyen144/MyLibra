/* =========================
   MYLIBRA - BASIC INTERACTIONS
========================= */

const themeButton = document.querySelector(".top-actions button");
const searchInput = document.querySelector(".search-box input");
const bookCards = document.querySelectorAll(".book-card");
const addButtons = document.querySelectorAll(
    ".add-button, .primary-button"
);


/* =========================
   THEME
========================= */

function setTheme(theme) {
    if (theme === "dark") {
        document.body.classList.add("dark-mode");
        themeButton.textContent = "☀️";
    } else {
        document.body.classList.remove("dark-mode");
        themeButton.textContent = "🌙";
    }

    localStorage.setItem("mylibra-theme", theme);
}


const savedTheme =
    localStorage.getItem("mylibra-theme") || "light";

setTheme(savedTheme);


themeButton.addEventListener("click", () => {

    const isDark =
        document.body.classList.contains("dark-mode");

    setTheme(isDark ? "light" : "dark");

});


/* =========================
   SEARCH
========================= */

searchInput.addEventListener("input", () => {

    const keyword =
        searchInput.value.toLowerCase().trim();

    bookCards.forEach(card => {

        const title =
            card
                .querySelector("h3")
                .textContent
                .toLowerCase();

        const genre =
            card
                .querySelector("p")
                .textContent
                .toLowerCase();

        const match =
            title.includes(keyword) ||
            genre.includes(keyword);

        card.style.display =
            match ? "" : "none";

    });

});


/* =========================
   ADD BOOK
========================= */

addButtons.forEach(button => {

    button.addEventListener("click", () => {

        alert(
            "Chức năng thêm truyện sẽ được xây dựng ở bước tiếp theo."
        );

    });

});


/* =========================
   BOOK CARD
========================= */

bookCards.forEach(card => {

    card.addEventListener("click", () => {

        const title =
            card.querySelector("h3").textContent;

        alert(
            `Bạn đã chọn: ${title}`
        );

    });

});
