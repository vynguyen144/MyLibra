/* =========================================
   MYLIBRA
   STEP 10 - READER
========================================= */


/* =========================================
   DEMO BOOKS
========================================= */

let books = [

    {
        id: 1,
        title: "Cô Gái Đến Từ Thế Giới Khác",
        author: "Chưa cập nhật",
        genre: "Fantasy",
        description:
            "Một câu chuyện giả tưởng về một cô gái bước vào một thế giới hoàn toàn xa lạ.",
        progress: 67,
        icon: "📖",
        fileName: null,
        fileType: null
    },

    {
        id: 2,
        title: "Truyện thứ hai",
        author: "Chưa cập nhật",
        genre: "Romance",
        description:
            "Mô tả truyện sẽ được cập nhật sau.",
        progress: 32,
        icon: "📕",
        fileName: null,
        fileType: null
    },

    {
        id: 3,
        title: "Truyện thứ ba",
        author: "Chưa cập nhật",
        genre: "Adventure",
        description:
            "Mô tả truyện sẽ được cập nhật sau.",
        progress: 15,
        icon: "📘",
        fileName: null,
        fileType: null
    }

];



/* =========================================
   ELEMENTS
========================================= */

const bookGrid =
    document.querySelector("#bookGrid");

const allBookGrid =
    document.querySelector("#allBookGrid");

const libraryPage =
    document.querySelector("#libraryPage");

const bookDetailPage =
    document.querySelector("#bookDetailPage");

const bookDetail =
    document.querySelector("#bookDetail");

const readerPage =
    document.querySelector("#readerPage");

const readerTitle =
    document.querySelector("#readerTitle");

const readerContent =
    document.querySelector("#readerContent");

const readerProgressBar =
    document.querySelector("#readerProgressBar");

const backToLibrary =
    document.querySelector("#backToLibrary");

const backFromReader =
    document.querySelector("#backFromReader");

const themeButton =
    document.querySelector("#themeButton");

const searchInput =
    document.querySelector(".search-box input");


/* ADD BOOK */

const addBookButton =
    document.querySelector("#addBookButton");

const emptyAddBookButton =
    document.querySelector("#emptyAddBookButton");

const addBookModal =
    document.querySelector("#addBookModal");

const closeAddBook =
    document.querySelector("#closeAddBook");

const cancelAddBook =
    document.querySelector("#cancelAddBook");

const bookFile =
    document.querySelector("#bookFile");

const selectedFile =
    document.querySelector("#selectedFile");

const confirmAddBook =
    document.querySelector("#confirmAddBook");


/* FONT */

const decreaseFont =
    document.querySelector("#decreaseFont");

const increaseFont =
    document.querySelector("#increaseFont");



/* =========================================
   INDEXEDDB
========================================= */

const DB_NAME =
    "MyLibraDB";

const DB_VERSION =
    1;

const STORE_NAME =
    "books";

let db = null;



/* =========================================
   READER STATE
========================================= */

let currentReaderBook =
    null;

let readerFontSize =
    Number(
        localStorage.getItem(
            "mylibra-font-size"
        )
    ) || 18;



/* =========================================
   OPEN DATABASE
========================================= */

function openDatabase() {

    return new Promise(
        (resolve, reject) => {

            const request =
                indexedDB.open(
                    DB_NAME,
                    DB_VERSION
                );


            request.onupgradeneeded =
                event => {

                    const database =
                        event.target.result;


                    if (
                        !database.objectStoreNames
                            .contains(STORE_NAME)
                    ) {

                        database.createObjectStore(
                            STORE_NAME,
                            {
                                keyPath: "id"
                            }
                        );

                    }

                };


            request.onsuccess =
                event => {

                    db =
                        event.target.result;

                    resolve(db);

                };


            request.onerror =
                () => {

                    reject(
                        request.error
                    );

                };

        }
    );

}



/* =========================================
   SAVE BOOK
========================================= */

function saveBookToDatabase(book) {

    return new Promise(
        (resolve, reject) => {

            const transaction =
                db.transaction(
                    STORE_NAME,
                    "readwrite"
                );


            transaction
                .objectStore(STORE_NAME)
                .put(book);


            transaction.oncomplete =
                resolve;


            transaction.onerror =
                () => {

                    reject(
                        transaction.error
                    );

                };

        }
    );

}



/* =========================================
   LOAD BOOKS
========================================= */

function loadBooksFromDatabase() {

    return new Promise(
        (resolve, reject) => {

            const request =
                db
                    .transaction(
                        STORE_NAME,
                        "readonly"
                    )
                    .objectStore(
                        STORE_NAME
                    )
                    .getAll();


            request.onsuccess =
                () => {

                    resolve(
                        request.result
                    );

                };


            request.onerror =
                () => {

                    reject(
                        request.error
                    );

                };

        }
    );

}



/* =========================================
   FILE TYPE
========================================= */

function getFileType(fileName) {

    const extension =
        fileName
            .split(".")
            .pop()
            .toLowerCase();


    if (extension === "epub")
        return "EPUB";


    if (extension === "pdf")
        return "PDF";


    if (extension === "txt")
        return "TXT";


    return null;

}



