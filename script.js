// ========================================
// MyLibra - Library / Book Management / Reader
// ========================================

let books = [];

const $ = (id) => document.getElementById(id);

const homePage = $("homePage");
const homeFeatured = $("homeFeatured");
const homeRecommendations = $("homeRecommendations");
const homeReadingGrid = $("homeReadingGrid");
const homeReadingSection = $("homeReadingSection");
const homeEmpty = $("homeEmpty");
const homeTab = $("homeTab");
const libraryTab = $("libraryTab");
const homeSeeLibrary = $("homeSeeLibrary");
const homeAddBookButton = $("homeAddBookButton");

const libraryPage = $("libraryPage");
const bookDetailPage = $("bookDetailPage");
const bookDetail = $("bookDetail");
const readerPage = $("readerPage");
const bookGrid = $("bookGrid");
const allBookGrid = $("allBookGrid");
const emptyLibrary = $("emptyLibrary");
const searchInput = document.querySelector(".search-box input");
const librarySearch = $("librarySearch");
const genreFilterPicker = $("genreFilterPicker");
const genreFilterTrigger = $("genreFilterTrigger");
const genreFilterMenu = $("genreFilterMenu");
const tagFilterPicker = $("tagFilterPicker");
const tagFilterTrigger = $("tagFilterTrigger");
const tagFilterMenu = $("tagFilterMenu");
const clearFilters = $("clearFilters");

const addGenreTrigger = $("addGenreTrigger");
const addGenreMenu = $("addGenreMenu");
const addGenreChips = $("addGenreChips");
const addTagTrigger = $("addTagTrigger");
const addTagMenu = $("addTagMenu");
const addTagChips = $("addTagChips");

const editGenreTrigger = $("editGenreTrigger");
const editGenreMenu = $("editGenreMenu");
const editGenreChips = $("editGenreChips");
const editTagTrigger = $("editTagTrigger");
const editTagMenu = $("editTagMenu");
const editTagChips = $("editTagChips");
const themeButton = $("themeButton");
const homeButton = $("homeButton");
const settingsButton = $("settingsButton");
const googleLoginButton = $("googleLoginButton");
const googleAccountIcon = $("googleAccountIcon");
const googleAccountText = $("googleAccountText");
const googleSettingsAvatar = $("googleSettingsAvatar");
const googleSettingsName = $("googleSettingsName");
const googleSettingsEmail = $("googleSettingsEmail");
const googleSigninArea = $("googleSigninArea");
const googleLogoutButton = $("googleLogoutButton");
const googleDriveButton = $("googleDriveButton");
const googleDriveStatus = $("googleDriveStatus");
const settingsModal = $("settingsModal");
const closeSettings = $("closeSettings");
const saveSettings = $("saveSettings");
const resetSettings = $("resetSettings");
const settingShowReading = $("settingShowReading");
const settingSort = $("settingSort");
const settingConfirmDelete = $("settingConfirmDelete");
const settingReaderMode = $("settingReaderMode");
const settingFontSize = $("settingFontSize");
const settingLineHeight = $("settingLineHeight");

const addBookButton = $("addBookButton");
const emptyAddBookButton = $("emptyAddBookButton");
const readingListModal = $("readingListModal");
const closeReadingListModal = $("closeReadingListModal");
const cancelReadingList = $("cancelReadingList");
const saveReadingList = $("saveReadingList");
const readingListName = $("readingListName");
const createReadingListButton = $("createReadingListButton");
const readingListsGrid = $("readingListsGrid");
const readingListChooserModal = $("readingListChooserModal");
const closeReadingListChooser = $("closeReadingListChooser");
const cancelReadingListChooser = $("cancelReadingListChooser");
const readingListChooser = $("readingListChooser");
const readingListChooserBookName = $("readingListChooserBookName");

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
const readerModeScroll = $("readerModeScroll");
const readerModePage = $("readerModePage");
const readerPrev = $("readerPrev");
const readerNext = $("readerNext");
const readerEpubJump = $("readerEpubJump");
const readerChapterSelect = $("readerChapterSelect");

const editBookModal = $("editBookModal");
const closeEditBook = $("closeEditBook");
const cancelEditBook = $("cancelEditBook");
const saveEditBook = $("saveEditBook");
const editTitle = $("editTitle");
const editAuthor = $("editAuthor");
const editDescription = $("editDescription");
const editAvatar = $("editAvatar");
const editCover = $("editCover");
const addAvatar = $("addAvatar");
const addCover = $("addCover");

const pdfToolbar = $("pdfToolbar");
const pdfPrev = $("pdfPrev");
const pdfNext = $("pdfNext");
const pdfPageInfo = $("pdfPageInfo");
const pdfTocJump = $("pdfTocJump");
const pdfTocSelect = $("pdfTocSelect");
const pdfPageInput = $("pdfPageInput");
const pdfGoPage = $("pdfGoPage");
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
let currentListChooserBookId = null;
const READING_LISTS_KEY = "mylibra-reading-lists";
const READING_LIST_DELETED_KEY = "mylibra-reading-lists-deleted";

function loadReadingLists() {
    try {
        const parsed = JSON.parse(localStorage.getItem(READING_LISTS_KEY) || "[]");
        return Array.isArray(parsed) ? parsed : [];
    } catch (_) { return []; }
}
function saveReadingLists(lists) {
    localStorage.setItem(READING_LISTS_KEY, JSON.stringify(lists));
    scheduleDriveManifestSync();
}
function getReadingLists() { return loadReadingLists(); }
function getDeletedReadingLists() {
    try { return JSON.parse(localStorage.getItem(READING_LIST_DELETED_KEY) || "{}") || {}; }
    catch (_) { return {}; }
}
function saveDeletedReadingLists(value) {
    localStorage.setItem(READING_LIST_DELETED_KEY, JSON.stringify(value || {}));
}
function createReadingList(name) {
    const cleanName = String(name || "").trim();
    if (!cleanName) return null;
    const lists = getReadingLists();
    if (lists.some((list) => normalizeSearchText(list.name) === normalizeSearchText(cleanName))) {
        throw new Error("Tên danh sách này đã tồn tại.");
    }
    const now = Date.now();
    const list = {id:"list-"+now, name:cleanName, bookIds:[], createdAt:now, updatedAt:now};
    lists.push(list);
    saveReadingLists(lists);
    return list;
}
function toggleBookInReadingList(listId, bookId) {
    const lists = getReadingLists();
    const list = lists.find((item) => item.id === listId);
    if (!list) return;
    list.bookIds = Array.isArray(list.bookIds) ? list.bookIds : [];
    list.bookIds = list.bookIds.includes(bookId)
        ? list.bookIds.filter((id) => id !== bookId)
        : [...list.bookIds, bookId];
    list.updatedAt = Date.now();
    saveReadingLists(lists);
    renderReadingLists();
    renderReadingListChooser();
}
function removeBookFromReadingLists(bookId) {
    const lists = getReadingLists();
    let changed = false;
    lists.forEach((list) => {
        const next = (list.bookIds || []).filter((id) => id !== bookId);
        if (next.length !== (list.bookIds || []).length) {
            list.bookIds = next; list.updatedAt = Date.now(); changed = true;
        }
    });
    if (changed) saveReadingLists(lists);
}
function deleteReadingList(listId) {
    const deleted = getDeletedReadingLists();
    deleted[listId] = Date.now();
    saveDeletedReadingLists(deleted);
    saveReadingLists(getReadingLists().filter((list) => list.id !== listId));
    renderReadingLists();
}
function renderReadingLists() {
    if (!readingListsGrid) return;
    const lists = getReadingLists();
    if (!lists.length) {
        readingListsGrid.innerHTML = '<div class="reading-list-empty"><span>📑</span><strong>Chưa có danh sách đọc</strong><small>Tạo một danh sách để gom những truyện muốn đọc cùng nhau.</small></div>';
        return;
    }
    readingListsGrid.innerHTML = lists.map((list) => {
        const listBooks = (list.bookIds || []).map((id) => books.find((book) => book.id === id)).filter(Boolean);
        const preview = listBooks.slice(0,5).map((book) =>
            '<button class="reading-list-book" type="button" data-book-id="'+escapeHTML(book.id)+'" title="'+escapeHTML(book.title)+'">'+createAvatarMarkup(book)+'</button>'
        ).join("");
        return '<article class="reading-list-card"><div class="reading-list-card-head"><div><h3>'+escapeHTML(list.name)+'</h3><span>'+listBooks.length+' truyện</span></div><button class="list-delete-button" type="button" data-list-id="'+escapeHTML(list.id)+'" title="Xóa danh sách">×</button></div><div class="reading-list-preview">'+(preview || '<div class="reading-list-no-books">Chưa có truyện<br><small>Mở một truyện để thêm vào danh sách.</small></div>')+'</div><button class="text-button reading-list-open" type="button" data-list-id="'+escapeHTML(list.id)+'">Xem danh sách →</button></article>';
    }).join("");
    readingListsGrid.querySelectorAll(".reading-list-book").forEach((button) => button.addEventListener("click", () => openBook(button.dataset.bookId)));
    readingListsGrid.querySelectorAll(".list-delete-button").forEach((button) => button.addEventListener("click", () => {
        const list = getReadingLists().find((item) => item.id === button.dataset.listId);
        if (list && confirm('Xóa danh sách "'+list.name+'"? Các truyện vẫn được giữ trong thư viện.')) deleteReadingList(list.id);
    }));
    readingListsGrid.querySelectorAll(".reading-list-open").forEach((button) => button.addEventListener("click", () => showReadingList(button.dataset.listId)));
}
function showReadingList(listId) {
    const list = getReadingLists().find((item) => item.id === listId);
    if (!list) return;
    selectedFilterGenres = []; selectedFilterTags = [];
    if (searchInput) searchInput.value = "";
    updateFilterOptions();
    const listBooks = (list.bookIds || []).map((id) => books.find((book) => book.id === id)).filter(Boolean);
    setMainTab("library");
    renderBooks(listBooks);
    document.querySelector(".reading-lists-section")?.scrollIntoView({behavior:"smooth",block:"start"});
}
function renderReadingListChooser() {
    if (!readingListChooser || !currentListChooserBookId) return;
    const lists = getReadingLists();
    if (!lists.length) {
        readingListChooser.innerHTML = '<div class="reading-list-empty compact"><span>📑</span><strong>Chưa có danh sách</strong><small>Hãy tạo danh sách trước.</small></div>';
        return;
    }
    readingListChooser.innerHTML = lists.map((list) => {
        const checked = (list.bookIds || []).includes(currentListChooserBookId);
        return '<button class="reading-list-choice '+(checked?'selected':'')+'" type="button" data-list-id="'+escapeHTML(list.id)+'"><span>'+(checked?'✓':'＋')+'</span><strong>'+escapeHTML(list.name)+'</strong><small>'+((list.bookIds||[]).length)+' truyện</small></button>';
    }).join("");
    readingListChooser.querySelectorAll(".reading-list-choice").forEach((button) => button.addEventListener("click", () => toggleBookInReadingList(button.dataset.listId,currentListChooserBookId)));
}
function openReadingListChooser(bookId) {
    const book = books.find((item) => item.id === bookId);
    if (!book) return;
    currentListChooserBookId = bookId;
    if (readingListChooserBookName) readingListChooserBookName.textContent = "Chọn những danh sách muốn thêm “"+book.title+"” vào.";
    renderReadingListChooser();
    openModal(readingListChooserModal);
}
let updateFileBookId = null;
let currentRendition = null;
let currentPdf = null;
let currentPdfBytes = null;
let currentPdfBookId = null;
let currentPdfPage = 1;
let currentPdfScale = 1.25;
let currentPdfRotation = 0;
let currentPdfRenderTask = null;
let pdfOutlineItems = [];
let currentEpub = null;
let epubKeyHandler = null;
let epubChapterOptions = [];
let epubEditorState = null;
let readerMode = localStorage.getItem("mylibra-reader-mode") || "scroll";

