// ========================================
// MyLibra
// Main Script
// ========================================


// ========================================
// DEMO BOOKS
// ========================================

let books = [
    {
        id: "demo-1",
        title: "The Beginning After the End",
        author: "TurtleMe",
        genre: "Fantasy",
        description:
            "Một câu chuyện fantasy về cuộc đời mới của một vị vua sau khi tái sinh.",
        progress: 35,
        icon: "📖",
        fileName: "",
        fileType: "",
        file: null
    },

    {
        id: "demo-2",
        title: "Omniscient Reader",
        author: "Sing Shong",
        genre: "Action",
        description:
            "Một độc giả duy nhất biết trước toàn bộ diễn biến của thế giới.",
        progress: 62,
        icon: "👁️",
        fileName: "",
        fileType: "",
        file: null
    },

    {
        id: "demo-3",
        title: "Solo Leveling",
        author: "Chu-Gong",
        genre: "Action",
        description:
            "Một thợ săn yếu nhất thế giới bắt đầu hành trình trở thành người mạnh nhất.",
        progress: 18,
        icon: "⚔️",
        fileName: "",
        fileType: "",
        file: null
    }
];


// ========================================
// DOM
// ========================================

const libraryPage =
    document.getElementById("libraryPage");

const bookDetailPage =
    document.getElementById("bookDetailPage");

const bookDetail =
    document.getElementById("bookDetail");

const readerPage =
    document.getElementById("readerPage");

const bookGrid =
    document.getElementById("bookGrid");

const allBookGrid =
    document.getElementById("allBookGrid");

const emptyLibrary =
    document.getElementById("emptyLibrary");

const searchInput =
    document.querySelector(".search-box input");

const themeButton =
    document.getElementById("themeButton");

const addBookButton =
    document.getElementById("addBookButton");

const emptyAddBookButton =
    document.getElementById("emptyAddBookButton");

const addBookModal =
    document.getElementById("addBookModal");

const closeAddBook =
    document.getElementById("closeAddBook");

const cancelAddBook =
    document.getElementById("cancelAddBook");

const confirmAddBook =
    document.getElementById("confirmAddBook");

const bookFileInput =
    document.getElementById("bookFile");

const selectedFile =
    document.getElementById("selectedFile");

const backToLibrary =
    document.getElementById("backToLibrary");

const backFromReader =
    document.getElementById("backFromReader");

const readerTitle =
    document.getElementById("readerTitle");

const readerContent =
    document.getElementById("readerContent");

const readerProgressBar =
    document.getElementById("readerProgressBar");

const decreaseFont =
    document.getElementById("decreaseFont");

const increaseFont =
    document.getElementById("increaseFont");


// ========================================
// CURRENT BOOK
// ========================================

let currentBookId = null;


// ========================================
// INDEXEDDB
// ========================================

const DB_NAME = "MyLibraDB";
const DB_VERSION = 1;
const STORE_NAME = "books";


function openDatabase() {

    return new Promise((resolve, reject) => {

        const request =
            indexedDB.open(
                DB_NAME,
                DB_VERSION
            );

        request.onupgradeneeded = function (event) {

            const db =
                event.target.result;

            if (
                !db.objectStoreNames.contains(
                    STORE_NAME
                )
            ) {

                db.createObjectStore(
                    STORE_NAME,
                    {
                        keyPath: "id"
                    }
                );
            }
        };


        request.onsuccess = function () {

            resolve(request.result);
        };


        request.onerror = function () {

            reject(request.error);
        };

    });
}


async function saveBookToDatabase(book) {

    try {

        const db =
            await openDatabase();

        return new Promise(
            (resolve, reject) => {

                const transaction =
                    db.transaction(
                        STORE_NAME,
                        "readwrite"
                    );

                const store =
                    transaction.objectStore(
                        STORE_NAME
                    );

                store.put(book);


                transaction.oncomplete =
                    function () {

                        resolve();
                    };


                transaction.onerror =
                    function () {

                        reject(
                            transaction.error
                        );
                    };

            }
        );

    } catch (error) {

        console.error(
            "Không thể lưu sách:",
            error
        );
    }
}


