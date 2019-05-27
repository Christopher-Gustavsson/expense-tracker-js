
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

    addBill(){
        const billRequirements = {
            vendorName: this.elementConfig.vendorInput.value,
            descriptionInput: this.elementConfig.descriptionInput.value,
            amountInput: this.elementConfig.amountInput.value,
            dueDateInput: this.elementConfig.dueDateInput.value,
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

