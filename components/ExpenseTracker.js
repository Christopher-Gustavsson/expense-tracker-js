
class ExpenseTracker{
    constructor(elementConfig){
        this.elementConfig = {
            addButton: elementConfig.addButton,
            cancelButton: elementConfig.cancelButton,
            vendorInput: elementConfig.vendorInput,
            descriptionInput: elementConfig.descriptionInput,
            amountInput: elementConfig.amountInput,
            dueDateInput: elementConfig.dueDateInput
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
        let vendorName = this.elementConfig.vendorInput.value;
        let descriptionInput = this.elementConfig.descriptionInput.value;
        let amountInput = this.elementConfig.amountInput.value;
        let dueDateInput = this.elementConfig.dueDateInput.value;
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

