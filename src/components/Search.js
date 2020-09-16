import React from 'react'
import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

export default function Search(){
    return (
        <>
            <Input placeholder="search" prefix={<SearchOutlined />} />
        </>
    )

}