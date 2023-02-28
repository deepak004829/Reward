
const createNewUserButton = document.getElementById('create-new-user');
createNewUserButton.addEventListener('click', () => {
  window.location.href = '/new';
});

const editButtons = document.querySelectorAll('.edit-button');
editButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const userId = button.getAttribute('data-user-id');
    window.location.href = `/${userId}`;
  });
});


const p5BalanceButton = document.getElementById('p5-balance-button');
p5BalanceButton.addEventListener('click', () => {
  const userId = p5BalanceButton.getAttribute('data-user-id');
  window.location.href = `/${userId}/p5`;
});


const rewardsBalanceButton = document.getElementById('rewards-balance-button');
rewardsBalanceButton.addEventListener('click', () => {
  const userId = rewardsBalanceButton.getAttribute('data-user-id');
  window.location.href = `/${userId}/rewards`;
});


const deleteButtons = document.querySelectorAll('.delete-button');
deleteButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const p5HistoryItemId = button.getAttribute('data-p5-history-item-id');

  });
});

const createNewRewardForm = document.getElementById('create-new-reward-form');
createNewRewardForm.addEventListener('submit', (event) => {
  const numericInput = document.getElementById('numeric-input');
  if (numericInput.value > 100 || 1000) {
    event.preventDefault();
    const submitButton = document.getElementById('submit-button');
    submitButton.disabled = true;
  }
});

const cancelButton = document.getElementById('cancel-button');
cancelButton.addEventListener('click', () => {
  window.history.back();
});

const rewardsBalanceElement = document.getElementById("rewards-balance");
const rewardHistoryTableBody = document.getElementById("reward-history-table");

function showRewardHistory(userId) {
fetch(/users/${userId}/rewards)
.then(response => response.json())
.then(rewards => {

rewardsBalanceElement.textContent = rewards.balance;

rewardHistoryTableBody.innerHTML = "";

rewards.list.forEach((reward, index) => {
const row = document.createElement("tr");
rewardHistoryTableBody.appendChild(row);
});
})
.catch(error => console.error(error));
}

// New Reward
const newRewardForm = document.getElementById("new-reward-form");
const newRewardAmountInput = document.getElementById("new-reward-amount");
const p5BalanceElement = document.getElementById("p5-balance");
const awardeeSelect = document.getElementById("awardee-select");

function showNewRewardForm(userId) {

fetch(/users/${userId})
.then(response => response.json())
.then(user => {

p5BalanceElement.textContent = user.p5Balance;
awardeeSelect.innerHTML = "";
user.friends.forEach(friend => {
if (friend.id !== userId) {
const option = document.createElement("option");
option.value = friend.id;
option.textContent = friend.name;
awardeeSelect.appendChild(option);
}
});

newRewardForm.classList.remove("d-none");
})
.catch(error => console.error(error));
}

function hideNewRewardForm() {

newRewardForm.classList.add("d-none");
}

function submitNewReward(userId) {
const amount = newRewardAmountInput.value;
const awardeeId = awardeeSelect.value;

if (amount <= 0 || amount > 100) {
alert("Invalid reward amount. Amount must be between 1 and 100.");
return;
}
const p5Balance = parseInt(p5BalanceElement.textContent);
if (amount > p5Balance) {
alert("Insufficient P5 balance.");
return;
}

fetch(/users/${userId}/rewards, {
method: "POST",
headers: {
"Content-Type": "application/json"
},
body: JSON.stringify({
awardeeId,
amount
})
})
.then(response => {
if (response.ok) {

window.location.href = <userId className="html"></userId>;
} else {
alert("Failed to create new reward.");
}
})
.catch(error => console.error(error));
}

document.getElementById("new-reward-button").addEventListener("click", () => {
showNewRewardForm(userId);
});
document.getElementById("cancel-new-reward").addEventListener("click", () => {
hideNewRewardForm();
});
newRewardForm.addEventListener("submit", event => {
event.preventDefault();
submitNewReward(userId);
});