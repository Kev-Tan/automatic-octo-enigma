// FireProjectile.js

cc.Class({
    extends: cc.Component,

    properties: {
        // Optional: reference to any effects or sounds to play on collision
        gravityScale: {
            default: 1,
            type: cc.Float
        },
        deathSound: {
            default: null,
            type: cc.AudioClip
        }
    },

    onLoad() {
        // Add a BoxCollider component to the fire projectile
        let collider = this.node.addComponent(cc.BoxCollider);
        collider.size = this.node.getContentSize();
        collider.isTrigger = true; // Set to true if you want trigger-based collision detection

        // Add a RigidBody component to the fire projectile
        let rigidBody = this.node.addComponent(cc.RigidBody);
        rigidBody.gravityScale = this.gravityScale; // Set gravity scale

        // Ensure the RigidBody component is configured for dynamic behavior
        rigidBody.type = cc.RigidBodyType.Dynamic;

        // Initialize death sound flag
        this.hasPlayedDeathSound = false;
    },

    onCollisionEnter(other, self) {
        // Check if the projectile collides with the player or other specific objects
        if (other.node.group === 'Actor') {
            if(!this.hasPlayedDeathSound)this.handleDeath();
        }

        // Optionally destroy the projectile on collision with anything
        this.node.destroy();
    },

    handleDeath() {
        // Stop any currently playing music
        cc.audioEngine.stopMusic();
        window.Global.life -= 1;
        window.Global.score = 0;
        console.log("Projectile hit!");

        // Play the death sound
        if (this.deathSound) {
            cc.audioEngine.playEffect(this.deathSound, false);
        } else {
            console.warn("Death sound not assigned.");
        }

        let currentSceneName = cc.director.getScene().name;

        if(window.Global.life>0) {
            if (currentSceneName === 'Level1') {
                cc.director.loadScene("Transition Scene 1");
            }
            else{
                cc.director.loadScene("Transition Scene 2")
            }
        }
        else{
            cc.director.loadScene("Game Over");
            window.Global.life = 3;
        }


        // Set the flag to true to prevent further executions
        this.hasPlayedDeathSound = true;

       // Increased delay to ensure the death sound plays before transitioning
    },

    start() {},

    update(dt) {}
});
