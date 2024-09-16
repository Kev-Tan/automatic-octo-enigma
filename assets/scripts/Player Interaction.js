cc.Class({
    extends: cc.Component,

    properties: {
        speed: {
            default: 400, // Increased speed
            type: cc.Float
        },
        jumpForce: {
            default: 400,
            type: cc.Float
        },
        gravityScale: {
            default: 1,
            type: cc.Float
        },
        acceleration: {
            default: 600, // Increased acceleration rate
            type: cc.Float
        },
        deceleration: {
            default: 600, // Increased deceleration rate
            type: cc.Float
        },
        jumpSound: {
            default: null,
            type: cc.AudioClip
        },
        coinSound: {
            default: null,  // Interaction sound
            type: cc.AudioClip
        },
        timerLabel: {
            default: null,
            type: cc.Label // Reference to the Timer Label node
        },
        additionalLabel: {
            default: null,
            type: cc.Label // Reference to the Additional Label node
        },
        topLabel: {
            default: null,
            type: cc.Label // Reference to the new Label node
        }
    },

    onLoad() {
        this.anim = this.getComponent(cc.Animation);
        this.rigidBody = this.getComponent(cc.RigidBody);

        if (!this.rigidBody) {
            console.error('No RigidBody component found on the node.');
        }

        this.rigidBody.gravityScale = this.gravityScale;

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);

        this.movingLeft = false;
        this.movingRight = false;
        this.currentSpeed = 0;
        this.isJumping = false;

        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = true;
        cc.director.getCollisionManager().enabledDrawBoundingBox = true;

        this.node.on(cc.Node.EventType.COLLISION_ENTER, this.onCollisionEnter, this);

        if (this.timerLabel) {
            this.timerLabel.node.active = false;
        }
        if (this.additionalLabel) {
            this.additionalLabel.node.active = false;
        }
        if (this.topLabel) {
            this.topLabel.node.active = false;
        }

        this.animState = null; // Initialize the animation state variable
    },

    onDestroy() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },

    update(dt) {
        if (!this.rigidBody) return;

        let velocity = this.rigidBody.linearVelocity;

        if (this.movingLeft) {
            this.currentSpeed = Math.max(this.currentSpeed - this.acceleration * dt, -this.speed);
        } else if (this.movingRight) {
            this.currentSpeed = Math.min(this.currentSpeed + this.acceleration * dt, this.speed);
        } else {
            if (this.currentSpeed > 0) {
                this.currentSpeed = Math.max(this.currentSpeed - this.deceleration * dt, 0);
            } else if (this.currentSpeed < 0) {
                this.currentSpeed = Math.min(this.currentSpeed + this.deceleration * dt, 0);
            }
        }

        velocity.x = this.currentSpeed;
        this.rigidBody.linearVelocity = velocity;

        if (this.topLabel) {
            let topLabelPosition = this.node.position;
            topLabelPosition.y += 65; // Adjust the position so it is above the other labels
            this.topLabel.node.setPosition(topLabelPosition);
            this.topLabel.node.active = true;

            // Set text or any other necessary properties for the topLabel
            if (window.Global && window.Global.score !== undefined) {
                this.topLabel.string = `Score: ${window.Global.score}`; // Example value
            } else {
                this.topLabel.string = `Score: N/A`; // Default text if value is not available
            }
        }

        if (this.timerLabel) {
            let timerLabelPosition = this.node.position;
            timerLabelPosition.y += 35;
            this.timerLabel.node.setPosition(timerLabelPosition);
            this.timerLabel.node.active = true;
        }

        if (this.additionalLabel) {
            let additionalLabelPosition = this.node.position;
            additionalLabelPosition.y += 50;
            this.additionalLabel.node.setPosition(additionalLabelPosition);
            this.additionalLabel.node.active = true;

            if (window.Global && window.Global.life !== undefined) {
                this.additionalLabel.string = `Lives: ${window.Global.life}`;
            } else {
                this.additionalLabel.string = `Lives: N/A`;
            }
        }

        // Handle jump animation state
        if (this.isJumping && this.isGrounded()) {
            this.isJumping = false;
            if (this.animState && this.animState.isPlaying) {
                this.animState.stop();
            }
            // Resume walking animation if moving
            if (this.movingLeft || this.movingRight) {
                this.playWalkingAnimation();
            }
        }
    },

    onKeyDown(event) {
        switch (event.keyCode) {
            case cc.macro.KEY.w:
                this.jump();
                break;
            case cc.macro.KEY.a:
                this.movingLeft = true;
                this.node.scaleX = -1;
                if (!this.isJumping) {
                    this.playWalkingAnimation();
                }
                break;
            case cc.macro.KEY.d:
                this.movingRight = true;
                this.node.scaleX = 1;
                if (!this.isJumping) {
                    this.playWalkingAnimation();
                }
                break;
        }
    },

    onKeyUp(event) {
        switch (event.keyCode) {
            case cc.macro.KEY.a:
                this.movingLeft = false;
                if (!this.movingRight && !this.isJumping && this.animState && this.animState.isPlaying) {
                    this.animState.stop(); // Stop the animation if not moving right and not jumping
                }
                break;
            case cc.macro.KEY.d:
                this.movingRight = false;
                if (!this.movingLeft && !this.isJumping && this.animState && this.animState.isPlaying) {
                    this.animState.stop(); // Stop the animation if not moving left and not jumping
                }
                break;
        }
    },

    jump() {
        if (this.isGrounded()) {
            let velocity = this.rigidBody.linearVelocity;
            velocity.y = this.jumpForce;
            this.rigidBody.linearVelocity = velocity;

            if (this.jumpSound) {
                cc.audioEngine.playEffect(this.jumpSound, false);
            }

            if (this.animState && this.animState.isPlaying) {
                this.animState.stop();
            }
            this.animState = this.anim.play("mario - jump");
            this.isJumping = true;
        }
    },

    isGrounded() {
        return Math.abs(this.rigidBody.linearVelocity.y) < 0.000000000000000001;
    },

    playWalkingAnimation() {
        if (!this.animState || !this.animState.isPlaying) {
            this.animState = this.anim.play("mario - walk right");
            this.animState.speed = 1; // Play at normal speed
            this.animState.wrapMode = cc.WrapMode.Loop; // Loop the animation
        }
    }
});
