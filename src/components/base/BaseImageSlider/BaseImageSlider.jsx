import React, { Component } from 'react';
import StoreContext from '../../../store/StoreContext';
import { observer } from 'mobx-react';
import image1 from '../../../assets/images/image1.jpg';
import image2 from '../../../assets/images/image2.jpg';
import image3 from '../../../assets/images/image3.jpg';
import image4 from '../../../assets/images/image4.jpg';

class BaseImageSlider extends Component {
  state = {
    activeIndex: 0
  };

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState(prevState => ({
        activeIndex: (prevState.activeIndex + 1) % 4
      }));
    }, 4000); // 4 seconds
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handlePrev = () => {
    this.setState(prev => ({
      activeIndex: (prev.activeIndex - 1 + 4) % 4
    }));
  };

  handleNext = () => {
    this.setState(prev => ({
      activeIndex: (prev.activeIndex + 1) % 4
    }));
  };

  imagePanel = () => {
    const { activeIndex } = this.state;
    const images = [image2, image1, image3, image4];

    return (
      <div className="carousel slide position-relative">
        <div className="carousel-inner">
          {images.map((img, index) => (
            <div key={index} className={`carousel-item ${activeIndex === index ? 'active' : ''}`}>
              <img src={img} className="d-block w-100" alt={`Slide ${index + 1}`} />
              <div className="carousel-caption d-none d-md-block">
                <p>Photo courtesy of Barangay Bagong Paliparan III in Dasmariñas City</p>
              </div>
            </div>
          ))}
        </div>

        {/* Left Arrow */}
        <button
          className="carousel-control-prev"
          type="button"
          onClick={this.handlePrev}
          style={{ width: '5%', opacity: 0.7 }}
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>

        {/* Right Arrow */}
        <button
          className="carousel-control-next"
          type="button"
          onClick={this.handleNext}
          style={{ width: '5%', opacity: 0.7 }}
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    );
  };

  render() {
    return this.imagePanel();
  }
}

BaseImageSlider.contextType = StoreContext;

export default observer(BaseImageSlider);