/* =========================================================
   KONFIGURASI — edit bagian ini saja
   ========================================================= */
const CONFIG = {
  groom: { short: "Hadi", full: "Hadianto Kurniawan Tan", parents: "Putra dari Bapak Tan Tjoen Hwa & Ibu Tjhin Tjhiu Loe", photo: "hadi.jpg" },
  bride: { short: "Riya", full: "Ilmi Riadoh", parents: "Putri dari Alm. Bapak Muhammad Saleh & Ibu Nuralam Rangkuti", photo: "Riya.jpg" },
  displayName: "Hadi & Riya",

  event: {
    type: "Pemberkatan",
    date: "2026-12-12",          // format YYYY-MM-DD
    hour: 12, minute: 0,         // jam mulai 12:00
    endHour: 15, endMinute: 0,   // jam selesai 15:00
    timezone: "+07:00",          // WIB
    timezoneLabel: "WIB",
    place: "Vihara Sila Paramita",
    address: "Jl. Cipinang Jaya Raya No.1, RT.9/RW.7, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur",
    mapUrl: "https://www.google.com/search?client=ms-android-oppo-terr1-rso2&hs=UqSB&sca_esv=625741e31c07c5f2&sxsrf=APpeQntpse-SGIxQ2FalxA-8Osb68DwIDw%3A1791768086280&kgmid=%2Fg%2F11x8qq21gy&q=Vihara%20Sila%20Paramita&shem=epsd1%2Cltae%2Crimspwouoe&shndl=30&source=sh%2Fx%2Floc%2Fact%2Fm1%2F2&kgs=501303c258c4ea3a",
    
  },

  storyHead: {
    title: "Our Love Story",
    subtitle: "Dari pertemuan menjadi perjalanan.",
    intro: "“Dari sebuah pertemuan sederhana, dimulailah sebuah perjalanan yang perlahan menjadi begitu berarti. First Meeting menjadi awal dari sebuah cerita, ketika dua hati dipertemukan dan mulai mengenal satu sama lain. Seiring waktu, tumbuh sebuah keyakinan melalui The Promise, bahwa perjalanan ini layak untuk diperjuangkan bersama. Hingga tiba di Engagement, satu langkah lebih dekat menuju hari yang telah lama dinantikan, menyatukan harapan dan impian dalam satu tujuan. Dan akhirnya, Our Wedding menjadi hari ketika sebuah janji diucapkan, bukan hanya untuk hari ini, tetapi untuk menjadi keluarga, saling menjaga, saling menguatkan, dan berjalan bersama menuju selamanya.”"
  },
  // "date" boleh dikosongkan
  story: [
    { date: "", title: "First Meeting", text: "Awal dari sebuah cerita yang sederhana, namun menjadi begitu berarti." },
    { date: "", title: "The Promise", text: "Saat dua hati mulai yakin bahwa perjalanan ini layak diperjuangkan bersama." },
    { date: "", title: "Engagement", text: "Satu langkah lebih dekat menuju hari yang telah lama dinantikan." },
    { date: "", title: "Our Wedding", text: "Hari ketika sebuah janji diucapkan untuk menjadi keluarga selamanya." }
  ],

  // Nama file foto (satu folder dengan index.html)
  gallery: ["foto1.jpg","fpjang1.jpg","foto2.jpg","foto3.jpg","fpjang2.jpg","foto4.jpg","foto5.jpg"],   // "fpjang" = foto panjang (tampil tinggi)

  // Daftar rekening / e-wallet — ganti dengan data asli
  gifts: [
    { bank: "BCA", number: "4960141968", name: "Hadianto Kurniawan Tan" },
    { bank: "BCA", number: "2680150420", name: "Ilmi Riadoh" }
  ],

  // Foto latar pegunungan milik Anda (opsional). Jika file ada, menggantikan ilustrasi bawaan mountain.svg
  bgPhoto: "gunung.jpg",

  greeting: {
    salam: "Salam sejahtera, semoga semua makhluk berbahagia",
    title: "Dengan Penuh Sukacita",
    text: "Dengan memohon berkah Tuhan Yang Maha Esa dan, kami mengundang Bapak/Ibu/Saudara/i untuk hadir dan memberikan doa restu pada hari pemberkatan pernikahan kami.",
    verse: "“Semoga cinta yang tulus menuntun langkah kami dalam kebajikan, kebijaksanaan, dan kebahagiaan.”"
  },

  closing: "Merupakan kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu. Atas kehadiran dan doanya, kami ucapkan terima kasih.",

  music: { src: "Ka.mp3", volume: 0.6 },   // taruh file MP3 sendiri (bebas hak cipta / berlisensi)

  /* URL Google Apps Script Web App (lihat petunjuk). Kosongkan = BELUM terhubung:
     RSVP & ucapan hanya tersimpan di browser perangkat ini, tidak online. */
  backendUrl: ""
};

