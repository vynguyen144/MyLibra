// ========================================
// MyLibra - Library / Book Management / Reader
// ========================================

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

const $ = (id) => document.getElementById(id);

const libraryPage = $("libraryPage");
const bookDetailPage = $("bookDetailPage");
const bookDetail = $("bookDetail");
const readerPage = $("readerPage");
const bookGrid = $("bookGrid");
const allBookGrid = $("allBookGrid");
const emptyLibrary = $("emptyLibrary");
const searchInput = document.querySelector(".search-box input");
const themeButton = $("themeButton");

const addBookButton = $("addBookButton");
const emptyAddBookButton = $("emptyAddBookButton");
const addBookModal = $("addBookModal");
const closeAddBook = $("closeAddBook");
const cancelAddBook = $("cancelAddBook");
const confirmAddBook = $("confirmAddBook");
const bookFileInput = $("bookFile");
const selectedFile = $("selectedFile");

const backToLibrary = $("backToLibrary");
const backFromReader = $("backFromReader");
const readerTitle = $("readerTitle");
const readerContent = $("readerContent");
const readerProgressBar = $("readerProgressBar");
const decreaseFont = $("decreaseFont");
const increaseFont = $("increaseFont");

const editBookModal = $("editBookModal");
const closeEditBook = $("closeEditBook");
const cancelEditBook = $("cancelEditBook");
const saveEditBook = $("saveEditBook");
const editTitle = $("editTitle");
const editAuthor = $("editAuthor");
const editGenre = $("editGenre");
const editDescription = $("editDescription");
const editCover = $("editCover");

const pdfToolbar = $("pdfToolbar");
const pdfPrev = $("pdfPrev");
const pdfNext = $("pdfNext");
const pdfPageInfo = $("pdfPageInfo");
const pdfZoomOut = $("pdfZoomOut");
const pdfZoomIn = $("pdfZoomIn");
const pdfRotate = $("pdfRotate");
const pdfDeletePage = $("pdfDeletePage");
const pdfAddText = $("pdfAddText");
const pdfHighlight = $("pdfHighlight");
const pdfSave = $("pdfSave");

const epubEditorModal = $("epubEditorModal");
const closeEpubEditor = $("closeEpubEditor");
const cancelEpubEditor = $("cancelEpubEditor");
const saveEpubEditor = $("saveEpubEditor");
const epubBookTitle = $("epubBookTitle");
const epubBookAuthor = $("epubBookAuthor");
const epubChapterList = $("epubChapterList");
const epubChapterTitle = $("epubChapterTitle");
const epubContentEditor = $("epubContentEditor");
const epubAddChapter = $("epubAddChapter");
const epubDeleteChapter = $("epubDeleteChapter");
const epubMoveUp = $("epubMoveUp");
const epubMoveDown = $("epubMoveDown");

const updateFileModal = $("updateFileModal");
const closeUpdateFile = $("closeUpdateFile");
const cancelUpdateFile = $("cancelUpdateFile");
const updateBookFile = $("updateBookFile");
const updateSelectedFile = $("updateSelectedFile");
const saveUpdatedFile = $("saveUpdatedFile");

let currentBookId = null;
let updateFileBookId = null;
let currentRendition = null;
let currentPdf = null;
let currentPdfBytes = null;
let currentPdfBookId = null;
let currentPdfPage = 1;
let currentPdfScale = 1.25;
let currentPdfRotation = 0;
let currentEpub = null;
let epubKeyHandler = null;
let epubEditorState = null;

const DB_NAME = "MyLibraDB";
const DB_VERSION = 1;
const STORE_NAME = "books";

function openDatabase() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: "id" });
            }
        };

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

async function saveBookToDatabase(book) {
    const db = await openDatabase();

    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, "readwrite");
        tx.objectStore(STORE_NAME).put(book);
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
    });
}

async function deleteBookFromDatabase(id) {
    const db = await openDatabase();

    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, "readwrite");
        tx.objectStore(STORE_NAME).delete(id);
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
    });
}

async function loadBooksFromDatabase() {
    const db = await openDatabase();

    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, "readonly");
        const request = tx.objectStore(STORE_NAME).getAll();
        request.onsuccess = () => resolve(request.result || []);
        request.onerror = () => reject(request.error);
    });
}

