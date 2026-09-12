import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Toast from "./components/Toast";
import SearchPage from "./pages/SearchPage";
import CollectionPage from "./pages/CollectionPage";

const App = () => {
  return (
    <BrowserRouter>
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          background: "var(--bg-primary)",
        }}
      >
        <Navbar />

        <main style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <Routes>
            <Route path="/" element={<SearchPage />} />
            <Route path="/collection" element={<CollectionPage />} />
          </Routes>
        </main>

        <Toast />
      </div>
    </BrowserRouter>
  );
};

export default App;
