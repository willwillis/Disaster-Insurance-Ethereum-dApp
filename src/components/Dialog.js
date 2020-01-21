import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { FaNetworkWired } from "react-icons/fa";
import { networkIDToString } from "./Utils";

export default class ModalComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { modal: false };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    return (
      <>
        <Button className="btn-sm btn-outline-light" onClick={this.toggle}>
          <FaNetworkWired />
        </Button>

        <Modal isOpen={this.state.modal}>
          <ModalHeader>Ethereum Network Details</ModalHeader>
          <ModalBody>
            <b>Contract Address:</b>
            <br />
            <a href="{`https://kovan.etherscan.io/address/${this.props.networkDataAddress}`}">
              {this.props.networkDataAddress}
            </a>
            <br />
            <br />
            <b>Contract Name:</b>
            <br />
            {this.props.contractName}
            <br />
            <br />
            <b> Your Active Address:</b>
            <br />
            {this.props.yourAccount}
            <br />
            <br />
            <b> Netwrok ID:</b>
            <br />({this.props.networkID}){" "}
            {networkIDToString(this.props.networkID)}
            <br />
            <br />
            <b> Current Block Number:</b>
            <br />
            <a href="{`https://kovan.etherscan.io/block/${this.props.blockNumber}`}">
              {this.props.blockNumber}
            </a>
            <br />
            <br />
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

// <div>
// <h1>React Bootstrap Modal Example</h1>
// <Button color="success" onClick={this.toggle}>React Modal</Button>
// <Modal isOpen={this.state.modal}>
// <form onSubmit={this.handleSubmit}>
// <ModalHeader>IPL 2018</ModalHeader>
// <ModalBody>
// <div className="row">
//   <div className="form-group col-md-4">
//   <label>Name:</label>
//   <input type="text" value={this.state.name} onChange={this.handleChangeName} className="form-control" />
//     </div>
//     </div>
//   <div className="row">
//    <div className="form-group col-md-4">
//   <label>Team:</label>
//       <input type="text" value={this.state.team} onChange={this.handleChangeTeam} className="form-control" />
//      </div>
//     </div>
//   <div className="row">
//    <div className="form-group col-md-4">
//     <label>Country:</label>
//       <input type="text" value={this.country} onChange={this.handleChangeCountry} className="form-control" />
//      </div>
//     </div>
// </ModalBody>
// <ModalFooter>
//   <input type="submit" value="Submit" color="primary" className="btn btn-primary" />
//   <Button color="danger" onClick={this.toggle}>Cancel</Button>
// </ModalFooter>
// </form>
// </Modal>
// </div>

{
  /* <Button color="success" onClick={this.toggle}>
          React Modal
        </Button>

        <Modal isOpen={this.state.modal}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button color="danger" onClick={this.toggle}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal> */
}
