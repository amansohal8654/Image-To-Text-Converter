import { jsPDF } from "jspdf";
// Landscape export, 2×4 inches
const GeneratingPDF = (text, filename) => {
    const doc = new jsPDF('landscape', 'px', 'a3', 'false');

    doc.text(text, 20, 20);
    //doc.setDisplayMode()
    doc.save(`${filename}.pdf`);
}

export default GeneratingPDF;