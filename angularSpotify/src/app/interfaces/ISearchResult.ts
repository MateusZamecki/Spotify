import { IArtist } from './IArtist';
import { IMusic } from './iMusic';
import { IPlaylist } from './IPlaylist';

export interface ISearchResult {
  songs: IMusic[];
  playlists: IPlaylist[];
  artists: IArtist[];
}
