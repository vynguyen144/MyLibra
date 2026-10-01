// ================================
// MyLibra - Main Script
// ================================

// -------------------------------
// Demo books
// -------------------------------

let books = [
    {
        id: "demo-1",
        title: "The Beginning After the End",
        author: "TurtleMe",
        genre: "Fantasy",
        description: "Một câu chuyện fantasy về cuộc đời mới của một vị vua sau khi tái sinh.",
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
        description: "Một độc giả duy nhất biết trước toàn bộ diễn biến của thế giới.",
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
        description: "Một thợ săn yếu nhất thế giới bắt đầu hành trình trở thành người mạnh nhất.",
        progress: 18,
        icon: "⚔️",
        fileName: "",
        fileType: "",
        file: null
    }
];


// ================================
// DOM Elements
// ================================

const bookGrid = document.getElementById("bookGrid");
const allBookGrid = document.getElementById("allBookGrid");
const emptyLibrary = document.getElementById("emptyLibrary");

const searchInput = document.getElementById("searchInput");
const themeToggle = document.getElementById("themeToggle");
const settingsButton = document.getElementById("settingsButton");

const addBookButton = document.getElementById("addBookButton");
const addBookModal = document.getElementById("addBookModal");
const closeAddBook = document.getElementById("closeAddBook");
const cancelAddBook = document.getElementById("cancelAddBook");
const confirmAddBook = document.getElementById("confirmAddBook");
const bookFileInput = document.getElementById("bookFile");

const libraryPage = document.getElementById("libraryPage");
const bookDetailPage = document.getElementById("bookDetailPage");
const readerPage = document.getElementById("readerPage");

const backToLibrary = document.getElementById("backToLibrary");
const backFromReader = document.getElementById("backFromReader");

const detailCover = document.getElementById("detailCover");
const detailTitle = document.getElementById("detailTitle");
const detailAuthor = document.getElementById("detailAuthor");
const detailGenre = document.getElementById("detailGenre");
const detailDescription = document.getElementById("detailDescription");
const detailProgress = document.getElementById("detailProgress");
const continueReadingButton = document.getElementById("continueReadingButton");

const readerTitle = document.getElementById("readerTitle");
const readerContent = document.getElementById("readerContent");
const readerProgressBar = document.getElementById("readerProgressBar");

const decreaseFont = document.getElementById("decreaseFont");
const increaseFont = document.getElementById("increaseFont");


// ================================
// Current book
// ================================

let currentBookId = null;


// ================================
// IndexedDB
// ================================

const DB_NAME = "MyLibraDB";
const DB_VERSION = 1;
const STORE_NAME = "books";

function openDatabase() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = function (event) {
            const db = event.target.result;

            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, {
                    keyPath: "id"
                });
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
        const db = await openDatabase();

        return new Promise((resolve, reject) => {
            const transaction = db.transaction(
                STORE_NAME,
                "readwrite"
            );

            const store = transaction.objectStore(STORE_NAME);

            store.put(book);

            transaction.oncomplete = function () {
                resolve();
            };

            transaction.onerror = function () {
                reject(transaction.error);
            };
        });
    } catch (error) {
        console.error("Không thể lưu sách:", error);
    }
}


async function loadBooksFromDatabase() {
    try {
        const db = await openDatabase();

        return new Promise((resolve, reject) => {
            const transaction = db.transaction(
                STORE_NAME,
                "readonly"
            );

            const store = transaction.objectStore(STORE_NAME);

            const request = store.getAll();

            request.onsuccess = function () {
                resolve(request.result || []);
            };

            request.onerror = function () {
                reject(request.error);
            };
        });
    } catch (error) {
        console.error("Không thể tải sách:", error);
        return [];
    }
}


// ================================
// File helpers
// ================================

function getFileType(fileName) {
    const extension = fileName
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
    switch (fileType) {
        case "EPUB":
            return "📚";

        case "PDF":
            return "📕";

        case "TXT":
            return "📄";

        default:
            return "📖";
    }
}


