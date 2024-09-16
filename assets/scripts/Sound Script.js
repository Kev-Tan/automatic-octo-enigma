// SceneManager.js

cc.Class({
    extends: cc.Component,

    properties: {
        // Properties to hold references to audio clips for different scenes
        mainMenuAudio: {
            default: null,
            type: cc.AudioClip
        },
        gameSceneAudio: {
            default: null,
            type: cc.AudioClip
        },
        secondGameSceneAudio: {
            default: null,
            type: cc.AudioClip
        },
        // Add other audio clips as needed
    },

    onLoad() {
        // Listen for scene change events
        cc.director.on(cc.Director.EVENT_AFTER_SCENE_LAUNCH, this.onSceneChange, this);
    },

    onDestroy() {
        // Clean up the event listener when the script/component is destroyed
        cc.director.off(cc.Director.EVENT_AFTER_SCENE_LAUNCH, this.onSceneChange, this);
    },

    onSceneChange() {
        // Log the detection of a scene change
        console.log("Scene changed detected!");
        cc.audioEngine.stopMusic();

        // Get the name of the new scene
        const currentScene = cc.director.getScene().name;
        console.log(`Current scene: ${currentScene}`);

        // Play audio based on the current scene
        this.playSceneAudio(currentScene);
    },

    playSceneAudio(sceneName) {
        let audioClip = null;

        // Determine which audio clip to play based on the scene name
        switch (sceneName) {
            case 'Start':
                audioClip = this.mainMenuAudio;
                break;
            case 'Level1':
                console.log("Level 1 Audio")
                audioClip = this.gameSceneAudio;
                break;  
            // Add cases for other scenes and their audio clips
            case 'Level2':
                console.log("Level 2 Audio")
                audioClip = this.secondGameSceneAudio;
                break;  
            default:
                console.log(`No audio configured for scene: ${sceneName}`);
                return;
        }

        if (audioClip) {
            // Play the audio clip
            cc.audioEngine.playMusic(audioClip, false);
        }
    },

    // Optional: Method to manually load a scene
    loadScene(sceneName) {
        console.log(`Request to load scene: ${sceneName}`);
        cc.director.loadScene(sceneName, () => {
            // Callback after the scene has been loaded
            console.log(`Scene loaded: ${sceneName}`);
        });
    }
});
