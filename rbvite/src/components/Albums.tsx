import { useState } from "react";
import { useSession } from "../contexts/session-context";
import { useFetch } from "../hooks/fetch";
import Album, { AlbumType } from "./Album";

export const Albums = () => {
  const {
    session: { loginUser },
  } = useSession();

  const [selectedAlbumId, setSelectedAlbumId] = useState<number | null>(null);
  const id = loginUser?.id;
  
  const handleAlbumClick = (albumId: number) => {
    setSelectedAlbumId(albumId);
  };

  const {
    data: albums,
  } = useFetch<AlbumType[]>({
    url: `https://jsonplaceholder.typicode.com/albums?userId=${id}`,
    dependencies: [id],
    defaultData: [],
  });

  return (
    <>
    <div className="flex items-center">
        <h1>앨범 목록</h1>
        <button className='m-3 px-2 bg-green-500 text-white'>앨범 상세보기</button>
    </div>
    
      {/* <ul>
        {albums?.map((album) => (
          <Album 
          key={album.id} albumData={album} 
          selectedAlbumId={selectedAlbumId}
          onSelect={() => handleAlbumClick(album.id)} />
        ))}
      </ul> */}
      <ul>
          {albums?.map((album) => (
            <li key={album.id}>
              <button
                onClick={()=>setSelectedAlbumId(album.id)}
                className='hover:text-blue-300'
                
              >
                <small className='text-gray-300'>#{album.id}</small>
                {album.title}
              </button>
            </li>
          ))}
        </ul>
    </>
  );
};