const DB_NAME = "MyLibraDB";
const DB_VERSION = 1;
const STORE_NAME = "books";

// ========================================
// GOOGLE ACCOUNT + GOOGLE DRIVE SYNC
// ========================================
const GOOGLE_CLIENT_ID = "1038644762549-s4dt1lvr26bg9murlf6ne3k6oui7iedp.apps.googleusercontent.com";
const GOOGLE_PROFILE_KEY = "mylibra-google-profile";
const GOOGLE_DRIVE_SCOPE = "https://www.googleapis.com/auth/drive.file";
const DRIVE_FOLDER_KEY = "mylibra-drive-folder-id";
const DRIVE_MANIFEST_KEY = "mylibra-drive-manifest-id";
const DRIVE_DELETED_KEY = "mylibra-drive-deleted-books";
const DRIVE_SETTINGS_UPDATED_KEY = "mylibra-drive-settings-updated";
const DRIVE_POSITIONS_UPDATED_KEY = "mylibra-drive-positions-updated";
let googleDriveAccessToken = null;
let googleDriveTokenClient = null;
let googleDriveSyncTimer = null;
let googleDriveSyncInProgress = false;

function decodeGoogleJwt(token) {
    try {
        const payload = token.split(".")[1];
        const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
        const json = decodeURIComponent(
            atob(normalized)
                .split("")
                .map((char) => "%" + ("00" + char.charCodeAt(0).toString(16)).slice(-2))
                .join("")
        );
        return JSON.parse(json);
    } catch (error) {
        console.error("Không đọc được Google ID token:", error);
        return null;
    }
}

function saveGoogleProfile(profile) {
    if (!profile) return;
    const safeProfile = {
        sub: profile.sub || "",
        name: profile.name || "Tài khoản Google",
        email: profile.email || "",
        picture: profile.picture || ""
    };
    localStorage.setItem(GOOGLE_PROFILE_KEY, JSON.stringify(safeProfile));
    renderGoogleAccount(safeProfile);
}

function getGoogleProfile() {
    try {
        return JSON.parse(localStorage.getItem(GOOGLE_PROFILE_KEY) || "null");
    } catch (_) {
        return null;
    }
}

function renderGoogleAccount(profile = getGoogleProfile()) {
    if (!profile) {
        if (googleAccountIcon) googleAccountIcon.textContent = "G";
        if (googleAccountText) googleAccountText.textContent = "Đăng nhập";
        if (googleSettingsAvatar) googleSettingsAvatar.textContent = "G";
        if (googleSettingsName) googleSettingsName.textContent = "Chưa đăng nhập";
        if (googleSettingsEmail) googleSettingsEmail.textContent = "Đăng nhập Google để chuẩn bị đồng bộ thư viện.";
        if (googleLogoutButton) googleLogoutButton.hidden = true;
        return;
    }

    const initial = (profile.name || profile.email || "G").trim().charAt(0).toUpperCase();
    if (googleAccountIcon) {
        if (profile.picture) googleAccountIcon.innerHTML = '<img src="' + escapeHTML(profile.picture) + '" alt="">';
        else googleAccountIcon.textContent = initial;
    }
    if (googleAccountText) googleAccountText.textContent = profile.picture ? "" : "Đã đăng nhập";
    if (googleLoginButton) {
        googleLoginButton.classList.toggle("has-google-avatar", Boolean(profile.picture));
        googleLoginButton.title = profile.name ? "Tài khoản Google: " + profile.name : "Tài khoản Google";
        googleLoginButton.setAttribute("aria-label", profile.name ? "Tài khoản Google: " + profile.name : "Tài khoản Google");
    }
    if (googleSettingsAvatar) {
        if (profile.picture) googleSettingsAvatar.innerHTML = '<img src="' + escapeHTML(profile.picture) + '" alt="">';
        else googleSettingsAvatar.textContent = initial;
    }
    if (googleSettingsName) googleSettingsName.textContent = profile.name || "Tài khoản Google";
    if (googleSettingsEmail) googleSettingsEmail.textContent = profile.email || "";
    if (googleLogoutButton) googleLogoutButton.hidden = false;
}

function handleGoogleCredentialResponse(response) {
    const profile = decodeGoogleJwt(response.credential);
    if (!profile) {
        alert("Không thể đọc thông tin tài khoản Google.");
        return;
    }
    saveGoogleProfile(profile);
    closeModal(settingsModal);
    alert("Đăng nhập Google thành công! Bấm “Đồng bộ Google Drive” để đồng bộ thư viện.");
}

function startGoogleSignIn() {
    if (GOOGLE_CLIENT_ID.startsWith("YOUR_")) {
        alert("MyLibra chưa được cấu hình Google Client ID.");
        return;
    }
    if (!window.google?.accounts?.id) {
        alert("Google Sign-In chưa tải xong. Hãy thử tải lại trang.");
        return;
    }

    window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleGoogleCredentialResponse,
        auto_select: false
    });

    if (googleSigninArea) {
        googleSigninArea.innerHTML = "";
        window.google.accounts.id.renderButton(googleSigninArea, {
            type: "standard",
            theme: document.body.classList.contains("dark-mode") ? "filled_black" : "outline",
            size: "large",
            text: "signin_with",
            shape: "rectangular",
            logo_alignment: "left"
        });
    }

    window.google.accounts.id.prompt();
}

function setGoogleDriveStatus(message, connected = false) {
    if (!googleDriveStatus) return;
    googleDriveStatus.textContent = message;
    googleDriveStatus.classList.toggle("drive-connected", connected);
    if (googleDriveButton) {
        googleDriveButton.textContent = connected ? "☁️ Đồng bộ Google Drive" : "☁️ Kết nối Google Drive";
    }
}

async function driveRequest(url, options = {}) {
    if (!googleDriveAccessToken) throw new Error("Chưa có quyền truy cập Google Drive.");

    const { rawResponse = false, ...fetchOptions } = options;
    const response = await fetch(url, {
        ...fetchOptions,
        headers: {
            ...(fetchOptions.headers || {}),
            Authorization: "Bearer " + googleDriveAccessToken
        }
    });

    if (!response.ok) {
        const text = await response.text().catch(() => "");
        throw new Error("Google Drive API " + response.status + ": " + (text || response.statusText));
    }

    if (rawResponse) return response;
    const type = response.headers.get("content-type") || "";
    return type.includes("application/json") ? response.json() : response;
}

async function ensureDriveFolder() {
    const savedId = localStorage.getItem(DRIVE_FOLDER_KEY);
    if (savedId) {
        try {
            await driveRequest("https://www.googleapis.com/drive/v3/files/" + encodeURIComponent(savedId) + "?fields=id,name,mimeType");
            return savedId;
        } catch (_) {
            localStorage.removeItem(DRIVE_FOLDER_KEY);
        }
    }

    const q = encodeURIComponent("name = 'MyLibra' and mimeType = 'application/vnd.google-apps.folder' and trashed = false");
    const found = await driveRequest("https://www.googleapis.com/drive/v3/files?q=" + q + "&spaces=drive&fields=files(id,name,mimeType)&pageSize=10");
    if (found.files?.length) {
        localStorage.setItem(DRIVE_FOLDER_KEY, found.files[0].id);
        return found.files[0].id;
    }

    const created = await driveRequest("https://www.googleapis.com/drive/v3/files?fields=id,name", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({name:"MyLibra", mimeType:"application/vnd.google-apps.folder"})
    });
    localStorage.setItem(DRIVE_FOLDER_KEY, created.id);
    return created.id;
}

function readJsonLocalStorage(key, fallback = {}) {
    try {
        const value = JSON.parse(localStorage.getItem(key) || "null");
        return value && typeof value === "object" ? value : fallback;
    } catch (_) {
        return fallback;
    }
}

function getDeletedBooks() {
    return readJsonLocalStorage(DRIVE_DELETED_KEY, {});
}

function saveDeletedBooks(value) {
    localStorage.setItem(DRIVE_DELETED_KEY, JSON.stringify(value || {}));
}

function markBookDeleted(id, deletedAt = Date.now(), driveFileId = "") {
    const deleted = getDeletedBooks();
    deleted[id] = {deletedAt, driveFileId: driveFileId || ""};
    saveDeletedBooks(deleted);
}

function clearBookDeleted(id) {
    const deleted = getDeletedBooks();
    if (deleted[id]) {
        delete deleted[id];
        saveDeletedBooks(deleted);
    }
}

function getCloudSettings() {
    return {
        theme: localStorage.getItem("mylibra-theme") || "light",
        featuredBookId: localStorage.getItem("mylibra-featured-book") || "",
        showReading: localStorage.getItem("mylibra-show-reading") !== "false",
        sort: localStorage.getItem("mylibra-sort") || "added",
        confirmDelete: localStorage.getItem("mylibra-confirm-delete") !== "false",
        readerMode: localStorage.getItem("mylibra-reader-mode") || "scroll",
        fontSize: localStorage.getItem("mylibra-font-size") || "18",
        lineHeight: localStorage.getItem("mylibra-line-height") || "1.9"
    };
}

function markCloudSettingsChanged() {
    localStorage.setItem(DRIVE_SETTINGS_UPDATED_KEY, String(Date.now()));
}

function getCloudReadingPositions() {
    const positions = {};
    for (let i = 0; i < localStorage.length; i += 1) {
        const key = localStorage.key(i);
        if (!key) continue;
        if (
            key.startsWith("mylibra-position-") ||
            key.startsWith("mylibra-epub-cfi-") ||
            key.startsWith("mylibra-pdf-page-") ||
            key.startsWith("mylibra-pdf-scale-")
        ) {
            positions[key] = localStorage.getItem(key);
        }
    }
    return positions;
}

function markCloudPositionsChanged() {
    localStorage.setItem(DRIVE_POSITIONS_UPDATED_KEY, String(Date.now()));
}

function applyCloudSettings(settings) {
    if (!settings || typeof settings !== "object") return;
    if (settings.theme) applyTheme(settings.theme, false);
    if (settings.featuredBookId) localStorage.setItem("mylibra-featured-book", settings.featuredBookId);
    if (settings.showReading !== undefined) localStorage.setItem("mylibra-show-reading", String(settings.showReading));
    if (settings.sort) localStorage.setItem("mylibra-sort", settings.sort);
    if (settings.confirmDelete !== undefined) localStorage.setItem("mylibra-confirm-delete", String(settings.confirmDelete));
    if (settings.readerMode) localStorage.setItem("mylibra-reader-mode", settings.readerMode);
    if (settings.fontSize) localStorage.setItem("mylibra-font-size", String(settings.fontSize));
    if (settings.lineHeight) localStorage.setItem("mylibra-line-height", String(settings.lineHeight));

    readerMode = settings.readerMode === "page" ? "page" : "scroll";
    loadSettingsUI();
    loadFontSize();
    applyReaderLineHeight();
}

