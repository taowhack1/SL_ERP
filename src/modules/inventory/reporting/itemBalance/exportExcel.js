/** @format */

import React from "react";
import FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { Button } from "antd";
import { FileExcelTwoTone } from "@ant-design/icons";

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
    if (type == "find") {
      data2 = csvData.map((data) => {
        return {
          "Item No": data.item_no,
          "Item Name": data.item_name,
          Unit: data.uom_no,
          จำนวนที่รับ: data.tg_stock_qty_inbound,
          จำนวนที่เบิกใช้: data.tg_stock_qty_outbound,
          คงเหลือ: data.tg_stock_qty_balance,
          ราคาต่อหน่วย: data.tg_item_cost_avg,
          รวมเป็นเงิน: data.total_price,
          "po ล่าสุด": data.po_no,
        };
      });
    } else {
      data2 = csvData.map((data) => {
        return {
          "Item No": data.item_no,
          "Item Name": data.item_name,
          Unit: data.uom_no,
          วันที่: data.stock_detail_created,
          จำนวนที่รับ: data.stock_in_qty,
          จำนวนที่เบิกใช้: data.stock_disburse_qty,
          คงเหลือ: data.calculate_history,
          ราคาต่อหน่วย: data.tg_item_cost_avg,
          รวมเป็นเงิน: data.calculate,
          ประเภทเอกสาร: data.trans_no,
          เอกสาร: data.document_no,
        };
      });
    }

    const dataNew = [
      {
        Item_No: csvData.item_no,
        Iten_Name: csvData.item_name,
        Unit: csvData.uom_no,
        stock_in_qty: csvData.tg_stock_qty_inbound,
        stock_out_qty: csvData.tg_stock_qty_outbound,
        balance: csvData.tg_stock_qty_balance,
        price: csvData.tg_item_cost_avg,
        total: csvData.total_price,
        po_no: csvData.po_no,
      },
    ];
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
