cc.Class({
    extends: cc.Component,

    properties: {
        duration: {
            default: 60, // Countdown duration in seconds
            type: cc.Integer // Ensure duration is an integer
        },
        timerLabel: {
            default: null,
            type: cc.Label // Reference to the Label node for the timer
        },
        deathSound: {
            default: null,
            type: cc.AudioClip // Reference to the death sound clip
        }
        // Other properties
        // ... 
    },

    onLoad() {
        this.timeRemaining = this.duration; // Initialize time remaining
        this.updateTimerLabel(); // Update the label initially

        // Schedule the timer update to run every second
        this.schedule(this.updateTimer, 1);
    },

    updateTimer(dt) {
        this.timeRemaining -= 1; // Decrease time

        // Update the label
        this.updateTimerLabel();

        // Check if time is up
        if (this.timeRemaining <= 0) {
            this.unschedule(this.updateTimer); // Stop the timer
            this.timeRemaining = 0; // Ensure time doesn't go negative

            window.Global.life -= 1;
            window.Global.score = 0;
            // Stop any currently playing music
            cc.audioEngine.stopMusic();
            console.log("TIME");

            // Play the death sound
            if (this.deathSound) {
                cc.audioEngine.playEffect(this.deathSound, false);
            }

            // Get the name of the current scene
            let currentSceneName = cc.director.getScene().name;

            // Determine the scene to transition to based on the current scene
            let transitionScene = '';
            if (currentSceneName === 'Level1') {
                transitionScene = 'Transition Scene 1';
            } else if (currentSceneName === 'Level2') {
                transitionScene = 'Transition Scene 2';
            }

            // Wait 2 seconds before loading the new scene
            if (window.Global.life > 0) {
                this.scheduleOnce(() => {
                    cc.director.loadScene(transitionScene);
                }, 0.05); // Adjust the delay to 2 seconds for the death sound to play
            } else {
                this.scheduleOnce(() => {
                    cc.director.loadScene('Game Over');
                    window.Global.life = 3;
                }, 0.05); // Adjust the delay to 2 seconds for the death sound to play
            }

            // Trigger any additional actions when timer ends
            // e.g., end game or show a message
        }
    },

    updateTimerLabel() {
        if (this.timerLabel) {
            this.timerLabel.string = `Time Left: ${this.timeRemaining}s`;
        }
    },

    // Other methods
    // ...
});