function escapeHTML(value) {
    if (value === null || value === undefined) return "";
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function removeExtension(fileName) {
    return fileName.replace(/\.[^/.]+$/, "");
}

function getFileType(fileName) {
    const ext = fileName.split(".").pop().toLowerCase();
    if (ext === "epub") return "EPUB";
    if (ext === "pdf") return "PDF";
    if (ext === "txt") return "TXT";
    return "UNKNOWN";
}

function getBookIcon(fileType) {
    if (fileType === "EPUB") return "📚";
    if (fileType === "PDF") return "📕";
    if (fileType === "TXT") return "📄";
    return "📖";
}

function showLibrary() {
    libraryPage.hidden = false;
    bookDetailPage.hidden = true;
    readerPage.hidden = true;
    currentBookId = null;
}

function showBookDetail() {
    libraryPage.hidden = true;
    bookDetailPage.hidden = false;
    readerPage.hidden = true;
}

function showReader() {
    libraryPage.hidden = true;
    bookDetailPage.hidden = true;
    readerPage.hidden = false;
}

function createCoverMarkup(book, large = false) {
    const cls = large ? "book-cover-image-large" : "book-cover-image";
    if (book.coverDataUrl) {
        return '<img class="' + cls + '" src="' + escapeHTML(book.coverDataUrl) + '" alt="">';
    }
    return escapeHTML(book.icon || "📖");
}

function createBookCard(book) {
    const card = document.createElement("div");
    card.className = "book-card";
    card.innerHTML = `
        <div class="book-cover">
            ${createCoverMarkup(book)}
        </div>
        <div class="book-info">
            <h3>${escapeHTML(book.title)}</h3>
            <p>${escapeHTML(book.author || "Không rõ tác giả")}</p>
            <div class="progress">
                <div class="progress-bar" style="width:${book.progress || 0}%"></div>
            </div>
            <span>${book.progress || 0}% đã đọc</span>
        </div>
    `;
    card.addEventListener("click", () => openBook(book.id));
    return card;
}

function renderBooks(bookList = books) {
    bookGrid.innerHTML = "";
    allBookGrid.innerHTML = "";

    if (!bookList.length) {
        emptyLibrary.hidden = false;
        return;
    }

    emptyLibrary.hidden = true;

    bookList.forEach((book) => {
        bookGrid.appendChild(createBookCard(book));
        allBookGrid.appendChild(createBookCard(book));
    });
}

if (searchInput) {
    searchInput.addEventListener("input", () => {
        const keyword = searchInput.value.trim().toLowerCase();

        if (!keyword) {
            renderBooks();
            return;
        }

        const results = books.filter((book) =>
            [book.title, book.author, book.genre, book.description]
                .join(" ")
                .toLowerCase()
                .includes(keyword)
        );

        renderBooks(results);
    });
}

function applyTheme(theme) {
    const dark = theme === "dark";
    document.body.classList.toggle("dark-mode", dark);
    localStorage.setItem("mylibra-theme", dark ? "dark" : "light");
    themeButton.textContent = dark ? "☀️" : "🌙";
}

themeButton?.addEventListener("click", () => {
    applyTheme(document.body.classList.contains("dark-mode") ? "light" : "dark");
});

function openModal(modal) {
    if (modal) modal.hidden = false;
}

function closeModal(modal) {
    if (modal) modal.hidden = true;
}

function resetAddModal() {
    if (bookFileInput) bookFileInput.value = "";
    if (selectedFile) {
        selectedFile.hidden = true;
        selectedFile.textContent = "";
    }
    if (confirmAddBook) confirmAddBook.disabled = true;
}

function openAddBookModal() {
    resetAddModal();
    openModal(addBookModal);
}

addBookButton?.addEventListener("click", openAddBookModal);
emptyAddBookButton?.addEventListener("click", openAddBookModal);
closeAddBook?.addEventListener("click", () => closeModal(addBookModal));
cancelAddBook?.addEventListener("click", () => closeModal(addBookModal));

addBookModal?.addEventListener("click", (event) => {
    if (event.target === addBookModal) closeModal(addBookModal);
});

bookFileInput?.addEventListener("change", () => {
    const file = bookFileInput.files[0];
    if (!file) {
        resetAddModal();
        return;
    }

    const type = getFileType(file.name);

    if (!["EPUB", "PDF", "TXT"].includes(type)) {
        alert("MyLibra chỉ hỗ trợ EPUB, PDF hoặc TXT.");
        resetAddModal();
        return;
    }

    selectedFile.hidden = false;
    selectedFile.textContent = getBookIcon(type) + "  " + file.name;
    confirmAddBook.disabled = false;
});

confirmAddBook?.addEventListener("click", async () => {
    const file = bookFileInput.files[0];
    if (!file) return;

    const type = getFileType(file.name);

    const newBook = {
        id: "book-" + Date.now(),
        title: removeExtension(file.name),
        author: "Chưa rõ tác giả",
        genre: "Chưa phân loại",
        description: "",
        progress: 0,
        icon: getBookIcon(type),
        fileName: file.name,
        fileType: type,
        file: file,
        coverDataUrl: ""
    };

    try {
        await saveBookToDatabase(newBook);
        books.push(newBook);
        renderBooks();
        closeModal(addBookModal);
        alert('Đã thêm "' + newBook.title + '" vào thư viện.');
    } catch (error) {
        console.error(error);
        alert("Không thể lưu truyện.");
    }
});

function openBook(bookId) {
    const book = books.find((item) => item.id === bookId);
    if (!book) return;

    currentBookId = bookId;

    const hasFile = !!book.file;
    const readLabel = hasFile
        ? (book.progress > 0 ? "Tiếp tục đọc" : "Bắt đầu đọc")
        : "Chưa có file";

    bookDetail.innerHTML = `
        <div class="book-detail-cover">
            <div class="book-cover-large">
                ${createCoverMarkup(book, true)}
            </div>
        </div>

        <div class="book-detail-info">
            <span class="book-detail-category">${escapeHTML(book.genre || "Chưa phân loại")}</span>

            <h1>${escapeHTML(book.title)}</h1>

            <p class="book-author">
                Tác giả: ${escapeHTML(book.author || "Không rõ tác giả")}
            </p>

            <p class="book-description">
                ${escapeHTML(book.description || "Chưa có mô tả.")}
            </p>

            <p>
                Định dạng:
                <strong>${escapeHTML(book.fileType || "Chưa có file")}</strong>
            </p>

            <p>
                Tiến độ:
                <strong>${book.progress || 0}%</strong>
            </p>

            <div class="book-actions">
                <button class="primary-button" id="detailReadButton" type="button">
                    ${readLabel}
                </button>

                <button class="add-button" id="editBookButton" type="button">
                    ✏️ Chỉnh sửa
                </button>

                ${book.fileType === "EPUB" ? '<button class="add-button" id="editEpubButton" type="button">📖 Sửa EPUB</button>' : ""}

                <button class="add-button" id="updateBookButton" type="button">
                    🔄 Cập nhật file
                </button>

                <button class="danger-button" id="deleteBookButton" type="button">
                    🗑️ Xóa truyện
                </button>
            </div>
        </div>
    `;

    showBookDetail();

    $("detailReadButton")?.addEventListener("click", () => {
        if (!book.file) {
            alert("Truyện này chưa có file để đọc.");
            return;
        }
        openReader(book.id);
    });

    $("editBookButton")?.addEventListener("click", () => openEditBook(book.id));
    $("editEpubButton")?.addEventListener("click", () => openEpubEditor(book.id));
    $("updateBookButton")?.addEventListener("click", () => openUpdateFile(book.id));

    $("deleteBookButton")?.addEventListener("click", async () => {
        const ok = confirm(
            'Xóa "' + book.title + '" khỏi MyLibra?\n\nThao tác này sẽ xóa file truyện đã lưu trên trình duyệt.'
        );

        if (!ok) return;

        try {
            await deleteBookFromDatabase(book.id);
            books = books.filter((item) => item.id !== book.id);
            localStorage.removeItem("mylibra-position-" + book.id);
            localStorage.removeItem("mylibra-epub-cfi-" + book.id);
            showLibrary();
            renderBooks();
        } catch (error) {
            console.error(error);
            alert("Không thể xóa truyện.");
        }
    });
}

backToLibrary?.addEventListener("click", () => {
    showLibrary();
    renderBooks();
});

function openEditBook(bookId) {
    const book = books.find((item) => item.id === bookId);
    if (!book) return;

    currentBookId = bookId;
    editTitle.value = book.title || "";
    editAuthor.value = book.author || "";
    editGenre.value = book.genre || "";
    editDescription.value = book.description || "";
    editCover.value = "";

    openModal(editBookModal);
}

function readFileAsDataUrl(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(reader.error);
        reader.readAsDataURL(file);
    });
}

