// action for address reducer
import axios from 'axios';

export const getAddress = () => {
    return {
        type: 'GET_ADDRESS',
        payload: axios({
            method: 'GET',
            url: `${process.env.REACT_APP_BACKEND_URL}/v1/address`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        }),
    };
}

export const insertAddress = (body, handleSuccess) => ({
    type: 'INSERT_ADDRESS',
    payload: new Promise((resolve, reject) => {
        axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/v1/address`, body,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            }
        )
        .then((res) => {
            handleSuccess();
            resolve(res.data);
            console.log(res.data);
        })
        .catch((err) => {
            reject(err);
        })
    })
})
export const deletedAddress = (address_id, handleSuccessDelete) => ({
    type: 'DELETE_ADDRESS',
    payload: new Promise((resolve, reject) => {
        axios
        .delete(`${process.env.REACT_APP_BACKEND_URL}/v1/address/${address_id}`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            }
        )
        .then((res) => {
            handleSuccessDelete();
            resolve(res.data);
            console.log(res.data);
        })
        .catch((err) => {
            reject(err);
        })
    })
})
export const updatedAddress = (address_id, body, handleSuccess) => ({
    type: 'UPDATE_ADDRESS',
    payload: new Promise((resolve, reject) => {
        axios
        .put(`${process.env.REACT_APP_BACKEND_URL}/v1/address/${address_id}`, body,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            }
        )
        .then((res) => {
            handleSuccess();
            resolve(res.data);
            console.log(res.data);
        })
        .catch((err) => {
            reject(err);
        })
    })
})

// get address
// insert address
// update address
// delete address
