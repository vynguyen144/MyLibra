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
        readerContent.innerHTML = `
            <div style="text-align:center;padding:80px 20px">
                <h2>PDF Reader</h2>
                <p>Phần đọc PDF sẽ được tích hợp ở bước tiếp theo.</p>
            </div>
        `;
        return;
    }

    alert("Định dạng file chưa được hỗ trợ.");
}

async function openPdfReader(book) {
    if (typeof pdfjsLib === "undefined") {
        alert("Không tải được PDF Reader. Hãy kiểm tra kết nối internet rồi tải lại trang.");
        return;
    }

    currentPdfBookId = book.id;
    currentPdfPage = Number(localStorage.getItem("mylibra-pdf-page-" + book.id)) || 1;
    currentPdfScale = Number(localStorage.getItem("mylibra-pdf-scale-" + book.id)) || 1.25;
    currentPdfRotation = 0;

    const bytes = await book.file.arrayBuffer();
    currentPdfBytes = bytes;

    try {
        pdfjsLib.GlobalWorkerOptions.workerSrc =
            "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

        currentPdf = await pdfjsLib.getDocument({ data: bytes.slice(0) }).promise;

        pdfToolbar.hidden = false;
        readerContent.className = "reader-content pdf-reader-content";
        readerContent.innerHTML = '<div class="pdf-canvas-wrap"><canvas id="pdfCanvas"></canvas></div>';

        currentPdfPage = Math.max(1, Math.min(currentPdfPage, currentPdf.numPages));
        await renderPdfPage(currentPdfPage);
    } catch (error) {
        console.error(error);
        pdfToolbar.hidden = true;
        readerContent.innerHTML = "";
        alert("Không thể mở PDF. File có thể bị lỗi hoặc không hợp lệ.");
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
