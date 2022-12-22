// variable assignment document
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PLAYER_STOGARE_KEY = "Anh Nguyễn";

/** Các chức năng:
 * A1 - Render playlist ra màn hình
 * A2 - CD rotate
 * A3 - Ấn để ra playlist
 * A4 - Play,pause,seek + chỉnh âm lượng
 * A5 - Next, previous
 * A6 - Random song
 * A7 - Next or Repeat when ended
 * A8 - Active song trong playlist
 * A9 - Scroll active song lên view
 * A10 - Play song khi click
 */

/* ========== SELECT DOM ELEMENT ========== */
const appMusic = $(".app-music");

const btnShowPlaylist = $(".btn-playlist-show");
const btnHidePlaylist = $(".btn-playlist-hide");
const btnTogglePlaylist = $(".btn-toggle-playlist");

const musicDashboard = $(".music__dashboard");

const cdThumb = $(".cd__thumb");

const titleSongName = $(".title h1");
const titleSongArtist = $(".title h3");

const audio = $("#audio");

const btnControl = $(".ctrl__btn");
const btnPlay = $(".ctrl__btn-tonggle--item");
const btnNext = $(".ctrl__btn--next");
const btnPrev = $(".ctrl__btn--prev");
const btnRandom = $(".ctrl__btn--random");
const btnRepeat = $(".ctrl__btn--repeat");

const progressBar = $(".ctrl__progress--value");

const timeCurrent = $(".ctrl__progress-time--current");
const timeDuration = $(".ctrl__progress-time--duration");

const volumeBar = $(".ctrl__volume--value");
const volumeUp = $(".volume__icon");
const volumeMute = $(".mute");

const playlist = $(".music__playlist");
const playlistBtn = $(".song__thumb");

let theVolume = 100;

