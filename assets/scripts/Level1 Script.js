// Level1Script.js
cc.Class({
    extends: cc.Component,

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        // Enable the physics manager when this scene loads
        cc.director.getPhysicsManager().enabled = true;
        console.log(window.Global.life);
    },

    // Other methods and logic for the Level1 scene can be added here
});
