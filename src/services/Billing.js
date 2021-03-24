import Socket from "../util/Socket";
import { billingEPs } from "../Config.json";

const { cartInsertEP, cartUpdateEP, cartDeleteEP, cartRetrieveEP, cartClearEP, orderPlaceEP, orderRetrieveEP, orderCompleteEP } = billingEPs;

async function cartInsert(email, movie_id, quantity) {
    const payload = {
        email: email,
        movie_id: movie_id,
        quantity: quantity
    };

    return await Socket.POST(cartInsertEP, payload);
}

async function cartUpdate(email, movie_id, quantity) {
    const payload = {
        email: email,
        movie_id: movie_id,
        quantity: quantity
    };

    return await Socket.POST(cartUpdateEP, payload);
}

async function cartDelete(email, movie_id) {
    const payload = {
        email: email,
        movie_id: movie_id
    };

    return await Socket.POST(cartDeleteEP, payload);
}

async function cartRetrieve(email) {
    const payload = {
        email: email
    };

    return await Socket.POST(cartRetrieveEP, payload);
}

async function cartClear(email) {
    const payload = {
        email: email
    };

    return await Socket.POST(cartClearEP, payload);
}

async function orderPlace(email) {
    const payload = {
        email: email
    };

    return await Socket.POST(orderPlaceEP, payload);
}

async function orderRetrieve(email) {
    const payload = {
        email: email
    };

    return await Socket.POST(orderRetrieveEP, payload);
}

// params should be a json containing query params
async function orderComplete(params) {
    const data = {
        params: params
    };

    return await Socket.GETWITHPARAMS(orderCompleteEP, data);
}

export default {
    cartInsert,
    cartUpdate,
    cartDelete,
    cartRetrieve,
    cartClear,
    orderPlace,
    orderRetrieve,
    orderComplete
}