saveEditBook?.addEventListener("click", async () => {
    const book = books.find((item) => item.id === currentBookId);
    if (!book) return;

    const title = editTitle.value.trim();
    if (!title) {
        alert("Tên truyện không được để trống.");
        return;
    }

    book.title = title;
    book.author = editAuthor.value.trim() || "Chưa rõ tác giả";
    book.genre = editGenre.value.trim() || "Chưa phân loại";
    book.description = editDescription.value.trim();

    if (editCover.files[0]) {
        try {
            book.coverDataUrl = await readFileAsDataUrl(editCover.files[0]);
        } catch (error) {
            console.error(error);
            alert("Không thể đọc ảnh bìa.");
            return;
        }
    }

    try {
        await saveBookToDatabase(book);
        closeModal(editBookModal);
        renderBooks();
        openBook(book.id);
    } catch (error) {
        console.error(error);
        alert("Không thể lưu thông tin truyện.");
    }
});

closeEditBook?.addEventListener("click", () => closeModal(editBookModal));
cancelEditBook?.addEventListener("click", () => closeModal(editBookModal));

editBookModal?.addEventListener("click", (event) => {
    if (event.target === editBookModal) closeModal(editBookModal);
});

function openUpdateFile(bookId) {
    const book = books.find((item) => item.id === bookId);
    if (!book) return;

    updateFileBookId = bookId;
    updateBookFile.value = "";
    updateSelectedFile.hidden = true;
    updateSelectedFile.textContent = "";
    saveUpdatedFile.disabled = true;
    openModal(updateFileModal);
}

updateBookFile?.addEventListener("change", () => {
    const file = updateBookFile.files[0];

    if (!file) {
        updateSelectedFile.hidden = true;
        saveUpdatedFile.disabled = true;
        return;
    }

    const type = getFileType(file.name);

    if (!["EPUB", "PDF", "TXT"].includes(type)) {
        alert("MyLibra chỉ hỗ trợ EPUB, PDF hoặc TXT.");
        updateBookFile.value = "";
        updateSelectedFile.hidden = true;
        saveUpdatedFile.disabled = true;
        return;
    }

    updateSelectedFile.hidden = false;
    updateSelectedFile.textContent = getBookIcon(type) + "  " + file.name;
    saveUpdatedFile.disabled = false;
});

saveUpdatedFile?.addEventListener("click", async () => {
    const book = books.find((item) => item.id === updateFileBookId);
    const file = updateBookFile.files[0];

    if (!book || !file) return;

    const type = getFileType(file.name);

    book.file = file;
    book.fileName = file.name;
    book.fileType = type;

    try {
        await saveBookToDatabase(book);
        closeModal(updateFileModal);
        openBook(book.id);
        renderBooks();
        alert("Đã cập nhật file truyện. Thông tin và tiến độ vẫn được giữ lại.");
    } catch (error) {
        console.error(error);
        alert("Không thể cập nhật file.");
    }
});

closeUpdateFile?.addEventListener("click", () => closeModal(updateFileModal));
cancelUpdateFile?.addEventListener("click", () => closeModal(updateFileModal));

updateFileModal?.addEventListener("click", (event) => {
    if (event.target === updateFileModal) closeModal(updateFileModal);
});

