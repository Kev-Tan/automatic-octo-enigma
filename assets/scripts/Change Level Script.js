cc.Class({
    extends: cc.Component,

    properties: {
        button1: {
            default: null,
            type: cc.Button
        },
        button2: {
            default: null,
            type: cc.Button
        }
    },

    onLoad() {
        // Attach event listeners to buttons
        this.button1.node.on('click', this.onButton1Clicked, this);
        this.button2.node.on('click', this.onButton2Clicked, this);
    },

    // Function to handle button 1 click
    onButton1Clicked() {
        console.log("CLICKED")
        cc.director.loadScene('Transition Scene 1');
    },

    onButton2Clicked() {
        console.log("CLICKED")
        cc.director.loadScene('Transition Scene 2');
    },

});
