cc.Class({
    extends: cc.Component,

    properties: {
        // Define any properties if needed
    },

    onLoad() {
        // Enable collision manager
        cc.director.getCollisionManager().enabled = true;
        // cc.director.getCollisionManager().enabledDebugDraw = true;
        // cc.director.getCollisionManager().enabledDrawBoundingBox = true;

        // Register collision callback
        this.node.on('onCollisionEnter', this.onCollisionEnter, this);
    },

});
