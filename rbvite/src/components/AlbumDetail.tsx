import { useNavigate, useParams } from "react-router-dom";
import { useFetch } from "../hooks/fetch";
import { AlbumType } from "./Album";

export const AlbumDetail = () => {
  const { albumId } = useParams();
  const navigate = useNavigate();

  const { data: albums } = useFetch<AlbumType[]>({
    url: `https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`,
    dependencies: [albumId],
    defaultData: [],
  });

  const { data: album } = useFetch<AlbumType|null>({
    url: `https://jsonplaceholder.typicode.com/albums/${albumId}`,
    dependencies: [albumId],
    defaultData: null,
  });

  return (
    <>
    <h1 className="text-lg m-5">{album?.title}</h1>
      <div className="grid grid-cols-4 gap-4">
        {albums?.map((album) => (
          <img
            key={album.id}
            src={album.thumbnailUrl.toString()}
            alt={`${album.title}`}
          />
        ))}
      </div>
      <button className="m-3 px-2 bg-blue-500 text-white" onClick={()=>navigate(-1)}>뒤로</button>
    </>
  );
};
