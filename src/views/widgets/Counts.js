import React, { useEffect, useState } from 'react'
import { CRow, CCol, CWidgetStatsF } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilImage, cilUser } from '@coreui/icons'
import axios from 'axios'
import setting from '../../setting.json'
import { get } from '../../fetch'
import { useNavigate } from 'react-router-dom'





const Counts = () => {
    const [Counsts, setCounts] = useState([])
    const redirect = useNavigate()
    useEffect(() => {
        GetCounts()
    }, [])

    const GetCounts = async () => {
        const result = await get(`/admin/admin/count`)
        if (!!result) {
            setCounts(result.data)
        }
    }

    const Title = (title) => {
        return title[0].toUpperCase() + title.slice(1) + 's'
    }

    const Icon = (title) => {
        if ('user'==title) {
            return cilUser
        }
        if(title=='post'){
            return cilImage 
        }
    }

    return (
        <div>
            <CRow>
                {
                    Counsts.map((count, index) => <CCol key={index} xs={12} sm={6} lg={3}>
                        <CWidgetStatsF
                            className="mb-3"
                            icon={<CIcon width={24} icon={Icon(count.title)} size="xl" />}
                            title={Title(count.title) + ' counts'}
                            value={count.count}
                            color={count.color}
                            onClick={() => {
                                redirect(`/${count.title}`)
                            }}
                        />
                    </CCol>
                    )
                }

            </CRow>
        </div>
    )
}

export default Counts