async function openReader(bookId) {
    const book = books.find((item) => item.id === bookId);
    if (!book || !book.file) {
        alert("Truyện này chưa có file để đọc.");
        return;
    }

    currentBookId = bookId;
    readerTitle.textContent = book.title;
    showReader();

    if (currentRendition) {
        try { currentRendition.destroy(); } catch (_) {}
        currentRendition = null;
    }

    if (epubKeyHandler) {
        document.removeEventListener("keyup", epubKeyHandler);
        epubKeyHandler = null;
    }

    if (book.fileType === "TXT") {
        await openTxtReader(book);
        return;
    }

    if (book.fileType === "EPUB") {
        await openEpubReader(book);
        return;
    }

    if (book.fileType === "PDF") {
        await openPdfReader(book);
        return;
    }

    alert("Định dạng file chưa được hỗ trợ.");
}

async function openPdfReader(book) {
    if (typeof pdfjsLib === "undefined") {
        alert("Không tải được PDF Reader. Hãy kiểm tra kết nối internet rồi tải lại trang.");
        return;
    }

    try {
        if (!book.file || typeof book.file.arrayBuffer !== "function") {
            throw new Error("File PDF trong bộ nhớ không hợp lệ.");
        }

        currentPdfBookId = book.id;
        currentPdfPage = Number(localStorage.getItem("mylibra-pdf-page-" + book.id)) || 1;
        currentPdfScale = Number(localStorage.getItem("mylibra-pdf-scale-" + book.id)) || 1.25;
        currentPdfRotation = 0;

        const bytes = await book.file.arrayBuffer();
        if (!bytes || bytes.byteLength < 5) {
            throw new Error("File PDF rỗng.");
        }

        currentPdfBytes = bytes;

        pdfjsLib.GlobalWorkerOptions.workerSrc =
            "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

        // Dùng Uint8Array mới để PDF.js không bị ảnh hưởng bởi buffer gốc của File/Blob.
        const data = new Uint8Array(bytes);
        currentPdf = await pdfjsLib.getDocument({
            data,
            verbosity: 0
        }).promise;

        if (!currentPdf.numPages) {
            throw new Error("PDF không có trang.");
        }

        if (pdfToolbar) pdfToolbar.hidden = false;

        readerContent.className = "reader-content pdf-reader-content";
        readerContent.innerHTML =
            '<div class="pdf-canvas-wrap"><canvas id="pdfCanvas"></canvas></div>';

        currentPdfPage = Math.max(
            1,
            Math.min(currentPdfPage, currentPdf.numPages)
        );

        await renderPdfPage(currentPdfPage);
    } catch (error) {
        console.error("MyLibra PDF error:", error);

        currentPdf = null;
        currentPdfBytes = null;

        if (pdfToolbar) pdfToolbar.hidden = true;

        readerContent.className = "reader-content";
        readerContent.innerHTML = `
            <div class="pdf-error-box">
                <div style="font-size:42px">📕</div>
                <h2>Không thể hiển thị PDF</h2>
                <p>PDF Reader gặp lỗi khi đọc file này.</p>
                <small>${escapeHTML(error?.message || "Lỗi không xác định")}</small>
            </div>
        `;
    }
}
async function renderPdfPage(pageNumber) {
    if (!currentPdf) return;

    const page = await currentPdf.getPage(pageNumber);
    const viewport = page.getViewport({
        scale: currentPdfScale,
        rotation: currentPdfRotation
    });

    const canvas = document.getElementById("pdfCanvas");
    if (!canvas) return;

    const context = canvas.getContext("2d");
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    canvas.style.width = viewport.width + "px";
    canvas.style.height = viewport.height + "px";

    await page.render({ canvasContext: context, viewport }).promise;

    pdfPageInfo.textContent =
        "Trang " + pageNumber + " / " + currentPdf.numPages;

    const progress = Math.round((pageNumber / currentPdf.numPages) * 100);
    readerProgressBar.style.width = progress + "%";
    const book = books.find((item) => item.id === currentPdfBookId);
    if (book) {
        book.progress = progress;
        await saveBookToDatabase(book);
        renderBooks();
    }

    localStorage.setItem("mylibra-pdf-page-" + currentPdfBookId, String(pageNumber));
    localStorage.setItem("mylibra-pdf-scale-" + currentPdfBookId, String(currentPdfScale));
}

async function changePdfPage(delta) {
    if (!currentPdf) return;
    const next = currentPdfPage + delta;
    if (next < 1 || next > currentPdf.numPages) return;
    currentPdfPage = next;
    await renderPdfPage(currentPdfPage);
}

async function editPdfInMemory(action) {
    if (!currentPdfBytes || !window.PDFLib) return;

    try {
        const pdfDoc = await PDFLib.PDFDocument.load(currentPdfBytes);
        const pages = pdfDoc.getPages();
        if (!pages.length) return;

        if (action === "rotate") {
            const page = pages[currentPdfPage - 1];
            const current = page.getRotation().angle || 0;
            page.setRotation(PDFLib.degrees((current + 90) % 360));
        }

        if (action === "delete") {
            if (pages.length === 1) {
                alert("PDF phải còn ít nhất 1 trang.");
                return;
            }
            pdfDoc.removePage(currentPdfPage - 1);
            currentPdfPage = Math.min(currentPdfPage, pages.length - 1);
        }

        currentPdfBytes = await pdfDoc.save();

        currentPdf = await pdfjsLib.getDocument({
            data: currentPdfBytes.slice(0)
        }).promise;

        await renderPdfPage(currentPdfPage);
    } catch (error) {
        console.error(error);
        alert("Không thể chỉnh sửa PDF này.");
    }
}

