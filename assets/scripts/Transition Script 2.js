cc.Class({
    extends: cc.Component,

    properties: {
        // Add any properties here if needed
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        // Initialization code if needed
        // For example, attaching event listeners if necessary
    },

    start() {
        // Example function to demonstrate scene transition with delay
        this.transitionToLevel2AfterDelay();
    },

    // Method to transition to Level1 after a 2-second delay
    transitionToLevel2AfterDelay() {
        console.log("Waiting 2 seconds before transitioning to Level2...");

        // Wait for 2 seconds (2000 milliseconds) before executing the scene transition
        setTimeout(() => {
            // Transition to Level1 scene
            cc.director.loadScene('Level2', (err) => {
                if (err) {
                    console.error('Failed to load Level2:', err);
                } else {
                    console.log('Level2 loaded successfully.');
                }
            });
        }, 3000); // 2000 milliseconds = 2 seconds
    },

    // Update method if needed
    update(dt) {
        // Your update logic here
    },
});
