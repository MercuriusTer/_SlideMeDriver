import { useState } from 'react';

const useOrderData = (userID) => {
    const [ordersList, setOrdersList] = useState([
        // Example data for userID 1
        {
            userID: 1,
            id: 1,
            name: "ทีเจย์ เพชรงาม",
            date: '27 Aug 2024 - 20:40',
            amount: 1200,
            status: 'history',
            address1: 'มหาวิทยาลัยศรีปทุม, 2410/2, ถนนพหลโยธิน, แขวงลาดยาว, เขตจตุจักร, กรุงเทพมหานคร, 10900, ประเทศไทย',
            address2: 'พหลโยธิน 53 แยก 19, แขวงอนุสาวรีย์, เขตบางเขน, กรุงเทพมหานคร, 10010, ประเทศไทย',
            carType: 'SUV',
            moreDetail: 'รถคันนี้สีเขียว',
        },
        {
            userID: 1,
            id: 2,
            name: "อภิรักษ์ เจตสมมาตร",
            date: '25 Aug 2024 - 10:00',
            amount: 1300,
            status: 'scheduled',
            address1: 'แขวงตลาดบางเขน, เขตหลักสี่, กรุงเทพมหานคร, 10210, ประเทศไทย',
            address2: 'กลุ่มปฏิบัติการเดินรถที่ 1 เขตการเดินรถที่ 1 (อู่บางเขน), ถนนพหลโยธิน, แขวงอนุสาวรีย์, เขตบางเขน, กรุงเทพมหานคร, 10010, ประเทศไทย',
            carType: 'SUV',
            moreDetail: 'รถคันนี้สีเขียว',
        },
        {
            userID: 1,
            id: 3,
            name: "ธีรเดช บรรจงศักดิ์",
            date: '27 Aug 2024 - 20:40',
            amount: 1300,
            status: 'current',
            address1: 'ถนนพหลโยธิน, แขวงอนุสาวรีย์, เขตบางเขน, กรุงเทพมหานคร, 10010, ประเทศไทย',
            address2: 'พหลโยธิน 63/1, แขวงอนุสาวรีย์, เขตบางเขน, กรุงเทพมหานคร, 10210, ประเทศไทย',
            carType: 'SUV',
            moreDetail: 'รถคันนี้สีเขียว',
        },
        // Add data for other users as needed
    ]);

    const userOrders = ordersList.filter(order => order.userID === userID);

    const addOrders = (newOrder) => {
        setOrdersList([...ordersList, { ...newOrder, userID, id: ordersList.length + 1 }]);
    };

    const updateOrders = (id, newOrder) => {
        setOrdersList(ordersList.map(order => order.userID === userID && order.id === id ? { ...order, ...newOrder } : order));
    };

    const deleteOrders = (id) => {
        const updatedOrders = ordersList.filter(order => !(order.userID === userID && order.id === id));
        setOrdersList(updatedOrders);
    };

    return { ordersList: userOrders, addOrders, updateOrders, deleteOrders };
};

export default useOrderData;
