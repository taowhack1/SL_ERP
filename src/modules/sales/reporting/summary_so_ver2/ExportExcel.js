/** @format */

import React from "react";
import FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { Button } from "antd";
import { FileExcelTwoTone } from "@ant-design/icons";
import { convertDigit } from "../../../../include/js/main_config";

const ExportCSV = ({ csvData, fileName, type }) => {
  // ******** XLSX with object key as header *************
  // const fileType =
  //   "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  // const fileExtension = ".xlsx";

  // const exportToCSV = (csvData, fileName) => {
  //   const ws = XLSX.utils.json_to_sheet(csvData);
  //   const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
  //   const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  //   const data = new Blob([excelBuffer], { type: fileType });
  //   FileSaver.saveAs(data, fileName + fileExtension);
  // };

  // ******** XLSX with new header *************
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToCSV = (csvData, fileName, type) => {
    console.log("type excel :>> ", type);
    let data2 = [];
    data2 = csvData.map((data) => {
      return {
        "SO No.": data.so_no,
        "Order Date": data.so_order_date,
        "Delivery Date": data.tg_so_delivery_date,
        "Customer Name": data.customer_no_name,
        "Sale OEM": data.so_sales_oem,
        Description: data.so_description,
        "Quantity / Pcs.": convertDigit(
          data.sum_so_detail_qty ? data.sum_so_detail_qty : 0,
          4
        ),
        "Value (Ex Vat)": convertDigit(
          data.tg_so_total_amount ? data.tg_so_total_amount : 0,
          4
        ),
      };
    });

    const ws = XLSX.utils.json_to_sheet(data2, {
      //   header: [
      //     "Item_No",
      //     "Iten_Name",
      //     "Unit",
      //     "in",
      //     "out",
      //     "balance",
      //     "price",
      //     "total",
      //     "po_no",
      //   ],
      skipHeader: false,
      origin: 0, //ok
    });
    //ws["!cols"] = "MDW";
    // XLSX.utils.sheet_add_json(csvData, {
    //   skipHeader: true,
    //   origin: 1, //ok
    // });
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <Button
      icon={<FileExcelTwoTone style={{ marginRight: 5, size: "20px" }} />}
      className='search-button'
      onClick={(e) => exportToCSV(csvData, fileName, type)}>
      Export excel
    </Button>
  );
};

export default ExportCSV;
