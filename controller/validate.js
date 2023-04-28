function isNumeric(val) {
    return /^-?\d+$/.test(val);
}
const validate = {

    noNumber(num) {
        if ( Number.isNaN(Number(num)) )throw new Error("Nenhum número digitado") 
        if (Number(num) < 0) throw new Error("Não é permitido inserir um número negativo")
    },
    nameValidate(name) {
        const re = /^[^{}<>#$%&~^`/*+¿?¡!@]*$/g;
        if (!re.test(String(name))) throw new Error(`${name} não é um nome válido`)
    },
    notEmpty(args) {
        args.forEach(element => {
            if(!element.trim().length) throw new Error(`o campo ${element} está vazio`)
        });
    },
    argumentsValidate(args) {
        args.forEach(({ keyName, value, type, notEmpty, optional }) => {
            if (value != undefined) {
                if (type === 'array') {
                    if (!Array.isArray(value)) throw new Error(`${keyName} ${value} não é tipo ${type}`);
                }
                if (typeof value !== type && type !== 'array') {
                    if (keyName === "password") throw new Error(`a senha fornecida não está no tipo ${type}`)
                    throw new Error(`${keyName} ${value} não é tipo ${type}`);
                }
                if (notEmpty) {
                    if (type === 'string') {
                        if (!value.trim().length) throw new Error(`${keyName} está vazio`);
                    } else if (type === 'array') {
                        if (value.length === 0) throw new Error(`${keyName} está vazio`);
                    }
                }
            } else if (!optional) throw new Error(`${keyName} não é opcional`);
        })
    }

}

module.exports = validate;