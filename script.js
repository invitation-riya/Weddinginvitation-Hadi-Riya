/* =========================================================
   UNDANGAN HADI & RIYA — JavaScript yang diperbaiki
   Simpan file ini sebagai script.js di folder yang sama dengan index.html.
   RSVP dan ucapan tetap mode lokal sampai backendUrl diisi dengan URL Web App.
   ========================================================= */
const CONFIG = {
  groom: {
    short: "Hadi",
    full: "Hadianto Kurniawan Tan",
    parents: "Putra dari Bapak Tan Tjoen Hwa & Ibu Tjhin Tjhiu Loe",
    photo: "hadi.jpg"
  },
  bride: {
    short: "Riya",
    full: "Ilmi Riadoh",
    parents: "Putri dari Alm. Bapak Muhammad Saleh & Ibu Nuralam Rangkuti",
    photo: "Riya.jpg"
  },
  displayName: "Hadi & Riya",
  event: {
    type: "Pemberkatan",
    date: "2026-12-12",
    hour: 12,
    minute: 0,
    endHour: 15,
    endMinute: 0,
    timezone: "+07:00",
    timezoneLabel: "WIB",
    place: "Vihara Sila Paramita",
    address: "Jl. Cipinang Jaya Raya No.1, RT.9/RW.7, Cipinang Besar Selatan, Kecamatan Jatinegara, Kota Jakarta Timur",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Vihara+Sila+Paramita+Jakarta+Timur"
  },
  storyHead: {
    title: "Our Love Story",
    subtitle: "Dari pertemuan menjadi perjalanan.",
    intro: "Dari sebuah pertemuan sederhana, dimulailah sebuah perjalanan yang perlahan menjadi begitu berarti. First Meeting menjadi awal dari sebuah cerita, ketika dua hati dipertemukan dan mulai mengenal satu sama lain. Seiring waktu, tumbuh sebuah keyakinan melalui The Promise, bahwa perjalanan ini layak untuk diperjuangkan bersama. Hingga tiba di Engagement, satu langkah lebih dekat menuju hari yang telah lama dinantikan, menyatukan harapan dan impian dalam satu tujuan. Dan akhirnya, Our Wedding menjadi hari ketika sebuah janji diucapkan, bukan hanya untuk hari ini, tetapi untuk menjadi keluarga, saling menjaga, saling menguatkan, dan berjalan bersama menuju selamanya."
  },
  story: [
    { date: "", title: "First Meeting", text: "Awal dari sebuah cerita yang sederhana, namun menjadi begitu berarti." },
    { date: "", title: "The Promise", text: "Saat dua hati mulai yakin bahwa perjalanan ini layak diperjuangkan bersama." },
    { date: "", title: "Engagement", text: "Satu langkah lebih dekat menuju hari yang telah lama dinantikan." },
    { date: "", title: "Our Wedding", text: "Hari ketika sebuah janji diucapkan untuk menjadi keluarga selamanya." }
  ],
  gallery: ["foto1.jpg", "fpjang1.jpg", "foto2.jpg", "foto3.jpg", "fpjang2.jpg", "foto4.jpg", "foto5.jpg"],
  gifts: [
    { bank: "BCA", number: "4960141968", name: "Hadianto Kurniawan Tan" },
    { bank: "BCA", number: "2680150420", name: "Ilmi Riadoh" }
  ],
  bgPhoto: "gunung.jpg",
  greeting: {
    salam: "Salam sejahtera, semoga semua makhluk berbahagia",
    title: "Dengan Penuh Sukacita",
    text: "Dengan memohon berkah Tuhan Yang Maha Esa, kami mengundang Bapak/Ibu/Saudara/i untuk hadir dan memberikan doa restu pada hari pemberkatan pernikahan kami.",
    verse: "Semoga cinta yang tulus menuntun langkah kami dalam kebajikan, kebijaksanaan, dan kebahagiaan."
  },
  closing: "Merupakan kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu. Atas kehadiran dan doanya, kami ucapkan terima kasih.",
  music: { src: "Ka.mp3", volume: 0.6 },
  // Isi dengan URL Google Apps Script Web App setelah backend disiapkan.
  // Jika kosong, RSVP dan ucapan hanya tersimpan pada browser perangkat tamu.
  backendUrl: ""
};