function removeExtension(fileName) {
    return fileName.replace(/\.[^/.]+$/, "");
}


// ================================
// Render books
// ================================

function renderBooks(bookList = books) {

    bookGrid.innerHTML = "";
    allBookGrid.innerHTML = "";

    // Không có sách
    if (bookList.length === 0) {
        emptyLibrary.style.display = "block";
        return;
    }

    // Có sách -> ẩn thông báo thư viện trống
    emptyLibrary.style.display = "none";

    bookList.forEach(book => {

        // -------------------------
        // Card "Đang đọc"
        // -------------------------

        const readingCard = createBookCard(book);

        bookGrid.appendChild(readingCard);


        // -------------------------
        // Card "Tất cả truyện"
        // -------------------------

        const allCard = createBookCard(book);

        allBookGrid.appendChild(allCard);
    });
}


// ================================
// Create book card
// ================================

function createBookCard(book) {

    const card = document.createElement("div");

    card.className = "book-card";

    card.innerHTML = `
        <div class="book-card-cover">
            <div class="book-card-icon">
                ${book.icon || "📖"}
            </div>
        </div>

        <div class="book-card-info">

            <h3>${escapeHTML(book.title)}</h3>

            <p class="book-author">
                ${escapeHTML(book.author || "Không rõ tác giả")}
            </p>

            <p class="book-genre">
                ${escapeHTML(book.genre || "Chưa phân loại")}
            </p>

            <div class="book-progress">
                <div
                    class="book-progress-bar"
                    style="width: ${book.progress || 0}%"
                ></div>
            </div>

            <span class="book-progress-text">
                ${book.progress || 0}%
            </span>

        </div>
    `;


    // ============================
    // CLICK CARD
    // ============================

    card.addEventListener("click", function () {
        openBook(book.id);
    });


    return card;
}


// ================================
// Escape HTML
// ================================

