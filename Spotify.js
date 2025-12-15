

//to get current song
let currentSong = new Audio();
let songs;
let currFolder;
let currentIndex = -1;

const pauseSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="25" height="25" color="white" fill="none" stroke="white" stroke-width="1.5">
    <path d="M4 7C4 5.58579 4 4.87868 4.43934 4.43934C4.87868 4 5.58579 4 7 4C8.41421 4 9.12132 4 9.56066 4.43934C10 4.87868 10 5.58579 10 7V17C10 18.4142 10 19.1213 9.56066 19.5607C9.12132 20 8.41421 20 7 20C5.58579 20 4.87868 20 4.43934 19.5607C4 19.1213 4 18.4142 4 17V7Z" />
    <path d="M14 7C14 5.58579 14 4.87868 14.4393 4.43934C14.8787 4 15.5858 4 17 4C18.4142 4 19.1213 4 19.5607 4.43934C20 4.87868 20 5.58579 20 7V17C20 18.4142 20 19.1213 19.5607 19.5607C19.1213 20 18.4142 20 17 20C15.5858 20 14.8787 20 14.4393 19.5607C14 19.1213 14 18.4142 14 17V7Z" />
</svg>`;

// svg of pause button after play clicked 
const playSVG = ` <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
                                color="#000000" fill="none" stroke="white" stroke-width="1.5">
                                <circle cx="12" cy="12" r="10" />
                                <path
                                    d="M9.5 11.1998V12.8002C9.5 14.3195 9.5 15.0791 9.95576 15.3862C10.4115 15.6932 11.0348 15.3535 12.2815 14.6741L13.7497 13.8738C15.2499 13.0562 16 12.6474 16 12C16 11.3526 15.2499 10.9438 13.7497 10.1262L12.2815 9.32594C11.0348 8.6465 10.4115 8.30678 9.95576 8.61382C9.5 8.92086 9.5 9.6805 9.5 11.1998Z"
                                    fill="currentColor" />
                            </svg>`;

// svg of mute button 
const muteSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M22 22L2 2" />
    <path d="M17 10C17.6296 10.7667 18 11.7054 18 12.7195C18 13.1635 17.929 13.593 17.7963 14" />
    <path d="M20 8C21.2508 9.22951 22 10.7952 22 12.5C22 13.9164 21.4829 15.2367 20.5906 16.348" />
    <path d="M14 14C14 17.1452 14 19.5313 13.074 19.9227C12.1481 20.3141 11.0583 19.2021 8.8787 16.9781C7.7499 15.8264 7.106 15.5713 5.5 15.5713C4.3879 15.5713 3.02749 15.7187 2.33706 14.6643C2 14.1496 2 13.4331 2 12C2 10.5669 2 9.85038 2.33706 9.33566C3.02749 8.28131 4.3879 8.42869 5.5 8.42869C6.60725 8.42869 7.3569 8.43869 7.96 7.96M14 9.5C14 6.3548 14.026 4.46866 13.1 4.0773C12.3292 3.75147 11.5323 4.46765 10 6" />
</svg>`

const volumeSVG = `<svg class="volbtn" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
                                color="white" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round"
                                stroke-linejoin="round">
                                <path
                                    d="M14 14.8135V9.18646C14 6.04126 14 4.46866 13.0747 4.0773C12.1494 3.68593 11.0603 4.79793 8.88232 7.02192C7.75439 8.17365 7.11085 8.42869 5.50604 8.42869C4.10257 8.42869 3.40084 8.42869 2.89675 8.77262C1.85035 9.48655 2.00852 10.882 2.00852 12C2.00852 13.118 1.85035 14.5134 2.89675 15.2274C3.40084 15.5713 4.10257 15.5713 5.50604 15.5713C7.11085 15.5713 7.75439 15.8264 8.88232 16.9781C11.0603 19.2021 12.1494 20.3141 13.0747 19.9227C14 19.5313 14 17.9587 14 14.8135Z" />
                                <path d="M17 9C17.6254 9.81968 18 10.8634 18 12C18 13.1366 17.6254 14.1803 17 15" />
                                <path d="M20 7C21.2508 8.36613 22 10.1057 22 12C22 13.8943 21.2508 15.6339 20 17" />
                            </svg>`

