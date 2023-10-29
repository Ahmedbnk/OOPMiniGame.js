const furyDom = document.querySelector(".fury-elements");
const ngannouDom = document.querySelector(".ngannou-elements");
const furyIsDeadDom = document.querySelector(".fury-is-dead");
const ngannouIsDeadDom = document.querySelector(".ngannou-is-dead");
const furyprogress = document.querySelector(".fury-health span");
const ngannouprogress = document.querySelector(".ngannou-health span");
const furyAttackBtn = document.getElementById("fury-attack");
const furyHealthBtn = document.getElementById("fury-healthing");
const ngannouAttackBtn = document.getElementById("ngannou-attack");
const ngannouHealthBtn = document.getElementById("ngannou-healthing");

const attackSound = document.getElementById("attack-sound");
const healSound = document.getElementById("heal-sound");
const victorySoundFury = document.getElementById("victory-sound-fury");
const victorySoundNgannou = document.getElementById("victory-sound-ngannou");
const victorySound = document.getElementById("victory-sound");
const defeatSound = document.getElementById("defeat-sound");

class Character {
  constructor(name, strength, recovery, health) {
    this.name = name;
    this.strength = strength;
    this.health = health;
    this.recovery = recovery;
  }

  attack(opponent) {
    if (opponent.health > 0) {
      opponent.health -= this.strength;
      attackSound.play();
    }
  }

  status() {
    if (this.health < 50) {
      return "bad health";
    } else if (this.health < 70) {
      return "medium health";
    } else {
      return "good health";
    }
  }

  healing() {
    if (this.health < 100 && this.health !== 0) {
      this.health += this.recovery;
      healSound.play();
    }
  }
}

const fury = new Character("Fury", 20, 10, 100);
const ngannou = new Character("Ngannou", 20, 10, 100);

ngannouprogress.textContent = ngannou.health;
furyprogress.textContent = fury.health;

function checkGameStatus() {
  if (fury.health <= 0) {
    ngannouDom.style.background = "green";
    furyDom.style.background = "#ff1b1b";
    ngannouIsDeadDom.textContent = "Ngannou is the Winner";
    victorySoundNgannou.play();
    victorySound.play();
  } else if (ngannou.health <= 0) {
    furyDom.style.background = "green";
    ngannouDom.style.background = "#ff1b1b";
    furyIsDeadDom.textContent = "Fury is the Winner";
    victorySoundFury.play();
    victorySound.play();
  }
}

furyAttackBtn.addEventListener("click", () => {
  if (fury.health !== 0) {
    fury.attack(ngannou);
    ngannouprogress.style.width = `${ngannou.health}%`;
    ngannouprogress.textContent = ngannou.health;

    checkGameStatus();
  }
});

ngannouAttackBtn.addEventListener("click", () => {
  if (ngannou.health !== 0) {
    ngannou.attack(fury);
    furyprogress.style.width = `${fury.health}%`;
    furyprogress.textContent = fury.health;
    checkGameStatus();
  }
});

furyHealthBtn.addEventListener("click", () => {
  if (ngannou.health !== 0) {
    fury.healing();
    furyprogress.style.width = `${fury.health}%`;
    furyprogress.style.maxWidth = "100%";
    furyprogress.textContent = fury.health;
  }
});

ngannouHealthBtn.addEventListener("click", () => {
  if (fury.health !== 0) {
    ngannou.healing();
    ngannouprogress.style.width = `${ngannou.health}%`;
    ngannouprogress.textContent = ngannou.health;
  }
});
