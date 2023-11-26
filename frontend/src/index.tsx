import { createRoot } from "react-dom/client";
import "./index.css";

import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import schedule from "./data/schedule.json";
import emptySchedule from "./data/empty_schedule.json";

const rootElement = document.getElementById("root")!;
rootElement.className = "container-fluid";

const root = createRoot(rootElement);
root.render(<App schedule={schedule} emptySchedule={emptySchedule} />);

registerServiceWorker();
