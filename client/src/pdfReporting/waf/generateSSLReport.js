import jsPDF from "jspdf";
import "jspdf-autotable";
const generateSSLReport = (sslResults, user, image) => {
  // initialize jsPDF
  let supportedCipher = sslResults[0];
  let bypassedCiphers = sslResults[1];

  const doc = new jsPDF();

  // define the columns we want and their titles
  const tableColumn = [
    "Supported Ciphers (" +
      (supportedCipher[0] === "-" ? 0 : supportedCipher.length) +
      ")",
    "Bypassing Ciphers (" +
      (bypassedCiphers[0] === "-" ? 0 : bypassedCiphers.length) +
      ")",
  ];
  // define an empty array of rows
  const tableRows = [];

  // for each ticket pass all its data into an array
  supportedCipher.forEach((obj, index) => {
    const ticketData = [
      obj,
      bypassedCiphers[index],
      // called date-fns to format the date on the ticket
      //   format(new Date(ticket.updated_at), "yyyy-MM-dd")
    ];
    // push each tickcet's info into a row
    tableRows.push(ticketData);
  });

  // startY is basically margin-top
  const date = Date().split(" ");
  // we use a date string to generate our filename.
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
  // ticket title. and margin-top + margin-left
  doc.setFontSize(20);

  doc.setTextColor(23, 162, 184);
  doc.text("SSL Results Report.", 77, 12);
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(12);
  doc.text("Email: " + user[0], 14, 20);
  doc.text("Domain: " + user[1], 14, 32);
  doc.text("Date: " + user[2], 14, 44);
  doc.text("Time: " + user[3], 14, 56);
  doc.text("Duration: " + user[4], 14, 68);
  doc.addImage(image, "JPEG", 100, 18, 70, 50);

  doc.autoTable(tableColumn, tableRows, { startY: 80 });
  // we define the name of our PDF file.
  doc.save(`report_${dateStr}.pdf`);
};

export default generateSSLReport;
