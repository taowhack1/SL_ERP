import React from "react";
import QCItemTestTabSubjectDetail from "./QCItemTestTabSubjectDetail";

const QCItemTestTabSubject = ({
  readOnly,
  // displayFields,
  // data_detail,
  // detailDispatch,
}) => {
  console.log("tab-subject-render");
  return (
    <>
      <QCItemTestTabSubjectDetail
        readOnly={readOnly}
        // displayFields={displayFields}
        // data_detail={data_detail}
        // detailDispatch={detailDispatch}
      />
    </>
  );
};

export default React.memo(QCItemTestTabSubject);
