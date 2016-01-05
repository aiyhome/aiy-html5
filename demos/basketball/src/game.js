var isEmbed = function() {
	var containerParent = document.getElementById("wrapper").parentNode;
	var body = document.getElementsByTagName("body")[0];
	return containerParent != body;
}();
var MLE = MLE || {};

//show SGLinks logic
var showMULinks = true;
var loc = window.location.href
var inPreloader = true;

var specificPartnersStr = "iwin.com,mobileforce.pl";
var specificPartnersArr = specificPartnersStr.split(",");

for (i = 0; i < specificPartnersArr.length; i++)
{
    if( loc.indexOf(specificPartnersArr[i])!=-1 ) showMULinks = false;
}
 
function myFunc()
{
    if(showMULinks==true&&inPreloader==true) window.open("http://www.mun-u.com", "_blank");
}

MLE.init = function(a) {
    MLE.forceFPS = a.forceFPS || false;
    MLE.showDebug = a.showDebug || false;
    MLE.noCache = true;
    MLE.mouseScale = 1;
    MLE.mouse = new MouseInput;
    MLE.keyboard = new KeyboardInput;
    MLE.wrapper = document.getElementById(a.wrapper || "wrapper");
    MLE.canvas = document.getElementById(a.canvas || "gameCanvas");
    if (!MLE.canvas) MLE.canvas = document.createElement("canvas"), MLE.canvas.id = "gameCanvas", MLE.wrapper.appendChild(MLE.canvas);
    MLE.width = a.width || 320;
    MLE.height = a.height || 480;
    MLE.canvas.width = MLE.width;
    MLE.canvas.height =
        MLE.height;
    MLE.wrapper.style.width = MLE.width + "px";
    MLE.wrapper.style.height = MLE.height + "px";
    MLE.context = MLE.canvas.getContext("2d");
    MLE.scaling = a.scaling || true;
    MLE.scaling && MLE.initScaling();
    MLE.manifest = a.manifest || [];
    MLE.assets = new MLE.Assets;
    MLE.preManifest = a.preManifest || [];
    MLE.preLoader = new MLE.Loader(MLE.preManifest, MLE.startLoader.bind(MLE));
    MLE.preLoaderScene = a.preLoaderScene;
    MLE.tick = 0;
    MLE.lastFrameTime = Date.now();
    MLE.gameType = a.game;
    MLE.game = null;
    MLE.cameraX = 0;
    MLE.cameraY = 0;
    MLE.lastCamX =
        0;
    MLE.lastCamY = 0;
    MLE.context.imageSmoothingEnabled = true
};
MLE.startLoader = function() {
    MLE.tick = 0;
    MLE.lastFrameTime = Date.now();
    MLE.game = new MLE.preLoaderScene;
    MLE.rotateScene = new RotateScene;
    MLE.mouse.init();
    MLE.keyboard.init();
    MLE.loader = new MLE.Loader(MLE.manifest, function() {});
    MLE.gameLoop()
};
MLE.start = function() {
    setTimeout(function() {
        createjs.Tween._tweens = [];
        MLE.context.imageSmoothingEnabled = false;
        MLE.nextGame = new MLE.gameType
    }, 200)
};
MLE.initScaling = function() {
    MLE.sizeHandler();
    window.addEventListener("resize", function() {
        MLE.sizeHandler(15)
    }, false);
    window.addEventListener("orientationchange", function() {
        MLE.sizeHandler(15)
    }, false)
};
var cumulTick = 0,
    cumulCounter = 0,
    fps = 0;
MLE.gameLoop = function() {
    MLE.sizeHandler();
    if (window.innerHeight < window.innerWidth && isMobile.any()) MLE.sizeHandler(), MLE.rotateScene.update(), MLE.rotateScene.draw();
    else {
        document.body.style["background-color"] = "#000000";
        if (MLE.nextGame) MLE.game = MLE.nextGame, MLE.nextGame = null;
        MLE.context.globalAlpha = 1;
        MLE.tick = Date.now() - MLE.lastFrameTime;
        MLE.context.clearRect(0, 0, MLE.width, MLE.height);
        MLE.lastFrameTime += MLE.tick;
        //Date.now();
        createjs.Tween.tick(MLE.tick, false);
        MLE.keyboard.update();
        MLE.mouse.update();
        MLE.game.update();
        //Date.now();
        //Date.now();
        MLE.game.draw();
        //Date.now();
        cumulTick += MLE.tick;
        cumulCounter += 1;
        cumulTick > 1E3 && (cumulTick -= 1E3, fps = cumulCounter, cumulCounter = 0);
        if (MLE.showDebug) MLE.context.font = "18px sans-serif", MLE.context.textAlign = "left", MLE.context.fillStyle = "#ff00ff", MLE.context.fillText(fps, 0, 20);
        MLE.lastCamX = MLE.cameraX;
        MLE.lastCamY = MLE.cameraY
    }
    MLE.idAnimationFrame = requestAnimationFrame(MLE.gameLoop)
};
MLE.downCallbacks = function() {
    MLE.game && MLE.game.downCallbacks && MLE.game.downCallbacks()
};
MLE.upCallbacks = function() {
    MLE.game && MLE.game.upCallbacks && MLE.game.upCallbacks()
};
MLE.sizeHandler = function(a) {
		var parent = {};
		if (isEmbed) {
			var wrapper = document.getElementById("wrapper");
			parent.width = parseInt(wrapper.parentNode.offsetWidth);
			parent.height = parseInt(wrapper.parentNode.offsetHeight);
			//console.log(parent.width + "x" + parent.height);
		} else {
			parent.width = window.innerWidth;
			parent.height = window.innerHeight;
		}
		
		window.scrollTo(0, 1);
    var b = MLE.width,
        d = MLE.height,
        c = parent.width,
        e = parent.height,
        c = limitNumber(c, 160, 1200),
        e = limitNumber(e, 160, 1200);
    multiplier = Math.min(e / d, c / b);
    b *= multiplier;
    d *= multiplier;
    c = MLE.wrapper;
    c.style.display = "block";
    c.style.width = b + "px";
    c.style.height = d + 0 + "px";
    if (isEmbed) {
			c.style.position = "relative";
			c.style.left = ((parent.width - MLE.canvas.offsetWidth) * 0.5) + "px";
			c.style.top = "";
		} else {
		c.style.position = "absolute";
			c.style.left = window.innerWidth / 2 - b / 2 + "px";
			c.style.top = window.innerHeight / 2 - d / 2 + "px";
		}
		
    a && setTimeout(function() {
        MLE.sizeHandler(a - 1)
    }, 500)
};
(function() {
    for (var a = 0, b = ["ms", "moz", "webkit", "o"], d = 0; d < b.length && !window.requestAnimationFrame; ++d) window.requestAnimationFrame = window[b[d] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[b[d] + "CancelAnimationFrame"] || window[b[d] + "CancelRequestAnimationFrame"];
    if (!window.requestAnimationFrame) window.requestAnimationFrame = function(b) {
        var d = (new Date).getTime(),
            f = Math.max(0, 16 - (d - a)),
            g = window.setTimeout(function() {
                b(d + f)
            }, f);
        a = d + f;
        return g
    };
    if (!window.cancelAnimationFrame) window.cancelAnimationFrame =
        function(a) {
            clearTimeout(a)
        }
})();
MLE = MLE || {};
MLE.Assets = function() {
    this.textures = {};
    this.bitmaps = {}
};
MLE.Assets.prototype.addResource = function(a) {
    a.isSpriteSheet ? this.addSpriteSheet(a) : (this.addTexture(a.id, a.img), this.addBitmap(a.id, a.img))
};
MLE.Assets.prototype.addBitmap = function(a, b, d) {
    this.bitmaps[a] = new MLE.Bitmap(b, d)
};
MLE.Assets.prototype.addTexture = function(a, b) {
    this.textures[a] = b
};
MLE.Assets.prototype.addSpriteSheet = function(a) {
    this.addTexture(a.id, a.img);
    for (var b in a.descObj) this.addBitmap(b, a.img, a.descObj[b].frame)
};
MLE.Assets.prototype.getBitmap = function(a) {
    try {
        return this.bitmaps[a] === null ? null : this.bitmaps[a].clone()
    } catch (b) {
        console.log("Nie mo\u017ce sklonowa\u0107: ", a)
    }
};
MLE = MLE || {};
MLE.Util = {};
MLE.Util.toDeg = function(a) {
    return a * 180 / Math.PI
};
MLE.Util.toRad = function(a) {
    return a / 180 * Math.PI
};
MLE.Util.mapValue = function(a, b, d, c, e) {
    return c + (e - c) * ((a - b) / (d - b))
};
MLE.Util.testMapValue = function() {
    console.log("1, 2, 3, 4, 5");
    console.log(MLE.Util.mapValue(1, 2, 3, 4, 5));
    console.log("Powinno: 3");
    console.log("2, 2, 3, 4, 5");
    console.log(MLE.Util.mapValue(2, 2, 3, 4, 5));
    console.log("Powinno: 4");
    console.log("0.25, 0, 1, 100, 1100");
    console.log(MLE.Util.mapValue(0.25, 0, 1, 100, 1100));
    console.log("Powinno: 350");
    console.log("0.25, 0, 1, 1000, 0");
    console.log(MLE.Util.mapValue(0.25, 0, 1, 1E3, 0));
    console.log("Powinno: 750");
    console.log("0.25, 0, 1, 1000, 0");
    console.log(MLE.Util.mapValue(0.25,
        1, 0, 0, 1E3));
    console.log("Powinno: 750");
    console.log("1250, 2000, 1000, 1.5, 0");
    console.log(MLE.Util.mapValue(1250, 2E3, 1E3, 1.5, 0));
    console.log("Powinno: 0.375");
    console.log("1250, 2000, 1000, 1.5, 3");
    console.log(MLE.Util.mapValue(1250, 2E3, 1E3, 1.4, 3));
    console.log("Powinno: 2.6")
};
MLE.Util.sortArray = function(a, b) {
    a.sort(function(a, c) {
        return c[b] - a[b]
    });
    return a
};
MLE.Util.ajaxRequest = function() {
    var a = ["Msxml2.XMLHTTP", "Microsoft.XMLHTTP"];
    if (window.ActiveXObject)
        for (var b = 0; b < a.length; b++) try {
            return new ActiveXObject(a[b])
        } catch (d) {} else return window.XMLHttpRequest ? new XMLHttpRequest : false
};
MLE.Util.isCanvasEmpty = function(a) {
    for (var a = a.getContext("2d").getImageData(0, 0, a.width, a.height).data, b = 0, d = a.length; b < d; b += 4)
        if (a[b + 3]) return false;
    return true
};
trace = function() {};
Function.prototype.bind = function(a) {
    var b = this;
    return temp = function() {
        return b.apply(a, arguments)
    }
};
limitNumber = function(a, b, d) {
    return Math.min(d, Math.max(b, a))
};

function shuffleArray(a) {
    for (var b = a.length - 1; b > 0; b--) {
        var d = Math.floor(Math.random() * (b + 1)),
            c = a[b];
        a[b] = a[d];
        a[d] = c
    }
    return a
}
var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i)
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i)
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i)
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i)
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i)
    },
    any: function() {
        return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()
    }
};

function getDistance(a, b, d, c) {
    a = Math.abs(a - d);
    b = Math.abs(b - c);
    return Math.sqrt(a * a + b * b)
}
MLE.Util.createArrayFromTo = function(a, b) {
    for (var d = Math.abs(a - b) / (a - b), c = [], e = true, f = a; e; f -= d) c.push(f), f === b && (e = false);
    return c
};
Number.prototype.map = function(a, b, d, c) {
    return d + (c - d) * ((this - a) / (b - a))
};
Number.prototype.isBetween = function(a, b) {
    var d;
    return this <= a && this >= b || this >= a && this <= b
};

MLE.Util.colorBetweenColors = function(a, b, d) {
    for (var c = [0, 0, 0, 0], e = 0; e < 4; e++) c[e] = a[e] > b[e] ? a[e] - (a[e] - b[e]) * d : (b[e] - a[e]) * d + a[e];
    for (e = 0; e < 4; e++) c[e] = Math.floor(c[e]);
    return c
};
MLE = MLE || {};
MLE.Loader = function(a, b) {
    this.allResources = a.length;
    this.loadedResources = 0;
    this.onCompleteCallback = b;
    this.ready = false;
    this.manifest = a;
    if (MLE.noCache)
        for (var d = 0; d < this.manifest.length; d++) this.manifest[d].isFaceFont || (this.manifest[d].src += "?" + Date.now() + Math.random() * 999999);
    var c = new PxLoader;
    this.loader = c;
    for (d = 0; d < a.length; d++)
        if (a[d].isJSON) this.loadJSON(a[d]);
        else if (a[d].isFaceFont) {
        var e = new MLE.FaceFont;
        e.onLoad = this.faceFontLoaded.bind(this);
        e.loadFont(a[d].src)
    } else e = new PxLoaderImage(a[d].src), e.id = a[d].id || null, e.isSpriteSheet = a[d].isSpriteSheet || false, e.descObj = a[d].descObj || null, c.add(e);
    c.addProgressListener(this.onProgress.bind(this));
    c.addCompletionListener(this.onComplete.bind(this));
    c.start()
};
MLE.Loader.prototype.onProgress = function(a) {
    this.loadedResources += 1;
    MLE.assets.addResource(a.resource);
    this.drawProgress(a)
};
MLE.Loader.prototype.onComplete = function() {
    this.onLoadAsset()
};
MLE.Loader.prototype.drawProgress = function() {};
MLE.Loader.prototype.loadJSON = function(a) {
    var b = new MLE.Util.ajaxRequest;
    b.onreadystatechange = this.onLoadJSON.bind(this);
    b.open("GET", a.src, true);
    b.send(null)
};
MLE.Loader.prototype.onLoadJSON = function(a) {
    a.target.readyState === 4 && (a.target.status === 200 ? (this.loadedResources += 1, this.drawProgress(), JSON.parse(a.target.responseText), this.onLoadAsset()) : alert("Error with loading json, try to reload!"))
};
MLE.Loader.prototype.faceFontLoaded = function() {
    this.loadedResources += 1;
    this.drawProgress();
    this.onLoadAsset()
};
MLE.Loader.prototype.onLoadAsset = function() {
    if (this.loadedResources === this.allResources && (this.ready = true, this.onCompleteCallback)) this.onCompleteCallback()
};
MLE = MLE || {};
MLE.Bitmap = function(a, b) {
    this.texture = a;
    this.rect = b ? b : {
        x: 0,
        y: 0,
        w: a.naturalWidth,
        h: a.naturalHeight
    }
};
MLE.Bitmap.prototype.draw = function(a, b) {
    MLE.context.drawImage(this.texture, this.rect.x, this.rect.y, this.rect.w, this.rect.h, a, b, this.rect.w, this.rect.h)
};
MLE.Bitmap.prototype.clone = function() {
    return new MLE.Bitmap(this.texture, this.rect)
};
MLE = MLE || {};
MLE.FrameAnim = function(a, b, d) {
    this.sprite = a;
    this.frameW = this.sprite.rect.w / b;
    this.frameH = this.sprite.rect.h / d;
    this.sprite.pivotX *= this.frameW / this.sprite.rect.w;
    this.sprite.pivotY *= this.frameH / this.sprite.rect.h;
    this.anims = {};
    this.currentAnim = null;
    this.stopped = false;
    this.cumulTime = 0
};
MLE.FrameAnim.prototype.addAnim = function(a, b, d) {
    this.anims[a] = {
        fps: d,
        frames: b,
        currentFrame: 0
    };
    this.currentFrame = this.anims[a]
};
MLE.FrameAnim.prototype.gotoAndPlay = function(a, b) {
    var d;
    if (b) this.currentAnim = this.anims[b];
    this.stopped = false;
    this.currentAnim.currentFrame = a || 0;
    this.cumulTime = 0;
    this.updateSpriteRect()
};
MLE.FrameAnim.prototype.gotoAndStop = function(a, b) {
    var d;
    if (b) this.currentAnim = this.anims[b];
    this.stopped = true;
    this.currentAnim.currentFrame = a || 0;
    this.cumulTime = 0;
    this.updateSpriteRect()
};
MLE.FrameAnim.prototype.update = function() {
    if (!(this.stopped || this.currentAnim === null))
        if (this.cumulTime += MLE.tick, this.cumulTime > 1E3 / this.currentAnim.fps) {
            this.cumulTime -= 1E3 / this.currentAnim.fps;
            if (this.currentAnim.currentFrame === this.currentAnim.frames.length - 1 && (this.onLoop(this.currentAnim), this.stopOnLoop)) {
                this.stopped = true;
                this.updateSpriteRect();
                return
            }
            this.currentAnim.currentFrame = (this.currentAnim.currentFrame + 1) % this.currentAnim.frames.length;
            this.onFrameChange(this.currentAnim, this.currentAnim.currentFrame);
            this.updateSpriteRect()
        }
};
MLE.FrameAnim.prototype.updateSpriteRect = function() {
    var a = this.currentAnim.frames[this.currentAnim.currentFrame],
        b = Math.floor(a / Math.floor(this.sprite.bitmap.rect.w / this.frameW));
    this.sprite.rect.x = a % Math.floor(this.sprite.bitmap.rect.w / this.frameW) * this.frameW;
    this.sprite.rect.y = b * this.frameH;
    this.sprite.rect.w = this.frameW;
    this.sprite.rect.h = this.frameH
};
MLE.FrameAnim.prototype.onFrameChange = function() {};
MLE.FrameAnim.prototype.onLoop = function() {};
MLE.FrameAnim.prototype.isPlaying = function(a) {
    return this.currentAnim === this.anims[a] && this.anims[a] ? true : false
};
MLE = MLE || {};
MLE.Sprite = function(a, b, d, c) {
    typeof a === "string" && (a = MLE.assets.getBitmap(a));
    this.bitmap = a;
    this.rect = c ? c : {
        x: 0,
        y: 0,
        w: a.rect.w,
        h: a.rect.h
    };
    this.x = b;
    this.y = d;
    this.scaleY = this.scaleX = 1;
    this.pivotY = this.pivotX = this.angle = this.skewY = this.skewX = 0;
    this.alpha = 1;
    this.useTransforms = true;
    this.anchor = false
};
MLE.Sprite.prototype.draw = function() {
    if (this.alpha > 1) this.alpha = 1;
    else if (this.alpha < 0) this.alpha = 0;
    if (this.alpha !== 0) {
        var a = MLE.cameraX,
            b = MLE.cameraY;
        if (this.anchor) MLE.cameraX = 0, MLE.cameraY = 0;
        if (this.useTransforms || !(this.x + this.pivotX + this.rect.w * this.scaleX < MLE.cameraX || this.x + this.pivotX > MLE.cameraX + MLE.width || this.y + this.pivotY + this.rect.h * this.scaleX < MLE.cameraY || this.y + this.pivotY > MLE.cameraY + MLE.height)) {
            var d = MLE.context.globalAlpha;
            MLE.context.globalAlpha *= this.alpha;
            if (this.useTransforms) {
                var c = MLE.context;
                c.save();
                c.translate(Math.floor(this.x - MLE.cameraX), Math.floor(this.y - MLE.cameraY));
                c.rotate(MLE.Util.toRad(this.angle));
                c.transform(this.scaleX, Math.tan(MLE.Util.toRad(this.skewY)), Math.tan(MLE.Util.toRad(this.skewX)), this.scaleY, 0, 0);
                MLE.context.drawImage(this.bitmap.texture, this.rect.x + this.bitmap.rect.x, this.rect.y + this.bitmap.rect.y, this.rect.w, this.rect.h, -this.pivotX, -this.pivotY, this.rect.w, this.rect.h);
                c.restore()
            } else MLE.context.drawImage(this.bitmap.texture, this.rect.x + this.bitmap.rect.x,
                this.rect.y + this.bitmap.rect.y, this.rect.w, this.rect.h, Math.floor(this.x - MLE.cameraX), Math.floor(this.y - MLE.cameraY), this.rect.w, this.rect.h);
            MLE.context.globalAlpha = d
        }
        MLE.cameraX = a;
        MLE.cameraY = b
    }
};
MLE.Sprite.prototype.centerPivot = function() {
    this.pivotX = this.rect.w / 2;
    this.pivotY = this.rect.h / 2
};
MLE.Sprite.prototype.setPivotPercent = function(a, b) {
    this.pivotX = a * this.rect.w;
    this.pivotY = b * this.rect.h
};
MLE.Sprite.prototype.changeBitmap = function(a, b) {
    typeof a === "string" && (a = MLE.assets.getBitmap(a));
    this.bitmap = a;
    this.rect = b ? b : {
        x: 0,
        y: 0,
        w: a.rect.w,
        h: a.rect.h
    }
};
MLE = MLE || {};
MLE.TextSprite = function(a, b, d, c, e) {
    this.x = b;
    this.y = d;
    this.alpha = 1;
    this.text = a || "";
    this.font = c || "ni7segnormal";
    this.size = 32;
    this.align = e || "center";
    this.color = "#ffffff";
    this.border = "#000000";
    this.storkeThin = 2;
    this.baseline = "middle";
    this.lineHeight = 50;
    this.wrap = 9999
};
MLE.TextSprite.prototype.draw = function() {
    var a = MLE.context;
    a.save();
    a.globalAlpha *= this.alpha;
    a.font = this.size + "px " + this.font;
    a.textAlign = this.align;
    a.fillStyle = this.color;
    a.strokeStyle = this.border;
    a.textBaseline = this.baseline;
    a.lineWidth = 5;
    a.strokeText(this.text, this.x, this.y);
    a.fillText(this.text, this.x, this.y);
    a.restore()
};
MLE.TextSprite.prototype.getWidth = function() {
    var a = MLE.context;
    a.save();
    a.globalAlpha *= this.alpha;
    a.font = this.size + "px " + this.font;
    a.textAlign = this.align;
    a.fillStyle = this.color;
    a.strokeStyle = this.border;
    a.textBaseline = this.baseline;
    a.lineWidth = 5;
    var b = a.measureText(this.text);
    a.restore();
    return b.width
};
MLE.TextSprite.prototype.adjustFontSize = function(a) {
    for (var b = true; b === true && this.size > 5;) this.getWidth() < a ? b = false : this.size -= 1
};