const $ = (selector, root = document) => root.querySelector(selector);
const E = CONFIG.event;
const pad2 = n => String(n).padStart(2, "0");
const escapeHTML = value => String(value ?? "").replace(/[&<>"']/g, char => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
}[char]));
const start = new Date(`${E.date}T${pad2(E.hour)}:${pad2(E.minute)}:00${E.timezone}`);
const end = new Date(`${E.date}T${pad2(E.endHour)}:${pad2(E.endMinute)}:00${E.timezone}`);
const dateFormatter = new Intl.DateTimeFormat("id-ID", { timeZone: "Asia/Jakarta" });
const formatDate = options => new Intl.DateTimeFormat("id-ID", { timeZone: "Asia/Jakarta", ...options }).format(start);
const timeText = `${pad2(E.hour)}.${pad2(E.minute)}–${pad2(E.endHour)}.${pad2(E.endMinute)} ${E.timezoneLabel}`;
const toast = message => {
  const el = $("#toast");
  if (!el) return;
  el.textContent = message;
  el.classList.add("show");
  window.setTimeout(() => el.classList.remove("show"), 2400);
};

// Isi teks dasar
const bindings = {
  shortNames: CONFIG.displayName,
  dateShort: formatDate({ day: "2-digit", month: "2-digit", year: "numeric" }).replace(/\//g, "."),
  dateLong: formatDate({ weekday: "long", day: "numeric", month: "long", year: "numeric" }),
  fullNames: `${CONFIG.groom.full} & ${CONFIG.bride.full}`
};
document.querySelectorAll("[data-bind]").forEach(el => {
  const value = bindings[el.dataset.bind];
  if (value != null) el.textContent = value;
});
document.title = `Undangan Pernikahan ${CONFIG.displayName}`;

// Nama dan foto mempelai
[["groom", CONFIG.groom], ["bride", CONFIG.bride]].forEach(([key, person]) => {
  const short = $("#" + key + "Short");
  const full = $("#" + key + "Full");
  const parents = $("#" + key + "Parents");
  const photo = $("#" + key + "Photo");
  if (short) short.textContent = person.short;
  if (full) full.textContent = person.full;
  if (parents) parents.textContent = person.parents;
  if (photo) {
    photo.src = person.photo;
    photo.onerror = () => { photo.removeAttribute("src"); };
  }
});

// Detail acara
[["#eventType", E.type], ["#eventDate", bindings.dateLong], ["#eventTime", `Pukul ${timeText}`], ["#eventPlace", E.place], ["#eventAddr", E.address]].forEach(([selector, value]) => {
  const el = $(selector);
  if (el) el.textContent = value;
});
const mapButton = $("#mapBtn");
if (mapButton) {
  mapButton.href = E.mapUrl;
  mapButton.target = "_blank";
  mapButton.rel = "noopener noreferrer";
}

// Google Calendar: gunakan waktu UTC yang dihitung dari tanggal dengan offset WIB.
const calendarStamp = date => date.toISOString().replace(/[-:]|\.\d{3}/g, "");
const calendarButton = $("#calBtn");
if (calendarButton) {
  const calendarParams = new URLSearchParams({
    action: "TEMPLATE",
    text: `${E.type} ${CONFIG.displayName}`,
    dates: `${calendarStamp(start)}/${calendarStamp(end)}`,
    details: `Pemberkatan pernikahan ${CONFIG.displayName}.`,
    location: `${E.place}, ${E.address}`,
    ctz: "Asia/Jakarta"
  });
  calendarButton.href = `https://calendar.google.com/calendar/render?${calendarParams.toString()}`;
  calendarButton.target = "_blank";
  calendarButton.rel = "noopener noreferrer";
}

// Nama tamu dari URL, contoh: ?to=Bapak%20Andi
const guest = new URLSearchParams(window.location.search).get("to");
if (guest && $("#guestName")) $("#guestName").textContent = guest.replace(/\+/g, " ").trim() || "Tamu Undangan";

// Cerita cinta dan timeline
if ($("#storyTitle")) $("#storyTitle").textContent = CONFIG.storyHead.title;
if ($("#storySub")) $("#storySub").textContent = CONFIG.storyHead.subtitle;
if ($("#storyIntro")) $("#storyIntro").textContent = `“${CONFIG.storyHead.intro}”`;
if ($("#timeline")) {
  $("#timeline").innerHTML = CONFIG.story.map(item =>
    `<div class="tl-item">${item.date ? `<time>${escapeHTML(item.date)}</time>` : ""}<h3>${escapeHTML(item.title)}</h3><p>${escapeHTML(item.text)}</p></div>`
  ).join("");
}

// Galeri dan lightbox
const galleryGrid = $("#galleryGrid");
const lightbox = $("#lightbox");
if (galleryGrid) {
  galleryGrid.innerHTML = CONFIG.gallery.map((src, index) =>
    `<button type="button" class="${/fpjang/i.test(src) ? "tall" : ""}" data-src="${escapeHTML(src)}" aria-label="Lihat foto ${index + 1}"><img src="${escapeHTML(src)}" alt="Foto prewedding ${index + 1}" loading="lazy"></button>`
  ).join("");
  galleryGrid.addEventListener("click", event => {
    const button = event.target.closest("button[data-src]");
    if (!button || !lightbox) return;
    const image = $("img", lightbox);
    if (image) image.src = button.dataset.src;
    lightbox.hidden = false;
  });
}
if (lightbox) {
  lightbox.addEventListener("click", event => {
    if (event.target === lightbox || event.target.closest("button")) lightbox.hidden = true;
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") lightbox.hidden = true;
  });
}

// Kartu hadiah dan tombol salin rekening
const giftList = $("#giftList");
if (giftList) {
  giftList.innerHTML = CONFIG.gifts.map(gift => `
    <div class="gift">
      <div class="card">
        <div class="card-top"><b>${escapeHTML(gift.bank)}</b><span>Hadiah Digital</span></div>
        <i class="chip" aria-hidden="true"></i>
        <div class="card-no">${escapeHTML(gift.number.replace(/(.{4})/g, "$1 ").trim())}</div>
        <div class="card-name">${escapeHTML(gift.name)}</div>
      </div>
      <button class="btn" type="button" data-copy="${escapeHTML(gift.number)}">Salin Nomor Rekening</button>
    </div>`).join("");
  giftList.addEventListener("click", async event => {
    const button = event.target.closest("[data-copy]");
    if (!button) return;
    const number = button.dataset.copy;
    try {
      if (!navigator.clipboard || !window.isSecureContext) throw new Error("Clipboard tidak tersedia");
      await navigator.clipboard.writeText(number);
      toast("Nomor rekening berhasil disalin");
    } catch {
      window.prompt("Salin nomor rekening berikut:", number);
    }
  });
}

// Musik dan buka undangan
const audio = $("#bgm");
const musicButton = $("#musicBtn");
if (audio) {
  audio.src = CONFIG.music.src;
  audio.volume = Math.max(0, Math.min(1, Number(CONFIG.music.volume) || 0.6));
}
async function setMusic(shouldPlay) {
  if (!audio || !musicButton) return;
  if (!shouldPlay) {
    audio.pause();
    musicButton.classList.remove("on");
    musicButton.textContent = "▶";
    return;
  }
  try {
    await audio.play();
    musicButton.classList.add("on");
    musicButton.textContent = "♪";
  } catch {
    musicButton.classList.remove("on");
    musicButton.textContent = "▶";
    toast("Musik belum dapat diputar. Periksa file Ka.mp3.");
  }
}
if (musicButton) musicButton.addEventListener("click", () => setMusic(!!audio && audio.paused));

// Animasi scroll observer
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const observer = "IntersectionObserver" in window ? new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("in");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 }) : null;
document.querySelectorAll(".reveal").forEach(el => {
  if (reducedMotion || !observer) el.classList.add("in");
  else observer.observe(el);
});

