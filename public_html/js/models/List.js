class List {
    constructor(data) {
        if (this.constructor === List) {
            throw new Error("List is an abstract class");
        }
        
        this._data = data;
    }
    
    add(element) {
        this._data.push(element);
    }
    
    remove(element) {
        this._data.splice(this._data.indexOf(element), 1);
    }
    
    get data() {
        return [].concat(this._data);
    }
}