function wrapText(a, b, d, c, e, f) {
    b = b.split("\n");
    for (e = 0; e < b.length; e++) a.fillText(b[e], d, c, 40), a.lineWidth = 5, a.strokeText(b[e], d, c), c += f
};
MLE = MLE || {};
MLE.Group = function() {
    this.y = this.x = 0;
    this.rect = {
        x: 0,
        y: 0,
        w: 0,
        h: 0
    };
    this.scaleY = this.scaleX = 1;
    this.pivotY = this.pivotX = this.angle = this.skewY = this.skewX = 0;
    this.alpha = 1;
    this.children = []
};
MLE.Group.prototype.draw = function() {
    if (this.alpha > 1) this.alpha = 1;
    else if (this.alpha < 0) this.alpha = 0;
    if (this.alpha !== 0) {
        var a = MLE.cameraX,
            b = MLE.cameraY;
        MLE.cameraX = 0;
        MLE.cameraY = 0;
        var d = MLE.context;
        d.save();
        d.globalAlpha *= this.alpha;
        d.translate(this.x - MLE.cameraX, this.y - MLE.cameraY);
        d.rotate(MLE.Util.toRad(this.angle));
        d.transform(this.scaleX, Math.tan(MLE.Util.toRad(this.skewY)), Math.tan(MLE.Util.toRad(this.skewX)), this.scaleY, 0, 0);
        d.translate(-this.pivotX, -this.pivotY);
        this.preDraw();
        for (var c = 0; c <
            this.children.length; c++) this.children[c].draw();
        this.postDraw();
        d.restore();
        MLE.cameraX = a;
        MLE.cameraY = b;
        d.globalAlpha /= this.alpha
    }
};
MLE.Group.prototype.centerPivot = function() {
    this.pivotX = this.rect.w / 2;
    this.pivotY = this.rect.h / 2
};
MLE.Group.prototype.addChild = function(a) {
    a.grouped = this;
    this.children.push(a)
};
MLE.Group.prototype.addChildInBack = function(a) {
    this.children.unshift(a)
};
MLE.Group.prototype.preDraw = function() {};
MLE.Group.prototype.postDraw = function() {};
MLE.Group.prototype.removeAllTweens = function() {
    createjs.Tween.removeTweens(this);
    for (var a = 0; a < this.children.length; a++) createjs.Tween.removeTweens(this.children[a])
};
MLE = MLE || {};
MLE.SimpleMovement = function(a) {
    this.sprite = a;
    this.init()
};
MLE.SimpleMovement.prototype.init = function() {
    this.accelY = this.accelX = this.velY = this.velX = 0;
    this.maxVelY = this.maxVelX = 1E4;
    this.gravity = 0
};
MLE.SimpleMovement.prototype.update = function() {
    var a = this.accelX,
        a = a * MLE.tick / 1E3;
    this.sprite.x += MLE.tick / 1E3 * (this.velX + a / 2);
    this.velX += a;
    a = this.gravity + this.accelY;
    a = a * MLE.tick / 1E3;
    this.sprite.y += MLE.tick / 1E3 * (this.velY + a / 2);
    this.velY += a;
    if (this.velX > this.maxVelX) this.velX = this.maxVelX;
    else if (this.velX < -this.maxVelX) this.velX = -this.maxVelX;
    if (this.velY > this.maxVelY) this.velY = this.maxVelY;
    else if (this.velY < -this.maxVelY) this.velY = -this.maxVelY
};
MLE.SimpleMovement.prototype.setValues = function(a, b, d, c, e, f, g) {
    this.velX = a;
    this.velY = b;
    this.accelX = d;
    this.accelY = c;
    this.maxVelX = e || this.maxVelX;
    this.maxVelY = f || this.maxVelY;
    this.gravity = g || this.gravity
};
MLE.CircleCollision = function(a, b, d, c, e) {
    this.sprite = a;
    this.x = b;
    this.y = d;
    this.r = c;
    this.fillStyle = e || "rgba(0,255,255,0.6)"
};
MLE.CircleCollision.prototype = {
    checkAgainst: function(a) {
        var b = Math.abs(this.sprite.x + this.x - a.x - a.sprite.x),
            d = Math.abs(this.sprite.y + this.y - a.y - a.sprite.y);
        return b * b + d * d < (this.r + a.r) * (this.r + a.r)
    },
    drawDebug: function() {}
};
MLE.CircleCollision.prototype.checkAgainstWithPosCorrection = function(a, b, d) {
    var c = this.checkAgainstWithShift(a, b, d);
    if (c === null) return null;
    getDistance(b, d, c.ox1, c.oy1) < getDistance(b, d, c.ox2, c.oy2) || c.ox2 === null ? (a.sprite.x = c.ox1 - (this.x + this.sprite.x > c.ox1 ? 1 : -1), a.sprite.y = c.oy1 - (this.y + this.sprite.y > c.oy1 ? 1 : -1)) : (a.sprite.x = c.ox2 - (this.x + this.sprite.x > c.ox2 ? 1 : -1), a.sprite.y = c.oy2 - (this.y + this.sprite.y > c.oy2 ? 1 : -1));
    return true
};
MLE.CircleCollision.prototype.checkAgainstWithShift = function(a, b, d) {
    a.x + a.sprite.x - b === 0 && (b -= 0.0010);
    var c = (a.y + a.sprite.y - d) / (a.x + a.sprite.x - b),
        e = c * (this.x + this.sprite.x) + (d - b * c) - this.y - this.sprite.y,
        f = this.r + a.r,
        g = c * c + 1,
        h = 2 * c * e,
        i = h * h - 4 * g * (e * e - f * f),
        f = (-h - Math.sqrt(i)) / (2 * g),
        g = (-h + Math.sqrt(i)) / (2 * g),
        h = c * f + e,
        c = c * g + e;
    f += this.x + this.sprite.x;
    g += this.x + this.sprite.x;
    h += this.y + this.sprite.y;
    c += this.y + this.sprite.y;
    if (!f.isBetween(b, a.x + a.sprite.x) || !h.isBetween(d, a.y + a.sprite.y)) h = f = null;
    if (!g.isBetween(b,
            a.x + a.sprite.x) || !c.isBetween(d, a.y + a.sprite.y)) c = g = null;
    return (f === null || isNaN(f)) && (g === null || isNaN(g)) && (h === null || isNaN(h)) && (c === null || isNaN(c)) ? null : {
        ox1: f,
        oy1: h,
        ox2: g,
        oy2: c
    }
};
MLE = MLE || {};
MLE.TouchEventTarget = function(a) {
    this.sprite = a;
    this.isInside = false;
    this.collisionBox = {
        x: 0,
        y: 0,
        w: a.rect.w,
        h: a.rect.h
    }
};
MLE.TouchEventTarget.prototype.init = function() {};
MLE.TouchEventTarget.prototype.update = function() {
    var a = MLE.mouse.pressed,
        b = MLE.mouse.released,
        d = MLE.mouse.isDown,
        c = MLE.mouse.x,
        e = MLE.mouse.y,
        f = this.getCumulX(),
        g = this.getCumulY(),
        h = this.collisionBox.w,
        i = this.collisionBox.h,
        c = c > f && c < f + h && e > g && e < g + i ? true : false;
    if (d && c && !this.isInside) this.isInside = true, this.onIn();
    if (a && c) this.onDown();
    if (d && !c && this.isInside) this.isInside = false, this.onOut();
    if (b && c) this.onUp()
};
MLE.TouchEventTarget.prototype.drawDebug = function() {
    MLE.context.fillStyle = "#ffff00";
    MLE.context.globalAlpha = 0.5;
    MLE.context.fillRect(this.sprite.x - this.sprite.pivotX + this.collisionBox.x - MLE.cameraX, this.sprite.y - this.sprite.pivotY + this.collisionBox.y - MLE.cameraY, this.collisionBox.w, this.collisionBox.h);
    MLE.context.globalAlpha = 1
};
MLE.TouchEventTarget.prototype.setArea = function(a, b, d, c) {
    this.collisionBox.x = a;
    this.collisionBox.y = b;
    this.collisionBox.w = d;
    this.collisionBox.h = c
};
MLE.TouchEventTarget.prototype.onDown = function() {
    console.log("onDown")
};
MLE.TouchEventTarget.prototype.onUp = function() {
    console.log("onUp")
};
MLE.TouchEventTarget.prototype.onOut = function() {
    console.log("onOut")
};
MLE.TouchEventTarget.prototype.onIn = function() {};
MLE.TouchEventTarget.prototype.getCumulX = function() {
    for (var a = this.sprite.x - this.sprite.pivotX + this.collisionBox.x - MLE.cameraX, b = this.sprite; b.grouped;) b = b.grouped, a += b.x - b.pivotX;
    return a
};
MLE.TouchEventTarget.prototype.getCumulY = function() {
    for (var a = this.sprite.y - this.sprite.pivotY + this.collisionBox.y - MLE.cameraY, b = this.sprite; b.grouped;) b = b.grouped, a += b.y - b.pivotY;
    return a
};
MLE = MLE || {};
MLE.Pin = function(a, b, d, c) {
    this.spriteA = a;
    this.spriteB = b;
    this.offsetX = d;
    this.offsetY = c
};
MLE.Pin.prototype.update = function() {
    this.spriteA.x = this.spriteB.x + this.offsetX;
    this.spriteA.y = this.spriteB.y + this.offsetY
};
MLE.BoxCollision = function(a, b, d, c, e) {
    this.sprite = a;
    this.x = b;
    this.y = d;
    this.w = c;
    this.h = e
};
MLE.BoxCollision.prototype = {
    checkAgainst: function(a) {
        return !(this.x + this.sprite.x >= a.x + a.sprite.x + a.w || this.x + this.sprite.x + this.w <= a.x + a.sprite.x || this.y + this.sprite.y >= a.y + a.sprite.y + a.h || this.y + this.sprite.y + this.h <= a.y + a.sprite.y)
    },
    drawDebug: function() {
        MLE.context.fillStyle = "rgba(0,255,255,0.6)";
        MLE.context.fillRect(this.x + this.sprite.x - MLE.cameraX, this.y + this.sprite.y - MLE.cameraY, this.w, this.h)
    }
};

MLE.LineCollision = function(a, b, d, c) {
    this.x1 = a;
    this.y1 = b;
    this.x2 = d;
    this.y2 = c;
    this.strokeStyle = "rgba(0,255,255,1)"
};
MLE.LineCollision.prototype.drawDebug = function() {
    MLE.context.save();
    MLE.context.beginPath();
    MLE.context.strokeStyle = this.strokeStyle;
    MLE.context.beginPath();
    MLE.context.moveTo(this.x1, this.y1);
    MLE.context.lineTo(this.x2, this.y2);
    MLE.context.stroke();
    MLE.context.restore()
};
MLE.LineCollision.prototype.checkAgainstWithPosCorrection = function(a, b, d) {
    var c = this.checkAgainstWithShift(a, b, d);
    if (c === null) return null;
    getDistance(b, d, c.ox1, c.oy1) < getDistance(b, d, c.ox2, c.oy2) || c.ox2 === null ? (a.sprite.x = c.ox1 - (this.x + this.sprite.x > c.ox1 ? 1 : -1), a.sprite.y = c.oy1 - (this.y + this.sprite.y > c.oy1 ? 1 : -1)) : (a.sprite.x = c.ox2 - (this.x + this.sprite.x > c.ox2 ? 1 : -1), a.sprite.y = c.oy2 - (this.y + this.sprite.y > c.oy2 ? 1 : -1));
    return true
};
MLE.LineCollision.prototype.checkAgainstWithShift = function(a, b, d) {
    a.x - b === 0 && (b -= 0.0010);
    var c = (a.y - d) / (a.x - b),
        e = d - b * c;
    this.x1 - this.x2 === 0 && (this.x1 -= 0.0010);
    var f = (this.y2 - this.y1) / (this.x2 - this.x1),
        f = (this.y1 - this.x1 * f - e) / (c - f),
        c = c * f + e,
        e = getDistance(b, d, f, c),
        g = getDistance(a.x, a.y, f, c),
        a = getDistance(a.x, a.y, b, d);
    return a > e && a > g ? (console.log("PRZECI\u0104\u0141"), {
        ox: f,
        oy: c
    }) : false
};

MLE = MLE || {};
MLE.ImageAnim = function(a) {
    this.sprite = a;
    this.frameW = this.sprite.rect.w;
    this.frameH = this.sprite.rect.h;
    this.anims = {};
    this.currentAnim = null;
    this.stopped = false;
    this.cumulTime = 0
};
MLE.ImageAnim.prototype.addAnim = function(a, b, d) {
    this.anims[a] = {
        fps: d,
        frames: b,
        currentFrame: 0
    };
    this.currentFrame = this.anims[a]
};
MLE.ImageAnim.prototype.gotoAndPlay = function(a, b) {
    if (b) this.currentAnim = this.anims[b];
    var d;
    this.stopped = false;
    this.currentAnim.currentFrame = a || 0;
    this.cumulTime = 0;
    this.updateSpriteRect()
};
MLE.ImageAnim.prototype.gotoAndStop = function(a, b) {
    if (b) this.currentAnim = this.anims[b];
    var d;
    this.stopped = true;
    this.currentAnim.currentFrame = a || 0;
    this.cumulTime = 0;
    this.updateSpriteRect()
};
MLE.ImageAnim.prototype.update = function() {
    if (!(this.stopped || this.currentAnim === null))
        if (this.cumulTime += MLE.tick, this.cumulTime > 1E3 / this.currentAnim.fps) {
            this.cumulTime -= 1E3 / this.currentAnim.fps;
            if (this.currentAnim.currentFrame === this.currentAnim.frames.length - 1 && (this.onLoop(this.currentAnim), this.stopOnLoop)) {
                this.stopped = true;
                this.updateSpriteRect();
                return
            }
            this.currentAnim.currentFrame = (this.currentAnim.currentFrame + 1) % this.currentAnim.frames.length;
            this.onFrameChange(this.currentAnim, this.currentAnim.currentFrame);
            this.updateSpriteRect()
        }
};
MLE.ImageAnim.prototype.updateSpriteRect = function() {
    this.sprite.changeBitmap(this.currentAnim.frames[this.currentAnim.currentFrame])
};
MLE.ImageAnim.prototype.onFrameChange = function() {};
MLE.ImageAnim.prototype.onLoop = function() {};
MLE.ImageAnim.prototype.isPlaying = function(a) {
    return this.currentAnim === this.anims[a] && this.anims[a] ? true : false
};

