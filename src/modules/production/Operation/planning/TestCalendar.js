import FullCalendar from "@fullcalendar/react";
import React from "react";
import interactionPlugin from "@fullcalendar/interaction";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import dayGridPlugin from "@fullcalendar/daygrid";
import { rawData } from "./data";
const TestCalendar = () => {
  return (
    <>
      <FullCalendar
        schedulerLicenseKey={"CC-Attribution-NonCommercial-NoDerivatives"}
        timeZone={"UTC"}
        eventOrder={["start"]}
        plugins={[dayGridPlugin, resourceTimelinePlugin, interactionPlugin]}
        editable={true}
        initialView="resourceTimelineMonth"
        resourceOrder={["sortNo"]}
        aspectRatio={1.5}
        // views={{
        //   dayGrid: {
        //     eventContent: renderEventContent,
        //   },
        //   list: {
        //     eventContent: renderListContent,
        //     eventClick: (eventInfo) =>
        //       viewAppointment(eventInfo.event._def.extendedProps.extend[0]),
        //   },
        // }}
        // customButtons={{
        //   myCustomButton: {
        //     text: "Add New",
        //     click: addNew,
        //   },
        // }}
        resources={rawData.machine2}
        headerToolbar={{
          left: "prev,next",
          center: "title",
          right: "dayGridMonth,resourceTimelineMonth",
        }}
        eventTimeFormat={{
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
        }}
        // events={[]}
        events={rawData.mockupApiData.plan}
      />
    </>
  );
};

export default TestCalendar;
