function mu_exists() {
    return "undefined" != typeof window.mugames && null !== window.mugames
}

function MU_initAPI(a) {
    return MU.initLangs(a)
}

function MU_hideAddressBar() {
    MU.hideAddressBar()
}

function MU_getLang() {
    var lang = (navigator.browserLanguage || navigator.language).toLowerCase();
    var symbol = '';
    switch(lang){
         case 'zh-cn':  
            symbol = 'cn';
            break;  
        case 'en-us': 
            symbol = 'en'; 
            break;  
        default:
            symbol = 'en'; 
            break;
    }
    return symbol;
}

function MU_OrientationHandler(a, b) {
    "undefined" != typeof a && null !== a && MU.setOrientationHandler(a), "undefined" != typeof b && null !== b && MU.setResizeHandler(b)
}
var MU_Lang = "en",
    MU = {
        logger: null,
        loaded: !1,
        debug: !1,
        lang: "en",
        gameJS: [],
        d: document,
        loadScrnTimer: 10,
        loadingScreenUrl: "",
        queryParams: {},
        getLogger: function() {
            return !MU.logger && window.SoftgamesLogger && (MU.logger = new window.SoftgamesLogger("softgames-1.1")), MU.logger
        },
        logError: function(a) {
            var b = MU.getLogger();
            b ? b.error(a) : console.error(a)
        },
        boot: function() {
            MU.initLangs(window.gameSupportLangs), mu_exists() ? (window.mugames.gameInitCallback = MU.startGame, window.mugames.getReady()) : MU.startGame()
        },
        getGameId: function() {
            return mu_exists() ? window.mugames.gameId() : void 0
        },
        startGame: function() {
            MU.loaded || (MU.loaded = !0, MU.showSpinner(), "function" == typeof window.gamePreLoader && window.gamePreLoader(), MU.loadJsFiles(window.gameJS, function() {
                MU.hideLoadScrn(), window.gameOnLoadScript && eval(window.gameOnLoadScript)
            }))
        },
        showSpinner: function() {},
        showLoadingBar: function() {
            return void 0 === MU.getUrlParameters().disableLoadingBar || "true" !== MU.getUrlParameters().disableLoadingBar
        },
        checkLoadingScreenUrl: function() {
            document.getElementsByTagName("meta")["splashscreen-game-url"] && (MU.loadingScreenUrl = document.getElementsByTagName("meta")["splashscreen-game-url"].getAttribute("content"))
        },
        showLoadScrn: function() {
            MU.checkLoadingScreenUrl(), "" === MU.loadingScreenUrl ? MU.showLoadingDots() : MU.showLoadingImage()
        },
        showLoadingImage: function() {
            var a = MU.d.createElement("img");
            a.setAttribute("src", MU.loadingScreenUrl), a.style.maxWidth = "100%";
            var b = MU.d.createElement("div");
            b.setAttribute("id", "sg-loadscrn"), b.appendChild(a);
            var c = function() {
                var a = MU.d.getElementsByTagName("body")[0];
                "undefined" != typeof a ? (a.appendChild(b), MU.loadVoyagerOrConnector()) : (MU.debug && console.log("show load-screen: body-tag not ready. retrying in " + MU.loadScrnTimer + "ms"), setTimeout(c, MU.loadScrnTimer))
            };
            c()
        },
        showLoadingDots: function() {
            var a = MU.d.createElement("div");
            if (a.setAttribute("id", "sg-loadscrn"), MU.showLoadingBar()) {
                var b = MU.d.createElement("div");
                b.setAttribute("id", "sg-spinner"), a.appendChild(b)
            }
            if (-1 != window.location.href.indexOf("adultcontent")) {
                var c = MU.d.createElement("div");
                c.setAttribute("id", "sg-loadtext"), c.innerHTML = "One moment please...<br>Your site is almost loaded!", a.appendChild(c)
            }
            var d = function() {
                var b = MU.d.getElementsByTagName("body")[0];
                "undefined" != typeof b ? (null === MU.d.getElementById("sg-loadscrn") && (MU.debug && console.log("show load-screen: complete"), b.appendChild(a)), MU.loadVoyagerOrConnector()) : (MU.debug && console.log("show load-screen: body-tag not ready. retrying in " + MU.loadScrnTimer + "ms"), setTimeout(d, MU.loadScrnTimer))
            };
            d()
        },
        hideLoadScrn: function() {
            var a = MU.d.getElementById("sg-loadscrn");
            a && a.parentNode.removeChild(a)
        },
        loadJsFiles: function(a, b) {
            var c = MU.d.getElementsByTagName("head")[0] || document.documentElement,
                d = [];
            a.length;
            if (a.length > 0) {
                var e = document.createElement("script");
                d = !1, e.type = "text/javascript", e.src = a[0], a.shift();
                var f = !1;
                e.onreadystatechange = e.onload = function() {
                    f || this.readyState && "loaded" !== this.readyState && "complete" !== this.readyState || (f = !0, e.onload = e.onreadystatechange = null, c && e.parentNode && c.removeChild(e), MU.loadJsFiles(a, b))
                }, c.insertBefore(e, c.firstChild), MU.debug && console.log("loading " + e.src + ", " + a.length + " files left.")
            } else "function" == typeof b && (MU.debug && console.log("calling callback: " + b), b())
        },
        loadCSSFiles: function(a) {
            if (0 !== a.length)
                for (var b = MU.d.getElementsByTagName("head")[0] || document.documentElement, c = 0; c < a.length; c++) {
                    var d = document.createElement("link");
                    d.rel = "stylesheet", d.type = "text/css", d.href = a[c], b.insertBefore(d, b.firstChild)
                }
        },
        trigger: function(a, b) {
            if (!mu_exists()) return !1;
            switch (console.log("event data: ", a), a.type) {
                case "start":
                    d = {
                        type: window.mugames.eventStartingGame
                    };
                    break;
                case "levelStarted":
                    d = {
                        type: window.mugames.eventLevelStarted,
                        level: a.level
                    };
                    break;
                case "levelFinished":
                    d = {
                        type: window.mugames.eventLevelFinished,
                        level: a.level,
                        score: a.score
                    };
                    break;
                case "levelUp":
                    d = {
                        type: window.mugames.eventLevelUp,
                        level: a.level,
                        prevoius_level_score: a.lastLevelScore
                    };
                    break;
                case "gameOver":
                    d = {
                        type: window.mugames.eventGameOver,
                        score: a.score,
                        level: a.level
                    };
                    break;
                case "gameCompleted":
                    d = {
                        type: window.mugames.eventGameCompleted,
                        score: a.score
                    };
                    break;
                case "gamePause":
                    d = {
                        type: window.mugames.eventGamePause,
                        state: a.state
                    };
                    break;
                case "gameRestart":
                    d = {
                        type: window.mugames.eventGameRestart
                    };
                    break;
                case "selectLevel":
                    d = {
                        type: window.mugames.eventSelectLevel,
                        level: a.level
                    };
                    break;
                case "selectMainMenu":
                    d = {
                        type: window.mugames.eventSelectMainMenu
                    };
                    break;
                case "setSound":
                    d = {
                        type: window.mugames.eventSound,
                        state: a.state
                    };
                    break;
                case "incentiviseTriggered":
                    d = {
                        type: window.mugames.eventIncentiviseTriggered
                    }
            }
            return window.mugames.trigger(d, b), !0
        },
        initLangs: function(supportLangs) {
            var b = "function" == typeof MU_getLang ? MU_getLang() : "en",
                c = "[object array]" == Object.prototype.toString.call(supportLangs).toLowerCase();
            if(c && "undefined" != typeof supportLangs && null !== supportLangs && supportLangs.join().indexOf(b) >= 0){
                MU.lang = b;
                MU_Lang = MU.lang;
            }
            return MU.lang;
        },
        isEnabledIncentiviseButton: function() {
            return mu_exists() ? window.mugames.isEnabledIncentiviseButton() : !1
        },
        getLang: function() {
            return MU.lang
        },
        getGameConfig: function() {
            return mu_exists() ? window.mugames.game_config : void 0
        },
        setOrientationHandler: function(a) {
            mu_exists() && (window.mugames.changeScreenOrientation = a)
        },
        setResizeHandler: function(a) {
            mu_exists() && (window.mugames.changeScreenSize = a)
        },
        setPauseHandler: function(a) {
            mu_exists() && (window.mugames.gamePauseFunction = a)
        },
        setUnpauseHandler: function(a) {
            mu_exists() && (window.mugames.gameUnpauseFunction = a)
        },
        hideAddressBar: function() {
            setTimeout(function() {
                window.scrollTo(0, 1)
            }, 10)
        },
        loadVoyagerOrConnector: function() {
            MU.parseQueryParams(), MU.useEmbedderFlow() ? MU.loadConnector() : MU.loadVoyager()
        },
        useEmbedderFlow: function() {
            return MU.queryParams.ng && "true" == MU.queryParams.ng ? !0 : !1
        },
        parseQueryParams: function() {
            for (var a = window.location.search.substring(1).split("&"), b = 0; b < a.length; b++) {
                var c = a[b].split("=");
                MU.queryParams[c[0]] = c[1]
            }
        },
        loadConnector: function() {
            var a = document.createElement("script");
            a.type = "text/javascript", a.async = !0;
            var b = Math.floor(1e8 * Math.random() + 1);
            //a.src = "http://games.softgames.de/assets/softgames-connector.js?_=" + b;
            var c = document.getElementsByTagName("script")[0];
            c.parentNode.insertBefore(a, c)
        },
        loadVoyager: function() {
            var a = document.createElement("script");
            a.type = "text/javascript", a.async = !0;
            var b = Math.floor(1e8 * Math.random() + 1);
            //a.src = "//d3tlss08qwqpkt.cloudfront.net/assets/api/voyager.js?_=" + b, a.onload = MU.boot;
            a.onload = MU.boot();
            var c = document.getElementsByTagName("script")[0];
            c.parentNode.insertBefore(a, c)
        },
        redirectToPortal: function() {
            if (!mu_exists()) return !1;
            try {
                window.mugames._trackAction("ingameRedirectClicked"), window.mugames._trackEvent("ingameRedirectClicked");
                MU.detectPortalUrl();
                window.mugames.redirectToPortal()
            } catch (a) {
                MU.logError(a)
            }
        },
        detectPortalUrl: function() {
            var a = softgames.back_url;
            return "string" != typeof a && (a = softgames.subplatform), "string" != typeof a ? a = "http://m.softgames.de" : a.match(/^http:\/\//) === !1 && (a = "http://" + a), a
        },
        getLogoUrl: function(a) {
            //return "http://d1bjj4kazoovdg.cloudfront.net/assets/sg_ig_logo.png"
        },
        getUrlParameters: function() {
            for (var a, b = [], c = window.location.href.slice(window.location.href.indexOf("?") + 1).split("&"), d = 0; d < c.length; d++) a = c[d].split("="), b.push(a[0]), b[a[0]] = a[1];
            return b
        }
    };
MU.showLoadScrn();