// import React, { useState, useEffect } from 'react'
// import { MDBBtn, MDBInput, MDBDataTable, MDBContainer } from "mdbreact";
// import { withCookies } from 'react-cookie'
// import { readCookie } from '../../../helper/cookieUser'
// import Image from '../../../assets/icons/logo/default.png'
// import DashboardNavbar from '../../../features/admin/components/dashboardnavbar';
// import {
//     FetchUserControllerGetMenu, FetchAdminControllerAddFood, FetchAdminControllerAddMenu,
//     FetchAdminControllerFoodMenu, FetchAdminControllerUpdateFood
// } from '../../../network/api.Fetched'
// import { Modal } from '../components/modal'
// import * as RoutePath from "../../../config/routeConfig";
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css'
// import { ImageAPI } from '../../../network/imperial.api'


// const AdminDashboardContainer = props => {
//     const [foodImage, setImage] = useState(null)
//     const [price, setPrice] = useState(0);
//     const [size, setSize] = useState("");
//     const [menuId, setMenuId] = useState(1);
//     const [foodName, setFoodName] = useState("");
//     const [MenuData, setUserMenu] = useState([])
//     const [MenuItems, setMenuItems] = useState("")
//     const [status, setStatus] = useState(false)
//     const [MenuStatus, setMenuStatus] = useState(false)
//     const [UpdateStatus, setUpdateStatus] = useState(false)
//     const [FoodMenu, setFoodMenu] = useState([])
//     const [foodId, setFoodId] = useState()
//     const [file, setFile] = useState(null)
//     const [msg, setMsg] = useState(false)

//     useEffect(() => {
//         const userData = readCookie(props.cookies)

//         if (userData) {
//             props.history.push(`${RoutePath.AdminDashboard}`)
//             Fetch_Food_Menu(userData)
//         }
//         else {
//             props.history.push(`${RoutePath.Login}`)
//         }
//         Fetch_Menu()


//     }, [])

//     ///FetchFromAPI
//     const Fetch_Menu = () => {
//         FetchUserControllerGetMenu((networkErr, userErr, data) => {
//             if (networkErr != null) { console.log(networkErr) }
//             else if (userErr != null) { console.log(JSON.stringify(userErr.message)) }
//             else {
//                 setUserMenu(data.payload)
//             }
//         })
//     }
//     const Fetch_Food_Menu = userData => {
//         const token = userData.token
//         FetchAdminControllerFoodMenu(token, (networkErr, userErr, data) => {
//             if (networkErr != null) { console.log(networkErr) }
//             else if (userErr != null) {
//                 if (userErr.message == "jwt expired") {
//                     props.history.push(`${RoutePath.Login}`)
//                 }
//                 console.log(JSON.stringify(userErr.message))
//             }
//             else {

//                 setFoodMenu(data.payload)

//             }
//         })
//     }
//     const HandleUpdateProductAdd = (e, index) => {
//         e.preventDefault();
//         const userData = readCookie(props.cookies)
//         let ProductUpdateData = new FormData()
//         ProductUpdateData.append('foodName', foodName);
//         ProductUpdateData.append('price', price)
//         ProductUpdateData.append('size', size)
//         ProductUpdateData.append('menuId', menuId);
//         ProductUpdateData.append('foodImage', foodImage)

//         FetchAdminControllerUpdateFood({ ProductUpdateData, foodId: foodId, token: userData.token }, (networkErr, userErr, data) => {
//             if (networkErr != null) { console.log(networkErr) }
//             else if (userErr != null) { console.log(JSON.stringify(userErr.message)) }
//             else {
//                 Fetch_Food_Menu(userData)
//                 const modals = document.getElementById('UpdateTable')
//                 const modalBackdrops = document.getElementsByClassName('modal-backdrop');
//                 modals.classList.remove('show')
//                 document.body.removeChild(modalBackdrops[0]);
//                 setUpdateStatus(data.success)
//                 setTimeout(() => {
//                     toast.success("Succeded !", {
//                         position: toast.POSITION.TOP_CENTER
//                     });
//                 }, 1000);

//             }

//         })
//     }

//     const Handle_Add_Menu_Items = e => {
//         e.preventDefault();
//         const userData = readCookie(props.cookies)
//         let token = userData.token
//         const flag = MenuData.reduce((r, c) => {
//             // console.log("Food name", c.food_name, "Boolean", c.food_name === foodName)
//             // console.log("result",r)
//             //c.food_name and foodName check if they are matched while looping.and then the results are stored in r
//             return r ? r : c.menu_name === MenuItems
//         }, false)

//         if (flag) {
//             toast.warn("You cannot type same category values", {
//                 position: toast.POSITION.TOP_LEFT
//             });

//         }
//         else {