//function to show the current time and duration of the song
function secondsToMinutesSeconds(secounds) {
    if (isNaN(secounds) || secounds < 0) {
        return "Invalid input";
    }

    const minutes = Math.floor(secounds / 60);
    const remainingSecounds = Math.floor(secounds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSecounds = String(remainingSecounds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSecounds}`;
}

console.log("this is java script for spotify clone");

async function getSongs(folder) {
    currFolder = folder;

    let a = await fetch(`http://127.0.0.1:3000/project/${folder}/`);
    let response = await a.text();
    let div = document.createElement("div")
    div.innerHTML = response;

    let doc = new DOMParser().parseFromString(response, "text/html");
    let links = [...doc.querySelectorAll("a")];

    songs = [];

    for (let link of links) {
        let name = link.textContent.trim();

        if (name.endsWith(".mp3")) {
            songs.push(`http://127.0.0.1:3000/project/${folder}/` + name);
        }
    }

    //show all the songs in the playlist
    let songUL = document.querySelector(".songlist").getElementsByTagName("ul")[0];
    songUL.innerHTML = ""

    songs.forEach(song => {
        let fileName = song.split("/").pop();

        songUL.insertAdjacentHTML("beforeend", `<li data-src="${song}">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30"
                                color="white" fill="none" stroke="currentColor" stroke-width="1.5"
                                >
                                <circle cx="6.5" cy="18.5" r="3.5" />
                                <circle cx="18" cy="16" r="3" />
                                <path
                                    d="M10 18.5L10 7C10 6.07655 10 5.61483 10.2635 5.32794C10.5269 5.04106 11.0175 4.9992 11.9986 4.91549C16.022 4.57222 18.909 3.26005 20.3553 2.40978C20.6508 2.236 20.7986 2.14912 20.8993 2.20672C21 2.26432 21 2.4315 21 2.76587V16" />
                                <path d="M10 10C15.8667 10 19.7778 7.66667 21 7" />
                            </svg>

                            

                            <div class="info">
                                <div>${fileName.replaceAll(".mp3", " ")}</div>                           
                                <div> Music </div>
                            </div>

                            <div class="playnow">
                                <div>Play Now</div>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30"
                                    color="white" fill="none" stroke="currentColor" stroke-width="1.5"
                                    style="padding: 8px 0;">
                                    <circle cx="12" cy="12" r="10" />
                                    <path
                                        d="M9.5 11.1998V12.8002C9.5 14.3195 9.5 15.0791 9.95576 15.3862C10.4115 15.6932 11.0348 15.3535 12.2815 14.6741L13.7497 13.8738C15.2499 13.0562 16 12.6474 16 12C16 11.3526 15.2499 10.9438 13.7497 10.1262L12.2815 9.32594C11.0348 8.6465 10.4115 8.30678 9.95576 8.61382C9.5 8.92086 9.5 9.6805 9.5 11.1998Z"
                                        fill="currentColor" />
                                </svg>
                        </li>`);
    });

    //attach an event listener to each song
    document.querySelectorAll(".songlist ul li").forEach(li => {
        li.addEventListener("click", () => {
            // let src = li.getAttribute("data-src");
            playMusic(li.dataset.src);
            console.log("Playing =>", li.dataset.src);

            if (currentSong.play) {
                play.innerHTML = pauseSVG;
            }
        });
    });

    return songs;
}

const playMusic = (src, pause = false) => {
    // let audio = new Audio(src);
    currentSong.src = src;

    // Keep currentIndex in sync (match by full URL or filename)
    const file = src.split("/").pop();
    currentIndex = songs.findIndex(s => s.endsWith(file) && s.includes(currFolder));


    if (!pause) {
        currentSong.play();
        play.innerHTML = pauseSVG;
    }

    else {
        currentSong.pause();
        play.innerHTML = playSVG;
    }

    document.querySelector(".songinfo").innerHTML = file.replace(".mp3", " ");;
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00";

}

async function displayAlbums() {

    const cardContainer = document.querySelector(".cardContainer");

    const res = await fetch("http://127.0.0.1:3000/project/Songs/");
    const html = await res.text();

    const div = document.createElement("div");
    div.innerHTML = html;

    const anchors = [...div.querySelectorAll("a")]
        .map(a => a.getAttribute("href"))
        .filter(href => href && href !== "../" && href.endsWith("/"))
    for (const href of anchors) {

        const folderName = decodeURIComponent(href)
            .split("\\")
            .pop()
            .replace("/", "");

        // get th metadata of the folder
        const res = await fetch(`http://127.0.0.1:3000/project/Songs/${folderName}/info.json`);
        const html = await res.json();
        console.log(html);
        console.log(folderName);
        cardContainer.innerHTML = cardContainer.innerHTML + `<div class="card" data-folder="${folderName}">
                    <div class="play">
                        <svg width="25" height="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 20V4L19 12L5 20Z" stroke="#000" fill="#000" stroke-width="1.5"
                                stroke-linejoin="round" />
                        </svg>
                    </div>
                    <img src="/project/Songs/${folderName}/${html.cover}" alt=""
                        style="filter: brightness(1) contrast(1);">
                    <h2>${html.title}</h2>
                    <p>${html.description}</p>
                </div>`;
    };

    // load the playlist whenever card is clicked
    Array.from(document.getElementsByClassName("card")).forEach(e => {
        e.addEventListener("click", async item => {
            console.log("Loading folder:", item.currentTarget.dataset.folder);
            songs = await getSongs(`Songs/${item.currentTarget.dataset.folder}`)
            playMusic(songs[0]);
        });
    });


};

displayAlbums()

async function main() {

    // get all list of all the song 
    songs = await getSongs("Songs/love");
    playMusic(songs[3], true)

    // show all the songs in the playlist
    if (!songs || songs.length === 0) {
        console.error("No songs found. Check directory or server.");
        return;
    }

    //display all the albums on the page

    // attach an listener to play next and previous
    play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play()
            play.innerHTML = pauseSVG;
        }
        else {
            currentSong.pause()
            play.innerHTML = playSVG;

        }
    })

    //listen for timeupdate event
    currentSong.addEventListener("timeupdate", () => {
        // console.log(currentSong.currentTime, currentSong.duration);

        document.querySelector(".songtime").innerHTML =
            `${secondsToMinutesSeconds(currentSong.currentTime)}/${secondsToMinutesSeconds(currentSong.duration)}`;

        document.querySelector(".circle").style.left =
            (currentSong.currentTime / currentSong.duration) * 100 + "%";
    })

    document.querySelector(".seekbar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100
        document.querySelector(".circle").style.left = percent + "%";
        currentSong.currentTime = ((currentSong.duration) * percent) / 100;
    })

    //add an event listener for hamburger
    document.querySelector(".humbuger").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0";
    })

    //add an event listener for closing the hamburger
    document.querySelector(".cancel").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-100%";
    })

    // add an event listener to previous
    previous.addEventListener("click", () => {
        currentSong.pause();
        console.log("previous clicked");

        if (currentIndex === -1) {
            // fallback: try to resolve index from current src
            const file = currentSong.src.split("/").pop();
            currentIndex = songs.findIndex(s => s.endsWith(file));
            if (currentIndex === -1) return; // nothing to do if still unknown
        }

        currentIndex = (currentIndex - 1 + songs.length) % songs.length; // wrap-around
        playMusic(songs[currentIndex]);

    })

    // add an event listener to next
    next.addEventListener("click", () => {
        currentSong.pause()
        console.log("next clicked");

        if (currentIndex === -1) {
            // fallback: try to resolve index from current src
            const file = currentSong.src.split("/").pop();
            currentIndex = songs.findIndex(s => s.endsWith(file));
            if (currentIndex === -1) return;
        }

        currentIndex = (currentIndex + 1) % songs.length; // wrap-around
        playMusic(songs[currentIndex]);

    })

    document.querySelector(".volume").addEventListener("dblclick", () => {
        const rang = document.querySelector(".rang");
        if (rang.style.display === "none" || rang.style.display === "") {
            rang.style.display = "block";
        } else {
            rang.style.display = "none";
        }
    });

    //add event listener to mute the track
    let isMuted = false;
    document.querySelector(".volbtn").addEventListener("click", () => {
        isMuted = !isMuted;

        if (isMuted) {
            document.querySelector(".volbtn").innerHTML = muteSVG;
            currentSong.volume = 0;
            document.querySelector(".rang").getElementsByTagName("input")[0].value = "0";
        }
        else {
            document.querySelector(".volbtn").innerHTML = volumeSVG;
            currentSong.volume = 0.10;
            document.querySelector(".rang").getElementsByTagName("input")[0].value = "10";
        }
    })

    // add an event to volume
    document.querySelector(".rang").getElementsByTagName("input")[0].addEventListener("change", (e) => {
        console.log("setting volume to", e.target.value, "/100")
        currentSong.volume = parseInt(e.target.value) / 100;  
    })

}


main();

