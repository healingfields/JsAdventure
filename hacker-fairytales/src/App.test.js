import { render, screen } from "@testing-library/react";

import { SearchForm, List, Item, InputWithLabel, App } from "./App";
import renderer from "react-test-renderer";
import axios from "axios";

jest.mock("axios");

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

describe("SearchForm", () => {
  const searchFormProps = {
    searchTerm: "react",
    onSearchInput: jest.fn(),
    onSearchSubmit: jest.fn(),
  };

  let component;

  beforeEach(() => {
    component = renderer.create(<SearchForm {...searchFormProps} />);
  });

  it("renders the input with its value", () => {
    const value = component.root.findByType("input").props.value;

    expect(value).toEqual("react");
  });

  it("changes the input field", () => {
    const event = { target: "angular" };

    component.root.findByType("input").props.onChange(event);

    expect(searchFormProps.onSearchInput).toHaveBeenCalledTimes(1);
    expect(searchFormProps.onSearchInput).toHaveBeenCalledWith(event);
  });

  it("submits the form", () => {
    const event = {};

    component.root.findByType("form").props.onSubmit(event);

    expect(searchFormProps.onSearchSubmit).toHaveBeenCalledTimes(1);
    expect(searchFormProps.onSearchSubmit).toHaveBeenCalledWith(event);
  });

  it("disables the button and prevents submit", () => {
    component.update(<SearchForm {...searchFormProps} searchTerm="" />);

    expect(component.root.findByType("button").props.disabled).toBeTruthy();
  });
});

// describe("App", () => {
//   it("succeeds fetching fairytales and passing them to List", () => {
//     const fairytales = [
//       {
//         title: "vuejs",
//         author: "reda",
//         url: "https://vuejs.org",
//         num_comments: 45,
//         points: 5,
//         objectID: 0,
//       },
//       {
//         title: "gatsbyjs",
//         author: "omar",
//         url: "https://gatsbyjs.org",
//         num_comments: 54,
//         points: 3,
//         objectID: 1,
//       },
//     ];

//     const promise = Promise.resolve({
//       data: {
//         hits: fairytales,
//       },
//     });
//     axios.get.mockImplementationOnce(() => promise);

//     let component;

//     await renderer.act(async ()=>{
//       component = renderer.create(<App/>);
//     });

//     expect(component.root.findByType(List).props.list).toEqual(fairytales);
//   });
// });
