
class ExpenseTracker{
    constructor(elementConfig){
        this.elementConfig = {
            addButton: elementConfig.addButton,
            cancelButton: elementConfig.cancelButton,
            vendorInput: elementConfig.vendorInput,
            descriptionInput: elementConfig.descriptionInput,
            amountInput: elementConfig.amountInput,
            dueDateInput: elementConfig.dueDateInput,
            billDisplayArea: elementConfig.billDisplayArea
        };

        this.addBill = this.addBill.bind(this);
        this.cancelBill = this.cancelBill.bind(this);
        this.getBills = this.getBills.bind(this);
        this.deleteBill = this.deleteBill.bind(this);
    }

    addClickHandlers(){
        this.elementConfig.addButton.addEventListener('click', this.addBill);
        this.elementConfig.cancelButton.addEventListener('click', this.cancelBill);
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
                        billDisplayArea: this.elementConfig.billDisplayArea
                    };
    
                    const newBill = new Bill(billRequirements);
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
            console.log('addBill data:', data);
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

    deleteBill(bill_id){
        fetch('api/bills?bill_id=' + bill_id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
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
    }

    removeAllBillElements(){
        let table = document.getElementById('student-list');
        for (let i = table.rows.length - 1; i > 0; i--){
            table.deleteRow(i);
        }
    }
}

