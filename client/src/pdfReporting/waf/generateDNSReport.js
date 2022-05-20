import jsPDF from "jspdf";
import "jspdf-autotable";
const generateDNSReport = (dnsResults, user) => {
  // initialize jsPDF
  let ips = dnsResults[0];
  let matchingips = dnsResults[1];

  const doc = new jsPDF();

  // define the columns we want and their titles
  const tableColumn = [
    "DNS History (" + (ips[0] === "-" ? 0 : ips.length) + ")",
    "Matching Responses (" +
      (matchingips[0] === "-" ? 0 : matchingips.length) +
      ")",
  ];
  // define an empty array of rows
  const tableRows = [];

  // for each ticket pass all its data into an array
  ips.forEach((obj, index) => {
    const ticketData = [
      obj,
      matchingips[index],
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
  doc.text("DNS Results Report.", 77, 12);
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

export default generateDNSReport;
