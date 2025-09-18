var playMusic = 0;

const bant = document.getElementById("bant");
const hero = document.getElementById("hero");
const title = document.getElementById("title");
const click = document.getElementById("play");
const playButton = document.getElementById("playButton");
const turn = document.getElementById("disc");
const convo = document.getElementById("convey");
const nextButton = document.getElementById("next");
const backButton = document.getElementById("back");
const range = document.getElementById("range");
const music = document.getElementById("audio");
const currentTime = document.getElementById("currentTime");
const musicDuration = document.getElementById("duration");



click.addEventListener("click", () => {
      
      if (playButton.className.includes("fa-play")) {
         
      playButton.classList.remove("fa-play");
       playButton.classList.add("fa-pause");
       music.play();
   } else{
    playButton.classList.remove("fa-pause");
      playButton.classList.add("fa-play");
        music.pause();
   }
 
   turn.classList.toggle("paused");
});


const startMusic = (i) => {
   range.value = 0;
   playMusic = i;
   let song = songs[i];
   title.textContent = song.song;
   bant.textContent = song.Artist;
   music.src = song.audio;
   hero.style.backgroundImage = `url('${song.background}')`;
   turn.style.backgroundImage =  `url('${song.cover}')`;

   music.onloadedmetadata = () => {
      range.max = music.duration;
      musicDuration.innerHTML = simplify(music.duration);
   }
}


startMusic(0);


 function simplify(time) {
   let min = Math.floor(time/60);
   if(min < 10) {
      min = `0${min}`;
      }
   let sec = Math.floor(time % 60);
   if (sec < 10) {
      sec = `0${sec}`;
   }
   
   return `${min} : ${sec}` ;
 }

 
 setInterval(() => {
   range.value = music.currentTime;
   currentTime.innerHTML = simplify(music.currentTime);
  
}, 500);
 
 range.addEventListener("change", () => {
     music.currentTime = range.value;
 });

 function forcePlay() {
   music.play();
   playButton.classList.remove("fa-play");
   playButton.classList.add("fa-pause");
   turn.classList.add("paused");
  }

  const next = () => {
        if(playMusic >= songs.length - 1) {
         playMusic = 0;
      } else {
         playMusic++;
      }

      startMusic(playMusic);
      forcePlay();
  }

  nextButton.addEventListener("click", () => {
     
      next();

     });

  const previous = () => {
       if(playMusic <= 0) {
         playMusic = songs.length - 1;
      } else {
         playMusic--;
      }

      startMusic(playMusic);
       forcePlay();
  }

  backButton.addEventListener("click", () => {
     previous();
  });

   music.addEventListener("ended", () => {

      nextButton.click();

   });