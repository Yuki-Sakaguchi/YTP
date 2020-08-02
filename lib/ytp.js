(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.YTP = factory());
}(this, (function () { 'use strict';

    var YTP = (function () {
        function YTP(_a) {
            var _this = this;
            var _b = _a.id, id = _b === void 0 ? 'ytplayer' : _b, options = _a.options, _c = _a.timeout, timeout = _c === void 0 ? 400 : _c;
            this.id = id;
            this.options = Object.assign({
                width: 640,
                height: 390,
                videoId: '',
                playerVars: {
                    host: 'https://www.youtube.com',
                    rel: 0,
                    autoplay: 0,
                    loop: 0,
                    enablejsapi: 1,
                    disablekb: 0,
                    egm: 0,
                    border: 0,
                    start: 0,
                    fs: 1,
                    hd: 1,
                    showsearch: 0,
                    showinfo: 0,
                    iv_load_policy: 3,
                    controls: 1,
                    wmode: 'transparent',
                    vq: 'hd720'
                },
                events: {
                    onReady: function () { },
                    onStateChange: function () { },
                    onPlaybackQualityChange: function () { },
                    onPlaybackRateChange: function () { },
                    onError: function () { },
                    onApiChange: function () { },
                }
            }, options);
            this._ready();
            if (timeout) {
                setTimeout(function () { return _this._init(); }, timeout);
            }
        }
        YTP.prototype._ready = function () {
            var _this = this;
            this.readyTimer = setTimeout(function () {
                if (!YTP.isReady) {
                    return false;
                }
                _this._init();
                clearTimeout(_this.readyTimer);
            }, 100);
        };
        YTP.prototype._init = function () {
            if (this.player) {
                return false;
            }
            this.player = new YT.Player(this.id, this.options);
            this.el = document.querySelector("#" + this.id);
            YTP.isReady = true;
        };
        YTP.prototype.play = function () {
            this.player.playVideo();
        };
        YTP.prototype.pause = function () {
            this.player.pauseVideo();
        };
        YTP.prototype.stop = function () {
            this.player.stopVideo();
        };
        YTP.prototype.toggle = function () {
            if (this.player.getPlayerState() !== YT.PlayerState.PLAYING) {
                this.play();
            }
            else if (this.player.getPlayerState() === YT.PlayerState.PLAYING) {
                this.pause();
            }
        };
        YTP.prototype.replay = function () {
            this.player.seekTo(0).playVideo();
        };
        YTP.prototype.loadVideoById = function (videoId) {
            this.player.loadVideoById(videoId);
            this.stop();
        };
        YTP.prototype.setVolume = function (vol) {
            this.player.setVolume(this.player.getVolume() + vol);
        };
        YTP.prototype.seekTo = function (seek) {
            this.player.seekTo(this.player.getCurrentTime() + seek);
        };
        YTP.prototype.mute = function () {
            if (this.player.isMuted()) {
                this.player.unMute();
            }
            else {
                this.player.mute();
            }
        };
        YTP.prototype.getCurrentTime = function () {
            return this.player.getCurrentTime();
        };
        YTP.loadIframeAPI = function () {
            window['onYouTubeIframeAPIReady'] = function () {
                YTP.isReady = true;
            };
            var tag = document.createElement('script');
            tag.setAttribute('src', 'https://www.youtube.com/iframe_api');
            var firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        };
        YTP.isReady = false;
        return YTP;
    }());
    YTP.loadIframeAPI();

    return YTP;

})));
