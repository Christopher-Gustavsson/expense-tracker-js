
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
        this.getBills = this.getBills.bind(this);
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

    // sendDataToServer()
	// {
	// 	console.log("sendDataToServer called");
	// 	$.ajax({
	// 		url: "api/grades",
	// 		method: "POST",
	// 		data: {
	// 			api_key: "AlK0e9FN3A",
	// 			name: $("#studentName").val(),
	// 			course: $("#studentCourse").val(),
	// 			grade: $("#studentGrade").val().toString()
	// 		},
	// 		dataType: "json",
	// 		succes: (response) => {
	// 			console.log(`sendDataToServer: ${response}`);
	// 		},
	// 		error: (e) =>{
	// 			console.log(`sendDataToServer Error: ${e}`);
	// 		}
	// 	});

	// 	this.getServerData();
	// }

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
        console.log("hi");
        let table = document.getElementById('student-list');
        for (let i = table.rows.length - 1; i > 0; i--){
            table.deleteRow(i);
        }
    }
}

