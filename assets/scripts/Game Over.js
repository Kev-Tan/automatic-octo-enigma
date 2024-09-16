cc.Class({
    extends: cc.Component,

    properties: {
        gameOverSound: {
            default: null,
            type: cc.AudioClip // Reference to the game over sound clip
        }
    },

    onLoad() {
        if (this.gameOverSound) {
            // Play the game over sound
            cc.audioEngine.playEffect(this.gameOverSound, false);

            // Schedule the scene transition after 2 seconds
            this.scheduleOnce(() => {
                cc.director.loadScene('Start');
            }, 4); // 2-second delay to allow the sound to play
        }
    }
});
