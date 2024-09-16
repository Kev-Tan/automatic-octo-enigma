// LifeDisplay.js

cc.Class({
    extends: cc.Component,

    properties: {
        lifeLabel: {
            default: null,
            type: cc.Label
        }
    },

    onLoad() {
        if (!this.lifeLabel) {
            console.error('LifeLabel not assigned.');
            return;
        }

        // Ensure window.Global exists
        if (!window.Global) {
            console.warn('window.Global is not defined.');
            window.Global = { life: 3 }; // Initialize if necessary
        }

        // Update the label initially
        this.updateLifeLabel();

        // Optionally, update the label periodically or based on events
        // e.g., this.schedule(this.updateLifeLabel, 1); // Update every second
    },

    updateLifeLabel() {
        if (this.lifeLabel) {
            this.lifeLabel.string = `Life: ${window.Global.life}`;
        }
    },

    start() {},

    update(dt) {}
});
