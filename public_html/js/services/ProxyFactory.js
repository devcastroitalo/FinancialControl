class ProxyFactory {
    static create(object, props, action) {
        return new Proxy(object, {
            get(target, prop, receiver) {
                let hasProp = props.includes(prop);
                let isMethod = typeof(target[prop]) === typeof(Function);
                
                if (hasProp && isMethod) {
                    return function() {
                        Reflect.apply(target[prop], target, arguments);
                        
                        return action(target);
                    };
                }
                
                return Reflect.get(target, prop);
            },
            set(target, prop, value, receiver) {
                if (target[prop]) {
                    action(target[prop]);
                }
                
                return Reflect.set(target, prop, value);
            }
        });
    }
}

