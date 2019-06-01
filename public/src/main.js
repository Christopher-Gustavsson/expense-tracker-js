document.addEventListener("DOMContentLoaded", startApp);

let expenseTracker;
function startApp(){
     expenseTracker = new ExpenseTracker({
        buttons: {
            addButton: document.getElementById('add-button'),
            cancelButton: document.getElementById('cancel-button'),
            closeModalButton: document.getElementsByClassName('close-button')[0],
            updateButton: document.getElementById('update-button'),
            cancelModalButton: document.getElementById('modal-cancel-button'),
        },
        inputFields: {
            vendor: document.getElementById('vendor'),
            description: document.getElementById('description'),
            amount: document.getElementById('amount'),
            // dueDate: document.getElementById('due-date'),
            dueDate: document.querySelectorAll('input[type="date"]')[0],
            modalVendor: document.getElementById('modal-vendor'),
            modalDescription: document.getElementById('modal-description'),
            modalAmount: document.getElementById('modal-amount'),
            // modalDueDate: document.getElementById('modal-due-date')
            modalDueDate: document.querySelectorAll('input[type="date"]')[1],
        },
        DOMAreas: {
            billDisplayArea: document.getElementById('display-area'),
            modal: document.getElementById('simple-modal'),
            billListTable: document.getElementById('bill-list')
        }
    });

   expenseTracker.addClickHandlers();
   expenseTracker.getBills();
}

