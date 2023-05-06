import SearchBar from "../main/SearchBar";
import DragImage from "./DragImage";
type Props = {};

export default function ImageUpload({}: Props) {
  return (
    <section className="mt-12 flex flex-col mx-8 text-lg">
      <div>
        <label className=""> 이미지 업로드</label>
        <DragImage />
      </div>
      <SearchBar />
    </section>
  );
}
