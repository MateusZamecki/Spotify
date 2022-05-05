import { IUsuario } from './../interfaces/iusuario';

export function setSpotifyUser(user: SpotifyApi.CurrentUsersProfileResponse): IUsuario{
  return {
    id: user.id,
    name: user.display_name,
    imgUrl: user.images.pop().url
  }
}
