const colorInput = document.getElementById("color-picker");
const colorModes = document.getElementById("color-modes");
const submitBtn = document.querySelector(".submit-btn");
const formEl = document.querySelector("form");
let fetchedColorsArr = [];
let baseFetchUrl =
  "https://www.thecolorapi.com/scheme?hex=000000&mode=monochrome";

formEl.addEventListener("submit", (e) => {
  e.preventDefault();

  fetchedColorsArr.length = 0;

  let colorHexValue = colorInput.value;
  let modeValue = colorModes.value;

  let newHexValue = colorHexValue.substring(1);

  baseFetchUrl = `https://www.thecolorapi.com/scheme?hex=${newHexValue}&mode=${modeValue}&count=5`;

  fethColors(colorHexValue, modeValue);
});

function fethColors(colorHexValue, modeValue) {
  fetch(baseFetchUrl)
    .then((response) => response.json())
    .then((data) => {
      const colorsArr = data.colors;

      colorsArr.forEach((color) => {
        fetchedColorsArr.push(color.hex.value);
      });

      for (let i = 0; i < fetchedColorsArr.length; i++) {
        let colorOutput = document.querySelector(`.color-${i + 1}`);
        let hexOutput = document.querySelector(`.color-${i + 1}-data`);

        colorOutput.style.background = fetchedColorsArr[i];
        hexOutput.textContent = fetchedColorsArr[i];
        hexOutput.value = fetchedColorsArr[i];
      }
    });
}
