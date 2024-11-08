const prisma = require('../configs/prisma');
const ExcelJS = require('exceljs');
const createError = require("../utils/createError")


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

        return createError(500, error.message);
    }
};


exports.exportDonationToExcel = async (donations, res) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Donations Report');


    worksheet.columns = [
        { header: 'วันที่ส่งข้อมูล', key: 'date', width: 15 },
        { header: 'ชื่อผู้ระดมทุน', key: 'donorName', width: 25 },
        { header: 'ยอดระดมทุน', key: 'amount', width: 15 },
        { header: 'รหัสการทำธุรกรรม', key: 'transactionId', width: 25 },
        { header: 'สถานะ', key: 'status', width: 15 }
    ];

    donations.forEach(donation => {
        const row = {
            date: donation.created_at,
            donorName: donation.user.firstname,
            amount: donation.total,
            transactionId: donation.transaction_id,
            status: donation.status
        };

        worksheet.addRow(row);
    });

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=donations-report.xlsx');

    await workbook.xlsx.write(res);
    res.end();
};

exports.getAdopts = async () => {
    try {
        const adopts = await prisma.adopts.findMany({
            select: {
                created_at: true,
                user: {
                    select: {
                        firstname: true,
                        phone: true,
                    }
                },
                pet: {
                    select: {
                        name_th: true,
                    }
                },
                approvedByAdmin: {
                    select: {
                        firstname: true,
                    }
                },
                status: true,
                socialContact: true,
                approved_at: true,
                approved_by: true,
                why: true,
            },
            orderBy: { created_at: 'asc' }
        });

        return adopts.map(adopt => ({
            date: adopt.created_at || 'N/A',
            adopter: adopt.user?.firstname || 'N/A',
            petname: adopt.pet?.name_th || 'N/A',
            status: adopt.status || 'N/A',
            phonenumber: adopt.user?.phone || 'N/A',
            contact: adopt.socialContact || 'N/A',
            approved_at: adopt.approved_at || 'N/A',
            approved_by: adopt.approvedByAdmin?.firstname || 'N/A',
            why: adopt.why || 'N/A',

        }));
    } catch (error) {
        return createError(500, error.message);
    }
};


exports.exportAdoptToExcel = async (adopts, res) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Adopt Report');

    // กำหนดคอลัมน์ให้ตรงกับข้อมูลที่มี
    worksheet.columns = [
        { header: 'วันที่สร้าง', key: 'date', width: 15 },
        { header: 'ชื่อผู้รับเลี้ยง', key: 'adopter', width: 15 },
        { header: 'ชื่อสัตว์เลี้ยง', key: 'petname', width: 15 },
        { header: 'สถานะ', key: 'status', width: 20 },
        { header: 'เบอร์ติดต่อ', key: 'phonenumber', width: 20 },
        { header: 'ช่องทางติดต่ออื่นๆ', key: 'contact', width: 30 },
        { header: 'อนุมัติวันที่', key: 'approved_at', width: 15 },
        { header: 'อนุมัติโดย', key: 'approved_by', width: 15 },
        { header: 'รายละเอียดเพิ่มเติม', key: 'why', width: 50 }
    ];


    adopts.forEach(adopt => {
        const row = {
            date: adopt.created_at,
            adopter: adopt.user?.firstname,
            petname: adopt.pet?.name_th,
            status: adopt.status,
            phonenumber: adopt.user?.phone,
            contact: adopt.socialContact,
            approved_at: adopt.approved_at,
            approved_by: adopt.approvedByAdmin?.firstname,
            why: adopt.why,
        };

        worksheet.addRow(row);
    });

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=donations-report.xlsx');

    await workbook.xlsx.write(res);
    res.end();
};



exports.getEvents = async () => {
    try {
        const events = await prisma.events.findMany({
            select: {
                id: true,
                title_th: true,
                description_th: true,
                date_start: true,
                date_end: true,
                status: true,
                location: true,
                created_at: true,
                date_start: true,
                date_end: true,
            },
            orderBy: { created_at: 'asc' }
        });

        return events.map(event => ({
            date: event.created_at || 'N/A',
            title: event.title_th || 'N/A',
            description: event.description_th || 'N/A',
            date_start: event.date_start || 'N/A',
            date_end: event.date_end || 'N/A',
            location: event.location || 'N/A',
            status: event.status || 'N/A',



        }));
    } catch (error) {
        return createError(500, error.message);
    }
};


