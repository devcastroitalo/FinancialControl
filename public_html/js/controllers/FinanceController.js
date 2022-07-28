class FinanceController {
    constructor() {
        let self = this;
        
        this._currentBalance = document.querySelector(".current-balance");
        this._financeValue = document.querySelector(".new-finance__value-input");
        this._financeTitle = document.querySelector(".new-finance__title-input");
        
        this._incomeView = new IncomeView();
        this._expenseView = new ExpenseView();
        
        this._incomeList = ProxyFactory.create(
                new IncomeList(),
                ["add", "remove"],
                (model) => {
                    self._incomeView.update(model.data);
                }
                );             
        this._expenseList = ProxyFactory.create(
                new ExpenseList(),
                ["add", "remove"],
                (model) => {
                    self._expenseView.update(model.data);
                }
                ); 
        
        ConnectionFactory.getConnection()
                .then((connection) => {
                    new FinanceDao(connection).list()
                        .then((finances) => {
                            finances.forEach((finance) => {
                                if (finance.value < 0) {
                                    this._expenseList.add(finance);
                                } else {
                                    this._incomeList.add(finance);
                                }
                            });
                    });
        });
    }
    
    _createFinance() {
        return new Finance(
                parseInt(this._financeValue.value),
                this._financeTitle.value
        );
    }
    
    _addIndexedDB(finance, list) {
        ConnectionFactory.getConnection()   
                .then((connection) => {
                    new FinanceDao(connection).add(finance)
                        .then(() => {
                            list.add(finance);
                    });
        })
                .catch((error) => {
                    console.log(error);
        });
    }
    
    _addFinance() {
        let finance = this._createFinance();
        
        if (finance.value < 0) {
            this._addIndexedDB(finance, this._expenseList);
        } else {
            this._addIndexedDB(finance, this._incomeList);
        } 
    }
    
    _calcCurrentBalance() {
        let values = this._incomeList.data.concat(this._expenseList.data);
        let total = 0;
        
        values.forEach((value) => {
            total += parseFloat(value.value);
        });
        
        this._currentBalance.textContent = `$${total}`;

        this._currentBalance.classList.remove("negative");
        this._currentBalance.classList.remove("positive");
        
        if (total < 0) {
            this._currentBalance.classList.add("negative");
        } else {
            this._currentBalance.classList.add("positive");
        }
    }
    
    _clearInput() {
        this._financeValue.value = "";
        this._financeTitle.value = "";
        
        this._financeValue.focus();
    }
    
    add(event) {
        event.preventDefault();
       
        this._addFinance();
        this._calcCurrentBalance();
        this._clearInput();
    }
}


