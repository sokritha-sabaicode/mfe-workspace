import "./index.css";
import React from "react";

import {Button} from 'mfe-ui/atoms'

interface standalone {
  isStandalone?: boolean
}

const App: React.FC<standalone> = ({isStandalone = true}) => (
  <div className="max-w-6xl mx-auto mt-10 text-3xl">
    <p>This is dashboard Page: {isStandalone && `standalone`}</p>
    <Button hanldeOnClick={()=> console.log('Dashboard is clicking')}>Click Me DashBoard!</Button>
  </div>
);

export default App;
