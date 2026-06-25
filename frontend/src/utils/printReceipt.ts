export const printReceipt = (elementId: string) => {
  const printContent = document.getElementById(elementId);

  if (!printContent) return;

  const printWindow = window.open("", "", "width=400,height=600");

  if (!printWindow) return;

  printWindow.document.write(`
    <html>
      <head>
        <title>Receipt</title>
        <style>
          * {
            font-family: monospace;
            box-sizing: border-box;
          }

          body {
            width: 80mm;
            margin: 0;
            padding: 10px;
          }

          @page {
            size: 80mm auto;
            margin: 0;
          }

          .receipt {
            width: 80mm;
          }
        </style>
      </head>
      <body>
        <div class="receipt">
          ${printContent.innerHTML}
        </div>
      </body>
    </html>
  `);

  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
  printWindow.close();
};