//             toast.dismiss()
//             FetchAdminControllerAddMenu({ MenuItems, token }, (networkErr, userErr, data) => {
//                 if (networkErr != null) {
//                     console.log(networkErr)
//                 }
//                 else if (userErr != null) {
//                     console.log(JSON.stringify(userErr.message))
//                 }
//                 else {
//                     Fetch_Menu()
//                     const modals = document.getElementById('menuItems')
//                     const modalBackdrops = document.getElementsByClassName('modal-backdrop');
//                     modals.classList.remove('show')
//                     document.body.removeChild(modalBackdrops[0]);
//                     setMenuStatus(data.success)
//                     // setStatus(false)
//                     // setMsg(false)
//                     setMenuItems("")
//                     setTimeout(() => {
//                         toast.success("Succeded !", {
//                             position: toast.POSITION.TOP_CENTER
//                         });
//                     }, 1000);


//                 }


//             })
//         }




//     }

//     const HandleProductAdd = e => {
//         e.preventDefault();
//         const userData = readCookie(props.cookies)
//         const falg = FoodMenu.reduce((r, c) => {
//             // console.log("Food name", c.food_name, "Boolean", c.food_name === foodName)
//             // console.log("result",r)
//             //c.food_name and foodName check if they are matched while looping.and then the results are stored in r
//             return r ? r : c.food_name === foodName
//         }, false)
//         if (falg) {
//             toast.warn("You cannot type same food name", {
//                 position: toast.POSITION.TOP_LEFT
//             });


//         }
//         else {
//             toast.dismiss()
//             let ProductData = new FormData();
//             ProductData.append('foodName', foodName);
//             ProductData.append('price', price)
//             ProductData.append('size', size)
//             ProductData.append('menuId', menuId);
//             ProductData.append('foodImage', foodImage)
//             FetchAdminControllerAddFood({ ProductData, token: userData.token }, (networkErr, userErr, data) => {
//                 if (networkErr != null) { console.log(networkErr) }
//                 else if (userErr != null) {

//                     console.log(JSON.stringify(userErr.message))
//                 }
//                 else {
//                     Fetch_Food_Menu(userData)
//                     setStatus(data.success)
//                     const modals = document.getElementById('Product')
//                     const modalBackdrops = document.getElementsByClassName('modal-backdrop');
//                     modals.classList.remove('show')
//                     document.body.removeChild(modalBackdrops[0]);
//                     setTimeout(() => {
//                         toast.success("Succeded !", {
//                             position: toast.POSITION.TOP_CENTER
//                         });
//                     }, 1000);

//                 }
//             })

//         }


//     }

//     ///setVAlues
//     const HandleAddMenuItems = MenuItems => {

//         setMenuItems(MenuItems)



//     }

//     const HandleFoodName = foodName => {
//         setFoodName(foodName)

//     }

//     const HandleImage = foodImage => {
//         setFile(URL.createObjectURL(foodImage))
//         setImage(foodImage)
//     }

//     const HandleMenuId = menuId => {
//         setMenuId(menuId)
//     }
//     const HandlePrice = price => {
//         setPrice(price)
//     }
//     const HandleSize = size => {
//         setSize(size)
//     }
//     //update modal
//     const HandleUpdateeDataTable = (e, index) => {

//         const temp = FoodMenu[index]
//         console.log(temp.image)
//         setFoodId(temp.food_id)
//         setPrice(temp.price);
//         setSize(temp.size);
//         setImage(temp.image);
//         setFile(null)
//         setMenuId(temp.menu_id);
//         setFoodName(temp.food_name);

//     }
//     const addProductBtnClick = () => {

//         setPrice(0);
//         setSize("");
//         setImage(null);
//         setFile(Image)
//         setMenuId(1);
//         setFoodName("");
//     }

//     const clearMenuItem = () => setMenuItems("");

//     const ClearState = () => {
//         setPrice(0);
//         setSize("");
//         setImage(null);
//         setFile(null)
//         setMenuId(1);
//         setFoodName("");
//     }

//     // const OffAlertStatus = e => setStatus(false)

//     // const OffAlertMenu = e => setMenuStatus(false)

//     // const OffAlertUpdate = e => setUpdateStatus(false)



//     const HandleDeleteDataTable = (e, menuId) => {
//         console.log(menuId)
//     }

//     const menuData = MenuData.map((v, k) => {
//         return <option key={k} value={v.menu_id}>{v.menu_name}</option>
//     })


//     const food = FoodMenu.reduce((r, c, index) => {
//         c.delete = <MDBBtn color="red" size="sm" onClick={(e) => HandleDeleteDataTable(e, c.food_id)}><span><i className="fa fa-trash">Delete</i></span></MDBBtn>
//         c.Image = <img className="img-thumbnail" alt='Product' style={{ height: '50px', width: '50px' }} src={`${ImageAPI}/${c.image}`} />
//         c.update = <MDBBtn color="primary" size="sm" onClick={(e) => HandleUpdateeDataTable(e, index)}><span><i className="fa fa-edit" data-toggle="modal" data-target="#UpdateTable">update</i></span></MDBBtn>
//         return [...r, c]

//     }, [])

