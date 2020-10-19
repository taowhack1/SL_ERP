// --po list
export const query_po_list = {
  query_sql: `SELECT 
  A.po_id, A.po_no, 
  '[ ' +A.po_no + '] ' + A.po_description AS po_no_description,
  A.cost_center_id, A.po_description, 
  FORMAT(A.po_due_date,'dd/MM/yyyy') AS po_due_date,
  A.po_contact_description, A.po_remark, A.po_lock, A.po_actived,
  FORMAT(A.po_created,'dd/MM/yyyy') AS po_created, A.po_created_by,  
  FORMAT(A.po_updated,'dd/MM/yyyy') AS po_updated, A.po_updated_by, 
  A.branch_id, A.vendor_id, A.vat_id, A.currency_id, A.process_id, A.tg_trans_status_id, 
  A.tg_po_amount, A.tg_po_discount, A.tg_po_sum_amount, A.tg_po_vat_amount, A.tg_po_total_amount,
  B.cost_center_no, B.cost_center_name, '[ ' +B.cost_center_no + '] ' + B.cost_center_name AS branch_no_name, 
  C.branch_no, C.branch_name, '[ ' +C.branch_no + '] ' + C.branch_name AS branch_no_name, 
  D.vendor_no, D.vendor_name, '[ ' +D.vendor_no + '] ' + D.vendor_name AS vendor_no_name, 
  E.vat_no, E.vat_name, '[ ' +E.vat_no + '] ' + E.vat_name AS vat_no_name ,( E.vat_cost / 100 ) AS vat_rate,
  F.process_complete, G.trans_status_name,
  '[ ' +I.employee_no + '] ' + I.employee_firstname_eng + ' '+ I.employee_lastname_eng AS po_created_by_no_name,
  A.pr_id, J.pr_no,
  '[ ' +J.pr_no + '] ' + J.pr_description AS pr_no_description
  FROM [PURCHASE].[dbo].[tb_po] A
  LEFT JOIN [ACCOUNT].[dbo].[tb_cost_center] B ON A.cost_center_id = B.cost_center_id
  LEFT JOIN [HRM].[dbo].[tb_branch] C ON A.branch_id = C.branch_id
  LEFT JOIN [PURCHASE].[dbo].[tb_vendor] D ON A.vendor_id = D.vendor_id
  LEFT JOIN [PURCHASE].[dbo].[tb_vat] E ON A.vat_id = E.vat_id
  LEFT JOIN [APPROVAL].[dbo].[tb_process] F ON A.process_id = F.process_id
  LEFT JOIN [APPROVAL].[dbo].[tb_trans_status] G ON A.tg_trans_status_id = G.trans_status_id 
  LEFT JOIN [HRM].[dbo].[tb_user] H ON A.po_created_by = H.user_name
  LEFT JOIN [HRM].[dbo].[tb_employee] I ON H.user_name = I.employee_no
  LEFT JOIN [PURCHASE].[dbo].[tb_pr] J ON A.pr_id = J.pr_id
  WHERE A.po_actived = '1' 
  ORDER BY tg_trans_status_id ASC, po_due_date ASC , po_no DESC`,
};

