const colorInput = document.getElementById("color-picker");
const colorModes = document.getElementById("color-modes");
const submitBtn = document.querySelector(".submit-btn");
const copyModal = document.querySelector(".copy-msg");
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

  baseFetchUrl = `https://www.thecolorapi.com/scheme?hex=${newHexValue}&mode=${modeValue}&count=6`;

  fethColors();
});

function fethColors() {
  fetch(baseFetchUrl)
    .then((response) => response.json())
    .then((data) => {
      const colorsArr = data.colors;

      colorsArr.forEach((color) => {
        fetchedColorsArr.push(color.hex.value);
      });
      console.log(colorsArr);

      for (let i = 0; i < fetchedColorsArr.length; i++) {
        let colorDiv = document.querySelector(`.color-${i + 1}`);
        let colorData = document.querySelector(`.color-${i + 1}-data`);

        colorDiv.style.background = fetchedColorsArr[i];
        colorData.textContent = fetchedColorsArr[i];
        colorData.value = fetchedColorsArr[i];

        colorDiv.addEventListener("click", () => {
          copyToClipboard(fetchedColorsArr[i], fetchedColorsArr[i]);
        });

        colorData.addEventListener('click', () => {
          copyToClipboard(fetchedColorsArr[i], fetchedColorsArr[i])
        })
      }
    });
}

function copyToClipboard(text, hexValue) {
  let copyMsg = "";
  navigator.clipboard.writeText(text).then(
    () => {
      console.log("Copy succesful");
      copyMsg = `<p class="copy-msg-inner">Copied: ${hexValue}</p>`;
      copyModal.classList.add("active");
      copyModal.style.background = `${hexValue}`;
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