async function addPdfText() {
    if (!currentPdfBytes || !window.PDFLib || !currentPdf) return;

    const text = prompt("Nhập nội dung muốn thêm vào trang hiện tại:");
    if (!text) return;

    const pdfDoc = await PDFLib.PDFDocument.load(currentPdfBytes);
    const page = pdfDoc.getPages()[currentPdfPage - 1];
    const font = await pdfDoc.embedFont(PDFLib.StandardFonts.Helvetica);

    const pdfHeight = page.getHeight();
    page.drawText(text, {
        x: 50,
        y: pdfHeight - 70,
        size: 16,
        font,
        color: PDFLib.rgb(0.25, 0.12, 0.45)
    });

    currentPdfBytes = await pdfDoc.save();
    currentPdf = await pdfjsLib.getDocument({ data: currentPdfBytes.slice(0) }).promise;
    await renderPdfPage(currentPdfPage);
}

async function addPdfHighlight() {
    if (!currentPdfBytes || !window.PDFLib || !currentPdf) return;

    const pdfDoc = await PDFLib.PDFDocument.load(currentPdfBytes);
    const page = pdfDoc.getPages()[currentPdfPage - 1];
    const pageHeight = page.getHeight();

    page.drawRectangle({
        x: 50,
        y: pageHeight - 130,
        width: Math.min(300, page.getWidth() - 100),
        height: 24,
        color: PDFLib.rgb(1, 0.9, 0.2),
        opacity: 0.35,
        borderWidth: 0
    });

    currentPdfBytes = await pdfDoc.save();
    currentPdf = await pdfjsLib.getDocument({ data: currentPdfBytes.slice(0) }).promise;
    await renderPdfPage(currentPdfPage);
}

async function saveEditedPdf() {
    if (!currentPdfBytes || !currentPdfBookId) return;

    const book = books.find((item) => item.id === currentPdfBookId);
    if (!book) return;

    const blob = new Blob([currentPdfBytes], { type: "application/pdf" });
    const fileName = (book.title || "MyLibra") + " - edited.pdf";

    book.file = new File([blob], fileName, { type: "application/pdf" });
    book.fileName = fileName;
    book.fileType = "PDF";

    try {
        await saveBookToDatabase(book);

        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        link.remove();
        setTimeout(() => URL.revokeObjectURL(url), 1000);

        alert("Đã lưu bản PDF chỉnh sửa và tải file xuống máy.");
    } catch (error) {
        console.error(error);
        alert("Không thể lưu PDF chỉnh sửa.");
    }
}

pdfPrev?.addEventListener("click", () => changePdfPage(-1));
pdfNext?.addEventListener("click", () => changePdfPage(1));
pdfZoomOut?.addEventListener("click", async () => {
    currentPdfScale = Math.max(0.6, currentPdfScale - 0.15);
    await renderPdfPage(currentPdfPage);
});
pdfZoomIn?.addEventListener("click", async () => {
    currentPdfScale = Math.min(3, currentPdfScale + 0.15);
    await renderPdfPage(currentPdfPage);
});
pdfRotate?.addEventListener("click", () => editPdfInMemory("rotate"));
pdfDeletePage?.addEventListener("click", async () => {
    if (confirm("Xóa trang PDF hiện tại?")) await editPdfInMemory("delete");
});
pdfAddText?.addEventListener("click", addPdfText);
pdfHighlight?.addEventListener("click", addPdfHighlight);
pdfSave?.addEventListener("click", saveEditedPdf);

async function openTxtReader(book) {
    try {
        const text = await book.file.text();
        if (pdfToolbar) pdfToolbar.hidden = true;
        readerContent.className = "reader-content";
        readerContent.innerHTML = "";
        readerContent.textContent = text;

        loadFontSize();

        setTimeout(() => {
            const saved = Number(localStorage.getItem("mylibra-position-" + book.id));
            window.scrollTo(0, Number.isFinite(saved) ? saved : 0);
            updateReaderProgress();
        }, 50);
    } catch (error) {
        console.error(error);
        alert("Không thể mở file TXT.");
    }
}

async function openEpubReader(book) {
    if (typeof ePub !== "function") {
        alert("Không tải được EPUB Reader. Hãy kiểm tra kết nối internet rồi tải lại trang.");
        return;
    }

    if (pdfToolbar) pdfToolbar.hidden = true;
    readerContent.className = "";
    readerContent.innerHTML = '<div class="epub-reader" id="epubViewer"></div>';

    const arrayBuffer = await book.file.arrayBuffer();

    try {
        currentEpub = ePub(arrayBuffer);

        currentRendition = currentEpub.renderTo("epubViewer", {
            width: "100%",
            height: "100%",
            flow: "scrolled-doc",
            spread: "none"
        });

        currentRendition.themes.default({
            body: {
                color: "var(--text)",
                background: "var(--surface)"
            }
        });

        const savedCfi = localStorage.getItem("mylibra-epub-cfi-" + book.id);

        currentRendition.on("relocated", async (location) => {
            if (location?.start?.cfi) {
                localStorage.setItem(
                    "mylibra-epub-cfi-" + book.id,
                    location.start.cfi
                );
            }

            if (location?.start?.percentage !== undefined) {
                const percentage = Math.round(location.start.percentage * 100);
                book.progress = Math.max(0, Math.min(100, percentage));
                await saveBookToDatabase(book);
                renderBooks();
            }
        });

        await currentEpub.ready;

        if (currentEpub.locations) {
            currentEpub.locations.generate(1600).catch(() => {});
        }

        if (savedCfi) {
            await currentRendition.display(savedCfi);
        } else {
            await currentRendition.display();
        }

        epubKeyHandler = (event) => {
            if (!currentRendition) return;
            if (event.key === "ArrowRight") currentRendition.next();
            if (event.key === "ArrowLeft") currentRendition.prev();
        };

        document.addEventListener("keyup", epubKeyHandler);
        applyReaderFontSize();
    } catch (error) {
        console.error(error);
        readerContent.innerHTML = "";
        readerContent.className = "reader-content";
        alert("Không thể mở EPUB. File có thể bị lỗi hoặc không hợp lệ.");
    }
}

