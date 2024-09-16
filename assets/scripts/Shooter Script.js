cc.Class({
    extends: cc.Component,

    properties: {
        // The fire projectile prefab
        firePrefab: {
            default: null,
            type: cc.Prefab
        },
        // The interval between shots
        shootInterval: 2, // seconds
        // The speed of the fire projectile
        projectileSpeed: 500,
        // Optional: sound effects
        deathSound: {
            default: null,
            type: cc.AudioClip
        },
        kickSound: {
            default: null,
            type: cc.AudioClip
        },
        jumpImpulse: {
            default: 300, // Adjust this value to set how high Mario should jump
            type: cc.Float
        }
    },

    onLoad() {
        // Schedule the shooting function to run every shootInterval seconds
        this.schedule(this.shootFire, this.shootInterval);

        // Enable collision manager and debug draw
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = true;
        cc.director.getCollisionManager().enabledDrawBoundingBox = true;

        // Add a BoxCollider component to the enemy
        let collider = this.node.addComponent(cc.BoxCollider);
        collider.size = this.node.getContentSize();
        collider.group = 'Enemy'; // Set to a specific group if needed
    },

    shootFire() {
        // Access the Animation component
        let animation = this.node.getComponent(cc.Animation);
        
        // Play the shooting animation
        if (animation) {
            animation.play('turtle animation'); // Ensure this matches the actual animation clip name
        }

        // Create the fire projectile instance from the prefab
        let fireProjectile = cc.instantiate(this.firePrefab);
        
        // Set the initial position of the projectile to the enemy's position
        fireProjectile.setPosition(this.node.position);
        
        // Add the projectile to the scene
        this.node.parent.addChild(fireProjectile);
        
        // Get the RigidBody component of the projectile
        let rigidBody = fireProjectile.getComponent(cc.RigidBody);
        
        if (rigidBody) {
            // Set the initial velocity of the projectile
            let direction = cc.v2(-1, 0); // Fire to the left
            let velocity = direction.mul(this.projectileSpeed);
            rigidBody.linearVelocity = velocity;
        }
    },

    onCollisionEnter(other, self) {
        // Check if the collision is with the player or other specific objects
        if (other.node.group === 'Actor') {
            window.Global.score += 10;
            console.log(window.Global.score);   
            let player = other.node;
            let playerRb = player.getComponent(cc.RigidBody);

            if (playerRb) {
                let verticalSpeed = playerRb.linearVelocity.y;
                let playerBox = player.getBoundingBoxToWorld();
                let enemyBox = this.node.getBoundingBoxToWorld();

                if (verticalSpeed < 0 && playerBox.yMax > enemyBox.yMax && playerBox.yMin < enemyBox.yMax) {
                    // Handle case where player jumps on the enemy
                    console.log('Player jumped on enemy!');
                    this.handleEnemyDeath(playerRb); // Pass the player’s Rigidbody to handleEnemyDeath
                } else {
                    // Handle case where player touches the enemy from the side or bottom
                    console.log('Player touched the enemy from the side or bottom!');
                    window.Global.score = 0;
                    this.handlePlayerDeath();
                }
            }
        }
    },

    handleEnemyDeath(playerRb) {
        // Play the kick sound
        if (this.kickSound) {
            cc.audioEngine.playEffect(this.kickSound, false);
        }

        // Access the Animation component
        let animation = this.node.getComponent(cc.Animation);
        
        if (animation) {
            // Play the turtle die animation
            animation.play('turtle die animation'); // Ensure this matches the actual animation clip name
            // Optionally, handle animation completion before destroying the node
            
            this.scheduleOnce(() => {
                // Destroy the enemy node after the animation
                this.node.destroy();
            }, 0.4); // Adjust delay based on animation duration
        } else {
            // If no animation component, destroy immediately
            this.node.destroy();
        }

        // Apply an upward impulse to Mario
        if (playerRb) {
            let currentVelocity = playerRb.linearVelocity;
            let jumpVelocity = cc.v2(currentVelocity.x, this.jumpImpulse);
            playerRb.linearVelocity = jumpVelocity;
        }

        // Update the score
        window.Global.score += 5;
    },

    handlePlayerDeath() {
        // Stop any currently playing music
        cc.audioEngine.stopMusic();

        // Play the death sound
        if (this.deathSound) {
            cc.audioEngine.playEffect(this.deathSound, false);
        }

        // Decrease life only once
        if (window.Global) {
            console.log("Current life before decrease:", window.Global.life);
            window.Global.life -= 1;
            console.log("Current life after decrease:", window.Global.life);
        } else {
            console.warn("Global object not found.");
        }

        // Get the name of the current scene
        let currentSceneName = cc.director.getScene().name;

        // Determine the scene to transition to based on the current scene
        let transitionScene = '';
        if (currentSceneName === 'Level1') {
            transitionScene = 'Transition Scene 1';
        } else if (currentSceneName === 'Level2') {
            transitionScene = 'Transition Scene 2';
        }

        // Schedule scene transition based on remaining life
        if (window.Global.life > 0) {
            this.scheduleOnce(() => {
                cc.director.loadScene(transitionScene);
            }, 0.05); // Adjust the delay to 0.05 seconds for the death sound to play
        } else {
            this.scheduleOnce(() => {
                cc.director.loadScene('Game Over');
                window.Global.life = 3;
            }, 0.05); // Adjust the delay to 0.05 seconds for the death sound to play
        }
    },

    start() {},

    update(dt) {}
});
