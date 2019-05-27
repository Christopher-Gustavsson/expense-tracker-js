
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
        console.log("getBills:");
        fetch("/public/api/data/get-bills.json").then(resp => resp.json())
        .then(data => {
            //use data here
            const billsArray = data.bills;

            billsArray.forEach( bill => {
                console.log("id:", bill.id);
                console.log("vendor:", bill.vendor);
                console.log("description", bill.description);
                console.log("amount", bill.amount);
                console.log("dueDate", bill.dueDate);
                const billRequirements = {
                    id: bill.id,
                    vendor: bill.vendor,
                    description: bill.description,
                    amount: bill.amount,
                    dueDate: bill.dueDate,
                    billDisplayArea: this.elementConfig.billDisplayArea
                };

                //create bill
                const newBill = new Bill(billRequirements);
                //render bill
                newBill.renderBill();
            });
            // for(let bill = 0; bill < billsArray.length; bill++){
            //     // console.log(billsArray[bill]);
            //     console.log("bill number: ", bill);
            //     for(let billValue in billsArray[bill]){
                    
            //         console.log(billsArray[bill][billValue]);
            //     }
            // }

        });
    }

    addBill(){
        //TODO: need to include bill ID.
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

