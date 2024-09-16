// ScoreDisplay.js

cc.Class({
    extends: cc.Component,

    properties: {
        scoreLabel: {
            default: null,
            type: cc.Label
        }
    },

    onLoad() {
        if (!this.scoreLabel) {
            console.error('ScoreLabel not assigned.');
            return;
        }

        // Ensure window.Global exists
        if (!window.Global) {
            console.warn('window.Global is not defined.');
            window.Global = { score: 0 }; // Initialize if necessary
        }

        // Update the label initially
        this.updateScoreLabel();

        // Optionally, you might want to update the label periodically or based on events
        // e.g., this.schedule(this.updateScoreLabel, 1); // Update every second
    },

    updateScoreLabel() {
        if (this.scoreLabel) {
            this.scoreLabel.string = `Score: ${window.Global.score}`;
        }
    },

    start() {},

    update(dt) {}
});
