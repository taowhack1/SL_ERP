import { config } from "@fullcalendar/common";
import React, { useMemo, useState } from "react";
import { PageContext } from "../include/js/context";
import MainLayout from "./MainLayout";
const PageLayout = ({ props, children }) => {
  const [page, setPage] = useState({
    config: {},
  });
  const setConfig = (newConfig) =>
    setPage({ ...page, config: { ...page.config, ...newConfig } });
  const pageContextValue = useMemo(() => {
    return {
      page,
      setPage,
      setConfig,
    };
  }, [page]);
  return (
    <>
      <PageContext.Provider value={pageContextValue}>
        <MainLayout {...page.config}>{children}</MainLayout>
      </PageContext.Provider>
    </>
  );
};

export default React.memo(PageLayout);
