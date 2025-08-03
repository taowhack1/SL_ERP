import React from 'react'
import { Spin } from "antd"
import { LoadingOutlined } from "@ant-design/icons"

const LoadingOverlay = ({ loading, tip = "กำลังค้นหาข้อมูล..." }) => {
    if (!loading) return null

    return (
        <>
            <div
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 9999,
                    backdropFilter: "blur(2px)",
                }}
            >
                <div
                    style={
                        {
                            textAlign: "center",
                            padding: "40px",
                            backgroundColor: "white",
                            borderRadius: "8px",
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                            border: "1px solid #f0f0f0",
                        }
                    }
                >
                    <Spin
                        indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
                        size="large"
                        tip={tip}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: 16,
                        }}
                    />
                    < div style={{ marginTop: 16, color: "#666", fontSize: "14px" }}> กรุณารอสักครู่...</div>
                </div>
            </div>
        </>
    )
}

export default LoadingOverlay
