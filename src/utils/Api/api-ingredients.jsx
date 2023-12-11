export const ApiUrl ='https://norma.nomoreparties.space/api/ingredients'

const checkResponse = (res) =>{
    return res.ok ? res.json() : res.json().then((err)=>Promise.reject(err));
};
export const ingredientBurger = (data) => {
return fetch ('https://norma.nomoreparties.space/api/ingredients',{
    method:'GET',
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
    },
})
    .then(checkResponse)
    .then((data)=>{
        if (data?.success) return data;
        return Promise.reject(data)
    }).catch((error) => {
        console.error('Error during order:', error);
        return Promise.reject(error);
    });
}

export const orderBurger = (data) => {
    return fetch ('https://norma.nomoreparties.space/api/orders',{
        method:'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
            ingredients:data,
        }),
        }).then(checkResponse)
        .then((data)=>{
            if (data?.success) return data;
            return Promise.reject(data)
        })
        .catch((error) => {
            console.error('Error during order:', error);
            return Promise.reject(error);
        });
    }
