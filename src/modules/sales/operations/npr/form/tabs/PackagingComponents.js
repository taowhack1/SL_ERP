import React, { useContext, useMemo, useState } from "react";
import { Table } from "antd";
import {
  EllipsisOutlined,
  PictureOutlined,
  PictureTwoTone,
  SearchOutlined,
} from "@ant-design/icons";
import { NPRFormContext } from "../NPRRDForm";
import ModalViewImages from "../../../../../../components/ModalViewImages";
import { convertDigit } from "../../../../../../include/js/main_config";
const PackagingComponents = () => {
  const { data, loading, npr_id } = useContext(NPRFormContext);
  const { npr_detail2 } = data || {};
  const [modal, setModal] = useState({
    visible: false,
    loading: false,
    dataSource: [],
    field: {
      name: "name",
      path: "item_file_path",
    },
  });
  const viewImages = (files) =>
    setModal({ ...modal, visible: true, dataSource: files || [] });
  const onCloseModal = () => setModal({ ...modal, visible: false });

  const modalConfig = useMemo(
    () => ({
      ...modal,
      onClose: onCloseModal,
      fileServer: process.env.REACT_APP_ONLINE_PATH,
    }),
    [modal, onCloseModal]
  );
  return (
    <>
      <Table
        bordered
        rowKey="npr_detail_id"
        rowClassName="row-table-detail"
        loading={loading}
        columns={columns({ viewImages })}
        dataSource={npr_detail2 || []}
      />
      <ModalViewImages {...modalConfig} />
    </>
  );
};

export default React.memo(PackagingComponents);

const columns = ({ viewImages }) => [
  {
    title: (
      <div className="text-center">
        <b>No.</b>
      </div>
    ),
    align: "center",
    className: "tb-col-sm",
    width: "5%",
    dataIndex: "id",
    render: (val, row, index) => index + 1,
  },
  {
    title: (
      <div className="text-center">
        <b>Item</b>
      </div>
    ),
    align: "left",
    className: "tb-col-sm",
    dataIndex: "npr_detail_item_name",
    render: (val) => val || "-",
  },
  {
    title: (
      <div className="text-center">
        <b>Supply By</b>
      </div>
    ),
    align: "left",
    className: "tb-col-sm",
    dataIndex: "npr_detail_supply_by",
    render: (val) => val || "-",
  },
  {
    title: (
      <div className="text-center">
        <b>Supplier Name</b>
      </div>
    ),
    align: "left",
    className: "tb-col-sm",
    dataIndex: "npr_detail_supply_name",
    render: (val) => val || "-",
  },
  {
    title: (
      <div className="text-center">
        <b>% Waste</b>
      </div>
    ),
    align: "center",
    className: "tb-col-sm",
    width: "10%",
    dataIndex: "npr_detail_waste_percent_qty",
    render: (val) => convertDigit(val, 4),
  },
  {
    title: (
      <div className="text-center">
        <b>Picture</b>
      </div>
    ),
    align: "center",
    className: "tb-col-sm",
    width: "5%",
    dataIndex: "component_file",
    render: (val) =>
      val?.length ? (
        <PictureOutlined
          className="button-icon"
          onClick={() => viewImages(val)}
        />
      ) : (
        <PictureOutlined className="text-disabled disabled" />
      ),
  },
];
