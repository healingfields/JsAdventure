import { render, screen } from "@testing-library/react";
import App from "./App";
import { SearchForm, List, Item, InputWithLabel } from "./App";
import renderer from "react-test-renderer";

describe("something to be true", () => {
  test("true to be true", () => {
    expect(true).toBe(true);
  });
  it("false to be false", () => {
    expect(false).toBe(false);
  });
});

describe("Item", () => {
  const item = {
    title: "react",
    author: "idriss",
    url: "https://reactjs.org/",
    num_comments: 4,
    points: 7,
    objectID: 0,
  };
  const handleRemoveItem = jest.fn();

  let component;

  beforeEach(() => {
    component = renderer.create(
      <Item item={item} onRemoveItem={handleRemoveItem} />
    );
  });

  it("renders all its properties", () => {
    expect(component.root.findByType("a").props.href).toEqual(
      "https://reactjs.org/"
    );

    expect(
      component.root.findAllByProps({ children: "idriss" }).length
    ).toEqual(1);
  });

  it("call onRemoveItem on button click", () => {
    component.root.findByType("button").props.onClick();

    expect(handleRemoveItem).toHaveBeenCalledTimes(1);
    expect(handleRemoveItem).toHaveBeenCalledWith(item);

    expect(component.root.findAllByType(Item).length).toEqual(1);
  });
});

describe("List", () => {
  const list = [
    {
      title: "react",
      author: "idriss",
      url: "https://reactjs.org/",
      num_comments: 4,
      points: 7,
      objectID: 0,
    },
    {
      title: "angular",
      author: "omar",
      url: "https://angularjs.org/",
      num_comments: 3,
      points: 5,
      objectID: 1,
    },
  ];

  it("renders two items", () => {
    const component = renderer.create(<List list={list} />);

    expect(component.root.findAllByType(Item).length).toEqual(2);
  });
});
