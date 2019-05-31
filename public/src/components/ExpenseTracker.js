
class ExpenseTracker{
    constructor(elementConfig){
        this.elementConfig = {
            addButton: elementConfig.addButton,
            cancelButton: elementConfig.cancelButton,
            vendorInput: elementConfig.vendorInput,
            descriptionInput: elementConfig.descriptionInput,
            amountInput: elementConfig.amountInput,
            dueDateInput: elementConfig.dueDateInput,
            billDisplayArea: elementConfig.billDisplayArea,
            modal: elementConfig.modal,
            closeModalButton: elementConfig.closeModalButton,
            updateButton: elementConfig.updateButton,
            cancelModalButton: elementConfig.cancelModalButton
        };

        this.updateId = null;
        this.allBills = [];

        this.addBill = this.addBill.bind(this);
        this.getBills = this.getBills.bind(this);
        this.updateBill = this.updateBill.bind(this);
        this.deleteBill = this.deleteBill.bind(this);
        this.cancelBill = this.cancelBill.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);
        this.outsideModalClick = this.outsideModalClick.bind(this);
    }

    addClickHandlers(){
        this.elementConfig.addButton.addEventListener('click', this.addBill);
        this.elementConfig.cancelButton.addEventListener('click', this.cancelBill);
        this.elementConfig.updateButton.addEventListener('click', this.updateBill);

        this.elementConfig.closeModalButton.addEventListener('click', this.closeModal);
        this.elementConfig.cancelModalButton.addEventListener('click', this.closeModal);
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
                        modal: this.elementConfig.modal,
                        openModal: this.openModal,
                        billDisplayArea: this.elementConfig.billDisplayArea
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
            vendor: this.elementConfig.vendorInput.value,
            description: this.elementConfig.descriptionInput.value,
            amount: parseFloat(this.elementConfig.amountInput.value),
            dueDate: this.elementConfig.dueDateInput.value,
        };

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
        this.clearInputs();
    }

    updateBill(){
        console.log('do we have id? pt3', this.updateId);
        const updateRequirements = {
            id: this.updateId,
            vendor: document.getElementById('modal-vendor').value,
            description: document.getElementById('modal-description').value,
            amount: document.getElementById('modal-amount').value,
            dueDate: document.getElementById('modal-due-date').value
        };

        console.log('do we have id? pt4', updateRequirements.id);
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
                this.clearInputs();
                console.log('Updated bill in db');
            }
            else{
                console.log('Error coud not update bill in db...', data.error);
            }
        });

    }

    deleteBill(bill_id){
        fetch('api/bills/' + bill_id, {method: 'DELETE'})
        .then(resp => resp.json())
        .then(data => {
            if(data.success){
                console.log('Bill deleted...');
            }
            else{
                console.log('Bill not deleted...')
            }
        });
    }

    cancelBill(){
        this.clearInputs();
    }

    clearInputs(){
        this.elementConfig.vendorInput.value = '';
        this.elementConfig.descriptionInput.value = '';
        this.elementConfig.amountInput.value= '';
        this.elementConfig.dueDateInput.value = '';
        document.getElementById('modal-vendor').value = '';
        document.getElementById('modal-description').value = '';
        document.getElementById('modal-amount').value = '';
        document.getElementById('modal-due-date').value = '';
    }

    removeAllBillElements(){
        let table = document.getElementById('student-list');
        for (let i = table.rows.length - 1; i > 0; i--){
            table.deleteRow(i);
        }
    }

    getCurrentBill(){
        return {
            id: this.id,
            vendor: this.vendor,
            description: this.description,
            amount: this.amount,
            dueDate: this.dueDate
        };
    }
    openModal(modalInfo){
        modalInfo.modal.style.display = 'block';
        document.getElementById('modal-vendor').value = modalInfo.vendor;
        document.getElementById('modal-description').value = modalInfo.description;
        document.getElementById('modal-amount').value = modalInfo.amount;
        document.getElementById('modal-due-date').value = modalInfo.dueDate;
       
        this.updateId = modalInfo.id;

        console.log('do we have id? pt1', this.updateId);
    }

    closeModal(){
        this.elementConfig.modal.style.display = 'none';
    }

    outsideModalClick(e){
        if(e.target === this.elementConfig.modal){
            this.elementConfig.modal.style.display = 'none';
        }
        console.log('do we have id? outsideModalClick', this.updateId);
    }
}

