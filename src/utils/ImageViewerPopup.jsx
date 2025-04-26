import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal } from "react-bootstrap";
import "./popup.css";

export default class ImageViewerPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
    };
  }

  componentDidMount = () => {
    this.setState({ index: this.props.index });
  };

  onNext = () => {
    let { index } = this.state;
    let len = this.props.src.length;
    index = index + 1 >= len ? 0 : index + 1;
    this.setState({ index });
  };
  onPrevious = () => {
    let { index } = this.state;
    let len = this.props.src.length;
    index = index - 1 < 0 ? len - 1 : index - 1;
    this.setState({ index });
  };

  render() {
    return (
      <Modal
        show={this.props.show}
        backdrop="static"
        centered={true}
        dialogClassName="image-viewer-modal"
      >
        <Modal.Body>
        <span className="equipmentmodel-close">
          <i
            className="fa-regular fa-circle-xmark"
            onClick={this.props.onClose}
          />
          </span>

          <img
            alt="Viewer"
            className="image-viewer-img"
            src={this.props.src[this.state.index]?.url}
          />
          <span className="equipmentmodel-left-right">
          <i className="fa-solid fa-angle-left" onClick={this.onPrevious} />
          <i className="fa-solid fa-angle-right" onClick={this.onNext} />
          </span>
        </Modal.Body>
      </Modal>
    );
  }
}

ImageViewerPopup.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  src: PropTypes.array.isRequired,
  index: PropTypes.number.isRequired,
};
