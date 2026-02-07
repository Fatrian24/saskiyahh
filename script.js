// ====== Helpers ======
const $ = (q) => document.querySelector(q);
const $$ = (q) => document.querySelectorAll(q);

function formatTime(sec){
  if (!isFinite(sec)) return "0:00";
  const m = Math.floor(sec/60);
  const s = Math.floor(sec%60).toString().padStart(2,"0");
  return `${m}:${s}`;
}

// ====== Smooth scroll ======
$("#btnScroll").addEventListener("click", () => {
  $("#content").scrollIntoView({ behavior: "smooth" });
});

// ====== Theme Toggle (Night Mode) ======
const btnTheme = $("#btnTheme");
btnTheme.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  btnTheme.textContent = isDark ? "☀️ Mode Terang" : "🌙 Mode Malam";
});

// ====== Random Bucin Quotes (Refresh Random) ======
const quotes = [
  "Kalau aku punya 1 rumah, aku pengen isinya kamu 🥺❤️",
  "Kamu itu bukan pilihan, kamu itu tujuan 💗💙",
  "Aku sayang kamu… berkali-kali, setiap hari.",
  "Kamu capek? Sini… aku peluk 🤍",
  "Kamu adalah hal terbaik yang aku temuin di hidupku ✨",
  "Di dunia yang ramai ini, aku cuma tenang sama kamu.",
  "Kalau kamu tanya aku mau apa… aku mau kamu terus.",
  "Aku jatuh cinta… dan aku nggak mau berdiri lagi 😭💞",
  "Kamu itu definisi 'pulang' buat aku 🏡❤️",
  "Aku gak butuh alasan buat sayang kamu, cukup kamu ada."
];

$("#randomQuote").textContent = quotes[Math.floor(Math.random()*quotes.length)];

// ====== Letter modal ======
const letterModal = $("#letterModal");
$("#btnOpenLetter").addEventListener("click", () => {
  letterModal.classList.remove("hidden");
});
$("#btnCloseLetter").addEventListener("click", () => {
  letterModal.classList.add("hidden");
});
letterModal.addEventListener("click", (e) => {
  if(e.target === letterModal) letterModal.classList.add("hidden");
});

// ====== Lightbox gallery ======
const lightbox = $("#lightbox");
const lightboxImg = $("#lightboxImg");

$$(".photo").forEach(p => {
  p.addEventListener("click", () => {
    const src = p.getAttribute("data-img");
    lightboxImg.src = src;
    lightbox.classList.remove("hidden");
  });
});

$("#btnCloseLightbox").addEventListener("click", () => {
  lightbox.classList.add("hidden");
});
lightbox.addEventListener("click", (e) => {
  if(e.target === lightbox) lightbox.classList.add("hidden");
});

// ====== Floating hearts ======
const heartsLayer = $("#hearts-layer");
function spawnHeart(){
  const heart = document.createElement("div");
  const size = Math.random()*18 + 10;
  const left = Math.random()*100;

  heart.style.position = "absolute";
  heart.style.left = left + "vw";
  heart.style.bottom = "-30px";
  heart.style.width = size + "px";
  heart.style.height = size + "px";
  heart.style.opacity = (Math.random()*0.45 + 0.25).toFixed(2);

  heart.style.background = "linear-gradient(180deg, rgba(255,79,216,0.95), rgba(79,216,255,0.95))";
  heart.style.transform = "rotate(45deg)";
  heart.style.borderRadius = "4px";

  const before = document.createElement("div");
  const after = document.createElement("div");
  [before, after].forEach(el => {
    el.style.position = "absolute";
    el.style.width = "100%";
    el.style.height = "100%";
    el.style.background = "inherit";
    el.style.borderRadius = "999px";
  });
  before.style.left = "-50%";
  after.style.top = "-50%";

  heart.appendChild(before);
  heart.appendChild(after);

  const duration = Math.random()*4 + 4;
  heart.animate([
    { transform: "translateY(0) rotate(45deg)", opacity: heart.style.opacity },
    { transform: `translateY(-110vh) rotate(45deg)`, opacity: 0 }
  ], { duration: duration*1000, easing: "ease-in" });

  heartsLayer.appendChild(heart);
  setTimeout(() => heart.remove(), duration*1000);
}
setInterval(spawnHeart, 450);

