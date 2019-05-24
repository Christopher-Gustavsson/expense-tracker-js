document.addEventListener("DOMContentLoaded", startApp);

function startApp(){
    const expenseTracker = new ExpenseTracker({
        addButton: document.getElementById('add-button'),
        closeButton: document.getElementById('cancel-button'),
        vendorInput: document.getElementById('vendor'),
        descriptionInput: document.getElementById('description'),
        amountInput: document.getElementById('amount'),
        dueDateInput: document.getElementById('due-date')
    });
    console.log(expenseTracker);
}
