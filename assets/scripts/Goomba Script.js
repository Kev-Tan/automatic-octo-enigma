cc.Class({
    extends: cc.Component,

    properties: {
        speed: {
            default: 100,
            type: cc.Float
        },
        moveDistance: {
            default: 100,
            type: cc.Float
        },
        deathSound: {
            default: null,
            type: cc.AudioClip
        },
        kickSound: {
            default: null,
            type: cc.AudioClip
        },
        jumpImpulse: {
            default: 300,
            type: cc.Float
        }
    },

    onLoad() {
        this.direction = 1; // 1 for right, -1 for left
        this.startX = this.node.x;

        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = true;
        cc.director.getCollisionManager().enabledDrawBoundingBox = true;

        this.anim = this.getComponent(cc.Animation); // Get the Animation component
    },

    update(dt) {
        let newPositionX = this.node.x + this.speed * this.direction * dt;
        if (Math.abs(newPositionX - this.startX) > this.moveDistance) {
            this.direction *= -1;
        }
        this.node.x += this.speed * this.direction * dt;
    },

    onCollisionEnter(other, self) {
        if (other.node.group === 'Actor') {
            this.handleCollision(other);
        }
    },

    handleCollision(other) {
        let player = other.node;
        let playerRb = player.getComponent(cc.RigidBody);

        if (playerRb) {
            let verticalSpeed = playerRb.linearVelocity.y;
            let playerBox = player.getBoundingBoxToWorld();
            let goombaBox = this.node.getBoundingBoxToWorld();

            if (verticalSpeed < 0 && playerBox.yMax > goombaBox.yMax && playerBox.yMin < goombaBox.yMax) {
                console.log('Goomba dies because Mario is jumping on it!');
                this.handleGoombaDeath(playerRb); // Pass the player’s Rigidbody to handleGoombaDeath
            } else {
                console.log('Mario dies because Goomba is hit from the side or bottom!');
                this.handlePlayerDeath();
            }
        }
    },

    handleGoombaDeath(playerRb) {
        // Play the kick sound
        if (this.kickSound) {
            cc.audioEngine.playEffect(this.kickSound, false);
        }

        // Apply an upward impulse to Mario
        if (playerRb) {
            let currentVelocity = playerRb.linearVelocity;
            let jumpVelocity = cc.v2(currentVelocity.x, this.jumpImpulse);
            playerRb.linearVelocity = jumpVelocity;
        }

        // Play the death animation
        if (this.anim) {
            let animName = 'goomba die'; // Replace with the actual animation name in your Animation component
            this.anim.play(animName);

            // Get the duration of the death animation
            let animationState = this.anim.getAnimationState(animName);
            if (animationState) {
                let animationDuration = animationState.duration; // Get animation duration
                this.scheduleOnce(() => {
                    console.log(window.Global.score);
                    this.node.destroy();
                    window.Global.score += 5;
                }, Math.min(animationDuration, 0.25)); // Adjust delay to match animation duration
            } else {
                // If animation state is not found, destroy the node immediately
                this.node.destroy();
            }
        } else {
            // If no animation component, destroy the node immediately
            this.node.destroy();
        }
    },

    handlePlayerDeath() {
        window.Global.score = 0;
        window.Global.life -= 1;
        cc.audioEngine.stopMusic();
        if (this.deathSound) {
            cc.audioEngine.playEffect(this.deathSound, false);
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

        // Wait 2 seconds before loading the new scene
        if (window.Global.life > 0) {
            this.scheduleOnce(() => {
                cc.director.loadScene(transitionScene);
            }, 0.05); // Adjust the delay to 2 seconds for the death sound to play
        } else {
            this.scheduleOnce(() => {
                cc.director.loadScene('Game Over');
                window.Global.life = 3;
            }, 0.05); // Adjust the delay to 2 seconds for the death sound to play
        }
    }
});
