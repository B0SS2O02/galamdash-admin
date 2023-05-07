import React, { useEffect, useState } from 'react'
import {
    CCard,
    CCardBody,
    CCardText,
    CCardTitle,
    CCardHeader,
    CAvatar,
    CTable,
    CTableBody,
    CTableRow,
    CTableDataCell,
    CButton,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter

} from '@coreui/react'
import { useLocation, useNavigate } from 'react-router-dom';
import { get, post } from 'src/fetch';
import { Caplitailts, Time } from './util';
import Delete from '../Parts/DeleteView';
import sets from './sets.json'
import setting from '../../setting.json'

const CategoryView = () => {
    const [data, setData] = useState({})
    const [visible, setVisible] = useState(false)
    let { search } = useLocation();
    const query = new URLSearchParams(search);
    const id = query.get('id');
    const redirect = useNavigate()
    const [choice, setChoice] = useState('')

    useEffect(() => {
        fetch()
    }, [])

    const edit = sets.edit
    const del = sets.delete

    const fetch = async () => {
        let res = await get(`${sets.path.view}${id}`)
        setData(res.data)
    }




    const Options = () => {
        const Accept = () => {
            return <CButton color='success' onClick={(e) => {
                setChoice('a')
                setVisible(true)
            }}>
                Accept
            </CButton>
        }

        const Delete = () => {
            return <CButton color='danger' onClick={(e) => {
                setChoice('r')
                setVisible(true)
            }}  >
                Reject
            </CButton>
        }


        return <div>
            <Accept />
            <Delete />
        </div>

    }

    const Confirm = () => {
        const Text = () => {
            if (choice == 'a') {
                return `You are have accept : ${data.title}`
            }
            if (choice == 'r') {
                return `You are have delete : ${data.title}`
            }
        }

        const Text2 = () => {
            if (choice == 'a') {
                return `Add`
            }
            if (choice == 'r') {
                return `Delete`
            }
        }

        const ColorButton = () => {
            if (choice == 'a') {
                return 'success'
            }
            if (choice == 'r') {
                return `danger`
            }
        }

        const Send = async () => {
            console.log(choice, id)
            const res = await post('/admin/unconfirmed', {
                choice: choice,
                id: id
            })
            console.log(res)
            redirect(sets.rout.list)
        }

        return <div>
            <CModal alignment="center" visible={visible} >
                <CModalHeader>
                    <CModalTitle>Delete</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <Text />
                </CModalBody>
                <CModalFooter>
                    <CButton color={ColorButton()} onClick={(e) => { Send() }}><Text2 /></CButton>
                    <CButton color="secondary" onClick={(e) => {
                        setChoice('')
                        setVisible(false)
                    }}>
                        cancel
                    </CButton>
                </CModalFooter>
            </CModal>
        </div>
    }

    const Content = (props) => {
        let content = props.content
        if (typeof (data[content]) == 'object') {
            if (content == 'Category') {
                return (<CTableRow color="light">
                    <CTableDataCell>
                        <CCardTitle>{content[0].toUpperCase() + content.substring(1)}</CCardTitle>
                    </CTableDataCell>
                    <CTableDataCell>
                        <CCardText>
                            {data[content].title}
                        </CCardText>
                    </CTableDataCell>
                </CTableRow>
                )
            } else if (content == 'User') {
                return <CTableRow color="light">
                    <CTableDataCell>
                        <CCardTitle>Post creator</CCardTitle>
                    </CTableDataCell>
                    <CTableDataCell>

                        <div
                            onClick={(e) => {
                                if (data[content].id != 1) {
                                    redirect(`${sets.rout.user}/?id=${data[content].id}`)
                                }
                            }}
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "flex-start",
                                alignItems: "center"
                            }}>
                            <CAvatar src={`${setting.IP}/${data[content].img}`} />
                            <CCardText >
                                {Caplitailts(data[content].nick)}
                            </CCardText>

                        </div>

                    </CTableDataCell>
                </CTableRow >
            }

        } else if (content == 'img') {
            return (<CTableRow color="light">
                <CTableDataCell>
                    <CCardTitle>Image</CCardTitle>
                </CTableDataCell>
                <CTableDataCell>
                    <CAvatar src={`${setting.IP}/${data[content]}`} size="xl" />
                </CTableDataCell>
            </CTableRow>
            )
        } else if (content == 'ban') {
            const Ban = (props) => {
                const ban = props.ban
                const id = props.id
                const path = props.path
                const Color = (value) => {
                    if (value) {
                        return 'danger'
                    } else {
                        return 'info'
                    }
                }
                const Ban = async (id) => {
                    await put(`${path.ban}/${id}`)
                    setChange(change + 1)
                }
                return <CButton color={Color(ban)}
                    onClick={() => { Ban(id) }}
                >{Caplitailts('ban')}</CButton>

            }

            return (<CTableRow color="light">
                <CTableDataCell>
                    <CCardTitle>Ban</CCardTitle>
                </CTableDataCell>
                <CTableDataCell>
                    <Ban ban={data[content]} id={data.id} />
                </CTableDataCell>
            </CTableRow>
            )
        } else if (content == 'type') {
            return (<CTableRow color="light">
                <CTableDataCell>
                    <CCardTitle>Type</CCardTitle>
                </CTableDataCell>
                <CTableDataCell>
                    <Type type={data[content]} id={data.id} />
                </CTableDataCell>
            </CTableRow>
            )
        } else if (content == 'time') {
            return (<CTableRow color="light">
                <CTableDataCell>
                    <CCardTitle>Time</CCardTitle>
                </CTableDataCell>
                <CTableDataCell>
                    <Time time={data[content]} />
                </CTableDataCell>
            </CTableRow>
            )
        } else {
            return (<CTableRow color="light">
                <CTableDataCell>
                    <CCardTitle>{content[0].toUpperCase() + content.substring(1)}</CCardTitle>
                </CTableDataCell>
                <CTableDataCell>
                    <CCardText dangerouslySetInnerHTML={
                        { __html: data[content] }}>

                    </CCardText>
                </CTableDataCell>
            </CTableRow>
            )
        }

    }
    return (
        <div>
            <Confirm />
            <CCard className="mb-4" >
                <CCardHeader className='card-header' component="h5">{Caplitailts(sets.title)} view
                    <Options edit={edit} del={del} id={id} />
                </CCardHeader>
                <CCardBody >
                    <CTable>
                        <CTableBody>
                            {
                                Object.keys(data).map((d, index) => <Content key={index} content={d} />
                                )
                            }
                        </CTableBody>
                    </CTable>
                </CCardBody>
            </CCard >
        </div>

    )
}

export default CategoryView;