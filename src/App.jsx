import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Step1 from "./pages/Step1";
import Step2 from "./pages/Step2";
import Step3 from "./pages/Step3";
import Details from "./pages/Details";
import Authentication from "./pages/Authentication";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/step1" element={<Step1 />} />
        <Route path="/step2" element={<Step2 />} />
        <Route path="/step3" element={<Step3 />} />
        <Route path="/details" element={<Details />} />
        <Route path="/authentication" element={<Authentication />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;