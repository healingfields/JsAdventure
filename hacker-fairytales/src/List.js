import React from "react";
import { ReactComponent as Trash } from "./trash.svg";
import { sortBy } from "lodash";

const List = React.memo(({ list, onRemoveItem }) => {
  // console.log("list") ||
  const [sort, setsort] = React.useState({ sortKey: "NONE", isReverse: false });

  const SORTS = {
    NONE: (list) => list,
    TITLE: (list) => sortBy(list, "title"),
    AUTHOR: (list) => sortBy(list, "author"),
    COMMENT: (list) => sortBy(list, "num_comments").reverse(),
    POINT: (list) => sortBy(list, "points").reverse(),
  };

  const handleSort = (sortKey) => {
    const isReverse = sort.sortKey === sortKey && !sort.isReverse;
    setsort({ sortKey, isReverse });
  };

  const sortFunction = SORTS[sort.sortKey];
  const sortedList = sort.isReverse
    ? sortFunction(list).reverse()
    : sortFunction(list);

  return (
    <div>
      <div className="grid gap-4 grid-cols-7 text-center mb-6">
        <span className="col-span-3">
          <button type="button" onClick={() => handleSort("TITLE")}>
            TITLE
          </button>
        </span>
        <span>
          <button type="button" onClick={() => handleSort("AUTHOR")}>
            AUTHOR
          </button>
        </span>
        <span>
          <button type="button" onClick={() => handleSort("COMMENT")}>
            COMMENTS
          </button>
        </span>
        <span>
          <button type="button" onClick={() => handleSort("POINT")}>
            POINTS
          </button>
        </span>
        <span>Actions</span>
      </div>

      {sortedList.map((item) => {
        return (
          <Item item={item} key={item.objectID} onRemoveItem={onRemoveItem} />
        );
      })}
    </div>
  );
});

const Item = ({ item, onRemoveItem }) => {
  // const handleRemoveItem = () => {
  //   onRemoveItem(item)
  // }

  return (
    <div className="grid gap-4 grid-cols-7 text-center">
      <span className="col-span-3 text-left">
        <a href={item.url}>{item.title}</a>
      </span>
      <span>{item.author}</span>
      <span>{item.num_comments}</span>
      <span>{item.points}</span>
      <span>
        <button type="button" onClick={() => onRemoveItem(item)}>
          <Trash className="text-lime-700" />
        </button>
      </span>
    </div>
  );
};

export default List;
