import { $authHost, $host } from './index'

export const fetchAllItems = async () => {
    const { data } = await $authHost.get('api/basket')
    return data
}

export const createOrder = async (items) => {
    console.log(items)
    const { data } = await $authHost.post('api/order', items)
    return data
}

export const fetchAllOrders = async () => {
    const { data } = await $authHost.get('api/order')
    return data
}