function getBookIcon(fileType) {

    if (fileType === "EPUB")
        return "📖";


    if (fileType === "PDF")
        return "📕";


    if (fileType === "TXT")
        return "📄";


    return "📚";

}



function removeExtension(fileName) {

    return fileName.replace(
        /\.[^/.]+$/,
        ""
    );

}



/* =========================================
   ESCAPE HTML
========================================= */

function escapeHTML(text) {

    const div =
        document.createElement("div");


    div.textContent =
        text || "";


    return div.innerHTML;

}



/* =========================================
   CREATE BOOK CARD
========================================= */

function createBookCard(book) {

    const card =
        document.createElement("article");


    card.className =
        "book-card";


    card.innerHTML = `

        <div class="book-cover">
            ${book.icon}
        </div>

        <div class="book-info">

            <h3>
                ${escapeHTML(book.title)}
            </h3>

            <p>
                ${escapeHTML(book.genre)}
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
        () => openBook(book.id)
    );


    return card;

}



/* =========================================
   RENDER BOOKS
========================================= */

function renderBooks(bookList) {

    bookGrid.innerHTML = "";
    allBookGrid.innerHTML = "";


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


    bookList.forEach(
        book => {

            const card =
                createBookCard(book);


            bookGrid.appendChild(
                card.cloneNode(true)
            );


            allBookGrid.appendChild(
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


    if (!book)
        return;


    bookDetail.innerHTML = `

        <div class="book-detail-cover">

            <div class="book-cover-large">
                ${book.icon}
            </div>

        </div>


        <div class="book-detail-info">

            <p class="book-detail-category">
                ${escapeHTML(book.genre)}
            </p>

            <h1>
                ${escapeHTML(book.title)}
            </h1>

            <p class="book-author">
                ${escapeHTML(book.author)}
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
                ${escapeHTML(book.description)}
            </p>

            ${
                book.fileName
                    ? `
                        <p class="book-author">
                            📁 ${escapeHTML(
                                book.fileName
                            )}
                        </p>
                    `
                    : ""
            }

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

    readerPage.hidden =
        true;

    bookDetailPage.hidden =
        false;


    window.scrollTo(0, 0);


    document
        .querySelector("#continueReading")
        .addEventListener(
            "click",
            () => openReader(book.id)
        );


    document
        .querySelector("#editBook")
        .addEventListener(
            "click",
            () => {

                alert(
                    "Chức năng chỉnh sửa sẽ được xây dựng sau."
                );

            }
        );

}



/* =========================================
   OPEN READER
========================================= */

async function openReader(bookId) {

    const book =
        books.find(
            item =>
                item.id === bookId
        );


    if (!book)
        return;


    currentReaderBook =
        book;


    if (!book.file) {

        alert(
            "Truyện mẫu chưa có file để đọc. Hãy thêm một file TXT để thử Reader."
        );

        return;

    }


    if (book.fileType !== "TXT") {

        alert(
            `${book.fileType} Reader sẽ được tích hợp ở bước tiếp theo.`
        );

        return;

    }


    try {

        const text =
            await book.file.text();


        readerTitle.textContent =
            book.title;


        readerContent.textContent =
            text;


        readerContent.style.fontSize =
            `${readerFontSize}px`;


        readerPage.hidden =
            false;


        libraryPage.hidden =
            true;


        bookDetailPage.hidden =
            true;


        window.scrollTo(0, 0);


        /*
            Khôi phục vị trí đọc
        */

        const savedPosition =
            Number(
                localStorage.getItem(
                    `mylibra-position-${book.id}`
                )
            );


        if (
            Number.isFinite(
                savedPosition
            )
            &&
            savedPosition > 0
        ) {

            requestAnimationFrame(
                () => {

                    window.scrollTo(
                        0,
                        savedPosition
                    );

                }
            );

        }


        updateReaderProgress();

    }

    catch (error) {

        console.error(
            error
        );


        alert(
            "Không thể mở file TXT."
        );

    }

}



/* =========================================
   SAVE READING POSITION
========================================= */

let savePositionTimer =
    null;


window.addEventListener(
    "scroll",
    () => {

        if (
            readerPage.hidden ||
            !currentReaderBook
        ) {

            return;

        }


        updateReaderProgress();


        clearTimeout(
            savePositionTimer
        );


        savePositionTimer =
            setTimeout(
                () => {

                    localStorage.setItem(
                        `mylibra-position-${currentReaderBook.id}`,
                        window.scrollY
                    );

                },
                150
            );

    }
);



/* =========================================
   READER PROGRESS
========================================= */

function updateReaderProgress() {

    if (
        readerPage.hidden
    ) {

        return;

    }


    const documentHeight =
        document.documentElement
            .scrollHeight
        -
        window.innerHeight;


    if (
        documentHeight <= 0
    ) {

        readerProgressBar.style.width =
            "0%";

        return;

    }


    const percentage =
        (
            window.scrollY /
            documentHeight
        ) * 100;


    readerProgressBar.style.width =
        `${Math.min(
            100,
            Math.max(
                0,
                percentage
            )
        )}%`;

}



