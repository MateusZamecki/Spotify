import { IUser } from './../interfaces/iUser';
import { IArtist } from './../interfaces/IArtist';
import { IMusic } from '../interfaces/iMusic';
import { IPlaylist } from '../interfaces/IPlaylist';
import { addMilliseconds, format } from "date-fns";
import { newMusic, newPlaylist } from './factorie';

export function mapSpotifyUser(user: SpotifyApi.CurrentUsersProfileResponse): IUser{
  if(user.images.length > 0){
    return {
      id: user.id,
      name: user.display_name,
      imgUrl: user.images.pop().url
    };
  }
  return {
    id: user.id,
    name: user.display_name,
    imgUrl: ''
  };
}

export function SpotifyPlaylistForPlaylist(playlist: SpotifyApi.PlaylistObjectSimplified): IPlaylist{
  if(playlist.images.length > 0){
    return {
      id: playlist.id,
      name: playlist.name,
      imgUrl: playlist.images.pop().url
    };
  }
  return {
    id: playlist.id,
    name: playlist.name,
    imgUrl: ''
  };
}

export function SpotifySinglePlaylistForSinglePlaylist(playlist: SpotifyApi.SinglePlaylistResponse){
  if(playlist.images.length > 0){
    return {
      id: playlist.id,
      name: playlist.name,
      imgUrl: playlist.images.pop().url,
      songs: playlist.tracks.items.map(x => x.track.id)
    };
  }
  return {
    id: playlist.id,
    name: playlist.name,
    imgUrl: '',
    songs: playlist.tracks.items.map(x => x.track.id)
  };
}

export function SpotifySinglePlaylistForPlaylist(playlist: SpotifyApi.SinglePlaylistResponse ): IPlaylist {
  if (!playlist)
    return newPlaylist();
  if(playlist.images.length > 0){
    return {
      id: playlist.id,
      name: playlist.name,
      imgUrl: '',
      songs: []
    }
  }
  return {
    id: playlist.id,
    name: playlist.name,
    imgUrl: playlist.images.shift().url,
    songs: []
  }
}

export function SpotifyTrackForMusic(spotifyTrack: SpotifyApi.TrackObjectFull) : IMusic{

  if (!spotifyTrack)
    return newMusic();

  const msToMinutes = (ms: number) => {
    const data = addMilliseconds(new Date(0), ms);
    return format(data, 'mm:ss');
  }
  if(spotifyTrack.album.images.length > 0){
    return {
      id: spotifyTrack.uri,
      title: spotifyTrack.name,
      album: {
        id: spotifyTrack.id,
        imgUrl: spotifyTrack.album.images.shift().url,
        name: spotifyTrack.album.name
      },
      artists: spotifyTrack.artists.map(artist => ({
        id: artist.id,
        name: artist.name
      })),
      time: msToMinutes(spotifyTrack.duration_ms),
      imgUrl: spotifyTrack.album.images[0].url
    }
  }
  return {
    id: spotifyTrack.uri,
    title: spotifyTrack.name,
    album: {
      id: spotifyTrack.id,
      imgUrl: spotifyTrack.album.images.shift().url,
      name: spotifyTrack.album.name
    },
    artists: spotifyTrack.artists.map(artist => ({
      id: artist.id,
      name: artist.name
    })),
    time: msToMinutes(spotifyTrack.duration_ms),
    imgUrl: ''
  }

}

export function SpotifyTrackObjectFullForMusic(spotifyTrack: SpotifyApi.SingleTrackResponse) : IMusic{
  if (!spotifyTrack)
    return newMusic();

  const msToMinutes = (ms: number) => {
    const data = addMilliseconds(new Date(0), ms);
    return format(data, 'mm:ss');
  }
  if(spotifyTrack.album.images.length > 0){
    return {
      id: spotifyTrack.uri,
      title: spotifyTrack.name,
      album: {
        id: spotifyTrack.id,
        imgUrl: spotifyTrack.album.images.shift().url,
        name: spotifyTrack.album.name
      },
      artists: spotifyTrack.artists.map(artist => ({
        id: artist.id,
        name: artist.name
      })),
      time: msToMinutes(spotifyTrack.duration_ms),
      imgUrl: spotifyTrack.album.images[0].url
    }
  }
  return {
    id: spotifyTrack.uri,
    title: spotifyTrack.name,
    album: {
      id: spotifyTrack.id,
      imgUrl: spotifyTrack.album.images.shift().url,
      name: spotifyTrack.album.name
    },
    artists: spotifyTrack.artists.map(artist => ({
      id: artist.id,
      name: artist.name
    })),
    time: msToMinutes(spotifyTrack.duration_ms),
    imgUrl: ''
  }

}

export function SpotifyArtistForArtist(spotifyArtist: SpotifyApi.ArtistObjectFull): IArtist{
  return {
    id: spotifyArtist.id,
    imgUrl: spotifyArtist.images.sort((a,b) => a.width - b.width).pop().url,
    name: spotifyArtist.name
  };
}

export function SpotifySimplifiedTrackForMusic(spotifyTrack: SpotifyApi.TrackObjectSimplified): IMusic{

  if (!spotifyTrack)
    return newMusic();

  const msToMinutes = (ms: number) => {
    const data = addMilliseconds(new Date(0), ms);
    return format(data, 'mm:ss');
  }

  return {
    id: spotifyTrack.uri,
    title: spotifyTrack.name,
    album: {
      id: spotifyTrack.id,
      imgUrl: ``,
      name: ``
    },
    artists: spotifyTrack.artists.map(artist => ({
      id: artist.id,
      name: artist.name
    })),
    time: msToMinutes(spotifyTrack.duration_ms),
    imgUrl: ''
  }
}

export function SpotifyCurrentlyPlayingTrackForMusic(spotifyTrack: SpotifyApi.CurrentlyPlayingResponse): IMusic{

  if (!spotifyTrack)
    return newMusic();

  const msToMinutes = (ms: number) => {
    const data = addMilliseconds(new Date(0), ms);
    return format(data, 'mm:ss');
  }

  return {
    id: spotifyTrack.item.id,
    title: spotifyTrack.item.name,
    album: {
      id: spotifyTrack.item.album.id,
      imgUrl: ``,
      name: ``
    },
    artists: spotifyTrack.item.artists.map(artist => ({
      id: artist.id,
      name: artist.name
    })),
    time: msToMinutes(spotifyTrack.item.duration_ms),
    imgUrl: spotifyTrack.item.album.images[0].url
  }
}
