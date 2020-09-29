export const projects = [
  {
    id: 0,
    name: "DASHBOARD",
  },
  {
    id: 1,
    name: "INVENTORY",
  },
  {
    id: 2,
    name: "PURCHASE",
  },
  {
    id: 3,
    name: "SALES",
  },
];

export const menus = [
  {
    id: 0,
    name: "Announcement",
    projectId: 0,
    subMenu: [],
  },
  {
    id: 1,
    name: "About",
    projectId: 0,
    subMenu: [],
  },
  {
    id: 2,
    name: "Help",
    projectId: 0,
    subMenu: [],
  },
  {
    id: 3,
    name: "Contact",
    projectId: 0,
    subMenu: [],
  },
  {
    id: 4,
    name: "Operations",
    projectId: 1,
    subMenu: [
      { id: 0, name: "Requisition", link: "/inventory/requisition" },
      { id: 1, name: "Receive", link: "/inventory/receive" },
    ],
  },
  {
    id: 5,
    name: "Master Data",
    projectId: 1,
    subMenu: [{ id: 0, name: "Items", link: "/inventory/items" }],
  },
  {
    id: 6,
    name: "Reporting",
    projectId: 1,
    subMenu: [
      { id: 0, name: "Stock move", link: "/inventory/stock_move" },
      { id: 1, name: "Stock on hand", link: "/inventory/stock_on_hand" },
    ],
  },
  {
    id: 7,
    name: "Configuration",
    projectId: 1,
    subMenu: [
      { id: 0, name: "Location", link: "/inventory/location" },
      { id: 1, name: "Warehouse", link: "/inventory/warehouse" },
    ],
  },
  {
    id: 8,
    name: "Orders",
    projectId: 2,
    subMenu: [
      { id: 0, name: "Purchase Requisition", link: "/purchase/pr" },
      { id: 1, name: "Purchase Orders", link: "/purchase/po" },
    ],
  },
  {
    id: 9,
    name: "Items",
    projectId: 2,
    subMenu: [{ id: 0, name: "Items", link: "/purchase/items" }],
  },
  {
    id: 10,
    name: "Reporting",
    projectId: 2,
    subMenu: [],
  },
  {
    id: 11,
    name: "Configuration",
    projectId: 2,
    subMenu: [{ id: 0, name: "Vendors", link: "/purchase/vendor" }],
  },
  {
    id: 12,
    name: "Orders",
    projectId: 3,
    subMenu: [
      { id: 0, name: "Quotations", link: "/sales/quotations" },
      { id: 1, name: "Sale Orders", link: "/sales/orders" },
    ],
  },
  {
    id: 13,
    name: "Product",
    projectId: 3,
    subMenu: [{ id: 0, name: "Items", link: "/sales/items" }],
  },
  {
    id: 14,
    name: "Reporting",
    projectId: 3,
    subMenu: [{ id: 0, name: "Sales", link: "/sales/reporting/sales" }],
  },
  {
    id: 15,
    name: "Configuration",
    projectId: 3,
    subMenu: [
      { id: 0, name: "Customers", link: "/sales/config/customers" },
      { id: 1, name: "Sales Teams", link: "/sales/config/sales_teams" },
    ],
  },
];
