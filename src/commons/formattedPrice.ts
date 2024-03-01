//Reusable Function to format the price in decimals

export const formattedPrice = (price: any) => {
    return Number(price).toLocaleString('en-US')
}