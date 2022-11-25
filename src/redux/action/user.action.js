// action for user reducer
import axios from 'axios';

export const updateBuyer = (buyer_id, form, handleSuccess) => ({
    type: 'UPDATE_BUYER',
    payload: new Promise((resolve, reject) => {
        axios
        .put(`${process.env.REACT_APP_BACKEND_URL}/v1/buyer/${buyer_id}`, form,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
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
});

// get user
// update user
// delete user
