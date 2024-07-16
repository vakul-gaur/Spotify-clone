  document.addEventListener('DOMContentLoaded', function() {
            var audioPlayer = document.getElementById('audioPlayer');
            var progressBar = document.getElementById('progressBar');
            var currentTimeDisplay = document.getElementById('currentTime');
            var durationTimeDisplay = document.getElementById('durationTime');
            var currentPlayButton = null;

            document.querySelectorAll('.play-button').forEach(function(button) {
                button.addEventListener('click', function() {
                    var card = this.closest('.card');
                    var audioSrc = card.getAttribute('data-audio-src');

                    if (currentPlayButton && currentPlayButton === this) {
                        if (audioPlayer.paused) {
                            audioPlayer.play().then(() => {
                                this.classList.remove('paused');
                                this.classList.add('playing');
                            }).catch(error => {
                                console.error('Error playing audio:', error);
                            });
                        } else {
                            audioPlayer.pause();
                            this.classList.remove('playing');
                            this.classList.add('paused');
                        }
                    } else {
                        if (currentPlayButton) {
                            currentPlayButton.classList.remove('playing');
                            currentPlayButton.classList.add('paused');
                            audioPlayer.pause();
                        }

                        if (audioPlayer.src !== audioSrc) {
                            audioPlayer.src = audioSrc;
                        }

                        audioPlayer.play().then(() => {
                            this.classList.remove('paused');
                            this.classList.add('playing');
                            currentPlayButton = this;
                        }).catch(error => {
                            console.error('Error playing audio:', error);
                        });
                    }
                });
            });

            audioPlayer.addEventListener('timeupdate', function() {
                var progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
                progressBar.value = progress;
                currentTimeDisplay.textContent = formatTime(audioPlayer.currentTime);
            });

            audioPlayer.addEventListener('loadedmetadata', function() {
                durationTimeDisplay.textContent = formatTime(audioPlayer.duration);
            });

            progressBar.addEventListener('input', function() {
                var seekTime = (progressBar.value / 100) * audioPlayer.duration;
                audioPlayer.currentTime = seekTime;
            });

            function formatTime(seconds) {
                var minutes = Math.floor(seconds / 60);
                var seconds = Math.floor(seconds % 60);
                return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
            }
        });