let currentSong = null; // Track the currently playing song

// Add this function to update the playback bar
function updatePlaybackBar(audio) {
    const progressBar = document.getElementById('progressBar');
    const currentTime = document.getElementById('currentTime');
    const durationTime = document.getElementById('durationTime');

    // Update the progress bar and time display
    audio.addEventListener('timeupdate', () => {
        const current = audio.currentTime;
        const duration = audio.duration;

        progressBar.value = (current / duration) * 100;
        currentTime.textContent = formatTime(current);
        durationTime.textContent = formatTime(duration);
    });
}

// Helper function to format time
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

// Function to control volume
function setVolume() {
    const volumeControl = document.getElementById('volumeControl');
    const audio = document.getElementById(`audio${currentSong}`);
    if (audio) {
        audio.volume = volumeControl.value; // Set audio volume based on slider value
    }
}

function togglePlay(songplay) {
    const playButtons = document.querySelectorAll('.play-button');
    const audio = document.getElementById(`audio${songplay}`);
    
    if (currentSong === songplay) {
        // Pause the song
        audio.pause();
        currentSong = null;
        playButtons[songplay - 1].innerText = '▶'; // Change to play button
    } else {
        // Play the new song
        if (currentSong !== null) {
            const previousAudio = document.getElementById(`audio${currentSong}`);
            previousAudio.pause(); // Pause previous song
            playButtons[currentSong - 1].innerText = '▶'; // Change previous to play button
        }
        currentSong = songplay;
        audio.play(); // Play the current song
        playButtons[songplay - 1].innerText = '❚❚'; // Change to pause button
        updatePlaybackBar(audio); // Update playback bar when song starts
    }
}

function goBack() {
    window.history.back();
}

function goForward() {
    window.history.forward();
}

// Event listener for volume control
document.getElementById('volumeControl').addEventListener('input', setVolume);