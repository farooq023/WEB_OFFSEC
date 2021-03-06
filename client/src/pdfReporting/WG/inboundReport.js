/* eslint-disable no-useless-concat */
// services/reportGenerator.js

import jsPDF from "jspdf";
import "jspdf-autotable";
// Date Fns is used to format the dates we receive
// from our API call
// import { format } from "date-fns";

// define a generatePDF function that accepts a tickets argument
const inboundReport = (tickets, user, image) => {
  // initialize jsPDF

  const doc = new jsPDF();

  // define the columns we want and their titles

  // startY is basically margin-top
  const date = Date().split(" ");
  // we use a date string to generate our filename.
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
  // ticket title. and margin-top + margin-left
  doc.setFontSize(20);
  doc.setTextColor(23, 162, 184);
  doc.text("Inbound Results Report.", 80, 12);
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(12);
  doc.text("Email: " + user[0], 14, 20);
  doc.text("Date: " + user[1], 14, 32);
  doc.text("Time: " + user[2], 14, 44);
  doc.text("Duration: " + user[3], 14, 56);
  doc.addImage(image, "JPEG", 100, 18, 70, 50);

  doc.setFontSize(18);
  doc.setTextColor(23, 162, 184);
  doc.text("Assessment Results", 14, 82);
  doc.setTextColor(0, 0, 0);
  doc.setDrawColor(23, 162, 184);
  doc.setLineWidth(0.5);
  doc.line(15, 73, 190, 73);
  doc.setFontSize(12);
  doc.text("Files Imported in Test #1 : " + tickets[0], 14, 92);
  doc.text("Files Imported in Test #2 : " + tickets[1], 14, 100);
  doc.text("Files Imported in Test #3 : " + tickets[2], 14, 108);
  doc.text("Gateway Score : " + tickets[3], 14, 116);
  if (tickets[4] === "FAIL") {
    doc.setTextColor(184, 28, 28);
    doc.text("Gateway Status : " + tickets[4], 14, 124);
  } else {
    doc.setTextColor(17, 184, 23);
    doc.text("Gateway Status : " + tickets[4], 14, 132);
  }
  // we define the name of our PDF file.
  doc.save(`report_${dateStr}.pdf`);
};

export default inboundReport;
