import jsPDF from "jspdf";
import "jspdf-autotable";

// Date Fns is used to format the dates we receive
// from our API call
// import { format } from "date-fns";

// define a PdfReport function that accepts a tickets argument
const PdfReport = (tickets, user, image) => {
  // const getreport = () => {
  // initialize jsPDF

  const doc = new jsPDF();

  // define the columns we want and their titles

  // const tableColumn = ["Vulnerability", "Severity", "URL"];
  const tableColumn = ["Vulnerability", "Severity", "URL", "Mitigation"];

  // define an empty array of rows
  const tableRows = [];

  // for each ticket pass all its data into an array
  tickets.forEach((ticket) => {
    const ticketData = [
      ticket.Vulnerability,
      ticket.Severity,
      ticket.URL,
      ticket.Mit === null ? "   -" : ticket.Mit,

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
  doc.setTextColor(23, 162, 184);
  doc.setFontSize(20);

  doc.text("Scan Results Report.", 80, 12);
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(12);
  doc.text("Email: " + user[0], 14, 20);
  doc.text("Domain: " + user[1], 14, 32);
  doc.text("Date: " + user[2], 14, 44);
  doc.text("Time: " + user[3], 14, 56);
  doc.text("Duration: " + user[4], 14, 68);
  doc.addImage(image, "JPEG", 100, 18, 70, 50);

  doc.autoTable(tableColumn, tableRows, {
    startY: 80,
    columnStyles: {
      0: {
        columnWidth: "auto",
      },
      1: {
        columnWidth: "auto",
      },
      2: {
        columnWidth: 40,
      },
      3: {
        columnWidth: "auto",
      },
    },
  });
  // we define the name of our PDF file.
  doc.save(`report_${dateStr}.pdf`);
  // };
  // return (
  //   <div id="custom-chart">
  //     <Bar
  //       data={{
  //         labels: ["Critical", "High", "Medium", "Low"],
  //         datasets: [
  //           {
  //             label: ["Visual Representation:"],
  //             data: [
  //               chartValues[0],
  //               chartValues[1],
  //               chartValues[2],
  //               chartValues[3],
  //             ],
  //             backgroundColor: ["red", "orange", "yellow", "green"],
  //             borderColor: [
  //               "rgba(255, 99, 132, 1)",
  //               "rgba(54, 162, 235, 1)",
  //               "rgba(255, 206, 86, 1)",
  //               "rgba(255, 206, 86, 1)",
  //             ],
  //             borderWidth: 1,
  //           },
  //         ],
  //       }}
  //       height={1000}
  //       width={800}
  //       options={{
  //         maintainAspectRatio: false,
  //         scales: {
  //           xAxes: [
  //             {
  //               barPercentage: 0.2,
  //             },
  //           ],
  //           yAxes: [
  //             {
  //               ticks: {
  //                 beginAtZero: true,
  //               },
  //             },
  //           ],
  //         },
  //         legend: {
  //           labels: {
  //             fontSize: 25,
  //           },
  //         },
  //       }}
  //     />
  //   </div>
  // );
};

export default PdfReport;