MouseInput = function() {
    this.screenY = this.screenX = this.y = this.x = 0;
    this.isDown = false;
    this.event = null;
    this.pressed = this.released = this._pressed = this._released = this.useTouch = false
};
MouseInput.prototype = {
    init: function(a) {
        this.domElement = a;
        if ("ontouchstart" in document.documentElement) this.useTouch = true;
        this.startListening()
    },
    startListening: function() {
        this.useTouch === true ? (MLE.wrapper.addEventListener("touchstart", this.touchStart.bind(this), false), MLE.wrapper.addEventListener("touchmove", this.touchMove.bind(this), false), MLE.wrapper.addEventListener("touchend", this.touchEnd.bind(this), false)) : (MLE.wrapper.addEventListener("mousedown", this.onMouseDown.bind(this), false), MLE.wrapper.addEventListener("mousemove",
            this.onMouseMove.bind(this), false), MLE.wrapper.addEventListener("mouseup", this.onMouseUp.bind(this), false))
    },
    stopListening: function() {
        this.useTouch === true ? (MLE.wrapper.removeEventListener("touchmove", this.touchMove.bind(this)), MLE.wrapper.removeEventListener("touchend", this.touchEnd.bind(this))) : (MLE.wrapper.removeEventListener("mousemove", this.onMouseMove.bind(this)), MLE.wrapper.removeEventListener("mouseup", this.onMouseUp.bind(this)));
        window.addEventListener("focus", this.reset.bind(this), false);
        window.addEventListener("blur", this.reset.bind(this), false)
    },
    destroy: function() {
        this.stopListening()
    },
    update: function() {
        this.released = this._released;
        this.pressed = this._pressed;
        this._pressed = this._released = false;
        var a = wrapper.style.width.slice(0, wrapper.style.width.length - 2) / MLE.width,
            b = wrapper.style.height.slice(0, wrapper.style.height.length - 2) / MLE.height;
        a === 0 && (a = b = 1);
        MLE.mouseScale = a;
				
				if (isEmbed) {
					this.x = Math.floor((this.screenX - wrapper.offsetLeft) / a);                                    
					this.y = Math.floor((this.screenY - document.getElementById('wrapper').parentNode.getBoundingClientRect().top) / b)
				} else {
					this.x = Math.floor((this.screenX - wrapper.offsetLeft) / a);
					this.y = Math.floor((this.screenY - wrapper.offsetTop) / b);
				}
    },
    onMouseMove: function(a) {
        a.preventDefault();
        this.screenX = a.pageX;
        this.screenY = a.pageY
    },
    onMouseDown: function(a) {
        a.preventDefault();
        this._pressed = this.isDown = true;
        this.event = a;
        this.screenX = a.pageX;
        this.screenY = a.pageY;
        this.update();
        MLE.downCallbacks();
        this._pressed = this.isDown = true;
        this.event = a;
        this.screenX = a.pageX;
        this.screenY = a.pageY
    },
    onMouseUp: function(a) {
        if (this.isDown === true) this._released = true, this.isDown = false, this.event = a, this.update(), MLE.upCallbacks(), this._released = true, this.isDown = false, this.event = a
    },
    touchStart: function(a) {
        a.preventDefault();
        this._pressed = this.isDown = true;
        this.screenX = a.targetTouches[0].pageX;
        this.screenY = a.targetTouches[0].pageY;
        this.update();
        MLE.downCallbacks();
        this._pressed = this.isDown = true;
        this.screenX = a.targetTouches[0].pageX;
        this.screenY = a.targetTouches[0].pageY
    },
    touchMove: function(a) {
        a.preventDefault();
        this.screenX = a.targetTouches[0].pageX;
        this.screenY = a.targetTouches[0].pageY
    },
    touchEnd: function() {
        this.isDown = false;
        this._released = true;
        this.update();
        MLE.upCallbacks();
        this.isDown = false;
        this._released = true
    },
    clickEnd: function() {
        gotoSpilSite()
    },
    reset: function() {
        console.log("RESET!!!");
        this.screenY = this.screenX = this.y = this.x = 0;
        this.isDown = false;
        this.event = null;
        this.pressed = this.released = this._pressed = this._released = this.useTouch = false
    }
};
KeyboardInput = function() {
    this.key = 0;
    this._released = this._pressed = this.released = this.pressed = this.hasKeyboard = this.isDown = false
};
KeyboardInput.prototype = {
    init: function() {
        if ("onkeyup" in document.documentElement) this.hasKeyboard = true, this.startListening()
    },
    startListening: function() {
        document.body.addEventListener("keyup", this.keyUp.bind(this), false);
        document.body.addEventListener("keydown", this.keyDown.bind(this), false)
    },
    keyDown: function(a) {
        if (!(this.key == -1 && a.keyCode == 37) && !(this.key == 1 && a.keyCode == 39))
            if (a.keyCode == 37) this.key = -1, this.isDown = this._pressed = true;
            else if (a.keyCode == 39) this.key = 1, this.isDown = this._pressed = true
    },
    keyUp: function(a) {
        this.key == -1 && a.keyCode == 37 ? (this.key = 0, this._released = true, this.isDown = false) : this.key == 1 && a.keyCode == 39 ? (this.key = 0, this._released = true, this.isDown = false) : a.keyCode > 48 && a.keyCode < 56 ? (console.log("Produkuje powerupa", a.keyCode - 48), gameScene && gameScene.spawnPowerUp(Math.random() * (MLE.width - getConst(200)) + getConst(100), Math.random() * getConst(500) + getConst(75), -1, a.keyCode - 48, true)) : a.keyCode === 48 && (console.log("Produkuje rep", a.keyCode - 48), gameScene && gameScene.spawnRepairPart(Math.random() *
            (MLE.width - getConst(200)) + getConst(100), Math.random() * getConst(500) + getConst(75), -1, true))
    },
    update: function() {
        this.released = this._released;
        this.pressed = this._pressed;
        this._pressed = this._released = false
    }
};
MLE = MLE || {};
MLE.FaceFont = function() {};
MLE.FaceFont.prototype.loadFont = function(a) {
    var b = document.createElement("canvas");
    b.width = 64;
    b.height = 64;
    var d = b.getContext("2d"),
        c = setInterval(function() {
            d.clearRect(0, 0, 64, 64);
            d.font = "32px " + a;
            d.fillStyle = "#ffffff";
            d.fillText(".", 32, 32);
            MLE.context.drawImage(b, 100, 100);
            var e = MLE.Util.isCanvasEmpty(b);
            d.font !== "10px sans-serif" && !e && (this.onLoad(a), clearInterval(c))
        }.bind(this), 100)
};
MLE.FaceFont.prototype.onLoad = function() {};
var JSON;
JSON || (JSON = {});
(function() {
    function a(a) {
        return a < 10 ? "0" + a : a
    }

    function b(a) {
        e.lastIndex = 0;
        return e.test(a) ? '"' + a.replace(e, function(a) {
            var b = h[a];
            return typeof b === "string" ? b : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
        }) + '"' : '"' + a + '"'
    }

    function d(a, c) {
        var e, h, m, o, p = f,
            k, j = c[a];
        j && typeof j === "object" && typeof j.toJSON === "function" && (j = j.toJSON(a));
        typeof i === "function" && (j = i.call(c, a, j));
        switch (typeof j) {
            case "string":
                return b(j);
            case "number":
                return isFinite(j) ? String(j) : "null";
            case "boolean":
            case "null":
                return String(j);
            case "object":
                if (!j) return "null";
                f += g;
                k = [];
                if (Object.prototype.toString.apply(j) === "[object Array]") {
                    o = j.length;
                    for (e = 0; e < o; e += 1) k[e] = d(e, j) || "null";
                    m = k.length === 0 ? "[]" : f ? "[\n" + f + k.join(",\n" + f) + "\n" + p + "]" : "[" + k.join(",") + "]";
                    f = p;
                    return m
                }
                if (i && typeof i === "object") {
                    o = i.length;
                    for (e = 0; e < o; e += 1) typeof i[e] === "string" && (h = i[e], (m = d(h, j)) && k.push(b(h) + (f ? ": " : ":") + m))
                } else
                    for (h in j) Object.prototype.hasOwnProperty.call(j, h) && (m = d(h, j)) && k.push(b(h) + (f ? ": " : ":") + m);
                m = k.length === 0 ? "{}" : f ? "{\n" + f + k.join(",\n" + f) + "\n" + p + "}" : "{" + k.join(",") +
                    "}";
                f = p;
                return m
        }
    }
    if (typeof Date.prototype.toJSON !== "function") Date.prototype.toJSON = function() {
        return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + a(this.getUTCMonth() + 1) + "-" + a(this.getUTCDate()) + "T" + a(this.getUTCHours()) + ":" + a(this.getUTCMinutes()) + ":" + a(this.getUTCSeconds()) + "Z" : null
    }, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function() {
        return this.valueOf()
    };
    var c = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        e = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        f, g, h = {
            "\u0008": "\\b",
            "\t": "\\t",
            "\n": "\\n",
            "\u000c": "\\f",
            "\r": "\\r",
            '"': '\\"',
            "\\": "\\\\"
        },
        i;
    if (typeof JSON.stringify !== "function") JSON.stringify = function(a, b, c) {
        var e;
        g = f = "";
        if (typeof c === "number")
            for (e = 0; e < c; e += 1) g += " ";
        else typeof c === "string" && (g = c);
        if ((i = b) && typeof b !== "function" && (typeof b !== "object" || typeof b.length !== "number")) throw Error("JSON.stringify");
        return d("", {
            "": a
        })
    };
    if (typeof JSON.parse !== "function") JSON.parse = function(a, b) {
        function d(a, c) {
            var e, f, g = a[c];
            if (g && typeof g === "object")
                for (e in g) Object.prototype.hasOwnProperty.call(g, e) && (f = d(g, e), f !== void 0 ? g[e] = f : delete g[e]);
            return b.call(a, c, g)
        }
        var e, a = String(a);
        c.lastIndex = 0;
        c.test(a) && (a = a.replace(c, function(a) {
            return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
        }));
        if (/^[\],:{}\s]*$/.test(a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
                "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return e = eval("(" + a + ")"), typeof b === "function" ? d({
            "": e
        }, "") : e;
        throw new SyntaxError("JSON.parse");
    }
})();

function PxLoader(a) {
    a = a || {};
    if (a.statusInterval == null) a.statusInterval = 5E3;
    if (a.loggingDelay == null) a.loggingDelay = 2E4;
    if (a.noProgressTimeout == null) a.noProgressTimeout = Infinity;
    var b = [],
        d = [],
        c, e = +new Date;
    this.add = function(a) {
        a.tags = new PxLoaderTags(a.tags);
        if (a.priority == null) a.priority = Infinity;
        b.push({
            resource: a,
            status: 0
        })
    };
    this.addProgressListener = function(a, b) {
        d.push({
            callback: a,
            tags: new PxLoaderTags(b)
        })
    };
    this.addCompletionListener = function(a, b) {
        d.push({
            tags: new PxLoaderTags(b),
            callback: function(b) {
                b.completedCount ===
                    b.totalCount && a(b)
            }
        })
    };
    var f = function(a) {
        var a = a == null ? [] : Array.isArray(a) ? a : [a],
            b = function(b) {
                for (var b = b.resource, c = Infinity, d = 0; d < b.tags.length; d++)
                    for (var e = 0; e < Math.min(a.length, c); e++) {
                        if (b.tags[d] == a[e] && e < c && (c = e, c === 0)) break;
                        if (c === 0) break
                    }
                return c
            };
        return function(a, c) {
            var d = b(a),
                e = b(c);
            return d < e ? -1 : d > e ? 1 : a.priority < c.priority ? -1 : a.priority > c.priority ? 1 : 0
        }
    };
    this.start = function(a) {
        c = +new Date;
        a = f(a);
        b.sort(a);
        for (var a = 0, d = b.length; a < d; a++) {
            var e = b[a];
            e.status = 1;
            e.resource.start(this)
        }
        setTimeout(g,
            100)
    };
    var g = function() {
        for (var c = false, d = +new Date - e, f = d >= a.noProgressTimeout, d = d >= a.loggingDelay, h = 0, m = b.length; h < m; h++) {
            var o = b[h];
            if (o.status === 1 && (o.resource.checkStatus && o.resource.checkStatus(), o.status === 1))
                if (f) o.resource.onTimeout();
                else c = true
        }
        d && c && i();
        c && setTimeout(g, a.statusInterval)
    };
    this.isBusy = function() {
        for (var a = 0, c = b.length; a < c; a++)
            if (b[a].status === 0 || b[a].status === 1) return true;
        return false
    };
    var h = function(a, c) {
        for (var f = null, g = 0, h = b.length; g < h; g++)
            if (b[g].resource === a) {
                f = b[g];
                break
            }
        if (!(f == null || f.status !== 1)) {
            f.status = c;
            e = +new Date;
            g = 0;
            for (h = d.length; g < h; g++) {
                var i = d[g];
                if (i.tags.length === 0 || a.tags.contains(i.tags)) {
                    for (var p = f, k = 0, j = 0, s = 0, u = b.length; s < u; s++) {
                        var r = b[s],
                            w = false;
                        if (w = i.tags.length === 0 ? true : r.resource.tags.contains(i.tags)) j++, (r.status === 2 || r.status === 3 || r.status === 4) && k++
                    }
                    i.callback({
                        resource: p.resource,
                        loaded: p.status === 2,
                        error: p.status === 3,
                        timeout: p.status === 4,
                        completedCount: k,
                        totalCount: j
                    })
                }
            }
        }
    };
    this.onLoad = function(a) {
        h(a, 2)
    };
    this.onError = function(a) {
        h(a,
            3)
    };
    this.onTimeout = function(a) {
        h(a, 4)
    };
    var i = this.log = function(a) {
        if (window.console) {
            var d = Math.round((+new Date - c) / 1E3);
            window.console.log("PxLoader elapsed: " + d + " sec");
            for (var d = 0, e = b.length; d < e; d++) {
                var f = b[d];
                if (a || f.status === 1) {
                    var g = "PxLoader: #" + d + " " + f.resource.getName();
                    switch (f.status) {
                        case 0:
                            g += " (Not Started)";
                            break;
                        case 1:
                            g += " (Waiting)";
                            break;
                        case 2:
                            g += " (Loaded)";
                            break;
                        case 3:
                            g += " (Error)";
                            break;
                        case 4:
                            g += " (Timeout)"
                    }
                    f.resource.tags.length > 0 && (g += " Tags: [" + f.resource.tags.array.join(",") +
                        "]");
                    window.console.log(g)
                }
            }
        }
    }
}

function PxLoaderTags(a) {
    this.array = [];
    this.object = {};
    this.value = null;
    this.length = 0;
    if (a !== null && a !== void 0) {
        if (Array.isArray(a)) this.array = a;
        else if (typeof a === "object")
            for (var b in a) this.array.push(b);
        else this.array.push(a), this.value = a;
        this.length = this.array.length;
        for (a = 0; a < this.length; a++) this.object[this.array[a]] = true
    }
    this.contains = function(a) {
        if (this.length === 0 || a.length === 0) return false;
        else if (this.length === 1 && this.value !== null) return a.length === 1 ? this.value === a.value : a.object.hasOwnProperty(this.value);
        else if (a.length < this.length) return a.contains(this);
        else {
            for (var b in this.object)
                if (a.object[b]) return true;
            return false
        }
    }
}
if (!Array.isArray) Array.isArray = function(a) {
    return Object.prototype.toString.call(a) == "[object Array]"
};

function PxLoaderImage(a, b, d) {
    var c = this,
        e = null;
    this.img = new Image;
    this.tags = b;
    this.priority = d;
    var f = function() {
            c.img.readyState == "complete" && (i(), e.onLoad(c))
        },
        g = function() {
            i();
            e.onLoad(c)
        },
        h = function() {
            i();
            e.onError(c)
        },
        i = function() {
            c.unbind("load", g);
            c.unbind("readystatechange", f);
            c.unbind("error", h)
        };
    this.start = function(b) {
        e = b;
        c.bind("load", g);
        c.bind("readystatechange", f);
        c.bind("error", h);
        c.img.src = a
    };
    this.checkStatus = function() {
        c.img.complete && (i(), e.onLoad(c))
    };
    this.onTimeout = function() {
        i();
        if (c.img.complete) e.onLoad(c);
        else e.onTimeout(c)
    };
    this.getName = function() {
        return a
    };
    this.bind = function(a, b) {
        c.img.addEventListener ? c.img.addEventListener(a, b, false) : c.img.attachEvent && c.img.attachEvent("on" + a, b)
    };
    this.unbind = function(a, b) {
        c.img.removeEventListener ? c.img.removeEventListener(a, b, false) : c.img.detachEvent && c.img.detachEvent("on" + a, b)
    }
}
PxLoader.prototype.addImage = function(a, b, d) {
    a = new PxLoaderImage(a, b, d);
    this.add(a);
    return a.img
};
var Director = function() {
    window.director = this;
    this.init()
};
Director.prototype.init = function() {
    window.game = this;
    this.menu = this.currentScene = new MainMenu;
    this.nextScene = null;
    this.rectAlpha = 1;
    this.rectColor = "#000000";
    createjs.Tween.get(this).to({
        rectAlpha: 0
    }, 500, createjs.Ease.sineInOut)
};
Director.prototype.update = function() {
    this.currentScene && this.currentScene.update()
};
Director.prototype.draw = function() {
    this.currentScene && this.currentScene.draw();
    if (this.nextScene) this.currentScene = this.nextScene, this.nextScene = null, MLE.cameraX = MLE.cameraY = 0;
    if (this.rectAlpha > 0) MLE.context.fillStyle = this.rectColor, MLE.context.globalAlpha = this.rectAlpha, MLE.context.fillRect(0, 0, MLE.width, MLE.height), MLE.context.globalAlpha = 1
};
var PreLoaderScene = function() {
    this.init()
};
var evnt1 = window.addEventListener('touchstart', myFunc);
var evnt2 = window.addEventListener('click', myFunc);

PreLoaderScene.prototype.init = function() {
    window.preloaderScene = this;
    this.logo = new MLE.Sprite("logoWithoutRim", 0, getConst(-50));
    this.logo.centerPivot();
    this.loadingBar1 = new MLE.Sprite("loadingBar1", 0, getConst(150));
    this.loadingBar1.centerPivot();
    this.loadingBar0 = new MLE.Sprite("loadingBar0", 0, getConst(150));
    this.loadingBar0.centerPivot();
    this.group = new MLE.Group;
    /*
    this.rimX = getConst(204);
    this.rimY = getConst(-164);
    this.rimR = getConst(17);
    this.rim = new MLE.Sprite("rim", this.rimX, this.rimY);
    this.rim.centerPivot();
    */
    /*
    this.eyeAnim = new MLE.Sprite("eyeAnim", this.rimX, this.rimY);
    this.eyeAnim.centerPivot();
    this.eyeAnimFA = new MLE.FrameAnim(this.eyeAnim, 4, 1);
    this.eyeAnimFA.addAnim("blink", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 3, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 2, 1, 0, 0, 0, 0, 0, 1, 2, 3, 3, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 20);
    this.eyeAnimFA.gotoAndPlay(0, "blink");
    */
    /*
    this.loadingText = new MLE.Sprite("loadingTextAnim", 0, getConst(230));
    this.loadingText.centerPivot();
    this.loadingTextFA = new MLE.FrameAnim(this.loadingText, 1, 4);
    this.loadingTextFA.addAnim("loading", [0, 1, 2, 3], 4);
    this.loadingTextFA.gotoAndPlay(0, "loading");
    */
    if( showMULinks ) this.group.addChild(this.logo);
    this.group.addChild(this.loadingBar1);
    this.group.addChild(this.loadingBar0);
    //this.group.addChild(this.loadingText);
    //this.group.addChild(this.rim);
    //this.group.addChild(this.eyeAnim);
    this.group.x = MLE.width / 2;
    this.group.y = MLE.height / 2;
    this.fullBarsWidth = this.loadingBar0.rect.w;
    //this.createRimTween();
    this.group.scaleX = this.group.scaleY = 0.85;
    this.loaded = false;
    inPreloader = false;
};
PreLoaderScene.prototype.update = function() {
    //this.loadingTextFA.update();
    //this.eyeAnimFA.update();
    this.percent = MLE.loader.loadedResources / MLE.loader.allResources * 100;
    this.loadingBar0.rect.w = this.percent * this.fullBarsWidth / 100;
    if (this.loadingBar0.rect.w === 0) this.loadingBar0.rect.w = 1;
    if (this.percent === 100 && this.loaded === false) this.loaded = true, createjs.Tween.get(this).wait(20).call(function() {
        MLE.start()
    })
};
PreLoaderScene.prototype.draw = function() {
    MLE.context.fillStyle = "#45357D";
    MLE.context.fillRect(0, 0, MLE.width, MLE.height);
    this.group.draw()
};
PreLoaderScene.prototype.createRimTween = function() {/*
    var a = Math.random() * 6.28,
        b = Math.random() * this.rimR * 0.6 + 0.4 * this.rimR,
        d = Math.sin(a) * b,
        a = Math.cos(a) * b,
        b = 1 - Math.abs(d / this.rimR * 0.08),
        c = 1 - Math.abs(a / this.rimR * 0.08),
        e = Math.random() * 1500 + 1500,
        f = Math.random() * 1E3 + 500;
    createjs.Tween.get(this.rim).wait(f).to({
        x: this.rimX - d,
        y: this.rimY - a,
        scaleX: b,
        scaleY: c
    }, 250, createjs.Ease.sineOut).wait(f).to({
        x: this.rimX,
        y: this.rimY,
        scaleX: 1,
        scaleY: 1
    }, 250, createjs.Ease.sineOut).wait(e).call(this.createRimTween, null, this)
*/
};


