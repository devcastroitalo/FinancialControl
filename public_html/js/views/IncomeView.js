class IncomeView extends View {
    constructor() {
        super(document.querySelector(".income-list-container"));
    }
    
    _template(model) {
        return `
            ${
                model.map((finance) => {
                    return `
                        <div class="income-list__item">
                            <h3 class="income-list__item__title">${finance.title}</h3>
                            <p class="income-list__item__value">$${finance.value}</p>
                        </div>
                    `;
                }).join('')
            }
        `;
    }
}