//     const data = {
//         columns: [
//             {
//                 label: 'Menu Name',
//                 field: 'menu_name',
//                 sort: 'asc',
//                 width: 150
//             },
//             {
//                 label: 'Food Name',
//                 field: 'food_name',
//                 sort: 'asc',
//                 width: 270
//             },
//             {
//                 label: 'Food Price',
//                 field: 'price',
//                 sort: 'asc',
//                 width: 200
//             },
//             {
//                 label: 'Food Size',
//                 field: 'size',
//                 sort: 'asc',
//                 width: 100
//             },
//             {
//                 label: 'Image',
//                 field: 'Image',
//                 sort: 'asc',
//                 width: 100
//             },
//             {
//                 label: 'Action',
//                 field: 'delete',
//                 sort: 'asc',
//                 width: 150
//             },
//             {
//                 label: 'Actions',
//                 field: 'update',
//                 sort: 'asc',
//                 width: 150
//             },
//         ],
//         rows: food
//     };
//     //checkIFTHEREISSAMENAME



//     return (
//         <div>
//             <DashboardNavbar />
//             <div className="container">
//                 <div class="d-flex justify-content-center my-3">
//                     <MDBBtn data-toggle="modal" data-target="#menuItems" > <span><i className="fa fa-plus"></i></span> Add category</MDBBtn>
//                     <MDBBtn data-toggle="modal" data-target="#Product" onClick={() => addProductBtnClick()}> <span><i className="fa fa-plus"></i></span> Add products</MDBBtn>
//                 </div>
//                 {/* <div className="d-flex justify-content-center">
//                     {status && <div id="#alert" className="alert alert-success d-flex align-items-center">{"you have added product"}<span className="mx-2" style={{ cursor: 'pointer' }} onClick={(e) => OffAlertStatus(e)}><i class="fa fa-times" aria-hidden="true"></i></span></div>}
//                     {MenuStatus && <div id="#alert" className="alert alert-success">{"you have added menu"}<span className="mx-2" style={{ cursor: 'pointer' }} onClick={(e) => OffAlertMenu(e)}><i class="fa fa-times" aria-hidden="true"></i></span></div>}
//                     {UpdateStatus && <div id="#alert" className="alert alert-success">{"you have updated food datatable"}<span className="mx-2" style={{ cursor: 'pointer' }} onClick={(e) => OffAlertUpdate(e)}><i class="fa fa-times" aria-hidden="true"></i></span></div>}
//                     {msg && <div id="#alert" className="alert alert-warning">{"you cannot insert same category name"}</div>}
//                 </div> */}
//                 <MDBContainer>
//                     <MDBDataTable striped bordered hover data={data} noBottomColumns entries={5} entriesOptions={[5, 10, 15]} responsive />
//                 </MDBContainer>

//                 <Modal
//                     idname="Product"
//                     HandleImage={HandleImage}
//                     HandleMenuId={HandleMenuId}
//                     HandleSize={HandleSize}
//                     HandleFoodName={HandleFoodName}
//                     HandlePrice={HandlePrice}
//                     HandleProductAdd={HandleProductAdd}
//                     menuData={menuData}
//                     foodName={foodName} foodImage={foodImage} menuId={menuId} price={price} size={size}
//                     title={"Add Products"}
//                     text={"Add"}
//                     image={foodImage}
//                     file={file}
//                     clearState={ClearState}
//                 />
//                 <Modal
//                     idname="UpdateTable"
//                     HandleImage={HandleImage}
//                     HandleMenuId={HandleMenuId}
//                     HandleSize={HandleSize}
//                     HandleFoodName={HandleFoodName}
//                     HandlePrice={HandlePrice}
//                     HandleProductAdd={HandleUpdateProductAdd}
//                     menuData={menuData}
//                     foodName={foodName} foodImage={foodImage} menuId={menuId} price={price} size={size}
//                     title={"Edit Products"}
//                     text={"Update"}
//                     image={foodImage}
//                     file={file}
//                     msg={msg}
//                     clearState={ClearState}
//                     message={"same values are not allowed to be updated"}

//                 />

//                 <div className="modal fade" id="menuItems">
//                     <div className="modal-dialog modal-dialog-centered">
//                         <div className="modal-content">
//                             <form onSubmit={(e) => Handle_Add_Menu_Items(e)}>
//                                 <div className="modal-header">
//                                     <h4 className="modal-title">{"Add Category"}</h4>
//                                     <button type="button" className="close" data-dismiss="modal" onClick={clearMenuItem}>×</button>
//                                 </div>
//                                 <div className="modal-body">
//                                     <div className="row">
//                                         <div className="col-sm-6">
//                                             <MDBInput label="Add category" onChange={(e) => HandleAddMenuItems(e.target.value)} value={MenuItems} validate required />

//                                         </div>


//                                     </div>
//                                 </div>
//                                 <div className="modal-footer">
//                                     <MDBBtn type="submit"> <span><i className="fa fa-plus"></i></span> Add</MDBBtn>
//                                     <MDBBtn data-dismiss="modal" onClick={clearMenuItem}>Cancel</MDBBtn>
//                                 </div>
//                             </form>
//                         </div>

//                     </div>
//                 </div>
//             </div>
//         </div>

//     )




// }
// export default withCookies(AdminDashboardContainer)