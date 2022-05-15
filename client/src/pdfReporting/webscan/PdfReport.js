/* eslint-disable no-useless-concat */
// services/reportGenerator.js

import jsPDF from "jspdf";
import "jspdf-autotable";
// Date Fns is used to format the dates we receive
// from our API call
// import { format } from "date-fns";

// define a generatePDF function that accepts a tickets argument
const generatePDF = (tickets, user) => {
  // initialize jsPDF
  
  const doc = new jsPDF();

  // define the columns we want and their titles
  const tableColumn = ["Vulnerability", "Severity", "URL"];
  // define an empty array of rows
  const tableRows = [];

  // for each ticket pass all its data into an array
  tickets.forEach(ticket => {
    const ticketData = [
      ticket.Vulnerability,
      ticket.Severity,
      ticket.URL,
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
  doc.text("Scan Results Report.", 80, 12);
  doc.setFontSize(12);
  doc.text("Email: "+user[0], 14, 20)
  doc.text("Domain: "+user[1], 100, 20)
  doc.text("Date: "+user[2], 14, 32)
  doc.text("Time: "+user[3], 100, 32)
  doc.text("Duration: "+user[4], 14, 44)
  doc.autoTable(tableColumn, tableRows, { startY: 50 });

  // we define the name of our PDF file.
  doc.save(`report_${dateStr}.pdf`);
};

export default generatePDF;