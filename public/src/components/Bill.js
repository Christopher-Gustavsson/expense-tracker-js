

class Bill{
    constructor(billRequirements){
        this.id = billRequirements.id;
        this.vendor = billRequirements.vendor;
        this.description = billRequirements.description;
        this.amount = billRequirements.amount;
        this.dueDate = billRequirements.dueDate;
        this.deleteBill = billRequirements.deleteBill;
        this.modal = billRequirements.modal;
        this.openModal = billRequirements.openModal;
        this.billDisplayArea = billRequirements.billDisplayArea;
        this.domElement = null;

        this.renderBill = this.renderBill.bind(this);
        this.handleUpdateBill = this.handleUpdateBill.bind(this);
        this.handleDeleteBill = this.handleDeleteBill.bind(this);
        this.handleOpenModal = this.handleOpenModal.bind(this);
    }

    renderBill(){
        const billValues = {
            vendor: this.vendor,
            description: this.description,
            amount: this.amount,
            dueDate: this.dueDate,
            buttons: null
        }

        const billTableRow = document.createElement("TR");
        
        // Loop trough keys in billValues, if the key is 'buttons' render paid and edit buttons, otherwise render input-data
        for (let value in billValues){
            const tableData = document.createElement("TD");
            
            if(value === 'buttons'){
                tableData.setAttribute('id', 'buttons-container');

                const editButton = document.createElement("BUTTON");
                editButton.innerText = 'Edit';
                editButton.setAttribute('id', 'edit-button');
                editButton.setAttribute('class', 'btn btn-warning');
                editButton.addEventListener('click', this.handleOpenModal);
                
                const deleteButton = document.createElement("BUTTON");
                deleteButton.setAttribute('id', 'paid-button')
                deleteButton.setAttribute('class', 'btn btn-danger')
                deleteButton.addEventListener('click', this.handleDeleteBill);

                const deleteIcon = document.createElement("I");
                deleteIcon.setAttribute('class', 'far fa-trash-alt');

                deleteButton.appendChild(deleteIcon);
                tableData.appendChild(editButton);
                tableData.appendChild(deleteButton);
            }
            else if(value === 'amount'){
                tableData.innerText = `$${billValues[value].toFixed(2)}`;
            }
            else{
                tableData.innerText = billValues[value];
            }

            billTableRow.appendChild(tableData);
            this.domElement = billTableRow;
        }

        this.billDisplayArea.appendChild(billTableRow);
    }

    handleUpdateBill(){
        const updateRequirements = {
            modalVendor: document.getElementById('modal-vendor').value,
            modalDescription: document.getElementById('modal-description').value,
            modalAmount: document.getElementById('modal-amount').value,
            modalDueDate: document.getElementById('modal-due-date').value
        };


        

    }

    handleOpenModal(){
        this.openModal();
        document.getElementById('modal-vendor').value = this.vendor;
        document.getElementById('modal-description').value = this.description;
        document.getElementById('modal-amount').value = this.amount;
        document.getElementById('modal-due-date').value = this.dueDate;
    }

    handleDeleteBill(){
        this.deleteBill(this.id);
        this.deleteRow(this.domElement);
    }

    deleteRow(row){
        let index = row.sectionRowIndex;
        this.billDisplayArea.deleteRow(index);
    }
}   