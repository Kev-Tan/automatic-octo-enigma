cc.Class({
    extends: cc.Component,

    properties: {
        // Two sound effects to play on collision
        sound1: {
            default: null,
            type: cc.AudioClip
        },
    },

    onLoad() {
        // Ensure collision manager is enabled
        cc.director.getCollisionManager().enabled = true;

        // Register collision event listener
        this.node.on(cc.Node.EventType.COLLISION_ENTER, this.onCollisionEnter, this);

        // Initialize collision flag
        this.hasCollided = false;

        // Initialize sprite component
        this.sprite = this.node.getComponent(cc.Sprite);

        if (!this.sprite) {
            console.error('No Sprite component found on the node.');
        }
    },

    onCollisionEnter(other, self) {
        // Check if the other node belongs to the "Actor" group
        if (other.node.group === 'Actor' && !this.hasCollided) {
            this.hasCollided = true; // Set the flag to true to prevent further collisions

            console.log("Win!!!");
            cc.director.loadScene('Win Scene');    
                

           
        }
    },

    onDestroy() {
        // Unregister collision event listener
        this.node.off(cc.Node.EventType.COLLISION_ENTER, this.onCollisionEnter, this);
    }
});
