import { type RowComponentProps } from "react-window";
import PostCard from "../PostCard";

function RowComponent({
  index,
  item,
  style,
}: RowComponentProps<{
  names: string[];
}>) {
  return (
    <PostCard key={item.id} {...item} />
  );
}

export default RowComponent;