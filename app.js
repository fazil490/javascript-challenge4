const fname = document.getElementById("first-name");
const lname = document.getElementById("last-name");
const country = document.getElementById("country");
const score = document.getElementById("score");
const error = document.getElementById("error");
const inputForm = document.getElementById("input-form");
const players = document.getElementById("players-sec");

let playerData = [
  {
    firstName: "mohamed",
    lastName: "ismail fazil",
    countryName: "india",
    playerScore: 56,
  },
  {
    firstName: "mohamed",
    lastName: "nadeem",
    countryName: "india",
    playerScore: 77,
  },
  {
    firstName: "fahd",
    lastName: "sn",
    countryName: "india",
    playerScore: 23,
  },
];
updatePlayerData();

window.addEventListener("load", () => {
  const storedData = JSON.parse(localStorage.getItem("playerData"));
  if (storedData) {
    playerData = storedData;
    updatePlayerData();
  }
});

inputForm.addEventListener("submit", function (event) {
  event.preventDefault();
  if (!fname.value || !lname.value || !country.value || !score.value) {
    error.style.display = "block";
  } else {
    error.innerText = "Player data added.";
    error.style.color = "green";
    error.style.display = "block";

    playerData.push({
      firstName: fname.value,
      lastName: lname.value,
      countryName: country.value,
      playerScore: score.value,
    });

    savePlayerData();
    updatePlayerData();

    fname.value = "";
    lname.value = "";
    country.value = "";
    score.value = "";

    setTimeout(() => {
      error.innerText = "All fields are required.";
      error.style.color = "red";
      error.style.display = "none";
    }, 2000);
  }
});

function savePlayerData() {
  localStorage.setItem("playerData", JSON.stringify(playerData));
}

function updatePlayerData() {
  playerData.sort((a, b) => b.playerScore - a.playerScore);
  players.innerHTML = "";
  playerData.map((details, index) => {
    const playerDiv = document.createElement("div");
    playerDiv.className = "player-div";

    const playerDetails = document.createElement("div");
    playerDetails.className = "player-details";
    const playerName = document.createElement("p");
    playerName.className = "player-name";
    playerName.innerText =
      details.firstName.toUpperCase() + " " + details.lastName.toUpperCase();
    const playerCountry = document.createElement("p");
    playerCountry.className = "player-country";
    playerCountry.innerText = details.countryName.toUpperCase();
    const score = document.createElement("p");
    score.className = "player-score";
    score.innerText = details.playerScore;

    const editBtns = document.createElement("div");
    editBtns.className = "edit-btns";
    const delBtn = document.createElement("div");
    delBtn.className = "del-btn";
    delBtn.innerText = "Del";
    const plusFiveBtn = document.createElement("div");
    plusFiveBtn.className = "plus-five-btn";
    plusFiveBtn.innerText = "+5";
    const minusFiveBtn = document.createElement("div");
    minusFiveBtn.className = "minus-five-btn";
    minusFiveBtn.innerText = "-5";

    playerDiv.appendChild(playerDetails);
    playerDetails.appendChild(playerName);
    playerDetails.appendChild(playerCountry);
    playerDetails.appendChild(score);
    playerDiv.appendChild(editBtns);
    editBtns.appendChild(delBtn);
    editBtns.appendChild(plusFiveBtn);
    editBtns.appendChild(minusFiveBtn);
    players.appendChild(playerDiv);

    delBtn.addEventListener("click", () => {
      playerData.splice(index, 1);
      savePlayerData();
      updatePlayerData();
    });
    plusFiveBtn.addEventListener("click", () => {
      playerData[index].playerScore =
        parseInt(playerData[index].playerScore) + 5;
      savePlayerData();
      updatePlayerData();
    });
    minusFiveBtn.addEventListener("click", () => {
      playerData[index].playerScore =
        parseInt(playerData[index].playerScore) - 5;
      savePlayerData();
      updatePlayerData();
    });
  });
}