// ====== Confetti ======
function burstConfetti(){
  for(let i=0;i<70;i++){
    const p = document.createElement("div");
    p.style.position="fixed";
    p.style.left = (Math.random()*100) + "vw";
    p.style.top = "-10px";
    p.style.width = (Math.random()*6 + 4) + "px";
    p.style.height = (Math.random()*10 + 6) + "px";
    p.style.background = `hsla(${Math.random()*360}, 90%, 65%, 0.9)`;
    p.style.borderRadius = "6px";
    p.style.zIndex = 999;
    p.style.boxShadow = "0 10px 25px rgba(0,0,0,0.25)";

    const drift = (Math.random()*120 - 60);
    const dur = (Math.random()*1.8 + 1.8);

    p.animate([
      { transform: "translateY(0) translateX(0) rotate(0deg)", opacity: 1 },
      { transform: `translateY(110vh) translateX(${drift}px) rotate(720deg)`, opacity: 0.9 }
    ], { duration: dur*1000, easing: "cubic-bezier(.15,.6,.2,1)" });

    document.body.appendChild(p);
    setTimeout(() => p.remove(), dur*1000);
  }
}

$("#btnConfetti").addEventListener("click", burstConfetti);
$("#btnMakeWish").addEventListener("click", () => {
  burstConfetti();
  alert("Wish kamu: Semoga Fatrian & Saskiyah selalu bahagia ❤️");
});

// ====== I LOVE YOU Button Sound + Effect ======
const loveSound = $("#loveSound");
$("#btnLove").addEventListener("click", () => {
  burstConfetti();
  try{
    loveSound.currentTime = 0;
    loveSound.play();
  }catch(err){
    console.log("Audio blocked by browser (klik sekali lagi).");
  }
});

// ====== Anniversary Counter (Auto) ======
// Tanggal jadian: 21 November 2025
const startDate = new Date("2025-11-21T00:00:00");

