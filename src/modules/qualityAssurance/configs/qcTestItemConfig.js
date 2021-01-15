import { DeleteTwoTone, EllipsisOutlined } from "@ant-design/icons";
import { Input, Popconfirm, Switch } from "antd";
import Text from "antd/lib/typography/Text";
import React from "react";
export const qcTestItemMainColumns = [
  {
    title: "No.",
    align: "center",
    dataIndex: "id",
    width: "5%",
    render: (value, record, index) => {
      return value + 1;
    },
  },
  {
    title: "Item Type",
    dataIndex: "type_no_name",
    key: "type_no_name",
    align: "left",
  },
  {
    title: "Number of Subject",
    dataIndex: "count_subject",
    key: "count_subject",
    align: "right",
    width: "15%",
  },
  {
    title: "Number of Specification",
    dataIndex: "count_specification",
    key: "count_specification",
    align: "right",
    width: "15%",
  },
  {
    title: "Number of Method",
    dataIndex: "count_method",
    key: "count_method",
    align: "right",
    width: "15%",
  },
];

export const QASubjectColumns = [
  {
    title: "No.",
    align: "center",
    dataIndex: "id",
    width: "5%",
    render: (value, record, index) => {
      return value + 1;
    },
  },
  {
    title: "Description",
    dataIndex: "qa_subject_description",
    key: "qa_subject_description",
    align: "left",
  },
];

