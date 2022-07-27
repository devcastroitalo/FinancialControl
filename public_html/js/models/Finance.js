class Finance {
    constructor(value, title) {
        this._value = value;
        this._title = title;
    }
    
    get value() {
        return this._value;
    }
    
    set value(value) {
        this._value = value;
    }
    
    get title() {
        return this._title;
    }
    
    set title(title) {
        this._title = title;
    }
}


