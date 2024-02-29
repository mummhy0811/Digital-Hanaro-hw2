type Session = {
  loginUser: LoginUser | null;
  selectedAlbumId: number | null;
};

type LoginUser = {
  id: number | null;
  username: string | null;
};
