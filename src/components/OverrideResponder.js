import React, { Component } from "react";

class OverrideResponder extends Component {
  render() {
    return (
      <>
        <h4>Manual Override Responder State</h4>
        <form
          onSubmit={event => {
            event.preventDefault();
            const newInt = this.responderState.value;
            console.log("new responderstate from form is " + newInt);
            this.props.setResponderState(newInt);
          }}
        >
          <div className="form-group mr-sm-2">
            <input
              id="responderState"
              type="text"
              ref={input => {
                this.responderState = input;
              }}
              className="form-control"
              placeholder="New Responder State"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Override
          </button>
        </form>
      </>
    );
  }
}

export default OverrideResponder;
