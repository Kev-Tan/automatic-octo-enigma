cc.Class({
    extends: cc.Component,

    properties: {
        // Optionally set a zIndex value to use for all tilemaps
        tilemapZIndex: {
            default: 0, // This will set tilemaps behind the main character
            type: cc.Integer
        },
        mainCharacter: {
            default: null,
            type: cc.Node
        }
    },

    onLoad() {
        // Ensure main character is assigned if necessary
        if (!this.mainCharacter) {
            console.error('Main character node is not assigned.');
            return;
        }

        // Set zIndex for all tilemap nodes
        this.setTilemapZIndex();
    },

    setTilemapZIndex() {
        // Find all tilemap nodes in the scene
        let tilemapNodes = this.getTilemapNodes(cc.director.getScene());
        
        // Set zIndex for each tilemap node
        tilemapNodes.forEach(node => {
            node.zIndex = this.tilemapZIndex;
        });

        // Ensure the main character is rendered in front of tilemaps
        if (this.mainCharacter) {
            this.mainCharacter.zIndex = this.tilemapZIndex + 1;
        }
    },

    getTilemapNodes(parent) {
        let tilemapNodes = [];

        parent.children.forEach(child => {
            if (child.getComponent(cc.TiledMap)) {
                tilemapNodes.push(child);
            }

            // Recursively search child nodes
            tilemapNodes = tilemapNodes.concat(this.getTilemapNodes(child));
        });

        return tilemapNodes;
    }
});
