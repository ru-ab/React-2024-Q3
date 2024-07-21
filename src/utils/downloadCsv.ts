export function downloadCsv(csv: string, filename: string) {
  const csvData = new Blob([csv], {
    type: 'text/csv;charset=utf-8;',
  });
  const csvURL = URL.createObjectURL(csvData);

  const anchor = document.createElement('a');
  anchor.download = `${filename}.csv`;
  anchor.href = csvURL;
  anchor.click();
}