// Hitung mundur ke waktu pemberkatan (WIB)
function updateCountdown() {
  const remaining = Math.max(0, start.getTime() - Date.now());
  const seconds = Math.floor(remaining / 1000);
  const values = {
    d: Math.floor(seconds / 86400),
    h: Math.floor((seconds % 86400) / 3600),
    m: Math.floor((seconds % 3600) / 60),
    s: seconds % 60
  };
  Object.entries(values).forEach(([key, value]) => {
    const el = $("#cd-" + key);
    if (el) el.textContent = String(value);
  });
}
updateCountdown();
window.setInterval(updateCountdown, 1000);

// RSVP dan ucapan: lokal jika backendUrl belum diisi.
const STORAGE = { wishes: "undangan_wishes", rsvp: "undangan_rsvp" };
const online = /^https:\/\//i.test(CONFIG.backendUrl.trim());
const storageInfo = $("#storageInfo");
if (storageInfo) {
  storageInfo.textContent = online
    ? "Ucapan akan disimpan melalui layanan online."
    : "Penyimpanan online belum diaktifkan. Ucapan hanya tersimpan pada browser perangkat ini dan tidak terlihat oleh tamu lain.";
}
function readLocal(key) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || "[]");
    return Array.isArray(value) ? value : [];
  } catch { return []; }
}
function writeLocal(key, items) {
  try { localStorage.setItem(key, JSON.stringify(items)); return true; }
  catch { return false; }
}
async function sendData(type, data) {
  if (!online) {
    const items = readLocal(STORAGE[type]);
    items.unshift({ ...data, time: Date.now() });
    if (!writeLocal(STORAGE[type], items.slice(0, 200))) throw new Error("Penyimpanan browser penuh atau tidak tersedia");
    return;
  }
  const response = await fetch(CONFIG.backendUrl, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({ type, ...data })
  });
  if (!response.ok) throw new Error("Server tidak merespons dengan baik");
  const result = await response.json();
  if (!result.ok) throw new Error(result.error || "Gagal menyimpan data");
}
function renderWishes(items) {
  const list = $("#wishList");
  if (!list) return;
  if (!items.length) {
    list.innerHTML = "<li><p>Belum ada ucapan. Jadilah yang pertama.</p></li>";
    return;
  }
  list.innerHTML = items.map(item => {
    const timestamp = Number(item.time);
    const dateLabel = Number.isFinite(timestamp) && timestamp > 0
      ? new Date(timestamp).toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" })
      : "";
    return `<li><b>${escapeHTML(item.name)}</b><small>${escapeHTML(dateLabel)}</small><p>${escapeHTML(item.message)}</p></li>`;
  }).join("");
}
async function loadWishes() {
  if (!online) {
    renderWishes(readLocal(STORAGE.wishes));
    return;
  }
  try {
    const response = await fetch(`${CONFIG.backendUrl}?action=wishes`, { cache: "no-store" });
    if (!response.ok) throw new Error("Gagal memuat ucapan");
    const result = await response.json();
    renderWishes(Array.isArray(result.wishes) ? result.wishes : []);
  } catch {
    const list = $("#wishList");
    if (list) list.innerHTML = "<li><p>Ucapan belum dapat dimuat. Silakan muat ulang halaman beberapa saat lagi.</p></li>";
  }
}
loadWishes();

