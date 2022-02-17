import Papa from "papaparse";
const { chunk } = require("lodash");
const brain = require("brain.js");
const parseData = async (e) => {
  let data = [];

  const files = e.target.files;
  if (files) {
    Papa.parse(files[0], {
      complete: function (results) {
        results.data.forEach((item) => {
          data.push(item.slice(2, 6));
        });
        let rawTrainingData = [];
        data.map((item) => rawTrainingData.push(scaleDown(item)));
        rawTrainingData.shift();
        let temp = chunk(rawTrainingData, 5);
        let trainingData = temp.slice(0, 5);

        const net = new brain.recurrent.LSTMTimeStep({
          inputSize: 4,
          hiddenLayers: [8, 8],
          outputSize: 4
        });
        net.train(trainingData, {
          learningRate: 0.05,
          errorThresh: 0.09,
          log: true
        });
        let forecastData = temp[5];
        let originalData = temp[5][1];
        console.log(scaleUp(net.run(forecastData)), scaleUp(originalData));
      }
    });
  }
};

const scaleDown = (item) => ({
  open: parseFloat(item[0].replace(",", "")) / 2400,
  high: parseFloat(item[1].replace(",", "")) / 2400,
  low: parseFloat(item[2].replace(",", "")) / 2400,
  close: parseFloat(item[3].replace(",", "")) / 2400
});

const scaleUp = (item) => ({
  open: item.open * 2400,
  high: item.high * 2400,
  low: item.low * 2400,
  close: item.close * 2400
});
export default parseData;
