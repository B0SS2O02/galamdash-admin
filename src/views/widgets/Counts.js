import React, { useEffect, useState } from 'react'
import { CRow, CCol, CWidgetStatsF } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilUser } from '@coreui/icons'
import axios from 'axios'
import setting from '../../setting.json'
import { get } from 'src/fetch'

const Counts = () => {
    const [Counsts, setCounts] = useState([])

    useEffect(() => {
        GetCounts()
    }, [])

    const GetCounts = async () => {
        const result = await get(`/admin/admin/count`)
        if (!!result) {
            setCounts(result.data)
        }
    }
    return (
        <div>
            <CRow>
                {
                    Counsts.map((count, index) => <CCol key={index} xs={12} sm={6} lg={3}>
                        <CWidgetStatsF
                            className="mb-3"
                            icon={<CIcon width={24} icon={cilUser} size="xl" />}
                            title={count.title + ' counts'}
                            value={count.count}
                            color={count.color}
                        />
                    </CCol>
                    )
                }

            </CRow>
        </div>
    )
}

export default Counts