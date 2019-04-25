/**
 * Description: Validators
 * Date: 4/23/2019
 */

export const verifyEmail = (value) => {
    var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRex.test(value)) {
      return true;
    }

    return false;
}

export const verifyLength = (value, length) => {
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

export const verifyUrl = (value) => {
    var urlRex = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    if (urlRex.test(value)) {
        return true;
    }
    return false;
}

export const verifyOrgNo = (value) => {
    var regx = /[0-9]{6}-[0-9]{4}$/;

    if(regx.test(value)) {
        return true;
    }

    return false;
}

export const verifyPhone = (value) => {
    var regx = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
    if(regx.test(value)) {
        return true;
    }

    return false;
}
