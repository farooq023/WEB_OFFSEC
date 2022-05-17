/* eslint-disable no-useless-concat */
// services/reportGenerator.js

import jsPDF from "jspdf";
import "jspdf-autotable";
// Date Fns is used to format the dates we receive
// from our API call
// import { format } from "date-fns";

// define a generatePDF function that accepts a tickets argument
const inboundReport = (tickets, user) => {
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
  doc.text("Outbound Results Report.", 80, 12);
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(12);
  doc.text("Email: " + user[0], 14, 20);
  doc.text("Date: " + user[1], 100, 20);
  doc.text("Time: " + user[2], 14, 32);
  doc.text("Duration: " + user[3], 100, 32);
  doc.setFontSize(18);
  doc.setTextColor(23, 162, 184);
  doc.text("Assessment Results", 14, 50);
  doc.setTextColor(0, 0, 0);
  doc.setDrawColor(23, 162, 184);
  doc.setLineWidth(0.5);
  doc.line(15, 41, 190, 41);
  doc.setFontSize(12);
  doc.text("Total Malicious Requests Made : " + tickets[0], 14, 58);
  doc.text("Successful Requests : " + tickets[1] + " %", 14, 66);
  doc.text("Gateway Score : " + tickets[2], 14, 74);
  if (tickets[3] === "FAIL") {
    doc.setTextColor(184, 28, 28);
    doc.text("Gateway Status :" + tickets[3], 14, 82);
  } else {
    doc.setTextColor(17, 184, 23);
    doc.text("Gateway Status :" + tickets[3], 14, 82);
  }
  // we define the name of our PDF file.
  doc.save(`report_${dateStr}.pdf`);
};

export default inboundReport;