/* ========================================
   EPUB EDITOR
======================================== */

function normalizeZipPath(path) {
    const parts = [];
    String(path || "").split("/").forEach((part) => {
        if (!part || part === ".") return;
        if (part === "..") parts.pop();
        else parts.push(part);
    });
    return parts.join("/");
}

function zipPathFromHref(basePath, href) {
    const cleanHref = String(href || "").split("#")[0].split("?")[0];
    const decoded = decodeURIComponent(cleanHref);
    const baseDir = basePath.includes("/") ? basePath.slice(0, basePath.lastIndexOf("/") + 1) : "";
    return normalizeZipPath(baseDir + decoded);
}

function parseContainerPath(xmlText) {
    const doc = new DOMParser().parseFromString(xmlText, "application/xml");
    return doc.querySelector("rootfile")?.getAttribute("full-path") || "";
}

function serializeXml(doc) {
    return new XMLSerializer().serializeToString(doc);
}

function getEpubMetadataText(opfDoc, localName) {
    const metadata = opfDoc.getElementsByTagName("metadata")[0];
    if (!metadata) return "";
    const node = Array.from(metadata.children).find((el) => el.localName === localName);
    return node?.textContent?.trim() || "";
}

function getEpubTitleFromDoc(doc, fallback) {
    const heading = doc.querySelector("h1,h2,h3");
    if (heading?.textContent?.trim()) return heading.textContent.trim();
    const title = doc.querySelector("title");
    if (title?.textContent?.trim()) return title.textContent.trim();
    return fallback;
}

function renderEpubChapterList() {
    if (!epubChapterList || !epubEditorState) return;
    epubChapterList.innerHTML = "";
    epubEditorState.chapters.forEach((chapter, index) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "epub-chapter-item" + (index === epubEditorState.currentIndex ? " active" : "");
        button.textContent = (index + 1) + ". " + chapter.title;
        button.addEventListener("click", () => selectEpubChapter(index));
        epubChapterList.appendChild(button);
    });
}

function saveCurrentEpubChapterToState() {
    if (!epubEditorState) return;
    const chapter = epubEditorState.chapters[epubEditorState.currentIndex];
    if (!chapter) return;
    chapter.title = epubChapterTitle.value.trim() || ("Chương " + (epubEditorState.currentIndex + 1));
    chapter.bodyHtml = epubContentEditor.innerHTML;
}

function selectEpubChapter(index) {
    if (!epubEditorState) return;
    saveCurrentEpubChapterToState();
    const chapter = epubEditorState.chapters[index];
    if (!chapter) return;
    epubEditorState.currentIndex = index;
    epubChapterTitle.value = chapter.title;
    epubContentEditor.innerHTML = chapter.bodyHtml || "";
    renderEpubChapterList();
}

function createNewEpubChapterDocument(title) {
    const safeTitle = escapeHTML(title);
    return '<?xml version="1.0" encoding="utf-8"?>' +
        '<html xmlns="http://www.w3.org/1999/xhtml"><head><meta charset="utf-8"/><title>' +
        safeTitle + '</title></head><body><h1>' + safeTitle +
        '</h1><p>Nhập nội dung chương mới...</p></body></html>';
}