async function loadBooksFromDatabase() {

    try {

        const db =
            await openDatabase();

        return new Promise(
            (resolve, reject) => {

                const transaction =
                    db.transaction(
                        STORE_NAME,
                        "readonly"
                    );

                const store =
                    transaction.objectStore(
                        STORE_NAME
                    );

                const request =
                    store.getAll();


                request.onsuccess =
                    function () {

                        resolve(
                            request.result || []
                        );
                    };


                request.onerror =
                    function () {

                        reject(
                            request.error
                        );
                    };

            }
        );

    } catch (error) {

        console.error(
            "Không thể tải sách:",
            error
        );

        return [];
    }
}


// ========================================
// HELPERS
// ========================================

function escapeHTML(value) {

    if (
        value === null ||
        value === undefined
    ) {

        return "";
    }

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


function removeExtension(fileName) {

    return fileName.replace(
        /\.[^/.]+$/,
        ""
    );
}


function getFileType(fileName) {

    const extension =
        fileName
            .split(".")
            .pop()
            .toLowerCase();


    if (extension === "epub") {
        return "EPUB";
    }

    if (extension === "pdf") {
        return "PDF";
    }

    if (extension === "txt") {
        return "TXT";
    }

    return "UNKNOWN";
}


function getBookIcon(fileType) {

    if (fileType === "EPUB") {
        return "📚";
    }

    if (fileType === "PDF") {
        return "📕";
    }

    if (fileType === "TXT") {
        return "📄";
    }

    return "📖";
}


// ========================================
// PAGE SWITCHING
// ========================================

function showLibrary() {

    if (libraryPage) {
        libraryPage.hidden = false;
    }

    if (bookDetailPage) {
        bookDetailPage.hidden = true;
    }

    if (readerPage) {
        readerPage.hidden = true;
    }
}


function showBookDetail() {

    if (libraryPage) {
        libraryPage.hidden = true;
    }

    if (bookDetailPage) {
        bookDetailPage.hidden = false;
    }

    if (readerPage) {
        readerPage.hidden = true;
    }
}


function showReader() {

    if (libraryPage) {
        libraryPage.hidden = true;
    }

    if (bookDetailPage) {
        bookDetailPage.hidden = true;
    }

    if (readerPage) {
        readerPage.hidden = false;
    }
}


// ========================================
// BOOK CARD
// ========================================

function createBookCard(book) {

    const card =
        document.createElement("div");

    card.className =
        "book-card";


    card.innerHTML = `

        <div class="book-cover">
            ${book.icon || "📖"}
        </div>

        <div class="book-info">

            <h3>
                ${escapeHTML(book.title)}
            </h3>

            <p>
                ${escapeHTML(
                    book.author ||
                    "Không rõ tác giả"
                )}
            </p>

            <div class="progress">

                <div
                    class="progress-bar"
                    style="
                        width: ${book.progress || 0}%;
                    "
                ></div>

            </div>

            <span>
                ${book.progress || 0}% đã đọc
            </span>

        </div>
    `;


    card.addEventListener(
        "click",
        function () {

            openBook(book.id);

        }
    );


    return card;
}


// ========================================
// RENDER BOOKS
// ========================================

function renderBooks(bookList = books) {

    if (bookGrid) {
        bookGrid.innerHTML = "";
    }

    if (allBookGrid) {
        allBookGrid.innerHTML = "";
    }


    // Không có kết quả
    if (bookList.length === 0) {

        if (emptyLibrary) {
            emptyLibrary.hidden = false;
        }

        return;
    }


    // Có sách
    if (emptyLibrary) {
        emptyLibrary.hidden = true;
    }


    bookList.forEach(
        function (book) {

            // Đang đọc
            if (bookGrid) {

                const readingCard =
                    createBookCard(book);

                bookGrid.appendChild(
                    readingCard
                );
            }


            // Tất cả truyện
            if (allBookGrid) {

                const allCard =
                    createBookCard(book);

                allBookGrid.appendChild(
                    allCard
                );
            }

        }
    );
}


// ========================================
// SEARCH
// ========================================

if (searchInput) {

    searchInput.addEventListener(
        "input",
        function () {

            const keyword =
                searchInput.value
                    .trim()
                    .toLowerCase();


            if (!keyword) {

                renderBooks();

                return;
            }


            const results =
                books.filter(
                    function (book) {

                        const title =
                            (
                                book.title || ""
                            ).toLowerCase();

                        const author =
                            (
                                book.author || ""
                            ).toLowerCase();

                        const genre =
                            (
                                book.genre || ""
                            ).toLowerCase();


                        return (
                            title.includes(
                                keyword
                            ) ||
                            author.includes(
                                keyword
                            ) ||
                            genre.includes(
                                keyword
                            )
                        );
                    }
                );


            renderBooks(results);

        }
    );
}


// ========================================
// THEME
// ========================================

function applyTheme(theme) {

    if (theme === "dark") {

        document.body.classList.add(
            "dark-mode"
        );

        localStorage.setItem(
            "mylibra-theme",
            "dark"
        );

        if (themeButton) {
            themeButton.textContent = "☀️";
        }

    } else {

        document.body.classList.remove(
            "dark-mode"
        );

        localStorage.setItem(
            "mylibra-theme",
            "light"
        );

        if (themeButton) {
            themeButton.textContent = "🌙";
        }
    }
}


function loadTheme() {

    const savedTheme =
        localStorage.getItem(
            "mylibra-theme"
        );


    if (savedTheme === "dark") {

        applyTheme("dark");

    } else {

        applyTheme("light");
    }
}


if (themeButton) {

    themeButton.addEventListener(
        "click",
        function () {

            const isDark =
                document.body.classList.contains(
                    "dark-mode"
                );


            applyTheme(
                isDark
                    ? "light"
                    : "dark"
            );
        }
    );
}


// ========================================
// ADD BOOK MODAL
// ========================================

function openAddBookModal() {

    if (!addBookModal) {
        return;
    }

    addBookModal.hidden = false;

    if (confirmAddBook) {
        confirmAddBook.disabled = true;
    }
}


function closeAddBookModal() {

    if (!addBookModal) {
        return;
    }

    addBookModal.hidden = true;


    if (bookFileInput) {
        bookFileInput.value = "";
    }


    if (selectedFile) {

        selectedFile.hidden = true;

        selectedFile.textContent = "";
    }


    if (confirmAddBook) {
        confirmAddBook.disabled = true;
    }
}


if (addBookButton) {

    addBookButton.addEventListener(
        "click",
        openAddBookModal
    );
}


if (emptyAddBookButton) {

    emptyAddBookButton.addEventListener(
        "click",
        openAddBookModal
    );
}


if (closeAddBook) {

    closeAddBook.addEventListener(
        "click",
        closeAddBookModal
    );
}


if (cancelAddBook) {

    cancelAddBook.addEventListener(
        "click",
        closeAddBookModal
    );
}


// Click ra ngoài modal
if (addBookModal) {

    addBookModal.addEventListener(
        "click",
        function (event) {

            if (
                event.target ===
                addBookModal
            ) {

                closeAddBookModal();
            }
        }
    );
}


// ========================================
// SELECT FILE
// ========================================

if (bookFileInput) {

    bookFileInput.addEventListener(
        "change",
        function () {

            const file =
                bookFileInput.files[0];


            if (!file) {

                if (selectedFile) {
                    selectedFile.hidden = true;
                }

                if (confirmAddBook) {
                    confirmAddBook.disabled = true;
                }

                return;
            }


            const fileType =
                getFileType(file.name);


            if (
                fileType !== "EPUB" &&
                fileType !== "PDF" &&
                fileType !== "TXT"
            ) {

                alert(
                    "MyLibra chỉ hỗ trợ EPUB, PDF hoặc TXT."
                );

                bookFileInput.value = "";

                if (confirmAddBook) {
                    confirmAddBook.disabled = true;
                }

                return;
            }


            if (selectedFile) {

                selectedFile.hidden = false;

                selectedFile.textContent =
                    `${getBookIcon(fileType)}  ${file.name}`;
            }


            if (confirmAddBook) {
                confirmAddBook.disabled = false;
            }

        }
    );
}


// ========================================
// ADD BOOK
// ========================================

if (confirmAddBook) {

    confirmAddBook.addEventListener(
        "click",
        async function () {

            if (
                !bookFileInput ||
                !bookFileInput.files.length
            ) {

                return;
            }


            const file =
                bookFileInput.files[0];


            const fileType =
                getFileType(file.name);


            const newBook = {

                id:
                    "book-" +
                    Date.now(),

                title:
                    removeExtension(
                        file.name
                    ),

                author:
                    "Chưa rõ tác giả",

                genre:
                    "Chưa phân loại",

                description:
                    "Truyện được thêm vào MyLibra.",

                progress:
                    0,

                icon:
                    getBookIcon(
                        fileType
                    ),

                fileName:
                    file.name,

                fileType:
                    fileType,

                file:
                    file
            };


            try {

                await saveBookToDatabase(
                    newBook
                );


                books.push(
                    newBook
                );


                renderBooks();


                closeAddBookModal();


                alert(
                    `Đã thêm "${newBook.title}" vào thư viện.`
                );

            } catch (error) {

                console.error(
                    error
                );

                alert(
                    "Không thể lưu truyện."
                );
            }

        }
    );
}


// ========================================
// OPEN BOOK DETAIL
// ========================================

function openBook(bookId) {

    const book =
        books.find(
            function (item) {

                return item.id === bookId;

            }
        );


    if (!book) {
        return;
    }


    currentBookId =
        bookId;


    if (!bookDetail) {
        return;
    }


    // Tạo giao diện chi tiết
    bookDetail.innerHTML = `

        <div class="book-detail-cover">

            <div class="book-cover-large">
                ${book.icon || "📖"}
            </div>

        </div>


        <div class="book-detail-info">

            <span class="book-detail-category">
                ${escapeHTML(
                    book.genre ||
                    "Chưa phân loại"
                )}
            </span>


            <h1>
                ${escapeHTML(
                    book.title
                )}
            </h1>


            <p class="book-author">
                ${escapeHTML(
                    book.author ||
                    "Không rõ tác giả"
                )}
            </p>


            <p class="book-description">
                ${escapeHTML(
                    book.description ||
                    "Chưa có mô tả."
                )}
            </p>


            <p>
                Tiến độ:
                <strong>
                    ${book.progress || 0}%
                </strong>
            </p>


            <div class="book-actions">

                <button
                    class="primary-button"
                    id="detailReadButton"
                    type="button"
                >
                    ${book.progress > 0
                        ? "Tiếp tục đọc"
                        : "Bắt đầu đọc"}
                </button>

                <button
                    class="add-button"
                    id="detailBackButton"
                    type="button"
                >
                    ← Thư viện
                </button>

            </div>

        </div>
    `;


    showBookDetail();


    // Nút đọc
    const detailReadButton =
        document.getElementById(
            "detailReadButton"
        );


    if (detailReadButton) {

        detailReadButton.addEventListener(
            "click",
            function () {

                openReader(
                    book.id
                );

            }
        );
    }


    // Nút quay lại
    const detailBackButton =
        document.getElementById(
            "detailBackButton"
        );


    if (detailBackButton) {

        detailBackButton.addEventListener(
            "click",
            function () {

                showLibrary();

            }
        );
    }
}


// ========================================
// BACK TO LIBRARY
// ========================================

if (backToLibrary) {

    backToLibrary.addEventListener(
        "click",
        function () {

            showLibrary();

            renderBooks();

        }
    );
}


// ========================================
// READER
// ========================================

async function openReader(bookId) {

    const book =
        books.find(
            function (item) {

                return item.id === bookId;

            }
        );


    if (!book) {
        return;
    }


    currentBookId =
        bookId;


    // Chưa có file
    if (!book.file) {

        alert(
            "Đây là truyện mẫu nên chưa có file để đọc.\n\n" +
            "Hãy dùng '+ Thêm truyện' để thêm file TXT."
        );

        return;
    }


    // ====================================
    // TXT
    // ====================================

    if (book.fileType === "TXT") {

        try {

            const text =
                await book.file.text();


            if (readerTitle) {

                readerTitle.textContent =
                    book.title;
            }


            if (readerContent) {

                readerContent.textContent =
                    text;
            }


            showReader();


            // Khôi phục vị trí
            const savedPosition =
                Number(
                    localStorage.getItem(
                        `mylibra-position-${book.id}`
                    )
                );


            setTimeout(
                function () {

                    if (
                        savedPosition &&
                        !Number.isNaN(
                            savedPosition
                        )
                    ) {

                        window.scrollTo(
                            0,
                            savedPosition
                        );

                    } else {

                        window.scrollTo(
                            0,
                            0
                        );
                    }


                    updateReaderProgress();

                },
                50
            );


            return;

        } catch (error) {

            console.error(
                error
            );

            alert(
                "Không thể mở file TXT."
            );

            return;
        }
    }


    // ====================================
    // EPUB / PDF
    // ====================================

    if (
        book.fileType === "EPUB" ||
        book.fileType === "PDF"
    ) {

        alert(
            `${book.fileType} Reader sẽ được tích hợp ở bước tiếp theo.`
        );

        return;
    }


    alert(
        "Định dạng file chưa được hỗ trợ."
    );
}


// ========================================
// BACK FROM READER
// ========================================

if (backFromReader) {

    backFromReader.addEventListener(
        "click",
        function () {

            showLibrary();

            renderBooks();

        }
    );
}


// ========================================
// READER PROGRESS
// ========================================

function updateReaderProgress() {

    if (!readerPage) {
        return;
    }


    if (readerPage.hidden) {
        return;
    }


    const totalHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;


    if (totalHeight <= 0) {

        if (readerProgressBar) {
            readerProgressBar.style.width =
                "0%";
        }

        return;
    }


    const scrollTop =
        window.scrollY;


    const progress =
        Math.min(
            100,
            Math.max(
                0,
                (
                    scrollTop /
                    totalHeight
                ) * 100
            )
        );


    if (readerProgressBar) {

        readerProgressBar.style.width =
            `${progress}%`;
    }


    if (!currentBookId) {
        return;
    }


    // Lưu vị trí
    localStorage.setItem(
        `mylibra-position-${currentBookId}`,
        String(scrollTop)
    );


    // Lưu %
    const book =
        books.find(
            function (item) {

                return item.id ===
                    currentBookId;

            }
        );


    if (book) {

        book.progress =
            Math.round(
                progress
            );

        saveBookToDatabase(
            book
        );
    }
}


// ========================================
// SCROLL
// ========================================

let progressTimer = null;


window.addEventListener(
    "scroll",
    function () {

        if (
            !readerPage ||
            readerPage.hidden
        ) {

            return;
        }


        updateReaderProgress();


        clearTimeout(
            progressTimer
        );


        progressTimer =
            setTimeout(
                function () {

                    updateReaderProgress();

                },
                300
            );

    }
);


// ========================================
// FONT SIZE
// ========================================

function loadFontSize() {

    if (!readerContent) {
        return;
    }


    const saved =
        Number(
            localStorage.getItem(
                "mylibra-font-size"
            )
        );


    if (
        saved &&
        !Number.isNaN(saved)
    ) {

        readerContent.style.fontSize =
            `${saved}px`;
    }
}


if (decreaseFont) {

    decreaseFont.addEventListener(
        "click",
        function () {

            if (!readerContent) {
                return;
            }


            const current =
                parseFloat(
                    getComputedStyle(
                        readerContent
                    ).fontSize
                );


            const next =
                Math.max(
                    12,
                    current - 1
                );


            readerContent.style.fontSize =
                `${next}px`;


            localStorage.setItem(
                "mylibra-font-size",
                String(next)
            );


            updateReaderProgress();

        }
    );
}


if (increaseFont) {

    increaseFont.addEventListener(
        "click",
        function () {

            if (!readerContent) {
                return;
            }


            const current =
                parseFloat(
                    getComputedStyle(
                        readerContent
                    ).fontSize
                );


            const next =
                Math.min(
                    40,
                    current + 1
                );


            readerContent.style.fontSize =
                `${next}px`;


            localStorage.setItem(
                "mylibra-font-size",
                String(next)
            );


            updateReaderProgress();

        }
    );
}


// ========================================
// INITIALIZE
// ========================================

async function initializeMyLibra() {

    // Theme
    loadTheme();

    // Font
    loadFontSize();


    // Database
    try {

        const storedBooks =
            await loadBooksFromDatabase();


        storedBooks.forEach(
            function (storedBook) {

                const existingIndex =
                    books.findIndex(
                        function (book) {

                            return book.id ===
                                storedBook.id;

                        }
                    );


                if (
                    existingIndex >= 0
                ) {

                    books[
                        existingIndex
                    ] = storedBook;

                } else {

                    books.push(
                        storedBook
                    );
                }

            }
        );

    } catch (error) {

        console.error(
            "Database error:",
            error
        );
    }


    // Render
    renderBooks();


    // Đảm bảo đúng page ban đầu
    showLibrary();
}


// ========================================
// START
// ========================================

initializeMyLibra();
