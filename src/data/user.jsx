import driver1 from '../assets/driver-pic/driver1.jpg';
import driver2 from '../assets/driver-pic/driver2.jpg';
import driver3 from '../assets/driver-pic/driver3.jpg';
import driver4 from '../assets/driver-pic/driver4.jpg';

const users = [
    {
        userID: 1, // Unique ID for this user
        user: 'Namphet', pass: 'pass', role: 'user', token: 'user', pic: [
            driver1,
            driver2,
        ],
        informProfile: {
            name: "น้ำเพชร พิพัฒน",
            email: "namphet.phi@gmail.com",
            birthdate: "1986-11-23",
            countryCode: "+66",
            phoneNumber: "0000000000",
        },
        informDriver: {
            plateNumber: 'ชย 95',
            brand: 'Isuzu',
            details: 'ขนาดบรรทุกสูงสุดไม่เกิน: กว้าง 2.2m x ยาว 7m x สูง 2.5m รองรับน้ำหนัก 4 ตัน',
        },
        paymentMethods: [
            { id: 1, type: "กรุงไทย", name: "บัญชีพ่อ", details: "1223456782", isDefault: true },
        ],
    },
    {
        userID: 2,
        user: 'Kongkiat', pass: 'pass', role: 'user', token: 'user', pic: [
            driver3,
            driver4,
        ],
        informProfile: {
            name: "ก้องเกียรติ จิตดี",
            email: "kongkiat.jit@gmail.com",
            birthdate: "1986-11-23",
            countryCode: "+66",
            phoneNumber: "0812345678",
        },
        informDriver: {
            plateNumber: 'กย 1500',
            brand: 'Toyota',
            details: 'ขนาดบรรทุกสูงสุดไม่เกิน: กว้าง 2.2m x ยาว 7m x สูง 2.5m รองรับน้ำหนัก 4 ตัน',
        },
        paymentMethods: [
            { id: 1, type: "กรุงไทย", name: "บัญชีแม่", details: "1223456782", isDefault: true },
        ],
    },
];

export default users;