document.addEventListener("DOMContentLoaded", startApp);

function startApp(){
    const expenseTracker = new ExpenseTracker({
        addButton: document.getElementById('add-button'),
        cancelButton: document.getElementById('cancel-button'),
        vendorInput: document.getElementById('vendor'),
        descriptionInput: document.getElementById('description'),
        amountInput: document.getElementById('amount'),
        dueDateInput: document.getElementById('due-date'),
        billDisplayArea: document.getElementById('display-area')
    });

   expenseTracker.addClickHandlers();
   expenseTracker.getBills();
}

