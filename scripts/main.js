const state = {
  view: {
    squares: document.querySelectorAll(".square"),
    enemy: document.querySelector(".enemy"),
    time: document.querySelector("#tempo"),
    pontos: document.querySelector("#pontos"),
  },
  values: {
    timerId: null,
    gameVelo: 1000,
    hitPos: 0,
    result: 0,
    currentTime: 60,
    countDownId: setInterval(count, 1000),
  },
};

function count() {
  state.values.currentTime--;
  state.view.time.textContent = state.values.currentTime;

  if (state.values.currentTime <= 0) {
    clearInterval(state.values.timerId);
    clearInterval(state.values.countDownId);
    alert(`Game Over Você Fez ${state.values.result} Pontos.`);
  }
}

function playSound() {
  const audio = new Audio("../audios/hit.m4a");
  audio.volume = 0.1;
  audio.play();
}

function randomSquare() {
  state.view.squares.forEach((square) => {
    square.classList.remove("enemy");
  });
  let randNum = Math.floor(Math.random() * 9);
  let randSqaure = state.view.squares[randNum];
  randSqaure.classList.add("enemy");

  state.values.hitPos = randSqaure.id;
}

const moveEnemy = () =>
  (state.values.timerId = setInterval(randomSquare, state.values.gameVelo));

function hitBox() {
  state.view.squares.forEach((square) => {
    square.addEventListener("mousedown", () => {
      if (square.id === state.values.hitPos) {
        state.values.result++;
        state.view.pontos.textContent = state.values.result;
        state.values.hitPos = null;
        playSound();
      }
    });
  });
}

function iniciar() {
  moveEnemy();
  hitBox();
}

iniciar();
