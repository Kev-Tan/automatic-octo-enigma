cc.Class({
    extends: cc.Component,

    properties: {
        deathSound: {
            default: null,
            type: cc.AudioClip // Reference to the death sound clip
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.hasPlayedDeathSound = false; // Initialize flag to check if death sound has been played
    },

    start() {
        // Any initialization code if needed
    },

    update(dt) {
        // Get the position of the node this script is attached to
        let position = this.node.position;

        // Check if the y-position is less than or equal to -400
        if (position.y <= -400) {
            if (!this.hasPlayedDeathSound) {
                // Stop any currently playing music
                cc.audioEngine.stopMusic();
                console.log("fall");

                // Play the death sound
                if (this.deathSound) {
                    cc.audioEngine.playEffect(this.deathSound, false);
                }

                // Decrease life only once
                if (window.Global) {
                    window.Global.score = 0;
                    window.Global.life -= 1;
                }

                // Set the flag to true to prevent further executions
                this.hasPlayedDeathSound = true;

                // Get the name of the current scene
                let currentSceneName = cc.director.getScene().name;

                // Determine the scene to transition to based on the current scene
                let transitionScene = '';
                if (currentSceneName === 'Level1') {
                    transitionScene = 'Transition Scene 1';
                } else if (currentSceneName === 'Level2') {
                    transitionScene = 'Transition Scene 2';
                }

                // Schedule scene transition based on remaining life
                if (window.Global.life > 0) {
                    this.scheduleOnce(() => {
                        cc.director.loadScene(transitionScene);
                    }, 0.05); // Adjust the delay to ensure the death sound plays before transitioning
                } else {
                    this.scheduleOnce(() => {
                        cc.director.loadScene('Game Over');
                        // Reset the life count for a new game
                        if (window.Global) {
                            window.Global.life = 3;
                        }
                    }, 0.05); // Adjust the delay to ensure the death sound plays before transitioning
                }
            }
        }
    }
});
