import React, { useState } from "react";
import "./OrderPage.scss";
import { Checkbox, InputNumber } from "antd";
import { DeleteOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseAmount,
  increaseAmount,
  removeAllOrderProduct,
  removeOrderProduct,
} from "../../redux/slide/orderSlide";
export const OrderPage = () => {
  const [listChecked, setListChecked] = useState([]);
  const order = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const onChange = (e) => {
    if (listChecked.includes(e.target.value)) {
      const newListChecked = listChecked.filter((item) => item !== listChecked);
      setListChecked(newListChecked);
    } else {
      setListChecked([...listChecked, e.target.value]);
    }
  };
  const handleChangeCount = (type, idProduct) => {
    if (type === "increase") {
      dispatch(increaseAmount({ idProduct }));
    } else {
      dispatch(decreaseAmount({ idProduct }));
    }
  };
  const handleDeleteOrder = (idProduct) => {
    dispatch(removeOrderProduct({ idProduct }));
  };
  const handleAllDelete = () => {
    if (listChecked.length > 1) {
      dispatch(removeAllOrderProduct({ listChecked }));
    }
  };
  const hadnleOnChangeCheckAll = (e) => {
    if (e.target.checked) {
      const newListChecked = [];
      order?.orderItems?.forEach((item) => {
        newListChecked.push(item?.product);
      });
      setListChecked(newListChecked);
    } else {
      setListChecked([]);
    }
  };
  return (
    <div className="order-container">
      <div className="order-content">
        <span>Giỏ hàng</span>
        <div className="order-body">
          <div className="order-left">
            <div className="order-up">
              <div className="header-up">
                <Checkbox
                  onChange={hadnleOnChangeCheckAll}
                  checked={listChecked?.length === order?.orderItems?.length}
                >
                  Tất cả ({order?.orderItems?.length} sản phẩm)
                </Checkbox>
              </div>
              <div className="header-down">
                <span>Đơn giá</span>
                <span>Số lượng</span>
                <span>Thành tiền</span>
                <DeleteOutlined onClick={() => handleAllDelete()} />
              </div>
            </div>
            {order?.orderItems?.map((order) => {
              return (
                <div className="order-down">
                  <div className="list-up">
                    <Checkbox
                      onChange={onChange}
                      value={order?.product}
                      checked={listChecked.includes(order?.product)}
                    />
                    <img src={order?.image} className="image" />
                    <div className="image-name">{order?.name}</div>
                  </div>
                  <div className="list-down">
                    <div className="price">{order?.price}</div>
                    <div className="amount">
                      <button
                        onClick={() =>
                          handleChangeCount("decrease", order?.product)
                        }
                      >
                        <MinusOutlined />
                      </button>
                      <InputNumber
                        defaultValue={order?.amount}
                        value={order?.amount}
                        size="small"
                        className="input-number"
                      />

                      <button
                        onClick={() =>
                          handleChangeCount("increase", order?.product)
                        }
                      >
                        <PlusOutlined />
                      </button>
                    </div>
                    <div className="into-money">
                      {order?.price * order?.amount}
                    </div>
                    <DeleteOutlined
                      onClick={() => handleDeleteOrder(order?.product)}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="order-right">
            <div className="order-right-content">
              <div className="order-infor">
                <div className="provisional">
                  <span>Tạm tính</span>
                  <span>0</span>
                </div>
                <div className="discount">
                  <span>Giảm giá</span>
                  <span>0</span>
                </div>
                <div className="tax">
                  <span>Thuế</span>
                  <span>0</span>
                </div>
                <div className="delivery-charges">
                  <span>Phí giao hàng</span>
                  <span>0</span>
                </div>
              </div>
              <div className="order-total">
                <div>Tổng tiền</div>
                <div className="total">
                  <div className="number-total">123</div>
                  <span>(Đã bao gồm VAT nếu có)</span>
                </div>
              </div>
            </div>
            <button>Mua ngay</button>
          </div>
        </div>
      </div>
    </div>
  );
};
