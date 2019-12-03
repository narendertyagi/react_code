import Response from './class/Response'

class Util {
	constructor() {
        this.Response = new Response()
    }
    
    async init() {
        // console.log('Util Init')
    }

    /* 
        Get classname from ES6 module or require
        Whilte importing async/await like const demo = import("../demo") -> ES6 it returns classname in c.default
        but when we require demo = rqeuire("../demo") then it return direct classname
    */
    getClass = (c) => {
        const ClassNew = c.__esModule ? c.default : c
        return ClassNew
    }

    isset = (obj /*, level1, level2, ... levelN*/) => {
        var dump;
        if(undefined==obj) return false

        // console.log(arguments)
        // var args = Array.prototype.slice.call(arguments),
        //     obj = args.shift();
    
        // for (var i = 0; i < args.length; i++) {
        // if (!obj.hasOwnProperty(args[i])) {
        //     return false;
        // }
        //     obj = obj[args[i]];
        // }
        return true;
    }

    isEmptyArray = (arr) => {
        if(undefined==arr || arr.length==0) return true
        return false
    }

    isEmpty = (obj) => {
        for(var prop in obj) {
            if(obj.hasOwnProperty(prop))
                return false;
        }
    
        return JSON.stringify(obj) === JSON.stringify({});
    }

    objValue = (obj, props=[], defaultValue = null) => {
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

    hashCode(str){
        var hash = 5381,
        i    = str.length;
  
        while(i) {
        hash = (hash * 33) ^ str.charCodeAt(--i);
        }
    
        /* JavaScript does bitwise operations (like XOR, above) on 32-bit signed
        * integers. Since we want the results to be always positive, convert the
        * signed int to an unsigned by doing an unsigned bitshift. */
        return hash >>> 0;
    }

    async asyncForEach(array, callback) {
        for (let index = 0; index < array.length; index++) {
          await callback(array[index], index, array)
        }
    }

    getObjKey(key, defaultValue=null) {
        try {
            return eval(key)
        } catch (error) {
            return defaultValue
        }
    }
}

export default new Util()