import React, { Component } from "react";

class Trends extends Component {
  render() {
    console.log(this.props);
    return (
      <div>
        {/* <ScriptTag type="text/javascript">
          {trends.embed.renderExploreWidget(
            "TIMESERIES",
            {
              comparisonItem: [
                { keyword: "forest fire", geo: "US", time: "today 12-m" }
              ],
              category: 0,
              property: ""
            },
            {
              exploreQuery: "geo=US&q=forest%20fire&date=today 12-m",
              guestPath: "https://trends.google.com:443/trends/embed/"
            }
          )}
        </ScriptTag> */}
        <div id="TIMESERIES"></div>
      </div>
    );
  }
}

export default Trends;