var MenuButton = function(a, b, d) {
    this.init(a, b, d)
};
MenuButton.prototype.init = function(a, b, d) {
    this.group = new MLE.Group;
    a = a || "pause";
    this.buttonDown = this.buttonUp = null;
    this.touchEventTarget = new MLE.TouchEventTarget(this.group);
    this.touchEventTarget.onDown = this.onDown.bind(this);
    this.touchEventTarget.onUp = this.onUp.bind(this);
    this.touchEventTarget.onOut = this.onOut.bind(this);
    this.buttonUp = new MLE.Sprite(a + "_normal", 0, 0);
    this.buttonDown = new MLE.Sprite(a + "_select", 0, 0);
    var a = this.buttonUp.rect.w,
        c = this.buttonUp.rect.h;
    this.touchEventTarget.setArea(-a /
        2, -c / 2, a, c);
    this.buttonUp.centerPivot();
    this.buttonDown.centerPivot();
    this.buttonDown.alpha = 0;
    this.group.addChild(this.buttonUp);
    this.group.addChild(this.buttonDown);
    if (b) this.text = new MLE.TextSprite, this.text.text = b, this.text.x = 0, this.text.y = 0, this.text.align = "center", this.text.baseline = "middle", this.text.adjustFontSize(280), this.group.addChild(this.text);
    if (d) this.comment = new MLE.TextSprite, this.comment.text = d, this.comment.x = 0, this.comment.y = 20, this.comment.size = 18, this.comment.align = "center", this.comment.baseline =
        "middle", this.comment.adjustFontSize(320), this.group.addChild(this.comment), this.text.y = -10;
    this.block = this.canBePressed = false
};
MenuButton.prototype.update = function() {
    this.block || this.touchEventTarget.update()
};
MenuButton.prototype.draw = function() {
    this.group.draw()
};
MenuButton.prototype.onUp = function() {
    if (this.canBePressed) this.clickCallback(), this.canBePressed = false, this.buttonUp.alpha = 1, this.buttonDown.alpha = 0
};
MenuButton.prototype.onDown = function() {
    this.canBePressed = true;
    this.buttonUp.alpha = 0;
    this.buttonDown.alpha = 1
};
MenuButton.prototype.onOut = function() {
    this.canBePressed = false;
    this.buttonUp.alpha = 1;
    this.buttonDown.alpha = 0
};
MenuButton.prototype.clickCallback = function() {
    console.log("ButtonClickCallback")
};
MenuButton.prototype.isDown = function() {
    return this.buttonUp.alpha === 1 ? false : true
};
var MainMenu = function() {
    window.mainMenu = this;
    this.init()
    evnt = false;
};



