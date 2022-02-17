import Papa from "papaparse";
import { chunk } from "lodash";
import * as brain from "brain.js";

let max = 0;
let min = 1000000;

const parseData = async (file, setLog) => {
  let data = [];
  if (file) {
    Papa.parse(file, {
      complete: function (results) {
        results.data.forEach((item) => {
          data.push(item.slice(2, 6));
        });
        data.shift();
        let rawTrainingData = [];
        data.map((item) => {
          if (convertToFloat(item[1]) > max) max = convertToFloat(item[1]);
          if (convertToFloat(item[2]) < min) min = convertToFloat(item[2]);
        });
        data.map((item) => {
          rawTrainingData.push(scaleDown(item));
        });
        let temp = chunk(rawTrainingData, 5);
        let trainingData = temp.slice(0, 20);
        const net = new brain.recurrent.LSTMTimeStep({
          inputSize: 4,
          hiddenLayers: [8, 8],
          outputSize: 4,
        });
        net.train(trainingData, {
          iterations: 1000,
          learningRate: 0.03,
          errorThresh: 0.01,
          log: (status) => {
            console.log(status);
            const ul = document.getElementById("logs");
            let li = document.createElement("li");
            li.appendChild(document.createTextNode(status));
            ul.appendChild(li);
          },
        });
        let forecastData = temp[21];
        let originalData = temp[22][0];
        console.log(scaleUp(net.run(forecastData)), scaleUp(originalData));
      },
    });
  }
};

const scaleDown = (item) => ({
  open: normalise(convertToFloat(item[0])),
  high: normalise(convertToFloat(item[1])),
  low: normalise(convertToFloat(item[2])),
  close: normalise(convertToFloat(item[3])),
});

const scaleUp = (item) => ({
  open: denormalise(item.open),
  high: denormalise(item.high),
  low: denormalise(item.low),
  close: denormalise(item.close),
});

const convertToFloat = (value) => parseFloat(value.replace(",", ""));
const normalise = (value) => (value - min) / (max - min);
const denormalise = (value) => value * (max - min) + min;

export default parseData;