function updateCounter(){
  const now = new Date();
  let diff = now - startDate;

  // Kalau tanggalnya belum lewat (misal dibuka sebelum 21 Nov 2025)
  if(diff < 0){
    diff = Math.abs(diff);
    const totalSeconds = Math.floor(diff/1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    $("#days").textContent = days;
    $("#hours").textContent = hours;
    $("#minutes").textContent = minutes;
    $("#seconds").textContent = seconds;

    $(".tiny-note").textContent = "Countdown menuju hari jadian kita 💞";
    return;
  }

  const totalSeconds = Math.floor(diff/1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  $("#days").textContent = days;
  $("#hours").textContent = hours;
  $("#minutes").textContent = minutes;
  $("#seconds").textContent = seconds;
}
setInterval(updateCounter, 1000);
updateCounter();

// ====== MUSIC PLAYER (Multi song selectable) ======
const audio = $("#audio");
const progress = $("#progress");
const volume = $("#volume");

const songTitle = $("#songTitle");
const songArtist = $("#songArtist");

const btnPlay = $("#btnPlay");
const btnPrev = $("#btnPrev");
const btnNext = $("#btnNext");
const btnShuffle = $("#btnShuffle");
const btnRepeat = $("#btnRepeat");

const curTime = $("#curTime");
const durTime = $("#durTime");

let isPlaying = false;
let isShuffle = false;
let isRepeat = false;

const songs = [
  { title: "Kota Ini Tak Sama Tanpamu", artist: "Nadhif Basalamah", src: "assets/lagu1.mp3" },
  { title: "Penjaga Hati", artist: "Nadhif Basalamah", src: "assets/lagu2.mp3" },
  { title: "Bergema Sampai Selamanya", artist: "Nadhif Basalamah", src: "assets/lagu3.mp3" },
];

let currentIndex = 0;
const playlistEl = $("#playlist");

function renderPlaylist(){
  playlistEl.innerHTML = "";
  songs.forEach((s, i) => {
    const div = document.createElement("div");
    div.className = "track";
    div.innerHTML = `
      <div class="left">
        <span class="tname">${s.title}</span>
        <span class="tmeta">${s.artist}</span>
      </div>
      <span class="badge">${i === currentIndex ? "Sedang diputar" : "Putar"}</span>
    `;
    div.addEventListener("click", () => {
      loadSong(i);
      playSong();
    });
    playlistEl.appendChild(div);
  });
}

function loadSong(index){
  currentIndex = index;
  audio.src = songs[currentIndex].src;
  songTitle.textContent = songs[currentIndex].title;
  songArtist.textContent = songs[currentIndex].artist;
  renderPlaylist();
}

function playSong(){
  isPlaying = true;
  audio.play();
  btnPlay.textContent = "⏸";
}

function pauseSong(){
  isPlaying = false;
  audio.pause();
  btnPlay.textContent = "▶";
}

btnPlay.addEventListener("click", () => {
  if(!audio.src) loadSong(currentIndex);
  isPlaying ? pauseSong() : playSong();
});

btnPrev.addEventListener("click", () => {
  if(isShuffle){
    loadSong(Math.floor(Math.random()*songs.length));
  } else {
    currentIndex = (currentIndex - 1 + songs.length) % songs.length;
    loadSong(currentIndex);
  }
  playSong();
});

btnNext.addEventListener("click", () => nextSong());

function nextSong(){
  if(isShuffle){
    loadSong(Math.floor(Math.random()*songs.length));
  } else {
    currentIndex = (currentIndex + 1) % songs.length;
    loadSong(currentIndex);
  }
  playSong();
}

btnShuffle.addEventListener("click", () => {
  isShuffle = !isShuffle;
  btnShuffle.style.opacity = isShuffle ? "1" : "0.6";
});

btnRepeat.addEventListener("click", () => {
  isRepeat = !isRepeat;
  btnRepeat.style.opacity = isRepeat ? "1" : "0.6";
});

audio.addEventListener("ended", () => {
  if(isRepeat) playSong();
  else nextSong();
});

audio.addEventListener("timeupdate", () => {
  const percent = (audio.currentTime / audio.duration) * 100 || 0;
  progress.value = percent;
  curTime.textContent = formatTime(audio.currentTime);
  durTime.textContent = formatTime(audio.duration);
});

progress.addEventListener("input", () => {
  const seek = (progress.value/100) * audio.duration;
  audio.currentTime = seek;
});

volume.addEventListener("input", () => {
  audio.volume = volume.value / 100;
});
audio.volume = 0.7;

renderPlaylist();

// ====== Glitter Sparkle Effect (Canvas) ======
const canvas = $("#sparkle");
const ctx = canvas.getContext("2d");
let W, H;

function resize(){
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

const sparkles = Array.from({length: 80}, () => ({
  x: Math.random()*W,
  y: Math.random()*H,
  r: Math.random()*1.8 + 0.6,
  a: Math.random()*0.8 + 0.2,
  s: Math.random()*0.6 + 0.2
}));

function animateSparkle(){
  ctx.clearRect(0,0,W,H);

  sparkles.forEach(sp => {
    sp.y += sp.s;
    sp.x += Math.sin(sp.y*0.01) * 0.3;

    if(sp.y > H + 10){
      sp.y = -10;
      sp.x = Math.random()*W;
    }

    ctx.beginPath();
    ctx.arc(sp.x, sp.y, sp.r, 0, Math.PI*2);
    ctx.fillStyle = `rgba(255,255,255,${sp.a})`;
    ctx.fill();
  });

  requestAnimationFrame(animateSparkle);
}
animateSparkle();
