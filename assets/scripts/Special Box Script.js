cc.Class({
    extends: cc.Component,

    properties: {
        collectSound: {
            default: null,
            type: cc.AudioClip
        },
        spriteFrame1: {
            default: null,
            type: cc.SpriteFrame
        },
        spriteFrame2: {
            default: null,
            type: cc.SpriteFrame
        }
    },

    onLoad() {
        // Ensure the node has a Sprite component
        this.sprite = this.getComponent(cc.Sprite);
        if (!this.sprite) {
            console.error('No Sprite component found on this node.');
            return;
        }

        // Enable the collision manager
        const collisionManager = cc.director.getCollisionManager();
        collisionManager.enabled = true;
        collisionManager.enabledDebugDraw = true;
        collisionManager.enabledDrawBoundingBox = true;

        // Add a collision event listener
        this.node.on(cc.Node.EventType.COLLISION_ENTER, this.onCollisionEnter, this);

        // Initialize the collision flag
        this.hasCollided = false;
    },

    onCollisionEnter(other) {
        // Check if the collider belongs to the "Actor" group and if it has not already collided
        if (other.node.group === 'Actor' && !this.hasCollided) {
            this.hasCollided = true; // Set the flag to true to prevent further collisions
            this.collect(); // Call the collect function
        }
    },

    collect() {
        // Play the collection sound effect, if provided
        if (this.collectSound) {
            cc.audioEngine.playEffect(this.collectSound, false);
        }

        // Change the sprite frame
        if (this.sprite) {
            window.Global.score += 1;
            this.sprite.spriteFrame = this.spriteFrame2; // Change to spriteFrame2
        }
      
    }
});
