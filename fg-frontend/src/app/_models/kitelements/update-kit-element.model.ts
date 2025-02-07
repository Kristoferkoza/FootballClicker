import { KitPart } from "../../_enums/kit-part.enum";
import { KitType } from "../../_enums/kit-type.enum";

export interface UpdateKitElement {
    name?: string;
    kit_part?: KitPart;
    kit_type?: KitType;
    points_given?: number;
    cost?: number;
    image_url?: string;
}