function setupForm(formSelector, noteSelector, type, buildData, successMessage) {
  const form = $(formSelector);
  const note = $(noteSelector);
  if (!form || !note) return;
  form.addEventListener("submit", async event => {
    event.preventDefault();
    const fields = Object.fromEntries(new FormData(form));
    const name = String(fields.name || "").trim();
    const message = String(fields.message || "").trim();
    if (!name || (type === "wishes" && !message)) {
      note.textContent = "Mohon lengkapi semua kolom yang wajib diisi.";
      note.className = "note err";
      return;
    }
    if (type === "rsvp") {
      const guests = Number(fields.guests);
      if (!Number.isInteger(guests) || guests < 1 || guests > 5) {
        note.textContent = "Jumlah tamu harus antara 1 sampai 5 orang.";
        note.className = "note err";
        return;
      }
    }
    if (type === "wishes" && message.length > 300) {
      note.textContent = "Ucapan maksimal 300 karakter.";
      note.className = "note err";
      return;
    }
    const button = $("button[type='submit']", form);
    if (button) button.disabled = true;
    note.className = "note";
    note.textContent = "Sedang menyimpan...";
    try {
      await sendData(type, buildData(fields));
      note.textContent = successMessage;
      form.reset();
      if (type === "wishes") await loadWishes();
    } catch (error) {
      note.textContent = online
        ? "Data belum berhasil dikirim. Periksa koneksi atau konfigurasi server, lalu coba lagi."
        : "Data tidak berhasil disimpan pada perangkat ini. Coba lagi.";
      note.className = "note err";
    } finally {
      if (button) button.disabled = false;
    }
  });
}
setupForm("#rsvpForm", "#rsvpNote", "rsvp",
  fields => ({ name: String(fields.name).trim(), attend: fields.attend, guests: Number(fields.guests) || 1 }),
  online ? "Terima kasih, konfirmasi kehadiran Anda sudah terkirim." : "Konfirmasi tersimpan di browser ini saja; penyimpanan online belum diaktifkan."
);
setupForm("#wishForm", "#wishNote", "wishes",
  fields => ({ name: String(fields.name).trim(), message: String(fields.message).trim() }),
  online ? "Terima kasih atas ucapan dan doanya." : "Ucapan ditampilkan di bawah dan hanya tersimpan di browser ini."
);

