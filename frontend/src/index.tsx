import { createRoot } from "react-dom/client";
import "./index.css";

import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

const rootElement = document.getElementById("root")!;
rootElement.className = "container-fluid";

const root = createRoot(rootElement);
root.render(<App />);

registerServiceWorker();
