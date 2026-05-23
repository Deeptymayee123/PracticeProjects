// input screen
const BillAmount = document.querySelector("#BillAmount");
const Tip = document.querySelector("#Tip");
const user = document.querySelector("#user");
const submit = document.querySelector("#submit");
const form = document.querySelector(".billCalculator");
const userInputContainer = document.querySelector(".userInputContainer");
//output screen
const result = document.querySelector(".result");
const errorMsg = document.querySelector(".error-msg");
const TipPerUser = document.querySelector("#TipPerUser");
const totalTip = document.querySelector("#totalTip");
const totalBillAmount = document.querySelector("#totalBillAmount");
const clearBtn = document.querySelector("#clearBtn");

// add eventlistener to submit button
form.addEventListener("submit", (e) => {
  e.preventDefault();

  let val = getInputs();
  //show after 2 second
  if (val) {
    submit.innerHTML = `<i class="fa-solid fa-circle-notch spinner"></i>Sending...`;
    submit.style.color = "#fff";
    submit.disabled = true;

    setTimeout(() => {
      userInputContainer.classList.add("hidden");
      result.classList.remove("hidden");
      const billdetailObj = calculateTip(
        BillAmount.value.trim(),
        Tip.value.trim(),
        user.value.trim(),
      );
      displayResults(billdetailObj);
    }, 2000);
  }
});
clearBtn.addEventListener("click", () => {
  resetForm();
});

// take all user inputs and check validation
function getInputs() {
  //extract all user input inside variable
  let bill = BillAmount.value.trim();
  let tip = Tip.value.trim();
  let userInput = user.value.trim();
  if (bill === "" || tip === "" || userInput === "") {
    showError("Please, enter all the value!");
    // alert("Please, enter all the value!");
    return false;
  }
  if (isNaN(bill) || isNaN(tip) || isNaN(userInput)) {
    showError("Please, enter valid values!");
    // alert("Please, enter valid values!");
    return false;
  }
  return true;
}

// show results
function displayResults(billDetails) {
  TipPerUser.textContent = billDetails.tipPerUser;
  totalTip.textContent = billDetails.tip;
  totalBillAmount.textContent = billDetails.bill;
}

// calculate the total bill, tip percentage per user and total tip per person
function calculateTip(bill, pct, user) {
  const billDetails = {};
  // calculate tip, total tip and total bill
  let tip = (bill / 100) * pct;
  bill = Number(bill) + tip;
  let tipPerUser = tip / user;

  // push values in a object
  billDetails.bill = bill;
  billDetails.tip = tip;
  billDetails.tipPerUser = tipPerUser;

  // console.log(billDetails);
  return billDetails;
}

// show validation error
function showError(msg) {
  errorMsg.textContent = `${msg}`;
}

// clear all (results + inputs)
function resetForm() {
  result.classList.add("hidden");
  userInputContainer.classList.remove("hidden");

  BillAmount.value = "";
  Tip.value = "";
  user.value = "";

  submit.classList.remove("spinner");
  submit.innerHTML = `<span>Submit</span><i class="fa-solid fa-paper-plane"></i>`;
  submit.style.color = "#181717";
  submit.disabled = false;
}
