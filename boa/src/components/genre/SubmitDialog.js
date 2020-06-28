import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import genreService from "../../services/genre";

export default class SubmitDialogComponent extends React.Component {
  toEdit = false;

  constructor(props) {
    super(props);
    this.toEdit = props.genre !== undefined;
    this.state = this.getFormState();
  }

  getFormState() {
    return this.toEdit
      ? { ...this.props.genre }
      : { genre: "", description: "" };
  }

  handleSubmit(evt) {
    evt.preventDefault();
    if (this.toEdit) {
      const { _id } = this.props.genre;
      genreService
        .update(_id, this.state)
        .then(() => this.props.submited({ ...this.state, _id }))
        .catch(ex => console.log(ex));
    } else {
      genreService
        .create(this.state)
        .then(result => this.props.submited({ ...this.state, _id: result._id }))
        .catch(ex => console.log(ex));
    }
  }

  handleCancel() {
    this.setState(this.getFormState());
    this.props.handleClose();
  }

  render() {
    const { show } = this.props;
    const { genre, description } = this.state;

    return (
      <Modal show={show} onHide={this.handleCancel}>
        <Modal.Header>
          <Modal.Title>{this.toEdit ? "Edit genre" : "Create genre"}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={(evt) => this.handleSubmit(evt)}>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Genre</Form.Label>
              <Form.Control required true value={genre} onChange={(evt) => this.setState({ genre: evt.target.value })} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control required true value={description} onChange={(evt) => this.setState({ description: evt.target.value })} />
            </Form.Group>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => this.handleCancel()}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }
}
