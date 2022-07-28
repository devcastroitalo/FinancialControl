class FinanceDao {
    constructor(connection) {
        this._connection = connection;
        this._store = "financectrl";
    }
    
    add(finance) {
        return new Promise((resolve, reject) => {
            let req = this._connection.transaction([this._store], 'readwrite')
                    .objectStore(this._store)
                    .add(finance);
            
            req.onsuccess = (event) => {
                resolve();
            };
            
            req.onerror = (event) => {
                console.log(event.target.error);
                
                reject(event.target.error.name);
            };
        });
    }
    
    list() {
        return new Promise((resolve, reject) => {
            let cursor = this._connection.transaction([this._store], 'readwrite')
                    .objectStore(this._store)
                    .openCursor();
            let finances = [];
            
            cursor.onsuccess = (event) => {
                let current = event.target.result;
                
                if (current) {
                    let data = current.value;
                    
                    finances.push(new Finance(data._value, data._title));
                    current.continue();
                } else {
                    resolve(finances);
                }
            };
            
            cursor.onerror = (event) => {
                console.log(event.target.error);
                
                reject(event.target.error.name);
            };
        });
    }
}