function escapeHTML(value) {

    if (value === undefined || value === null) {
        return "";
    }

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


// ================================
// Search
// ================================

if (searchInput) {

    searchInput.addEventListener("input", function () {

        const keyword = searchInput.value
            .trim()
            .toLowerCase();

        if (!keyword) {
            renderBooks();
            return;
        }

        const filteredBooks = books.filter(book => {

            const title = (book.title || "").toLowerCase();
            const author = (book.author || "").toLowerCase();
            const genre = (book.genre || "").toLowerCase();

            return (
                title.includes(keyword) ||
                author.includes(keyword) ||
                genre.includes(keyword)
            );
        });

        renderBooks(filteredBooks);
    });
}


// ================================
// Theme
// ================================

function applyTheme(theme) {

    if (theme === "dark") {
        document.body.classList.add("dark");
        localStorage.setItem("mylibra-theme", "dark");
    } else {
        document.body.classList.remove("dark");
        localStorage.setItem("mylibra-theme", "light");
    }
}


if (themeToggle) {

    themeToggle.addEventListener("click", function () {

        const isDark =
            document.body.classList.contains("dark");

        applyTheme(isDark ? "light" : "dark");
    });
}


function loadTheme() {

    const savedTheme =
        localStorage.getItem("mylibra-theme");

    if (savedTheme === "dark") {
        applyTheme("dark");
    } else {
        applyTheme("light");
    }
}


// ================================
// Add Book Modal
// ================================

function openAddBookModal() {

    if (!addBookModal) {
        return;
    }

    addBookModal.classList.add("show");
}


function closeAddBookModal() {

    if (!addBookModal) {
        return;
    }

    addBookModal.classList.remove("show");

    if (bookFileInput) {
        bookFileInput.value = "";
    }
}


if (addBookButton) {

    addBookButton.addEventListener(
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


// Click outside modal
if (addBookModal) {

    addBookModal.addEventListener("click", function (event) {

        if (event.target === addBookModal) {
            closeAddBookModal();
        }
    });
}


// ================================
// Add book
// ================================

if (confirmAddBook) {

    confirmAddBook.addEventListener(
        "click",
        async function () {

            if (!bookFileInput || !bookFileInput.files.length) {

                alert("Bạn chưa chọn file truyện.");

                return;
            }


            const file =
                bookFileInput.files[0];


            const fileType =
                getFileType(file.name);


            if (
                fileType !== "EPUB" &&
                fileType !== "PDF" &&
                fileType !== "TXT"
            ) {

                alert(
                    "MyLibra hiện hỗ trợ EPUB, PDF và TXT."
                );

                return;
            }


            const newBook = {

                id:
                    "book-" +
                    Date.now(),

                title:
                    removeExtension(file.name),

                author:
                    "Chưa rõ tác giả",

                genre:
                    "Chưa phân loại",

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


            try {

                await saveBookToDatabase(newBook);

                books.push(newBook);

                renderBooks();

                closeAddBookModal();

                alert(
                    `Đã thêm "${newBook.title}" vào thư viện.`
                );

            } catch (error) {

                console.error(error);

                alert(
                    "Không thể lưu truyện. Hãy thử lại."
                );
            }
        }
    );
}


// ================================
// Book Detail
// ================================

function openBook(bookId) {

    const book =
        books.find(item => item.id === bookId);


    if (!book) {
        return;
    }


    currentBookId = bookId;


    if (libraryPage) {
        libraryPage.style.display = "none";
    }

    if (readerPage) {
        readerPage.style.display = "none";
    }

    if (bookDetailPage) {
        bookDetailPage.style.display = "block";
    }


    if (detailCover) {

        detailCover.innerHTML = `
            <div class="detail-cover-icon">
                ${book.icon || "📖"}
            </div>
        `;
    }


    if (detailTitle) {
        detailTitle.textContent =
            book.title;
    }


    if (detailAuthor) {
        detailAuthor.textContent =
            book.author || "Không rõ tác giả";
    }


    if (detailGenre) {
        detailGenre.textContent =
            book.genre || "Chưa phân loại";
    }


    if (detailDescription) {
        detailDescription.textContent =
            book.description ||
            "Chưa có mô tả.";
    }


    if (detailProgress) {

        detailProgress.textContent =
            `${book.progress || 0}%`;
    }


    if (continueReadingButton) {

        continueReadingButton.onclick =
            function () {

                openReader(book.id);

            };
    }
}


// ================================
// Back to Library
// ================================

if (backToLibrary) {

    backToLibrary.addEventListener(
        "click",
        function () {

            if (bookDetailPage) {
                bookDetailPage.style.display =
                    "none";
            }

            if (readerPage) {
                readerPage.style.display =
                    "none";
            }

            if (libraryPage) {
                libraryPage.style.display =
                    "block";
            }

            renderBooks();
        }
    );
}


// ================================
// Reader
// ================================

async function openReader(bookId) {

    const book =
        books.find(item => item.id === bookId);


    if (!book) {
        return;
    }


    currentBookId = bookId;


    if (!book.file) {

        alert(
            "Truyện mẫu chưa có file để đọc.\n\n" +
            "Hãy thêm một file TXT để thử Reader."
        );

        return;
    }


    // -------------------------
    // TXT Reader
    // -------------------------

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


            // Hide other pages
            if (libraryPage) {
                libraryPage.style.display =
                    "none";
            }

            if (bookDetailPage) {
                bookDetailPage.style.display =
                    "none";
            }


            // Show reader
            if (readerPage) {
                readerPage.style.display =
                    "block";
            }


            // Restore position
            const savedPosition =
                Number(
                    localStorage.getItem(
                        `mylibra-position-${book.id}`
                    )
                );


            setTimeout(function () {

                if (
                    savedPosition &&
                    !Number.isNaN(savedPosition)
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

            }, 50);


            return;

        } catch (error) {

            console.error(error);

            alert(
                "Không thể mở file TXT."
            );

            return;
        }
    }


    // -------------------------
    // EPUB / PDF
    // -------------------------

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
        "Định dạng file này chưa được hỗ trợ."
    );
}


// ================================
// Back from Reader
// ================================

if (backFromReader) {

    backFromReader.addEventListener(
        "click",
        function () {

            if (readerPage) {
                readerPage.style.display =
                    "none";
            }

            if (bookDetailPage) {
                bookDetailPage.style.display =
                    "block";
            }

            renderBooks();
        }
    );
}


// ================================
// Reader progress
// ================================

function updateReaderProgress() {

    if (!readerProgressBar) {
        return;
    }


    const documentHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;


    if (documentHeight <= 0) {

        readerProgressBar.style.width =
            "0%";

        return;
    }


    const scrollTop =
        window.scrollY;


    const progress =
        Math.min(
            100,
            Math.max(
                0,
                (scrollTop / documentHeight) * 100
            )
        );


    readerProgressBar.style.width =
        `${progress}%`;


    // Save progress
    if (currentBookId) {

        localStorage.setItem(
            `mylibra-position-${currentBookId}`,
            String(scrollTop)
        );


        const book =
            books.find(
                item =>
                    item.id === currentBookId
            );


        if (book) {

            book.progress =
                Math.round(progress);

            saveBookToDatabase(book);
        }
    }
}


// Scroll listener
let progressSaveTimer = null;

window.addEventListener(
    "scroll",
    function () {

        if (!readerPage) {
            return;
        }


        if (
            readerPage.style.display === "none"
        ) {
            return;
        }


        updateReaderProgress();


        clearTimeout(
            progressSaveTimer
        );


        progressSaveTimer =
            setTimeout(
                function () {
                    updateReaderProgress();
                },
                300
            );
    }
);


// ================================
// Reader Font Size
// ================================

function loadReaderFontSize() {

    const savedSize =
        Number(
            localStorage.getItem(
                "mylibra-font-size"
            )
        );


    if (
        savedSize &&
        readerContent
    ) {

        readerContent.style.fontSize =
            `${savedSize}px`;
    }
}


if (decreaseFont) {

    decreaseFont.addEventListener(
        "click",
        function () {

            if (!readerContent) {
                return;
            }


            const currentSize =
                parseFloat(
                    getComputedStyle(
                        readerContent
                    ).fontSize
                );


            const newSize =
                Math.max(
                    12,
                    currentSize - 1
                );


            readerContent.style.fontSize =
                `${newSize}px`;


            localStorage.setItem(
                "mylibra-font-size",
                String(newSize)
            );
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


            const currentSize =
                parseFloat(
                    getComputedStyle(
                        readerContent
                    ).fontSize
                );


            const newSize =
                Math.min(
                    40,
                    currentSize + 1
                );


            readerContent.style.fontSize =
                `${newSize}px`;


            localStorage.setItem(
                "mylibra-font-size",
                String(newSize)
            );
        }
    );
}


// ================================
// Settings button
// ================================

if (settingsButton) {

    settingsButton.addEventListener(
        "click",
        function () {

            alert(
                "Khu vực cài đặt MyLibra sẽ được phát triển ở bước tiếp theo."
            );
        }
    );
}


// ================================
// Initialize
// ================================

async function initializeMyLibra() {

    loadTheme();

    loadReaderFontSize();


    try {

        const storedBooks =
            await loadBooksFromDatabase();


        if (storedBooks.length > 0) {

            storedBooks.forEach(
                storedBook => {

                    const existingIndex =
                        books.findIndex(
                            book =>
                                book.id ===
                                storedBook.id
                        );


                    if (existingIndex >= 0) {

                        books[existingIndex] =
                            storedBook;

                    } else {

                        books.push(
                            storedBook
                        );
                    }
                }
            );
        }

    } catch (error) {

        console.error(
            "Không thể load thư viện:",
            error
        );
    }


    renderBooks();
}


// Start application
initializeMyLibra();
