import Papa from "papaparse";
const { chunk } = require("lodash");
const brain = require("brain.js");
const parseData = async (file) => {
  let data = [];
  if (file) {
    Papa.parse(file, {
      complete: function (results) {
        results.data.forEach((item) => {
          data.push(item.slice(2, 6));
        });
        let rawTrainingData = [];
        data.map((item) => rawTrainingData.push(scaleDown(item)));
        rawTrainingData.shift();
        let temp = chunk(rawTrainingData, 5);
        let trainingData = temp.slice(0, 3);
        console.log(trainingData);
        const net = new brain.recurrent.LSTMTimeStep({
          inputSize: 4,
          hiddenLayers: [8, 8],
          outputSize: 4
        });
        net.train(trainingData, {
          learningRate: 0.05,
          errorThresh: 0.02,
          log: true
        });
        let forecastData = temp[3];
        let originalData = temp[3][0];
        console.log(
          scaleUp(net.forecast(forecastData, 1)[0]),
          scaleUp(originalData)
        );
      }
    });
  }
};

const scaleDown = (item) => ({
  open: parseFloat(item[0].replace(",", "")) / 2410,
  high: parseFloat(item[1].replace(",", "")) / 2410,
  low: parseFloat(item[2].replace(",", "")) / 2410,
  close: parseFloat(item[3].replace(",", "")) / 2410
});

const scaleUp = (item) => ({
  open: item.open * 2410,
  high: item.high * 2410,
  low: item.low * 2410,
  close: item.close * 2410
});
export default parseData;
