(function () {
  const data = window.DHAKLAN_DATA;
  if (!data) return;

  const $ = (selector) => document.querySelector(selector);
  const { artist, mainVideo, featuredSingle } = data;

  // =========================================================================
  // 1. DADOS DO ARTISTA & PROGRESSO DO ÁLBUM
  // =========================================================================
  const waBookingUrl = `https://wa.me/${artist.whatsappNumber}?text=${encodeURIComponent(
    "Olá equipe do Dhaklan (DKL)! Gostaria de saber sobre shows e eventos."
  )}`;

  $("#artist-name").textContent = artist.name.toUpperCase();
  $("#artist-portrait").src = artist.portrait;
  $("#album-label").textContent = artist.albumLabel;
  $("#album-pct").textContent = `${artist.albumPercent}%`;
  $("#album-fill").style.width = `${artist.albumPercent}%`;

  $("#nav-ig").href = artist.instagramUrl;
  $("#nav-ig").textContent = artist.instagramHandle;
  $("#nav-yt").href = artist.youtubeChannelUrl;
  $("#nav-wa").href = waBookingUrl;
  $("#hero-wa").href = waBookingUrl;
  $("#yt-channel-link").href = artist.youtubeChannelUrl;

  $("#booking-wa-link").href = waBookingUrl;
  $("#booking-wa-link").textContent = artist.whatsappDisplay;
  $("#booking-wa-btn").href = waBookingUrl;

  // =========================================================================
  // 2. VÍDEO PRINCIPAL & FAIXA DESTAQUE (YOUTUBE REAL)
  // =========================================================================
  $("#video-kicker").textContent = mainVideo.kicker;
  $("#music-heading").textContent = mainVideo.title;
  $("#video-subtitle").textContent = mainVideo.subtitle;
  $("#video-ext-link").href = mainVideo.url;
  $("#video-thumb").src = mainVideo.thumbnail;

  const playBtn = $("#btn-play-resenha");
  const videoFrame = $("#video-frame");

  if (playBtn && videoFrame) {
    playBtn.addEventListener("click", () => {
      const iframe = document.createElement("iframe");
      iframe.src = `https://www.youtube-nocookie.com/embed/${mainVideo.videoId}?autoplay=1&rel=0`;
      iframe.title = mainVideo.title;
      iframe.allow =
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      iframe.allowFullscreen = true;
      videoFrame.innerHTML = "";
      videoFrame.appendChild(iframe);
    });
  }

  $("#single-kicker").textContent = featuredSingle.kicker;
  $("#single-title").textContent = featuredSingle.title;
  $("#single-artist").textContent = `${featuredSingle.artistLine} • Lançamento Oficial`;
  $("#single-thumb").src = featuredSingle.thumbnail;
  $("#single-cover-link").href = featuredSingle.url;
  $("#single-yt-btn").href = featuredSingle.url;
  $("#single-ig-btn").href = artist.instagramUrl;

  // =========================================================================
  // 3. COPIAR WHATSAPP COM TOAST
  // =========================================================================
  let toastTimer = null;
  function showToast(msg) {
    const toast = $("#toast");
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove("is-visible");
    }, 2400);
  }

  $("#btn-copy-wa").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(artist.whatsappDisplay);
      showToast(`WhatsApp copiado: ${artist.whatsappDisplay}`);
    } catch {
      showToast(artist.whatsappDisplay);
    }
  });
})();
