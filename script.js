/* =====================================================
   Love Story Website
   Main JavaScript
   ===================================================== */


/* =====================================================
   Music System
   ===================================================== */

const MUSIC_FILE = "assets/music/song.mp3";

let music = null;


/* -----------------------------------------------------
   Create Music Player
   ----------------------------------------------------- */

function createMusicPlayer() {

    if (document.getElementById("bgMusic")) {
        music = document.getElementById("bgMusic");
    } else {

        music = document.createElement("audio");

        music.id = "bgMusic";
        music.src = MUSIC_FILE;

        music.preload = "auto";

        music.loop = true;

        music.volume = 0.5;

        music.style.display = "none";

        document.body.appendChild(music);
    }

}


/* -----------------------------------------------------
   Save Music Position
   ----------------------------------------------------- */

function saveMusicPosition() {

    if (!music) return;

    try {

        localStorage.setItem(
            "musicTime",
            music.currentTime
        );

        localStorage.setItem(
            "musicPlaying",
            music.paused ? "false" : "true"
        );

    } catch (error) {

        console.log(
            "Could not save music position."
        );

    }

}


/* -----------------------------------------------------
   Restore Music Position
   ----------------------------------------------------- */

function restoreMusicPosition() {

    if (!music) return;

    const savedTime =
        localStorage.getItem("musicTime");

    if (savedTime !== null) {

        const time =
            parseFloat(savedTime);

        if (!isNaN(time)) {

            music.addEventListener(
                "loadedmetadata",
                function restoreTime() {

                    if (
                        time >= 0 &&
                        time < music.duration
                    ) {

                        music.currentTime = time;

                    }

                    music.removeEventListener(
                        "loadedmetadata",
                        restoreTime
                    );

                }
            );

        }

    }

}


/* -----------------------------------------------------
   Start Music
   ----------------------------------------------------- */

function startMusic() {

    if (!music) return;

    music.volume = 0.5;

    const playPromise =
        music.play();

    if (
        playPromise !== undefined
    ) {

        playPromise.catch(
            function () {

                console.log(
                    "Music playback requires user interaction."
                );

            }
        );

    }

}


/* -----------------------------------------------------
   Toggle Music
   ----------------------------------------------------- */

function toggleMusic() {

    if (!music) return;

    if (music.paused) {

        startMusic();

    } else {

        music.pause();

    }

}


/* -----------------------------------------------------
   Music Button
   ----------------------------------------------------- */

function createMusicButton() {

    if (
        document.getElementById(
            "musicButton"
        )
    ) {
        return;
    }


    const button =
        document.createElement("button");

    button.id =
        "musicButton";

    button.type =
        "button";

    button.innerHTML =
        "🎵";

    button.title =
        "تشغيل / إيقاف الموسيقى";


    button.style.position =
        "fixed";

    button.style.bottom =
        "20px";

    button.style.left =
        "20px";

    button.style.width =
        "52px";

    button.style.height =
        "52px";

    button.style.border =
        "none";

    button.style.borderRadius =
        "50%";

    button.style.background =
        "linear-gradient(135deg,#f28caf,#e05283)";

    button.style.color =
        "#ffffff";

    button.style.fontSize =
        "22px";

    button.style.cursor =
        "pointer";

    button.style.zIndex =
        "9999";

    button.style.boxShadow =
        "0 8px 25px rgba(224,82,131,.30)";


    button.addEventListener(
        "click",
        function () {

            toggleMusic();

        }
    );


    document.body.appendChild(button);

}


/* -----------------------------------------------------
   Update Music Button
   ----------------------------------------------------- */

function updateMusicButton() {

    const button =
        document.getElementById(
            "musicButton"
        );

    if (!button || !music) return;


    if (music.paused) {

        button.innerHTML =
            "🎵";

        button.style.opacity =
            "0.75";

    } else {

        button.innerHTML =
            "🔊";

        button.style.opacity =
            "1";

    }

}


/* -----------------------------------------------------
   Music Events
   ----------------------------------------------------- */

