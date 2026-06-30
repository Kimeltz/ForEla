document.addEventListener('DOMContentLoaded', function() {
    const rainContainer = document.getElementById('rainContainer');
    const countdownDisplay = document.getElementById('countdownDisplay');
    const heartContainer = document.getElementById('heartContainer');
    const bgAudio = document.getElementById('bgAudio');
    const backBtn = document.getElementById('backBtn');
    const replayBtn = document.getElementById('replayBtn');

    const textItems = [
        { id: 'text-hbd', duration: 2.5 },
        { id: 'text-ela', duration: 1.5 },
        { id: 'text-wish', duration: 1 },
        { id: 'text-you', duration: 1 },
        { id: 'text-are', duration: 1 },
        { id: 'text-the', duration: 1 },
        { id: 'text-best', duration: 1 }
    ];

    const asciiChars = ['*', '+', 'x', '❤', '*'];
    const asciiHeart = `

⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣾⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣤⠶⣆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣾⠉⢻⣆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡾⠉⠀⢻⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢰⠏⡠⡀⠹⣶⠀⠀⠀⠀⠀⠀⠀⠀⠀⣴⠟⠀⠄⡀⠈⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡿⠆⡇⠰⠀⠈⠻⠦⠶⠶⠶⠶⠾⠶⠞⠋⠀⡌⠀⡇⠀⣿⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡾⠃⠀⠂⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠁⠁ ⠀⢻⣅⠀⠀⠀⠀⠀⢀⠀ ⣠⣀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣼⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢿⣂⠀⠀⠀⠀⠀⠀⡿⣝⣺⣯⡏⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⢰⣏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣏⡀⠀⠀⠀⠀⠀⠘⠫⣷⠟⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣶⠄⠀⠀⠀⠀⠀⣯⠄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡆⣀⡀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⡧⠀⠀⠀⠀⠀⠀⠀⢠⣶⡄⠀⠀⠀⠀⠀⠀⠘⠛⠀⠀⠀⠀⠀⠀⣿⡀⠀⠀⠀⠠⠼⡦⠄⠀⠀⠋⢿⠉⠀
⠀⣨⣧⠄⠀⠀⠀⠀⠀⠘⣿⠀⠀⠀⠀⠀⠀⠀⠈⠛⠀⠀⠀⠀⠀⠀⠀⠀⠠⠐⠀⠂⠠⠀⢠⠟⠁⠀⠀⠀⠀⠀⠃⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠘⠂⠀⠀⠀⠀⠀⠀⠹⣧⣄⠀⠀⡒⠉⠉⠈⡃⠀⢰⣆⢠⣶⣄⣼⠀⠐⠠⠀⠒⢁⣴⠟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⢠⣄⣿⡆⠀⠀⠀⠀⠀⠘⢿⣇⠀⠈⠀⠂⠐⠁⠀⠀⠛⠛⠁⠈⠀⠀⣀⣤⡴⣷⡛⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠘⢞⣷⠃⠀⠀⠀⠀⠀⠀⠀⠙⢿⡷⠴⢴⡤⢦⠤⡤⠤⠤⠶⠶⠚⠛⠉⠀⠀⢨⣿⣦⣀⢀⣠⣤⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⡀⡀⠀⠀⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣷⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡴⠴⢖⡶⡿⡈⡹⡑⢢⠌⣪⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⢻⡉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢈⡿⠀⠀⠀⠀⠀⠀⠀⠀⠐⢼⣦⣷⠱⢌⡒⡌⡝⣜⠣⣑⠅⠎⠇⣳⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⣾⠛⠻⢷⣤⠀⠀⠀⠀⠀⣿⠀⠀⠀⠀⠀⠘⢷⣄⠀⠀⠉⣿⡐⠢⡔⡘⡡⢇⡡⢅⢡⡙⣬⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⢹⣆⡀⠀⢻⣧⠀⠀⠀⠀⢿⡄⠀⠀⠀⠀⠀⠀⠙⠻⣶⣤⡿⠙⢧⣆⠵⡁⠦⠇⡪⢠⣜⡟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠙⢿⣦⠀⠹⢾⣀⡀⠀⢹⡏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠳⡾⣅⡎⢆⣇⡞⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠹⣷⠀⠀⠉⠛⠛⢾⣇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⡇⠛⠻⠞⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⠛⢲⣶⣶⣤⣼⡗⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠀⠀⢸⡧⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⣿⠀⠀⠀⠀⠀⠀⠀⠀⣀⣠⡴⢾⣿⠀⠀⢸⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⠄⠀⠀⠀⣤⠶⠓⠋⠉⠁⠀⢈⣿⠀⠀⢼⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢿⡆⠀⠀⠸⣿⠁⠀⠀⠀⠀⠀⠨⢿⣀⣀⡿⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⢷⣄⣀⣰⠟⠀⠀⠀⠀⠀⠀⠀⠈⠉⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    `;

    // Function: Start Continuous ASCII Rain
    function startASCIIRain() {
        const rainInterval = setInterval(() => {
            const char = asciiChars[Math.floor(Math.random() * asciiChars.length)];
            const x = Math.random() * window.innerWidth;
            const y = -50;
            const fallDuration = 3 + Math.random() * 2;

            const rainChar = document.createElement('div');
            rainChar.className = 'rain-char';
            rainChar.textContent = char;
            rainChar.style.left = x + 'px';
            rainChar.style.top = y + 'px';
            rainChar.style.animationDuration = fallDuration + 's';
            rainChar.style.animationDelay = Math.random() * 0.5 + 's';

            rainContainer.appendChild(rainChar);

            setTimeout(() => rainChar.remove(), fallDuration * 1000);
        }, 30);

        return rainInterval;
    }

    // Function: Show Countdown
    function showCountdown() {
        return new Promise((resolve) => {
            let count = 5;
            const countdownInterval = setInterval(() => {
                if (count > 0) {
                    countdownDisplay.textContent = count;
                    countdownDisplay.style.animation = 'none';
                    setTimeout(() => {
                        countdownDisplay.style.animation = 'countdownFade 1s ease-in-out forwards';
                    }, 50);
                    count--;
                } else {
                    clearInterval(countdownInterval);
                    countdownDisplay.textContent = '';
                    countdownDisplay.style.opacity = '0';
                    resolve();
                }
            }, 1100);
        });
    }

    // Function: Show Text Sequence
    function showTextSequence() {
        return new Promise((resolve) => {
            let index = 0;

            const showNextText = () => {
                if (index >= textItems.length) {
                    resolve();
                    return;
                }

                const item = textItems[index];
                const element = document.getElementById(item.id);

                element.classList.remove('visible');
                void element.offsetWidth;
                element.classList.add('visible');

                index++;
                setTimeout(() => {
                    element.classList.remove('visible');
                    setTimeout(showNextText, 200);
                }, item.duration * 1000);
            };

            showNextText();
        });
    }

    // Function: Show ASCII Heart
    function showASCIIHeart() {
        const heart = document.createElement('div');
        heart.className = 'heart-ascii';
        heart.textContent = asciiHeart;
        heart.style.position = 'relative';
        
        heartContainer.appendChild(heart);
        if (backBtn) backBtn.classList.add('show');
        if (replayBtn) replayBtn.classList.add('show');
    }

    // Main Animation Sequence
    async function runAnimation() {
        // Start background music
        bgAudio.volume = 0.5;
        bgAudio.play().catch(error => console.log("Audio autoplay prevented"));

        if (backBtn) {
            backBtn.addEventListener('click', () => {
                window.location.href = '../index.html';
            });
        }

        if (replayBtn) {
            replayBtn.addEventListener('click', () => {
                window.location.reload();
            });
        }

        // Start continuous rain
        const rainInterval = startASCIIRain();

        // Phase 1: Wait a bit for rain to establish
        await new Promise(resolve => setTimeout(resolve, 3000));

        // Phase 2: Countdown
        await showCountdown();

        // Phase 3: Text Sequence
        await showTextSequence();

        // Phase 4: ASCII Heart
        showASCIIHeart();
    }

    // Start animation
    runAnimation();
});
