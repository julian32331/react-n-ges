/**
 * Description: Validator
 * Date: 12/27/2018
 * Author: Danijel
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