/* =========================================
   BACK FROM READER
========================================= */

backFromReader.addEventListener(
    "click",
    () => {

        readerPage.hidden =
            true;


        libraryPage.hidden =
            false;


        currentReaderBook =
            null;


        window.scrollTo(
            0,
            0
        );

    }
);



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
   FONT SIZE
========================================= */

function setReaderFontSize(size) {

    readerFontSize =
        Math.min(
            32,
            Math.max(
                12,
                size
            )
        );


    readerContent.style.fontSize =
        `${readerFontSize}px`;


    localStorage.setItem(
        "mylibra-font-size",
        readerFontSize
    );

}


decreaseFont.addEventListener(
    "click",
    () => {

        setReaderFontSize(
            readerFontSize - 1
        );

    }
);


increaseFont.addEventListener(
    "click",
    () => {

        setReaderFontSize(
            readerFontSize + 1
        );

    }
);



/* =========================================
   ADD BOOK MODAL
========================================= */

function openAddBookModal() {

    addBookModal.hidden =
        false;


    bookFile.value =
        "";


    selectedFile.hidden =
        true;


    confirmAddBook.disabled =
        true;

}


function closeAddBookModal() {

    addBookModal.hidden =
        true;

}


addBookButton.addEventListener(
    "click",
    openAddBookModal
);


emptyAddBookButton.addEventListener(
    "click",
    openAddBookModal
);


closeAddBook.addEventListener(
    "click",
    closeAddBookModal
);


cancelAddBook.addEventListener(
    "click",
    closeAddBookModal
);



/* =========================================
   SELECT FILE
========================================= */

bookFile.addEventListener(
    "change",
    () => {

        const file =
            bookFile.files[0];


        if (!file) {

            confirmAddBook.disabled =
                true;

            selectedFile.hidden =
                true;

            return;

        }


        const fileType =
            getFileType(file.name);


        if (!fileType) {

            alert(
                "File không được hỗ trợ. Vui lòng chọn EPUB, PDF hoặc TXT."
            );


            bookFile.value =
                "";


            confirmAddBook.disabled =
                true;

            return;

        }


        selectedFile.textContent =
            `📄 ${file.name} — ${fileType}`;


        selectedFile.hidden =
            false;


        confirmAddBook.disabled =
            false;

    }
);



/* =========================================
   ADD BOOK
========================================= */

confirmAddBook.addEventListener(
    "click",
    async () => {

        const file =
            bookFile.files[0];


        if (!file)
            return;


        const fileType =
            getFileType(file.name);


        if (!fileType)
            return;


        confirmAddBook.disabled =
            true;


        confirmAddBook.textContent =
            "Đang lưu...";


        try {

            const newBook = {

                id:
                    Date.now(),

                title:
                    removeExtension(
                        file.name
                    ),

                author:
                    "Chưa cập nhật",

                genre:
                    fileType,

                description:
                    "Truyện được thêm vào MyLibra.",

                progress:
                    0,

                icon:
                    getBookIcon(fileType),

                fileName:
                    file.name,

                fileType:
                    fileType,

                file:
                    file

            };


            await saveBookToDatabase(
                newBook
            );


            books.push(
                newBook
            );


            renderBooks(
                books
            );


            closeAddBookModal();


            alert(
                `"${newBook.title}" đã được thêm vào thư viện.`
            );

        }

        catch (error) {

            console.error(error);


            alert(
                "Không thể lưu file. Vui lòng thử lại."
            );

        }


        confirmAddBook.disabled =
            false;


        confirmAddBook.textContent =
            "Thêm vào thư viện";

    }
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
                            .includes(keyword)

                        ||

                        book.genre
                            .toLowerCase()
                            .includes(keyword)

                        ||

                        book.author
                            .toLowerCase()
                            .includes(keyword)

                        ||

                        (
                            book.fileName &&
                            book.fileName
                                .toLowerCase()
                                .includes(keyword)
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

    if (theme === "dark") {

        document.body
            .classList
            .add("dark-mode");


        themeButton.textContent =
            "☀️";

    }

    else {

        document.body
            .classList
            .remove("dark-mode");


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


themeButton.addEventListener(
    "click",
    () => {

        const isDark =
            document.body
                .classList
                .contains("dark-mode");


        setTheme(
            isDark
                ? "light"
                : "dark"
        );

    }
);



/* =========================================
   INITIALIZE
========================================= */

async function initializeMyLibra() {

    try {

        await openDatabase();


        const storedBooks =
            await loadBooksFromDatabase();


        storedBooks.forEach(
            storedBook => {

                const existingIndex =
                    books.findIndex(
                        book =>
                            book.id ===
                            storedBook.id
                    );


                if (
                    existingIndex === -1
                ) {

                    books.push(
                        storedBook
                    );

                }

                else if (
                    storedBook.file
                ) {

                    books[
                        existingIndex
                    ] =
                        storedBook;

                }

            }
        );


        renderBooks(
            books
        );

    }

    catch (error) {

        console.error(
            error
        );


        renderBooks(
            books
        );

    }

}


initializeMyLibra();
