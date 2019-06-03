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
        },
        DOMAreas: {
            mainForm: document.querySelectorAll('.needs-validation')[0],
            modalForm: document.querySelectorAll('.needs-validation')[1],
            billDisplayArea: document.getElementById('display-area'),
            modal: document.getElementById('simple-modal'),
            billListTable: document.getElementById('bill-list')
        }
    });

    expenseTracker.addClickHandlers();
    expenseTracker.getBills();

    
    const mainForm = expenseTracker.DOMAreas.mainForm;
    mainForm.addEventListener('submit', event => {
       
       if(mainForm.checkValidity() === false){
           event.preventDefault();
           event.stopPropagation();
       }
       mainForm.classList.add('was-validated');
   });

   const modalForm = expenseTracker.DOMAreas.modalForm;
   modalForm.addEventListener('submit', event => {
       if(modalForm.checkValidity() === false){
           event.preventDefault();
           event.stopPropagation();
       }
       modalForm.classList.add('was-validated');
   });
}

