import React, {useEffect, useState} from 'react'
import {useSelector} from "react-redux";
import moment from 'moment'
import {Spinner} from "../components/shared/Spinner";
import {Layout} from "../components/shared/Layout/Layout";
import {Modal} from "../components/shared/modal/Modal";
import API from "../services/API";

const HomePage = () => {
    const {loading, error} = useSelector((state) => state.auth);
    const [data,setData] = useState([]);

    //get function
    const getBloodRecords = async () => {
        try {
            const{data} = await API.get('/inventory/get-inventory')
            if(data?.success){
                setData(data?.inventory);
                //console.log(data);
            }
        }catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getBloodRecords();
    }, [getBloodRecords])
    return <Layout>
        {error && <span>{alert(error)}</span>}
        {loading ? <Spinner/> : <>
                <div className="container ">
                <h4
                    className='ms-4'
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                    style={{ cursor: "pointer"}}
                >
                    <i className="fa-solid fa-plus text-success py-4"></i>
                    ADD INVENTORY
                </h4>
                <table className="table ">
                    <thead>
                    <tr>
                        <th scope="col">BLOOD GROUP</th>
                        <th scope="col">INVENTORY TYPE</th>
                        <th scope="col">QUANTITY</th>
                        <th scope="col">DONOR EMAIL</th>
                        <th scope="col">TIME & DATA</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data?.map((record) => (
                    <tr key={record._id}>
                        <td>{record.bloodGroup}</td>
                        <td>{record.inventoryType}</td>
                        <td>{record.quantity} (ML)</td>
                        <td>{record.email}</td>
                        <td>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
                    </tr>
                    ))}
                    </tbody>
                </table>
                <Modal />
                </div>
            </>}
    </Layout>;
}
export {HomePage};