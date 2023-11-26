import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import schedule from "./data/schedule.json";
import emptySchedule from "./data/empty_schedule.json";

const rootElement = document.getElementById("root");
if (rootElement) {
  rootElement.className = "container-fluid";
}

ReactDOM.render(
  <App schedule={schedule} emptySchedule={emptySchedule} />,
  document.getElementById("root")
);

registerServiceWorker();