export const qcTestItemSubjectColumns = (
  readOnly,
  onChange,
  onDelete,
  updateRowStatus
) => [
  {
    title: "No.",
    align: "center",
    dataIndex: "id",
    width: "5%",
    render: (value, record, index) => {
      return value + 1;
    },
  },
  {
    title: (
      <div className="text-center">
        {!readOnly && <span className="require">* </span>} Subject Name
      </div>
    ),
    dataIndex: "qa_subject_name",
    key: "qa_subject_name",
    align: "left",
    width: "50%",
    render: (value, record, index) => {
      if (readOnly) {
        return value;
      } else {
        return (
          <Input
            disabled={record.qa_subject_actived ? 0 : 1}
            name={"qa_subject_name"}
            onChange={(e) =>
              onChange(record.id, {
                qa_subject_name: e.target.value,
              })
            }
            value={value}
            placeholder="Subject Name"
            size="small"
          />
        );
      }
    },
  },
  {
    title: <div className="text-center">Description</div>,
    dataIndex: "qa_subject_remark",
    key: "qa_subject_remark",
    align: "left",
    render: (value, record, index) => {
      if (readOnly) {
        return value;
      } else {
        return (
          <Input
            disabled={record.qa_subject_actived ? 0 : 1}
            name={"qa_subject_remark"}
            onChange={(e) =>
              onChange(record.id, {
                qa_subject_remark: e.target.value,
              })
            }
            value={value}
            placeholder="Description"
            size="small"
          />
        );
      }
    },
  },
  {
    title: (
      <Text strong>
        <EllipsisOutlined />
      </Text>
    ),
    // dataIndex: "actions",
    // key: "actions",
    align: "center",
    width: "5%",
    render: (value, record, index) => {
      if (readOnly) {
        return null;
      } else {
        return record.qa_subject_id !== null ? (
          <Switch
            size="small"
            title="Active / In-Active"
            checked={record.qa_subject_actived}
            onChange={(value) =>
              updateRowStatus(record.id, { qa_subject_actived: value })
            }
          />
        ) : (
          <Popconfirm
            onConfirm={() => {
              onDelete(record.id);
            }}
            title="Are you sure you want to delete this row？"
            okText="Yes"
            cancelText="No"
          >
            <DeleteTwoTone />
          </Popconfirm>
        );
      }
    },
  },
];
export const subject_data = [
  {
    qa_subject_id: 0,
    qa_subject_name: "TEST SUBJECT 1",
    qa_subject_remark: "Description 1",
    qa_subject_actived: 1,
  },
  {
    qa_subject_id: 1,
    qa_subject_name: "TEST SUBJECT 2",
    qa_subject_remark: "Description 2",
    qa_subject_actived: 1,
  },
  {
    qa_subject_id: 2,
    qa_subject_name: "TEST SUBJECT 3",
    qa_subject_remark: "Description 3",
    qa_subject_actived: 1,
  },
];
export const item_test_case = [
  {
    type_id: 1,
    type_no: "RM",
    type_name: "Raw material",
    type_no_name: "[ RM ] Raw material",
    subject_data: [
      {
        qa_subject_id: 0,
        qa_subject_name: "TEST SUBJECT 1",
        qa_subject_remark: "Description 1",
        qa_subject_actived: 1,
      },
      {
        qa_subject_id: 1,
        qa_subject_name: "TEST SUBJECT 2",
        qa_subject_remark: "Description 2",
        qa_subject_actived: 1,
      },
      {
        qa_subject_id: 2,
        qa_subject_name: "TEST SUBJECT 3",
        qa_subject_remark: "Description 3",
        qa_subject_actived: 1,
      },
    ],
    specification_data: [
      {
        qa_specification_id: 0,
        qa_specification_name: "TEST SUBJECT 1",
        qa_specification_remark: "Description 1",
        qa_specification_actived: 1,
      },
      {
        qa_specification_id: 1,
        qa_specification_name: "TEST SUBJECT 2",
        qa_specification_remark: "Description 2",
        qa_specification_actived: 1,
      },
      {
        qa_specification_id: 2,
        qa_specification_name: "TEST SUBJECT 3",
        qa_specification_remark: "Description 3",
        qa_specification_actived: 1,
      },
    ],
    method_data: [
      {
        qa_method_id: 0,
        qa_method_name: "TEST SUBJECT 1",
        qa_method_remark: "Description 1",
        qa_method_actived: 1,
      },
      {
        qa_method_id: 1,
        qa_method_name: "TEST SUBJECT 2",
        qa_method_remark: "Description 2",
        qa_method_actived: 1,
      },
      {
        qa_method_id: 2,
        qa_method_name: "TEST SUBJECT 3",
        qa_method_remark: "Description 3",
        qa_method_actived: 1,
      },
    ],
    count_subject: 3,
    count_specification: 3,
    count_method: 3,
  },
  {
    type_id: 2,
    type_no: "PK",
    type_name: "Package",
    type_no_name: "[ PK ] Package",
    subject_data: [
      {
        qa_subject_id: 0,
        qa_subject_name: "TEST SUBJECT 1",
        qa_subject_remark: "Description 1",
        qa_subject_actived: 1,
      },
      {
        qa_subject_id: 1,
        qa_subject_name: "TEST SUBJECT 2",
        qa_subject_remark: "Description 2",
        qa_subject_actived: 1,
      },
      {
        qa_subject_id: 2,
        qa_subject_name: "TEST SUBJECT 3",
        qa_subject_remark: "Description 3",
        qa_subject_actived: 1,
      },
    ],
    specification_data: [
      {
        qa_specification_id: 0,
        qa_specification_name: "TEST SUBJECT 1",
        qa_specification_remark: "Description 1",
        qa_specification_actived: 1,
      },
      {
        qa_specification_id: 1,
        qa_specification_name: "TEST SUBJECT 2",
        qa_specification_remark: "Description 2",
        qa_specification_actived: 1,
      },
      {
        qa_specification_id: 2,
        qa_specification_name: "TEST SUBJECT 3",
        qa_specification_remark: "Description 3",
        qa_specification_actived: 1,
      },
    ],
    method_data: [
      {
        qa_method_id: 0,
        qa_method_name: "TEST SUBJECT 1",
        qa_method_remark: "Description 1",
        qa_method_actived: 1,
      },
      {
        qa_method_id: 1,
        qa_method_name: "TEST SUBJECT 2",
        qa_method_remark: "Description 2",
        qa_method_actived: 1,
      },
      {
        qa_method_id: 2,
        qa_method_name: "TEST SUBJECT 3",
        qa_method_remark: "Description 3",
        qa_method_actived: 1,
      },
    ],
    count_subject: 3,
    count_specification: 3,
    count_method: 3,
  },
  {
    type_id: 3,
    type_no: "BULK",
    type_name: "Bulk",
    type_no_name: "[ BULK ] Bulk",
    subject_data: [
      {
        qa_subject_id: 0,
        qa_subject_name: "TEST SUBJECT 1",
        qa_subject_remark: "Description 1",
        qa_subject_actived: 1,
      },
      {
        qa_subject_id: 1,
        qa_subject_name: "TEST SUBJECT 2",
        qa_subject_remark: "Description 2",
        qa_subject_actived: 1,
      },
      {
        qa_subject_id: 2,
        qa_subject_name: "TEST SUBJECT 3",
        qa_subject_remark: "Description 3",
        qa_subject_actived: 1,
      },
    ],
    specification_data: [
      {
        qa_specification_id: 0,
        qa_specification_name: "TEST SUBJECT 1",
        qa_specification_remark: "Description 1",
        qa_specification_actived: 1,
      },
      {
        qa_specification_id: 1,
        qa_specification_name: "TEST SUBJECT 2",
        qa_specification_remark: "Description 2",
        qa_specification_actived: 1,
      },
      {
        qa_specification_id: 2,
        qa_specification_name: "TEST SUBJECT 3",
        qa_specification_remark: "Description 3",
        qa_specification_actived: 1,
      },
    ],
    method_data: [
      {
        qa_method_id: 0,
        qa_method_name: "TEST SUBJECT 1",
        qa_method_remark: "Description 1",
        qa_method_actived: 1,
      },
      {
        qa_method_id: 1,
        qa_method_name: "TEST SUBJECT 2",
        qa_method_remark: "Description 2",
        qa_method_actived: 1,
      },
      {
        qa_method_id: 2,
        qa_method_name: "TEST SUBJECT 3",
        qa_method_remark: "Description 3",
        qa_method_actived: 1,
      },
    ],
    count_subject: 3,
    count_specification: 3,
    count_method: 3,
  },
  {
    type_id: 4,
    type_no: "FG",
    type_name: "Finish Good",
    type_no_name: "[ FG ] Finish Good",
    subject_data: [
      {
        qa_subject_id: 0,
        qa_subject_name: "TEST SUBJECT 1",
        qa_subject_remark: "Description 1",
        qa_subject_actived: 1,
      },
      {
        qa_subject_id: 1,
        qa_subject_name: "TEST SUBJECT 2",
        qa_subject_remark: "Description 2",
        qa_subject_actived: 1,
      },
      {
        qa_subject_id: 2,
        qa_subject_name: "TEST SUBJECT 3",
        qa_subject_remark: "Description 3",
        qa_subject_actived: 1,
      },
    ],
    specification_data: [
      {
        qa_specification_id: 0,
        qa_specification_name: "TEST SUBJECT 1",
        qa_specification_remark: "Description 1",
        qa_specification_actived: 1,
      },
      {
        qa_specification_id: 1,
        qa_specification_name: "TEST SUBJECT 2",
        qa_specification_remark: "Description 2",
        qa_specification_actived: 1,
      },
      {
        qa_specification_id: 2,
        qa_specification_name: "TEST SUBJECT 3",
        qa_specification_remark: "Description 3",
        qa_specification_actived: 1,
      },
    ],
    method_data: [
      {
        qa_method_id: 0,
        qa_method_name: "TEST SUBJECT 1",
        qa_method_remark: "Description 1",
        qa_method_actived: 1,
      },
      {
        qa_method_id: 1,
        qa_method_name: "TEST SUBJECT 2",
        qa_method_remark: "Description 2",
        qa_method_actived: 1,
      },
      {
        qa_method_id: 2,
        qa_method_name: "TEST SUBJECT 3",
        qa_method_remark: "Description 3",
        qa_method_actived: 1,
      },
    ],
    count_subject: 3,
    count_specification: 3,
    count_method: 3,
  },
];

