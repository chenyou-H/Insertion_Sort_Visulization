import React, { Component } from "react";
import "./charts.css";

let window_width = window.innerWidth;
let window_height = window.innerHeight;
let size_of_charts = window_width / 20;
let height_of_column = window_height * 0.8;
let speed = 10;

class Charts extends Component {
  iteration = 0;
  constructor(props) {
    super(props);
    this.state = {
      stateColumn: [],
      stateColor: [],
      width: window_width,
      height: window_height
    };
  }

  render() {
    return (
      <div className="container">
        <div className="buttons">
          <button
            className="Shuffle"
            onClick={() => this.setCharts(size_of_charts)}
          >
            Shuffle
          </button>

          <button className="Insertion_Sort" onClick={() => this.insertSort()}>
            Insert Sort
          </button>
        </div>

        <div className="charts">
          /{" "}
          <ul>
            {this.state.stateColumn.map((height, idx) => (
              <li key={idx}>
                <div
                  id={idx}
                  className="columns"
                  style={{
                    background: this.state.stateColor[idx],
                    width: "10px",
                    height: height
                  }}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  //prepare a random chart before render begin
  componentDidMount() {
    this.setCharts(size_of_charts);
  }

  insertSort = async () => {
    let arr = this.state.stateColumn;
    let arrColor = this.state.stateColor;
    for (let i = 1; i < size_of_charts; ++i) {
      let key = arr[i];
      let j = i - 1;
      while (j >= 0 && arr[j] > key) {
        arrColor[j + 1] = "white";
        arrColor[j] = "red";
        arr[j + 1] = arr[j];
        j = j - 1;
        this.setState({ stateColumn: arr, stateColor: arrColor });

        /*
        use await new Promise to puase the program
        the code will wait until setTimeout finish
        */
        await new Promise(resolve =>
          setTimeout(() => {
            resolve();
          }, speed)
        );
      }
      arr[j + 1] = key;
      arrColor[j + 1] = "white";
      this.setState({ stateColumn: arr, stateColor: arrColor });
      // this.setState({ stateColumn: arr });

      await new Promise(resolve =>
        setTimeout(() => {
          resolve();
        }, speed)
      );
    }
  };

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }

  setCharts = chartSize => {
    let columns = [];
    let colors = [];

    for (let i = 0; i < chartSize; i++) {
      columns.push(this.getRandomInt(1, height_of_column));
      colors.push("white");
    }
    this.setState({ stateColumn: columns, stateColor: colors });
  };
}

export default Charts;
