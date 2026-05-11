const items = document.querySelectorAll('#nav-list li');
const countEl = document.getElementById('count');
const noResults = document.getElementById('no-results');
const total = items.length;

function updateCount(visible) {
    countEl.textContent = visible === total ? total + ' assignments' : visible + ' of ' + total + ' assignments';
}

updateCount(total);

items.forEach((li, i) => {
    li.style.opacity = '0';
    li.style.transform = 'translateY(6px)';
    li.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
    setTimeout(() => {
        li.style.opacity = '1';
        li.style.transform = 'translateY(0)';
    }, 40 + i * 35);
});

document.getElementById('search').addEventListener('input', function() {
    const q = this.value.toLowerCase().trim();
    let visible = 0;
    items.forEach(li => {
        const text = li.querySelector('a').textContent.toLowerCase();
        const match = !q || text.includes(q);
        li.classList.toggle('hidden', !match);
        if (match) visible++;
    });
    updateCount(visible);
    noResults.style.display = visible === 0 ? 'block' : 'none';
});

const video = document.getElementById('myVideo');
const playPauseBtn = document.getElementById('playPause');
const seek = document.getElementById('seek');
const currentTimeDisplay = document.getElementById('currentTime');
const durationDisplay = document.getElementById('duration');
const muteToggle = document.getElementById('muteToggle');
const volume = document.getElementById('volume');
const fullscreenToggle = document.getElementById('fullscreenToggle');

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
}

video.addEventListener('loadedmetadata', () => {
    seek.max = video.duration;
    durationDisplay.textContent = formatTime(video.duration);
});

video.addEventListener('timeupdate', () => {
    seek.value = video.currentTime;
    currentTimeDisplay.textContent = formatTime(video.currentTime);
});

seek.addEventListener('input', () => {
    video.currentTime = seek.value;
});

playPauseBtn.addEventListener('click', () => {
    if (video.paused) {
        video.play();
        playPauseBtn.textContent = '⏸️';
        playPauseBtn.setAttribute('aria-label', 'Pause');
    } else {
        video.pause();
        playPauseBtn.textContent = '▶️';
        playPauseBtn.setAttribute('aria-label', 'Play');
    }
});

muteToggle.addEventListener('click', () => {
    video.muted = !video.muted;
    muteToggle.textContent = video.muted ? '🔇' : '🔊';
    muteToggle.setAttribute('aria-label', video.muted ? 'Unmute' : 'Mute');
});

volume.addEventListener('input', () => {
    video.volume = volume.value;
    video.muted = volume.value == 0;
    muteToggle.textContent = video.muted ? '🔇' : '🔊';
});

fullscreenToggle.addEventListener('click', () => {
    if (!document.fullscreenElement) {
        video.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
});

/* --- Audio Player Script --- */
const audio = document.getElementById('myAudio');
const audioPlayPauseBtn = document.getElementById('audioPlayPause');
const audioSeek = document.getElementById('audioSeek');
const audioCurrentTimeDisplay = document.getElementById('audioCurrentTime');
const audioDurationDisplay = document.getElementById('audioDuration');
const audioMuteToggle = document.getElementById('audioMuteToggle');
const audioVolume = document.getElementById('audioVolume');

audio.addEventListener('loadedmetadata', () => {
    audioSeek.max = audio.duration;
    audioDurationDisplay.textContent = formatTime(audio.duration);
});

audio.addEventListener('timeupdate', () => {
    audioSeek.value = audio.currentTime;
    audioCurrentTimeDisplay.textContent = formatTime(audio.currentTime);
});

audioSeek.addEventListener('input', () => {
    audio.currentTime = audioSeek.value;
});

audioPlayPauseBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        audioPlayPauseBtn.textContent = '⏸️';
        audioPlayPauseBtn.setAttribute('aria-label', 'Pause');
    } else {
        audio.pause();
        audioPlayPauseBtn.textContent = '▶️';
        audioPlayPauseBtn.setAttribute('aria-label', 'Play');
    }
});

audioMuteToggle.addEventListener('click', () => {
    audio.muted = !audio.muted;
    audioMuteToggle.textContent = audio.muted ? '\U0001F507' : '\U0001F50A';
    audioMuteToggle.setAttribute('aria-label', audio.muted ? 'Unmute' : 'Mute');
});

audioVolume.addEventListener('input', () => {
    audio.volume = audioVolume.value;
    audio.muted = audioVolume.value == 0;
    audioMuteToggle.textContent = audio.muted ? '\U0001F507' : '\U0001F50A';
});