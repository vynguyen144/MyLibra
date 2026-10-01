/* =========================================
   MYLIBRA
   Library System
========================================= */


/* =========================================
   BOOK DATA
========================================= */

const books = [

    {
        id: 1,

        title:
            "Cô Gái Đến Từ Thế Giới Khác",

        genre:
            "Fantasy",

        progress:
            67,

        icon:
            "📖"
    },


    {
        id: 2,

        title:
            "Truyện thứ hai",

        genre:
            "Romance",

        progress:
            32,

        icon:
            "📕"
    },


    {
        id: 3,

        title:
            "Truyện thứ ba",

        genre:
            "Adventure",

        progress:
            15,

        icon:
            "📘"
    }

];



/* =========================================
   GET ELEMENTS
========================================= */

const bookGrid =
    document.querySelector(
        "#bookGrid"
    );


const themeButton =
    document.querySelector(
        ".top-actions button"
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

    /*
        Xóa danh sách cũ
        trước khi tạo lại
    */

    bookGrid.innerHTML = "";


    /*
        Nếu không tìm thấy truyện
    */

    if (bookList.length === 0) {

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


    /*
        Tạo từng book card
    */

    bookList.forEach(book => {

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


        /*
            Khi click vào truyện
        */

        card.addEventListener(
            "click",
            () => {

                openBook(
                    book
                );

            }
        );


        bookGrid.appendChild(
            card
        );

    });

}



/* =========================================
   OPEN BOOK
========================================= */

function openBook(book) {

    alert(
        `Bạn đã chọn: ${book.title}`
    );

}



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


        /*
            Lọc theo:

            - Tên truyện
            - Thể loại
        */

        const filteredBooks =
            books.filter(
                book => {

                    const title =
                        book.title
                            .toLowerCase();


                    const genre =
                        book.genre
                            .toLowerCase();


                    return (

                        title.includes(
                            keyword
                        )

                        ||

                        genre.includes(
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


    /*
        Lưu theme vào trình duyệt
    */

    localStorage.setItem(
        "mylibra-theme",
        theme
    );

}



/* =========================================
   LOAD SAVED THEME
========================================= */

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


        if (isDark) {

            setTheme(
                "light"
            );

        }

        else {

            setTheme(
                "dark"
            );

        }

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
