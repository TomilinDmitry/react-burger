import { RootState } from "../.."

export type TElements = {
    unId: string
    id:string,
    _id: string,
    name: string,
    type: string,
    proteins: number,
    fat: number,
    carbohydrates:number,
    calories:number,
    price: number,
    image:string,
    image_mobile: string,
    image_large: string,
    __v: number,
}
export type TElementsWithOrderNumber = TElements & {
    orderNumber: RootState['order']['orderNumber'];
};