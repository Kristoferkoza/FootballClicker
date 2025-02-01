import { Card } from "../cards/card.model";
import { User } from "../users/user.model";

export interface UserCards {
    id: string,
    user: User,
    card: Card,
    firstFoundDate: Date,
    quantity: number,
}