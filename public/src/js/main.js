document.addEventListener("DOMContentLoaded", startApp);

let expenseTracker;
function startApp(){
     expenseTracker = new ExpenseTracker({
        buttons: {
            addButton: document.getElementById('add-button'),
            cancelButton: document.getElementById('cancel-button'),
            closeModalButton: document.querySelector('.close-button'),
            updateButton: document.getElementById('update-button'),
            cancelModalButton: document.getElementById('modal-cancel-button'),
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

