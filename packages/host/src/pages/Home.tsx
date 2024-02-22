import React from "react";

import { Button } from "mfe-ui/atoms";

const Home = () => {
  return (
    <div>
      <p>Home</p>
      <Button hanldeOnClick={()=> {alert('')}}>Click Me!</Button>
    </div>
  );
};
export default Home;
