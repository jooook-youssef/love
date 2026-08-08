/* =====================================================
   LOVE STORY - SINGLE PAGE
   ===================================================== */


/* ================= Elements ================= */

const music =
    document.getElementById("bgMusic");

const pages =
    document.querySelectorAll(".page");

const unlockButton =
    document.getElementById("unlockButton");

const password =
    document.getElementById("password");

const error =
    document.getElementById("error");


/* ================= Music ================= */

if (music) {

    music.volume = 0.5;

    music.loop = true;

}


/* ================= Show Page ================= */

function showPage(id) {

    pages.forEach(page => {

        page.classList.remove("active");

    });


    const target =
        document.getElementById(id);


    if (target) {

        target.classList.add("active");

    }


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* ================= Unlock ================= */

function unlock() {

    if (!password) return;


    const correctPassword =
        "love";


    if (
        password.value ===
        correctPassword
    ) {

        if (error) {

            error.textContent =
                "";

        }


        /*
         * يبدأ الصوت هنا لأن المستخدم
         * ضغط بنفسه على Unlock.
         */

        if (music) {

            music.currentTime = 0;

            music.play().catch(
                () => {}
            );

        }


        /*
         * الانتقال إلى Message
         */

        showPage(
            "messagePage"
        );


    } else {

        if (error) {

            error.textContent =
                "كلمة السر غير صحيحة 💔";

        }

    }

}


/* ================= Unlock Button ================= */

if (unlockButton) {

    unlockButton.addEventListener(
        "click",
        unlock
    );

}


/* ================= Enter Key ================= */

if (password) {

    password.addEventListener(
        "keydown",
        event => {

            if (
                event.key ===
                "Enter"
            ) {

                unlock();

            }

        }
    );

}


/* ================= Next Buttons ================= */

document
    .querySelectorAll(".next")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const next =
                    button.dataset.next;


                if (next) {

                    showPage(next);

                }

            }
        );

    });


/* ================= Music Button ================= */

function createMusicButton() {

    if (!music) return;


    const button =
        document.createElement(
            "button"
        );


    button.id =
        "musicButton";


    button.innerHTML =
        "🔊";


    button.title =
        "تشغيل / إيقاف الموسيقى";


    button.addEventListener(
        "click",
        () => {

            if (music.paused) {

                music.play().catch(
                    () => {}
                );

            } else {

                music.pause();

            }

        }
    );


    document.body.appendChild(
        button
    );


    music.addEventListener(
        "play",
        () => {

            button.innerHTML =
                "🔊";

        }
    );


    music.addEventListener(
        "pause",
        () => {

            button.innerHTML =
                "🎵";

        }
    );

}


/* ================= Floating Hearts ================= */

const hearts =
    document.getElementById(
        "hearts"
    );


function createHeart() {

    if (!hearts) return;


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
        Math.random() * 100 +
        "%";


    heart.style.fontSize =
        12 +
        Math.random() * 20 +
        "px";


    heart.style.animationDuration =
        7 +
        Math.random() * 7 +
        "s";


    hearts.appendChild(
        heart
    );


    setTimeout(
        () => {

            heart.remove();

        },
        15000
    );

}


setInterval(
    createHeart,
    600
);


for (
    let i = 0;
    i < 10;
    i++
) {

    setTimeout(
        createHeart,
        i * 150
    );

}


/* ================= Image Placeholder ================= */

document
    .querySelectorAll(".photo img")
    .forEach(img => {

        img.addEventListener(
            "error",
            () => {

                img.style.display =
                    "none";

            }
        );

    });


/* ================= Video Placeholder ================= */

const video =
    document.getElementById(
        "storyVideo"
    );

if (video) {

    video.addEventListener(
        "error",
        () => {

            video.style.display =
                "none";

        }
    );

}


/* ================= Start ================= */

createMusicButton();
