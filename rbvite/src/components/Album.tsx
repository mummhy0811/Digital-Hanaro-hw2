import clsx from "clsx";
import { useSession } from "../contexts/session-context";

export type AlbumType = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: String;
};

type Props = {
  albumData: AlbumType;
  selectedAlbumId: number | null;
  onSelect: () => void;
};

const Album = ({ albumData }: Props) => {


  const {
    session:{selectedAlbumId},
    setAlbum,
  } = useSession();

  console.log(selectedAlbumId);
  const isSelected = selectedAlbumId === albumData.id;

  return (
    <>
      <li
        className={clsx({
          border: isSelected,
          "border-sky-400": isSelected,
          "mx-3": isSelected,
        })}
        onClick={()=>{
          setAlbum(albumData.id);
          console.log(`클릭! ${albumData.id}`)}
        }
      >
        <strong className="items-start">
          {" "}
          {albumData?.id}.{albumData?.title}{" "}
        </strong>
      </li>
    </>
  );
};

export default Album;
