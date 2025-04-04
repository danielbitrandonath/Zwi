// ✅ Verified YouTube video IDs
const videoIds = [
    "xQYrU3hysJ4", "bFYyZgBzIug", "5uGHjCv0I8o",
    "SEpn3bh5zeA", "3LB_kPb90eI", "dTL9rlfAPyY",
    "IbQwbIhDFXY", "wK70_qeF2rg"
  ];
  
  // Load random video
  function fetchRandomVideo() {
    const randomId = videoIds[Math.floor(Math.random() * videoIds.length)];
    const iframe = document.getElementById("youtube-video");
    iframe.src = `https://www.youtube.com/embed/${randomId}?autoplay=1&rel=0`;
  }
  
  // Update clock
  function updateClock() {
    const now = new Date();
    const options = { timeZone: "Asia/Jerusalem", hour: "2-digit", minute: "2-digit", second: "2-digit" };
    const clock = document.getElementById("clock");
    clock.textContent = new Intl.DateTimeFormat("he-IL", options).format(now);
  }
  
  // Animate scrolling text
  function displayLCDText() {
    const lcd = document.getElementById("lcdText");
    lcd.innerHTML = "";
  
    const texts = [
      "בוקר טוב צבי",
      "שמע ישראל אדוני אלוהינו אדוני אחד"
    ];
  
    let index = 0;
  
    function scrollText() {
      if (index >= texts.length) return;
  
      const span = document.createElement("span");
      span.classList.add("train-text");
      span.textContent = texts[index];
      lcd.innerHTML = "";
      lcd.appendChild(span);
      index++;
  
      if (index < texts.length) {
        setTimeout(scrollText, 4000); // delay between messages
      }
    }
  
    scrollText();
  }
  
  // Load Hebrew news
  function loadHebrewNews() {
    const feedUrl = "https://www.ynet.co.il/Integration/StoryRss2.xml";
    const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedUrl)}`;
  
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        const list = document.getElementById('news-list');
        list.innerHTML = "";
        data.items.slice(0, 5).forEach(item => {
          const li = document.createElement('li');
          const a = document.createElement('a');
          a.href = item.link;
          a.target = "_blank";
          a.textContent = item.title;
          li.appendChild(a);
          list.appendChild(li);
        });
      })
      .catch(err => console.error("News fetch error:", err));
  }
  
  // Init everything
  document.addEventListener("DOMContentLoaded", () => {
    fetchRandomVideo();
    displayLCDText();
    loadHebrewNews();
    updateClock();
    setInterval(updateClock, 1000);
  
    document.getElementById("reloadButton").addEventListener("click", (e) => {
      e.preventDefault();
      fetchRandomVideo();
    });
  });
  

 // 🎵 Playlist of Israeli pop songs (60s-70s)
 const playlist = [
    {
      title: "אריק איינשטיין – עוף גוזל",
      url: "https://upload.wikimedia.org/wikipedia/he/2/27/Of_Gozer_Erik_Einstein.ogg"
    },
    {
      title: "שלישיית גשר הירקון – הורה אהבה",
      url: "https://upload.wikimedia.org/wikipedia/he/1/13/Hora_Ahava.ogg"
    },
    {
      title: "אילן ואילנית – שיר אהבה",
      url: "https://upload.wikimedia.org/wikipedia/he/9/91/Song_of_Love_-_Ilan_and_Ilanit.ogg"
    }
  ];
  
  let currentTrack = 0;
  const audioPlayer = document.getElementById("audioPlayer");
  const titleDisplay = document.getElementById("song-title");
  const volumeControl = document.getElementById("volumeControl");
  
  function loadSong(index) {
    const song = playlist[index];
    titleDisplay.textContent = song.title;
    audioPlayer.src = song.url;
    audioPlayer.load();
  }
  
  function playSong() {
    audioPlayer.play().catch(err => {
      console.warn("Autoplay blocked or error:", err);
    });
  }
  
  document.getElementById("prevSong").addEventListener("click", () => {
    currentTrack = (currentTrack - 1 + playlist.length) % playlist.length;
    loadSong(currentTrack);
    playSong();
  });
  
  document.getElementById("nextSong").addEventListener("click", () => {
    currentTrack = (currentTrack + 1) % playlist.length;
    loadSong(currentTrack);
    playSong();
  });
  
  document.getElementById("shuffleSong").addEventListener("click", () => {
    let newTrack;
    do {
      newTrack = Math.floor(Math.random() * playlist.length);
    } while (newTrack === currentTrack);
    currentTrack = newTrack;
    loadSong(currentTrack);
    playSong();
  });
  
  volumeControl.addEventListener("input", () => {
    audioPlayer.volume = volumeControl.value;
  });
  
  audioPlayer.addEventListener("ended", () => {
    currentTrack = (currentTrack + 1) % playlist.length;
    loadSong(currentTrack);
    playSong();
  });
  
  // Initialize
  window.addEventListener("DOMContentLoaded", () => {
    loadSong(currentTrack);
    volumeControl.value = audioPlayer.volume;
  });

  const vinyl = document.getElementById("vinyl");

audioPlayer.addEventListener("play", () => {
  vinyl.classList.add("playing");
});

audioPlayer.addEventListener("pause", () => {
  vinyl.classList.remove("playing");
});

audioPlayer.addEventListener("ended", () => {
  vinyl.classList.remove("playing");
});


let isShuffle = false;
const shuffleButton = document.getElementById("shuffleSong");

shuffleButton.addEventListener("click", () => {
  isShuffle = !isShuffle;
  shuffleButton.style.backgroundColor = isShuffle ? "#33ff33" : "#00FF00";
});

function playNextSong() {
  if (isShuffle) {
    currentTrack = Math.floor(Math.random() * playlist.length);
  } else {
    currentTrack = (currentTrack + 1) % playlist.length;
  }
  loadSong(currentTrack);
  playSong();
}

audioPlayer.addEventListener("ended", playNextSong);
