import React, { Component } from "react";
import { SocialIcon } from "react-social-icons";
import socialIcon from "react-social-icons/dist/social-icon";

class SiteFooter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      teamMembers: [
        {
          name: "Will Willis",
          socialLinks: ["http://github.com/willwillis"]
        },
        { name: "Mike Ferber", socialLinks: ["https://github.com/2auroras"] },

        {
          name: "Brent McMinn",
          socialLinks: ["https://github.com/brentmcminn"]
        }
      ]
    };
  }
  render() {
    return (
      <div className="pt-5 my-md-5 pt-md-5 border-top footer">
        <div className="row">
          <div className="col-6 col-s">
            <h5>About</h5>
            Lassie Disaster Response is a fictitious company. This website was
            developed for the 3<sup>rd</sup> and final project during the
            07/2019{" "}
            <a href="https://techbootcamps.rice.edu/fintech/">
              FinTech Bootcamp
            </a>{" "}
            at Rice University.
            <p>
              <br />
              <SocialIcon
                url={
                  "https://github.com/willwillis/Disaster-Insurance-Ethereum-dApp"
                }
                label={"View this project on github"}
              />{" "}
              View the code for this project on Github.
            </p>
            <p>
              <div className="d-block mb-3 text-muted">&copy; 2019-2020</div>
            </p>
          </div>
          <div className="col-3 col-s">
            <h5>Team Members</h5>
            <ul className="list-unstyled text-small">
              {this.state.teamMembers.map((boi, key) => {
                return (
                  <li>
                    {boi.name} &nbsp;
                    {boi.socialLinks.map((link, key) => {
                      return (
                        <>
                          <SocialIcon
                            url={link}
                            style={{ height: 25, width: 25 }}
                          />{" "}
                          &nbsp;
                        </>
                      );
                    })}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="col-2 col-s">
            <h5>Tech Stack</h5>
            <ul className="list-unstyled text-small">
              <li>
                <a className="text-muted" href="https://ethereum.org/">
                  Ethereum Blockchain
                </a>
              </li>
              <li>
                <a
                  className="text-muted"
                  href="https://solidity.readthedocs.io/en/v0.6.1/"
                >
                  Solidity{" "}
                </a>
              </li>
              <li>
                <a className="text-muted" href="https://aws.amazon.com/">
                  Amazon Web Services
                </a>
              </li>
              <li>
                <a className="text-muted" href="https://reactjs.org/">
                  React
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default SiteFooter;
