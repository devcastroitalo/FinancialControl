class View {
    constructor(HTMLElement) {
        if (this.constructor === List) {
            throw new Error("View is an abstract class");
        }
        
        this._HTMLElement = HTMLElement;
    }
    
    _template(model) {
        throw new Error("_template is an abstract method");
    }
    
    update(model) {
        this._HTMLElement.innerHTML = this._template(model);
    }
}


