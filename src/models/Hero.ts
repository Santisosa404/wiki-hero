import { Appearance } from "./Appearance"
import { Biography } from "./Biography"
import { Work } from "./Work"
import { Image } from "./Image"

export interface Hero {
    id: string
    name: string
    biography: Biography
    appearance: Appearance
    work: Work
    image: Image
}