function applyCloudReadingPositions(positions) {
    if (!positions || typeof positions !== "object") return;
    Object.entries(positions).forEach(([key, value]) => {
        if (!key.startsWith("mylibra-")) return;
        localStorage.setItem(key, String(value));
    });
}

function getBookCloudMetadata(book) {
    return {
        id: book.id,
        title: book.title || "",
        author: book.author || "",
        genre: Array.isArray(book.genre) ? [...book.genre] : book.genre || [],
        tags: Array.isArray(book.tags) ? [...book.tags] : book.tags || [],
        description: book.description || "",
        progress: Number(book.progress) || 0,
        icon: book.icon || "📖",
        fileName: book.fileName || "",
        fileType: book.fileType || "",
        imageDataVersion: 2,
        avatarDataUrl: book.avatarDataUrl || "",
        coverDataUrl: book.coverDataUrl || "",
        driveFileId: book.driveFileId || "",
        fileUpdatedAt: Number(book.fileUpdatedAt) || 0,
        driveFileUpdatedAt: Number(book.driveFileUpdatedAt) || 0,
        updatedAt: Number(book.updatedAt) || Date.now()
    };
}

async function uploadDriveFile(file, existingId = null) {
    const folderId = await ensureDriveFolder();
    const mimeType = file.type || "application/octet-stream";
    const endpoint = existingId
        ? "https://www.googleapis.com/upload/drive/v3/files/" + encodeURIComponent(existingId) + "?uploadType=resumable"
        : "https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable";
    const metadata = {name:file.name || "MyLibra file", mimeType};
    if (!existingId) metadata.parents = [folderId];

    const init = await driveRequest(endpoint, {
        rawResponse: true,
        method: existingId ? "PATCH" : "POST",
        headers: {
            "Content-Type":"application/json; charset=UTF-8",
            "X-Upload-Content-Type":mimeType,
            "X-Upload-Content-Length":String(file.size)
        },
        body:JSON.stringify(metadata)
    });
    const sessionUrl = init.headers.get("Location");
    if (!sessionUrl) throw new Error("Google Drive không trả về URL tải lên.");

    const uploadResponse = await fetch(sessionUrl, {
        method:"PUT",
        headers: {"Content-Type": mimeType},
        body:file
    });
    if (!uploadResponse.ok) throw new Error("Tải file lên Google Drive thất bại: " + uploadResponse.status);
    return uploadResponse.json();
}

async function uploadBookToDrive(book) {
    if (!googleDriveAccessToken || !book?.file) return;
    const now = Date.now();
    const result = await uploadDriveFile(book.file, book.driveFileId || null);
    book.driveFileId = result.id;
    book.fileUpdatedAt = Number(book.fileUpdatedAt) || now;
    book.driveFileUpdatedAt = now;
    await saveBookToDatabase(book, {touch:false});
}

async function downloadBookFromDrive(book) {
    if (!googleDriveAccessToken || !book?.driveFileId) return null;
    const response = await driveRequest("https://www.googleapis.com/drive/v3/files/" + encodeURIComponent(book.driveFileId) + "?alt=media");
    const blob = await response.blob();
    const fileName = book.fileName || book.title || "MyLibra";
    return new File([blob], fileName, {
        type: blob.type || (book.fileType === "EPUB" ? "application/epub+zip" : book.fileType === "PDF" ? "application/pdf" : "text/plain")
    });
}

async function requestGoogleDriveAccess(prompt = "") {
    if (googleDriveAccessToken) return googleDriveAccessToken;
    if (!window.google?.accounts?.oauth2) throw new Error("Google Identity Services chưa tải xong.");

    return new Promise((resolve, reject) => {
        const tokenClient = window.google.accounts.oauth2.initTokenClient({
            client_id: GOOGLE_CLIENT_ID,
            scope: GOOGLE_DRIVE_SCOPE,
            callback: (tokenResponse) => {
                if (tokenResponse.error || !tokenResponse.access_token) {
                    reject(new Error(tokenResponse.error || "Không cấp được quyền Google Drive."));
                    return;
                }
                googleDriveAccessToken = tokenResponse.access_token;
                googleDriveTokenClient = tokenClient;
                localStorage.setItem("mylibra-drive-authorized", "true");
                resolve(googleDriveAccessToken);
            }
        });
        googleDriveTokenClient = tokenClient;
        try {
            tokenClient.requestAccessToken({prompt});
        } catch (error) {
            reject(error);
        }
    });
}

async function deleteDriveFile(fileId) {
    if (!fileId || !googleDriveAccessToken) return;
    const response = await fetch("https://www.googleapis.com/drive/v3/files/" + encodeURIComponent(fileId), {
        method:"DELETE",
        headers:{Authorization:"Bearer " + googleDriveAccessToken}
    });
    if (!response.ok && response.status !== 404) {
        throw new Error("Không thể xóa file khỏi Google Drive (HTTP " + response.status + ").");
    }
}

async function saveDriveManifest() {
    if (!googleDriveAccessToken) return;
    const folderId = await ensureDriveFolder();
    const settingsUpdatedAt = Number(localStorage.getItem(DRIVE_SETTINGS_UPDATED_KEY)) || 0;
    const positionsUpdatedAt = Number(localStorage.getItem(DRIVE_POSITIONS_UPDATED_KEY)) || 0;
    const deletedBooks = getDeletedBooks();

    const manifest = {
        version: 2,
        updatedAt: Date.now(),
        settings: getCloudSettings(),
        settingsUpdatedAt,
        positions: getCloudReadingPositions(),
        positionsUpdatedAt,
        readingLists: getReadingLists(),
        deletedReadingLists: getDeletedReadingLists(),
        deletedBooks,
        books: books.map(getBookCloudMetadata)
    };

    const existingId = localStorage.getItem(DRIVE_MANIFEST_KEY);
    const metadata = {name:"mylibra-library.json", mimeType:"application/json"};
    if (!existingId) metadata.parents = [folderId];

    const url = existingId
        ? "https://www.googleapis.com/upload/drive/v3/files/" + encodeURIComponent(existingId) + "?uploadType=multipart"
        : "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart";
    const boundary = "mylibra_manifest_" + Date.now();
    const body = new Blob([
        "--" + boundary + "\r\n",
        "Content-Type: application/json; charset=UTF-8\r\n\r\n",
        JSON.stringify(metadata),
        "\r\n--" + boundary + "\r\n",
        "Content-Type: application/json\r\n\r\n",
        JSON.stringify(manifest),
        "\r\n--" + boundary + "--"
    ]);

    const response = await fetch(url, {
        method:existingId ? "PATCH" : "POST",
        headers:{
            Authorization:"Bearer " + googleDriveAccessToken,
            "Content-Type":"multipart/related; boundary=" + boundary
        },
        body
    });
    if (!response.ok) throw new Error("Không thể cập nhật thư viện MyLibra trên Google Drive.");
    const result = await response.json();
    if (result.id) localStorage.setItem(DRIVE_MANIFEST_KEY, result.id);
}

function scheduleDriveManifestSync() {
    if (!googleDriveAccessToken || googleDriveSyncInProgress) return;
    clearTimeout(googleDriveSyncTimer);
    googleDriveSyncTimer = setTimeout(async () => {
        try {
            await syncToGoogleDrive();
        } catch (error) {
            console.error("Drive background sync:", error);
            setGoogleDriveStatus("Đã kết nối nhưng chưa đồng bộ xong. Hãy bấm đồng bộ lại.", true);
        }
    }, 1200);
}

async function findDriveManifest(folderId) {
    const q = encodeURIComponent("'" + folderId + "' in parents and name = 'mylibra-library.json' and trashed = false");
    const result = await driveRequest("https://www.googleapis.com/drive/v3/files?q=" + q + "&spaces=drive&fields=files(id,name)&pageSize=10");
    return result.files?.[0] || null;
}

function removeLocalBookData(bookId) {
    localStorage.removeItem("mylibra-position-" + bookId);
    localStorage.removeItem("mylibra-epub-cfi-" + bookId);
    localStorage.removeItem("mylibra-pdf-page-" + bookId);
    localStorage.removeItem("mylibra-pdf-scale-" + bookId);
}

