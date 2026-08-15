import { HashRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./lib/ThemeContext";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import SipCalculator from "./calculators/SipCalculator";
import LumpsumCalculator from "./calculators/LumpsumCalculator";
import FdCalculator from "./calculators/FdCalculator";
import EmiCalculator from "./calculators/EmiCalculator";
import RdCalculator from "./calculators/RdCalculator";
import PpfCalculator from "./calculators/PpfCalculator";
import CompoundInterestCalculator from "./calculators/CompoundInterestCalculator";

export default function App() {
  return (
    <ThemeProvider>
      <HashRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sip" element={<SipCalculator />} />
            <Route path="/lumpsum" element={<LumpsumCalculator />} />
            <Route path="/fd" element={<FdCalculator />} />
            <Route path="/emi" element={<EmiCalculator />} />
            <Route path="/rd" element={<RdCalculator />} />
            <Route path="/ppf" element={<PpfCalculator />} />
            <Route path="/compound-interest" element={<CompoundInterestCalculator />} />
          </Routes>
        </Layout>
      </HashRouter>
    </ThemeProvider>
  );
}
