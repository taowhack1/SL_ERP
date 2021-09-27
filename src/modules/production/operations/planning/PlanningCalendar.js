import React, { useMemo } from "react";

import moment from "moment";
import Search from "../../../../components/Search";
import PlanningCalendarDetail from "./PlanningCalendarDetail";

const CustomFullCalendar = () => {
  const configs = useMemo(() => {
    return {
      resourceAreaWidth: 230,
      editable: false,
      initialView: "resourceTimelineMonth",
      aspectRatio: 2.5,
      timeZone: "UTC",
      initialDate: moment().format("YYYY-MM-DD"),
      resourceOrder: "sortNo",
      eventOrder: "sort",
      views: {
        resourceTimelineMonth: {
          slotMinWidth: 160,
          slotLabelFormat: (value) => {
            return (
              moment(value.date.marker).format("ddd") +
              " | " +
              moment(value.date.marker)
                .utc(true)
                .subtract(7, "hours")
                .format("DD/MM/YY")
            );
          },
          businessHours: {
            daysOfWeek: [1, 2, 3, 4, 5],
          },
        },
      },
      nowIndicator: true,
      timeZone: "UTC",
      resourceAreaHeaderContent: (
        <div className="require full-width">
          <Search
            onSearch={(text) => console.log("costCenter", text)}
            placeholder={"Cost Center"}
          />
        </div>
      ),
      eventTimeFormat: {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
      },
    };
  }, []);

  return (
    <>
      <div style={{ margin: "50px auto", width: "95%", height: "auto" }}>
        <>
          <PlanningCalendarDetail configs={configs} />
        </>
      </div>
    </>
  );
};

export default React.memo(CustomFullCalendar);