/* ========== DEFINE APP ========== */
const app = {
  songs: [
    {
      name: "Mashup Nevada x Di Di Di",
      singer: "Daniel Mastro",
      path: "/assets/music/Mashup Nevada x Di Di Di - Daniel Mastro.mp3",
      image: "/assets/img/dididixnevada.jpg",
    },

    {
      name: "Nevada",
      singer: "Vicetone Cozi Zuehlsdorff",
      path: "/assets/music/Nevada - Vicetone_ Cozi Zuehlsdorff.mp3",
      image: "/assets/img/nevada.jpg",
    },

    {
      name: "Nơi này có anh piano cover",
      singer: "An Coong",
      path: "/assets/music/NoiNayCoAnhPianoCover-AnCoong-4780660.mp3",
      image: "/assets/img/nơi-nay-co-anh-piano.jpg",
    },

    {
      name: "Reality",
      singer: "Lost Frequencies",
      path: "/assets/music/Reality - Lost Frequencies_ Janieck Devy.mp3",
      image: "/assets/img/reality.jpg",
    },

    {
      name: "Set fire to the rain remix",
      singer: "Adele",
      path: "/assets/music/Set Fire To The Rain Remix_ - Adele.mp3",
      image: "/assets/img/set-fire-to-the-rain.jpg",
    },

    {
      name: "Sugar",
      singer: "Maroon 5",
      path: "/assets/music/Sugar - Maroon 5.mp3",
      image: "/assets/img/sugar.jfif",
    },

    {
      name: "Mashup x Something just like this",
      singer: "WilliamYT",
      path: "/assets/music/y2mate.com -  Tik Tok  Umbrella x Something Just Like This x Take A While Remix  Nhạc Mashup Tik Tok Cực Hay.mp3",
      image:
        "/assets/img/Umbrella x Something Just Like This x Take A While Remix.jpg",
    },

    {
      name: "Mood",
      singer: "24kFoldn",
      path: "/assets/music/y2mate.com - 24kGoldn  Mood Official Video ft iann dior.mp3",
      image: "/assets/img/mood.jpg",
    },

    {
      name: "Despair Remix",
      singer: "SeVen.13",
      path: "/assets/music/y2mate.com - Despair Remix  风靡全网的背景  Tik Tok  抖音 DouYin  Bài Hát Hot Trên TikTok Trung Quốc.mp3",
      image: "/assets/img/despair.jpg",
    },

    {
      name: "Funk you",
      singer: "EA7",
      path: "/assets/music/y2mate.com - Funk You Extended Mix  EA7 Funk You五四蹦迪第一弹  Nhạc Nên Tik Tok  Tik Tok  抖音 Douyin.mp3",
      image: "/assets/img/funk-you.jpg",
    },

    {
      name: "Larg",
      singer: "Elgit Doada",
      path: "/assets/music/y2mate.com - Larg.mp3",
      image: "/assets/img/larg.jpg",
    },

    {
      name: "Harehare Ya",
      singer: "Kiyod",
      path: "/assets/music/y2mate.com - Lyrics ハレハレヤHarehare Ya  Cover by Kityod猫瑾醒了吗 full.mp3",
      image: "/assets/img/stream-hare-hare-ya.jpg",
    },

    {
      name: "Ông trời làm tội anh chưa Beat",
      singer: "MINH HANH x RASTZ x QNT ft TUẤN CRY",
      path: "/assets/music/y2mate.com - ÔNG TRỜI LÀM TỘI ANH CHƯA  MINH HANH x RASTZ x QNT ft TUẤN CRY INSTRUMENTAL.mp3",
      image: "/assets/img/ong-troi-lam-toi-anh-chua.jpg",
    },

    {
      name: "Love is gone cover",
      singer: "Slander",
      path: "/assets/music/y2mate.com - SLANDER  Love Is Gone ft Dylan Matthew Acoustic.mp3",
      image: "/assets/img/love-is-gone.jpg",
    },

    {
      name: "You Don't Know Me",
      singer: "Ofenbach",
      path: "/assets/music/y2mate.com - VietsubLyrics You Dont Know Me  Ofenbach Brodie Barclay.mp3",
      image: "/assets/img/you-dont-no-me.jpg",
    },

    {
      name: "MiMiMi",
      singer: "Dramma",
      path: "/assets/music/y2mate.com - 抖音Tiktok Dramma  МиМиМи Mimimi  Bài hát hot Tiktok.mp3",
      image: "/assets/img/mimimi.jpg",
    },
  ],

  /* ========== Các biến trong app ========== */
  currentIndex: 0,
  isPlaying: false,
  isRandom: false,
  isRepeat: false,

  config: JSON.parse(localStorage.getItem(PLAYER_STOGARE_KEY)) || {},
  setConfig: function (key, value) {
    this.config[key] = value;
    localStorage.setItem(PLAYER_STOGARE_KEY, JSON.stringify(this.config));
  },

  /* ========== Định nghĩa Object ========== */
  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      // trả về bài hát theo chỉ mục của currentIndex
      get: function () {
        return this.songs[this.currentIndex];
      },
    });
  },

  // A1 - Render playlist ra màn hình
  render: function () {
    const htmls = this.songs.map((song, index) => {
      return `      
            <div class="playlist__song ${
              index === this.currentIndex ? "active" : ""
            }" data-index="${index}">
                <div class="song__thumb" style="background-image: url('${
                  song.image
                }')">
                </div>
    
                <div class="song__content">
                    <h3 class="song__title">${song.name}</h3>
                    <p class="song__author">${song.singer}</p>
                </div>
            </div>
                `;
    });

    playlist.innerHTML = htmls.join("");
  },

  // Hàm xử lý các sự kiện
  handleEvents: function () {
    const _this = this; // this = app

    // A2 - CD rotate
    const cdThumAnimation = cdThumb.animate([{ transform: "rotate(360deg)" }], {
      duration: 10000, // 10s
      iterations: Infinity,
    });
    cdThumAnimation.pause();

    // A3 - Sự kiện click để hiện danh sách bài hát
    btnShowPlaylist.addEventListener("click", () => {
      playlist.classList.toggle("active");
      playlist.classList.remove("non-active");
      musicDashboard.classList.toggle("non-active");

      btnShowPlaylist.classList.add("hide");
      btnHidePlaylist.classList.add("show");
      btnHidePlaylist.classList.remove("hide");
    });

    // A3 - Sự kiện click để ẩn danh sách bài hát
    btnHidePlaylist.addEventListener("click", () => {
      playlist.classList.toggle("active");
      playlist.classList.add("non-active");
      musicDashboard.classList.toggle("non-active");

      btnHidePlaylist.classList.add("hide");
      btnShowPlaylist.classList.add("show");
      btnShowPlaylist.classList.remove("hide");
    });

    //A4 - Play / pause / seek / xử lý âm lượng
    btnPlay.addEventListener("click", () => {
      if (_this.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
    });

    // Xử lý khi play
    audio.onplay = () => {
      _this.isPlaying = true;
      btnControl.classList.add("playing");
      cdThumAnimation.play();
    };

    // Xử lý khi pause
    audio.onpause = () => {
      _this.isPlaying = false;
      btnControl.classList.remove("playing");
      cdThumAnimation.pause();
    };

    // Theo dõi tiến độ bài hát
    audio.addEventListener("timeupdate", function () {
      // method duration trả về độ dài của audio/video
      const audioDuration = audio.duration;
      //   console.log(audio.duration);
      //
      if (!isNaN(audioDuration)) {
        // audio.currentTime trả về thời gian đang chạy của audio/video
        const progressPercent = (audio.currentTime / audio.duration) * 100; // Tính phần trăm chạy của bài hát

        // gán phần trăm bài hát vào thanh progress
        progressBar.value = progressPercent;
      }
      /* ========== Hiển thị thời gian hiện tại của bài hát ========== */
      // Trả về số phút hiện tại của audio/video
      let currentMinutes = Math.floor(audio.currentTime / 60);
      // Trả về số giây hiện tại của audio/video
      let currentSeconds = Math.floor(audio.currentTime - currentMinutes * 60);

      if (currentMinutes < 10) {
        currentMinutes = `0${currentMinutes}`;
      }

      if (currentSeconds < 10) {
        currentSeconds = `0${currentSeconds}`;
      }

      timeCurrent.innerText = `${currentMinutes}:${currentSeconds}`;
    });

    /* ========== Hiển thị thời gian bài hát ========== */
    audio.addEventListener("loadedmetadata", function () {
      // Trả về số phút của audio/video
      let durationMinutes = Math.floor(audio.duration / 60);
      // Trả về số giây của audio/video
      let durationSeconds = Math.floor(audio.duration - durationMinutes * 60);

      if (durationMinutes < 10) {
        durationMinutes = `0${durationMinutes}`;
      }

      if (durationSeconds < 10) {
        durationSeconds = `0${durationSeconds}`;
      }

      timeDuration.innerText = `${durationMinutes}:${durationSeconds}`;
    });

    // Xử lý khi tua bài hát
    progressBar.oninput = (e) => {
      const seekTime = (audio.duration / 100) * e.target.value;
      audio.currentTime = seekTime;
      // console.log(e.target.value)
    };

    // Xử lý âm lượng
    volumeBar.oninput = function (e) {
      console.log(volumeBar);
      theVolume = e.target.value / 100;
      audio.volume = theVolume;
      if (theVolume === 0) {
        volumeUp.classList.add("over__block");
        volumeMute.classList.remove("over__block");
      } else {
        volumeUp.classList.remove("over__block");
        volumeMute.classList.add("over__block");
      }
    };

    // Xử lý khi ấn btn volumeUp
    volumeUp.onclick = function () {
      volumeUp.classList.add("over__block");
      volumeMute.classList.remove("over__block");
      audio.volume = 0;
      volumeBar.value = 0;
    };

    // Xử lý khi ấn btn volumeMute
    volumeMute.onclick = function () {
      volumeUp.classList.remove("over__block");
      volumeMute.classList.add("over__block");
      audio.volume = 1;
      volumeBar.value = 100;
    };

    // Xử lý khi next song
    btnNext.onclick = function () {
      if (_this.isRandom) {
        _this.playRandomSong();
      } else {
        _this.nextSong();
      }

      audio.play();
      _this.render();
      _this.scrollToActiveSong();
      // _this.playRandomSong();
    };

    // Xử lý khi prev song
    btnPrev.onclick = function () {
      if (_this.isRandom) {
        _this.playRandomSong();
      } else {
        _this.prevSong();
      }

      audio.play();
      _this.scrollToActiveSong();
    };

    // Xử lý khi random song
    btnRandom.onclick = function () {
      _this.isRandom = !_this.isRandom;
      _this.setConfig("isRandom", _this.isRandom);
      btnRandom.classList.toggle("active", _this.isRandom);
    };

    // Xử lý khi repeat song
    btnRepeat.onclick = function () {
      _this.isRepeat = !_this.isRepeat;
      _this.setConfig("isRepeat", _this.isRepeat);
      btnRepeat.classList.toggle("active", _this.isRepeat);
    };

    // Xử lý khi bài hát kết thúc
    audio.onended = function () {
      if (_this.isRepeat) {
        audio.play();
      } else {
        btnNext.click();
      }
    };

    // Lắng nghe hành vi click vào playlist
    playlist.addEventListener("click", function (e) {
      const songNode = e.target.closest(".playlist__song:not(.active)");
      if (songNode || e.target.closest(".option")) {
        if (songNode) {
          _this.currentIndex = Number(songNode.dataset.index);
          _this.loadCurrentSong();
          audio.play();
          _this.render();
        }

        // Xử lý khi ấn vào option
      }
    });
  },

  // Xử lý active bài hat
  scrollToActiveSong: function () {
    setTimeout(function () {
      if (this.currentIndex === 0) {
        $(".playlist__song.active").scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      } else {
        $(".playlist__song.active").scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }, 100);
  },

  loadConfig: function () {
    this.isRandom = this.config.isRandom;
    this.isRepeat = this.config.isRepeat;
  },

  // Hiển thị bài hát đầu tiên trên player
  loadCurrentSong: function () {
    // Hiển thị tên bài hát trên player
    titleSongName.innerText = this.currentSong.name;
    // Hiển thị tên ca sĩ trên player
    titleSongArtist.innerText = this.currentSong.singer;
    // Hiển thị tên ảnh bài hát trên player
    cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
    // Trả về đường dẫn của bài hát
    audio.setAttribute("src", `${this.currentSong.path}`);
  },
  // xử lý khi next song
  nextSong: function () {
    this.currentIndex++;
    if (this.currentIndex >= this.songs.length) {
      this.currentIndex = 0;
    }
    this.loadCurrentSong();
  },

  // Xử lý khi prev song
  prevSong: function () {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.songs.length - 1;
    }
    this.loadCurrentSong();
  },

  // Xử lý khi random song
  playRandomSong: function () {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * this.songs.length);
    } while (newIndex === this.currentIndex);
    this.currentIndex = newIndex;
    this.loadCurrentSong();
  },

  // Chạy app
  start: function () {
    this.loadConfig();
    // render playlist ra màn hình
    this.render();
    // Sử lý các sự kiện
    this.handleEvents();
    // Định nghĩa object gán chỉ mục
    this.defineProperties();
    // Hiển thị bài đầu tiên khi chạy app
    this.loadCurrentSong();
    //Hiển thị trạng thái ban đầu của btn random / repeat
    btnRandom.classList.toggle("active", app.isRandom);
    btnRepeat.classList.toggle("active", app.isRepeat);
  },
};

app.start();