async function openEpubEditor(bookId) {
    const book = books.find((item) => item.id === bookId);
    if (!book || book.fileType !== "EPUB" || !book.file) {
        alert("Hãy chọn một file EPUB để chỉnh sửa.");
        return;
    }
    if (typeof JSZip === "undefined") {
        alert("Không tải được EPUB Editor. Hãy kiểm tra kết nối internet rồi tải lại trang.");
        return;
    }

    try {
        const zip = await JSZip.loadAsync(await book.file.arrayBuffer());
        const containerFile = zip.file("META-INF/container.xml");
        if (!containerFile) throw new Error("EPUB thiếu META-INF/container.xml.");

        const opfPath = parseContainerPath(await containerFile.async("text"));
        const opfFile = zip.file(opfPath);
        if (!opfFile) throw new Error("Không tìm thấy file OPF.");

        const opfDoc = new DOMParser().parseFromString(await opfFile.async("text"), "application/xml");
        if (opfDoc.querySelector("parsererror")) throw new Error("OPF không hợp lệ.");

        const manifest = {};
        Array.from(opfDoc.getElementsByTagName("item")).forEach((item) => {
            const id = item.getAttribute("id");
            if (id) manifest[id] = item;
        });

        const spine = opfDoc.querySelector("spine");
        if (!spine) throw new Error("EPUB thiếu spine.");

        const chapters = [];
        for (const itemref of Array.from(spine.children)) {
            const idref = itemref.getAttribute("idref");
            const item = manifest[idref];
            if (!item) continue;
            const mediaType = item.getAttribute("media-type") || "";
            if (!/xhtml|html/i.test(mediaType)) continue;

            const href = item.getAttribute("href") || "";
            const zipPath = zipPathFromHref(opfPath, href);
            const file = zip.file(zipPath);
            if (!file) continue;

            const doc = new DOMParser().parseFromString(await file.async("text"), "application/xhtml+xml");
            const body = doc.querySelector("body");
            if (!body) continue;

            chapters.push({
                id:idref, href, zipPath, item, itemref,
                title:getEpubTitleFromDoc(doc, "Chương " + (chapters.length + 1)),
                bodyHtml:body.innerHTML
            });
        }

        if (!chapters.length) throw new Error("Không tìm thấy chương XHTML/HTML trong EPUB.");

        epubEditorState = {bookId, zip, opfPath, opfDoc, spine, manifest, chapters, currentIndex:0};
        epubBookTitle.value = getEpubMetadataText(opfDoc, "title") || book.title || "";
        epubBookAuthor.value = getEpubMetadataText(opfDoc, "creator") || book.author || "";

        openModal(epubEditorModal);
        selectEpubChapter(0);
    } catch (error) {
        console.error(error);
        epubEditorState = null;
        alert("Không thể mở EPUB để chỉnh sửa. File có thể dùng cấu trúc EPUB đặc biệt hoặc bị lỗi.");
    }
}

function updateEpubMetadata(opfDoc, localName, value) {
    const metadata = opfDoc.getElementsByTagName("metadata")[0];
    if (!metadata) return;
    let target = Array.from(metadata.children).find((el) => el.localName === localName);
    if (!target) {
        target = opfDoc.createElementNS("http://purl.org/dc/elements/1.1/", "dc:" + localName);
        metadata.appendChild(target);
    }
    target.textContent = value;
}

async function refreshEpubChapterDocument(chapter) {
    const file = epubEditorState.zip.file(chapter.zipPath);
    if (!file) return;
    const doc = new DOMParser().parseFromString(await file.async("text"), "application/xhtml+xml");
    const body = doc.querySelector("body");
    if (!body) return;

    body.innerHTML = chapter.bodyHtml || "";
    const titleEl = doc.querySelector("title");
    if (titleEl) titleEl.textContent = chapter.title;
    const heading = body.querySelector("h1,h2");
    if (heading) heading.textContent = chapter.title;

    epubEditorState.zip.file(chapter.zipPath, serializeXml(doc), {binary:false});
}

async function addEpubChapter() {
    if (!epubEditorState) return;
    saveCurrentEpubChapterToState();

    let counter = epubEditorState.chapters.length + 1;
    let fileName = "chapter-" + counter + ".xhtml";
    while (epubEditorState.zip.file(zipPathFromHref(epubEditorState.opfPath, fileName))) {
        counter += 1;
        fileName = "chapter-" + counter + ".xhtml";
    }

    const title = "Chương mới";
    const zipPath = zipPathFromHref(epubEditorState.opfPath, fileName);
    const id = "mylibra-chapter-" + Date.now();

    epubEditorState.zip.file(zipPath, createNewEpubChapterDocument(title), {binary:false});

    const item = epubEditorState.opfDoc.createElementNS("http://www.idpf.org/2007/opf", "item");
    item.setAttribute("id", id);
    item.setAttribute("href", fileName);
    item.setAttribute("media-type", "application/xhtml+xml");

    const itemref = epubEditorState.opfDoc.createElementNS("http://www.idpf.org/2007/opf", "itemref");
    itemref.setAttribute("idref", id);

    epubEditorState.opfDoc.querySelector("manifest").appendChild(item);
    epubEditorState.spine.appendChild(itemref);
    epubEditorState.manifest[id] = item;
    epubEditorState.chapters.push({id,href:fileName,zipPath,item,itemref,title,bodyHtml:"<h1>Chương mới</h1><p>Nhập nội dung chương mới...</p>"});

    selectEpubChapter(epubEditorState.chapters.length - 1);
}

function deleteEpubChapter() {
    if (!epubEditorState) return;
    if (epubEditorState.chapters.length <= 1) {
        alert("EPUB phải còn ít nhất 1 chương.");
        return;
    }

    const index = epubEditorState.currentIndex;
    const chapter = epubEditorState.chapters[index];
    if (!confirm('Xóa "' + chapter.title + '" khỏi EPUB?')) return;

    epubEditorState.zip.remove(chapter.zipPath);
    chapter.item.remove();
    chapter.itemref.remove();
    delete epubEditorState.manifest[chapter.id];
    epubEditorState.chapters.splice(index, 1);
    epubEditorState.currentIndex = Math.max(0, Math.min(index, epubEditorState.chapters.length - 1));

    selectEpubChapter(epubEditorState.currentIndex);
}

function moveEpubChapter(direction) {
    if (!epubEditorState) return;
    saveCurrentEpubChapterToState();

    const from = epubEditorState.currentIndex;
    const to = from + direction;
    if (to < 0 || to >= epubEditorState.chapters.length) return;

    const a = epubEditorState.chapters[from];
    const b = epubEditorState.chapters[to];

    if (direction < 0) epubEditorState.spine.insertBefore(a.itemref, b.itemref);
    else epubEditorState.spine.insertBefore(b.itemref, a.itemref);

    [epubEditorState.chapters[from], epubEditorState.chapters[to]] =
        [epubEditorState.chapters[to], epubEditorState.chapters[from]];

    epubEditorState.currentIndex = to;
    selectEpubChapter(to);
}

