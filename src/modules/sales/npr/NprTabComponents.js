/** @format */

import React, { useState } from "react";
import { Controller, useFieldArray } from "react-hook-form";
import CustomTable from "../../../components/CustomTable";
import { CustomerTableField } from "./hookContorler";
import { NprComponentsDetail } from "./nprconfig";
import id from "uuid/v1";
import { sortData } from "../../../include/js/function_main";
const NprTabComponents = ({
  dataDetail,
  stateDispatch,
  readOnly,
  routing_type_id = 1,
  detailField,
  columns,
  triggerHead,
  control,
  register,
  defaultValues,
  setValue,
  errors,
  getValues,
}) => {
  // const { fields, append, remove, prepend } = useFieldArray({
  //   control,
  //   name: "componentsdetail",
  // });
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([NprComponentsDetail]);
  // const addLine = () => {
  //   append(setData([...data, { id: id() }]));
  //   console.log("1");
  // };
  // const delLine = (index) => {
  //   remove(setData([...data.slice(0, index), ...data.slice(index + 1)]));
  // };
  // const update = (index) => {
  //   const values = getValues();
  //   const oldId = data[index].id;
  //   const newId = values[`field${oldId}`];
  //   setData([...data.slice(0, index), { id: newId }, ...data.slice(index + 1)]);
  // };
  const append = () => {
    setData([...data, { id: id() }]);
    console.log("1");
  };
  const remove = (index) => {
    setData([...data.slice(0, index), ...data.slice(index + 1)]);
  };
  const initialStateHead = NprComponentsDetail;
  const [localAddress, setLocalAddress] = useState([]);
  const addLocalAddress = function () {
    let l = localAddress.length;
    const d = [
      ...localAddress,
      {
        street1: "street1",
        street2: "street2",
        city: "city",
      },
    ];
    setLocalAddress(d);
  };

  const removeLocalAddress = function () {
    let l = [...localAddress];
    l.splice(-1, 1);
    setLocalAddress(l);
  };
  const addLine = () => {
    stateDispatch(sortData([...data1, initialStateHead]));
  };
  console.log("dataDetail", dataDetail);
  return (
    <>
      <Controller
        as={
          <CustomTable
            onAdd={!readOnly && addLine}
            ref={register}
            dataSource={data1}
            rowKey={"id"}
            columns={columns({
              readOnly,
              onDelete: remove,
              control: control,
            })}
          />
        }
        name='table'
        control={control}
        rules={{ required: false }}
      />

      {/* <ul>
        {data.map((item, index) => (
          <li key={item.id}>
            <Controller
              as={<input />}
              name={`field${item.id}`}
              control={control}
              defaultValue={item.id}
            />
            <button onClick={() => remove(index)}>Delete</button>
          </li>
        ))}
      </ul>
      <button
        type='button'
        onClick={() => {
          append();
        }}>
        append
      </button> */}
    </>
  );
};

export default NprTabComponents;
