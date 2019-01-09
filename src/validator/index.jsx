/**
 * Description: Validator
 * Date: 12/27/2018
 */

export const verifyEmail = (value) => {
    if(value.length === 0) return ""
    var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRex.test(value)) {
      return true;
    }
    return false;
}

export const verifyLength = (value, length) => {
    if(value.length === 0) return ""
    if (value.length >= length) {
        return true;
    }
    return false;
}

export const compare = (string1, string2) => {
    if (string1 === string2) {
        return true;
    }
    return false;
}
export const verifyNumber = (value) => {
    if(value.length === 0) return ""
    var numberRex = new RegExp("^[0-9]+$");
    if (numberRex.test(value)) {
        return true;
    }
    return false;
}

export const verifyUrl = (value) => {
    try {
        new URL(value);
        return true;
    } catch (_) {
        return false;
    }
}

export const verifyOrgNo = (value) => {
    if(value.length === 0) return ""
    var regx = /[0-9]{6}-[0-9]{4}$/;
    if(regx.test(value)) {
        return true;
    }

    return false;
}

export const verifyPhone = (value) => {
    if(value.length === 0) return ""
    var regx = /\+[0-9]{9}$/;
    if(regx.test(value)) {
        return true;
    }

    return false;
}