MainMenu.prototype.init = function() {
    this.bg = new MLE.Sprite("splash", 0, 0);
    this.playButton = new MenuButton("button", currLang.startGame);
    this.playButton.group.x = MLE.width / 2;
    this.playButton.group.y = MLE.height / 2 + 170;
    this.playButton.clickCallback = this.startGameClicked.bind(this);
    this.moreGames = new MenuButton("button", currLang.moreGames);
    this.moreGames.group.x = MLE.width / 2;
    this.moreGames.group.y = MLE.height / 2 + 290;
    this.moreGames.clickCallback = this.moreGamesClicked.bind(this);
    var a = 0,
        b = a = 0,
        d = 0;
    localStorage["FurEye.BasketBallHoops.Level1"] &&
        (a = Number(localStorage["FurEye.BasketBallHoops.Level1"]));
    localStorage["FurEye.BasketBallHoops.Level2"] && (b = Number(localStorage["FurEye.BasketBallHoops.Level2"]));
    localStorage["FurEye.BasketBallHoops.Level3"] && (d = Number(localStorage["FurEye.BasketBallHoops.Level3"]));
    a = Math.max(a, Math.max(b, d));
    this.best = new MLE.TextSprite;
    this.best.text = currLang.best + ": " + a;
    this.best.x = MLE.width / 2;
    this.best.y = MLE.height / 2 - 15;
    this.best.align = "center";
    this.best.baseline = "middle";
    this.best.adjustFontSize(250);
    this.lvl =
        new MLE.TextSprite;
    this.lvl.text = currLang.selectLevel + ":";
    this.lvl.x = MLE.width / 2;
    this.lvl.y = MLE.height / 2 - 15;
    this.lvl.align = "center";
    this.lvl.baseline = "middle";
    this.lvl.adjustFontSize(250);
    this.lvl.alpha = 0;
    b = MLE.height / 2 + 70;
    this.easyButton = new MenuButton("button", currLang.easy);
    this.easyButton.group.x = MLE.width + 200;
    this.easyButton.group.y = b + 0;
    this.easyButton.group.alpha = 0;
    this.easyButton.clickCallback = this.easyButtonClicked.bind(this);
    a < params.pointsForMedium ? (this.mediumButton = new MenuButton("button",
        currLang.medium, "(" + currLang.youNeed + " " + params.pointsForMedium + " " + currLang.youNeed2 + ")"), this.mediumButton.block = true) : this.mediumButton = new MenuButton("button", currLang.medium);
    this.mediumButton.group.alpha = 0;
    this.mediumButton.group.x = MLE.width + 200;
    this.mediumButton.group.y = b + 120;
    this.mediumButton.clickCallback = this.mediumButtonClicked.bind(this);
    a < params.pointsForHard ? (this.hardButton = new MenuButton("button", currLang.hard, "(" + currLang.youNeed + " " + params.pointsForHard + " " + currLang.youNeed2 + ")"),
        this.hardButton.block = true) : this.hardButton = new MenuButton("button", currLang.hard);
    this.hardButton.group.x = MLE.width + 200;
    this.hardButton.group.y = b + 240;
    this.hardButton.group.alpha = 0;
    this.hardButton.clickCallback = this.hardButtonClicked.bind(this);
    this.active = false;
    createjs.Tween.get(this).wait(750).call(function() {
        this.active = true
    }.bind(this))
};
MainMenu.prototype.update = function() {
    this.active && (this.playButton.update(), this.moreGames.update(), this.easyButton.update(), this.mediumButton.update(), this.hardButton.update())
};
MainMenu.prototype.draw = function() {
    MLE.context.imageSmoothingEnabled = true;
    this.bg.draw();
    this.playButton.draw();
    if( showMULinks ) this.moreGames.draw();
    this.best.draw();
    this.lvl.draw();
    this.easyButton.draw();
    this.mediumButton.draw();
    this.hardButton.draw()
};
MainMenu.prototype.startGameClicked = function() {
    this.active = false;
    createjs.Tween.get(this.best).to({
        alpha: 0
    }, 250);
    createjs.Tween.get(this.lvl).wait(250).to({
        alpha: 1
    }, 250);
    createjs.Tween.get(this.playButton.group).to({
        x: -200,
        alpha: 0
    }, 750, createjs.Ease.backIn);
    createjs.Tween.get(this.moreGames.group).wait(200).to({
        x: -200,
        alpha: 0
    }, 750, createjs.Ease.backIn);
    createjs.Tween.get(this.easyButton.group).wait(500).to({
        x: MLE.width / 2,
        alpha: 1
    }, 400, createjs.Ease.sineOut);
    createjs.Tween.get(this.mediumButton.group).wait(700).to({
        x: MLE.width /
            2,
        alpha: this.mediumButton.block ? 0.6 : 1
    }, 400, createjs.Ease.sineOut);
    createjs.Tween.get(this.hardButton.group).wait(900).to({
        x: MLE.width / 2,
        alpha: this.hardButton.block ? 0.6 : 1
    }, 400, createjs.Ease.sineOut).wait(0).call(function() {
        this.active = true
    }.bind(this))
};
MainMenu.prototype.moreGamesClicked = function() {
    //window.location.href = "http://softgames.de"
    if( showMULinks ) MU.redirectToPortal();
};
MainMenu.prototype.easyButtonClicked = function() {
    MU_Hooks.start();
    this.playButton.block = true;
    createjs.Tween.get(window.director).to({
        rectAlpha: 1
    }, 250, createjs.Ease.sineInOut).call(function() {
        createjs.Tween._tweens = [];
        window.director.nextScene = new GameScene;
        createjs.Tween.get(window.director).to({
            rectAlpha: 0
        }, 500, createjs.Ease.sineInOut).call(function() {
            window.director.currentScene.startGame()
        })
    })
};
MainMenu.prototype.mediumButtonClicked = function() {
    MU_Hooks.start();
    this.playButton.block = true;
    createjs.Tween.get(window.director).to({
        rectAlpha: 1
    }, 250, createjs.Ease.sineInOut).call(function() {
        createjs.Tween._tweens = [];
        window.director.nextScene = new GameScene2;
        createjs.Tween.get(window.director).to({
            rectAlpha: 0
        }, 500, createjs.Ease.sineInOut).call(function() {
            window.director.currentScene.startGame()
        })
    })
};
MainMenu.prototype.hardButtonClicked = function() {
    MU_Hooks.start();
    this.playButton.block = true;
    createjs.Tween.get(window.director).to({
        rectAlpha: 1
    }, 250, createjs.Ease.sineInOut).call(function() {
        createjs.Tween._tweens = [];
        window.director.nextScene = new GameScene3;
        createjs.Tween.get(window.director).to({
            rectAlpha: 0
        }, 500, createjs.Ease.sineInOut).call(function() {
            window.director.currentScene.startGame()
        })
    })
};
var GameScene = function() {
    window.gameScene = this;
    this.states = {
        IDLE: 0,
        AIMING: 1,
        BEFORE_WIND: 2,
        IN_AIR_UP: 3,
        IN_AIR: 4,
        FROM_WALL: 5,
        FROM_GROUND: 6,
        BALL_BACK: 7
    };
    this.currentState = this.states.IDLE;
    this.ground = -1;
    this.maxHeight = getConst(50);
    var a = Math.floor(Math.random() * 59) / 10;
    this.windPower = getConst(1E3) * a / 6;
    this.minScale = 0.35;
    this.init();
    this.gui.bestNumber < 2E3 && (a = Math.floor(Math.random() * 8) / 10 + 0.1);
    this.windCloud.windFont.text = a + "";
    this.windCloud.windNumber = a;
    this.windPower = getConst(1E3) * a / 6
};
GameScene.prototype.init = function() {
    this.bg = new MLE.Sprite("gameBackground", 0, 0);
    this.windCloud = new WindCloud;
    this.windCloud.group.x = 0;
    this.windCloud.group.y = getConst(720);
    this.aimArrow = new AimArrow;
    this.aimArrow.sprite.alpha = 0;
    this.ball = new Ball;
    this.pauseButton = new MenuButton("pause");
    this.pauseButton.group.x = MLE.width / 2;
    this.pauseButton.group.y = 46;
    this.pauseButton.clickCallback = this.pauseClicked.bind(this);
    this.monsterFront = new MLE.Sprite("goal", 0, -30);
    this.monsterFront.setPivotPercent(0.5, 0);
    this.monster = new Monster;
    this.monster.setPositionXY(MLE.width / 2, MLE.height / 2 + getConst(315));
    this.shadow = new MLE.Sprite("shadow", this.ball.startPosX, this.ball.startPosY + 30);
    this.shadow.centerPivot();
    this.shadow.basicScaleX = this.shadow.basicScaleY = 0.6;
    this.shadow.heightScale = 1;
    this.shadowBefX = this.shadow.x;
    this.shadowBefY = this.shadow.y;
    this.gui = new GUI(1);
    this.hideShowFrontMonsters(false);
    this.gui.alpha = 1;
    this.aimArrow.rotationTween.setPosition(1350);
    this.isEasyLevel = false;
    this.easyLevelCounter = this.easyLevel =
        0;
    if (this.gui.bestNumber < 10) this.isEasyLevel = true;
    this.createNewBall();
    this.pauseWindow = new PauseWindow;
    this.paused = false;
    this.success = new SuccessAnim;
    this.lineLeft = new MLE.LineCollision(45, 550, 120, 500);
    this.lineRight = new MLE.LineCollision(MLE.width - 45, 550, MLE.width - 120, 500);
    this.rightBounced = this.leftBounced = false
};
GameScene.prototype.update = function() {
    this.pauseWindow.update();
    if (!this.paused) {
        this.windCloud.update();
        this.monster.update();
        this.gui.update();
        this.ball.update();
        this.success.update();
        this.pauseButton.update();
        var a = !this.pauseButton.isDown() && MLE.mouse.pressed && this.ball.sprite.x === this.ball.startPosX && this.ball.sprite.y === this.ball.startPosY && this.aimArrow.sprite.alpha >= 0.75;
        this.shadow.x = this.ball.sprite.x;
        this.shadow.scaleX = this.shadow.basicScaleX * this.shadow.heightScale;
        this.shadow.scaleY =
            this.shadow.basicScaleY * this.shadow.heightScale;
        if (this.lineLeft.checkAgainstWithShift(this.shadow, this.shadowBefX, this.shadowBefY) !== false && this.leftBounced === false) {
            this.ball.sprite.x = this.shadow.x = this.ball.befX + 4;
            this.ball.simpleMovement.velX = this.ball.simpleMovement.velY * -1.75;
            this.ball.simpleMovement.accelX = 0;
            if (this.ball.simpleMovement.velX < 175) this.ball.simpleMovement.velX = 175;
            else if (this.ball.simpleMovement.velX > 225) this.ball.simpleMovement.velX = 225;
            this.leftBounced = true;
            this.ball.bounced = true;
        }
        if (this.lineRight.checkAgainstWithShift(this.shadow, this.shadowBefX, this.shadowBefY) !== false && this.rightBounced === false) {
            this.ball.sprite.x = this.shadow.x = this.ball.befX - 4;
            this.ball.simpleMovement.velX = this.ball.simpleMovement.velY * 1.75;
            if (this.ball.simpleMovement.velX > -175) this.ball.simpleMovement.velX = -175;
            else if (this.ball.simpleMovement.velX < -225) this.ball.simpleMovement.velX = -225;
            this.ball.simpleMovement.accelX = 0;
            this.rightBounced = true;
            this.ball.bounced = true
        }
        this.shadowBefX = this.shadow.x;
        this.shadowBefY = this.shadow.y;
        this.aimArrow.update();
        if (a && this.currentState === this.states.IDLE) this.currentState = this.states.AIMING;
        else if (a && this.currentState === this.states.AIMING) this.ball.makeShoot(this.aimArrow.shotDirectionX, this.aimArrow.shotDirectionY, this.aimArrow.shootAngle), this.makeShadowTween(), this.currentState = this.states.BEFORE_WIND, this.aimArrow.stopRotationTween();
        else if (this.currentState === this.states.IN_AIR_UP && this.ball.simpleMovement.velY > 0) this.currentState = this.states.IN_AIR,
            this.ball.startWind(), createjs.Tween.get(this.shadow).to({
                heightScale: 1
            }, 750, createjs.Ease.sineIn), this.hideShowFrontMonsters(true);
        else if (this.currentState === this.states.IN_AIR || this.currentState === this.states.FROM_WALL || this.currentState === this.states.FROM_GROUND) {
            for (var a = this.monster.circleCollisions, b = this.ball.circleCollision, d = true, c = 0; c < a.length && d; c++)
                if (a[c].checkAgainstWithPosCorrection(b, this.ball.befX, this.ball.befY) !== null) {
                    d = false;
                    if (c < 2 && this.ball.sprite.y < a[c].y + a[c].sprite.y - 15)
                        if (this.ball.simpleMovement.velX =
                            c === 1 ? 40 : -40, this.ball.simpleMovement.accelX = 0, this.ball.simpleMovement.velY = -this.ball.simpleMovement.velY, this.ball.simpleMovement.accelY = getConst(800), this.ball.simpleMovement.velY < -250 && this.currentState !== this.states.FROM_WALL) this.ball.simpleMovement.velY = -250;
                        else {
                            if (this.ball.simpleMovement.velY < -175) this.ball.simpleMovement.velY = -175
                        } else this.ball.simpleMovement.velX = this.ball.sprite.x > a[c].x + a[c].sprite.x ? 100 : -100, this.ball.simpleMovement.accelX = 0;
                    this.currentState = this.states.FROM_WALL
                }
            if (this.monster.pointDetector.checkAgainstWithShift(this.ball.circleCollision,
                    this.ball.befX, this.ball.befY) !== null) {
                this.ball.simpleMovement.velX = 0;
                this.ball.simpleMovement.accelX = 0;
                this.ball.simpleMovement.velY = 0;
                this.ball.simpleMovement.accelY = 0;
                this.sensorTouched();
                this.currentState = this.states.BALL_BACK;
                return
            }
            if (this.ball.sprite.x > MLE.width + getConst(80) || this.ball.sprite.y < getConst(-80)) {
                this.noSuccessDetected();
                this.currentState = this.states.IDLE;
                return
            }
        }
        if ((this.currentState === this.states.IN_AIR || this.currentState === this.states.FROM_WALL) && this.ball.simpleMovement.velY >
            0 && this.ball.sprite.y > this.ground) this.ball.sprite.x > 800 || this.ball.sprite.x < -160 ? (this.noSuccessDetected(), this.currentState = this.states.IDLE) : (this.currentState === this.states.FROM_WALL ? (this.ball.simpleMovement.velX *= getConst(200) / this.ball.simpleMovement.velY, this.ball.simpleMovement.velY = getConst(-200)) : (this.ball.simpleMovement.velX *= getConst(400) / this.ball.simpleMovement.velY, this.ball.simpleMovement.velY = getConst(-300)), this.ball.simpleMovement.accelX = 0, this.ball.simpleMovement.accelY = getConst(800),
            this.currentState = this.states.FROM_GROUND, this.hideShowFrontMonsters(false), this.ball.sprite.y = this.ground);
        else if (this.currentState == this.states.FROM_GROUND && this.ball.simpleMovement.velY > 0 && this.ball.sprite.y > this.ground) this.ball.simpleMovement.setValues(0, 0, 0, 0), this.currentState = this.states.IDLE, this.noSuccessDetected(true), this.ball.sprite.y = this.ground
    }
};
GameScene.prototype.draw = function() {
    MLE.context.imageSmoothingEnabled = true;
    this.bg.draw();
    this.monster.draw();
    this.shadow.draw();
    this.ball.draw();
    this.aimArrow.draw();
    this.monsterFront.x = this.monster.group.x;
    this.monsterFront.y = this.monster.group.y - this.monster.group.pivotY - 30;
    this.monsterFront.draw();
    this.windCloud.draw();
    this.success.draw();
    this.pauseWindow.draw();
    this.gui.draw();
    this.pauseButton.draw()
};
GameScene.prototype.startGame = function() {};
GameScene.prototype.makeShadowTween = function() {
    var a = this.ball.startPosY + 65,
        b = this.ground + 30;
    this.shadow.basicScaleX = this.shadow.basicScaleY = 0.6;
    this.shadow.y = a;
    createjs.Tween.get(this.shadow).to({
        y: b,
        alpha: 0.7,
        basicScaleX: 0.3,
        basicScaleY: 0.3
    }, 2E3, createjs.Ease.quadOut);
    createjs.Tween.get(this.shadow).to({
        heightScale: 0.6
    }, 450, createjs.Ease.sineOut)
};
GameScene.prototype.hideShowFrontMonsters = function(a) {
    this.monsterFront.alpha = a ? 1 : 0;
    this.monster.body.alpha = a ? 0 : 1
};
GameScene.prototype.noSuccessDetected = function() {
    this.rightBounced = this.leftBounced = false;
    this.ball.bounced = false;
    this.monster.makeHungryAnimation();
    this.hideShowFrontMonsters(false);
    this.gui.zeroPoints();
    if (this.ball.sprite.x > MLE.width + 25 || this.ball.sprite.x < -25) createjs.Tween.get(this.ball.sprite).to({
        alpha: 0
    }, 150).call(this.createNewBall, null, this), createjs.Tween.get(this.shadow, {
        override: true
    }).to({
        alpha: 0
    }, 120), this.aimArrow.sprite.alpha > 0 && createjs.Tween.get(this.aimArrow.sprite).to({
            alpha: 0
        },
        120);
    else {
        console.log("DUPA!!!");
        var a = Math.abs(this.ball.startPosX - this.ball.sprite.x) * 6;
        a < 300 && (a = 300);
        createjs.Tween.get(this.ball.sprite).wait(200).to({
            x: this.ball.startPosX
        }, a);
        createjs.Tween.get(this.ball.sprite).wait(200).call(function() {
            createjs.Tween.get(this.shadow, {
                override: true
            }).to({
                y: this.ball.startPosY + 65,
                basicScaleX: 0.6,
                basicScaleY: 0.6,
                heightScale: 1
            }, 950 + a, createjs.Ease.sineIn);
            this.ball.rotateBackward()
        }.bind(this)).to({
            y: this.ball.startPosY,
            scaleX: 1,
            scaleY: 1
        }, 950 + a, createjs.Ease.sineIn).call(function() {
            this.ball.startJumping();
            this.ball.rotateForward();
            this.currentState = this.states.IDLE;
            this.aimArrow.resumeRotationTween()
        }.bind(this))
    }
};
GameScene.prototype.createNewBall = function() {
    this.rightBounced = this.leftBounced = false;
    this.ball.bounced = false;
    this.ball.simpleMovement.setValues(0, 0, 0, 0);
    this.ball.sprite.x = this.ball.startPosX;
    this.ball.sprite.y = this.ball.startPosY + 160;
    this.ball.sprite.scaleX = this.ball.sprite.scaleY = 1;
    this.ball.sprite.alpha = 0.5;
    createjs.Tween.get(this.ball.sprite).wait(250).to({
        y: this.ball.startPosY,
        alpha: 1
    }, 350, createjs.Ease.sineOut).call(function() {
        window.gameScene.ball.startJumping()
    });
    this.aimArrow.resumeRotationTween();
    this.shadow.x = this.ball.startPosX;
    this.shadow.y = this.ball.startPosY + 210;
    this.shadow.centerPivot();
    this.shadow.basicScaleY = this.shadow.basicScaleX = 0.6;
    this.shadow.heightScale = 1;
    this.shadow.alpha = 0.5;
    createjs.Tween.get(this.shadow).wait(250).to({
        y: this.ball.startPosY + 65,
        alpha: 1
    }, 350, createjs.Ease.sineOut)
};
GameScene.prototype.sensorTouched = function() {
    this.rightBounced = this.leftBounced = false;
    this.ball.bounced = false;
    if (this.isEasyLevel && (this.easyLevelCounter += 1, this.easyLevelCounter >= 3 && (this.easyLevel += 1, this.easyLevelCounter = 0, this.easyLevel === 6))) this.isEasyLevel = false;
    this.gui.addPoints(Math.abs(Math.floor(this.windCloud.windNumber + 1)));
    this.generateNewWind();
    this.netAnimation();
    createjs.Tween.get(this.ball.sprite).to({
        x: 260,
        y: 345
    }, 250, createjs.Ease.sineInOut).to({
        y: this.ground
    }, 600, createjs.Ease.sineIn).to({
        y: this.ground -
            50
    }, 350, createjs.Ease.sineOut).to({
        y: this.ground
    }, 350, createjs.Ease.sineIn).wait(150).call(function() {
        createjs.Tween.get(this.shadow, {
            override: true
        }).to({
            y: this.ball.startPosY + 65,
            basicScaleX: 0.6,
            basicScaleY: 0.6,
            heightScale: 1
        }, 1E3, createjs.Ease.sineIn);
        this.ball.rotateBackward()
    }.bind(this)).to({
        scaleX: 1,
        scaleY: 1,
        x: this.ball.startPosX,
        y: this.ball.startPosY
    }, 1E3, createjs.Ease.sineIn).call(function() {
        this.ball.startJumping();
        this.ball.rotateForward();
        this.currentState = this.states.IDLE;
        this.aimArrow.resumeRotationTween();
        this.hideShowFrontMonsters(false)
    }.bind(this))
};
GameScene.prototype.generateNewWind = function() {
    var a = Math.random() + Math.random(),
        b = getConst(1E3),
        a = a * b - b;
    if (this.isEasyLevel) {
        var b = (this.easyLevel + 1) * 1E3 / 6,
            a = this.easyLevel * 1E3 / 6,
            d = Math.floor(Math.round(Math.random()) * 2) - 1;
        a += Math.random() * (b - a);
        a *= d
    }
    this.windCloud.changeWind(MLE.Util.mapValue(a, -getConst(1E3), getConst(1E3), -6, 6));
    this.windPower = a * MLE.Util.mapValue(Math.abs(a), 0, b, 0.9, 0.7)
};
GameScene.prototype.netAnimation = function() {
    createjs.Tween.get(this.monsterFront).wait(100).to({
        scaleY: 1.1,
        scaleX: 1.05
    }, 250, createjs.Ease.sineOut).to({
        scaleY: 1,
        scaleX: 1
    }, 250, createjs.Ease.sineIn);
    createjs.Tween.get(this.monster.body).wait(150).to({
        scaleY: 1.1,
        scaleX: 1.05
    }, 250, createjs.Ease.sineOut).to({
        scaleY: 1,
        scaleX: 1
    }, 250, createjs.Ease.sineIn)
};
GameScene.prototype.pauseClicked = function() {
    this.paused === true ? this.resume() : (this.paused = true, this.aimArrow.setPaused(true), this.pauseWindow.show())
};
GameScene.prototype.resume = function() {
    this.aimArrow.setPaused(false);
    createjs.Tween.get(this.pauseButton.group).to({
        alpha: 1
    }, 350).wait(500).call(function() {
        this.paused = false
    }.bind(this))
};
var GameScene2 = function() {
    window.gameScene = this;
    this.states = {
        IDLE: 0,
        AIMING: 1,
        BEFORE_WIND: 2,
        IN_AIR_UP: 3,
        IN_AIR: 4,
        FROM_WALL: 5,
        FROM_GROUND: 6,
        BALL_BACK: 7
    };
    this.currentState = this.states.IDLE;
    this.ground = -1;
    this.maxHeight = getConst(50);
    var a = Math.floor(Math.random() * 59) / 10;
    this.windPower = getConst(1E3) * a / 6;
    this.minScale = 0.35;
    this.init();
    this.gui.bestNumber < 2E3 && (a = Math.floor(Math.random() * 8) / 10 + 0.1);
    this.windCloud.windFont.text = a + "";
    this.windCloud.windNumber = a;
    this.windPower = getConst(1E3) * a / 6
};
GameScene2.prototype.init = function() {
    this.bg = new MLE.Sprite("gameBackground2", 0, 0);
    this.windCloud = new WindCloud;
    this.windCloud.group.x = 0;
    this.windCloud.group.y = getConst(720);
    this.aimArrow = new AimArrow;
    this.aimArrow.sprite.alpha = 0;
    this.ball = new Ball2;
    this.pauseButton = new MenuButton("pause");
    this.pauseButton.group.x = MLE.width / 2;
    this.pauseButton.group.y = 46;
    this.pauseButton.clickCallback = this.pauseClicked.bind(this);
    this.monsterFront = new MLE.Sprite("goal2", 3, -30);
    this.monsterFront.setPivotPercent(0.5,
        0);
    this.monster = new Monster2;
    this.monster.setPositionXY(MLE.width / 2, MLE.height / 2 + getConst(315));
    this.shadow = new MLE.Sprite("shadow", this.ball.startPosX, this.ball.startPosY + 30);
    this.shadow.centerPivot();
    this.shadow.basicScaleX = this.shadow.basicScaleY = 0.6;
    this.shadow.heightScale = 1;
    this.shadowBefX = this.shadow.x;
    this.shadowBefY = this.shadow.y;
    this.gui = new GUI(2);
    this.gui.alpha = 1;
    this.aimArrow.rotationTween.setPosition(1350);
    this.isEasyLevel = false;
    this.easyLevelCounter = this.easyLevel = 0;
    if (this.gui.bestNumber <
        10) this.isEasyLevel = true;
    this.createNewBall();
    this.pauseWindow = new PauseWindow;
    this.paused = false;
    this.success = new SuccessAnim;
    this.lineLeft = new MLE.LineCollision(-1E4, 550, -10001, 500);
    this.lineRight = new MLE.LineCollision(1E4, 550, 10001, 500);
    this.rightBounced = this.leftBounced = false;
    this.block = new MLE.Sprite("block", 0, 433)
};
GameScene2.prototype.update = function() {
    this.pauseWindow.update();
    if (!this.paused) {
        this.windCloud.update();
        this.monster.update();
        this.gui.update();
        this.ball.update();
        this.success.update();
        this.pauseButton.update();
        var a = !this.pauseButton.isDown() && MLE.mouse.pressed && this.ball.sprite.x === this.ball.startPosX && this.ball.sprite.y === this.ball.startPosY && this.aimArrow.sprite.alpha >= 0.75;
        this.shadow.x = this.ball.sprite.x;
        this.shadow.scaleX = this.shadow.basicScaleX * this.shadow.heightScale;
        this.shadow.scaleY =
            this.shadow.basicScaleY * this.shadow.heightScale;
        if (this.lineLeft.checkAgainstWithShift(this.shadow, this.shadowBefX, this.shadowBefY) !== false && this.leftBounced === false) {
            this.ball.sprite.x = this.shadow.x = this.ball.befX + 4;
            this.ball.simpleMovement.velX = this.ball.simpleMovement.velY * -1.75;
            this.ball.simpleMovement.accelX = 0;
            if (this.ball.simpleMovement.velX < 175) this.ball.simpleMovement.velX = 175;
            else if (this.ball.simpleMovement.velX > 225) this.ball.simpleMovement.velX = 225;
            this.leftBounced = true;
            this.ball.bounced =
                true
        }
        if (this.lineRight.checkAgainstWithShift(this.shadow, this.shadowBefX, this.shadowBefY) !== false && this.rightBounced === false) {
            this.ball.sprite.x = this.shadow.x = this.ball.befX - 4;
            this.ball.simpleMovement.velX = this.ball.simpleMovement.velY * 1.75;
            if (this.ball.simpleMovement.velX > -175) this.ball.simpleMovement.velX = -175;
            else if (this.ball.simpleMovement.velX < -225) this.ball.simpleMovement.velX = -225;
            this.ball.simpleMovement.accelX = 0;
            this.rightBounced = true;
            this.ball.bounced = true
        }
        this.shadowBefX = this.shadow.x;
        this.shadowBefY = this.shadow.y;
        this.aimArrow.update();
        if (a && this.currentState === this.states.IDLE) this.currentState = this.states.AIMING;
        else if (a && this.currentState === this.states.AIMING) this.ball.makeShoot(this.aimArrow.shotDirectionX, this.aimArrow.shotDirectionY, this.aimArrow.shootAngle), this.makeShadowTween(), this.currentState = this.states.BEFORE_WIND, this.aimArrow.stopRotationTween();
        else if (this.currentState === this.states.IN_AIR_UP && this.ball.simpleMovement.velY > 0) this.currentState = this.states.IN_AIR,
            this.ball.startWind(), createjs.Tween.get(this.shadow).to({
                heightScale: 1
            }, 750, createjs.Ease.sineIn), this.hideShowFrontMonsters(true);
        else if (this.currentState === this.states.IN_AIR || this.currentState === this.states.FROM_WALL || this.currentState === this.states.FROM_GROUND) {
            for (var a = this.monster.circleCollisions, b = this.ball.circleCollision, d = true, c = 0; c < a.length && d; c++)
                if (a[c].checkAgainstWithPosCorrection(b, this.ball.befX, this.ball.befY) !== null) {
                    d = false;
                    if (c < 2 && this.ball.sprite.y < a[c].y + a[c].sprite.y - 12)
                        if (this.ball.simpleMovement.velX =
                            c === 1 ? 25 : -25, this.ball.simpleMovement.accelX = 0, this.ball.simpleMovement.velY = -this.ball.simpleMovement.velY, this.ball.simpleMovement.accelY = getConst(700), this.ball.simpleMovement.velY < -225 && this.currentState !== this.states.FROM_WALL) this.ball.simpleMovement.velY = -225;
                        else {
                            if (this.ball.simpleMovement.velY < -150) this.ball.simpleMovement.velY = -150
                        } else this.ball.simpleMovement.velX = this.ball.sprite.x > a[c].x + a[c].sprite.x ? 75 : -75, this.ball.simpleMovement.accelX = 0;
                    this.currentState = this.states.FROM_WALL
                }
            if (this.monster.pointDetector.checkAgainstWithShift(this.ball.circleCollision,
                    this.ball.befX, this.ball.befY) !== null) {
                this.ball.simpleMovement.velX = 0;
                this.ball.simpleMovement.accelX = 0;
                this.ball.simpleMovement.velY = 0;
                this.ball.simpleMovement.accelY = 0;
                this.sensorTouched();
                this.currentState = this.states.BALL_BACK;
                return
            }
            if (this.ball.sprite.x > MLE.width + getConst(80) || this.ball.sprite.y < getConst(-80)) {
                this.noSuccessDetected();
                this.currentState = this.states.IDLE;
                return
            }
        }
        if ((this.currentState === this.states.IN_AIR || this.currentState === this.states.FROM_WALL) && this.ball.simpleMovement.velY >
            0 && this.ball.sprite.y > this.ground) this.ball.sprite.x > 800 || this.ball.sprite.x < -160 ? (this.noSuccessDetected(), this.currentState = this.states.IDLE) : (this.currentState === this.states.FROM_WALL ? (this.ball.simpleMovement.velX *= getConst(150) / this.ball.simpleMovement.velY, this.ball.simpleMovement.velY = getConst(-150)) : (this.ball.simpleMovement.velX *= getConst(325) / this.ball.simpleMovement.velY, this.ball.simpleMovement.velY = getConst(-250)), this.ball.simpleMovement.accelX = 0, this.ball.simpleMovement.accelY = getConst(700),
            this.currentState = this.states.FROM_GROUND, this.ball.sprite.y = this.ground);
        else if (this.currentState == this.states.FROM_GROUND && this.ball.simpleMovement.velY > 0 && this.ball.sprite.y > this.ground) this.ball.simpleMovement.setValues(0, 0, 0, 0), this.currentState = this.states.IDLE, this.noSuccessDetected(true), this.ball.sprite.y = this.ground
    }
};
GameScene2.prototype.draw = function() {
    MLE.context.imageSmoothingEnabled = true;
    this.bg.draw();
    this.monster.draw();
    this.shadow.draw();
    this.ball.draw();
    this.block.draw();
    this.aimArrow.draw();
    this.monsterFront.x = this.monster.group.x + 3;
    this.monsterFront.y = this.monster.group.y - this.monster.group.pivotY - 92;
    this.monsterFront.draw();
    this.windCloud.draw();
    this.success.draw();
    this.pauseWindow.draw();
    this.gui.draw();
    this.pauseButton.draw()
};
GameScene2.prototype.startGame = function() {};
GameScene2.prototype.makeShadowTween = function() {
    var a = this.ball.startPosY + 65,
        b = this.ground + 18;
    this.shadow.basicScaleX = this.shadow.basicScaleY = 0.6;
    this.shadow.y = a;
    createjs.Tween.get(this.shadow).to({
        y: b,
        alpha: 0.7,
        basicScaleX: 0.18,
        basicScaleY: 0.18
    }, 2E3, createjs.Ease.quadOut);
    createjs.Tween.get(this.shadow).to({
        heightScale: 0.6
    }, 450, createjs.Ease.sineOut)
};
GameScene2.prototype.hideShowFrontMonsters = function(a) {
    this.monsterFront.alpha = a ? 1 : 0;
    this.monster.body.alpha = a ? 0 : 1;
    this.block.alpha = this.monsterFront.alpha
};
GameScene2.prototype.noSuccessDetected = function() {
    this.rightBounced = this.leftBounced = false;
    this.ball.bounced = false;
    this.monster.makeHungryAnimation();
    this.gui.zeroPoints();
    if (this.ball.sprite.x > MLE.width + 25 || this.ball.sprite.x < -25) createjs.Tween.get(this.ball.sprite).to({
        alpha: 0
    }, 150).call(this.createNewBall, null, this), createjs.Tween.get(this.shadow, {
        override: true
    }).to({
        alpha: 0
    }, 120), this.aimArrow.sprite.alpha > 0 && createjs.Tween.get(this.aimArrow.sprite).to({
        alpha: 0
    }, 120);
    else {
        console.log("DUPA!!!");
        var a = Math.abs(this.ball.startPosX - this.ball.sprite.x) * 6;
        a < 300 && (a = 300);
        createjs.Tween.get(this.ball.sprite).wait(200).to({
            x: this.ball.startPosX
        }, a);
        createjs.Tween.get(this.ball.sprite).wait(200).call(function() {
            createjs.Tween.get(this.shadow, {
                override: true
            }).to({
                y: this.ball.startPosY + 65,
                basicScaleX: 0.6,
                basicScaleY: 0.6,
                heightScale: 1
            }, 950 + a, createjs.Ease.sineIn);
            this.ball.rotateBackward()
        }.bind(this)).to({
            y: this.ball.startPosY,
            scaleX: 1,
            scaleY: 1
        }, 950 + a, createjs.Ease.sineIn).call(function() {
            this.ball.startJumping();
            this.ball.rotateForward();
            this.currentState = this.states.IDLE;
            this.aimArrow.resumeRotationTween()
        }.bind(this))
    }
};
GameScene2.prototype.createNewBall = function() {
    this.rightBounced = this.leftBounced = false;
    this.ball.bounced = false;
    this.ball.simpleMovement.setValues(0, 0, 0, 0);
    this.ball.sprite.x = this.ball.startPosX;
    this.ball.sprite.y = this.ball.startPosY + 160;
    this.ball.sprite.scaleX = this.ball.sprite.scaleY = 1;
    this.ball.sprite.alpha = 0.5;
    createjs.Tween.get(this.ball.sprite).wait(250).to({
        y: this.ball.startPosY,
        alpha: 1
    }, 350, createjs.Ease.sineOut).call(function() {
        window.gameScene.ball.startJumping()
    });
    this.aimArrow.resumeRotationTween();
    this.shadow.x = this.ball.startPosX;
    this.shadow.y = this.ball.startPosY + 210;
    this.shadow.centerPivot();
    this.shadow.basicScaleY = this.shadow.basicScaleX = 0.6;
    this.shadow.heightScale = 1;
    this.shadow.alpha = 0.5;
    createjs.Tween.get(this.shadow).wait(250).to({
        y: this.ball.startPosY + 65,
        alpha: 1
    }, 350, createjs.Ease.sineOut)
};
GameScene2.prototype.sensorTouched = function() {
    this.rightBounced = this.leftBounced = false;
    this.ball.bounced = false;
    if (this.isEasyLevel && (this.easyLevelCounter += 1, this.easyLevelCounter >= 3 && (this.easyLevel += 1, this.easyLevelCounter = 0, this.easyLevel === 6))) this.isEasyLevel = false;
    this.gui.addPoints(Math.abs(Math.floor(this.windCloud.windNumber + 1)));
    this.generateNewWind();
    this.netAnimation();
    createjs.Tween.get(this.ball.sprite).to({
        x: 263,
        y: 280
    }, 250, createjs.Ease.sineInOut).to({
        y: this.ground
    }, 750, createjs.Ease.sineIn).to({
        y: this.ground -
            35
    }, 350, createjs.Ease.sineOut).to({
        y: this.ground
    }, 350, createjs.Ease.sineIn).wait(150).call(function() {
        createjs.Tween.get(this.shadow, {
            override: true
        }).to({
            y: this.ball.startPosY + 65,
            basicScaleX: 0.6,
            basicScaleY: 0.6,
            heightScale: 1
        }, 1E3, createjs.Ease.sineIn);
        this.ball.rotateBackward()
    }.bind(this)).to({
        scaleX: 1,
        scaleY: 1,
        x: this.ball.startPosX,
        y: this.ball.startPosY
    }, 1E3, createjs.Ease.sineIn).call(function() {
        this.ball.startJumping();
        this.ball.rotateForward();
        this.currentState = this.states.IDLE;
        this.aimArrow.resumeRotationTween()
    }.bind(this))
};
GameScene2.prototype.generateNewWind = function() {
    var a = Math.random() + Math.random(),
        b = getConst(1E3),
        a = a * b - b;
    if (this.isEasyLevel) {
        var b = (this.easyLevel + 1) * 1E3 / 6,
            a = this.easyLevel * 1E3 / 6,
            d = Math.floor(Math.round(Math.random()) * 2) - 1;
        a += Math.random() * (b - a);
        a *= d
    }
    this.windCloud.changeWind(MLE.Util.mapValue(a, -getConst(1E3), getConst(1E3), -6, 6));
    this.windPower = a * MLE.Util.mapValue(Math.abs(a), 0, b, 0.9, 0.7)
};
GameScene2.prototype.netAnimation = function() {
    createjs.Tween.get(this.monsterFront).wait(100).to({
        scaleY: 1.1,
        scaleX: 1.05
    }, 250, createjs.Ease.sineOut).to({
        scaleY: 1,
        scaleX: 1
    }, 250, createjs.Ease.sineIn);
    createjs.Tween.get(this.monster.body).wait(150).to({
        scaleY: 1.1,
        scaleX: 1.05
    }, 250, createjs.Ease.sineOut).to({
        scaleY: 1,
        scaleX: 1
    }, 250, createjs.Ease.sineIn)
};
GameScene2.prototype.pauseClicked = function() {
    this.paused === true ? this.resume() : (this.paused = true, this.aimArrow.setPaused(true), this.pauseWindow.show())
};
GameScene2.prototype.resume = function() {
    this.aimArrow.setPaused(false);
    createjs.Tween.get(this.pauseButton.group).to({
        alpha: 1
    }, 350).wait(500).call(function() {
        this.paused = false
    }.bind(this))
};
var GameScene3 = function() {
    window.gameScene = this;
    this.states = {
        IDLE: 0,
        AIMING: 1,
        BEFORE_WIND: 2,
        IN_AIR_UP: 3,
        IN_AIR: 4,
        FROM_WALL: 5,
        FROM_GROUND: 6,
        BALL_BACK: 7
    };
    this.currentState = this.states.IDLE;
    this.ground = -1;
    this.maxHeight = getConst(50);
    var a = Math.floor(Math.random() * 59) / 10;
    this.windPower = getConst(1E3) * a / 6;
    this.minScale = 0.35;
    this.init();
    this.gui.bestNumber < 2E3 && (a = Math.floor(Math.random() * 8) / 10 + 0.1);
    this.windCloud.windFont.text = a + "";
    this.windCloud.windNumber = a;
    this.windPower = getConst(1E3) * a / 6
};
GameScene3.prototype.init = function() {
    this.bg = new MLE.Sprite("gameBackground3", 0, 0);
    this.windCloud = new WindCloud;
    this.windCloud.group.x = 0;
    this.windCloud.group.y = getConst(720);
    this.aimArrow = new AimArrow;
    this.aimArrow.sprite.alpha = 0;
    this.ball = new Ball3;
    this.pauseButton = new MenuButton("pause");
    this.pauseButton.group.x = MLE.width / 2;
    this.pauseButton.group.y = 46;
    this.pauseButton.clickCallback = this.pauseClicked.bind(this);
    this.monsterFront = new MLE.Sprite("goal3", 3, -30);
    this.monsterFront.setPivotPercent(0.5,
        0);
    this.monster = new Monster3;
    this.monster.setPositionXY(MLE.width / 2, MLE.height / 2 + getConst(315));
    this.shadow = new MLE.Sprite("shadow", this.ball.startPosX, this.ball.startPosY + 30);
    this.shadow.centerPivot();
    this.shadow.basicScaleX = this.shadow.basicScaleY = 0.6;
    this.shadow.heightScale = 1;
    this.shadowBefX = this.shadow.x;
    this.shadowBefY = this.shadow.y;
    this.gui = new GUI(3);
    this.gui.alpha = 1;
    this.aimArrow.rotationTween.setPosition(1350);
    this.isEasyLevel = false;
    this.easyLevelCounter = this.easyLevel = 0;
    if (this.gui.bestNumber <
        10) this.isEasyLevel = true;
    this.createNewBall();
    this.pauseWindow = new PauseWindow;
    this.paused = false;
    this.success = new SuccessAnim;
    this.lineLeft = new MLE.LineCollision(-1E4, 550, -10001, 500);
    this.lineRight = new MLE.LineCollision(1E4, 550, 10001, 500);
    this.rightBounced = this.leftBounced = false;
    this.trash = new MLE.Sprite("trash", 0, 377)
};
GameScene3.prototype.update = function() {
    this.pauseWindow.update();
    if (!this.paused) {
        this.windCloud.update();
        this.monster.update();
        this.gui.update();
        this.ball.update();
        this.success.update();
        this.pauseButton.update();
        var a = !this.pauseButton.isDown() && MLE.mouse.pressed && this.ball.sprite.x === this.ball.startPosX && this.ball.sprite.y === this.ball.startPosY && this.aimArrow.sprite.alpha >= 0.75;
        this.shadow.x = this.ball.sprite.x;
        this.shadow.scaleX = this.shadow.basicScaleX * this.shadow.heightScale;
        this.shadow.scaleY =
            this.shadow.basicScaleY * this.shadow.heightScale;
        if (this.lineLeft.checkAgainstWithShift(this.shadow, this.shadowBefX, this.shadowBefY) !== false && this.leftBounced === false) {
            this.ball.sprite.x = this.shadow.x = this.ball.befX + 4;
            this.ball.simpleMovement.velX = this.ball.simpleMovement.velY * -1.75;
            this.ball.simpleMovement.accelX = 0;
            if (this.ball.simpleMovement.velX < 175) this.ball.simpleMovement.velX = 175;
            else if (this.ball.simpleMovement.velX > 225) this.ball.simpleMovement.velX = 225;
            this.leftBounced = true;
            this.ball.bounced =
                true
        }
        if (this.lineRight.checkAgainstWithShift(this.shadow, this.shadowBefX, this.shadowBefY) !== false && this.rightBounced === false) {
            this.ball.sprite.x = this.shadow.x = this.ball.befX - 4;
            this.ball.simpleMovement.velX = this.ball.simpleMovement.velY * 1.75;
            if (this.ball.simpleMovement.velX > -175) this.ball.simpleMovement.velX = -175;
            else if (this.ball.simpleMovement.velX < -225) this.ball.simpleMovement.velX = -225;
            this.ball.simpleMovement.accelX = 0;
            this.rightBounced = true;
            this.ball.bounced = true
        }
        this.shadowBefX = this.shadow.x;
        this.shadowBefY = this.shadow.y;
        this.aimArrow.update();
        if (a && this.currentState === this.states.IDLE) this.currentState = this.states.AIMING;
        else if (a && this.currentState === this.states.AIMING) this.ball.makeShoot(this.aimArrow.shotDirectionX, this.aimArrow.shotDirectionY, this.aimArrow.shootAngle), this.makeShadowTween(), this.currentState = this.states.BEFORE_WIND, this.aimArrow.stopRotationTween();
        else if (this.currentState === this.states.IN_AIR_UP && this.ball.simpleMovement.velY > 0) this.currentState = this.states.IN_AIR,
            this.ball.startWind(), createjs.Tween.get(this.shadow).to({
                heightScale: 1
            }, 750, createjs.Ease.sineIn), this.hideShowFrontMonsters(true);
        else if (this.currentState === this.states.IN_AIR || this.currentState === this.states.FROM_WALL || this.currentState === this.states.FROM_GROUND) {
            for (var a = this.monster.circleCollisions, b = this.ball.circleCollision, d = true, c = 0; c < a.length && d; c++)
                if (a[c].checkAgainstWithPosCorrection(b, this.ball.befX, this.ball.befY) !== null) {
                    d = false;
                    if (c < 2 && this.ball.sprite.y < a[c].y + a[c].sprite.y - 10)
                        if (this.ball.simpleMovement.velX =
                            c === 1 ? 15 : -15, this.ball.simpleMovement.accelX = 0, this.ball.simpleMovement.velY = -this.ball.simpleMovement.velY, this.ball.simpleMovement.accelY = getConst(650), this.ball.simpleMovement.velY < -200 && this.currentState !== this.states.FROM_WALL) this.ball.simpleMovement.velY = -200;
                        else {
                            if (this.ball.simpleMovement.velY < -125) this.ball.simpleMovement.velY = -125
                        } else this.ball.simpleMovement.velX = this.ball.sprite.x > a[c].x + a[c].sprite.x ? 60 : -60, this.ball.simpleMovement.accelX = 0;
                    this.currentState = this.states.FROM_WALL
                }
            if (this.monster.pointDetector.checkAgainstWithShift(this.ball.circleCollision,
                    this.ball.befX, this.ball.befY) !== null) {
                this.ball.simpleMovement.velX = 0;
                this.ball.simpleMovement.accelX = 0;
                this.ball.simpleMovement.velY = 0;
                this.ball.simpleMovement.accelY = 0;
                this.sensorTouched();
                this.currentState = this.states.BALL_BACK;
                return
            }
            if (this.ball.sprite.x > MLE.width + getConst(80) || this.ball.sprite.y < getConst(-80)) {
                this.noSuccessDetected();
                this.currentState = this.states.IDLE;
                return
            }
        }
        if ((this.currentState === this.states.IN_AIR || this.currentState === this.states.FROM_WALL) && this.ball.simpleMovement.velY >
            0 && this.ball.sprite.y > this.ground) this.ball.sprite.x > 800 || this.ball.sprite.x < -160 ? (this.noSuccessDetected(), this.currentState = this.states.IDLE) : (this.currentState === this.states.FROM_WALL ? (this.ball.simpleMovement.velX *= getConst(125) / this.ball.simpleMovement.velY, this.ball.simpleMovement.velY = getConst(-125)) : (this.ball.simpleMovement.velX *= getConst(300) / this.ball.simpleMovement.velY, this.ball.simpleMovement.velY = getConst(-225)), this.ball.simpleMovement.accelX = 0, this.ball.simpleMovement.accelY = getConst(650),
            this.currentState = this.states.FROM_GROUND, this.ball.sprite.y = this.ground);
        else if (this.currentState == this.states.FROM_GROUND && this.ball.simpleMovement.velY > 0 && this.ball.sprite.y > this.ground) this.ball.simpleMovement.setValues(0, 0, 0, 0), this.currentState = this.states.IDLE, this.noSuccessDetected(true), this.ball.sprite.y = this.ground
    }
};
GameScene3.prototype.draw = function() {
    MLE.context.imageSmoothingEnabled = true;
    this.bg.draw();
    this.monster.draw();
    this.shadow.draw();
    this.ball.draw();
    this.aimArrow.draw();
    this.monsterFront.x = this.monster.group.x + 0;
    this.monsterFront.y = this.monster.group.y - this.monster.group.pivotY + 36;
    this.monsterFront.draw();
    this.trash.draw();
    this.windCloud.draw();
    this.success.draw();
    this.pauseWindow.draw();
    this.gui.draw();
    this.pauseButton.draw()
};
GameScene3.prototype.startGame = function() {};
GameScene3.prototype.makeShadowTween = function() {
    var a = this.ball.startPosY + 65,
        b = this.ground + 12;
    this.shadow.basicScaleX = this.shadow.basicScaleY = 0.6;
    this.shadow.y = a;
    createjs.Tween.get(this.shadow).to({
        y: b,
        alpha: 0.7,
        basicScaleX: 0.12,
        basicScaleY: 0.12
    }, 2E3, createjs.Ease.quadOut);
    createjs.Tween.get(this.shadow).to({
        heightScale: 0.6
    }, 450, createjs.Ease.sineOut)
};
GameScene3.prototype.hideShowFrontMonsters = function(a) {
    this.monsterFront.alpha = a ? 1 : 0;
    this.monster.body.alpha = a ? 0 : 1;
    this.trash.alpha = this.monsterFront.alpha
};
GameScene3.prototype.noSuccessDetected = function() {
    this.rightBounced = this.leftBounced = false;
    this.ball.bounced = false;
    this.monster.makeHungryAnimation();
    this.gui.zeroPoints();
    if (this.ball.sprite.x > MLE.width + 25 || this.ball.sprite.x < -25) createjs.Tween.get(this.ball.sprite).to({
        alpha: 0
    }, 150).call(this.createNewBall, null, this), createjs.Tween.get(this.shadow, {
        override: true
    }).to({
        alpha: 0
    }, 120), this.aimArrow.sprite.alpha > 0 && createjs.Tween.get(this.aimArrow.sprite).to({
        alpha: 0
    }, 120);
    else {
        console.log("DUPA!!!");
        var a = Math.abs(this.ball.startPosX - this.ball.sprite.x) * 6;
        a < 300 && (a = 300);
        createjs.Tween.get(this.ball.sprite).wait(200).to({
            x: this.ball.startPosX
        }, a);
        createjs.Tween.get(this.ball.sprite).wait(200).call(function() {
            createjs.Tween.get(this.shadow, {
                override: true
            }).to({
                y: this.ball.startPosY + 65,
                basicScaleX: 0.6,
                basicScaleY: 0.6,
                heightScale: 1
            }, 950 + a, createjs.Ease.sineIn);
            this.ball.rotateBackward()
        }.bind(this)).to({
            y: this.ball.startPosY,
            scaleX: 1,
            scaleY: 1
        }, 950 + a, createjs.Ease.sineIn).call(function() {
            this.ball.startJumping();
            this.ball.rotateForward();
            this.currentState = this.states.IDLE;
            this.aimArrow.resumeRotationTween()
        }.bind(this))
    }
};
GameScene3.prototype.createNewBall = function() {
    this.rightBounced = this.leftBounced = false;
    this.ball.bounced = false;
    this.ball.simpleMovement.setValues(0, 0, 0, 0);
    this.ball.sprite.x = this.ball.startPosX;
    this.ball.sprite.y = this.ball.startPosY + 160;
    this.ball.sprite.scaleX = this.ball.sprite.scaleY = 1;
    this.ball.sprite.alpha = 0.5;
    createjs.Tween.get(this.ball.sprite).wait(250).to({
        y: this.ball.startPosY,
        alpha: 1
    }, 350, createjs.Ease.sineOut).call(function() {
        window.gameScene.ball.startJumping()
    });
    this.aimArrow.resumeRotationTween();
    this.shadow.x = this.ball.startPosX;
    this.shadow.y = this.ball.startPosY + 210;
    this.shadow.centerPivot();
    this.shadow.basicScaleY = this.shadow.basicScaleX = 0.6;
    this.shadow.heightScale = 1;
    this.shadow.alpha = 0.5;
    createjs.Tween.get(this.shadow).wait(250).to({
        y: this.ball.startPosY + 65,
        alpha: 1
    }, 350, createjs.Ease.sineOut)
};
GameScene3.prototype.sensorTouched = function() {
    this.rightBounced = this.leftBounced = false;
    this.ball.bounced = false;
    if (this.isEasyLevel && (this.easyLevelCounter += 1, this.easyLevelCounter >= 3 && (this.easyLevel += 1, this.easyLevelCounter = 0, this.easyLevel === 6))) this.isEasyLevel = false;
    this.gui.addPoints(Math.abs(Math.floor(this.windCloud.windNumber + 1)));
    this.generateNewWind();
    this.netAnimation();
    createjs.Tween.get(this.ball.sprite).to({
        x: 263,
        y: 385
    }, 250, createjs.Ease.sineInOut).to({
        y: this.ground
    }, 750, createjs.Ease.sineIn).to({
        y: this.ground -
            25
    }, 350, createjs.Ease.sineOut).to({
        y: this.ground
    }, 350, createjs.Ease.sineIn).wait(150).call(function() {
        createjs.Tween.get(this.shadow, {
            override: true
        }).to({
            y: this.ball.startPosY + 65,
            basicScaleX: 0.6,
            basicScaleY: 0.6,
            heightScale: 1
        }, 1E3, createjs.Ease.sineIn);
        this.ball.rotateBackward()
    }.bind(this)).to({
        scaleX: 1,
        scaleY: 1,
        x: this.ball.startPosX,
        y: this.ball.startPosY
    }, 1E3, createjs.Ease.sineIn).call(function() {
        this.ball.startJumping();
        this.ball.rotateForward();
        this.currentState = this.states.IDLE;
        this.aimArrow.resumeRotationTween();
        this.hideShowFrontMonsters(false)
    }.bind(this))
};
GameScene3.prototype.generateNewWind = function() {
    var a = Math.random() + Math.random(),
        b = getConst(1E3),
        a = a * b - b;
    if (this.isEasyLevel) {
        var b = (this.easyLevel + 1) * 1E3 / 6,
            a = this.easyLevel * 1E3 / 6,
            d = Math.floor(Math.round(Math.random()) * 2) - 1;
        a += Math.random() * (b - a);
        a *= d
    }
    this.windCloud.changeWind(MLE.Util.mapValue(a, -getConst(1E3), getConst(1E3), -6, 6));
    this.windPower = a * MLE.Util.mapValue(Math.abs(a), 0, b, 0.9, 0.7)
};
GameScene3.prototype.netAnimation = function() {
    createjs.Tween.get(this.monsterFront).wait(100).to({
        scaleY: 1.1,
        scaleX: 1.05
    }, 250, createjs.Ease.sineOut).to({
        scaleY: 1,
        scaleX: 1
    }, 250, createjs.Ease.sineIn);
    createjs.Tween.get(this.monster.body).wait(150).to({
        scaleY: 1.1,
        scaleX: 1.05
    }, 250, createjs.Ease.sineOut).to({
        scaleY: 1,
        scaleX: 1
    }, 250, createjs.Ease.sineIn)
};
GameScene3.prototype.pauseClicked = function() {
    this.paused === true ? this.resume() : (this.paused = true, this.aimArrow.setPaused(true), this.pauseWindow.show())
};
GameScene3.prototype.resume = function() {
    this.aimArrow.setPaused(false);
    createjs.Tween.get(this.pauseButton.group).to({
        alpha: 1
    }, 350).wait(500).call(function() {
        this.paused = false
    }.bind(this))
};
var WindCloud = function() {
    this.init()
};
WindCloud.prototype.init = function() {
    this.group = new MLE.Group;
    this.windCloud = new MLE.Sprite("wind", 65, 50);
    this.windCloud.centerPivot();
    this.group.addChild(this.windCloud);
    this.windFont = new MLE.TextSprite;
    this.windFont.text = "2.5";
    this.windFont.size = 27;
    this.windFont.x += getConst(35);
    this.numberPin = new MLE.Pin(this.windFont, this.group, 60, 85);
    this.windNumber = 2.5;
    this.tween = {}
};
WindCloud.prototype.update = function() {
    this.windNumber = Math.round(this.windNumber * 10) / 10;
    this.windFont.text = "" + this.windNumber;
    this.windNumber % 1 === 0 && (this.windFont.text += ".0");
    this.numberPin.update()
};
WindCloud.prototype.draw = function() {
    this.group.draw();
    this.windFont.draw()
};
WindCloud.prototype.changeWind = function(a) {
    a = Math.round(a * 10) / 10;
    a === 0 && (a = 0.1);
    a > 5.9 && (a = 5.9);
    a < -5.9 && (a = -5.9);
    if (this.group.scaleX / a > 0) this.tween = createjs.Tween.get(this).to({
        windNumber: Math.abs(a)
    }, 750, createjs.Ease.sineInOut);
    else {
        var b = this.group.scaleX,
            d;
        d = b === 1 ? [getConst(-100), MLE.width + getConst(100), MLE.width] : [MLE.width + getConst(100), getConst(-100), 0];
        this.tween = createjs.Tween.get(this.group).to({
            x: d[0]
        }, 400).to({
            x: d[1],
            scaleX: b * -1
        }).call(function() {
            this.windNumber = Math.abs(a);
            this.numberPin.offsetX =
                b * -60
        }.bind(this)).to({
            x: d[2]
        }, 400, createjs.Ease.sineInOut)
    }
};
WindCloud.prototype.setPaused = function(a) {
    this.tween._paused = a
};
var Monster = function() {
    this.init()
};
Monster.prototype.init = function() {
    this.group = new MLE.Group;
    this.shadow = new MLE.Sprite("shadow", -1, -1);
    this.shadow.centerPivot();
    this.shadow.alpha = 0;
    this.body = new MLE.Sprite("goal", 0, -30);
    this.body.setPivotPercent(0.5, 0);
    this.group.addChild(this.body);
    this.group.pivotY = getConst(390);
    this.baseY = this.baseX = 0;
    this.circleCollisions = [];
    for (var a = [{
            x: 38,
            y: -324,
            r: 2
        }, {
            x: -38,
            y: -324,
            r: 2
        }], b = 0; b < a.length; b++) {
        var d = a[b],
            d = new MLE.CircleCollision(this.shadow, getConst(d.x), getConst(d.y), getConst(d.r));
        this.circleCollisions.push(d);
        d.realX = d.x
    }
    this.pointDetector = new MLE.CircleCollision(this.shadow, 0, getConst(-300), 4)
};
Monster.prototype.update = function() {};
Monster.prototype.draw = function() {
    this.shadow.draw();
    this.group.draw();
    for (var a = 0; a < this.circleCollisions.length; a++) this.circleCollisions[a].drawDebug();
    this.pointDetector.drawDebug()
};
Monster.prototype.setPositionXY = function(a, b) {
    this.baseX = a;
    this.baseY = b;
    this.shadow.x = a;
    this.shadow.y = b - getConst(98);
    window.gameScene.ground = this.shadow.y - getConst(135);
    this.group.x = a;
    this.group.y = b
};
Monster.prototype.setScaleX = function(a) {
    this.group.scaleX = a;
    this.shadow.scaleX = this.shadow.scaleY = a;
    window.gameScene.monsterFront.scaleX = a;
    for (var b = 0; b < this.circleCollisions.length; b++) this.circleCollisions[b].x = this.circleCollisions[b].realX * a
};
Monster.prototype.makeHappyJump = function() {};
Monster.prototype.makeHungryAnimation = function() {};
var Monster2 = function() {
    this.init()
};
Monster2.prototype.init = function() {
    this.group = new MLE.Group;
    this.shadow = new MLE.Sprite("shadow", -1, -1);
    this.shadow.centerPivot();
    this.shadow.alpha = 0;
    this.body = new MLE.Sprite("goal2", 3, -92);
    this.body.setPivotPercent(0.5, 0);
    this.group.addChild(this.body);
    this.group.pivotY = getConst(390);
    this.baseY = this.baseX = 0;
    this.circleCollisions = [];
    for (var a = [{
            x: 30,
            y: -394,
            r: 2
        }, {
            x: -26,
            y: -394,
            r: 2
        }], b = 0; b < a.length; b++) {
        var d = a[b],
            d = new MLE.CircleCollision(this.shadow, getConst(d.x), getConst(d.y), getConst(d.r));
        this.circleCollisions.push(d);
        d.realX = d.x
    }
    this.pointDetector = new MLE.CircleCollision(this.shadow, 3, getConst(-380), 4)
};
Monster2.prototype.update = function() {};
Monster2.prototype.draw = function() {
    this.shadow.draw();
    this.group.draw();
    for (var a = 0; a < this.circleCollisions.length; a++) this.circleCollisions[a].drawDebug();
    this.pointDetector.drawDebug()
};
Monster2.prototype.setPositionXY = function(a, b) {
    this.baseX = a;
    this.baseY = b;
    this.shadow.x = a;
    this.shadow.y = b - getConst(98);
    window.gameScene.ground = this.shadow.y - 165;
    this.group.x = a;
    this.group.y = b
};
Monster2.prototype.setScaleX = function(a) {
    this.group.scaleX = a;
    this.shadow.scaleX = this.shadow.scaleY = a;
    window.gameScene.monsterFront.scaleX = a;
    for (var b = 0; b < this.circleCollisions.length; b++) this.circleCollisions[b].x = this.circleCollisions[b].realX * a
};
Monster2.prototype.makeHappyJump = function() {};
Monster2.prototype.makeHungryAnimation = function() {};
var Monster3 = function() {
    this.init()
};
Monster3.prototype.init = function() {
    this.group = new MLE.Group;
    this.shadow = new MLE.Sprite("shadow", -1, -1);
    this.shadow.centerPivot();
    this.shadow.alpha = 0;
    this.body = new MLE.Sprite("goal3", 0, 36);
    this.body.setPivotPercent(0.5, 0);
    this.group.addChild(this.body);
    this.group.pivotY = getConst(390);
    this.baseY = this.baseX = 0;
    this.circleCollisions = [];
    for (var a = [{
            x: 17,
            y: -250,
            r: 2
        }, {
            x: -18,
            y: -250,
            r: 2
        }], b = 0; b < a.length; b++) {
        var d = a[b],
            d = new MLE.CircleCollision(this.shadow, getConst(d.x), getConst(d.y), getConst(d.r));
        this.circleCollisions.push(d);
        d.realX = d.x
    }
    this.pointDetector = new MLE.CircleCollision(this.shadow, 0, getConst(-240), 4)
};
Monster3.prototype.update = function() {};
Monster3.prototype.draw = function() {
    this.shadow.draw();
    this.group.draw();
    for (var a = 0; a < this.circleCollisions.length; a++) this.circleCollisions[a].drawDebug();
    this.pointDetector.drawDebug()
};
Monster3.prototype.setPositionXY = function(a, b) {
    this.baseX = a;
    this.baseY = b;
    this.shadow.x = a;
    this.shadow.y = b - getConst(98);
    window.gameScene.ground = this.shadow.y - 138;
    this.group.x = a;
    this.group.y = b
};
Monster3.prototype.setScaleX = function(a) {
    this.group.scaleX = a;
    this.shadow.scaleX = this.shadow.scaleY = a;
    window.gameScene.monsterFront.scaleX = a;
    for (var b = 0; b < this.circleCollisions.length; b++) this.circleCollisions[b].x = this.circleCollisions[b].realX * a
};
Monster3.prototype.makeHappyJump = function() {};
Monster3.prototype.makeHungryAnimation = function() {};
var Ball = function() {
    this.init()
};
Ball.prototype.init = function() {
    this.startPosX = MLE.width / 2;
    this.startPosY = MLE.height - 90;
    this.minScale = 0.4;
    this.bounced = false;
    this.sprite = new MLE.Sprite("00", this.startPosX, this.startPosY);
    this.sprite.centerPivot();
    this.imageAnim = new MLE.ImageAnim(this.sprite);
    this.imageAnim.addAnim("idle", ["00"], 20);
    this.imageAnim.addAnim("backward", "00,01,02,03,04,05,06,07,08,09".split(","), 12);
    this.imageAnim.addAnim("forward", "09,08,07,06,05,04,03,02,01,00".split(","), 12);
    this.imageAnim.gotoAndPlay(0, "forward");
    this.simpleMovement = new MLE.SimpleMovement(this.sprite);
    this.circleCollision = new MLE.CircleCollision(this.sprite, 0, 0, 60);
    this.rotationSpeed = 0;
    this.originalPivotY = this.sprite.pivotY
};
Ball.prototype.update = function() {
    this.imageAnim.update();
    this.befX = this.sprite.x;
    this.befY = this.sprite.y;
    this.simpleMovement.update();
    this.sprite.angle += this.rotationSpeed * MLE.tick / 1E3;
    if (window.gameScene.currentState > window.gameScene.states.BEFORE_WIND && window.gameScene.currentState < window.gameScene.states.FROM_WALL) {
        var a = this.sprite.y - this.simpleMovement.velY * this.simpleMovement.velY / this.simpleMovement.accelY / 2;
        if (window.gameScene.currentState === window.gameScene.states.IN_AIR_UP || window.gameScene.currentState ===
            window.gameScene.states.BEFORE_WIND) a = (this.sprite.y - a) / (this.startPosY - a), this.sprite.scaleX = this.sprite.scaleY = a.map(0, 1, 1 - (1 - this.minScale) / 1.35, 1);
        else if (window.gameScene.currentState === window.gameScene.states.IN_AIR) a = (this.sprite.y - a) / (window.gameScene.ground - getConst(200) - a), this.sprite.scaleX = this.sprite.scaleY = a.map(0, 1, 1 - (1 - this.minScale) / 1.35, this.minScale);
        if (this.sprite.scaleX < this.minScale) this.sprite.scaleX = this.sprite.scaleY = this.minScale;
        this.circleCollision.r = 60 * this.sprite.scaleX
    }
};
Ball.prototype.draw = function() {
    this.sprite.draw();
    this.circleCollision.drawDebug()
};
Ball.prototype.makeShoot = function(a, b, d) {
    createjs.Tween.removeTweens(this.sprite);
    createjs.Tween.removeTweens(window.gameScene.shadow);
    createjs.Tween.get(this.sprite).to({
        x: this.sprite.x + 2 * a,
        y: this.sprite.y + 2 * b,
        pivotY: this.originalPivotY,
        scaleX: 0.78,
        scaleY: 0.78
    }, 225).call(function() {
        d = MLE.Util.toDeg(d);
        var c = getConst(-1E3),
            e = getConst(1475),
            f = c / b * a;
        this.simpleMovement.setValues(f, c, f / c * e / 2, e);
        window.gameScene.currentState = window.gameScene.states.IN_AIR_UP
    }.bind(this))
};
Ball.prototype.startJumping = function() {
    var a = this.originalPivotY;
    createjs.Tween.get(this.sprite, {
        loop: true
    }).to({
        pivotY: a + 75
    }, 350, createjs.Ease.sineOut).to({
        pivotY: a
    }, 350, createjs.Ease.sineIn);
    createjs.Tween.get(window.gameScene.shadow, {
        loop: true
    }).to({
        heightScale: 0.7
    }, 350, createjs.Ease.sineOut).to({
        heightScale: 1
    }, 350, createjs.Ease.sineIn)
};
Ball.prototype.startWind = function() {
    if (!this.bounced) this.simpleMovement.velX / gameScene.windPower < 0 ? (this.simpleMovement.velX = 0, this.simpleMovement.accelX = window.gameScene.windPower * 1.8) : this.simpleMovement.accelX = window.gameScene.windPower * 1.35, this.simpleMovement.accelY /= 1.5
};
Ball.prototype.rotateForward = function() {
    this.imageAnim.isPlaying("forward") || this.imageAnim.gotoAndPlay(0, "forward")
};
Ball.prototype.rotateBackward = function() {
    this.imageAnim.isPlaying("backward") || this.imageAnim.gotoAndPlay(0, "backward")
};
var Ball2 = function() {
    this.init()
};
Ball2.prototype.init = function() {
    this.startPosX = MLE.width / 2;
    this.startPosY = MLE.height - 90;
    this.minScale = 0.28;
    this.bounced = false;
    this.sprite = new MLE.Sprite("00", this.startPosX, this.startPosY);
    this.sprite.centerPivot();
    this.imageAnim = new MLE.ImageAnim(this.sprite);
    this.imageAnim.addAnim("idle", ["00"], 20);
    this.imageAnim.addAnim("backward", "00,01,02,03,04,05,06,07,08,09".split(","), 12);
    this.imageAnim.addAnim("forward", "09,08,07,06,05,04,03,02,01,00".split(","), 12);
    this.imageAnim.gotoAndPlay(0, "forward");
    this.simpleMovement = new MLE.SimpleMovement(this.sprite);
    this.circleCollision = new MLE.CircleCollision(this.sprite, 0, 0, 60);
    this.rotationSpeed = 0;
    this.originalPivotY = this.sprite.pivotY
};
Ball2.prototype.update = function() {
    this.imageAnim.update();
    this.befX = this.sprite.x;
    this.befY = this.sprite.y;
    this.simpleMovement.update();
    this.sprite.angle += this.rotationSpeed * MLE.tick / 1E3;
    if (window.gameScene.currentState > window.gameScene.states.BEFORE_WIND && window.gameScene.currentState < window.gameScene.states.FROM_WALL) {
        var a = this.sprite.y - this.simpleMovement.velY * this.simpleMovement.velY / this.simpleMovement.accelY / 2;
        if (window.gameScene.currentState === window.gameScene.states.IN_AIR_UP || window.gameScene.currentState ===
            window.gameScene.states.BEFORE_WIND) a = (this.sprite.y - a) / (this.startPosY - a), this.sprite.scaleX = this.sprite.scaleY = a.map(0, 1, 1 - (1 - this.minScale) / 1.2, 1);
        else if (window.gameScene.currentState === window.gameScene.states.IN_AIR) a = (this.sprite.y - a) / (window.gameScene.ground - getConst(200) - a), this.sprite.scaleX = this.sprite.scaleY = a.map(0, 1, 1 - (1 - this.minScale) / 1.2, this.minScale);
        if (this.sprite.scaleX < this.minScale) this.sprite.scaleX = this.sprite.scaleY = this.minScale;
        this.circleCollision.r = 60 * this.sprite.scaleX
    }
};
Ball2.prototype.draw = function() {
    this.sprite.draw();
    this.circleCollision.drawDebug()
};
Ball2.prototype.makeShoot = function(a, b, d) {
    createjs.Tween.removeTweens(this.sprite);
    createjs.Tween.removeTweens(window.gameScene.shadow);
    createjs.Tween.get(this.sprite).to({
        x: this.sprite.x + 2 * a,
        y: this.sprite.y + 2 * b,
        pivotY: this.originalPivotY,
        scaleX: 0.685,
        scaleY: 0.685
    }, 175).call(function() {
        d = MLE.Util.toDeg(d);
        var c = getConst(-1060),
            e = getConst(1475),
            f = c / b * a;
        this.simpleMovement.setValues(f, c, f / c * e / 2, e);
        window.gameScene.currentState = window.gameScene.states.IN_AIR_UP
    }.bind(this))
};
Ball2.prototype.startJumping = function() {
    window.gameScene.hideShowFrontMonsters(false);
    var a = this.originalPivotY;
    createjs.Tween.get(this.sprite, {
        loop: true
    }).to({
        pivotY: a + 75
    }, 350, createjs.Ease.sineOut).to({
        pivotY: a
    }, 350, createjs.Ease.sineIn);
    createjs.Tween.get(window.gameScene.shadow, {
        loop: true
    }).to({
        heightScale: 0.7
    }, 350, createjs.Ease.sineOut).to({
        heightScale: 1
    }, 350, createjs.Ease.sineIn)
};
Ball2.prototype.startWind = function() {
    if (!this.bounced) this.simpleMovement.velX / gameScene.windPower < 0 ? (this.simpleMovement.velX = 0, this.simpleMovement.accelX = window.gameScene.windPower * 2) : this.simpleMovement.accelX = window.gameScene.windPower * 1.5, this.simpleMovement.accelY /= 1.75
};
Ball2.prototype.rotateForward = function() {
    this.imageAnim.isPlaying("forward") || this.imageAnim.gotoAndPlay(0, "forward")
};
Ball2.prototype.rotateBackward = function() {
    this.imageAnim.isPlaying("backward") || this.imageAnim.gotoAndPlay(0, "backward")
};
var Ball3 = function() {
    this.init()
};
Ball3.prototype.init = function() {
    this.startPosX = MLE.width / 2;
    this.startPosY = MLE.height - 90;
    this.minScale = 0.2;
    this.bounced = false;
    this.sprite = new MLE.Sprite("00", this.startPosX, this.startPosY);
    this.sprite.centerPivot();
    this.imageAnim = new MLE.ImageAnim(this.sprite);
    this.imageAnim.addAnim("idle", ["00"], 20);
    this.imageAnim.addAnim("backward", "00,01,02,03,04,05,06,07,08,09".split(","), 12);
    this.imageAnim.addAnim("forward", "09,08,07,06,05,04,03,02,01,00".split(","), 12);
    this.imageAnim.gotoAndPlay(0, "forward");
    this.simpleMovement = new MLE.SimpleMovement(this.sprite);
    this.circleCollision = new MLE.CircleCollision(this.sprite, 0, 0, 60);
    this.rotationSpeed = 0;
    this.originalPivotY = this.sprite.pivotY
};
Ball3.prototype.update = function() {
    this.imageAnim.update();
    this.befX = this.sprite.x;
    this.befY = this.sprite.y;
    this.simpleMovement.update();
    this.sprite.angle += this.rotationSpeed * MLE.tick / 1E3;
    if (window.gameScene.currentState > window.gameScene.states.BEFORE_WIND && window.gameScene.currentState < window.gameScene.states.FROM_WALL) {
        var a = this.sprite.y - this.simpleMovement.velY * this.simpleMovement.velY / this.simpleMovement.accelY / 2;
        if (window.gameScene.currentState === window.gameScene.states.IN_AIR_UP || window.gameScene.currentState ===
            window.gameScene.states.BEFORE_WIND) a = (this.sprite.y - a) / (this.startPosY - a), this.sprite.scaleX = this.sprite.scaleY = a.map(0, 1, 1 - (1 - this.minScale) / 1.35, 1);
        else if (window.gameScene.currentState === window.gameScene.states.IN_AIR) a = (this.sprite.y - a) / (window.gameScene.ground - getConst(200) - a), this.sprite.scaleX = this.sprite.scaleY = a.map(0, 1, 1 - (1 - this.minScale) / 1.35, this.minScale);
        if (this.sprite.scaleX < this.minScale) this.sprite.scaleX = this.sprite.scaleY = this.minScale;
        this.circleCollision.r = 60 * this.sprite.scaleX
    }
};
Ball3.prototype.draw = function() {
    this.sprite.draw();
    this.circleCollision.drawDebug()
};
Ball3.prototype.makeShoot = function(a, b, d) {
    createjs.Tween.removeTweens(this.sprite);
    createjs.Tween.removeTweens(window.gameScene.shadow);
    createjs.Tween.get(this.sprite).to({
        x: this.sprite.x + 2 * a,
        y: this.sprite.y + 2 * b,
        pivotY: this.originalPivotY,
        scaleX: 0.68,
        scaleY: 0.68
    }, 175).call(function() {
        d = MLE.Util.toDeg(d);
        var c = getConst(-925),
            e = getConst(1400),
            f = c / b * a;
        this.simpleMovement.setValues(f, c, f / c * e / 2, e);
        window.gameScene.currentState = window.gameScene.states.IN_AIR_UP
    }.bind(this))
};
Ball3.prototype.startJumping = function() {
    window.gameScene.hideShowFrontMonsters(false);
    var a = this.originalPivotY;
    createjs.Tween.get(this.sprite, {
        loop: true
    }).to({
        pivotY: a + 75
    }, 350, createjs.Ease.sineOut).to({
        pivotY: a
    }, 350, createjs.Ease.sineIn);
    createjs.Tween.get(window.gameScene.shadow, {
        loop: true
    }).to({
        heightScale: 0.7
    }, 350, createjs.Ease.sineOut).to({
        heightScale: 1
    }, 350, createjs.Ease.sineIn)
};
Ball3.prototype.startWind = function() {
    if (!this.bounced) this.simpleMovement.velX / gameScene.windPower < 0 ? (this.simpleMovement.velX = 0, this.simpleMovement.accelX = window.gameScene.windPower * 1.6) : this.simpleMovement.accelX = window.gameScene.windPower * 0.8 * 1.5, this.simpleMovement.accelY /= 1.75
};
Ball3.prototype.rotateForward = function() {
    this.imageAnim.isPlaying("forward") || this.imageAnim.gotoAndPlay(0, "forward")
};
Ball3.prototype.rotateBackward = function() {
    this.imageAnim.isPlaying("backward") || this.imageAnim.gotoAndPlay(0, "backward")
};
var AimArrow = function() {
    this.init()
};
AimArrow.prototype.init = function() {
    this.maxAngle = 50;
    this.angleChangeDirection = 1;
    this.angleChangeSpeed = 80;
    this.sprite = new MLE.Sprite("aimArrow", MLE.width / 2, MLE.height - 90);
    this.sprite.setPivotPercent(0.5, 1.1);
    this.shootAngle = this.shotDirectionY = this.shotDirectionX = -1;
    this.makeRotationTween()
};
AimArrow.prototype.update = function() {
    var a = this.sprite.pivotY * this.sprite.scaleY,
        b = this.sprite.x + Math.sin(MLE.Util.toRad(this.sprite.angle)) * a,
        a = this.sprite.y - Math.cos(MLE.Util.toRad(this.sprite.angle)) * a;
    this.shotDirectionX = b - this.sprite.x;
    this.shotDirectionY = a - this.sprite.y;
    this.shootAngle = this.sprite.angle
};
AimArrow.prototype.draw = function() {
    this.sprite.draw()
};
AimArrow.prototype.makeRotationTween = function() {
    createjs.Tween.removeTweens(this.sprite);
    this.sprite.scaleY = 0.95;
    this.rotationTween = createjs.Tween.get(this.sprite, {
        loop: true
    }).to({
        angle: 38
    }, 500).to({
        angle: -38
    }, 1E3).to({
        angle: 0
    }, 500)
};
AimArrow.prototype.stopRotationTween = function() {
    this.rotationTween._paused = true;
    createjs.Tween.get(this.sprite).wait(500).to({
        alpha: 0
    }, 350)
};
AimArrow.prototype.resumeRotationTween = function() {
    this.rotationTween._paused = false;
    createjs.Tween.get(this.sprite).wait(500).to({
        alpha: 1
    }, 350).call(function() {
        window.gameScene.currentState = window.gameScene.states.AIMING
    })
};
AimArrow.prototype.setPaused = function(a) {
    this.rotationTween._paused = a
};
var GUI = function(a) {
    this.init(a)
};
GUI.prototype.init = function(a) {
    this.multiplier = a;
    this.group = new MLE.Group;
    this.box1 = new MLE.Sprite("box", 0, 0);
    this.group.addChild(this.box1);
    this.points = new MLE.TextSprite;
    this.points.x = 75;
    this.points.size = 30;
    this.points.y = 58;
    this.points.text = "000";
    this.ptsText = new MLE.TextSprite;
    this.ptsText.text = currLang.points + ":";
    this.ptsText.size = 22;
    this.ptsText.x = 75;
    this.ptsText.align = "center";
    this.ptsText.color = "#ffea00";
    this.ptsText.y = 30;
    this.ptsText.adjustFontSize(150);
    this.group.addChild(this.ptsText);
    this.bstText =
        new MLE.TextSprite;
    this.bstText.text = currLang.best + ":";
    this.bstText.size = 22;
    this.bstText.x = 450;
    this.bstText.align = "center";
    this.bstText.color = "#ffea00";
    this.bstText.y = 30;
    this.bstText.adjustFontSize(150);
    this.group.addChild(this.bstText);
    this.best = new MLE.TextSprite;
    this.best.x = 450;
    this.best.y = 58;
    this.best.text = "000";
    this.group.addChild(this.best);
    this.newPoints = new MLE.TextSprite;
    this.newPoints.x = getConst(220);
    this.newPoints.y = getConst({
        1: 400,
        2: 340,
        3: 215
    }[a + ""]);
    this.newPoints.text = "+5";
    this.group.addChild(this.newPoints);
    this.group.addChild(this.points);
    this.newPoints.xOffset = 0;
    this.pointsNumber = this.newPoints.alpha = 0;
    a = "FurEye.BasketBallHoops.Level" + this.multiplier;
    localStorage[a] ? this.bestNumber = Number(localStorage[a]) : (localStorage[a] = "0", this.bestNumber = 0);
    this.alpha = 1;
    this.inRow = this.levelUp = 0
};
GUI.prototype.update = function() {};
GUI.prototype.draw = function() {
    var a = MLE.context.globalAlpha;
    MLE.context.globalAlpha *= this.alpha;
    this.points.text = "" + this.onThreeDigits(Math.round(this.pointsNumber));
    this.best.text = "" + this.onThreeDigits(this.bestNumber);
    this.newPoints.x = this.newPoints.xStart + this.newPoints.xOffset;
    this.group.draw();
    MLE.context.globalAlpha = a
};
GUI.prototype.addPoints = function(a) {
    a *= this.multiplier;
    window.gameScene.success.setNewPoints(a);
    createjs.Tween.get(window.gameScene.success.group).to({
        scaleX: 1,
        scaleY: 1,
        alpha: 1
    }, 500, createjs.Tween.sineInOut).wait(1500).to({
        scaleX: 0,
        scaleY: 0,
        alpha: 0
    }, 500, createjs.Tween.sineInOut);
    for (var b = 0; b < a; b++) createjs.Tween.get(this).wait(500 / a * (b + 1) + 350).call(function() {
        this.pointsNumber += 1;
        this.pointsNumber > this.bestNumber && (this.bestNumber += 1)
    }.bind(this));
    b = "FurEye.BasketBallHoops.Level" + this.multiplier;
    this.pointsNumber + a > this.bestNumber && (localStorage[b] = this.pointsNumber + a + "");
    this.inRow += 1;
    if (this.inRow === 4) this.inRow = 0, MU_Hooks.levelUp(this.multiplier, this.pointsNumber + a)
};
GUI.prototype.zeroPoints = function() {
    this.inRow += 1;
    if (this.inRow === 4) this.inRow = 0, MU_Hooks.gameOver(this.multiplier, this.pointsNumber);
    createjs.Tween.get(this).to({
        pointsNumber: 0
    }, 750, createjs.Ease.sineInOut)
};
GUI.prototype.onThreeDigits = function(a) {
    return a < 10 ? "00" + a : a < 100 ? "0" + a : "" + a
};
var SuccessAnim = function() {
    this.init()
};
SuccessAnim.prototype.init = function() {
    this.group = new MLE.Group;
    this.group.pivotX = 100;
    this.group.x = MLE.width / 2;
    this.group.y = 300;
    this.schein = new MLE.Sprite("schein", 0, 0);
    this.schein.centerPivot();
    this.helpGroup = new MLE.Group;
    this.helpGroup.addChild(this.schein);
    this.helpGroup.scaleY = 0.75;
    this.group.addChild(this.helpGroup);
    this.success = new MLE.Sprite("success2", 0, 0);
    this.success.centerPivot();
    this.group.addChild(this.success);
    this.ptsText = new MLE.TextSprite;
    this.ptsText.text = "+ 01";
    this.ptsText.size =
        30;
    this.ptsText.x = 40;
    this.ptsText.align = "center";
    this.ptsText.color = "#ffea00";
    this.ptsText.y = 0;
    this.ptsText.adjustFontSize(200);
    this.group.addChild(this.ptsText);
    this.group.scaleX = this.group.scaleY = this.group.alpha = 0
};
SuccessAnim.prototype.update = function() {
    this.schein.angle += 180 * MLE.tick / 1E3
};
SuccessAnim.prototype.draw = function() {
    this.group.draw()
};
SuccessAnim.prototype.setNewPoints = function(a) {
    a < 10 && (a = "0" + a);
    this.group.draw(this.ptsText.text = "+ " + a)
};
var SuccessAnim2 = function() {
    this.init()
};
SuccessAnim2.prototype.init = function() {
    this.group = new MLE.Group;
    this.group.pivotX = 100;
    this.group.x = MLE.width / 2;
    this.group.y = 300;
    this.schein = new MLE.Sprite("schein", 0, 0);
    this.schein.centerPivot();
    this.group.addChild(this.schein);
    this.success = new MLE.Sprite("success", 0, 0);
    this.success.centerPivot();
    this.group.addChild(this.success);
    this.group.scaleX = this.group.scaleY = this.group.alpha = 0
};
SuccessAnim2.prototype.update = function() {
    this.schein.angle += 180 * MLE.tick / 1E3
};
SuccessAnim2.prototype.draw = function() {
    this.group.draw()
};
var PauseWindow = function() {
    this.init()
};
PauseWindow.prototype.init = function() {
    this.sprite = new MLE.Sprite("splash", 0, 0);
    this.sprite.centerPivot();
    this.sprite.x = MLE.width / 2;
    this.sprite.y = MLE.height / 2;
    this.sprite.alpha = 0;
    this.resumeButton = new MenuButton("button", currLang.resume);
    this.resumeButton.group.x = MLE.width / 2;
    this.resumeButton.group.y = 480;
    this.resumeButton.group.alpha = 0;
    this.resumeButton.clickCallback = this.resumeClicked.bind(this);
    this.backToMenuButton = new MenuButton("button", currLang.backToMenu);
    this.backToMenuButton.group.x = MLE.width /
        2;
    this.backToMenuButton.group.y = 630;
    this.backToMenuButton.group.alpha = 0;
    this.backToMenuButton.clickCallback = this.backToMainMenu.bind(this)
};
PauseWindow.prototype.update = function() {
    this.sprite.alpha === 1 && (this.resumeButton.update(), this.backToMenuButton.update())
};
PauseWindow.prototype.draw = function() {
    this.sprite.draw();
    this.resumeButton.draw();
    this.backToMenuButton.draw()
};
PauseWindow.prototype.show = function() {
    createjs.Tween.get(this.sprite).to({
        alpha: 1
    }, 350);
    createjs.Tween.get(this.resumeButton.group).wait(200).to({
        alpha: 1
    }, 350);
    createjs.Tween.get(this.backToMenuButton.group).wait(400).to({
        alpha: 1
    }, 350)
};
PauseWindow.prototype.hide = function() {
    createjs.Tween.get(this.sprite).to({
        alpha: 0
    }, 350);
    createjs.Tween.get(this.resumeButton.group).to({
        alpha: 0
    }, 350);
    createjs.Tween.get(this.backToMenuButton.group).to({
        alpha: 0
    }, 350)
};
PauseWindow.prototype.resumeClicked = function() {
    this.hide();
    gameScene.resume()
};
PauseWindow.prototype.backToMainMenu = function() {
    this.resumeButton.block = true;
    this.backToMenuButton.block = true;
    createjs.Tween.get(window.director).to({
        rectAlpha: 1
    }, 250, createjs.Ease.sineInOut).call(function() {
        createjs.Tween._tweens = [];
        window.director.nextScene = new MainMenu;
        createjs.Tween.get(window.director).to({
            rectAlpha: 0
        }, 500, createjs.Ease.sineInOut)
    })
};
var RotateScene = function() {
    this.init()
};
RotateScene.prototype.init = function() {
    window.rotateScene = this;
    this.rotateImage = new MLE.Sprite("rotate", MLE.width / 2, MLE.height / 2);
    this.rotateImage.scaleX = this.rotateImage.scaleY = 1.75;
    this.rotateImage.centerPivot()
};
RotateScene.prototype.update = function() {
    document.body.style["background-color"] = "#45357D"
};
RotateScene.prototype.draw = function() {
    MLE.context.fillStyle = "#45357D";
    MLE.context.fillRect(0, 0, MLE.width, MLE.height);
    this.rotateImage.draw()
};
var TestScene = function() {
    this.init()
};
TestScene.prototype.init = function() {
    this.befY = this.befX = this.currY = this.currX = 200;
    this.counter = 0;
    this.mainCircle = new MLE.CircleCollision({
        x: 300,
        y: 300
    }, 0, 0, 20);
    this.moveCircle = new MLE.CircleCollision({
        x: this.currX,
        y: this.currY
    }, 0, 0, 20);
    this.currPoint = new MLE.CircleCollision({
        x: 200,
        y: 200
    }, 0, 0, 5, "rgba(0,255,0,1)");
    this.befPoint = new MLE.CircleCollision({
        x: 200,
        y: 200
    }, 0, 0, 5, "rgba(255,0,0,1)");
    this.oPoint1 = new MLE.CircleCollision({
        x: 0,
        y: 0
    }, 0, 0, 5, "rgba(0,0,255,1)");
    this.oPoint2 = new MLE.CircleCollision({
        x: 0,
        y: 0
    }, 0, 0, 5, "rgba(0,0,255,1)");
    this.line = new MLE.LineCollision(100, 100, 500, 700)
};
TestScene.prototype.update = function() {
    MLE.mouse.pressed && (this.counter += 1);
    if (MLE.mouse.isDown && this.counter % 2 === 0) this.currX = MLE.mouse.x, this.currY = MLE.mouse.y;
    else if (MLE.mouse.isDown && this.counter % 2 !== 0) this.befX = MLE.mouse.x, this.befY = MLE.mouse.y;
    this.currPoint.sprite.x = this.currX;
    this.currPoint.sprite.y = this.currY;
    this.befPoint.sprite.x = this.befX;
    this.befPoint.sprite.y = this.befY;
    this.moveCircle.sprite.x = this.currX;
    this.moveCircle.sprite.y = this.currY;
    console.log(this.mainCircle.checkAgainstWithShift(this.moveCircle,
        this.befX, this.befY));
    this.mainCircle.checkAgainstWithPosCorrection(this.moveCircle, this.befX, this.befY);
    this.line.checkAgainstWithShift(this.moveCircle, this.befX, this.befY)
};
TestScene.prototype.draw = function() {
    this.mainCircle.drawDebug();
    this.moveCircle.drawDebug();
    this.currPoint.drawDebug();
    this.befPoint.drawDebug();
    this.line.drawDebug()
};

