class ExpenseView extends View {
    constructor() {
        super(document.querySelector(".expense-list-container"));
    }
    
    _template(model) {
        return `
            ${
                model.map((finance) => {
                    return `
                        <div class="expense-list__item">
                            <h3 class="expense-list__item__title">${finance.title}</h3>
                            <p class="expense-list__item__value">-$${finance.value}</p>
                        </div>
                    `;
                }).join('')
            }
        `;
    }
}


