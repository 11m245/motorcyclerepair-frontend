import Carousel from "react-bootstrap/Carousel";

function ImageSliderCarousel({ images }) {
  return (
    <Carousel variant="dark">
      {images.map((image, i) => {
        return (
          <Carousel.Item key={i} interval={1500}>
            <img
              style={{
                width: "100%",
                height: "50vh",
                objectFit: "contain",
                borderRadius: "10px",
              }}
              className="d-block w-100"
              src={image.url}
              alt={image.name}
            />
            <Carousel.Caption>
              <h5 className="text-warning fw-bold">{image.name} hi</h5>
              <p className="text-light fw-bold">
                this is about image text here
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
}

export default ImageSliderCarousel;
