import { useSession } from "../contexts/session-context";
import { useFetch } from "../hooks/fetch";
import Album, { AlbumType } from "./Album";
import { useNavigate } from "react-router-dom";

export const Albums = () => {
  const {
    session: { loginUser, selectedAlbumId },
  } = useSession();
  const navigate = useNavigate();
  const id = loginUser?.id;

  const { data: albums } = useFetch<AlbumType[]>({
    url: `https://jsonplaceholder.typicode.com/albums?userId=${id}`,
    dependencies: [id],
    defaultData: [],
  });

  return (
    <>
      <div className="flex items-center">
        <h1>앨범 목록</h1>
        <button className="m-3 px-2 bg-green-500 text-white" 
        onClick={() => {
          navigate(`/albums/${selectedAlbumId}`, {state:""});
        }}>
          앨범 상세보기
        </button>
      </div>

      <ul>
        {albums?.map((album) => (
          <Album
            key={album.id}
            albumData={album}
          />
        ))}
      </ul>
    </>
  );
};