async function syncToGoogleDrive() {
    if (!googleDriveAccessToken || googleDriveSyncInProgress) return;
    googleDriveSyncInProgress = true;
    try {
        const folderId = await ensureDriveFolder();
        let manifestId = localStorage.getItem(DRIVE_MANIFEST_KEY);
        if (!manifestId) {
            const found = await findDriveManifest(folderId);
            if (found) {
                manifestId = found.id;
                localStorage.setItem(DRIVE_MANIFEST_KEY, manifestId);
            }
        }

        let remoteManifest = null;
        if (manifestId) {
            try {
                remoteManifest = await driveRequest(
                    "https://www.googleapis.com/drive/v3/files/" + encodeURIComponent(manifestId) + "?alt=media"
                );
            } catch (_) {
                localStorage.removeItem(DRIVE_MANIFEST_KEY);
                manifestId = null;
            }
        }

        if (!remoteManifest) {
            setGoogleDriveStatus("Đang tạo thư viện Google Drive…", true);
            for (const book of books) {
                if (book.file && (!book.driveFileId || Number(book.fileUpdatedAt) > Number(book.driveFileUpdatedAt || 0))) {
                    await uploadBookToDrive(book);
                }
            }
            await saveDriveManifest();
            setGoogleDriveStatus("Đã đồng bộ Google Drive.", true);
            return;
        }

        const remoteBooks = Array.isArray(remoteManifest.books) ? remoteManifest.books : [];
        const remoteById = new Map(remoteBooks.map((book) => [book.id, book]));
        const remoteDeleted = remoteManifest.deletedBooks && typeof remoteManifest.deletedBooks === "object"
            ? remoteManifest.deletedBooks : {};
        const localDeleted = getDeletedBooks();

        // Settings and reading positions are synced as their own small state bundles.
        const remoteSettingsUpdatedAt = Number(remoteManifest.settingsUpdatedAt) || 0;
        const localSettingsUpdatedAt = Number(localStorage.getItem(DRIVE_SETTINGS_UPDATED_KEY)) || 0;
        if (remoteSettingsUpdatedAt > localSettingsUpdatedAt && remoteManifest.settings) {
            applyCloudSettings(remoteManifest.settings);
            localStorage.setItem(DRIVE_SETTINGS_UPDATED_KEY, String(remoteSettingsUpdatedAt));
        } else if (localSettingsUpdatedAt > remoteSettingsUpdatedAt) {
            // The final manifest write below will publish the newer local settings.
        }

        const remotePositionsUpdatedAt = Number(remoteManifest.positionsUpdatedAt) || 0;
        const localPositionsUpdatedAt = Number(localStorage.getItem(DRIVE_POSITIONS_UPDATED_KEY)) || 0;
        if (remotePositionsUpdatedAt > localPositionsUpdatedAt && remoteManifest.positions) {
            applyCloudReadingPositions(remoteManifest.positions);
            localStorage.setItem(DRIVE_POSITIONS_UPDATED_KEY, String(remotePositionsUpdatedAt));
        }

        // Reading lists use per-list timestamps so both devices can keep independent lists.
        const remoteLists = Array.isArray(remoteManifest.readingLists) ? remoteManifest.readingLists : [];
        const remoteDeletedLists = remoteManifest.deletedReadingLists && typeof remoteManifest.deletedReadingLists === "object" ? remoteManifest.deletedReadingLists : {};
        const localDeletedLists = getDeletedReadingLists();
        Object.entries(remoteDeletedLists).forEach(([id, deletedAt]) => {
            if ((Number(deletedAt)||0) > (Number(localDeletedLists[id])||0)) localDeletedLists[id] = Number(deletedAt)||0;
        });
        const localLists = getReadingLists();
        const localListById = new Map(localLists.map((list) => [list.id, list]));
        remoteLists.forEach((remoteList) => {
            const localList = localListById.get(remoteList.id);
            if (!localList || Number(remoteList.updatedAt || 0) > Number(localList.updatedAt || 0)) {
                localListById.set(remoteList.id, remoteList);
            }
        });
        const mergedLists = [...localListById.values()].filter((list) => list && list.name && (Number(localDeletedLists[list.id])||0) < (Number(list.updatedAt)||0));
        saveDeletedReadingLists(localDeletedLists);
        if (JSON.stringify(mergedLists) !== JSON.stringify(localLists)) {
            localStorage.setItem(READING_LISTS_KEY, JSON.stringify(mergedLists));
            renderReadingLists();
        }

        // 1) Apply remote deletions only when they are newer than the local book.
        for (const [id, tombstone] of Object.entries(remoteDeleted)) {
            const local = books.find((book) => book.id === id);
            const deletedAt = Number(tombstone?.deletedAt) || 0;
            if (local && deletedAt > Number(local.updatedAt || 0)) {
                await deleteBookFromDatabase(id);
                books = books.filter((book) => book.id !== id);
                removeLocalBookData(id);
                localDeleted[id] = tombstone;
            }
        }

        // 2) Merge books by last modification time. Newer side wins.
        for (const remoteBook of remoteBooks) {
            const local = books.find((item) => item.id === remoteBook.id);
            const localDeletedAt = Number(localDeleted[remoteBook.id]?.deletedAt) || 0;
            const remoteUpdatedAt = Number(remoteBook.updatedAt) || 0;

            if (localDeletedAt > remoteUpdatedAt && !local) continue;

            if (!local) {
                if (localDeletedAt > remoteUpdatedAt) continue;
                const cloudBook = normalizeBookImages({...remoteBook, file:null});
                books.push(cloudBook);
                clearBookDeleted(cloudBook.id);
                await saveBookToDatabase(cloudBook, {touch:false});
                continue;
            }

            const localUpdatedAt = Number(local.updatedAt) || 0;
            if (remoteUpdatedAt > localUpdatedAt) {
                const localFile = local.file;
                const sameDriveFile = Boolean(local.driveFileId && local.driveFileId === remoteBook.driveFileId);
                const localFileIsCurrent = sameDriveFile &&
                    Number(local.fileUpdatedAt || 0) >= Number(remoteBook.fileUpdatedAt || 0);

                Object.assign(local, normalizeBookImages({...remoteBook}));
                local.file = localFileIsCurrent ? localFile : null;
                await saveBookToDatabase(local, {touch:false});
            }
        }

        // 3) Upload local-only/newer books and resolve local tombstones.
        for (const book of books) {
            const remoteBook = remoteById.get(book.id);
            const remoteUpdatedAt = Number(remoteBook?.updatedAt) || 0;
            const localUpdatedAt = Number(book.updatedAt) || 0;
            const deletedAt = Number(localDeleted[book.id]?.deletedAt) || 0;

            if (deletedAt > remoteUpdatedAt && !remoteBook) {
                continue;
            }

            if (deletedAt > remoteUpdatedAt && remoteBook) {
                if (remoteBook.driveFileId) await deleteDriveFile(remoteBook.driveFileId);
                continue;
            }

            const localIsNewer = !remoteBook || localUpdatedAt > remoteUpdatedAt;
            const fileIsNewer = Boolean(
                book.file &&
                (!remoteBook?.driveFileId || Number(book.fileUpdatedAt || 0) > Number(remoteBook.fileUpdatedAt || 0))
            );

            if (book.file && (localIsNewer || fileIsNewer || !book.driveFileId)) {
                await uploadBookToDrive(book);
            }
            clearBookDeleted(book.id);
        }

        // 4) Rebuild the local tombstone set and upload the merged manifest.
        saveDeletedBooks(localDeleted);
        updateFilterOptions();
        renderBooks(getFilteredBooks());

        await saveDriveManifest();
        setGoogleDriveStatus("Đã đồng bộ Google Drive.", true);
    } finally {
        googleDriveSyncInProgress = false;
    }
}

async function syncFromGoogleDrive() {
    return syncToGoogleDrive();
}

async function connectGoogleDrive() {
    if (!getGoogleProfile()) {
        alert("Hãy đăng nhập Google trước rồi kết nối Google Drive.");
        return;
    }
    if (!window.google?.accounts?.oauth2) {
        alert("Google Identity Services chưa tải xong. Hãy tải lại trang.");
        return;
    }

    try {
        setGoogleDriveStatus("Đang kết nối Google Drive…", true);
        await requestGoogleDriveAccess(localStorage.getItem("mylibra-drive-authorized") ? "" : "consent");
        await syncToGoogleDrive();
    } catch (error) {
        console.error("MyLibra Google Drive:", error);
        setGoogleDriveStatus("Đã kết nối nhưng đồng bộ gặp lỗi. Hãy thử lại.", true);
        alert("Google Drive gặp lỗi:\n\n" + (error?.message || String(error)));
    }
}

googleDriveButton?.addEventListener("click", connectGoogleDrive);

function logoutGoogle() {
    const profile = getGoogleProfile();
    if (profile?.sub && window.google?.accounts?.id) {
        try { window.google.accounts.id.revoke(profile.email || "", () => {}); } catch (_) {}
    }
    localStorage.removeItem(GOOGLE_PROFILE_KEY);
    localStorage.removeItem("mylibra-drive-authorized");
    localStorage.removeItem(DRIVE_FOLDER_KEY);
    localStorage.removeItem(DRIVE_MANIFEST_KEY);
    googleDriveAccessToken = null;
    googleDriveTokenClient = null;
    clearTimeout(googleDriveSyncTimer);
    setGoogleDriveStatus("Chưa kết nối Google Drive.");
    renderGoogleAccount(null);
    if (googleSigninArea) googleSigninArea.innerHTML = "";
}

async function autoConnectGoogleDrive() {
    if (!getGoogleProfile() || localStorage.getItem("mylibra-drive-authorized") !== "true") return;
    for (let attempt = 0; attempt < 20; attempt += 1) {
        if (window.google?.accounts?.oauth2) {
            try {
                await requestGoogleDriveAccess("");
                await syncToGoogleDrive();
            } catch (error) {
                console.warn("Auto Drive sync:", error);
            }
            return;
        }
        await new Promise((resolve) => setTimeout(resolve, 500));
    }
}


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

