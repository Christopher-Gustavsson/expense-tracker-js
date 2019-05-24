
class ExpenseTracker{
    constructor(elementConfig){
        this.elementConfig = elementConfig;
        this.data = {};

        this.addBill = this.addBill.bind(this);
    }

    addEventListeners(){
        this.elementConfig.addButton.addEventListeners('click', addBill);
    }

    addBill(){
        let vendorName = this.elementConfig.vendorName;
        console.log("hi");
        console.log(vendorName);
    }
}