// Salam pembuka dan penutup
const greeting = CONFIG.greeting;
if ($("#gSalam")) $("#gSalam").textContent = greeting.salam;
if ($("#gTitle")) $("#gTitle").textContent = greeting.title;
if ($("#gText")) $("#gText").textContent = greeting.text;
if ($("#gVerse")) $("#gVerse").textContent = `“${greeting.verse}”`;
if ($("#closingText")) $("#closingText").textContent = CONFIG.closing;

// Foto latar opsional; bila gagal dimuat, CSS tetap memakai mountain.svg.
if (CONFIG.bgPhoto) {
  const backgroundImage = new Image();
  backgroundImage.onload = () => {
    document.documentElement.style.setProperty("--bg-img", `url("${CONFIG.bgPhoto}")`);
    document.body.classList.add("has-photo");
  };
  backgroundImage.onerror = () => document.body.classList.remove("has-photo");
  backgroundImage.src = CONFIG.bgPhoto;
}

// Tombol buka undangan — satu handler saja untuk menghindari perilaku ganda.
const openButton = $("#openBtn");
const cover = $("#cover");
const bottomNav = $("#bottomNav");
const scrollButton = $("#scrollBtn");
if (openButton) {
  openButton.addEventListener("click", () => {
    if (cover) cover.classList.add("open");
    document.body.classList.remove("locked");
    if (musicButton) musicButton.hidden = false;
    if (bottomNav) bottomNav.hidden = false;
    if (scrollButton) scrollButton.hidden = false;
    if (audio) audio.load();
    setMusic(true);
    startLeaves();
    window.setTimeout(() => { if (cover) cover.style.display = "none"; }, 950);
    if (AUTOSCROLL.enabled && !reducedMotion) {
      window.setTimeout(() => {
        window.scrollTo(0, 0);
        setAutoScroll(true, true);
      }, 2500);
    }
  }, { once: true });
}

// Animasi daun jatuh
function startLeaves() {
  const container = $("#fall");
  if (!container || reducedMotion || container.childElementCount) return;
  const colors = ["#a9b8a0", "#5f7d66", "#2c4636", "#d8bd7e"];
  for (let index = 0; index < 14; index++) {
    const leaf = document.createElement("i");
    const size = 10 + Math.random() * 14;
    Object.assign(leaf.style, {
      left: `${Math.random() * 100}%`, width: `${size}px`, height: `${size}px`,
      background: colors[index % colors.length],
      animationDuration: `${12 + Math.random() * 12}s`,
      animationDelay: `${-Math.random() * 20}s`
    });
    container.appendChild(leaf);
  }
}