// query pr list
export const query_pr_list = {
  query_sql: `
  SELECT
  p.pr_id,
  p.pr_no,
  -- 	FORMAT(tg_pr_due_date,'dd-MM hh:mm:ss') as tg_pr_due_date,
  CONVERT (VARCHAR, p.tg_pr_due_date, 103) AS tg_pr_due_date,
  CONVERT (VARCHAR, p.pr_created, 103) AS pr_created,
  p.pr_description,
  p.pr_contact_description,
  p.pr_remark,
  p.pr_created_by,
  '[ '+pr_no COLLATE Thai_CI_AS +' ] '+p.pr_description as pr_no_description,
  ' [ ' +emp.employee_no + ' ] ' + emp.employee_firstname_eng + ' ' + emp.employee_lastname_eng as pr_create_by_name,
  ' [ ' +cc.cost_center_no + ' ] ' + cc.cost_center_name as cost_center_no_name,
  p.branch_id,
  p.vendor_id,
   v.vendor_no +' : '+ v.vendor_name as vendor_no_name,
  
  p.vat_id,
  p.process_id,
  CASE
    WHEN process_id = 0 THEN 'Create' 
WHEN process_id = 1 THEN 'Confirm' 
WHEN process_id = 2 THEN 'Approve' 
WHEN process_id = 3 THEN 'Approve 2' 
WHEN process_id = 4 THEN 'Done' 
  ELSE 'N/A'
END AS process_name,
  p.tg_trans_status_id,
  p.tg_pr_amount,
  p.tg_pr_discount,
  p.tg_pr_sum_amount,
  p.tg_pr_vat_amount,
  p.tg_pr_total_amount,
  p.currency_id,
c.currency_no
  FROM
    [PURCHASE].[dbo].[tb_pr] p
  LEFT JOIN [PURCHASE].[dbo].[tb_vendor] v ON p.vendor_id = v.vendor_id
  LEFT JOIN [HRM].[dbo].[tb_employee] emp ON p.pr_created_by COLLATE Thai_CI_AS  = emp.employee_no 
  LEFT JOIN [ACCOUNT].[dbo].[tb_cost_center] cc ON p.cost_center_id = cc.cost_center_id
  LEFT JOIN [PURCHASE].[dbo].[tb_currency] c ON p.currency_id = c.currency_id
  `,
};

// --tb_vendor
export const query_select_vendor = {
  query_sql: `SELECT vendor_id, vendor_no, vendor_name, vendor_no +' : ' +vendor_name AS vendor_no_name
FROM [PURCHASE].[dbo].[tb_vendor]`,
};

// --tb_item
export const query_select_item = {
  query_sql: `SELECT A.item_id, A.item_no, A.item_name, '[ '+A.item_no +' ] ' +A.item_name AS item_no_name,
    A.uom_id, B.uom_no, B.uom_name,' [ '+ B.uom_no +' ] ' +B.uom_name AS uom_no_name, item_price
    FROM [INVENTORY].[dbo].[tb_item] A
    LEFT JOIN [INVENTORY].[dbo].[tb_uom] B ON A.uom_id = B.uom_id`,
};

// --tb_uom
export const query_select_uom = {
  query_sql: `SELECT uom_id, uom_no, uom_name, '[ '+uom_no +' ] ' +uom_name AS uom_no_name
    FROM [INVENTORY].[dbo].[tb_uom] `,
};

// --tb_pr
export const query_select_pr = {
  query_sql: `SELECT
	pr_id,
	pr_no,
	pr_created,
	pr_created_by,
	'[ '+pr_no COLLATE Thai_CI_AS +' ] '+pr.pr_description as pr_no_description,
	'[ '+emp.employee_no + ' ] '+ emp.employee_firstname_eng + ' ' + emp.employee_lastname_eng as employee_no_name,
	emp.employee_firstname_eng + ' ' + emp.employee_lastname_eng as employee_name,
	pr_cost_center,
	tg_pr_amount,
	tg_pr_discount,
	tg_pr_sum_amount,
	tg_pr_vat_amount,
	tg_pr_total_amount
FROM
	[PURCHASE].[dbo].[tb_pr] pr
LEFT JOIN HRM.dbo.tb_employee emp ON pr.pr_created_by COLLATE Thai_CI_AS = emp.employee_no
LEFT JOIN PURCHASE.dbo.tb_currency c ON pr.currency_id  = c.currency_id `,
};

export const query_select_item_type = {
  query_sql:
    "SELECT type_id, type_no, type_name FROM [INVENTORY].[dbo].[tb_type] WHERE type_actived = 1",
};
export const query_select_categ = {
  query_sql:
    "SELECT category_id, category_no, category_name FROM [INVENTORY].[dbo].[tb_category] WHERE category_actived = 1",
};
export const query_select_benefit = {
  query_sql:
    "SELECT identify_benefit_id, identify_benefit_no, identify_benefit_name FROM [INVENTORY].[dbo].[tb_identify_benefit] WHERE identify_benefit_actived = 1",
};

export const query_select_dep = {
  query_sql: ` SELECT cost_center_id, cost_center_no, cost_center_name,
   '[ ' +cost_center_no+ ' ] '+ cost_center_name AS cost_center_no_name  
   FROM [ACCOUNT].[dbo].[tb_cost_center]`,
};
