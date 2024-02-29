import clsx from "clsx";

export type AlbumType = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: String;
};

type Props = {
  albumData: AlbumType;
  selectedAlbumId: number|null;
  onSelect: () => void;
};

const Album = ({ albumData, selectedAlbumId, onSelect }: Props) => {

    const isSelected = selectedAlbumId===albumData.id;
    console.log(selectedAlbumId);
  return (
    <>
      <li
        className={clsx({
          border: isSelected,
          "border-sky-400": isSelected,
          "mx-3": isSelected,
        })}
        onClick={onSelect}
      >
        <strong className="items-start"> {albumData?.id}.{albumData?.title} </strong>
      </li>
    </>
  );
};

export default Album;
