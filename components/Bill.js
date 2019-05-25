

class Bill{
    constructor(billRequirements){
        this.vendor = billRequirements.vendorName;
        this.description = billRequirements.descriptionInput;
        this.amount = billRequirements.amountInput;
        this.dueDate = billRequirements.dueDateInput;
        this.billDisplayArea = billRequirements.billDisplayArea;

        this.createBill = this.createBill.bind(this);
        this.updateBill = this.updateBill.bind(this);
        this.deleteBill = this.deleteBill.bind(this);
    }

    createBill(){
        
    }

    updateBill(){

    }

    deleteBill(){

    }
}