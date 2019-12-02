import React, { useState, useEffect } from 'react'
import { MDBBtn, MDBInput, MDBDataTable, MDBContainer } from "mdbreact";
import { readCookie } from '../../../helper/cookieUser'
import { FetchUserControllerGetMenu, FetchAdminControllerAddFood, FetchAdminControllerAddMenu } from '../../../network/api.Fetched'
import { ImageAPI } from '../../../network/imperial.api'
export const Modal = props => {
    const { HandleFoodName, HandleImage, HandleMenuId, HandlePrice, HandleSize,
        HandleProductAdd, menuData, foodName, menuId, price, size,
        title, idname, index, text, image, file, clearState
    } = props
    // var file = ''
    // if (foodImage) {
    //     file = new File(["image"], `${foodImage}`, {
    //         type: "image/jpg"
    //     })
    // }
    return (
        <div className="modal fade" id={idname}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <form onSubmit={(e) => HandleProductAdd(e, index)}>
                        <div className="modal-header">
                            <h5 className="modal-title">{title}</h5>
                            <button type="button" className="close" data-dismiss="modal" onClick={() => clearState()}>×</button>
                        </div>

                        <div className="modal-body">
                            <div className="row">

                                <div className="col-sm-6">
                                    <MDBInput label="Food Name" name="foodName" id="foodName" onChange={(e) => HandleFoodName(e.target.value, index)} value={foodName} validate required />
                                </div>
                                <div className="col">
                                    <MDBInput label="Food Price" name="price" onChange={(e) => HandlePrice(e.target.value, index)} value={price} validate required />
                                </div>
                                <div className="col">
                                    <MDBInput label="Food size" name="size" onChange={(e) => HandleSize(e.target.value, index)} value={size} validate required />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label>Select Category</label>
                                    <select class="custom-select custom-select-sm" onChange={(e) => HandleMenuId(e.target.value, index)} value={menuId}>
                                        {menuData}
                                    </select>
                                </div>
                            </div>
                            <div className="row">
                                <div class="form-group col my-3">

                                    <img alt="image" style={{ width: '100px', height: "100px" }} src={file == null ? `${ImageAPI}/${image}` : file}></img>
                                </div>
                            </div>
                            <div className="row">
                                <div class="form-group col my-3">

                                    <input type="file" class="form-control-file" name="foodImage" id="file"
                                        onChange={(e) => HandleImage(e.target.files[0])} required={file == null ? false : true} />
                                </div>

                            </div>

                        </div>

                        <div className="modal-footer">
                            <MDBBtn type="submit"> <span><i className="fa fa-plus"></i></span> {text}</MDBBtn>
                            <MDBBtn data-dismiss="modal" onClick={() => clearState()}>Cancel</MDBBtn>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}