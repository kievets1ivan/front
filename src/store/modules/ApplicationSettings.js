const ApplicationSettings = {
    state: {
        volume: 100,
        loadingId: null,
        playingId: null,
        pausedId: null,
        currentAudioFileId: null,
        currentState: null,
        // states: null - no audio file, 0 - loading, 1 - loaded, 2 - play, 3 - pause
    },
    mutations: {
        setApplicationSettings(state, { type, items }) {
            // console.log(state[type], state, type)
            state[type] = items;
            console.log(state[type]);
        },
    },
    actions: {
        loadAudioFileById(state, { id }) {
            state.commit("setApplicationSettings", {
                type: "currentAudioFileId",
                items: id,
            });
            state.commit("setApplicationSettings", {
                type: "currentState",
                items: 0,
            });
        },
        audioFileLoaded(state) {
            state.commit("setApplicationSettings", {
                type: "currentState",
                items: 1,
            });
        },
        playAudioFile(state) {
            // console.log(this.state.ApplicationSettings)
            if (this.state.ApplicationSettings.currentState >= 1) {
                state.commit("setApplicationSettings", {
                    type: "currentState",
                    items: 2,
                });
            }
        },
        pauseAudioFile(state) {
            if (this.state.ApplicationSettings.currentState >= 1) {
                state.commit("setApplicationSettings", {
                    type: "currentState",
                    items: 3,
                });
            }
        },
        toggleStateAudioFile(state) {
            if (this.state.ApplicationSettings.currentState === 2) {
                state.commit("setApplicationSettings", {
                    type: "currentState",
                    items: 3,
                });
            } else if (this.state.ApplicationSettings.currentState === 3) {
                state.commit("setApplicationSettings", {
                    type: "currentState",
                    items: 2,
                });
            }
        },
    },
    getters: {
        getVolume(state) {
            return state.volume;
        },

        getPlayingId(state) {
            return state.playingId;
        },
        getLoadingId(state) {
            return state.loadingId;
        },
        getPausedId(state) {
            return state.pausedId;
        },

        getCurrentAudioFileId(state) {
            return state.currentAudioFileId;
        },
        getCurrentState(state) {
            return state.currentState;
        },
    },
};
export default ApplicationSettings;