var isSmall, remote = {
        log: function() {}
    },
    monsterType = 1,
    windowOnload = function() {

    console.log(MU_Lang);
        window.currLang = window.languages[MU_Lang];
        MU_Hooks.setOrientationHandler(function() {});
        MU_Hooks.setResizeHandler(function() {});
        var a = (isSmall = false, "assets/media2");
        var b = isSmall ? "assets/preloaderSD" : "assets/preloaderHD";
        MLE.init({
            preManifest: [{
                src: "./" + b + "/logoWithoutRim.png",
                id: "logoWithoutRim"
            }, {
                src: "./" + b + "/eyeAnim.png",
                id: "eyeAnim"
            }, {
                src: "./" + b + "/loadingBar0.png",
                id: "loadingBar0"
            }, {
                src: "./" +
                    b + "/loadingBar1.png",
                id: "loadingBar1"
            }, {
                src: "./" + b + "/loadingTextAnim.png",
                id: "loadingTextAnim"
            }, {
                src: "./" + b + "/rotatePortrait.png",
                id: "rotate"
            }, {
                src: "./" + b + "/rim.png",
                id: "rim"
            }],
            preLoaderScene: PreLoaderScene,
            manifest: [{
                src: "ni7segnormal",
                isFaceFont: true
            }, {
                src: "./" + a + "/schein.png",
                id: "schein"
            }, {
                src: "./" + a + "/success.png",
                id: "success"
            }, {
                src: "./" + a + "/success2.png",
                id: "success2"
            }, {
                src: "./" + a + "/shadow.png",
                id: "shadow"
            }, {
                src: "./" + a + "/aimArrow.png",
                id: "aimArrow"
            }, {
                src: "./" + a + "/trash.png",
                id: "trash"
            }, {
                src: "./" +
                    a + "/00.png",
                id: "00"
            }, {
                src: "./" + a + "/01.png",
                id: "01"
            }, {
                src: "./" + a + "/02.png",
                id: "02"
            }, {
                src: "./" + a + "/03.png",
                id: "03"
            }, {
                src: "./" + a + "/04.png",
                id: "04"
            }, {
                src: "./" + a + "/05.png",
                id: "05"
            }, {
                src: "./" + a + "/06.png",
                id: "06"
            }, {
                src: "./" + a + "/07.png",
                id: "07"
            }, {
                src: "./" + a + "/08.png",
                id: "08"
            }, {
                src: "./" + a + "/09.png",
                id: "09"
            }, {
                src: "./" + a + "/gameBackground.jpg",
                id: "gameBackground"
            }, {
                src: "./" + a + "/gameBackground2.jpg",
                id: "gameBackground2"
            }, {
                src: "./" + a + "/gameBackground3.jpg",
                id: "gameBackground3"
            }, {
                src: "./" + a + "/splash.jpg",
                id: "splash"
            }, {
                src: "./" + a + "/paper.png",
                id: "paper"
            }, {
                src: "./" + a + "/wind.png",
                id: "wind"
            }, {
                src: "./" + a + "/block.png",
                id: "block"
            }, {
                src: "./" + a + "/goal.png",
                id: "goal"
            }, {
                src: "./" + a + "/goal2.png",
                id: "goal2"
            }, {
                src: "./" + a + "/goal3.png",
                id: "goal3"
            }, {
                src: "./" + a + "/box.png",
                id: "box"
            }, {
                src: "./" + a + "/pause_normal.png",
                id: "pause_normal"
            }, {
                src: "./" + a + "/pause_select.png",
                id: "pause_select"
            }, {
                src: "./" + a + "/button_normal.png",
                id: "button_normal"
            }, {
                src: "./" + a + "/button_select.png",
                id: "button_select"
            }, {
                src: "./" + a + "/popup.png",
                id: "popup"
            }, {
                src: "./" + a + "/front3.png",
                id: "front3"
            }],
            game: Director,
            height: 800,
            width: 528,
            scaling: true,
            showDebug: false
        })
    };
var getConst = function(a) {
    return a * MLE.width / 600
};
