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

  it("renders all its properties", () => {
    const component = renderer.create(<Item item={item} />);

    expect(component.root.findByType("a").props.href).toEqual(
      "https://reactjs.org/"
    );

    expect(
      component.root.findAllByProps({ children: "idriss" }).length
    ).toEqual(1);
  });
});