async function saveBookToDatabase(book, options = {}) {
    if (book && options.touch !== false) book.updatedAt = Date.now();
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

function setMainTab(tab) {
    const isHome = tab === "home";
    homePage.hidden = !isHome;
    libraryPage.hidden = isHome;
    homeTab?.classList.toggle("active", isHome);
    libraryTab?.classList.toggle("active", !isHome);
}
function showHome() {
    bookDetailPage.hidden = true; readerPage.hidden = true; currentBookId = null;
    setMainTab("home"); renderHome();
}
function showLibrary() {
    bookDetailPage.hidden = true; readerPage.hidden = true; currentBookId = null;
    setMainTab("library");
}
function showBookDetail() {
    homePage.hidden = true; libraryPage.hidden = true; bookDetailPage.hidden = false; readerPage.hidden = true;
    homeTab?.classList.remove("active"); libraryTab?.classList.remove("active");
}

function showReader() {
    homePage.hidden = true; libraryPage.hidden = true; bookDetailPage.hidden = true; readerPage.hidden = false;
    homeTab?.classList.remove("active"); libraryTab?.classList.remove("active");
} {
    libraryPage.hidden = true;
    bookDetailPage.hidden = false;
    readerPage.hidden = true;
}

function showReader() {
    libraryPage.hidden = true;
    bookDetailPage.hidden = true;
    readerPage.hidden = false;
}

function normalizeBookImages(book) {
    if (!book || typeof book !== "object") return book;
    if (Number(book.imageDataVersion) < 2) {
        if (!book.avatarDataUrl && book.coverDataUrl) book.avatarDataUrl = book.coverDataUrl;
        book.coverDataUrl = "";
        book.imageDataVersion = 2;
    }
    book.avatarDataUrl = book.avatarDataUrl || "";
    book.coverDataUrl = book.coverDataUrl || "";
    return book;
}

function createAvatarMarkup(book, large = false) {
    normalizeBookImages(book);
    const cls = large ? "book-cover-image-large" : "book-cover-image";
    if (book.avatarDataUrl) {
        return '<img class="' + cls + '" src="' + escapeHTML(book.avatarDataUrl) + '" alt="">';
    }
    return '<span class="cover-fallback" aria-hidden="true">' + escapeHTML(book.icon || "📖") + '</span>';
}

function createCoverMarkup(book, large = false) {
    normalizeBookImages(book);
    const cls = large ? "book-cover-image-large" : "book-cover-image";
    const image = book.coverDataUrl || book.avatarDataUrl;
    if (image) {
        return '<img class="' + cls + '" src="' + escapeHTML(image) + '" alt="">';
    }
    return '<span class="cover-fallback" aria-hidden="true">' + escapeHTML(book.icon || "📖") + '</span>';
}

function getFeaturedBook() {
    const featuredId = localStorage.getItem("mylibra-featured-book");
    return books.find((book) => book.id === featuredId) ||
        [...books].sort((a,b) => (b.addedAt||b.updatedAt||0)-(a.addedAt||a.updatedAt||0))[0] || null;
}
function getRecommendedBooks() {
    const featured = getFeaturedBook();
    return [...books].filter((book) => !featured || book.id !== featured.id).sort((a,b) => {
        const score = (book) => (Number(book.progress)>0 ? 4 : 0) + getBookGenres(book).length*2 + getBookTags(book).length + Number(book.updatedAt||0)/1e13;
        return score(b)-score(a);
    });
}
function createRecommendationCard(book) {
    const card=document.createElement("article");
    card.className="recommendation-card";
    card.innerHTML='<button class="recommendation-cover" type="button">'+createCoverMarkup(book)+'</button><div class="recommendation-info"><h3>'+escapeHTML(book.title)+'</h3><p class="recommendation-author">'+escapeHTML(book.author||"Không rõ tác giả")+'</p><div class="recommendation-description">'+escapeHTML(book.description||"Chưa có mô tả.")+'</div><button class="text-button recommendation-more" type="button">Xem thêm →</button></div>';
    card.querySelector(".recommendation-cover").addEventListener("click",()=>openBook(book.id));
    card.querySelector(".recommendation-more").addEventListener("click",()=>openBook(book.id));
    return card;
}
function renderHome() {
    const hasBooks=books.length>0;
    homeEmpty.hidden=hasBooks;
    if(!hasBooks){homeFeatured.innerHTML="";homeRecommendations.innerHTML="";homeReadingGrid.innerHTML="";homeReadingSection.hidden=true;return;}
    const featured=getFeaturedBook();
    if(featured){
        homeFeatured.innerHTML='<div class="home-featured-cover">'+createCoverMarkup(featured,true)+'</div><div class="home-featured-content"><span class="home-eyebrow">✨ TRUYỆN NỔI BẬT</span><h1>'+escapeHTML(featured.title)+'</h1><p class="home-featured-author">'+escapeHTML(featured.author||"Không rõ tác giả")+'</p><p class="home-featured-description">'+escapeHTML(featured.description||"Một câu chuyện đang chờ bạn khám phá.")+'</p><div class="home-featured-meta">'+getBookGenres(featured).slice(0,3).map(v=>chipHTML(v,false,"genre")).join("")+'</div><div class="home-featured-actions"><button class="primary-button" id="homeFeaturedRead" type="button">'+(featured.file?(featured.progress>0?"▶ Tiếp tục đọc":"▶ Bắt đầu đọc"):"Xem truyện")+'</button><button class="add-button" id="homeFeaturedList" type="button">📑 Danh sách đọc</button></div></div>';
        $("homeFeaturedRead")?.addEventListener("click",()=>featured.file?openReader(featured.id):openBook(featured.id));
        $("homeFeaturedList")?.addEventListener("click",()=>openReadingListChooser(featured.id));
    }
    homeRecommendations.innerHTML="";
    getRecommendedBooks().slice(0,10).forEach(book=>homeRecommendations.appendChild(createRecommendationCard(book)));
    const reading=books.filter(book=>Number(book.progress)>0&&Number(book.progress)<100).sort((a,b)=>Number(b.updatedAt||0)-Number(a.updatedAt||0));
    homeReadingSection.hidden=!reading.length;
    homeReadingGrid.innerHTML="";
    reading.slice(0,4).forEach(book=>homeReadingGrid.appendChild(createBookCard(book)));
}

function createBookCard(book) {
    const card = document.createElement("div");
    card.className = "book-card";
    card.innerHTML = `
        <div class="book-cover">
            ${createAvatarMarkup(book)}
        </div>
        <div class="book-info">
            <h3>${escapeHTML(book.title)}</h3>
            <p>${escapeHTML(book.author || "Không rõ tác giả")}</p>
            <div class="book-card-chips">
                ${getBookGenres(book).slice(0, 2).map((value) => chipHTML(value, false, "genre")).join("")}
                ${getBookTags(book).slice(0, 2).map((value) => chipHTML(value, false, "tag")).join("")}
            </div>
            <div class="progress">
                <div class="progress-bar" style="width:${book.progress || 0}%"></div>
            </div>
            <span>${book.progress || 0}% đã đọc</span>
        </div>
    `;
    card.addEventListener("click", () => openBook(book.id));
    return card;
}

const GENRE_OPTIONS = [
    "Fantasy", "Action", "Adventure", "Romance", "Drama", "Comedy",
    "Mystery", "Horror", "Psychological", "Sci-Fi", "Historical",
    "School Life", "Slice of Life", "Isekai", "Reincarnation",
    "Cultivation", "Xianxia", "Wuxia", "Manhwa", "Manga", "Light Novel"
];

let selectedFilterGenres = [];
let selectedFilterTags = [];
let addGenres = [];
let addTags = [];
let editGenres = [];
let editTags = [];

function normalizeSearchText(value) {
    return String(value || "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();
}

function splitBookValues(value) {
    if (Array.isArray(value)) return value.map((item) => String(item).trim()).filter(Boolean);
    return String(value || "").split(/[,;|]/).map((item) => item.trim()).filter(Boolean);
}

function getBookTags(book) {
    return splitBookValues(book.tags);
}

function getBookGenres(book) {
    return splitBookValues(book.genre).filter((value) =>
        normalizeSearchText(value) !== normalizeSearchText("Chưa phân loại")
    );
}

function uniqueValues(values) {
    const seen = new Map();
    values.flatMap(splitBookValues).forEach((value) => {
        const key = normalizeSearchText(value);
        if (key && !seen.has(key)) seen.set(key, value);
    });
    return [...seen.values()];
}

function allGenres() {
    return uniqueValues([...GENRE_OPTIONS, ...books.flatMap(getBookGenres)])
        .sort((a, b) => a.localeCompare(b, "vi"));
}

function allTags() {
    return uniqueValues(books.flatMap(getBookTags))
        .sort((a, b) => a.localeCompare(b, "vi"));
}

function chipHTML(value, removable = false, type = "") {
    return '<span class="book-chip ' + (type ? "chip-" + type : "") + '">' +
        '<span>' + escapeHTML(value) + '</span>' +
        (removable
            ? '<button type="button" class="chip-remove" data-chip-value="' + escapeHTML(value) + '" aria-label="Xóa">×</button>'
            : "") +
        '</span>';
}

function renderSelectedChips(container, values, type) {
    if (!container) return;
    container.innerHTML = values.length
        ? values.map((value) => chipHTML(value, true, type)).join("")
        : '<span class="chip-placeholder">Chưa chọn</span>';

    container.querySelectorAll(".chip-remove").forEach((button) => {
        button.addEventListener("click", (event) => {
            event.stopPropagation();
            const value = button.dataset.chipValue;
            if (container === addGenreChips) addGenres = addGenres.filter((item) => normalizeSearchText(item) !== normalizeSearchText(value));
            if (container === addTagChips) addTags = addTags.filter((item) => normalizeSearchText(item) !== normalizeSearchText(value));
            if (container === editGenreChips) editGenres = editGenres.filter((item) => normalizeSearchText(item) !== normalizeSearchText(value));
            if (container === editTagChips) editTags = editTags.filter((item) => normalizeSearchText(item) !== normalizeSearchText(value));
            renderSelectedChips(addGenreChips, addGenres, "genre");
            if (container === addTagChips) renderSelectedChips(addTagChips, addTags, "tag");
            if (container === editGenreChips) renderSelectedChips(editGenreChips, editGenres, "genre");
            if (container === editTagChips) renderSelectedChips(editTagChips, editTags, "tag");
        });
    });
}

function closeAllChipMenus(except = null) {
    document.querySelectorAll(".chip-picker-menu").forEach((menu) => {
        if (menu !== except) menu.hidden = true;
    });
}

function createPickerMenu(menu, values, selectedValues, onToggle, type) {
    if (!menu) return;

    const selectedKeys = selectedValues.map(normalizeSearchText);
    menu.innerHTML = values.map((value) => {
        const checked = selectedKeys.includes(normalizeSearchText(value));
        return '<button type="button" class="chip-menu-option ' + (checked ? "selected" : "") +
            '" data-value="' + escapeHTML(value) + '">' +
            '<span class="chip-menu-check">' + (checked ? "✓" : "") + '</span>' +
            '<span>' + escapeHTML(value) + '</span></button>';
    }).join("");

    menu.insertAdjacentHTML("beforeend",
        '<button type="button" class="chip-menu-create">＋ Tạo ' +
        (type === "genre" ? "thể loại" : "tag") + ' mới</button>'
    );

    menu.querySelectorAll(".chip-menu-option").forEach((button) => {
        button.addEventListener("click", (event) => {
            event.stopPropagation();
            onToggle(button.dataset.value);
            createPickerMenu(menu, type === "genre" ? allGenres() : allTags(), selectedValues, onToggle, type);
        });
    });

    menu.querySelector(".chip-menu-create")?.addEventListener("click", (event) => {
        event.stopPropagation();
        const value = prompt(type === "genre" ? "Nhập tên thể loại mới:" : "Nhập tag mới:");
        if (!value?.trim()) return;
        onToggle(value.trim());
        createPickerMenu(menu, type === "genre" ? allGenres() : allTags(), selectedValues, onToggle, type);
    });
}

function setupChipPicker(trigger, menu, getValues, getSelected, onToggle, type) {
    if (!trigger || !menu) return;
    trigger.addEventListener("click", (event) => {
        event.stopPropagation();
        const willOpen = menu.hidden;
        closeAllChipMenus(menu);
        menu.hidden = !willOpen;
        if (willOpen) createPickerMenu(menu, getValues(), getSelected(), onToggle, type);
    });
}

document.addEventListener("click", () => closeAllChipMenus());

function toggleValue(list, value) {
    const key = normalizeSearchText(value);
    return list.some((item) => normalizeSearchText(item) === key)
        ? list.filter((item) => normalizeSearchText(item) !== key)
        : [...list, value];
}

function updateFilterTrigger() {
    if (genreFilterTrigger) {
        genreFilterTrigger.innerHTML = selectedFilterGenres.length
            ? '<span class="trigger-chip-row">' + selectedFilterGenres.map((value) => chipHTML(value, false, "genre")).join("") + '</span><span class="chip-picker-arrow">⌄</span>'
            : '<span>🏷️ Thể loại</span><span class="chip-picker-arrow">⌄</span>';
    }
    if (tagFilterTrigger) {
        tagFilterTrigger.innerHTML = selectedFilterTags.length
            ? '<span class="trigger-chip-row">' + selectedFilterTags.map((value) => chipHTML(value, false, "tag")).join("") + '</span><span class="chip-picker-arrow">⌄</span>'
            : '<span># Tag</span><span class="chip-picker-arrow">⌄</span>';
    }
}

function updateFilterOptions() {
    createPickerMenu(genreFilterMenu, allGenres(), selectedFilterGenres, (value) => {
        selectedFilterGenres = toggleValue(selectedFilterGenres, value);
        updateFilterOptions();
        renderBooks(getFilteredBooks());
    }, "genre");
    createPickerMenu(tagFilterMenu, allTags(), selectedFilterTags, (value) => {
        selectedFilterTags = toggleValue(selectedFilterTags, value);
        updateFilterOptions();
        renderBooks(getFilteredBooks());
    }, "tag");
    updateFilterTrigger();
}

function getFilteredBooks() {
    const keyword = normalizeSearchText(searchInput?.value || "");
    return books.filter((book) => {
        const searchable = [book.title, book.author, book.genre, book.tags, book.description, book.fileName]
            .map(normalizeSearchText).join(" ");
        const genres = getBookGenres(book).map(normalizeSearchText);
        const tags = getBookTags(book).map(normalizeSearchText);
        const matchesKeyword = !keyword || searchable.includes(keyword);
        const matchesGenre = !selectedFilterGenres.length ||
            selectedFilterGenres.some((selected) => genres.includes(normalizeSearchText(selected)));
        const matchesTag = !selectedFilterTags.length ||
            selectedFilterTags.some((selected) => tags.includes(normalizeSearchText(selected)));
        return matchesKeyword && matchesGenre && matchesTag;
    });
}

function renderBooks(bookList = books) {
    bookGrid.innerHTML = "";
    allBookGrid.innerHTML = "";
    const sorted = [...bookList].sort((a, b) => {
        const mode = localStorage.getItem("mylibra-sort") || "added";
        if (mode === "title") return String(a.title || "").localeCompare(String(b.title || ""), "vi");
        if (mode === "progress") return (b.progress || 0) - (a.progress || 0);
        return (b.addedAt || 0) - (a.addedAt || 0);
    });

    const hasActiveFilter = Boolean(searchInput?.value.trim() || selectedFilterGenres.length || selectedFilterTags.length);
    if (!bookList.length) {
        emptyLibrary.hidden = false;
        emptyLibrary.innerHTML = hasActiveFilter
            ? '<div class="empty-icon">🔎</div><h3>Không tìm thấy truyện</h3><p>Thử đổi từ khóa, thể loại hoặc tag.</p><button class="add-button" type="button" id="clearFiltersInline">Xóa bộ lọc</button>'
            : '<div class="empty-icon">📚</div><h3>Thư viện của bạn</h3><p>Thêm EPUB, PDF hoặc TXT để bắt đầu đọc.</p><button class="primary-button" type="button" id="emptyAddBookButtonInline">+ Thêm truyện</button>';
        $("clearFiltersInline")?.addEventListener("click", clearAllFilters);
        $("emptyAddBookButtonInline")?.addEventListener("click", openAddBookModal);
        const section = $("readingSection");
        if (section) section.hidden = true;
        renderReadingLists();
        renderHome();
        return;
    }

    emptyLibrary.hidden = true;
    const section = $("readingSection");
    if (section) section.hidden = localStorage.getItem("mylibra-show-reading") === "false";
    sorted.forEach((book) => {
        bookGrid.appendChild(createBookCard(book));
        allBookGrid.appendChild(createBookCard(book));
    });
    renderReadingLists();
    renderHome();
}

function applyLibraryFilters() {
    renderBooks(getFilteredBooks());
}

// Khởi tạo bộ lọc thư viện: mở menu và chọn/bỏ chọn thể loại hoặc tag.
setupChipPicker(genreFilterTrigger, genreFilterMenu, allGenres, () => selectedFilterGenres, (value) => {
    selectedFilterGenres = toggleValue(selectedFilterGenres, value);
    updateFilterOptions();
    renderBooks(getFilteredBooks());
}, "genre");

setupChipPicker(tagFilterTrigger, tagFilterMenu, allTags, () => selectedFilterTags, (value) => {
    selectedFilterTags = toggleValue(selectedFilterTags, value);
    updateFilterOptions();
    renderBooks(getFilteredBooks());
}, "tag");

function clearAllFilters() {
    if (searchInput) searchInput.value = "";
    selectedFilterGenres = [];
    selectedFilterTags = [];
    updateFilterOptions();
    renderBooks(books);
}

searchInput?.addEventListener("input", applyLibraryFilters);
clearFilters?.addEventListener("click", clearAllFilters);

function applyTheme(theme, markChanged = true) {
    const normalized = ["light", "dark", "sepia"].includes(theme) ? theme : "light";
    document.body.classList.toggle("dark-mode", normalized === "dark");
    document.body.classList.toggle("sepia-mode", normalized === "sepia");
    localStorage.setItem("mylibra-theme", normalized);
    if (markChanged) {
        markCloudSettingsChanged();
        scheduleDriveManifestSync();
    }
    if (themeButton) themeButton.textContent = normalized === "dark" ? "☀️" : "🌙";
    document.querySelectorAll(".theme-option").forEach((button) => button.classList.toggle("active", button.dataset.themeChoice === normalized));
}

themeButton?.addEventListener("click", () => {
    const current = localStorage.getItem("mylibra-theme") || "light";
    applyTheme(current === "dark" ? "light" : "dark");
});

homeButton?.addEventListener("click", () => {
    if (!readerPage.hidden) closeReaderAndReturn();
    else showLibrary();
});

function loadSettingsUI() {
    if (settingShowReading) settingShowReading.checked = localStorage.getItem("mylibra-show-reading") !== "false";
    if (settingSort) settingSort.value = localStorage.getItem("mylibra-sort") || "added";
    if (settingConfirmDelete) settingConfirmDelete.checked = localStorage.getItem("mylibra-confirm-delete") !== "false";
    if (settingReaderMode) settingReaderMode.value = localStorage.getItem("mylibra-reader-mode") || "scroll";
    if (settingFontSize) settingFontSize.value = String(Number(localStorage.getItem("mylibra-font-size")) || 18);
    if (settingLineHeight) settingLineHeight.value = localStorage.getItem("mylibra-line-height") || "1.9";
}

function saveSettingsValues() {
    localStorage.setItem("mylibra-show-reading", String(settingShowReading?.checked !== false));
    localStorage.setItem("mylibra-sort", settingSort?.value || "added");
    localStorage.setItem("mylibra-confirm-delete", String(settingConfirmDelete?.checked !== false));
    localStorage.setItem("mylibra-reader-mode", settingReaderMode?.value || "scroll");
    localStorage.setItem("mylibra-font-size", settingFontSize?.value || "18");
    localStorage.setItem("mylibra-line-height", settingLineHeight?.value || "1.9");
    markCloudSettingsChanged();
    scheduleDriveManifestSync();
    readerMode = settingReaderMode?.value === "page" ? "page" : "scroll";
    applyReaderFontSize();
    applyReaderLineHeight();
    renderBooks();
}

settingsButton?.addEventListener("click", () => { loadSettingsUI(); openModal(settingsModal); });
closeSettings?.addEventListener("click", () => closeModal(settingsModal));
saveSettings?.addEventListener("click", () => { saveSettingsValues(); closeModal(settingsModal); });
resetSettings?.addEventListener("click", () => {
    localStorage.removeItem("mylibra-show-reading"); localStorage.removeItem("mylibra-sort"); localStorage.removeItem("mylibra-confirm-delete"); localStorage.removeItem("mylibra-reader-mode"); localStorage.removeItem("mylibra-font-size"); localStorage.removeItem("mylibra-line-height");
    loadSettingsUI(); applyTheme("light"); markCloudSettingsChanged(); scheduleDriveManifestSync(); renderBooks();
});
document.querySelectorAll(".settings-tab").forEach((tab) => tab.addEventListener("click", () => {
    document.querySelectorAll(".settings-tab").forEach((item) => item.classList.toggle("active", item === tab));
    document.querySelectorAll(".settings-panel").forEach((panel) => panel.classList.toggle("active", panel.dataset.settingsPanel === tab.dataset.settingsTab));
}));
document.querySelectorAll(".theme-option").forEach((button) => button.addEventListener("click", () => applyTheme(button.dataset.themeChoice)));


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

function refreshAddPickerMenus() {
    createPickerMenu(addGenreMenu, allGenres(), addGenres, (value) => {
        addGenres = toggleValue(addGenres, value);
        renderSelectedChips(addGenreChips, addGenres, "genre");
        refreshAddPickerMenus();
    }, "genre");
    createPickerMenu(addTagMenu, allTags(), addTags, (value) => {
        addTags = toggleValue(addTags, value);
        renderSelectedChips(addTagChips, addTags, "tag");
        refreshAddPickerMenus();
    }, "tag");
}

function refreshEditPickerMenus() {
    createPickerMenu(editGenreMenu, allGenres(), editGenres, (value) => {
        editGenres = toggleValue(editGenres, value);
        renderSelectedChips(editGenreChips, editGenres, "genre");
        refreshEditPickerMenus();
    }, "genre");
    createPickerMenu(editTagMenu, allTags(), editTags, (value) => {
        editTags = toggleValue(editTags, value);
        renderSelectedChips(editTagChips, editTags, "tag");
        refreshEditPickerMenus();
    }, "tag");
}

setupChipPicker(addGenreTrigger, addGenreMenu, allGenres, () => addGenres, (value) => {
    addGenres = toggleValue(addGenres, value);
    renderSelectedChips(addGenreChips, addGenres, "genre");
    refreshAddPickerMenus();
}, "genre");
setupChipPicker(addTagTrigger, addTagMenu, allTags, () => addTags, (value) => {
    addTags = toggleValue(addTags, value);
    renderSelectedChips(addTagChips, addTags, "tag");
    refreshAddPickerMenus();
}, "tag");
setupChipPicker(editGenreTrigger, editGenreMenu, allGenres, () => editGenres, (value) => {
    editGenres = toggleValue(editGenres, value);
    renderSelectedChips(editGenreChips, editGenres, "genre");
    refreshEditPickerMenus();
}, "genre");
setupChipPicker(editTagTrigger, editTagMenu, allTags, () => editTags, (value) => {
    editTags = toggleValue(editTags, value);
    renderSelectedChips(editTagChips, editTags, "tag");
    refreshEditPickerMenus();
}, "tag");

renderSelectedChips(addGenreChips, addGenres, "genre");
renderSelectedChips(addTagChips, addTags, "tag");
renderSelectedChips(editGenreChips, editGenres, "genre");
renderSelectedChips(editTagChips, editTags, "tag");

confirmAddBook?.addEventListener("click", async () => {
    const file = bookFileInput.files[0];
    if (!file) return;

    const type = getFileType(file.name);

    const newBook = {
        id: "book-" + Date.now(),
        title: removeExtension(file.name),
        author: "Chưa rõ tác giả",
        genre: addGenres.length ? [...addGenres] : ["Chưa phân loại"],
        tags: [...addTags],
        description: "",
        progress: 0,
        icon: getBookIcon(type),
        fileName: file.name,
        fileType: type,
        file: file,
        fileUpdatedAt: Date.now(),
        imageDataVersion: 2,
        avatarDataUrl: "",
        coverDataUrl: ""
    };

    try {
        if (addAvatar?.files[0]) newBook.avatarDataUrl = await readFileAsDataUrl(addAvatar.files[0]);
        if (addCover?.files[0]) newBook.coverDataUrl = await readFileAsDataUrl(addCover.files[0]);
        await saveBookToDatabase(newBook);
        books.push(newBook);
        if (googleDriveAccessToken) {
            try {
                setGoogleDriveStatus("Đang tải truyện lên Google Drive…", true);
                await uploadBookToDrive(newBook);
                await saveDriveManifest();
                setGoogleDriveStatus("Đã thêm truyện và đồng bộ Google Drive.", true);
            } catch (driveError) {
                console.error("Drive upload:", driveError);
                alert("Truyện đã lưu trên thiết bị nhưng chưa tải được lên Google Drive. Bấm “Đồng bộ Google Drive” để thử lại.");
            }
        }
        updateFilterOptions();
        renderBooks(getFilteredBooks());
        closeModal(addBookModal);
        addGenres = [];
        addTags = [];
        renderSelectedChips(addGenreChips, addGenres, "genre");
        renderSelectedChips(addTagChips, addTags, "tag");
        refreshAddPickerMenus();
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
                ${createAvatarMarkup(book, true)}
            </div>
        </div>

        <div class="book-detail-info">
            <div class="book-detail-chips">
                ${getBookGenres(book).map((value) => chipHTML(value, false, "genre")).join("")}
                ${getBookTags(book).map((value) => chipHTML(value, false, "tag")).join("")}
                ${!getBookGenres(book).length && !getBookTags(book).length ? '<span class="chip-placeholder">Chưa có thể loại / tag</span>' : ""}
            </div>

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

                <button class="add-button" id="detailListButton" type="button">📑 Danh sách đọc</button>
                <button class="add-button" id="detailFeaturedButton" type="button">⭐ Đặt nổi bật</button>
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

    $("detailListButton")?.addEventListener("click", () => openReadingListChooser(book.id));
    $("detailFeaturedButton")?.addEventListener("click", () => {
        localStorage.setItem("mylibra-featured-book", book.id);
        markCloudSettingsChanged();
        renderHome();
        alert('Đã đặt "' + book.title + '" làm truyện nổi bật trên Trang chủ.');
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
            // Xóa trên Drive trước. Nếu Drive không xóa được thì giữ nguyên truyện trên MyLibra.
            if (book.driveFileId) {
                setGoogleDriveStatus("Đang xóa truyện khỏi Google Drive…", true);
                await deleteDriveFile(book.driveFileId);
            }

            const deletedAt = Date.now();
            markBookDeleted(book.id, deletedAt, book.driveFileId || "");
            await deleteBookFromDatabase(book.id);
            books = books.filter((item) => item.id !== book.id);
            removeBookFromReadingLists(book.id);
            removeLocalBookData(book.id);
            localStorage.removeItem("mylibra-epub-cfi-" + book.id);

            if (googleDriveAccessToken) {
                await saveDriveManifest();
                setGoogleDriveStatus("Đã xóa truyện và đồng bộ Google Drive.", true);
            }

            showLibrary();
            renderBooks();
        } catch (error) {
            console.error(error);
            alert("Không thể xóa truyện. MyLibra chưa xóa bản local để tránh mất dữ liệu.\n\nChi tiết: " + (error?.message || "Lỗi không xác định"));
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
    editGenres = getBookGenres(book);
    editTags = getBookTags(book);
    renderSelectedChips(editGenreChips, editGenres, "genre");
    renderSelectedChips(editTagChips, editTags, "tag");
    refreshEditPickerMenus();
    editDescription.value = book.description || "";
    normalizeBookImages(book);
    editAvatar.value = "";
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
    book.genre = editGenres.length ? [...editGenres] : ["Chưa phân loại"];
    book.tags = [...editTags];
    book.description = editDescription.value.trim();

    normalizeBookImages(book);
    book.imageDataVersion = 2;
    try {
        if (editAvatar.files[0]) book.avatarDataUrl = await readFileAsDataUrl(editAvatar.files[0]);
        if (editCover.files[0]) book.coverDataUrl = await readFileAsDataUrl(editCover.files[0]);
    } catch (error) {
        console.error(error);
        alert("Không thể đọc ảnh. Hãy thử lại với ảnh khác.");
        return;
    }

    try {
        await saveBookToDatabase(book);
        if (googleDriveAccessToken) scheduleDriveManifestSync();
        closeModal(editBookModal);
        updateFilterOptions();
        renderBooks(getFilteredBooks());
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
    book.fileUpdatedAt = Date.now();
    book.driveFileId = book.driveFileId || "";

    try {
        await saveBookToDatabase(book);
        if (googleDriveAccessToken) {
            await uploadBookToDrive(book);
            await saveDriveManifest();
        }
        closeModal(updateFileModal);
        updateFilterOptions();
        openBook(book.id);
        renderBooks(getFilteredBooks());
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

async function setReaderMode(mode, persist = true) {
    readerMode = mode === "page" ? "page" : "scroll";
    if (persist) {
        localStorage.setItem("mylibra-reader-mode", readerMode);
        markCloudSettingsChanged();
        scheduleDriveManifestSync();
    }

    document.body.classList.toggle("reader-page-mode", readerMode === "page");
    readerModeScroll?.classList.toggle("active", readerMode === "scroll");
    readerModePage?.classList.toggle("active", readerMode === "page");

    if (currentRendition && currentEpub) {
        const book = books.find((item) => item.id === currentBookId);
        if (book?.fileType === "EPUB") {
            const currentCfi = localStorage.getItem("mylibra-epub-cfi-" + book.id);
            try { currentRendition.destroy(); } catch (_) {}
            currentRendition = null;
            readerContent.innerHTML = '<div class="epub-reader" id="epubViewer"></div>';
            currentRendition = currentEpub.renderTo("epubViewer", {
                width: "100%",
                height: "100%",
                flow: readerMode === "page" ? "paginated" : "scrolled-doc",
                spread: "none"
            });
            currentRendition.themes.default({ body: { color: "var(--text)", background: "var(--surface)" } });
            currentRendition.on("relocated", handleEpubRelocated);
            currentRendition.display(currentCfi || undefined).then(() => applyReaderFontSize()).catch(console.error);
        }
    }
}

function handleEpubRelocated(location) {
    const book = books.find((item) => item.id === currentBookId);
    if (!book) return;
    if (location?.start?.cfi) {
        localStorage.setItem("mylibra-epub-cfi-" + book.id, location.start.cfi);
        markCloudPositionsChanged();
    }
    if (location?.start?.href) updateEpubChapterSelect(location.start.href);
    if (location?.start?.percentage !== undefined) {
        book.progress = Math.max(0, Math.min(100, Math.round(location.start.percentage * 100)));
        saveBookToDatabase(book).then(() => scheduleDriveManifestSync()).catch(console.error);
        renderBooks();
    }
}

function readerNavigate(direction) {
    if (!currentRendition) return;
    if (direction > 0) currentRendition.next();
    else currentRendition.prev();
}

readerModeScroll?.addEventListener("click", () => setReaderMode("scroll"));
readerModePage?.addEventListener("click", () => setReaderMode("page"));
readerChapterSelect?.addEventListener("change", () => {
    jumpToEpubChapter(Number(readerChapterSelect.value));
});
readerPrev?.addEventListener("click", () => readerNavigate(-1));
readerNext?.addEventListener("click", () => readerNavigate(1));

async function openReader(bookId) {
    const book = books.find((item) => item.id === bookId);
    if (!book) {
        alert("Không tìm thấy truyện.");
        return;
    }

    // Sách đồng bộ từ Google Drive có thể chưa có file cục bộ sau khi
    // mở MyLibra trên một thiết bị mới. Tải file trước rồi mới kiểm tra.
    if (!book.file && book.driveFileId) {
        try {
            if (!googleDriveAccessToken) {
                await requestGoogleDriveAccess("");
            }
            setGoogleDriveStatus("Đang tải file truyện từ Google Drive…", true);
            book.file = await downloadBookFromDrive(book);
            await saveBookToDatabase(book, {touch:false});
            setGoogleDriveStatus("Đã tải file truyện từ Google Drive.", true);
        } catch (error) {
            console.error("Drive download:", error);
            alert("Không thể tải file truyện từ Google Drive. Hãy kết nối lại Drive rồi thử lại.");
            return;
        }
    }

    if (!book.file) {
        alert("Truyện này chưa có file để đọc.");
        return;
    }

    currentBookId = bookId;
    readerTitle.textContent = book.title;
    showReader();
    setReaderMode(readerMode, false);

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
        if (readerEpubJump) readerEpubJump.hidden = true;
        if (pdfPageInput) {
            pdfPageInput.max = String(currentPdf.numPages);
            pdfPageInput.value = String(currentPdfPage);
        }
        if (pdfTocJump) pdfTocJump.hidden = true;
        await buildPdfOutline();

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
async function buildPdfOutline() {
    pdfOutlineItems = [];
    if (!currentPdf || !pdfTocSelect) return;

    try {
        const outline = await currentPdf.getOutline();
        if (!Array.isArray(outline) || !outline.length) {
            if (pdfTocJump) pdfTocJump.hidden = true;
            return;
        }

        async function flatten(items, depth = 0) {
            for (const item of items || []) {
                if (!item) continue;

                let pageNumber = null;
                try {
                    if (item.dest) {
                        const dest = typeof item.dest === "string"
                            ? await currentPdf.getDestination(item.dest)
                            : item.dest;

                        if (dest && dest[0]) {
                            const pageIndex = await currentPdf.getPageIndex(dest[0]);
                            pageNumber = pageIndex + 1;
                        }
                    }
                } catch (error) {
                    console.warn("Không xác định được trang bookmark PDF:", error);
                }

                if (pageNumber) {
                    pdfOutlineItems.push({
                        title: String(item.title || "Không có tên"),
                        page: pageNumber,
                        depth
                    });
                }

                if (item.items?.length) {
                    await flatten(item.items, depth + 1);
                }
            }
        }

        await flatten(outline);

        pdfTocSelect.innerHTML = "";
        pdfOutlineItems.forEach((item, index) => {
            const option = document.createElement("option");
            option.value = String(index);
            option.textContent = " ".repeat(item.depth * 3) + item.title + "  —  trang " + item.page;
            pdfTocSelect.appendChild(option);
        });

        pdfTocJump.hidden = pdfOutlineItems.length === 0;
    } catch (error) {
        console.warn("Không đọc được PDF outline:", error);
        if (pdfTocJump) pdfTocJump.hidden = true;
    }
}

async function jumpToPdfOutline(index) {
    const item = pdfOutlineItems[Number(index)];
    if (!item || !currentPdf) return;
    currentPdfPage = item.page;
    if (pdfPageInput) pdfPageInput.value = String(currentPdfPage);
    await renderPdfPage(currentPdfPage);
}

function updatePdfOutlineSelection(pageNumber) {
    if (!pdfTocSelect || !pdfOutlineItems.length) return;

    let selected = -1;
    for (let i = 0; i < pdfOutlineItems.length; i++) {
        if (pdfOutlineItems[i].page <= pageNumber) selected = i;
        else break;
    }

    if (selected >= 0) pdfTocSelect.value = String(selected);
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

    // Render theo mật độ pixel thật của màn hình để PDF không bị mờ
    // trên Retina/iPad, trong khi kích thước hiển thị vẫn giữ nguyên.
    const devicePixelRatio = Math.min(window.devicePixelRatio || 1, 3);
    const outputScale = devicePixelRatio;
    const context = canvas.getContext("2d", { alpha: false });

    canvas.width = Math.ceil(viewport.width * outputScale);
    canvas.height = Math.ceil(viewport.height * outputScale);
    canvas.style.width = viewport.width + "px";
    canvas.style.height = viewport.height + "px";

    if (currentPdfRenderTask) {
        try { currentPdfRenderTask.cancel(); } catch (_) {}
        currentPdfRenderTask = null;
    }

    currentPdfRenderTask = page.render({
        canvasContext: context,
        viewport,
        transform: outputScale !== 1
            ? [outputScale, 0, 0, outputScale, 0, 0]
            : null
    });

    try {
        await currentPdfRenderTask.promise;
    } catch (error) {
        if (error?.name === "RenderingCancelledException") return;
        throw error;
    } finally {
        currentPdfRenderTask = null;
    }

    pdfPageInfo.textContent =
        "Trang " + pageNumber + " / " + currentPdf.numPages;
    if (pdfPageInput) pdfPageInput.value = String(pageNumber);
    updatePdfOutlineSelection(pageNumber);

    const progress = Math.round((pageNumber / currentPdf.numPages) * 100);
    readerProgressBar.style.width = progress + "%";
    const book = books.find((item) => item.id === currentPdfBookId);
    if (book) {
        book.progress = progress;
        await saveBookToDatabase(book);
        scheduleDriveManifestSync();
        renderBooks();
    }

    localStorage.setItem("mylibra-pdf-page-" + currentPdfBookId, String(pageNumber));
    localStorage.setItem("mylibra-pdf-scale-" + currentPdfBookId, String(currentPdfScale));
    markCloudPositionsChanged();
}

async function changePdfPage(delta) {
    if (!currentPdf) return;
    const next = currentPdfPage + delta;
    if (next < 1 || next > currentPdf.numPages) return;
    currentPdfPage = next;
    await renderPdfPage(currentPdfPage);
}

async function goToPdfPageFromInput() {
    if (!currentPdf || !pdfPageInput) return;
    const page = Number.parseInt(pdfPageInput.value, 10);
    if (!Number.isFinite(page)) {
        pdfPageInput.value = String(currentPdfPage);
        return;
    }
    currentPdfPage = Math.max(1, Math.min(page, currentPdf.numPages));
    pdfPageInput.value = String(currentPdfPage);
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
    book.fileUpdatedAt = Date.now();

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
pdfGoPage?.addEventListener("click", goToPdfPageFromInput);
pdfTocSelect?.addEventListener("change", () => jumpToPdfOutline(pdfTocSelect.value));
pdfPageInput?.addEventListener("keydown", (event) => {
    if (event.key === "Enter") goToPdfPageFromInput();
});
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

function flattenEpubToc(items, result = []) {
    (items || []).forEach((item) => {
        if (!item) return;
        const href = item.href || item.url || "";
        const label = String(item.label || item.title || "").trim();
        if (href) result.push({ href, label: label || ("Chương " + (result.length + 1)) });
        if (Array.isArray(item.subitems) && item.subitems.length) {
            flattenEpubToc(item.subitems, result);
        }
        if (Array.isArray(item.children) && item.children.length) {
            flattenEpubToc(item.children, result);
        }
    });
    return result;
}

function normalizeEpubHref(href) {
    return String(href || "")
        .split("#")[0]
        .split("?")[0]
        .replace(/^\.\//, "")
        .trim();
}

function updateEpubChapterSelect(href) {
    if (!readerChapterSelect || !epubChapterOptions.length) return;
    const target = normalizeEpubHref(href);
    let index = epubChapterOptions.findIndex((item) => normalizeEpubHref(item.href) === target);
    if (index < 0 && currentEpub?.spine?.get) {
        const spineItem = currentEpub.spine.get(href);
        if (spineItem?.href) {
            index = epubChapterOptions.findIndex((item) => normalizeEpubHref(item.href) === normalizeEpubHref(spineItem.href));
        }
    }
    if (index >= 0) readerChapterSelect.value = String(index);
}

function renderEpubChapterOptions() {
    if (!readerChapterSelect) return;
    readerChapterSelect.innerHTML = "";
    epubChapterOptions.forEach((chapter, index) => {
        const option = document.createElement("option");
        option.value = String(index);
        option.textContent = (index + 1) + ". " + chapter.label;
        readerChapterSelect.appendChild(option);
    });
    readerEpubJump.hidden = epubChapterOptions.length === 0;
}

async function jumpToEpubChapter(index) {
    if (!currentRendition || !epubChapterOptions[index]) return;
    const chapter = epubChapterOptions[index];
    try {
        await currentRendition.display(chapter.href);
        readerChapterSelect.value = String(index);
    } catch (error) {
        console.error("EPUB chapter jump:", error);
        alert("Không thể mở chương này.");
    }
}

async function openEpubReader(book) {
    if (typeof ePub !== "function") {
        alert("Không tải được EPUB Reader. Hãy kiểm tra kết nối internet rồi tải lại trang.");
        return;
    }

    try {
        if (!book.file || typeof book.file.arrayBuffer !== "function") {
            throw new Error("File EPUB trong bộ nhớ không hợp lệ.");
        }

        if (pdfToolbar) pdfToolbar.hidden = true;
        if (readerEpubJump) readerEpubJump.hidden = true;

        readerContent.className = "reader-content epub-reader-content";
        readerContent.innerHTML = '<div class="epub-reader" id="epubViewer"></div>';

        const arrayBuffer = await book.file.arrayBuffer();
        if (!arrayBuffer || arrayBuffer.byteLength < 4) {
            throw new Error("File EPUB rỗng.");
        }

        // EPUB.js 0.3.x hỗ trợ mở trực tiếp ArrayBuffer. Chờ book.ready
        // trước khi tạo rendition để tránh race condition với ZIP/container.
        currentEpub = ePub(arrayBuffer);
        await currentEpub.ready;

        currentRendition = currentEpub.renderTo("epubViewer", {
            width: "100%",
            height: "100%",
            flow: readerMode === "page" ? "paginated" : "scrolled-doc",
            spread: "none"
        });

        currentRendition.themes.default({
            body: {
                color: "var(--text)",
                background: "var(--surface)"
            }
        });

        const savedCfi = localStorage.getItem("mylibra-epub-cfi-" + book.id);

        currentRendition.on("relocated", handleEpubRelocated);

        // epub.js chính thức dùng book.loaded.navigation cho TOC.
        // Không phụ thuộc vào currentEpub.navigation?.toc để tương thích 0.3.93.
        try {
            const navigation = await currentEpub.loaded.navigation;
            epubChapterOptions = flattenEpubToc(
                Array.isArray(navigation) ? navigation : (navigation?.toc || [])
            );
        } catch (navigationError) {
            console.warn("Không đọc được EPUB mục lục:", navigationError);
            epubChapterOptions = [];
        }

        renderEpubChapterOptions();

        if (currentEpub.locations) {
            currentEpub.locations.generate(1600).catch(() => {});
        }

        if (savedCfi) {
            await currentRendition.display(savedCfi);
        } else {
            await currentRendition.display();
        }

        const location = currentRendition.currentLocation?.();
        updateEpubChapterSelect(location?.start?.href || "");

        epubKeyHandler = (event) => {
            if (!currentRendition) return;
            if (event.key === "ArrowRight") currentRendition.next();
            if (event.key === "ArrowLeft") currentRendition.prev();
        };

        document.addEventListener("keyup", epubKeyHandler);
        applyReaderFontSize();
    } catch (error) {
        console.error("MyLibra EPUB error:", error);

        try {
            currentRendition?.destroy();
        } catch (_) {}

        currentRendition = null;
        currentEpub = null;

        if (readerEpubJump) readerEpubJump.hidden = true;

        readerContent.className = "reader-content";
        readerContent.innerHTML = `
            <div class="pdf-error-box">
                <div style="font-size:42px">📖</div>
                <h2>Không thể mở EPUB</h2>
                <p>EPUB Reader gặp lỗi khi đọc file này.</p>
                <small>${escapeHTML(error?.message || "Lỗi không xác định")}</small>
            </div>
        `;
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
        book.fileUpdatedAt = Date.now();
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

function applyReaderLineHeight() {
    readerContent.style.lineHeight = localStorage.getItem("mylibra-line-height") || "1.9";
}

decreaseFont?.addEventListener("click", () => {
    const current = Number(localStorage.getItem("mylibra-font-size")) || 18;
    const next = Math.max(12, current - 1);
    localStorage.setItem("mylibra-font-size", next);
    markCloudSettingsChanged();
    scheduleDriveManifestSync();
    applyReaderFontSize();
});

increaseFont?.addEventListener("click", () => {
    const current = Number(localStorage.getItem("mylibra-font-size")) || 18;
    const next = Math.min(40, current + 1);
    localStorage.setItem("mylibra-font-size", next);
    markCloudSettingsChanged();
    scheduleDriveManifestSync();
    applyReaderFontSize();
});

function closeReaderAndReturn() {
    if (epubKeyHandler) {
        document.removeEventListener("keyup", epubKeyHandler);
        epubKeyHandler = null;
    }

    if (currentRendition) {
        try { currentRendition.destroy(); } catch (_) {}
        currentRendition = null;
    }

    currentEpub = null;
    epubChapterOptions = [];
    if (readerEpubJump) readerEpubJump.hidden = true;
    if (readerChapterSelect) readerChapterSelect.innerHTML = "";
    currentPdf = null;
    pdfOutlineItems = [];
    if (pdfTocJump) pdfTocJump.hidden = true;
    if (pdfTocSelect) pdfTocSelect.innerHTML = "";
    currentPdfBytes = null;
    currentPdfBookId = null;

    if (pdfToolbar) pdfToolbar.hidden = true;

    readerContent.innerHTML = "";
    readerContent.className = "reader-content";

    // Quay đúng về trang chi tiết của truyện đang đọc.
    const bookId = currentBookId;
    if (bookId && books.some((book) => book.id === bookId)) {
        openBook(bookId);
    } else {
        showLibrary();
        renderBooks();
    }
}

backFromReader?.addEventListener("click", closeReaderAndReturn);

// TXT dùng cuộn dọc tự nhiên; EPUB có chế độ cuộn/trang riêng.
// Khi cuộn TXT gần cuối, tự chuyển sang chương kế không áp dụng vì TXT không có cấu trúc chương đáng tin cậy.
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
        saveBookToDatabase(book).then(() => {
            markCloudPositionsChanged();
            scheduleDriveManifestSync();
        }).catch(console.error);
    }
}

window.addEventListener("scroll", () => {
    if (!readerPage.hidden && books.find((book) => book.id === currentBookId)?.fileType === "TXT") {
        updateReaderProgress();
    }
});

function switchSettingsTab(tabName) {
    document.querySelectorAll(".settings-tab").forEach((button) => {
        button.classList.toggle("active", button.dataset.settingsTab === tabName);
    });
    document.querySelectorAll(".settings-panel").forEach((panel) => {
        panel.classList.toggle("active", panel.dataset.settingsPanel === tabName);
    });
}

function initializeGoogleAuth() {
    renderGoogleAccount();
    if (googleDriveAccessToken) setGoogleDriveStatus("Đã kết nối Google Drive.", true);
    else if (getGoogleProfile()) setGoogleDriveStatus("Đã đăng nhập Google. Hãy kết nối Google Drive để đồng bộ.", false);

    googleLoginButton?.addEventListener("click", () => {
        if (getGoogleProfile()) {
            settingsModal.hidden = false;
            switchSettingsTab("account");
        }
        startGoogleSignIn();
    });

    googleLogoutButton?.addEventListener("click", logoutGoogle);
}

initializeGoogleAuth();

function initializeMyLibra() {
    const savedTheme = localStorage.getItem("mylibra-theme");
    applyTheme(savedTheme || "light");
    loadSettingsUI();

    loadFontSize();
    applyReaderLineHeight();

    loadBooksFromDatabase()
        .then((storedBooks) => {
            storedBooks.forEach((storedBook) => {
                normalizeBookImages(storedBook);
                const index = books.findIndex((book) => book.id === storedBook.id);
                if (index >= 0) books[index] = storedBook;
                else books.push(storedBook);
            });

            updateFilterOptions();
            renderBooks();
            renderReadingLists();
            renderHome();
            showHome();
            autoConnectGoogleDrive();
        })
        .catch((error) => {
            console.error("Database error:", error);
            updateFilterOptions();
            renderBooks();
            showLibrary();
            autoConnectGoogleDrive();
        });
}

homeTab?.addEventListener("click", showHome);
libraryTab?.addEventListener("click", showLibrary);
homeSeeLibrary?.addEventListener("click", showLibrary);
homeAddBookButton?.addEventListener("click", openAddBookModal);

createReadingListButton?.addEventListener("click", () => {
    readingListName.value = "";
    openModal(readingListModal);
    setTimeout(() => readingListName?.focus(), 50);
});
closeReadingListModal?.addEventListener("click", () => closeModal(readingListModal));
cancelReadingList?.addEventListener("click", () => closeModal(readingListModal));
readingListModal?.addEventListener("click", (event) => { if (event.target === readingListModal) closeModal(readingListModal); });
saveReadingList?.addEventListener("click", () => {
    try {
        const list=createReadingList(readingListName.value);
        if(!list){alert("Hãy nhập tên danh sách.");return;}
        closeModal(readingListModal); renderReadingLists();
    } catch(error){alert(error.message||"Không thể tạo danh sách.");}
});
closeReadingListChooser?.addEventListener("click", () => closeModal(readingListChooserModal));
cancelReadingListChooser?.addEventListener("click", () => closeModal(readingListChooserModal));
readingListChooserModal?.addEventListener("click", (event) => { if (event.target === readingListChooserModal) closeModal(readingListChooserModal); });

initializeMyLibra();
