// ตัวอย่าง API Endpoint ที่คุณต้องสร้างในฝั่ง Backend
// POST /api/sales-orders/search

/*
Request Body Example:
{
  "username": "user123",
  "filters": {
    "so_no": "SO001",
    "order_date_from": "2024-01-01",
    "order_date_to": "2024-12-31",
    "customer": "Customer Name",
    "salesperson": "Salesperson Name",
    "status": "Available"
  },
  "existing_filters": {
    "sales_type": 1,
    "production_type": 0,
    "so_status": "Available",
    "keyword": "search term"
  }
}

Response Example:
{
  "success": true,
  "data": [
    {
      "so_id": 1,
      "so_no": "SO001",
      "qn_no": "QN001",
      "so_customer_po_no": "PO001",
      "so_order_date": "01/01/2024",
      "tg_so_delivery_date": "15/01/2024",
      "customer_no_name": "Customer Name",
      "so_sales_person_no_name": "Salesperson Name",
      "tg_so_total_amount": 10000.00,
      "trans_status_name": "Available",
      "so_detail": [
        // ... detail items
      ]
    }
  ],
  "total": 100,
  "message": "Success"
}
*/

export const searchSalesOrders = async (searchObject) => {
    try {
        const response = await fetch("/api/sales-orders/search", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(searchObject),
        })

        return await response.json()
    } catch (error) {
        throw new Error("API call failed: " + error.message)
    }
}
