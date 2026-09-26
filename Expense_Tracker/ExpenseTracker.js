let expenses = [];

let income = 0;


// Add Income

function addIncome() {

    let amount =
        Number(document.getElementById("incomeAmount").value);


    if (amount <= 0) {

        alert("Enter a valid income");

        return;
    }


    income = income + amount;


    document.getElementById("incomeAmount").value = "";


    updateSummary();
}



// Add Expense

function addExpense() {

    let name =
        document.getElementById("name").value;

    let amount =
        Number(document.getElementById("amount").value);

    let category =
        document.getElementById("category").value;

    let date =
        document.getElementById("date").value;


    if (name == "" || amount <= 0 || date == "") {

        alert("Please enter all details");

        return;
    }


    let expense = {

        name: name,

        amount: amount,

        category: category,

        date: date
    };


    expenses.push(expense);


    document.getElementById("name").value = "";

    document.getElementById("amount").value = "";

    document.getElementById("date").value = "";


    displayExpenses();

    updateSummary();

    createChart();
}



// Display Expenses

function displayExpenses() {

    let list =
        document.getElementById("expenseList");


    list.innerHTML = "";


    for (let i = 0; i < expenses.length; i++) {

        list.innerHTML += `

            <tr>

                <td>
                    ${expenses[i].name}
                </td>

                <td>
                    ₹${expenses[i].amount}
                </td>

                <td>
                    ${expenses[i].category}
                </td>

                <td>
                    ${expenses[i].date}
                </td>

                <td>

                    <button onclick="deleteExpense(${i})">
                        Delete
                    </button>

                </td>

            </tr>

        `;
    }
}



// Delete Expense

function deleteExpense(index) {

    expenses.splice(index, 1);


    displayExpenses();

    updateSummary();

    createChart();
}



// Update Summary

function updateSummary() {

    let totalExpense = 0;


    for (let i = 0; i < expenses.length; i++) {

        totalExpense =
            totalExpense + expenses[i].amount;
    }


    let balance =
        income - totalExpense;


    document.getElementById("income").innerText =
        "₹" + income;


    document.getElementById("expenses").innerText =
        "₹" + totalExpense;


    document.getElementById("balance").innerText =
        "₹" + balance;
}



// Create Bar Chart

function createChart() {

    let categories = {

        Food: 0,

        Travel: 0,

        Shopping: 0,

        Bills: 0,

        Education: 0,

        Other: 0
    };


    // Calculate category totals

    for (let i = 0; i < expenses.length; i++) {

        categories[expenses[i].category] =
            categories[expenses[i].category]
            + expenses[i].amount;
    }


    // Find largest expense category

    let max =
        Math.max(...Object.values(categories));


    let chart =
        document.getElementById("barChart");


    chart.innerHTML = "";


    // Create bars

    for (let category in categories) {

        let amount =
            categories[category];


        let width = 0;


        if (max > 0) {

            width =
                (amount / max) * 100;
        }


        chart.innerHTML += `

            <div class="bar">

                <div class="bar-name">
                    ${category}
                </div>


                <div class="bar-container">

                    <div
                        class="bar-fill"
                        style="width:${width}%">
                    </div>

                </div>


                <div class="bar-amount">

                    ₹${amount}

                </div>

            </div>

        `;
    }
}