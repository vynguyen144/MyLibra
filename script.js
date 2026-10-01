/* =========================================
   MYLIBRA
========================================= */


/* =========================================
   BOOK DATA
========================================= */

const books = [

    {
        id: 1,

        title:
            "Cô Gái Đến Từ Thế Giới Khác",

        author:
            "Chưa cập nhật",

        genre:
            "Fantasy",

        description:
            "Một câu chuyện giả tưởng về một cô gái bước vào một thế giới hoàn toàn xa lạ.",

        progress:
            67,

        icon:
            "📖"
    },


    {
        id: 2,

        title:
            "Truyện thứ hai",

        author:
            "Chưa cập nhật",

        genre:
            "Romance",

        description:
            "Mô tả truyện sẽ được cập nhật sau.",

        progress:
            32,

        icon:
            "📕"
    },


    {
        id: 3,

        title:
            "Truyện thứ ba",

        author:
            "Chưa cập nhật",

        genre:
            "Adventure",

        description:
            "Mô tả truyện sẽ được cập nhật sau.",

        progress:
            15,

        icon:
            "📘"
    }

];



/* =========================================
   ELEMENTS
========================================= */

const bookGrid =
    document.querySelector(
        "#bookGrid"
    );


const libraryPage =
    document.querySelector(
        "#libraryPage"
    );


const bookDetailPage =
    document.querySelector(
        "#bookDetailPage"
    );


const bookDetail =
    document.querySelector(
        "#bookDetail"
    );


const backToLibrary =
    document.querySelector(
        "#backToLibrary"
    );


const themeButton =
    document.querySelector(
        "#themeButton"
    );


const searchInput =
    document.querySelector(
        ".search-box input"
    );


const addButtons =
    document.querySelectorAll(
        ".add-button, .primary-button"
    );



/* =========================================
   RENDER BOOKS
========================================= */

function renderBooks(bookList) {

    bookGrid.innerHTML = "";


    if (
        bookList.length === 0
    ) {

        bookGrid.innerHTML = `

            <div class="empty-library">

                <div class="empty-icon">
                    🔍
                </div>

                <h3>
                    Không tìm thấy truyện
                </h3>

                <p>
                    Thử tìm bằng tên truyện
                    hoặc thể loại khác.
                </p>

            </div>

        `;

        return;
    }


    bookList.forEach(
        book => {

            const card =
                document.createElement(
                    "article"
                );


            card.className =
                "book-card";


            card.innerHTML = `

                <div class="book-cover">
                    ${book.icon}
                </div>


                <div class="book-info">

                    <h3>
                        ${book.title}
                    </h3>


                    <p>
                        ${book.genre}
                    </p>


                    <div class="progress">

                        <div
                            class="progress-bar"
                            style="
                                width:
                                ${book.progress}%;
                            "
                        ></div>

                    </div>


                    <span>
                        ${book.progress}% đã đọc
                    </span>

                </div>

            `;


            card.addEventListener(
                "click",
                () => {

                    openBook(
                        book.id
                    );

                }
            );


            bookGrid.appendChild(
                card
            );

        }
    );
}



/* =========================================
   OPEN BOOK DETAIL
========================================= */

function openBook(bookId) {

    const book =
        books.find(
            item =>
                item.id === bookId
        );


    if (!book) {
        return;
    }


    bookDetail.innerHTML = `

        <div class="book-detail-cover">

            <div class="book-cover-large">
                ${book.icon}
            </div>

        </div>


        <div class="book-detail-info">

            <p class="book-detail-category">
                ${book.genre}
            </p>


            <h1>
                ${book.title}
            </h1>


            <p class="book-author">
                ${book.author}
            </p>


            <div class="book-detail-progress">

                <div class="progress">

                    <div
                        class="progress-bar"
                        style="
                            width:
                            ${book.progress}%;
                        "
                    ></div>

                </div>


                <span>
                    ${book.progress}% đã đọc
                </span>

            </div>


            <p class="book-description">
                ${book.description}
            </p>


            <div class="book-actions">

                <button
                    class="primary-button"
                    id="continueReading"
                >
                    📖 Tiếp tục đọc
                </button>


                <button
                    class="add-button"
                    id="editBook"
                >
                    ✏️ Chỉnh sửa
                </button>

            </div>

        </div>

    `;


    libraryPage.hidden =
        true;


    bookDetailPage.hidden =
        false;


    window.scrollTo(
        0,
        0
    );


    const continueButton =
        document.querySelector(
            "#continueReading"
        );


    continueButton.addEventListener(
        "click",
        () => {

            alert(
                `Reader sẽ được xây dựng cho "${book.title}" ở bước tiếp theo.`
            );

        }
    );


    const editButton =
        document.querySelector(
            "#editBook"
        );


    editButton.addEventListener(
        "click",
        () => {

            alert(
                "Chức năng chỉnh sửa truyện sẽ được xây dựng sau."
            );

        }
    );

}



/* =========================================
   BACK TO LIBRARY
========================================= */

backToLibrary.addEventListener(
    "click",
    () => {

        bookDetailPage.hidden =
            true;


        libraryPage.hidden =
            false;


        window.scrollTo(
            0,
            0
        );

    }
);



/* =========================================
   INITIAL RENDER
========================================= */

renderBooks(
    books
);



/* =========================================
   SEARCH
========================================= */

searchInput.addEventListener(
    "input",
    () => {

        const keyword =
            searchInput.value
                .toLowerCase()
                .trim();


        const filteredBooks =
            books.filter(
                book => {

                    return (

                        book.title
                            .toLowerCase()
                            .includes(
                                keyword
                            )

                        ||

                        book.genre
                            .toLowerCase()
                            .includes(
                                keyword
                            )

                        ||

                        book.author
                            .toLowerCase()
                            .includes(
                                keyword
                            )

                    );

                }
            );


        renderBooks(
            filteredBooks
        );

    }
);



/* =========================================
   THEME
========================================= */

function setTheme(theme) {

    if (
        theme === "dark"
    ) {

        document.body
            .classList
            .add(
                "dark-mode"
            );


        themeButton.textContent =
            "☀️";

    }

    else {

        document.body
            .classList
            .remove(
                "dark-mode"
            );


        themeButton.textContent =
            "🌙";

    }


    localStorage.setItem(
        "mylibra-theme",
        theme
    );

}


const savedTheme =
    localStorage.getItem(
        "mylibra-theme"
    )
    ||
    "light";


setTheme(
    savedTheme
);



/* =========================================
   THEME BUTTON
========================================= */

themeButton.addEventListener(
    "click",
    () => {

        const isDark =
            document.body
                .classList
                .contains(
                    "dark-mode"
                );


        setTheme(
            isDark
                ? "light"
                : "dark"
        );

    }
);



/* =========================================
   ADD BOOK
========================================= */

addButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                alert(
                    "Chức năng thêm truyện sẽ được xây dựng ở bước tiếp theo."
                );

            }
        );

    }
);
