import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal } from "react-bootstrap";
import "./popup.css";

export default class CustomPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }

  handleClose = () => {
    this.setState({ show: false });
    this.props.onClose(false);
  };
  render() {
    return (
      <Modal
        show={this.props.show}
        onHide={this.handleClose}
        backdrop="static"
        centered={this.props.isCenter || true}
        className={this.props.className}
      >
        <Modal.Header closeButton>
          <Modal.Title className="popup-title">{this.props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{this.props.children}</Modal.Body>
      </Modal>
    );
  }
}
CustomPopup.propTypes = {
  title: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
