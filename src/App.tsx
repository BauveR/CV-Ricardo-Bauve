import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { PrintableCV } from "./components /PrintableCv";

const App = () => {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: "CV_Ricardo_Bautista",
    removeAfterPrint: true,
  });

  return (
    <div className="w-screen h-screen overflow-auto bg-gray-100">
      <div ref={printRef}>
        <PrintableCV />
      </div>

      <button
        onClick={handlePrint}
        className="fixed bottom-4 right-4 bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 shadow-md"
      >
        Imprimir CV
      </button>
    </div>
  );
};

export default App;