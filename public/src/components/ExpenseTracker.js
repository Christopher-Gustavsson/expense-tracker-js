
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

        this.data = {};

        this.addBill = this.addBill.bind(this);
        this.cancelBill = this.cancelBill.bind(this);
    }

    addClickHandlers(){
        this.elementConfig.addButton.addEventListener('click', this.addBill);
        this.elementConfig.cancelButton.addEventListener('click', this.cancelBill);

    }

    getBills(){ 
        fetch('api/bills')
        .then(resp => resp.json())
        .then(data => {
            if(data){
                const billsArray = data;

                billsArray.forEach( bill => {
                    const billRequirements = {
                        id: bill.id,
                        vendor: bill.vendor,
                        description: bill.description,
                        amount: bill.amount,
                        dueDate: bill.dueDate,
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
        //TODO: need to account for bill ID.
        const billRequirements = {
            vendor: this.elementConfig.vendorInput.value,
            description: this.elementConfig.descriptionInput.value,
            amount: this.elementConfig.amountInput.value,
            dueDate: this.elementConfig.dueDateInput.value,
            billDisplayArea: this.elementConfig.billDisplayArea
        };
        
        const newBill = new Bill(billRequirements);
        newBill.renderBill();
        this.clearInputs();
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
}

