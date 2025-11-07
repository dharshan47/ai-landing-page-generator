import Home from "./page/Home";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div className="min-h-screen bg-[#F0F9FF] text-gray-800">
      <Home />
      <Toaster />
    </div>
  );
};

export default App;
