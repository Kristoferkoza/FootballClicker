import { KitPart } from "../../_enums/kit-part.enum";
import { KitType } from "../../_enums/kit-type.enum";

export interface KitElement {
    id: string;
    name: string;
    kit_part: KitPart;
    kit_type: KitType;
    points_given: number;
    can_be_dropped: boolean;
    image_url: string;
}
