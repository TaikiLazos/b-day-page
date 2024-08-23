document.addEventListener('DOMContentLoaded', function() {
    const balloons = document.querySelectorAll('.balloon');
    const birthdayImage = document.getElementById('birthday-image');
    const popMessage = document.getElementById('pop-message');
    const congratulationsMessage = document.getElementById('congratulations-message');
    const fireworksContainer = document.createElement('div'); // Create fireworks container dynamically

    fireworksContainer.style.position = 'absolute';
    fireworksContainer.style.top = '0';
    fireworksContainer.style.left = '0';
    fireworksContainer.style.width = '100%';
    fireworksContainer.style.height = '100%';
    fireworksContainer.style.pointerEvents = 'none'; // Prevent interaction with fireworks
    document.body.appendChild(fireworksContainer);

    const colors = ['#ff9999', '#66b3ff', '#99ff99', '#ffcc99', '#ff6666', '#6699ff', '#66ff66', '#ff9966', '#ff33cc', '#33ccff'];
    const explosionColors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
    let poppedCount = 0;
    let firstBalloonPopped = false;

    // Function to create fireworks
    function createFirework(x, y) {
        const firework = document.createElement('div');
        firework.classList.add('firework');
        firework.style.left = `${x - 30}px`; // Center fireworks at click position
        firework.style.top = `${y - 30}px`; // Center fireworks at click position
        firework.style.width = '60px'; // Width of fireworks
        firework.style.height = '60px'; // Height of fireworks

        // Randomize the firework colors
        const randomColor = explosionColors[Math.floor(Math.random() * explosionColors.length)];
        firework.style.background = `radial-gradient(circle, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.8) 30%, ${randomColor} 60%, ${randomColor} 100%)`;

        // Add particles with varying colors
        firework.style.background += `, radial-gradient(circle, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.8) 50%, ${randomColor} 100%)`;

        fireworksContainer.appendChild(firework);

        setTimeout(() => {
            firework.remove();
        }, 1000); // Firework lasts 1 second
    }

    // Function to randomize the balloon properties
    function randomizeBalloon(balloon) {
        const randomLeft = Math.random() * 80 + 10; // Random left position between 10% and 90%
        const randomDelay = Math.random() * 2; // Random delay between 0s and 2s
        const randomFloatX = Math.random() * 2 - 1; // Random horizontal movement between -1 and 1
        const randomColor = colors[Math.floor(Math.random() * colors.length)]; // Random color from the list

        balloon.style.left = `${randomLeft}%`;
        balloon.style.backgroundColor = randomColor;
        balloon.style.setProperty('--float-x', randomFloatX);
        balloon.style.animationDelay = `${randomDelay}s`;
    }

    // Attach click event to each balloon
    balloons.forEach(balloon => {
        balloon.addEventListener('click', function(event) {
            if (!balloon.classList.contains('popped')) {
                balloon.classList.add('popped');
                poppedCount++;

                // Show the birthday image if it's the first balloon popped
                if (!firstBalloonPopped) {
                    birthdayImage.classList.remove('hidden');
                    firstBalloonPopped = true;
                }

                // Trigger fireworks at balloon position
                createFirework(event.clientX, event.clientY);

                // Hide pop message after the first balloon is popped
                if (firstBalloonPopped) {
                    popMessage.classList.add('hidden');
                }

                // Check if all balloons are popped
                if (poppedCount === balloons.length) {
                    // Show the congratulations message
                    congratulationsMessage.style.display = 'block';
                }
            }
        });
    });

    // Function to show balloons in batches
    function showBalloonsInBatches(batchSize, delay) {
        for (let i = 0; i < balloons.length; i += batchSize) {
            setTimeout(() => {
                for (let j = i; j < i + batchSize && j < balloons.length; j++) {
                    balloons[j].style.display = 'block';
                    randomizeBalloon(balloons[j]);
                }
            }, i / batchSize * delay);
        }
    }

    // Initially hide all balloons
    balloons.forEach(balloon => {
        balloon.style.display = 'none';
    });

    // Show balloons in batches of 5 with a 3-second delay between batches
    showBalloonsInBatches(5, 3000);
});
