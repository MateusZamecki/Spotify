import { IMusic } from "./iMusic";

export interface IPlaylist {
  id: string,
  name: string,
  imgUrl: string,
  songs?: IMusic[]
}
