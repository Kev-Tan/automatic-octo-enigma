cc.Class({
    extends: cc.Component,

    properties: {
        collectSound: {
            default: null,
            type: cc.AudioClip
        }
    },

    onLoad() {
        // Add a collision event listener
        const collisionManager = cc.director.getCollisionManager();
        collisionManager.enabled = true;
        collisionManager.enabledDebugDraw = true;
        collisionManager.enabledDrawBoundingBox = true;

        // Ensure the collider is a physics collider and has an event listener
        this.node.on(cc.Node.EventType.COLLISION_ENTER, this.onCollisionEnter, this);
    },

    onCollisionEnter(other) {
        // Check if the collider belongs to the player or another specified group
        if (other.node.group === 'Actor') {
            this.collect(); // Call the collect function
        }
    },

    collect() {
        // Play the collection sound effect, if provided
        if (this.collectSound) {
            cc.audioEngine.playEffect(this.collectSound, false);
        }

        window.Global.score+=1;


        // Hide or destroy the node
        this.node.destroy(); // Use `this.node.active = false` if you prefer hiding instead of destroying
    }
});