export const qcTestItemSpecColumns = [
  {
    id: 1,
    name: "No.",
    size: 1,
    require: false,
  },
  {
    id: 2,
    name: "Specification Name",
    size: 11,
    require: true,
  },
  {
    id: 3,
    name: "Description",
    size: 11,
    require: false,
  },
];
export const qcTestItemMethodColumns = [
  {
    id: 1,
    name: "No.",
    size: 1,
    require: false,
  },
  {
    id: 2,
    name: "Method Name",
    size: 11,
    require: true,
  },
  {
    id: 3,
    name: "Description",
    size: 11,
    require: false,
  },
];

export const qcTestItemFields = {
  type_id: null,
  type_no_name: null,
};
export const qcTestItemSubjectFields = {
  id: null,
  qa_subject_id: null,
  qa_subject_no: null,
  qa_subject_name: null,
  qa_subject_no_name: null,
  qa_subject_name_th: null,
  qa_subject_remark: null,
  qa_subject_created: null,
  qa_subject_created_by: null,
  qa_subject_updated: null,
  qa_subject_updated_by: null,
  branch_id: 1,
  branch_no: null,
  branch_name: null,
  branch_no_name: null,
  type_id: null,
  type_no: null,
  type_name: null,
  type_no_name: null,
  commit: 1,
  qa_subject_actived: 1,
};
export const qcTestItemSpecFields = {
  qa_specification_id: null,
  qa_specification_no: null,
  qa_specification_name: null,
  qa_specification_no_name: null,
  qa_specification_name_th: null,
  qa_specification_remark: null,
  qa_specification_created: null,
  qa_specification_created_by: null,
  qa_specification_updated: null,
  qa_specification_updated_by: null,
  branch_id: 1,
  branch_no: null,
  branch_name: null,
  branch_no_name: null,
  type_id: null,
  type_no: null,
  type_name: null,
  type_no_name: null,
  commit: 1,
  qa_specification_actived: 1,
};
export const qcTestItemMethodFields = {
  qa_method_id: null,
  qa_method_no: null,
  qa_method_name: null,
  qa_method_no_name: null,
  qa_method_name_th: null,
  qa_method_remark: null,
  qa_method_created: null,
  qa_method_created_by: null,
  qa_method_updated: null,
  qa_method_updated_by: null,
  branch_id: 1,
  branch_no: null,
  branch_name: null,
  branch_no_name: null,
  type_id: null,
  type_no: null,
  type_name: null,
  type_no_name: null,
  commit: 1,
  qa_method_actived: 1,
};