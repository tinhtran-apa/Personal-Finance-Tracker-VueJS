export const formatMoney = (value) => {
    return (value ?? 0).toLocaleString("en-US")
}