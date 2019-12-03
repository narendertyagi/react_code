class Util {
    isEmpty(obj) {
        for(var prop in obj) {
            if(obj.hasOwnProperty(prop))
                return false;
        }
    
        return JSON.stringify(obj) === JSON.stringify({});
    }

    objValue(obj, props=[], defaultValue = null) {
        if(undefined==obj || this.isEmpty(obj)) return defaultValue
        
        props.forEach(element => {
            // console.log(element, obj)
            if(undefined==obj || this.isEmpty(obj) || !obj.hasOwnProperty(element)) {
                obj = defaultValue
                return
            }
            // console.log(obj, element, obj.hasOwnProperty(element))
            obj = obj[element];

            // console.log(defaultValue)
            
        });
        
        return obj
    }
}

module.exports =  new Util()