function setupMusicEvents() {

    if (!music) return;


    music.addEventListener(
        "play",
        updateMusicButton
    );


    music.addEventListener(
        "pause",
        function () {

            updateMusicButton();

            saveMusicPosition();

        }
    );


    music.addEventListener(
        "timeupdate",
        function () {

            /*
             * Save approximately every
             * few seconds.
             */

            const now =
                Date.now();

            if (
                !window.lastMusicSave ||
                now -
                window.lastMusicSave >
                3000
            ) {

                saveMusicPosition();

                window.lastMusicSave =
                    now;

            }

        }
    );


    music.addEventListener(
        "ended",
        function () {

            localStorage.setItem(
                "musicTime",
                "0"
            );

        }
    );

}


/* =====================================================
   Unlock System
   ===================================================== */

function unlock() {

    const input =
        document.getElementById(
            "password"
        );

    const error =
        document.getElementById(
            "error"
        );


    /*
     * غيّر كلمة السر هنا
     */

    const correctPassword =
        "1234";


    if (
        input &&
        input.value ===
        correctPassword
    ) {

        sessionStorage.setItem(
            "unlocked",
            "yes"
        );


        /*
         * يبدأ تشغيل الأغنية
         * بعد تفاعل المستخدم.
         */

        if (music) {

            music.currentTime = 0;

            startMusic();

        }


        /*
         * الانتقال للصفحة التالية
         */

        setTimeout(
            function () {

                window.location.href =
                    "intro.html";

            },
            250
        );


    } else {

        if (error) {

            error.textContent =
                "كلمة السر غير صحيحة 💔";

        }

    }

}


/* =====================================================
   Protect Pages
   ===================================================== */

function checkUnlock() {

    const currentPage =
        window.location.pathname
        .split("/")
        .pop();


    /*
     * الصفحات التي لا تحتاج
     * إلى تحقق.
     */

    const publicPages = [
        "",
        "index.html"
    ];


    if (
        publicPages.includes(
            currentPage
        )
    ) {

        return;

    }


    const unlocked =
        sessionStorage.getItem(
            "unlocked"
        );


    /*
     * لو حاول الدخول إلى
     * الصفحات مباشرة بدون Unlock
     */

    if (
        unlocked !== "yes"
    ) {

        window.location.href =
            "index.html";

    }

}


/* =====================================================
   Save Music Before Leaving Page
   ===================================================== */

window.addEventListener(
    "beforeunload",
    function () {

        saveMusicPosition();

    }
);


/* =====================================================
   Floating Hearts
   ===================================================== */

function createFloatingHearts() {

    const container =
        document.getElementById(
            "hearts"
        );


    if (!container) return;


    function createHeart() {

        const heart =
            document.createElement(
                "span"
            );


        heart.className =
            "heart";


        const symbols = [
            "♥",
            "❤",
            "♡",
            "💗"
        ];


        heart.textContent =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];


        heart.style.left =
            Math.random() *
            100 +
            "%";


        heart.style.fontSize =
            12 +
            Math.random() *
            20 +
            "px";


        heart.style.animationDuration =
            7 +
            Math.random() *
            7 +
            "s";


        container.appendChild(
            heart
        );


        setTimeout(
            function () {

                heart.remove();

            },
            15000
        );

    }


    setInterval(
        createHeart,
        550
    );


    for (
        let i = 0;
        i < 12;
        i++
    ) {

        setTimeout(
            createHeart,
            i * 120
        );

    }

}


/* =====================================================
   Initialize Website
   ===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        /*
         * إنشاء الموسيقى
         */

        createMusicPlayer();


        /*
         * استرجاع مكان الأغنية
         */

        restoreMusicPosition();


        /*
         * أحداث الموسيقى
         */

        setupMusicEvents();


        /*
         * زر الموسيقى
         */

        createMusicButton();


        /*
         * تحديث حالة الزر
         */

        updateMusicButton();


        /*
         * حماية الصفحات
         */

        checkUnlock();


        /*
         * القلوب المتحركة
         */

        createFloatingHearts();

    }
);
