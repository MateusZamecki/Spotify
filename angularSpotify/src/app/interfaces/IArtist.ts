import { IMusic } from "./iMusic";

export interface IArtist {
  id: string,
  name: string,
  imgUrl: string,
  songs?: IMusic[]
}
