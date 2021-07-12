import React from "react";
import FullCalendar from "@fullcalendar/react";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import interactionPlugin from "@fullcalendar/interaction";
const PlanningCalendarDetail = ({ configs }) => {
  console.log("calendar Render...............");
  return (
    <>
      <FullCalendar
        {...configs}
        // eventContent={renderEventContent}
        // eventContent={renderEventContent2}
        schedulerLicenseKey={"CC-Attribution-NonCommercial-NoDerivatives"}
        plugins={[resourceTimelinePlugin, interactionPlugin]}
      />
    </>
  );
};

export default React.memo(PlanningCalendarDetail);
