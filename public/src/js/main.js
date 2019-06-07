document.addEventListener("DOMContentLoaded", startApp);

let expenseTracker;
function startApp(){
     expenseTracker = new ExpenseTracker({
        buttons: {
            addButton: document.getElementById('add-button'),
            cancelButton: document.getElementById('cancel-button'),
            closeModalButton: document.querySelectorAll('.close-button')[0],
            closeDeleteModalButton: document.querySelectorAll('.close-button')[1],
            updateButton: document.getElementById('update-button'),
            cancelModalButton: document.getElementById('modal-cancel-button'),
            cancelDeleteModalButton: document.getElementById('cancel-delete-button'),
            confirmDeleteButton: document.getElementById('confirm-delete-button'),
            cancelDeleteButton: document.getElementById('cancel-delete-button')
        },
        inputFields: {
            vendor: document.getElementById('vendor'),
            description: document.getElementById('description'),
            amount: document.getElementById('amount'),
            dueDate: document.querySelectorAll('input[type="date"]')[0],
            modalVendor: document.getElementById('modal-vendor'),
            modalDescription: document.getElementById('modal-description'),
            modalAmount: document.getElementById('modal-amount'),
            modalDueDate: document.querySelectorAll('input[type="date"]')[1],
            deleteModalVendor: document.getElementById('delete-modal-vendor'),
            deleteModalDescription: document.getElementById('delete-modal-description'),
            deleteModalAmount: document.getElementById('delete-modal-amount'),
            deleteModalDueDate: document.getElementById('delete-modal-due-date')
        },
        DOMAreas: {
            totalExpenseLg: document.querySelectorAll('.total-expense')[0],
            totalExpenseSm: document.querySelectorAll('.total-expense')[1],
            mainForm: document.querySelectorAll('.needs-validation')[0],
            modalForm: document.querySelectorAll('.needs-validation')[1],
            billDisplayArea: document.getElementById('display-area'),
            billListTable: document.getElementById('bill-list'),
            modal: document.getElementById('update-modal'),
            deleteModal: document.getElementById('delete-modal')
        }
    });

    expenseTracker.addClickHandlers();
    expenseTracker.getBills();
}

