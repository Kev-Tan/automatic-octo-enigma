cc.Class({
    extends: cc.Component,

    properties: {
        // Target object for the camera to follow
        target: {
            default: null,
            type: cc.Node
        },

        // Offset from the target position (optional)
        offset: {
            default: cc.v2(0, 0),
            type: cc.Vec2
        },

        // Boundary adjustment (left boundary limit)
        leftBoundary: {
            default: 0,
            type: cc.Float
        }
    },

    onLoad() {
        // Store the original x position of the camera as the left boundary
        this.originalPositionX = this.node.position.x;

        // Set the left boundary to the original position or a defined value
        this.leftBoundary = this.originalPositionX;
    },

    update(dt) {
        if (this.target) {
            // Get the current target position with the offset
            let targetPosition = this.target.position.add(this.offset);

            // Calculate the new camera position
            let newCameraPosition = cc.v2(
                targetPosition.x,   // Follow the target on the x-axis
                this.node.position.y // Keep the current y position
            );

            // Constrain the camera position to the right of the left boundary
            newCameraPosition.x = Math.max(newCameraPosition.x, this.leftBoundary);

            // Update the camera position
            this.node.position = newCameraPosition;
        }
    }
});
