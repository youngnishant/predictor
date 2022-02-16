import "./styles.css";
const brain = require("brain.js");

export default function App() {
  return (
    <div className="App">
      <button onClick={test}>get</button>
    </div>
  );
}

const test = async () => {
  const training = [
    [370.0, 794.25],
    [299.0, 426.25],
    [280.2, 306.3],
    [274.0, 343.0],
    [249.0, 253.75],
    [239.0, 269.75],
    [186.2, 214.05]
  ];
  const testData = [
    [194.5, 331.6],
    [307.0, 433.35],
    [281.7, 325.65],
    [(325.95, 388.4)],
    [105.65, 137.1],
    [116.1, 125.65]
  ];
  const predict = [
    [71.15, 90.95],
    [86.7, 111.55]
  ];
  // [111.35,121.40]
  const net = new brain.recurrent.LSTMTimeStep({
    inputSize: 2,
    hiddenLayers: [7],
    outputSize: 2
  });

  // Same test as previous, but combined on a single set
  const trainingData = [training];

  net.train(trainingData, { log: true, errorThresh: 0.01 });

  const closeToFiveAndOne = net.run(testData);

  console.log(closeToFiveAndOne);

  // now we're cookin' with gas!
  const forecast = net.forecast(predict);

  console.log("next 3 predictions", forecast);
};

const TrainingData = `Year,Open Price,High Price,Low Price,Close Price,No.of Shares,No. of Trades,Total Turnover (Rs.),Deliverable Quantity,% Deli. Qty to Traded Qty,Spread High-Low,Spread Close-Open,DematFlagExist
2007,451.00,809.90,370.00,794.25,31396110,439301,16296443525.00,16539381,52.68,439.90,343.25,
2008,800.00,809.00,299.00,426.25,38544852,733341,17972755543.00,17869819,46.36,510.00,-373.75,
2009,422.00,790.00,280.20,306.30,33414988,716340,16459920749.00,14258132,42.67,509.80,-115.70,
2010,308.00,458.90,274.00,343.00,65022013,1115241,24244960999.00,22457843,34.54,184.90,35.00,
2011,348.00,360.00,249.00,253.75,24971228,499929,7944950238.00,10490849,42.01,111.00,-94.25,
2012,255.10,291.75,239.00,269.75,13547096,305068,3570690842.00,5683432,41.95,52.75,14.65,
2013,269.95,375.00,186.20,214.05,24576739,517597,6712873706.00,6924008,28.17,188.80,-55.90,
2014,215.10,410.90,194.50,331.60,31960375,894835,10565781405.00,10945857,34.25,216.40,116.50,
2015,330.00,465.40,307.00,433.35,34577173,807443,13474374608.00,13303018,38.47,158.40,103.35,
2016,431.00,667.20,281.70,325.65,61553122,1090250,26967269437.00,29698814,48.25,385.50,-105.35,
2017,327.90,462.60,325.95,388.40,94939622,1035394,38380899609.00,42235344,44.49,136.65,60.50,
`;

const testData = `Year,Open Price,High Price,Low Price,Close Price,No.of Shares,No. of Trades,Total Turnover (Rs.),Deliverable Quantity,% Deli. Qty to Traded Qty,Spread High-Low,Spread Close-Open,DematFlagExist
2018,395.90,427.60,105.65,137.10,216143430,1344933,39632573719.00,92344037,42.72,321.95,-258.80,
2019,137.35,170.40,116.10,125.65,159497743,856826,22780923777.00,53765370,33.71,54.30,-11.70,
2020,125.95,128.25,71.15,90.95,297777576,1198494,26213038580.00,119413311,40.10,57.10,-35.00,
2021,91.40,141.75, 86.70,111.55,332329420,1853726,35433295438.00,120023302,36.12,55.05,20.15,
2022,111.55,128.00,111.35,121.40,23920854,226036,2893878887.00,9283678,38.81,16.65,9.85,
`;
