import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderItems: [],
  shippingAddress: {},
  paymentMethod: "",
  itemsPrice: 0,
  shippingPrice: 0,
  taxPrice: 0,
  totalPrice: 0,
  user: "",
  isPaid: false,
  paidAt: "",
  isDelivered: false,
  deliveredAt: "",
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addOrderProduct: (state, action) => {
      const { orderItems } = action.payload;
      const itemOrder = state?.orderItems?.find(
        (item) => item?.product === orderItems.product
      );
      if (itemOrder) {
        itemOrder.amount += itemOrder?.amount;
      } else {
        state.orderItems.push(orderItems);
      }
    },
    increaseAmount: (state, action) => {
      const { idProduct } = action.payload;
      const itemOrder = state?.orderItems?.find(
        (item) => item?.product === idProduct
      );
      itemOrder.amount++;
    },
    decreaseAmount: (state, action) => {
      const { idProduct } = action.payload;
      const itemOrder = state?.orderItems?.find(
        (item) => item?.product === idProduct
      );
      itemOrder.amount--;
    },

    removeOrderProduct: (state, action) => {
      const { idProduct } = action.payload;
      const filteredItems = state.orderItems.filter(
        (item) => item.product !== idProduct
      );
      state.orderItems = filteredItems;
    },
    removeAllOrderProduct: (state, action) => {
      const { listChecked } = action.payload;
      const filteredItems = state.orderItems.filter(
        (item) => !listChecked.includes(item.product)
      );
      state.orderItems = filteredItems;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addOrderProduct,
  increaseAmount,
  decreaseAmount,
  removeOrderProduct,
  removeAllOrderProduct,
} = orderSlice.actions;

export default orderSlice.reducer;
