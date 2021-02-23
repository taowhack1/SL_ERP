import { Col, Input, Row } from "antd";
import React from "react";
import ProductionProcess from "./ProductionProcess";

const TabProductionProcess = ({
  readOnly,
  data_production_process_detail,
  productionProcessDetailDispatch,
}) => {
  return (
    <>
      <Row className="col-2 mt-1">
        <Col span={24}>
          <ProductionProcess
            readOnly={readOnly}
            data_production_process_detail={data_production_process_detail}
            productionProcessDetailDispatch={productionProcessDetailDispatch}
          />
        </Col>
      </Row>
    </>
  );
};

export default TabProductionProcess;
