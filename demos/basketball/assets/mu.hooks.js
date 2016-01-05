var MU_Hooks = {
    debug: !0,
    getLanguage: function(a) {
        return MU.initLangs(a)
    },
    getGameConfig: function() {
        return MU.getGameConfig()
    },
    isEnabledIncentiviseButton: function() {
        return MU.isEnabledIncentiviseButton()
    },
    start: function() {
        MU_Hooks.debug && console.log("game started"), MU.trigger({
            type: "start"
        })
    },
    levelStarted: function(a) {
        MU_Hooks.debug && console.log("level started:" + a), MU.trigger({
            type: "levelStarted",
            level: a
        })
    },
    levelFinished: function(a, b) {
        MU_Hooks.debug && console.log("level finished:" + a + " score: " + b), MU.trigger({
            type: "levelFinished",
            level: a,
            score: b
        })
    },
    levelUp: function(a, b, c) {
        MU_Hooks.debug && console.log("level up:" + a + "/" + b), MU.trigger({
            type: "levelUp",
            level: a,
            lastLevelScore: b
        }, c)
    },
    gameOver: function(a, b, c) {
        MU_Hooks.debug && console.log("game over:" + a + "/" + b), MU.trigger({
            type: "gameOver",
            score: b,
            level: a
        }, c)
    },
    gameCompleted: function(a, b) {
        MU_Hooks.debug && console.log("game completed:" + a), MU.trigger({
            type: "gameCompleted",
            score: a
        }, b)
    },
    gamePause: function(a, b) {
        MU_Hooks.debug && console.log("game pause:" + a), MU.trigger({
            type: "gamePause",
            state: a
        }, b)
    },
    gameRestart: function(a) {
        MU_Hooks.debug && console.log("game restart:"), MU.trigger({
            type: "gameRestart"
        }, a)
    },
    selectMainMenu: function(a) {
        MU_Hooks.debug && console.log("selectMainMenu:"), MU.trigger({
            type: "selectMainMenu"
        }, a)
    },
    selectLevel: function(a, b) {
        MU_Hooks.debug && console.log("selectLevel:" + a), MU.trigger({
            type: "selectLevel",
            level: a
        }, b)
    },
    setSound: function(a, b) {
        MU_Hooks.debug && console.log("setSound:" + a), MU.trigger({
            type: "gameCompleted",
            state: a
        }, b)
    },
    triggerIncentivise: function(a) {
        MU_Hooks.debug && console.log("triggerIncentivise"), MU.trigger({
            type: "incentiviseTriggered"
        }, a)
    },
    setOrientationHandler: function(a) {
        MU.setOrientationHandler(a)
    },
    setResizeHandler: function(a) {
        MU.setResizeHandler(a)
    },
    setPauseHandler: function(a) {
        MU.setPauseHandler(a)
    },
    setUnpauseHandler: function(a) {
        MU.setUnpauseHandler(a)
    },
    buildKey: function(a) {
        return MU.getGameId() + "." + a
    },
    getStorageItem: function(a) {
        var b = null;
        try {
            b = localStorage.getItem(MU_Hooks.buildKey(a))
        } catch (c) {
            return void 0
        }
        return void 0 !== b && null !== b && (b = window.atob(b)), b
    },
    setStorageItem: function(a, b) {
        var c = b;
        void 0 !== c && null !== c && (c = window.btoa(c));
        try {
            return localStorage.setItem(MU_Hooks.buildKey(a), c), b
        } catch (d) {
            return void 0
        }
    }
};