// Gulir otomatis dengan jeda ketika pengguna menyentuh layar atau mengisi formulir.
const AUTOSCROLL = { enabled: true, speed: 45, resumeAfter: 3000 };
let autoScrollOn = false;
let autoScrollPaused = false;
let autoScrollFrame = 0;
let previousFrameTime = 0;
let scrollRemainder = 0;
let resumeTimer = 0;
function setAutoScroll(enabled, quiet = false) {
  autoScrollOn = enabled && !reducedMotion;
  if (scrollButton) {
    scrollButton.classList.toggle("on", autoScrollOn);
    scrollButton.setAttribute("aria-pressed", String(autoScrollOn));
    scrollButton.textContent = autoScrollOn ? "⏸" : "⇩";
  }
  document.documentElement.style.scrollBehavior = autoScrollOn ? "auto" : "";
  if (autoScrollFrame) cancelAnimationFrame(autoScrollFrame);
  previousFrameTime = 0;
  if (autoScrollOn) autoScrollFrame = requestAnimationFrame(autoScrollLoop);
  else autoScrollFrame = 0;
  if (!quiet) toast(autoScrollOn ? "Gulir otomatis aktif" : "Gulir otomatis dimatikan");
}
function autoScrollLoop(timestamp) {
  if (!autoScrollOn) return;
  if (previousFrameTime && !autoScrollPaused) {
    scrollRemainder += ((timestamp - previousFrameTime) / 1000) * AUTOSCROLL.speed;
    const pixels = Math.floor(scrollRemainder);
    if (pixels > 0) {
      scrollRemainder -= pixels;
      window.scrollBy(0, pixels);
    }
    const root = document.documentElement;
    if (window.innerHeight + window.scrollY >= roottype]); arr.unshift({ ...data, time: Date.now() }); saveLocal(LS[type], arr.slice(0, 200)); return; }
  // text/plain menghindari preflight CORS pada Apps Script
  const r = await fetch(CONFIG.backendUrl, { method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify({ type, ...data }) });
  const j = await r.json(); if (!j.ok) throw new Error(j.error || "Gagal menyimpan");
}

function renderWishes(list) {
  $("#wishList").innerHTML = list.length ? list.map(w =>
    `<li><b>${esc(w.name)}</b><small>${new Date(w.time).toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" })}</small><p>${esc(w.message)}</p></li>`).join("")
    : `<li><p>Belum ada ucapan. Jadilah yang pertama.</p></li>`;
}
async function loadWishes() {
  if (!online) return renderWishes(local(LS.wishes));
  try { const r = await fetch(CONFIG.backendUrl + "?action=wishes"); const j = await r.json(); renderWishes(j.wishes || []); }
  catch { $("#wishList").innerHTML = `<li><p>Ucapan belum bisa dimuat. Muat ulang halaman.</p></li>`; }
}
loadWishes();

function handle(form, noteEl, type, build, ok) {
  form.addEventListener("submit", async e => {
    e.preventDefault();
    const fd = Object.fromEntries(new FormData(form));
    noteEl.className = "note";
    if (!fd.name.trim() || (type === "wishes" && !fd.message.trim())) { noteEl.textContent = "Lengkapi semua kolom."; noteEl.classList.add("err"); return; }
    const btn = form.querySelector("button"); btn.disabled = true; noteEl.textContent = "Mengirim...";
    try { await send(type, build(fd)); noteEl.textContent = ok; form.reset(); if (type === "wishes") loadWishes(); }
    catch (err) { noteEl.textContent = "Gagal mengirim. Coba lagi."; noteEl.classList.add("err"); }
    btn.disabled = false;
  });
}
handle($("#rsvpForm"), $("#rsvpNote"), "rsvp",
  fd => ({ name: fd.name.trim(), attend: fd.attend, guests: Number(fd.guests) || 1 }),
  online ? "Terima kasih, konfirmasi Anda sudah terkirim." : "Tersimpan di perangkat ini (backend belum terhubung).");
handle($("#wishForm"), $("#wishNote"), "wishes",
  fd => ({ name: fd.name.trim(), message: fd.message.trim() }),
  online ? "Terima kasih atas ucapannya." : "Ucapan tampil di bawah (tersimpan lokal, belum online).");

/* --- bagian tambahan --- */
const G = CONFIG.greeting;
$("#gSalam").textContent = G.salam; $("#gTitle").textContent = G.title;
$("#gText").textContent = G.text; $("#gVerse").textContent = G.verse;
$("#closingText").textContent = CONFIG.closing;
document.querySelectorAll(".reveal:not(.in)").forEach(el => io.observe(el));

const bgImg = new Image();
bgImg.onload = () => { document.documentElement.style.setProperty("--bg-img", `url("${CONFIG.bgPhoto}")`); document.body.classList.add("has-photo"); };
bgImg.src = CONFIG.bgPhoto;

$("#openBtn").addEventListener("click", () => { $("#bottomNav").hidden = false; });

/* =========================================================
   ANIMASI & GULIR OTOMATIS
   ========================================================= */
