
class ExpenseTracker{
    constructor(elementConfig){

        this.buttons = {
            addButton: elementConfig.buttons.addButton,
            cancelButton: elementConfig.buttons.cancelButton,
            closeModalButton: elementConfig.buttons.closeModalButton,
            updateButton: elementConfig.buttons.updateButton,
            cancelModalButton: elementConfig.buttons.cancelModalButton,
            confirmDeleteButton: elementConfig.buttons.confirmDeleteButton,
            cancelDeleteButton: elementConfig.buttons.cancelDeleteButton
        };

        this.inputFields = {
            vendor: elementConfig.inputFields.vendor,
            description: elementConfig.inputFields.description,
            amount: elementConfig.inputFields.amount,
            DueDate: elementConfig.inputFields.dueDate,

            modalVendor: elementConfig.inputFields.modalVendor,
            modalDescription: elementConfig.inputFields.modalDescription,
            modalAmount: elementConfig.inputFields.modalAmount,
            modalDueDate: elementConfig.inputFields.modalDueDate,

            deleteModalVendor: elementConfig.inputFields.deleteModalVendor,
            deleteModalDescription: elementConfig.inputFields.deleteModalDescription,
            deleteModalAmount: elementConfig.inputFields.deleteModalAmount,
            deleteModalDueDate: elementConfig.inputFields.deleteModalDueDate
        };

        this.DOMAreas = {
            mainForm: elementConfig.DOMAreas.mainForm,
            modalForm: elementConfig.DOMAreas.modalForm,
            billDisplayArea: elementConfig.DOMAreas.billDisplayArea,
            billListTable : elementConfig.DOMAreas.billListTable,
            modal: elementConfig.DOMAreas.modal,
            deleteModal: elementConfig.DOMAreas.deleteModal
        };

        this.deleteId = null;
        this.updateId = null;
        this.allBills = [];

        this.addBill = this.addBill.bind(this);
        this.getBills = this.getBills.bind(this);
        this.updateBill = this.updateBill.bind(this);
        this.deleteBill = this.deleteBill.bind(this);
        this.cancelBill = this.cancelBill.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);
        this.openDeleteModal = this.openDeleteModal.bind(this);
        this.outsideModalClick = this.outsideModalClick.bind(this);
    }

    addClickHandlers(){
        this.DOMAreas.mainForm.addEventListener('submit', this.addBill);
        this.DOMAreas.modalForm.addEventListener('submit', this.updateBill);

        this.buttons.confirmDeleteButton.addEventListener('click', this.deleteBill);

        // this.buttons.cancelDeleteButton.addEventListener('')   CLOSE DELETE MODAL

        this.buttons.cancelButton.addEventListener('click', this.cancelBill);
        this.buttons.closeModalButton.addEventListener('click', this.closeModal);
        this.buttons.cancelModalButton.addEventListener('click', this.closeModal);
        window.addEventListener('click', this.outsideModalClick);
    }

    getBills(){ 
        this.removeAllBillElements();
        fetch('api/bills')
        .then(resp => resp.json())
        .then(data => {
            if(data.success){
                const billsArray = data.bills;

                billsArray.forEach( bill => {
                    const billRequirements = {
                        id: bill.id,
                        vendor: bill.vendor,
                        description: bill.description,
                        amount: bill.amount,
                        dueDate: bill.dueDate,
                        deleteBill: this.deleteBill,
                        updateBill: this.updateBill,
                        modal: this.DOMAreas.modal,
                        openModal: this.openModal,
                        deleteModal: this.DOMAreas.deleteModal,
                        openDeleteModal: this.openDeleteModal,
                        billDisplayArea: this.DOMAreas.billDisplayArea
                    };
    
                    const newBill = new Bill(billRequirements);
                    this.allBills.push(newBill);
                    newBill.renderBill();
                });
            }
        })
        .catch(err => {
            console.log("Get server data error:", err);
        });
    }

    addBill(){
        const queryParams = {
            vendor: this.inputFields.vendor.value,
            description: this.inputFields.description.value,
            amount: parseFloat(this.inputFields.amount.value),
            dueDate: this.inputFields.DueDate.value
        };

        const {vendor, description, amount, dueDate} = queryParams;
        if(!vendor || !description || !amount || !dueDate){
            return false;
        }

        fetch('api/bills', {
            method: 'POST',
            body: JSON.stringify(queryParams),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(resp => resp.json())
        .then(data => {
            if(data.success){
                console.log('Added bill to db');
            }
            else{
                console.log('Error could not add to db....', data.error);
            }
        });
        this.getBills();
        return true;
    }

    updateBill(){
        const updateRequirements = {
            id: this.updateId,
            vendor: this.inputFields.modalVendor.value,
            description: this.inputFields.modalDescription.value,
            amount: this.inputFields.modalAmount.value,
            dueDate: this.inputFields.modalDueDate.value
        };

        const {vendor, description, amount, dueDate} = updateRequirements;
        if(!vendor || !description || !amount || !dueDate){
            return false;
        }

        fetch('api/bills/update', {
            method: 'POST',
            body: JSON.stringify(updateRequirements),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(resp => resp.json())
        .then(data => {
            if(data.success){
                this.getBills();
                this.closeModal();
                console.log('Updated bill in db');
            }
            else{
                console.log('Error coud not update bill in db...', data.error);
            }
        });
        return true;
    }

    deleteBill(){
        console.log("delete bill called");
        const bill_id = this.deleteId;
        fetch('api/bills/' + bill_id, {method: 'DELETE'})
        .then(resp => resp.json())
        .then(data => {
            if(data.success){
                console.log('Bill deleted...');
                this.getBills();
            }
            else{
                console.log('Bill not deleted...')
            }
        });
    }

    cancelBill(){
        this.clearInputs();
        this.DOMAreas.mainForm.classList.remove('was-validated');
    }

    clearInputs(){
        this.inputFields.vendor.value = '';
        this.inputFields.description.value = '';
        this.inputFields.amount.value= '';
        this.inputFields.DueDate.value = '';
    }

    removeAllBillElements(){
        let table = this.DOMAreas.billListTable;
        for (let i = table.rows.length - 1; i > 0; i--){
            table.deleteRow(i);
        }
    }

    openModal(modalInfo){
        modalInfo.modal.style.display = 'block';
        this.inputFields.modalVendor.value = modalInfo.vendor;
        this.inputFields.modalDescription.value = modalInfo.description;
        this.inputFields.modalAmount.value = modalInfo.amount;
        this.inputFields.modalDueDate.value = this.formatModalDate(modalInfo.dueDate);
       
        this.updateId = modalInfo.id;
    }

    openDeleteModal(deleteModalInfo){
        deleteModalInfo.deleteModal.style.display = 'block';
        
        this.inputFields.deleteModalVendor.value = deleteModalInfo.vendor;
        this.inputFields.deleteModalDescription.value = deleteModalInfo.description;
        this.inputFields.deleteModalAmount.value = deleteModalInfo.amount;
        this.inputFields.deleteModalDueDate.value = this.formatModalDate(deleteModalInfo.dueDate);

        this.deleteId = deleteModalInfo.id;
    }

    formatModalDate(date){
        const year = date.slice(6);
        const month = date.slice(0,2);
        const day = date.slice(3,5);
        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate;
    }

    closeModal(){
        this.DOMAreas.modal.style.display = 'none';
        this.DOMAreas.modalForm.classList.remove('was-validated');
    }

    outsideModalClick(e){
        if(e.target === this.DOMAreas.modal){
            this.closeModal();
        }
    }
}

