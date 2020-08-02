declare const YT;

/**
 * YT.Playerをラップした関数
 * @class
 */
export default class YTP {
    /**
     * YT.Playerの準備が整ったかどうかフラグ
     * @static
     * @property
     */
    static isReady = false

    readyTimer
    player
    el
    id
    options

    /**
     * オプションを設定し、処理するための準備を行う
     * @param {Object} options 
     */
    constructor ({ id = 'ytplayer', options, timeout = 400}) {
        this.id = id
        this.options = Object.assign({
            width: 640,
            height: 390,
            videoId: '',
            playerVars: {
                host: 'https://www.youtube.com',
                rel: 0,               // 関連動画なし
                autoplay: 0,          // 自動再生あり
                loop: 0,              // ループ再生なし
                enablejsapi: 1,       // javascriptAPI有効
                disablekb: 0,         // キーボードショートカット無効
                egm: 0,               // 拡張ジニーメニュー無効
                border: 0,            // ボーダーなし
                start: 0,             // スタート秒0
                fs: 1,                // フルスクリーン有効
                hd: 1,                // HD再生有効
                showsearch: 0,        // 検索ボックス無効
                showinfo: 0,          // 動画情報無効
                iv_load_policy: 3,    // 動画アノテーション無効
                controls: 1,          // コントローラ表示有効
                wmode: 'transparent', // 重ね順不具合解消用
                vq: 'hd720'           // 720p再生
            },
            events: {
                onReady: function () {},                    // プレーヤーが読み込みを完了し、API呼び出しの受信を開始する準備ができると実行する
                onStateChange: function () {},              // プレーヤーの状態が変わると実行する
                onPlaybackQualityChange: function () {},    // 動画の再生画質が変わると実行する
                onPlaybackRateChange: function () {},       // 動画の再生速度が変わると実行する
                onError: function () {},                    // プレーヤーでエラーが発生すると実行します
                onApiChange: function () {},                // プレーヤーが直接的なAPIメソッドでモジュールを読み込んだ（または読み込み解除した）ことを示すために発行される
            }
        }, options)

        // 動画の準備
        this._ready()

        // タイムアウト設定がされている場合
        // onYouTubeIframeAPIReadyがうまく発火しなくても、一定時間後に強制的に発火させる
        if (timeout) {
            setTimeout(() => this._init(), timeout)
        }
    }

    /**
     * YT.Playerの準備ができたらインスタンスを生成する
     * @method
     */
    _ready () {
        this.readyTimer = setTimeout(() => {
            if (!YTP.isReady) {
                return false
            }
            this._init()
            clearTimeout(this.readyTimer)
        }, 100)
    }

    /**
     * YT.Playerのインスタンスを生成
     * @method
     */
    _init () {
        if (this.player) {
            return false
        }
        this.player = new YT.Player(this.id, this.options)
        this.el = document.querySelector(`#${this.id}`)
        YTP.isReady = true
    }

    // -------------------------------------------------------

    /**
     * 再生
     * @method
     */
    play () {
        this.player.playVideo()
    }

    /**
     * 一時停止
     * @method
     */
    pause () {
        this.player.pauseVideo()
    }

    /**
     * 停止
     * @method
     */
    stop () {
        this.player.stopVideo()
    }

    /**
     * 再生中は一時停止、再生中以外の場合は再生
     * @method
     */
    toggle () {
        if (this.player.getPlayerState() !== YT.PlayerState.PLAYING) {
            this.play()
        } else if (this.player.getPlayerState() === YT.PlayerState.PLAYING) {
            this.pause()
        }
    }

    /**
     * 頭から再生
     * @method
     */
    replay () {
        this.player.seekTo(0).playVideo()
    }

    /**
     * ビデオを設定
     * @method
     * @param {string} videoId 
     */
    loadVideoById (videoId) {
        this.player.loadVideoById(videoId)
        this.stop()
    }

    /**
     * ボリュームを設定
     * @method
     * @param {number} vol 
     */
    setVolume (vol) {
        this.player.setVolume(this.player.getVolume() + vol);
    }

    /**
     * シークバーの位置を設定
     * @method
     * @param {number} seek 
     */
    seekTo (seek) {
        this.player.seekTo(this.player.getCurrentTime() + seek);
    }

    /**
     * ミュートの場合はミュートを解除、ミュートじゃない場合はミュート
     * @method
     */
    mute () {
        if (this.player.isMuted()) {
            this.player.unMute()
        } else {
            this.player.mute()
        }
    }

    /**
     * シークタイムを取得
     * @method
     */
    getCurrentTime () {
        return this.player.getCurrentTime()
    }

    /**
     * 準備処理
     */
    static loadIframeAPI () {
        /**
         * TY.Playerが準備できたかどうかのフラグ
         * グローバルに設定しないといけないのでここで定義
         */
        window['onYouTubeIframeAPIReady'] = function () {
            YTP.isReady = true
        }

        /**
         * YT.Playerのライブラリを読み込む
         */
        const tag = document.createElement('script')
        tag.setAttribute('src', 'https://www.youtube.com/iframe_api')
        const firstScriptTag = document.getElementsByTagName('script')[0]
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
    }
}

YTP.loadIframeAPI();