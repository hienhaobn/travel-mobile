import BigNumber from 'bignumber.js';

export const formatCurrency = (val: number | string, decimals: number = 8, roundType: BigNumber.RoundingMode = BigNumber.ROUND_DOWN) => {
    if (!val) {
        return '0';
    }
    const balanceFormatted = new BigNumber(val.toString());
    if (balanceFormatted.isNaN()) {
        return '0';
    }
    const a = balanceFormatted.toFormat(decimals, roundType);
    const b = balanceFormatted.toFormat();

    return a.length > b.length ? b : a.replace(/(\.0+|0+)$/, '');
};

export const formatCurrencyWithDecimals = (val: number | string, decimals: number = 8, roundType: BigNumber.RoundingMode = BigNumber.ROUND_DOWN) => {
    const zeroFormatted = new BigNumber('0').toFormat(decimals, roundType);
    if (!val) {
        return zeroFormatted;
    }
    const balanceFormatted = new BigNumber(val.toString());
    if (balanceFormatted.isNaN() || balanceFormatted.isZero()) {
        return zeroFormatted;
    }
    return balanceFormatted.toFormat(decimals, roundType);
};

export const formatCurrencyWithoutComma = (val: number | string, decimals: number = 8, roundType: BigNumber.RoundingMode = BigNumber.ROUND_DOWN) => {
    return formatCurrency(val, decimals, roundType).replace(/,/g, '');
};

export const formatCurrencyWithAbsolute = (val: number | string, decimals: number = 8, roundType: BigNumber.RoundingMode = BigNumber.ROUND_DOWN) => {
    const balanceFormatted = new BigNumber(val.toString()).abs();
    return formatCurrency(balanceFormatted.toString(), decimals, roundType);
};
