import React from "react";
import {Layout} from "../../components/shared/Layout/Layout";
import {useSelector} from "react-redux";


const AdminHome = () => {
    const {user} = useSelector ((state) => state.auth)
    return (
        <Layout>
            <div className="container">
                <div className="d-flex flex-column mt-4">
                    <h1>WELCOME ADMIN <i className="text-success">{user?.name}</i></h1>
                    <h3>MANAGE BANK BLOOD APP</h3>
                    <hr/>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aperiam eos ipsam iste laboriosam magni praesentium quae quisquam ullam. Laboriosam quod, sed? Aliquid aspernatur aut blanditiis consequuntur culpa dolorem doloremque ea eaque, earum, eius eligendi esse facere fugiat iusto laborum libero natus necessitatibus odit optio quae qui quis quod quos ratione similique sint sit soluta sunt, tempora vel. Dolorum explicabo illum iusto molestiae nesciunt sapiente voluptatem! Atque commodi cupiditate dicta, eveniet ex explicabo molestias natus soluta velit. Architecto aspernatur autem debitis dolor eaque eius excepturi, facilis fugiat fugit, inventore ipsum modi nisi nobis, non nulla quaerat quasi quibusdam quod repellat velit voluptas voluptatibus voluptatum. Accusamus accusantium asperiores harum quo. Aperiam consectetur doloribus illo ipsam iure reiciendis vel veritatis. Aliquam aperiam, culpa cupiditate dignissimos distinctio eos est eveniet inventore labore laboriosam molestiae molestias necessitatibus non nostrum provident quasi sed, soluta totam veritatis voluptatum. A accusamus adipisci aut dolorem ea itaque minus natus non omnis rem. Asperiores consequatur dolor dolores doloribus et excepturi labore libero magnam molestiae nisi nostrum nulla odio, optio sapiente soluta unde voluptate. Dolor, doloribus vel! Aliquid asperiores corporis culpa distinctio eligendi illo ipsa ipsam ipsum, perspiciatis, quaerat, quod quos soluta! Adipisci beatae fugit magni quasi totam voluptatibus voluptatum!</p>
                </div>
            </div>
        </Layout>
    );
}
export {AdminHome};