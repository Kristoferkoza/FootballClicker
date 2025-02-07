import { KitElement } from "../kitelements/kit-element.model";
import { User } from "../users/user.model";

export interface UserKitElements {
    id: string,
    user: User,
    kitElement: KitElement,
    firstFoundDate: Date,
    quantity: number,
}