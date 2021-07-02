import {
  EditTwoTone,
  EllipsisOutlined,
  ExclamationCircleOutlined,
  FastForwardFilled,
  ProfileTwoTone,
} from "@ant-design/icons";
import { Badge, Table, Tag } from "antd";
import Text from "antd/lib/typography/Text";
import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { getNPRList } from "../../../../actions/sales/nprActions";
import { getStatusByName } from "../../../../include/js/function_main";
import useKeepLogs from "../../../logs/useKeepLogs";
import Authorize from "../../../system/Authorize";
import ModalRDRequestSample from "./rd/requestSample/ModalRDRequestSample";
const columns = ({ onOpen }) => [
  {
    title: "No.",
    align: "center",
    dataIndex: "id",
    width: "5%",
    render: (val) => val + 1,
  },
  {
    title: "NPR No.",
    align: "left",
    dataIndex: "npr_no",
    width: "15%",
  },
  {
    title: "NPR date",
    align: "center",
    dataIndex: "npr_request_date",
    width: "10%",
  },
  {
    title: (
      <div className="text-center">
        <Text>Product</Text>
      </div>
    ),
    align: "left",
    dataIndex: "npr_product_name",
    width: "20%",
    ellipsis: true,
    render: (val) => val || "-",
  },
  {
    title: (
      <div className="text-center">
        <Text>Customer</Text>
      </div>
    ),
    align: "left",
    dataIndex: "npr_customer_name",
    width: "20%",
    ellipsis: true,
    render: (val) => val || "-",
  },
  {
    title: (
      <div className="text-center">
        <Text>Sales Person</Text>
      </div>
    ),
    align: "left",
    dataIndex: "npr_created_by_name",
    width: "15%",
    ellipsis: true,
    render: (val) => val || "-",
  },
  {
    title: "NPR Status",
    align: "center",
    dataIndex: "trans_status",
    width: "10%",
    className: "bg-tb-primary",
    render: (val, record) => getStatusByName(val),
  },
  {
    title: "R&D",
    children: [
      {
        title: (
          <div className="text-center">
            <Text>PIC</Text>
          </div>
        ),
        align: "left",
        dataIndex: "npr_responsed_required_by_name",
        width: "15%",
        ellipsis: true,
        render: (val) => <Text style={{ color: "blue" }}>{val || "-"}</Text>,
      },

      {
        title: "Due Date",
        align: "center",
        dataIndex: "npr_responsed_required_date",
        width: "10%",
        render: (val) => <Text style={{ color: "blue" }}>{val || "-"}</Text>,
      },
      {
        title: "R&D Status",
        align: "center",
        dataIndex: "rd_trans_status",
        width: "10%",
        render: (val) => getStatusByName(val),
      },
    ],
  },
  {
    title: <div className="text-center">Sample Request</div>,
    align: "center",
    dataIndex: "npr_id",
    width: "10%",
    render: (val, record) =>
      // record.add_trans_id !== null && (
      [2, 3].includes(record.add_trans_id) ? (
        <Badge count={[2, 3].includes(record.add_trans_id) ? 1 : 0}>
          <EditTwoTone
            onClick={() => onOpen(val)}
            className="pointer w-100 font-l"
          />
        </Badge>
      ) : (
        <ProfileTwoTone
          onClick={() => onOpen(val)}
          className="pointer w-100 font-l"
        />
      ),
    // ),
  },
];

const NPRTable = ({ dataSource }) => {
  const keepLog = useKeepLogs();
  const authorize = Authorize();
  authorize.check_authorize();
  const history = useHistory();
  const dispatch = useDispatch();
  const { branch_id } = useSelector((state) => state.auth.authData);
  const viewRecord = (record) =>
    history.push("/sales/npr/rd/" + record.npr_id, record);
  const [modal, setModal] = useState({
    visible: false,
    loading: false,
    id: null,
  });
  const onOpen = (id) => setModal((prev) => ({ ...prev, visible: true, id }));
  const onClose = () => {
    dispatch(getNPRList(branch_id));
    setModal((prev) => ({ ...prev, visible: false }));
  };
  const modalConfig = useMemo(
    () => ({
      ...modal,
      readOnly: false,
      onOpen,
      onClose,
    }),
    [modal, onOpen, onClose]
  );
  return (
    <>
      <Table
        size={"small"}
        rowKey={"id"}
        columns={columns({ onOpen })}
        bordered
        dataSource={dataSource}
        pagination={{
          pageSize: 15,
        }}
        onRow={(record) => ({
          onClick: (e) => {
            console.log(e.target.tagName);

            if (!["path", "svg", "P"].includes(e.target.tagName)) {
              viewRecord(record);
              keepLog.keep_log_action("View NPR : ", record.npr_no);
            }
          },
        })}
      />
      <ModalRDRequestSample {...modalConfig} />
    </>
  );
};

export default React.memo(NPRTable);
