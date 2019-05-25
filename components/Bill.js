

class Bill{
    constructor(billRequirements){
        this.vendor = billRequirements.vendorName;
        this.description = billRequirements.descriptionInput;
        this.amount = billRequirements.amountInput;
        this.dueDate = billRequirements.dueDateInput;
        this.billDisplayArea = billRequirements.billDisplayArea;

        this.renderBill = this.renderBill.bind(this);
        this.updateBill = this.updateBill.bind(this);
        this.deleteBill = this.deleteBill.bind(this);
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
                const paidButton = document.createElement("BUTTON");
                paidButton.innerHTML = 'Paid';
                paidButton.setAttribute('id', 'paid-button')

                const editButton = document.createElement("BUTTON");
                editButton.innerHTML = 'Edit';
                editButton.setAttribute('id', 'edit-button');

                tableData.appendChild(paidButton);
                tableData.appendChild(editButton);
            }
            else{
                tableData.innerHTML = billValues[value];
            }

            billTableRow.appendChild(tableData);
        }

        this.billDisplayArea.appendChild(billTableRow);
    }

    updateBill(){

    }

    deleteBill(){

    }
}