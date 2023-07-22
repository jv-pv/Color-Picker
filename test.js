const formEl = document.querySelector("form");
const colorPicker = document.getElementById("color-picker");
const colorModes = document.getElementById("color-modes");
const colorCount = document.querySelector('input[type="number"]');
const copyModal = document.querySelector(".copy-msg");
const headerText = document.querySelector("header :is(h1, a)");
const header = document.querySelector("header");
let baseFetchURL =
  "https://www.thecolorapi.com/scheme?hex=000000&mode=monochromatic&count=6";

let fetchedColorsArr = [];

formEl.addEventListener("submit", (e) => {
  e.preventDefault();

  fetchedColorsArr.length = 0;

  let colorPickerValue = colorPicker.value;
  let colorModesValue = colorModes.value;
  let colorCountValue = colorCount.value;

  let hexValueNoHash = colorPickerValue.substring(1);

  baseFetchURL = `https://www.thecolorapi.com/scheme?hex=${hexValueNoHash}&mode=${colorModesValue}&count=${colorCountValue}`;

  fetchColors();
});

function fetchColors() {
  fetch(baseFetchURL)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network Response not okay");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);

      let colorsArr = data.colors;

      colorsArr.forEach((color) => {
        let entries = Object.entries(color.hex);
        fetchedColorsArr.push(entries[0][1]);
      });

      generateDivs();

      for (let i = 0; i < fetchedColorsArr.length; i++) {
        let colorDivs = document.querySelector(`.color-${i + 1}`);
        let colorData = document.querySelector(`.color-${i + 1}-data`);

        colorDivs.addEventListener("click", () => {
          copyToClipboard(fetchedColorsArr[i], fetchedColorsArr[i]);
        });

        colorData.addEventListener("click", () => {
          copyToClipboard(fetchedColorsArr[i], fetchedColorsArr[i]);
        });
      }
    })
    .catch((err) => {
      console.log(err, "Error");
      alert(err);
    });
}

function generateDivs() {
  let cpColors = document.querySelector(".cp-colors");
  let cpColorCodes = document.querySelector(".cp-color-codes");

  cpColors.innerHTML = "";
  cpColorCodes.innerHTML = "";

  for (let i = 0; i < fetchedColorsArr.length; i++) {
    let colorDiv = document.createElement("div");
    colorDiv.className = `color-${i + 1}`;
    colorDiv.style.backgroundColor = fetchedColorsArr[i];

    let colorCodes = document.createElement("data");
    colorCodes.className = `color-${i + 1}-data`;
    colorCodes.innerText = fetchedColorsArr[i];
    colorCodes.value = fetchedColorsArr[i];

    cpColors.appendChild(colorDiv);
    cpColorCodes.appendChild(colorCodes);
  }
}

function copyToClipboard(text, hexValue) {
  let copyMsg = "";
  navigator.clipboard.writeText(text).then(
    () => {
      console.log("Copy succesful");
      copyMsg = `<p class="copy-msg-inner">Copied: ${hexValue}</p>`;
      copyModal.classList.add("active");
      copyModal.style.background = `${hexValue}`;
      header.style.backgroundColor = `${hexValue}`;
      copyModal.innerHTML = copyMsg;
      setTimeout(() => {
        copyModal.classList.remove("active");
      }, 1500);
    },
    (err) => {
      console.log("No copy", err);
    }
  );
}