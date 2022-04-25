import React from "react";
import { ReactComponent as Trash } from "./trash.svg";

const List = React.memo(({ list, onRemoveItem }) => {
  // console.log("list") ||

  return (
    <div>
      <div
        style={{ display: "flex", marginBottom: "20px", fontWeight: "bold" }}
      >
        <span style={{ width: "40%" }}>
          <button type="button">TITLE</button>
        </span>
        <span style={{ width: "30%" }}>
          <button type="button">AUTHOR</button>
        </span>
        <span style={{ width: "10%" }}>
          <button type="button">COMMENTS</button>
        </span>
        <span style={{ width: "10%" }}>
          <button type="button">POINTS</button>
        </span>
        <span style={{ width: "10%" }}>Actions</span>
      </div>

      {list.map((item) => {
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
