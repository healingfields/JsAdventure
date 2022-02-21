import { Component } from "react";

class Carousel extends Component {
  state = { active: 0 };

  static defaultProps = {
    images: ["http://pets-images.dev-apis.com/pets/none.jpg"],
  };

  handleClick = (event) => {
    this.setState({
      active: +event.target.dataset.index,
    });
  };

  render() {
    const { active } = this.state;
    const { images } = this.props;

    return (
      <div className="flex justify-around content-center items-center">
        <img src={images[active]} alt="animal" className="w-1/2" />

        <div className="flex flex-wrap ">
          {images.map((photo, index) => (
            <img
              key={photo}
              src={photo}
              alt="animal"
              data-index={index}
              onClick={this.handleClick}
              className="w-40 h-40 rounded-full px-4 "
            />
          ))}
          ;
        </div>
      </div>
    );
  }
}
export default Carousel;
