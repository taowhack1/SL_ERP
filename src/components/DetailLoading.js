import { Skeleton, Spin } from "antd";
import React from "react";

const DetailLoading = () => {
  return (
    <>
      <Spin spinning={true}>
        <div className="mt-2">
          <Skeleton.Button active style={{ width: 100 }} />
          <Skeleton.Button active className="ml-2" style={{ width: 100 }} />
          <br />

          <div className="table-skeleton mt-1" />
        </div>
      </Spin>
    </>
  );
};

export default DetailLoading;
