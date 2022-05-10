import { IPlaylist } from './../interfaces/IPlaylist';
import { IArtist } from './../interfaces/IArtist';
import { IMusic } from './../interfaces/iMusic';

export function newArtist(): IArtist {
  return {
    id: '',
    imgUrl: '',
    name: '',
    songs: []
  };
}

export function newMusic(): IMusic {
  return {
    id: '',
    album: {
      id: '',
      imgUrl: '',
      name: '',
    },
    artists: [],
    time: '',
    title: '',
    imgUrl: ''
  }
}

export function newPlaylist(): IPlaylist {
  return {
    id: '',
    imgUrl: '',
    name: '',
    songs: []
  }
}
