const prisma = require('../configs/prisma');
const ExcelJS = require('exceljs');

exports.getDonations = async () => {
    try {
        const donations = await prisma.donates.findMany({
            select: {
                created_at: true,
                user: {
                    select: {
                        firstname: true,
                    }
                },
                total: true,
                payment_method: true,
                transaction_id: true,
                status: true
            },
            orderBy: { created_at: 'asc' }
        });

        return donations.map(donation => ({
            date: donation.created_at || 'N/A',  // ตรวจสอบว่ามีค่าว่างไหม
            donorName: donation.user?.firstname || 'N/A',  // ใช้ nullish coalescing เพื่อตรวจสอบค่าว่าง
            amount: donation.total || 0,
            paymentMethod: donation.payment_method || 'N/A',
            transactionId: donation.transaction_id || 'N/A',
            status: donation.status || 'N/A'
        }));
    } catch (error) {
        console.error("Error fetching donations:", error);
        throw new Error("Failed to fetch donations");
    }
};


exports.exportToExcel = async (donations, res) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Donations Report');

    // กำหนดคอลัมน์ให้ตรงกับข้อมูลที่มี
    worksheet.columns = [
        { header: 'Date', key: 'date', width: 15 },
        { header: 'Donor Name', key: 'donorName', width: 25 },
        { header: 'Amount', key: 'amount', width: 15 },
        { header: 'Payment Method', key: 'paymentMethod', width: 20 },
        { header: 'Transaction ID', key: 'transactionId', width: 25 },
        { header: 'Status', key: 'status', width: 15 }
    ];

    // ดึงข้อมูลจาก donations และแมปข้อมูลในแต่ละฟิลด์ให้ตรงกัน
    donations.forEach(donation => {
        const row = {
            date: donation.created_at,
            donorName: donation.user.firstname, // ใช้ชื่อจาก donation.user.firstname
            amount: donation.total,
            paymentMethod: donation.payment_method,
            transactionId: donation.transaction_id,
            status: donation.status
        };
        console.log("Adding row to worksheet:", row); // ตรวจสอบ row ก่อนเพิ่มลง Excel
        worksheet.addRow(row);
    });

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=donations-report.xlsx');

    await workbook.xlsx.write(res);
    res.end();
};

