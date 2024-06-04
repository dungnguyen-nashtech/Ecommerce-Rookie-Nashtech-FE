import { Component } from "react";
import Slider, { LazyLoadTypes, ResponsiveObject } from "react-slick";

export interface PropsSlider {
  dots?: boolean;
  infinite?: boolean;
  speed?: number;
  slidesToShow?: number;
  slidesToScroll?: number;
  arrows?: boolean;
  autoplay?: boolean;
  autoplaySpeed?: number;
  responsive?: ResponsiveObject[];
  children: JSX.Element[];
  className?: string;
  fade?: boolean;
  lazyLoad?: LazyLoadTypes;
}

export default class SliderCarousel extends Component<PropsSlider> {
  render() {
    const { children, className, responsive, ...sliderProps } = this.props;
    return (
      <div className={`overflow-hidden ${className}`}>
        <Slider {...sliderProps} responsive={responsive}>
          {children}
        </Slider>
      </div>
    );
  }
}