/* ========================================================= */
const $ = (s, r = document) => r.querySelector(s);
const E = CONFIG.event;
const start = new Date(`${E.date}T${String(E.hour).padStart(2,"0")}:${String(E.minute).padStart(2,"0")}:00${E.timezone}`);
const fmt = (o) => start.toLocaleDateString("id-ID", { timeZone: "Asia/Jakarta", ...o });
const p2 = (n) => String(n).padStart(2, "0");
const timeStr = `${p2(E.hour)}.${p2(E.minute)} - ${p2(E.endHour)}.${p2(E.endMinute)} ${E.timezoneLabel}`;
const esc = (t) => String(t).replace(/[&<>"']/g, c => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[c]));
const toast = (m) => { const t = $("#toast"); t.textContent = m; t.classList.add("show"); setTimeout(() => t.classList.remove("show"), 2200); };

/* --- isi data --- */
const binds = {
  shortNames: CONFIG.displayName,
  dateShort: fmt({ day: "2-digit", month: "2-digit", year: "numeric" }).replace(/\//g, "."),
  dateLong: fmt({ weekday: "long", day: "numeric", month: "long", year: "numeric" }),
  fullNames: `${CONFIG.groom.full} & ${CONFIG.bride.full}`
};
document.querySelectorAll("[data-bind]").forEach(el => el.textContent = binds[el.dataset.bind]);
document.title = `Undangan Pernikahan ${CONFIG.displayName}`;

[["groom", CONFIG.groom], ["bride", CONFIG.bride]].forEach(([k, p]) => {
  $("#" + k + "Short").textContent = p.short;
  $("#" + k + "Full").textContent = p.full;
  $("#" + k + "Parents").textContent = p.parents;
  const img = $("#" + k + "Photo"); img.src = p.photo;
  img.onerror = () => { img.removeAttribute("src"); };
});
$("#eventType").textContent = E.type;
$("#eventDate").textContent = binds.dateLong;
$("#eventTime").textContent = `Pukul ${timeStr}`;
$("#eventPlace").textContent = E.place;
$("#eventAddr").textContent = E.address;
$("#mapBtn").href = E.mapUrl;

// Kalender (Google Calendar)
const iso = (d) => d.toISOString().replace(/[-:]|\.\d{3}/g, "");
const end = new Date(`${E.date}T${p2(E.endHour)}:${p2(E.endMinute)}:00${E.timezone}`);
$("#calBtn").href = "https://calendar.google.com/calendar/render?action=TEMPLATE" +
  `&text=${encodeURIComponent(E.type + " " + CONFIG.displayName)}&dates=${iso(start)}/${iso(end)}` +
  `&location=${encodeURIComponent(E.place + ", " + E.address)}`;

// Nama tamu dari link: ?to=Nama+Tamu
const to = new URLSearchParams(location.search).get("to");
if (to) $("#guestName").textContent = to;

/* --- cerita, galeri, hadiah --- */
$("#storyTitle").textContent = CONFIG.storyHead.title;
$("#storySub").textContent = CONFIG.storyHead.subtitle;
$("#storyIntro").textContent = CONFIG.storyHead.intro;
$("#timeline").innerHTML = CONFIG.story.map(s =>
  `<div class="tl-item">${s.date ? `<time>${esc(s.date)}</time>` : ""}<h3>${esc(s.title)}</h3><p>${esc(s.text)}</p></div>`).join("");

$("#galleryGrid").innerHTML = CONFIG.gallery.map((src, i) =>
  `<button type="button" class="${/fpjang/i.test(src) ? "tall" : ""}" data-src="${esc(src)}" aria-label="Lihat foto ${i + 1}"><img src="${esc(src)}" alt="Foto prewedding ${i + 1}" loading="lazy"></button>`).join("");
const lb = $("#lightbox");
$("#galleryGrid").addEventListener("click", e => {
  const b = e.target.closest("button"); if (!b) return;
  lb.querySelector("img").src = b.dataset.src; lb.hidden = false;
});
lb.addEventListener("click", () => lb.hidden = true);
document.addEventListener("keydown", e => { if (e.key === "Escape") lb.hidden = true; });

$("#giftList").innerHTML = CONFIG.gifts.map(g => `
  <div class="gift">
    <div class="card">
      <div class="card-top"><b>${esc(g.bank)}</b><span>Hadiah Digital</span></div>
      <i class="chip"></i>
      <div class="card-no">${esc(g.number).replace(/(.{4})/g, "$1 ").trim()}</div>
      <div class="card-name">${esc(g.name)}</div>
    </div>
    <button class="btn" type="button" data-copy="${esc(g.number)}">Salin Nomor Rekening</button>
  </div>`).join("");
$("#giftList").addEventListener("click", async e => {
  const b = e.target.closest("[data-copy]"); if (!b) return;
  try { await navigator.clipboard.writeText(b.dataset.copy); toast("Nomor disalin"); }
  catch { toast("Salin manual: " + b.dataset.copy); }
});

/* --- cover & musik --- */
const audio = $("#bgm"), mBtn = $("#musicBtn");
audio.src = CONFIG.music.src; audio.volume = CONFIG.music.volume;
function setMusic(on) {
  if (on) audio.play().then(() => { mBtn.classList.add("on"); mBtn.textContent = "♪"; }).catch(() => toast("File musik tidak ditemukan"));
  else { audio.pause(); mBtn.classList.remove("on"); mBtn.textContent = "▶"; }
}
mBtn.addEventListener("click", () => setMusic(audio.paused));
$("#openBtn").addEventListener("click", () => {
  $("#cover").classList.add("open");
  document.body.classList.remove("locked");
  mBtn.hidden = false;
  audio.load(); setMusic(true);
  setTimeout(() => $("#cover").style.display = "none", 950);
});

/* --- hitung mundur --- */
function tick() {
  let d = Math.max(0, start - Date.now()) / 1000;
  const v = { d: Math.floor(d / 86400), h: Math.floor(d % 86400 / 3600), m: Math.floor(d % 3600 / 60), s: Math.floor(d % 60) };
  for (const k in v) $("#cd-" + k).textContent = v[k];
}
tick(); setInterval(tick, 1000);

/* --- animasi masuk --- */
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: .12 });
document.querySelectorAll(".reveal").forEach(el => io.observe(el));

/* --- RSVP & ucapan --- */
const LS = { wishes: "undangan_wishes", rsvp: "undangan_rsvp" };
const online = !!CONFIG.backendUrl;
$("#storageInfo").textContent = online
  ? "Ucapan tersimpan online dan dapat dilihat semua tamu."
  : "Mode lokal: backend belum terhubung, sehingga ucapan hanya tersimpan di perangkat ini dan tidak dilihat tamu lain.";

const local = (k) => { try { return JSON.parse(localStorage.getItem(k)) || []; } catch { return []; } };
const saveLocal = (k, arr) => { try { localStorage.setItem(k, JSON.stringify(arr)); } catch {} };

async function send(type, data) {
  if (!online) { const arr = local(LS[type]); arr.unshift({ ...data, time: Date.now() }); saveLocal(LS[type], arr.slice(0, 200)); return; }
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
  
