// SceneLoader.js
cc.Class({
    extends: cc.Component,

    properties: {
        // Reference to the sound effect clip
        soundEffect: {
            default: null,
            type: cc.AudioClip
        }
    },

    onLoad() {
        // Initialize window.Global if it's not already defined
        if (!window.Global) {
            window.Global = {};
        }
        
        // Set initial values
       


        cc.audioEngine.stopMusic();
        
        // Optionally, you can check if a sound effect is set and play it
        if (this.soundEffect) {
            cc.audioEngine.playEffect(this.soundEffect, false);
        }

        // Schedule scene loading after 2 seconds
        this.scheduleOnce(() => {
            cc.director.loadScene('Start');
            window.Global.life = 3;
            window.Global.score = 0;
        }, 5); // Delay in seconds
    },

});
