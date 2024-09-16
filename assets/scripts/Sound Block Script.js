cc.Class({
    extends: cc.Component,

    properties: {
        // Two sound effects to play on collision
        sound1: {
            default: null,
            type: cc.AudioClip
        },
        sound2: {
            default: null,
            type: cc.AudioClip
        },

        // Two sprites to switch between
        sprite1: {
            default: null,
            type: cc.SpriteFrame
        },
        sprite2: {
            default: null,
            type: cc.SpriteFrame
        }
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

            // Randomly select one of the two sounds
            let randomChoice = Math.random(); // Returns a number between 0 and 1

            
                
                
            

            if (randomChoice < 0.5) {
                // Play the first sound with 50% probability
                if (this.sound1) {
                    window.Global.life += 1;
                    console.log("switch sprite2");
                    this.sprite.spriteFrame = this.sprite2;
                    cc.audioEngine.playEffect(this.sound1, false);
                }
                
            } else {
                // Play the second sound with 50% probability
                if (this.sound2) {
                    this.sprite.spriteFrame = this.sprite1;
                    console.log("switch sprite1");
                    window.Global.score += 1;
                    cc.audioEngine.playEffect(this.sound2, false);
                }
                // Switch to sprite2
            }
        }
    },

    onDestroy() {
        // Unregister collision event listener
        this.node.off(cc.Node.EventType.COLLISION_ENTER, this.onCollisionEnter, this);
    }
});