exports.exportEventToExcel = async (events, res) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Event Report');

    // กำหนดคอลัมน์ให้ตรงกับข้อมูลที่มี
    worksheet.columns = [
        { header: 'วันที่สร้าง', key: 'date', width: 15 },
        { header: 'ชื่อกิจกรรม', key: 'title', width: 15 },
        { header: 'รายละเอียด', key: 'description', width: 15 },
        { header: 'วันที่เริ่มงาน', key: 'date_start', width: 20 },
        { header: 'วัวันที่จบงาน', key: 'date_end', width: 20 },
        { header: 'สถานที่จัดงาน', key: 'location', width: 30 },
        { header: 'สถานะ', key: 'status', width: 15 },


    ];

    // ดึงข้อมูลจาก donations และแมปข้อมูลในแต่ละฟิลด์ให้ตรงกัน
    events.forEach(event => {
        const row = {
            date: event.created_at,
            title: event.title_th,
            description: event.description_th,
            date_start: event.date_start,
            date_end: event.date_end,
            location: event.location,
            status: event.status,

        };

        worksheet.addRow(row);
    });

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=donations-report.xlsx');

    await workbook.xlsx.write(res);
    res.end();
};
exports.getListEvents = async () => {
    try {
        const events = await prisma.eventAttendees.findMany({
            where: {
                eventId: +eventId
            },
            include: {
                user: {
                    select: {
                        id: true,
                        firstname: true,
                        lastname: true,
                        phone: true,
                    }
                }
            }
        });

        return events.map(event => ({
            id: event.user.id || 'N/A',
            firstname: event.user.firstname || 'N/A',
            lastname: event.user.lastname || 'N/A',
            phone: event.user.phone || 'N/A',


        }));
    } catch (error) {

        return createError(500, error.message);
    }
};
exports.exportEventListToExcel = async (events, res) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Event Report');

    // กำหนดคอลัมน์ให้ตรงกับข้อมูลที่มี
    worksheet.columns = [
        { header: 'ไอดี', key: 'id', width: 15 },
        { header: 'ชื่อ', key: 'firstname', width: 30 },
        { header: 'นามสกุล', key: 'lastname', width: 30 },
        { header: 'เบอร์ติดต่อ', key: 'phone', width: 15 },

    ];

    // ดึงข้อมูลจาก donations และแมปข้อมูลในแต่ละฟิลด์ให้ตรงกัน
    events.forEach(event => {
        const row = {
            id: event.user.id,
            firstname: event.user.firstname,
            lastname: event.user.lastname,
            phone: event.user.phone

        };

        worksheet.addRow(row);
    });

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=donations-report.xlsx');

    await workbook.xlsx.write(res);
    res.end();
};


exports.getPets = async () => {
    try {
        const pets = await prisma.pets.findMany({
            select: {
                id: true,
                name_th: true,
                age: true,
                color: true,
                gender: true,
                type: true,
                status: true,
                breed_th: true,
                description_th: true,
                medical_history: true,
                is_vaccinated: true,
                is_neutered: true,
                weight: true,
                created_at: true,
            },
            orderBy: { created_at: 'asc' }
        });

        return pets.map(pet => ({
            date: pet.created_at || 'N/A',
            petname: pet.name_th || 'N/A',
            age: pet.age || 'N/A',
            color: pet.color || 'N/A',
            gender: pet.gender || 'N/A',
            type: pet.type || 'N/A',
            status: pet.status || 'N/A',
            breed: pet.breed_th || 'N/A',
            description: pet.description_th || 'N/A',
            medical_history: pet.medical_history || 'N/A',
            is_vaccinated: pet.is_vaccinated || 'N/A',
            is_neutered: pet.is_neutered || 'N/A',
            weight: pet.weight || 'N/A',
            created_at: pet.created_at || 'N/A',


        }));
    } catch (error) {
        return createError(500, error.message);
    }
};


exports.exportPetToExcel = async (pets, res) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Pets Report');

    // กำหนดคอลัมน์ให้ตรงกับข้อมูลที่มี
    worksheet.columns = [
        { header: 'วันที่เพิ่มข้อมูล', key: 'date', width: 15 },
        { header: 'ชื่อน้อง', key: 'petname', width: 15 },
        { header: 'วันเกิด', key: 'age', width: 15 },
        { header: 'สี', key: 'color', width: 20 },
        { header: 'เพศ', key: 'gender', width: 20 },
        { header: 'ประเภท', key: 'type', width: 30 },
        { header: 'สถานะ', key: 'status', width: 15 },
        { header: 'สายพันธ์ุ', key: 'breed', width: 15 },
        { header: 'รายละเอียด', key: 'description', width: 15 },
        { header: 'ประวัติการรักษา', key: 'medical_history', width: 15 },
        { header: 'วัคซีน', key: 'is_vaccinated', width: 15 },
        { header: 'ทำหมัน', key: 'is_neutered', width: 15 },
        { header: 'น้ำหนัก', key: 'weight', width: 15 },

    ];

    // ดึงข้อมูลจาก donations และแมปข้อมูลในแต่ละฟิลด์ให้ตรงกัน
    pets.forEach(pet => {
        const row = {
            date: pet.created_at,
            petname: pet.name_th,
            age: pet.age,
            color: pet.color,
            gender: pet.gender,
            type: pet.type,
            status: pet.status,
            breed: pet.breed_th,
            description: pet.description_th,
            medical_history: pet.medical_history,
            is_vaccinated: pet.is_vaccinated,
            is_neutered: pet.is_neutered,
            weight: pet.weight,

        };

        worksheet.addRow(row);
    });

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=donations-report.xlsx');

    await workbook.xlsx.write(res);
    res.end();
};

