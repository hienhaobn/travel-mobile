import BigNumber from 'bignumber.js';

export const removeUndefinedField = (params: object) => {
    Object.keys(params).forEach(key => {
        if (typeof params[key] === 'undefined') {
            delete params[key];
        }
    });
    return params;
};

export const convertPayloadToQueryString = (payload: object = {}) => {
    return Object.keys(payload).map(key => {
        return encodeURIComponent(key) + '=' + encodeURIComponent(payload[key]);
    }).join('&');
};

export const validateEmail = (email: string) => {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
};

export const validatePassword = (password: string) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d#$@!%&*?]{8,}$/;
    return regex.test(password);
};

export const secureEmail = (email: string) => {
    if (!email) {
        return '';
    }
    const indexOfAt = email.lastIndexOf('@');
    const beforeAt = email.substring(0, indexOfAt);
    const afterAt = email.substring(indexOfAt);
    return beforeAt.substring(0, 4) + '****' + afterAt;
};

// eslint-disable-next-line complexity
export const validateInputNumber = (text: string, previousText: string = '', decimal: number = 8, beforeDecimal?: number, allowNegative: boolean = false) => {

    const textReplace = text.replace(/,/g, '.');
    const previousTextReplace = previousText.replace(/,/g, '.');
    if (textReplace?.length < previousTextReplace?.length) {
        return textReplace;
    }
    if (textReplace.includes(' ')) {
        return previousText;
    }
    if (!allowNegative && (textReplace.includes('-') || !textReplace.match(/^[0-9]*\.?[0-9]*$/))) {
        return previousText;
    }
    if (textReplace.charAt(0) === '.' || textReplace.split('.').length > 2) {
        return previousText;
    }

    if (decimalCountOfNumber(text) > decimal || (beforeDecimal && beforeDecimalCountOfNumber(text) > beforeDecimal)) {
        return previousText;
    }

    if (allowNegative) {
        const previousValueNegative = `-${previousTextReplace.replace(/-/g, '')}`;
        if (textReplace === '' && previousValueNegative === '-') {
            return '';
        }
        return `-${textReplace.replace(/-/g, '')}`;
    }

    return textReplace;
};

export const formatNumberInputWhenBlur = (value: string) => {
    if (!value) {
        return '';
    }
    const dotIndex = value?.indexOf('.');
    if (dotIndex === -1) { // Integer
        return parseInt(value).toString();
    } else if (dotIndex === 0) { // Dot first
        return `0${value}`;
    } else { // Number with decimals
        const before = parseInt(value.slice(0, dotIndex)).toString();
        const after = value.slice(dotIndex);
        return before + after;
    }
};

export const getDecimalsFromSymbol = (symbol: string) => {
    return symbol?.toLowerCase()?.match(/usd|usdt/) ? 2 : undefined;
}

export const getDecimalsFromMovement = (movement: string) => {
    return decimalCountOfNumber(new BigNumber(movement).toString() || 2);
}

export const decimalCountOfNumber = (text: string | number) => {
    if (text) {
        const str = text.toString().replace(/,/g, '.');
        if (!str.includes('.')) {
            return 0;
        } else {
            return str.split('.')[1].length;
        }
    } else {
        return 0;
    }
}

const beforeDecimalCountOfNumber = (text: string) => {
    const str = text.toString().replace(/,/g, '.').replace(/-/g, '');
    if (str.includes('.')) {
        return str.length - decimalCountOfNumber(str) - 1
    } else {
        return str.length - decimalCountOfNumber(str);
    }
}