async function saveEpubEditorChanges() {
    if (!epubEditorState) return;

    try {
        saveCurrentEpubChapterToState();
        for (const chapter of epubEditorState.chapters) await refreshEpubChapterDocument(chapter);

        const title = epubBookTitle.value.trim() || "MyLibra";
        const author = epubBookAuthor.value.trim() || "Chưa rõ tác giả";
        updateEpubMetadata(epubEditorState.opfDoc, "title", title);
        updateEpubMetadata(epubEditorState.opfDoc, "creator", author);
        epubEditorState.zip.file(epubEditorState.opfPath, serializeXml(epubEditorState.opfDoc), {binary:false});

        const blob = await epubEditorState.zip.generateAsync({type:"blob",mimeType:"application/epub+zip",compression:"DEFLATE"});
        const book = books.find((item) => item.id === epubEditorState.bookId);
        if (!book) return;

        const fileName = title + " - edited.epub";
        book.file = new File([blob], fileName, {type:"application/epub+zip"});
        book.fileName = fileName;
        book.fileType = "EPUB";
        book.title = title;
        book.author = author;

        await saveBookToDatabase(book);

        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        link.remove();
        setTimeout(() => URL.revokeObjectURL(url), 1000);

        closeModal(epubEditorModal);
        epubEditorState = null;
        renderBooks();
        openBook(book.id);
        alert("Đã lưu EPUB mới vào MyLibra và tải file xuống máy.");
    } catch (error) {
        console.error(error);
        alert("Không thể xuất EPUB. Hãy thử lại với file EPUB khác.");
    }
}

closeEpubEditor?.addEventListener("click", () => {epubEditorState=null;closeModal(epubEditorModal);});
cancelEpubEditor?.addEventListener("click", () => {epubEditorState=null;closeModal(epubEditorModal);});
epubEditorModal?.addEventListener("click", (event) => {
    if (event.target === epubEditorModal) {epubEditorState=null;closeModal(epubEditorModal);}
});
epubAddChapter?.addEventListener("click", addEpubChapter);
epubDeleteChapter?.addEventListener("click", deleteEpubChapter);
epubMoveUp?.addEventListener("click", () => moveEpubChapter(-1));
epubMoveDown?.addEventListener("click", () => moveEpubChapter(1));
saveEpubEditor?.addEventListener("click", saveEpubEditorChanges);

function applyReaderFontSize() {
    const size = Number(localStorage.getItem("mylibra-font-size")) || 18;
    if (currentRendition) {
        currentRendition.themes.fontSize(size + "px");
    }
    if (readerContent.classList.contains("reader-content")) {
        readerContent.style.fontSize = size + "px";
    }
}

function loadFontSize() {
    const size = Number(localStorage.getItem("mylibra-font-size")) || 18;
    readerContent.style.fontSize = size + "px";
}

decreaseFont?.addEventListener("click", () => {
    const current = Number(localStorage.getItem("mylibra-font-size")) || 18;
    const next = Math.max(12, current - 1);
    localStorage.setItem("mylibra-font-size", next);
    applyReaderFontSize();
});

increaseFont?.addEventListener("click", () => {
    const current = Number(localStorage.getItem("mylibra-font-size")) || 18;
    const next = Math.min(40, current + 1);
    localStorage.setItem("mylibra-font-size", next);
    applyReaderFontSize();
});

backFromReader?.addEventListener("click", () => {
    if (epubKeyHandler) {
        document.removeEventListener("keyup", epubKeyHandler);
        epubKeyHandler = null;
    }

    if (currentRendition) {
        try { currentRendition.destroy(); } catch (_) {}
        currentRendition = null;
    }

    currentEpub = null;
    readerContent.innerHTML = "";
    readerContent.className = "reader-content";
    showLibrary();
    renderBooks();
});

function updateReaderProgress() {
    if (readerPage.hidden || !currentBookId) return;

    const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;

    const progress = totalHeight <= 0
        ? 0
        : Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100));

    readerProgressBar.style.width = progress + "%";

    const book = books.find((item) => item.id === currentBookId);

    if (book && book.fileType === "TXT") {
        book.progress = Math.round(progress);
        localStorage.setItem(
            "mylibra-position-" + book.id,
            String(window.scrollY)
        );
        saveBookToDatabase(book).catch(console.error);
    }
}

window.addEventListener("scroll", () => {
    if (!readerPage.hidden && books.find((book) => book.id === currentBookId)?.fileType === "TXT") {
        updateReaderProgress();
    }
});

function initializeMyLibra() {
    const savedTheme = localStorage.getItem("mylibra-theme");
    applyTheme(savedTheme === "dark" ? "dark" : "light");

    loadFontSize();

    loadBooksFromDatabase()
        .then((storedBooks) => {
            storedBooks.forEach((storedBook) => {
                const index = books.findIndex((book) => book.id === storedBook.id);
                if (index >= 0) books[index] = storedBook;
                else books.push(storedBook);
            });

            renderBooks();
            showLibrary();
        })
        .catch((error) => {
            console.error("Database error:", error);
            renderBooks();
            showLibrary();
        });
}

initializeMyLibra();
