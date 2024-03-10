//Reusable Function to format the price in decimals

// export const formattedPrice = (price: any) => {
//     return Number(price).toLocaleString('en-US')
// }


export const formattedPrice = (price: any, decimalPrecision: number = 2) => {
    const numericPrice = Number(price);

    const formattedNumber = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: decimalPrecision,
        maximumFractionDigits: decimalPrecision,
    }).format(numericPrice);

    return formattedNumber;
};

