const AV = require('../libs/av-weapp-min');

class Binding extends AV.Object {
    get IMEI(){
        return this.get('IMEI');
    }
}

AV.Object.register(Binding,'Bindings');
module.exports = Binding;