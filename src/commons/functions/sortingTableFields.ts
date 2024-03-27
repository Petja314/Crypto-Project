export const sortingFieldsHandler = (data: any[], key: any, priceSort: boolean) => {
    console.log('data', data)
    console.log('key', key)
    console.log('priceSort', priceSort)
    data.sort((a: any, b: any) => {
        if (key === "name") {
            return priceSort ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
        } else {
            return priceSort ? b[key] - a[key] : a[key] - b[key];
        }
    });
    return data;
};
