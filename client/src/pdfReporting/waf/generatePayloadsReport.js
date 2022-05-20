import jsPDF from "jspdf";
import "jspdf-autotable";
const generatePayloadsReport = (PayloadsResults, user) => {
  let xss = PayloadsResults[0];
  let sql = PayloadsResults[1];

  let xsslength = PayloadsResults[2];
  let xssReqs = PayloadsResults[3];
  let sqllength = PayloadsResults[4];
  let sqlReqs = PayloadsResults[5];

  const doc = new jsPDF();
  // define the columns we want and their titles

  const tableColumn = [
    "XSS Vulnerabilities (" +
      (xss[0] === "-" ? 0 : xsslength) +
      " / " +
      xssReqs +
      ")",
    "SQL Vulnerabilities (" +
      (sql[0] === "-" ? 0 : sqllength) +
      " / " +
      sqlReqs +
      ")",
  ];

  // define an empty array of rows
  const tableRows = [];
  if (xsslength > sqllength) {
    for (let i = 0; i < xsslength; i++) {
      const ticketData = [xss[i], sql[i]];
      tableRows.push(ticketData);
    }
  } else {
    for (let i = 0; i < sqllength; i++) {
      const ticketData = [xss[i], sql[i]];
      tableRows.push(ticketData);
    }
  }

  const date = Date().split(" ");
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
  doc.setFontSize(20);

  doc.setTextColor(23, 162, 184);
  doc.text("Generate Payloads Results Report.", 50, 12);
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(12);
  doc.text("Email: " + user[0], 14, 20);
  doc.text("Domain: " + user[1], 100, 20);
  doc.text("Date: " + user[2], 14, 32);
  doc.text("Time: " + user[3], 100, 32);
  doc.text("Duration: " + user[4], 14, 44);
  doc.autoTable(tableColumn, tableRows, { startY: 50 });

  // we define the name of our PDF file.
  doc.save(`report_${dateStr}.pdf`);
};

export default generatePayloadsReport;
