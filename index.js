import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
const appSettings = {
  databaseURL:
    "https://my-first-fire-base-app-61e58-default-rtdb.europe-west1.firebasedatabase.app",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
// console.log(database)
const itemsInDB = ref(database, "itemsBought");

const addBtnEl = window.document.getElementById("add-button");
const inputFieldEl = window.document.getElementById("input-field");
const shoppingListEl = document.getElementById("shopping-list");
const warningEl = document.getElementById("warning-el");
addBtnEl.addEventListener("click", addValue);

function addValue() {
  let inputValue = inputFieldEl.value;
  push(itemsInDB, inputValue);
  clearInputFieldEl();
}

onValue(itemsInDB, appendToList);

function appendToList(snapshot) {
  if (snapshot.exists()) {
    let fetchedValues = Object.entries(snapshot.val());
    clearShoppingListEl();

    for (let i = 0; i < fetchedValues.length; i++) {
      let currentItem = fetchedValues[i];
      appendItemToShoppingListEl(currentItem);
    }
  } else {
    let warningStatement = "Sorry, you currently have no items in your Cart";
    shoppingListEl.innerHTML = warningStatement;
    shoppingListEl.style.fontWeight = "700";
    shoppingListEl.style.color = "maroon";
    // warningEl.innerHTML = warningStatement;
    // warningEl.style.backgroundColor = "maroon";
    // warningEl.style.color = "linen";
    // warningEl.style.borderRadius = "5px";
  }
}

function clearShoppingListEl() {
  shoppingListEl.innerHTML = "";
}

function clearInputFieldEl() {
  inputFieldEl.value = "";
}

function appendItemToShoppingListEl(item) {
  // shoppingListEl.innerHTML += `<li>${itemValue}</li>`;
  let itemID = item[0];
  console.log(itemID);
  let itemValue = item[1];
  let newEl = document.createElement("li");
  newEl.textContent = itemValue;
  newEl.style.color = "black";
  newEl.style.fontWeight = "400";

  newEl.addEventListener("click", function removeUnwantedItemFromDB() {
    let removedItemFromDB = ref(database, `itemsBought/${itemID}`);
    remove(removedItemFromDB);
  });

  shoppingListEl.append(newEl);
}
