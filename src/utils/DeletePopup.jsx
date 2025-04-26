import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Modal } from "react-bootstrap";
import "./popup.css";

export default class DeletePopup extends Component {
  render() {
    return (
      <Modal show={this.props.show} backdrop="static" centered={true}>
        <Modal.Body>
          <h5>{this.props.message}</h5>
          <div className="delete_style">
            <Button className="no" type="button" onClick={this.props.no}>
              {this.props.no_msg || "NO"}
            </Button>
            <Button className="yes" type="button" onClick={this.props.yes}>
              {this.props.yes_msg || "YES"}
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}
DeletePopup.propTypes = {
  message: PropTypes.string.isRequired,
  yes_msg: PropTypes.string,
  no_msg: PropTypes.string,
  show: PropTypes.bool.isRequired,
  no: PropTypes.func.isRequired,
  yes: PropTypes.func.isRequired,
};
