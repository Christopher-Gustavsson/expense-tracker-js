

class Bill{
    constructor(billRequirements){
        this.id = billRequirements.id;
        this.vendor = billRequirements.vendor;
        this.description = billRequirements.description;
        this.amount = billRequirements.amount;
        this.dueDate = billRequirements.dueDate;

        this.deleteBill = billRequirements.deleteBill;
        this.updateBill = billRequirements.updateBill;

        this.modal = billRequirements.modal;
        this.openModal = billRequirements.openModal;
        this.deleteModal = billRequirements.deleteModal;
        this.openDeleteModal = billRequirements.openDeleteModal;
        this.billDisplayArea = billRequirements.billDisplayArea;

        this.domElement = null;

        this.renderBill = this.renderBill.bind(this);
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleOpenDeleteModal = this.handleOpenDeleteModal.bind(this);
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
                const editButton = this.createEditButton();
                const deleteButton = this.createDeleteButton();
                tableData.appendChild(editButton);
                tableData.appendChild(deleteButton);
            }
            else if(value === 'amount'){
                tableData.setAttribute('class', 'amount');
                tableData.innerText = `$${billValues[value].toFixed(2)}`;
            }
            else if (value === 'dueDate'){
                tableData.setAttribute('class', 'due-date');
                tableData.innerText = billValues[value];
            }
            else{
                tableData.innerText = billValues[value];
            }
            billTableRow.appendChild(tableData);
            this.domElement = billTableRow;
        }
        this.billDisplayArea.appendChild(billTableRow);
    }

    createEditButton(){
        const button = document.createElement("BUTTON");
        button.setAttribute('id', 'edit-button');
        button.setAttribute('class', 'btn');
        button.addEventListener('click', this.handleOpenModal);
        const editIcon = document.createElement("I");
        editIcon.setAttribute('class', 'far fa-edit');
        button.appendChild(editIcon);
        return button;
    }

    createDeleteButton(){
        const button = document.createElement("BUTTON");
        button.setAttribute('id', 'delete-button')
        button.setAttribute('class', 'btn')
        button.addEventListener('click', this.handleOpenDeleteModal);
        const deleteIcon = document.createElement("I");
        deleteIcon.setAttribute('class', 'far fa-trash-alt');
        button.appendChild(deleteIcon);
        return button;
    }

    getBillValues(){
        return {
            id: this.id,
            vendor: this.vendor,
            description: this.description,
            amount: this.amount,
            dueDate: this.dueDate
        };
    }

    handleOpenModal(){
        const modalInfo = {
            id: this.id,
            vendor: this.vendor,
            description: this.description,
            amount: this.amount,
            dueDate: this.dueDate,
            modal: this.modal
        };
        this.openModal(modalInfo);
    }

    handleOpenDeleteModal(){
        const deleteModalInfo = {
            id: this.id,
            vendor: this.vendor,
            description: this.description,
            amount: this.amount,
            dueDate: this.dueDate,
            deleteModal: this.deleteModal,
            rowToBeDeleted: this.domElement
        }
        this.openDeleteModal(deleteModalInfo);
    }
}   
