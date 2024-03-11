import { Appearance } from "./Appearance"
import { Biography } from "./Biography"
import { Connections } from "./Connections"
import { Powerstats } from "./Powerstats"
import { Work } from "./Work"
import { Image } from "./Image"

export interface Hero {
    id: string
    name: string
    powerstats: Powerstats
    biography: Biography
    appearance: Appearance
    work: Work
    connections: Connections
    image: Image
}