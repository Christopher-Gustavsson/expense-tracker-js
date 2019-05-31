

class Bill{
    constructor(billRequirements){
        this.id = billRequirements.id;
        this.vendor = billRequirements.vendor;
        this.description = billRequirements.description;
        this.amount = billRequirements.amount;
        this.dueDate = billRequirements.dueDate;
        this.deleteBill = billRequirements.deleteBill;
        this.billDisplayArea = billRequirements.billDisplayArea;
        this.domElement = null;

        this.renderBill = this.renderBill.bind(this);
        this.updateBill = this.updateBill.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
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
                tableData.setAttribute('id', 'buttons-container');
                const paidButton = document.createElement("BUTTON");
                paidButton.innerHTML = 'Paid';
                paidButton.setAttribute('id', 'paid-button')

                const editButton = document.createElement("BUTTON");
                editButton.innerHTML = 'Edit';
                editButton.setAttribute('id', 'edit-button');
                editButton.addEventListener('click', this.handleDelete);

                tableData.appendChild(paidButton);
                tableData.appendChild(editButton);
            }
            else if(value === 'amount'){
                tableData.innerHTML = `$${billValues[value].toFixed(2)}`;
            }
            else{
                tableData.innerHTML = billValues[value];
            }

            billTableRow.appendChild(tableData);
            this.domElement = billTableRow;
        }

        this.billDisplayArea.appendChild(billTableRow);
    }

    updateBill(){

    }

    handleDelete(){
        this.deleteBill(this.id);
        this.deleteRow(this.domElement);
    }

    deleteRow(row){
        debugger;
        let index = row.sectionRowIndex;
        this.billDisplayArea.deleteRow(index);
    }
}   