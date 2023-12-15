import {v4 as uuid} from 'uuid'
export const CONSTRUCTOR_ADD = 'CONSTRUCTOR_ADD'
export const CONSTRUCTOR_DELETE = 'CONSTRUCTOR_DELETE'

export const constructorAdd = (ingredient) =>({
    type:CONSTRUCTOR_ADD,
    payload:{
        ...ingredient,
        id:uuid()
    }
})