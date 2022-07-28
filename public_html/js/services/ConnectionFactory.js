var ConnectionFactory = (function() {
    var dbName = "finances";
    var stores = ["financectrl"];
    var version = 1;
    var connection = null;
    
    return class ConnectionFactory {
        constructor() {
            throw new Error("ConnectionFacotry is an abstract class");
        }
        
        static _createStore(connection) {
            stores.forEach((store) => {
                if (connection.objectStoreNames.contains(store)) {
                    connection.deleteObjectStore(store);
                }
                
                connection.createObjectStore(store, { autoIncrement: true });
            });
        }
        
        static getConnection() {
            return new Promise((resolve, reject) => {
                let req = window.indexedDB.open(dbName, version);
                
                req.onupgradeneeded = (event) => {
                    ConnectionFactory._createStore(event.target.result);
                };
                
                req.onsuccess = (event) => {
                    if (!connection) {
                        connection = event.target.result;
                    }
                    
                    resolve(connection);
                };
                
                req.onerror = (event) => {
                    console.log(event.target.error);
                    
                    reject(event.target.error.name);
                };
            });
        }
    }
})();