const AUTOSCROLL = { enabled: true, speed: 45, resumeAfter: 3000 };   // speed = piksel per detik
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

// Animasi masuk bervariasi
const tag = (sel, type, step = 0.12) => document.querySelectorAll(sel).forEach((el, i) => {
  el.classList.add("anim"); el.dataset.anim = type; el.style.setProperty("--d", (i * step) + "s"); io.observe(el);
});
tag(".person:first-child", "left"); tag(".person:last-child", "right");
tag(".amp", "zoom"); tag(".countdown div", "zoom", .15); tag(".tl-item", "left", .15);
tag(".grid button", "zoom", .1); tag(".gift", "up"); 
tag(".wish-list li", "up", .06); tag(".quote,.verse,.story-sub,.story-intro", "up");
// garis timeline & judul ikut "in"
new IntersectionObserver((es, o) => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); o.unobserve(e.target); } }), { threshold: .1 })
  .observe($("#timeline"));

// Detik hitung mundur berdenyut
const sEl = $("#cd-s"); let lastS = "";
setInterval(() => { if (sEl.textContent !== lastS) { lastS = sEl.textContent; sEl.classList.remove("tick"); void sEl.offsetWidth; sEl.classList.add("tick"); } }, 250);

// Bilah progres
const prog = $("#progress");
addEventListener("scroll", () => {
  const h = document.documentElement; prog.style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight || 1) * 100) + "%";
}, { passive: true });

// Daun berjatuhan
function startLeaves() {
  if (reduce) return;
  const box = $("#fall"), cols = ["#a9b8a0", "#5f7d66", "#2c4636", "#d8bd7e"];
  for (let i = 0; i < 14; i++) {
    const l = document.createElement("i"), s = 10 + Math.random() * 14;
    Object.assign(l.style, { left: Math.random() * 100 + "%", width: s + "px", height: s + "px", background: cols[i % 4],
      animationDuration: 12 + Math.random() * 12 + "s", animationDelay: -Math.random() * 20 + "s" });
    box.appendChild(l);
  }
}

// Gulir otomatis (bisa dimatikan)
const sBtn = $("#scrollBtn"), root = document.documentElement;
let autoOn = false, paused = false, resumeT, last = 0, acc = 0;
function setAuto(on, quiet) {
  autoOn = on; sBtn.classList.toggle("on", on); sBtn.setAttribute("aria-pressed", on);
  sBtn.textContent = on ? "⏸" : "⇩";
  root.style.scrollBehavior = on ? "auto" : "";
  if (on) { last = 0; requestAnimationFrame(loop); }
  if (!quiet) toast(on ? "Gulir otomatis aktif" : "Gulir otomatis dimatikan");
}
function loop(t) {
  if (!autoOn) return;
  if (last && !paused) {
    acc += (t - last) / 1000 * AUTOSCROLL.speed;
    if (acc >= 1) { const px = Math.floor(acc); acc -= px; scrollBy(0, px); }
    if (innerHeight + scrollY >= root.scrollHeight - 2) return setAuto(false);   // berhenti di akhir
  }
  last = t; requestAnimationFrame(loop);
}
const hold = () => { paused = true; clearTimeout(resumeT); };
const release = () => { clearTimeout(resumeT); resumeT = setTimeout(() => paused = false, AUTOSCROLL.resumeAfter); };
["touchstart", "wheel", "mousedown", "keydown"].forEach(ev => addEventListener(ev, e => { if (autoOn && !e.target.closest?.("#scrollBtn")) { hold(); release(); } }, { passive: true }));
["touchend", "touchcancel"].forEach(ev => addEventListener(ev, () => autoOn && release(), { passive: true }));
document.addEventListener("focusin", e => { if (e.target.matches("input,textarea,select")) hold(); });
document.addEventListener("focusout", () => autoOn && release());
sBtn.addEventListener("click", () => setAuto(!autoOn));
$("#bottomNav").addEventListener("click", () => autoOn && (hold(), release()));

$("#openBtn").addEventListener("click", () => {
  sBtn.hidden = false; startLeaves();
  if (AUTOSCROLL.enabled && !reduce) setTimeout(() => { scrollTo(0, 0); setAuto(true); }, 2500);
});
  
