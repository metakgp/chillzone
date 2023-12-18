import { useEffect, useState } from "react";
import "./App.css";

import schedule from "./data/schedule.json";
import emptySchedule from "./data/empty_schedule.json";

import CustomTable from "./components/CustomTable";
import EmptyRoomsTable from "./components/EmptyRoomsTable";
import Logo from "./navbar-icon.svg";
import TwoSlotDisplay from "./components/TwoSlotDisplay";

import { isInsideCampusNetwork } from "./util/utilities";
import { EmptySchedule, Schedule } from "./lib/types";

type AppProps = {
  schedule: Schedule;
  emptySchedule: EmptySchedule;
};

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    isInsideCampusNetwork()
      .then((value: boolean) => {
        setShow(value);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="message-banner">
        <iframe
          src="https://lottie.host/?file=ca9a3787-e6db-4878-a0d3-d10dde95b225/MjnHw4B5gw.json"
          title="Loader"
        ></iframe>
        <div className="message">Chillzone is loading</div>
      </div>
    );
  else if (!show)
    return (
      <div className="message-banner">
        <iframe
          src="https://lottie.host/?file=46b58d32-043e-4268-94cd-4d7817565000/xNnhIYFoYA.json"
          title="Campus Network Error"
        ></iframe>
        <div className="message">
          Please connect to IIT Kharagpur campus network to access this site!
        </div>
      </div>
    );
  return (
    <div className="App">
      <header className="App-header">
        <img src={Logo} alt="logo" />
        <h1>Chillzone - IIT Kharagpur</h1>
        <h3>Find a place to chill, NOW!</h3>
      </header>

      <TwoSlotDisplay schedule={emptySchedule} />

      <EmptyRoomsTable schedule={emptySchedule} />
      {Object.keys(schedule).map((key: string) => {
        return (
          <CustomTable room={key} schedule={schedule[key as keyof Schedule]} />
        );
      })}
    </div>
  );
}

export default App;
