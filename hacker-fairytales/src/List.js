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
      <div
        style={{ display: "flex", marginBottom: "20px", fontWeight: "bold" }}
      >
        <span style={{ width: "40%" }}>
          <button
            type="button"
            className="button"
            onClick={() => handleSort("TITLE")}
          >
            TITLE
          </button>
        </span>
        <span style={{ width: "30%" }}>
          <button
            type="button"
            className="button"
            onClick={() => handleSort("AUTHOR")}
          >
            AUTHOR
          </button>
        </span>
        <span style={{ width: "10%" }}>
          <button
            type="button"
            className="button"
            onClick={() => handleSort("COMMENT")}
          >
            COMMENTS
          </button>
        </span>
        <span style={{ width: "10%" }}>
          <button
            type="button"
            className="button"
            onClick={() => handleSort("POINT")}
          >
            POINTS
          </button>
        </span>
        <span style={{ width: "10%" }}>Actions</span>
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
    <div className="item">
      <span style={{ width: "40%" }}>
        <a href={item.url}>{item.title}</a>
      </span>
      <span style={{ width: "30%" }}>{item.author}</span>
      <span style={{ width: "10%" }}>{item.num_comments}</span>
      <span style={{ width: "10%" }}>{item.points}</span>
      <span style={{ width: "10%" }}>
        <button
          type="button"
          onClick={() => onRemoveItem(item)}
          className="button button_small remove"
        >
          <Trash height="18px" width="18px" color="black" />
        </button>
      </span>
    </div>
  );
};

export default List;
