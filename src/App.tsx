import { useState } from "react";

import Intro from "./components/intro";
import MainPage from "./components/MainPage";

function App() {
  const [showIntro, setShowIntro] = useState(true);

  return showIntro ? (
    <Intro onFinish={() => setShowIntro(false)} />
  ) : (
    <MainPage />
  );
}

export default App;
