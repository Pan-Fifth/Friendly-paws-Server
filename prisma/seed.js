const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

const DOG_IMAGES = [
  "https://images.unsplash.com/photo-1543466835-00a7907e9de1",
  "https://images.unsplash.com/photo-1587300003388-59208cc962cb",
  "https://images.unsplash.com/photo-1548199973-03cce0bbc87b",
  "https://images.unsplash.com/photo-1552053831-71594a27632d",
  "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2",
  "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e",
  "https://images.unsplash.com/photo-1477884213360-7e9d7dcc1e48",
  "https://images.unsplash.com/photo-1534351450181-ea9f78427fe8",
  "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6",
  "https://images.unsplash.com/photo-1588943211346-0908a1fb0b01",
  "https://images.unsplash.com/photo-1581991495806-0e2d2b182dbf",
  "https://images.unsplash.com/photo-1645910155147-b20902b148e3",
  "https://images.unsplash.com/photo-1616778183887-ee0b01f59e31",
  "https://plus.unsplash.com/premium_photo-1723672846306-97227ab9b0d8",
  "https://images.unsplash.com/photo-1605785721885-c8ab2ad9d3f3",
  "https://images.unsplash.com/photo-1649571069618-99a265749d5b",
  "https://images.unsplash.com/photo-1671731478723-830fd658c6d3",
  "https://images.unsplash.com/photo-1616684110388-efff7624660a",
  "https://images.unsplash.com/photo-1657088746570-0218626e8f55",
  "https://plus.unsplash.com/premium_photo-1694819488591-a43907d1c5cc",
  "https://images.unsplash.com/photo-1625481725697-1161b516710c",
  "https://images.unsplash.com/photo-1651492017098-3229dc8a8d82",
  "https://images.unsplash.com/photo-1729479502513-4d760f4d1954",
  "https://plus.unsplash.com/premium_photo-1723672811358-257975ecac93",
  "https://images.unsplash.com/photo-1628290899801-ec6d7452a91d",
  "https://images.unsplash.com/photo-1599586477491-f86db60c0c1c",
  "https://images.unsplash.com/photo-1612599170017-de8c11bd5c21",
  "https://images.unsplash.com/photo-1690052346621-e541ac1efe9e",
  "https://images.unsplash.com/photo-1672830974897-3d145693b712",
  "https://images.unsplash.com/photo-1614178730713-4badc749c333",
];

const CAT_IMAGES = [
  "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba",
  "https://images.unsplash.com/photo-1573865526739-10659fec78a5",
  "https://images.unsplash.com/photo-1495360010541-f48722b34f7d",
  "https://images.unsplash.com/photo-1518791841217-8f162f1e1131",
  "https://images.unsplash.com/photo-1574158622682-e40e69881006",
  "https://images.unsplash.com/photo-1533743983669-94fa5c4338ec",
  "https://images.unsplash.com/photo-1592194996308-7b43878e84a6",
  "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13",
  "https://images.unsplash.com/photo-1543852786-1cf6624b9987",
  "https://images.unsplash.com/photo-1561948955-570b270e7c36",
  "https://images.unsplash.com/photo-1652021739169-cfae22c60d84",
  "https://images.unsplash.com/photo-1510704652036-67838c2cfab6",
  "https://images.unsplash.com/photo-1606213651356-0272cc0becd2",
  "https://images.unsplash.com/photo-1547565527-389ccd19e85b",
  "https://images.unsplash.com/photo-1599156615373-85aded7e069c",
  "https://images.unsplash.com/photo-1558674378-e4334d4fecc2",
  "https://images.unsplash.com/photo-1669940613496-2571f36ea36d",
  "https://images.unsplash.com/photo-1559539953-1409062acff3",
  "https://plus.unsplash.com/premium_photo-1667099522600-29a75014848d",
  "https://images.unsplash.com/photo-1626881255770-2397375aad8d",
  "https://images.unsplash.com/photo-1645322044534-09e32fdf5297",
  "https://images.unsplash.com/photo-1585689573260-d68cfdf08dd4",
  "https://images.unsplash.com/photo-1595787664454-cb73fa2b5aea",
  "https://images.unsplash.com/photo-1581886627763-0b5b25323f8d",
  "https://images.unsplash.com/photo-1599156615373-85aded7e069c",
  "https://images.unsplash.com/photo-1554078224-69a398a69f25",
  "https://images.unsplash.com/photo-1695124121977-f0722c3999fe",
  "https://images.unsplash.com/photo-1677936181651-6e356c749fb0",
  "https://images.unsplash.com/photo-1610559185499-b84f6308e259",
  "https://images.unsplash.com/photo-1602634353750-d58ec14064c6",

];

const MIXED_IMAGES = [
  "https://i.pinimg.com/564x/ee/00/20/ee0020e9d7586708083aecdb77be6293.jpg",

  "https://i.pinimg.com/564x/fa/98/82/fa988290ed5db0af24e733cdc5522158.jpg",

  "https://i.pinimg.com/564x/a6/8a/ba/a68abadc337799911f4db1adb36a4cf1.jpg",

  "https://i.pinimg.com/564x/fa/82/bc/fa82bc582fd33946eb7a6cbb3f915329.jpg",

  "https://i.pinimg.com/564x/1b/23/b5/1b23b5e16b3f318e61fdc5af3ea4579e.jpg",
];
const HOME_IMAGES = [
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
  "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
  "https://images.unsplash.com/photo-1564013799919-ab600027ffc6",
  "https://images.unsplash.com/photo-1576941089067-2de3c901e126",
  "https://images.unsplash.com/photo-1598228723793-52759bba239c",
  "https://images.unsplash.com/photo-1572120360610-d971b9d7767c",
  "https://images.unsplash.com/photo-1570129477492-45c003edd2be",
  "https://images.unsplash.com/photo-1554995207-c18c203602cb",
  "https://images.unsplash.com/photo-1523217582562-09d0def993a6",
];

const EVENT_IMAGES = [
  "https://images.unsplash.com/photo-1539541417736-3d44c90da315",
  "https://images.unsplash.com/photo-1516834474-48c0abc2a902",
  "https://images.unsplash.com/photo-1450778869180-41d0601e046e",
  "https://images.unsplash.com/photo-1445251836269-d158eaa028a6",
  "https://images.unsplash.com/photo-1558583055-d7ac00b1adca",
  "https://images.unsplash.com/photo-1534361960057-19889db9621e",
  "https://images.unsplash.com/photo-1548199973-03cce0bbc87b",
  "https://images.unsplash.com/photo-1576201836106-db1758fd1c97",
  "https://images.unsplash.com/photo-1541599468348-e96984315921",
  "https://images.unsplash.com/photo-1517457373958-b7bdd4587205",
  "https://images.unsplash.com/photo-1666805084504-ae0f59cdde0c",
  "https://plus.unsplash.com/premium_photo-1661407493412-34a15c8f1b1e",
  "https://images.unsplash.com/photo-1726245219440-37d541ac3db8",
  "https://plus.unsplash.com/premium_photo-1661602029674-3f7b4b71ee10",
  "https://images.unsplash.com/photo-1472653816316-3ad6f10a6592",
  "https://images.unsplash.com/photo-1560439514-4e9645039924",
  "https://images.unsplash.com/photo-1674574124345-02c525664b65",
  "https://images.unsplash.com/photo-1508997449629-303059a039c0",
  "https://images.unsplash.com/photo-1439539698758-ba2680ecadb9",
  "https://images.unsplash.com/photo-1517456793572-1d8efd6dc135",
  "https://images.unsplash.com/photo-1646183230241-3c09823f85c6",
];

const BANNER_IMAGES = [
  "https://images.unsplash.com/photo-1548199973-03cce0bbc87b",
  "https://images.unsplash.com/photo-1593871075120-982e042088d8",
  "https://images.unsplash.com/photo-1597633425046-08f5110420b5",
];

async function main() {
  await prisma.$transaction([
    prisma.eventBanner.deleteMany(),
    prisma.aboutContent.deleteMany(),
    prisma.contactInfo.deleteMany(),
    prisma.homeContent.deleteMany(),
    prisma.donationGoals.deleteMany(),
    prisma.volunteerAvailabilities.deleteMany(),
    prisma.volunteerSkills.deleteMany(),
    prisma.volunteers.deleteMany(),
    prisma.eventAttendees.deleteMany(),
    prisma.eventImages.deleteMany(),
    prisma.events.deleteMany(),
    prisma.donates.deleteMany(),
    prisma.accommodationImages.deleteMany(),
    prisma.adopts.deleteMany(),
    prisma.petImages.deleteMany(),
    prisma.pets.deleteMany(),
    prisma.homeImages.deleteMany(),
    prisma.users.deleteMany(),
    prisma.donationContent.deleteMany(),
  ]);

  // Creating 15 users with different roles
  const users = await Promise.all(
    Array(15)
      .fill()
      .map(async (_, i) => {
        const role = i < 2 ? "ADMIN" : i < 5 ? "VOLUNTEER" : "USER";
        return prisma.users.create({
          data: {
            email: `user${i + 1}@example.com`,
            password: await bcrypt.hash("password123", 10),
            firstname: `FirstName${i + 1}`,
            lastname: `LastName${i + 1}`,
            phone: `08${Math.floor(10000000 + Math.random() * 90000000)}`,
            role,
            googleId: null,
            resettoken: null,
            resettokenExpire: null,
          },
        });
      })
  );

  /// Create 20 dogs and 20 cats
 const pets = await Promise.all([
    prisma.pets.create({
      data: {
        name_en: "Charlie",
        name_th: "ชาร์ลี",
        age: new Date("2022-03-15"),
        color: "Brown",
        gender: "MALE",
        type: "DOG",
        status: "AVAILABLE",
        breed_en: "Golden Retriever",
        breed_th: "โกลเด้น รีทรีฟเวอร์",
        description_en: "Friendly and energetic, loves to play outside.",
        description_th: "ขี้เล่นและกระตือรือร้น ชอบเล่นข้างนอก",
        medical_history: "Vaccinated, No major health issues.",
        is_vaccinated: true,
        is_neutered: true,
        weight: 30.0,
        image: {
          create: [{ url: DOG_IMAGES[10] }],
        },
      },
    }),


    prisma.pets.create({
      data: {
        name_en: "Max",
        name_th: "แม็กซ์",
        age: new Date("2021-06-10"),
        color: "Black",
        gender: "MALE",
        type: "DOG",
        status: "AVAILABLE",
        breed_en: "Labrador",
        breed_th: "ลาบราดอร์",
        description_en: "Loyal and friendly, loves to play fetch.",
        description_th: "ซื่อสัตย์และเป็นมิตร ชอบเล่นปาไม้",
        medical_history: "Vaccinated, Healthy.",
        is_vaccinated: true,
        is_neutered: true,
        weight: 35.0,
        image: {
          create: [{ url: DOG_IMAGES[11] }],
        },
      },
    }),


    prisma.pets.create({
      data: {
        name_en: "Rocky",
        name_th: "ร็อคกี้",
        age: new Date("2023-02-15"),
        color: "Brown",
        gender: "MALE",
        type: "DOG",
        status: "AVAILABLE",
        breed_en: "Bulldog",
        breed_th: "บูลด็อก",
        description_en: "Strong and courageous, enjoys running.",
        description_th: "แข็งแรงและกล้าหาญ ชอบวิ่ง",
        medical_history: "Vaccinated, No major issues.",
        is_vaccinated: true,
        is_neutered: false,
        weight: 25.0,
        image: {
          create: [{ url: DOG_IMAGES[12] }],
        },
      },
    }),


    prisma.pets.create({
      data: {
        name_en: "Daisy",
        name_th: "เดซี่",
        age: new Date("2022-07-05"),
        color: "White",
        gender: "FEMALE",
        type: "DOG",
        status: "AVAILABLE",
        breed_en: "French Bulldog",
        breed_th: "เฟรนช์ บูลด็อก",
        description_en: "Playful and affectionate, loves cuddles.",
        description_th: "ขี้เล่นและรักใคร่ ชอบอ้อน",
        medical_history: "Vaccinated, Healthy.",
        is_vaccinated: true,
        is_neutered: true,
        weight: 12.0,
        image: {
          create: [{ url: DOG_IMAGES[13] }],
        },
      },
    }),
    prisma.pets.create({
      data: {
        name_en: "Buddy",
        name_th: "บัดดี้",
        age: new Date("2021-09-14"),
        color: "Brown",
        gender: "MALE",
        type: "DOG",
        status: "AVAILABLE",
        breed_en: "Beagle",
        breed_th: "บีเกิล",
        description_en: "Friendly and energetic, loves to play outdoors.",
        description_th: "ขี้เล่นและกระตือรือร้น ชอบเล่นกลางแจ้ง",
        medical_history: "Vaccinated, Healthy.",
        is_vaccinated: true,
        is_neutered: false,
        weight: 18.0,
        image: {
          create: [{ url: DOG_IMAGES[14] }],
        },
      },
    }),
    prisma.pets.create({
      data: {
        name_en: "Sadie",
        name_th: "เซดี้",
        age: new Date("2020-05-22"),
        color: "Black",
        gender: "FEMALE",
        type: "DOG",
        status: "AVAILABLE",
        breed_en: "German Shepherd",
        breed_th: "เยอรมันเชพเพิร์ด",
        description_en: "Protective and loyal, loves to run.",
        description_th: "มีความภักดีและปกป้อง ชอบวิ่ง",
        medical_history: "Vaccinated, Healthy.",
        is_vaccinated: true,
        is_neutered: true,
        weight: 40.0,
        image: {
          create: [{ url: DOG_IMAGES[15] }],
        },
      },
    }),
    prisma.pets.create({
      data: {
        name_en: "Rocky",
        name_th: "ร็อคกี้",
        age: new Date("2021-08-01"),
        color: "Gray",
        gender: "MALE",
        type: "DOG",
        status: "AVAILABLE",
        breed_en: "Poodle",
        breed_th: "ปูดเดิ้ล",
        description_en: "Loyal and playful, enjoys training.",
        description_th: "ซื่อสัตย์และขี้เล่น ชอบฝึกฝน",
        medical_history: "Vaccinated, Healthy.",
        is_vaccinated: true,
        is_neutered: true,
        weight: 9.0,
        image: {
          create: [{ url: DOG_IMAGES[16] }],
        },
      },
    }),
    prisma.pets.create({
      data: {
        name_en: "Zoe",
        name_th: "โซอี้",
        age: new Date("2022-02-10"),
        color: "White",
        gender: "FEMALE",
        type: "DOG",
        status: "AVAILABLE",
        breed_en: "Shih Tzu",
        breed_th: "ชิห์สุ",
        description_en: "Sweet and affectionate, loves being pampered.",
        description_th: "หวานและรักใคร่ ชอบถูกอุ้ม",
        medical_history: "Vaccinated, Healthy.",
        is_vaccinated: true,
        is_neutered: true,
        weight: 7.0,
        image: {
          create: [{ url: DOG_IMAGES[17] }],
        },
      },
    }),
    prisma.pets.create({
      data: {
        name_en: "Jack",
        name_th: "แจ็ค",
        age: new Date("2020-11-30"),
        color: "Brown",
        gender: "MALE",
        type: "DOG",
        status: "AVAILABLE",
        breed_en: "Cocker Spaniel",
        breed_th: "ค็อกเกอร์ สแปเนียล",
        description_en: "Energetic and happy, loves to play with balls.",
        description_th: "กระตือรือร้นและมีความสุข ชอบเล่นกับลูกบอล",
        medical_history: "Vaccinated, Healthy.",
        is_vaccinated: true,
        is_neutered: true,
        weight: 20.0,
        image: {
          create: [{ url: DOG_IMAGES[18] }],
        },
      },
    }),
    prisma.pets.create({
      data: {
        name_en: "Luna",
        name_th: "ลูน่า",
        age: new Date("2021-04-14"),
        color: "Golden",
        gender: "FEMALE",
        type: "DOG",
        status: "AVAILABLE",
        breed_en: "Golden Retriever",
        breed_th: "โกลเด้น รีทรีฟเวอร์",
        description_en: "Gentle and playful, loves to swim.",
        description_th: "อ่อนโยนและขี้เล่น ชอบว่ายน้ำ",
        medical_history: "Vaccinated, Healthy.",
        is_vaccinated: true,
        is_neutered: true,
        weight: 28.0,
        image: {
          create: [{ url: DOG_IMAGES[19] }],
        },
      },
    }),


    prisma.pets.create({
      data: {
        name_en: "Toby",
        name_th: "โทบี้",
        age: new Date("2021-01-12"),
        color: "Tan",
        gender: "MALE",
        type: "DOG",
        status: "AVAILABLE",
        breed_en: "Dachshund",
        breed_th: "ดัชชุนด์",
        description_en: "Curious and playful, loves digging.",
        description_th: "อยากรู้อยากเห็นและขี้เล่น ชอบขุดดิน",
        medical_history: "Vaccinated, Healthy.",
        is_vaccinated: true,
        is_neutered: false,
        weight: 9.0,
        image: {
          create: [{ url: DOG_IMAGES[20] }],
        },
      },
    }),

    prisma.pets.create({
      data: {
        name_en: "Ruby",
        name_th: "รูบี้",
        age: new Date("2020-10-20"),
        color: "Red",
        gender: "FEMALE",
        type: "DOG",
        status: "AVAILABLE",
        breed_en: "Cocker Spaniel",
        breed_th: "ค็อกเกอร์ สแปเนียล",
        description_en: "Friendly and affectionate, loves to be with people.",
        description_th: "เป็นมิตรและรักใคร่ ชอบอยู่ใกล้คน",
        medical_history: "Vaccinated, Healthy.",
        is_vaccinated: true,
        is_neutered: true,
        weight: 14.0,
        image: {
          create: [{ url: DOG_IMAGES[21] }],
        },
      },
    }),

    prisma.pets.create({
      data: {
        name_en: "Oscar",
        name_th: "ออสการ์",
        age: new Date("2021-12-05"),
        color: "Black and Tan",
        gender: "MALE",
        type: "DOG",
        status: "AVAILABLE",
        breed_en: "Rottweiler",
        breed_th: "ร็อตไวเลอร์",
        description_en: "Strong and protective, loyal companion.",
        description_th: "แข็งแกร่งและปกป้อง คู่หูที่ซื่อสัตย์",
        medical_history: "Vaccinated, Healthy.",
        is_vaccinated: true,
        is_neutered: true,
        weight: 40.0,
        image: {
          create: [{ url: DOG_IMAGES[22] }],
        },
      },
    }),

    prisma.pets.create({
      data: {
        name_en: "Lilly",
        name_th: "ลิลลี่",
        age: new Date("2022-01-25"),
        color: "White",
        gender: "FEMALE",
        type: "DOG",
        status: "AVAILABLE",
        breed_en: "Bulldog",
        breed_th: "บูลด็อก",
        description_en: "Calm and loving, enjoys being with family.",
        description_th: "สงบและรักใคร่ ชอบอยู่กับครอบครัว",
        medical_history: "Vaccinated, Healthy.",
        is_vaccinated: true,
        is_neutered: false,
        weight: 22.0,
        image: {
          create: [{ url: DOG_IMAGES[23] }],
        },
      },
    }),

    prisma.pets.create({
      data: {
        name_en: "Buster",
        name_th: "บัสเตอร์",
        age: new Date("2020-12-05"),
        color: "Gray",
        gender: "MALE",
        type: "DOG",
        status: "AVAILABLE",
        breed_en: "Boxer",
        breed_th: "บ็อกเซอร์",
        description_en: "Energetic and strong, loves to play.",
        description_th: "กระตือรือร้นและแข็งแรง ชอบเล่น",
        medical_history: "Vaccinated, Healthy.",
        is_vaccinated: true,
        is_neutered: true,
        weight: 28.0,
        image: {
          create: [{ url: DOG_IMAGES[24] }],
        },
      },
    }),

    prisma.pets.create({
      data: {
        name_en: "Jake",
        name_th: "เจค",
        age: new Date("2021-04-10"),
        color: "Black",
        gender: "MALE",
        type: "DOG",
        status: "AVAILABLE",
        breed_en: "Doberman",
        breed_th: "โดเบอร์มัน",
        description_en: "Confident and protective, great watchdog.",
        description_th: "มั่นใจและปกป้อง เหมาะสำหรับการเฝ้าระวัง",
        medical_history: "Vaccinated, Healthy.",
        is_vaccinated: true,
        is_neutered: false,
        weight: 32.0,
        image: {
          create: [{ url: DOG_IMAGES[25] }],
        },
      },
    }),
    prisma.pets.create({
      data: {
        name_en: "Maximus",
        name_th: "แม็กซิมัส",
        age: new Date("2020-03-05"),
        color: "Brown",
        gender: "MALE",
        type: "DOG",
        status: "AVAILABLE",
        breed_en: "Saint Bernard",
        breed_th: "เซนต์เบอร์นาร์ด",
        description_en: "Big and gentle, loves to relax.",
        description_th: "ตัวใหญ่และใจดี ชอบผ่อนคลาย",
        medical_history: "Vaccinated, Healthy.",
        is_vaccinated: true,
        is_neutered: true,
        weight: 60.0,
        image: {
          create: [{ url: DOG_IMAGES[26] }],
        },
      },
    }),

    prisma.pets.create({
      data: {
        name_en: "Milo",
        name_th: "ไมโล",
        age: new Date("2021-06-01"),
        color: "Brindle",
        gender: "MALE",
        type: "DOG",
        status: "AVAILABLE",
        breed_en: "Pitbull",
        breed_th: "พิทบูล",
        description_en: "Loyal and strong, enjoys outdoor activities.",
        description_th: "ซื่อสัตย์และแข็งแรง ชอบกิจกรรมกลางแจ้ง",
        medical_history: "Vaccinated, Healthy.",
        is_vaccinated: true,
        is_neutered: true,
        weight: 35.0,
        image: {
          create: [{ url: DOG_IMAGES[27] }],
        },
      },
    }),

    prisma.pets.create({
      data: {
        name_en: "Bella",
        name_th: "เบลล่า",
        age: new Date("2021-09-12"),
        color: "Golden",
        gender: "FEMALE",
        type: "DOG",
        status: "AVAILABLE",
        breed_en: "Labrador Retriever",
        breed_th: "ลาบราดอร์ รีทรีฟเวอร์",
        description_en: "Friendly and energetic, loves swimming.",
        description_th: "ขี้เล่นและกระตือรือร้น ชอบว่ายน้ำ",
        medical_history: "Vaccinated, Healthy.",
        is_vaccinated: true,
        is_neutered: false,
        weight: 28.0,
        image: {
          create: [{ url: DOG_IMAGES[28] }],
        },
      },
    }),
    prisma.pets.create({
      data: {
        name_en: "Max",
        name_th: "แม็กซ์",
        age: new Date("2020-08-21"),
        color: "Black",
        gender: "MALE",
        type: "DOG",
        status: "AVAILABLE",
        breed_en: "Labrador Retriever",
        breed_th: "ลาบราดอร์ รีทรีฟเวอร์",
        description_en: "Friendly and loyal, loves to swim and play fetch.",
        description_th: "ขี้เล่นและจงรักภักดี ชอบว่ายน้ำและเล่นปาหมุด",
        medical_history: "Vaccinated, Healthy.",
        is_vaccinated: true,
        is_neutered: false,
        weight: 32.0,
        image: {
          create: [{ url: DOG_IMAGES[29] }],
        },
      },
    }),

    prisma.pets.create({
      data: {
        name_en: "Milo",
        name_th: "ไมโล",
        age: new Date("2022-02-05"),
        color: "Gray",
        gender: "MALE",
        type: "CAT",
        status: "AVAILABLE",
        breed_en: "British Shorthair",
        breed_th: "บริติช ชอร์ตแฮร์",
        description_en: "Calm and independent, loves to lounge around.",
        description_th: "สงบและรักอิสระ ชอบนอนเล่น",
        medical_history: "Vaccinated, Healthy.",
        is_vaccinated: true,
        is_neutered: true,
        weight: 5.0,
        image: {
          create: [{ url: CAT_IMAGES[10] }],
        },
      },
    }),

    prisma.pets.create({
      data: {
        name_en: "Luna",
        name_th: "ลูนา",
        age: new Date("2021-12-10"),
        color: "Black",
        gender: "FEMALE",
        type: "CAT",
        status: "AVAILABLE",
        breed_en: "Siamese",
        breed_th: "สยาม",
        description_en: "Affectionate and vocal, loves attention.",
        description_th: "รักใคร่และพูดมาก ชอบความสนใจ",
        medical_history: "Vaccinated, Healthy.",
        is_vaccinated: true,
        is_neutered: false,
        weight: 3.5,
        image: {
          create: [
            { url: CAT_IMAGES[11] }
          ]
        }
      }
    }),

    prisma.pets.create({
      data: {
        name_en: "Oliver",
        name_th: "โอลิเวอร์",
        age: new Date("2020-08-15"),
        color: "Orange",
        gender: "MALE",
        type: "CAT",
        status: "AVAILABLE",
        breed_en: "Maine Coon",
        breed_th: "เมนคูน",
        description_en: "Playful and curious, enjoys climbing.",
        description_th: "ขี้เล่นและช่างสงสัย ชอบปีนป่าย",
        medical_history: "Vaccinated, Healthy.",
        is_vaccinated: true,
        is_neutered: true,
        weight: 6.0,
        image: {
          create: [
            { url: CAT_IMAGES[12] }
          ]
        }
      }
    }),

    prisma.pets.create({
      data: {
        name_en: "Simba",
        name_th: "ซิมบ้า",
        age: new Date("2021-05-18"),
        color: "Golden",
        gender: "MALE",
        type: "CAT",
        status: "AVAILABLE",
        breed_en: "Persian",
        breed_th: "เปอร์เซีย",
        description_en: "Gentle and affectionate, enjoys being pampered.",
        description_th: "อ่อนโยนและรักใคร่ ชอบการถูกอุ้ม",
        medical_history: "Vaccinated, Spayed.",
        is_vaccinated: true,
        is_neutered: true,
        weight: 4.5,
        image: {
          create: [
            { url: CAT_IMAGES[13] }
          ]
        }
      }
    }),

    prisma.pets.create({
      data: {
        name_en: "Bella",
        name_th: "เบลล่า",
        age: new Date("2020-09-22"),
        color: "Tabby",
        gender: "FEMALE",
        type: "CAT",
        status: "AVAILABLE",
        breed_en: "Bengal",
        breed_th: "เบงกอล",
        description_en: "Energetic and adventurous, loves to explore.",
        description_th: "กระตือรือร้นและรักการผจญภัย ชอบสำรวจ",
        medical_history: "Vaccinated, Healthy.",
        is_vaccinated: true,
        is_neutered: false,
        weight: 4.0,
        image: {
          create: [
            { url: CAT_IMAGES[14] }
          ]
        }
      }
    }),

    prisma.pets.create({
      data: {
        name_en: "Chester",
        name_th: "เชสเตอร์",
        age: new Date("2022-01-09"),
        color: "white",
        gender: "MALE",
        type: "CAT",
        status: "AVAILABLE",
        breed_en: "Russian Blue",
        breed_th: "รัสเซียนบลู",
        description_en: "Quiet and reserved, enjoys solitude.",
        description_th: "เงียบและเก็บตัว ชอบอยู่คนเดียว",
        medical_history: "Vaccinated, Healthy.",
        is_vaccinated: true,
        is_neutered: true,
        weight: 5.2,
        image: {
          create: [
            { url: CAT_IMAGES[15] }
          ]
        }
      }
    }),

    prisma.pets.create({
      data: {
        name_en: "Socks",
        name_th: "ซ็อคส์",
        age: new Date("2021-03-12"),
        color: "White",
        gender: "MALE",
        type: "CAT",
        status: "AVAILABLE",
        breed_en: "Ragdoll",
        breed_th: "แร็กดอลล์",
        description_en: "Friendly and affectionate, loves to cuddle.",
        description_th: "ขี้เล่นและรักใคร่ ชอบอุ้ม",
        medical_history: "Vaccinated, Spayed.",
        is_vaccinated: true,
        is_neutered: false,
        weight: 4.3,
        image: {
          create: [
            { url: CAT_IMAGES[16] }
          ]
        }
      }
    }),

    prisma.pets.create({
      data: {
        name_en: "Misty",
        name_th: "มิสตี้",
        age: new Date("2021-07-30"),
        color: "Gray",
        gender: "FEMALE",
        type: "CAT",
        status: "AVAILABLE",
        breed_en: "Scottish Fold",
        breed_th: "สก็อตติช โฟลด์",
        description_en: "Sweet and calm, loves to nap.",
        description_th: "หวานและสงบ ชอบนอนหลับ",
        medical_history: "Vaccinated, Healthy.",
        is_vaccinated: true,
        is_neutered: true,
        weight: 3.8,
        image: {
          create: [
            { url: CAT_IMAGES[17] }
          ]
        }
      }
    }),

    prisma.pets.create({
      data: {
        name_en: "Max",
        name_th: "แม็กซ์",
        age: new Date("2020-10-19"),
        color: "Brown",
        gender: "MALE",
        type: "CAT",
        status: "AVAILABLE",
        breed_en: "Burmese",
        breed_th: "เบอร์มิส",
        description_en: "Affectionate and playful, loves attention.",
        description_th: "รักใคร่และขี้เล่น ชอบความสนใจ",
        medical_history: "Vaccinated, Healthy.",
        is_vaccinated: true,
        is_neutered: true,
        weight: 4.2,
        image: {
          create: [
            { url: CAT_IMAGES[18] }
          ]
        }
      }
    }),

    prisma.pets.create({
      data: {
        name_en: "Cleo",
        name_th: "คลีโอ",
        age: new Date("2021-04-11"),
        color: "Calico",
        gender: "FEMALE",
        type: "CAT",
        status: "AVAILABLE",
        breed_en: "Sphynx",
        breed_th: "สฟิงซ์",
        description_en: "Friendly and outgoing, loves to be the center of attention.",
        description_th: "ขี้เล่นและออกไปข้างนอก ชอบเป็นจุดสนใจ",
        medical_history: "Vaccinated, Spayed.",
        is_vaccinated: true,
        is_neutered: false,
        weight: 3.6,
        image: {
          create: [
            { url: CAT_IMAGES[19] }
          ]
        }
      }
    }),

    prisma.pets.create({
      data: {
        name_en: "Ginger",
        name_th: "จิงเจอร์",
        age: new Date("2021-06-12"),
        color: "Orange",
        gender: "MALE",
        type: "CAT",
        status: "AVAILABLE",
        breed_en: "Domestic Shorthair",
        breed_th: "โดเมสติก ชอร์ตแฮร์",
        description_en: "Curious and energetic, loves to explore.",
        description_th: "ขี้สงสัยและกระตือรือร้น ชอบสำรวจ",
        medical_history: "Vaccinated, Healthy.",
        is_vaccinated: true,
        is_neutered: true,
        weight: 4.1,
        image: {
          create: [
            { url: CAT_IMAGES[20] }
          ]
        }
      }
    }),

    prisma.pets.create({
      data: {
        name_en: "Leo",
        name_th: "ลีโอ",
        age: new Date("2020-12-25"),
        color: "Golden",
        gender: "MALE",
        type: "CAT",
        status: "AVAILABLE",
        breed_en: "Abyssinian",
        breed_th: "อับซิเนีย",
        description_en: "Playful and affectionate, loves to be pampered.",
        description_th: "ขี้เล่นและรักใคร่ ชอบการถูกอุ้ม",
        medical_history: "Vaccinated, Healthy.",
        is_vaccinated: true,
        is_neutered: true,
        weight: 4.5,
        image: {
          create: [
            { url: CAT_IMAGES[21] }
          ]
        }
      }
    }),

    prisma.pets.create({
      data: {
        name_en: "Nala",
        name_th: "นาล่า",
        age: new Date("2020-11-17"),
        color: "Brown",
        gender: "FEMALE",
        type: "CAT",
        status: "AVAILABLE",
        breed_en: "Maine Coon",
        breed_th: "เมนคูน",
        description_en: "Friendly and gentle, enjoys being around people.",
        description_th: "ขี้เล่นและอ่อนโยน ชอบอยู่ใกล้ผู้คน",
        medical_history: "Vaccinated, Healthy.",
        is_vaccinated: true,
        is_neutered: false,
        weight: 6.0,
        image: {
          create: [
            { url: CAT_IMAGES[22] }
          ]
        }
      }
    }),

    prisma.pets.create({
      data: {
        name_en: "Snowy",
        name_th: "สโนว์วี่",
        age: new Date("2021-08-09"),
        color: "White",
        gender: "FEMALE",
        type: "CAT",
        status: "AVAILABLE",
        breed_en: "Siberian",
        breed_th: "ไซบีเรียน",
        description_en: "Calm and loving, enjoys quiet time.",
        description_th: "สงบและรักใคร่ ชอบเวลานิ่งๆ",
        medical_history: "Vaccinated, Healthy.",
        is_vaccinated: true,
        is_neutered: true,
        weight: 5.0,
        image: {
          create: [
            { url: CAT_IMAGES[23] }
          ]
        }
      }
    }),

    prisma.pets.create({
      data: {
        name_en: "Toby",
        name_th: "โทบี้",
        age: new Date("2022-04-14"),
        color: "Gray",
        gender: "MALE",
        type: "CAT",
        status: "AVAILABLE",
        breed_en: "Russian Blue",
        breed_th: "รัสเซียนบลู",
        description_en: "Gentle and affectionate, loves to cuddle.",
        description_th: "อ่อนโยนและรักใคร่ ชอบอุ้ม",
        medical_history: "Vaccinated, Healthy.",
        is_vaccinated: true,
        is_neutered: false,
        weight: 4.2,
        image: {
          create: [
            { url: CAT_IMAGES[24] }
          ]
        }
      }
    }),
    prisma.pets.create({
      data: {
        name_en: "Oscar",
        name_th: "ออสการ์",
        age: new Date("2021-10-05"),
        color: "Gray",
        gender: "MALE",
        type: "CAT",
        status: "AVAILABLE",
        breed_en: "Persian",
        breed_th: "เปอร์เซีย",
        description_en: "Affectionate and friendly, loves cuddles.",
        description_th: "รักใคร่และเป็นมิตร ชอบการกอด",
        medical_history: "Vaccinated, Healthy.",
        is_vaccinated: true,
        is_neutered: true,
        weight: 4.0,
        image: {
          create: [
            { url: CAT_IMAGES[25] }
          ]
        }
      }
    }),

    prisma.pets.create({
      data: {
        name_en: "Buddy",
        name_th: "บัดดี้",
        age: new Date("2020-12-15"),
        color: "Black",
        gender: "MALE",
        type: "CAT",
        status: "AVAILABLE",
        breed_en: "Sphynx",
        breed_th: "สฟิงซ์",
        description_en: "Playful and active, loves to climb.",
        description_th: "ขี้เล่นและกระตือรือร้น ชอบปีน",
        medical_history: "Vaccinated, Healthy.",
        is_vaccinated: true,
        is_neutered: false,
        weight: 3.8,
        image: {
          create: [
            { url: CAT_IMAGES[26] }
          ]
        }
      }
    }),
    prisma.pets.create({
      data: {
        name_en: "Pumpkin",
        name_th: "ฟักทอง",
        age: new Date("2022-06-25"),
        color: "Orange",
        gender: "MALE",
        type: "CAT",
        status: "AVAILABLE",
        breed_en: "Bengal",
        breed_th: "เบงกอล",
        description_en: "Curious and playful, loves exploring new places.",
        description_th: "ขี้สงสัยและขี้เล่น ชอบสำรวจสถานที่ใหม่ๆ",
        medical_history: "Vaccinated, Healthy.",
        is_vaccinated: true,
        is_neutered: true,
        weight: 4.3,
        image: {
          create: [
            { url: CAT_IMAGES[27] }
          ]
        }
      }
    }),

    prisma.pets.create({
      data: {
        name_en: "Misty",
        name_th: "มิ๊สตี้",
        age: new Date("2021-02-18"),
        color: "Gray",
        gender: "FEMALE",
        type: "CAT",
        status: "AVAILABLE",
        breed_en: "Scottish Fold",
        breed_th: "สก็อตติชโฟลด์",
        description_en: "Calm and affectionate, enjoys lounging around.",
        description_th: "สงบและรักใคร่ ชอบนอนอาบแดด",
        medical_history: "Vaccinated, Healthy.",
        is_vaccinated: true,
        is_neutered: true,
        weight: 3.9,
        image: {
          create: [
            { url: CAT_IMAGES[28] }
          ]
        }
      }
    }),
    prisma.pets.create({
      data: {
        name_en: "Milo",
        name_th: "ไมโล",
        age: new Date("2020-11-01"),
        color: "Brown Tabby",
        gender: "MALE",
        type: "CAT",
        status: "AVAILABLE",
        breed_en: "Domestic Shorthair",
        breed_th: "โดเมสติก ชอร์ตแฮร์",
        description_en: "Playful and curious, loves to chase after toys.",
        description_th: "ขี้เล่นและขี้สงสัย ชอบวิ่งไล่ของเล่น",
        medical_history: "Vaccinated, Healthy.",
        is_vaccinated: true,
        is_neutered: true,
        weight: 4.4,
        image: {
          create: [
            { url: CAT_IMAGES[29] }
          ]
        }
      }
    })
  ]);

  // Creating 12 adoption applications
  const adopts = await Promise.all(
    Array(12)
      .fill()
      .map(async (_, i) => {
        return prisma.adopts.create({
          data: {
            userId: users[Math.floor(Math.random() * users.length)].id,
            petId: pets[Math.floor(Math.random() * pets.length)].id,
            status: ["PENDING", "ADOPTED", "FOSTERED"][
              Math.floor(Math.random() * 3)
            ],
            address: `${i + 1} Bangkok Street, District ${i + 1}`,
            career: ["Engineer", "Teacher", "Doctor", "Business Owner"][
              Math.floor(Math.random() * 4)
            ],
            workTime: "9:00-18:00",
            workPlace: `Company ${i + 1}`,
            dayOff: "Saturday-Sunday",
            salary: 30000 + Math.floor(Math.random() * 70000),
            dateOfBirth: new Date(
              1980 + Math.floor(Math.random() * 20),
              Math.floor(Math.random() * 12),
              1
            ),
            socialContact: `line: user${i + 1}`,
            currentPetCount: Math.floor(Math.random() * 3),
            currentPetDetails: "Previous experience with pets",
            familyMemberCount: 1 + Math.floor(Math.random() * 5),
            familyAlwaysHome: Math.random() > 0.5,
            aloneHours: Math.floor(Math.random() * 8),
            housingType: [
              "OWN_HOUSE",
              "RENTAL_HOUSE",
              "CONDO",
              "APARTMENT",
              "RENTAL_ROOM",
              "SINGLE_HOUSE",
            ][Math.floor(Math.random() * 6)],
            hasGarden: Math.random() > 0.5,
            hasFence: Math.random() > 0.5,
            canWalkDog: Math.random() > 0.2,
            deliveryType: Math.random() > 0.5 ? "PICK_UP" : "REQUIRE_DELIVERY",
            approved_at: Math.random() > 0.5 ? new Date() : null,
            approved_by: Math.random() > 0.5 ? users[0].id : null,
            why: "Adoption reason here",
            home_image_checked: Math.random() > 0.5,
            accommodationImages: {
              create: [
                { url: HOME_IMAGES[i % 10] },
                { url: HOME_IMAGES[(i + 1) % 10] },
              ],
            },
          },
        });
      })
  );

  const events = await Promise.all(
    Array(10)
      .fill()
      .map(async (_, i) => {
        return prisma.events.create({
          data: {
            title_en: `Pet Event ${i + 1}`,
            title_th: `งานสัตว์เลี้ยง ${i + 1}`,
            description_en: `Join us for our amazing pet event number ${i + 1}`,
            description_th: `ร่วมงานสัตว์เลี้ยงสุดพิเศษครั้งที่ ${i + 1}`,
            date_start: new Date(2024, i, 1, 10, 0),
            date_end: new Date(2024, i, 1, 18, 0),
            status: ["PENDING", "ACTIVE", "COMPLETED"][
              Math.floor(Math.random() * 3)
            ],
            location: `Venue ${i + 1}, Bangkok`,
            image: {
              create: [{ url: EVENT_IMAGES[i] }],
            },
            attendees: {
              create: users.slice(0, 3).map((user) => ({
                userId: user.id,
              })),
            },
          },
        });
      })
  );

  const volunteers = await Promise.all(
    users
      .filter((u) => u.role === "VOLUNTEER")
      .map(async (user, i) => {
        return prisma.volunteers.create({
          data: {
            userId: user.id,
            description_en: `Experienced volunteer ${i + 1}`,
            description_th: `อาสาสมัครที่มีประสบการณ์ ${i + 1}`,
            skills: {
              create: [
                { name: "Pet Care" },
                { name: "Dog Training" },
                { name: "Cat Handling" },
              ],
            },
            availability: {
              create: [
                { timeSlot: "Monday Morning" },
                { timeSlot: "Wednesday Evening" },
                { timeSlot: "Saturday Afternoon" },
              ],
            },
          },
        });
      })
  );

  const donations = await Promise.all(
    Array(15)
      .fill()
      .map(async (_, i) => {
        return prisma.donates.create({
          data: {
            userId: users[Math.floor(Math.random() * users.length)].id,
            total: 500 + Math.floor(Math.random() * 10000),
            payment_method: ["CREDIT", "PROMPTPAY"][
              Math.floor(Math.random() * 2)
            ],
            transaction_id: `TRX${Date.now()}${i}`,
            is_recurring: Math.random() > 0.7,
            receipt_url: `https://example.com/receipt${i + 1}.pdf`,
            status: ["DONE", "PENDING", "CANCEL"][
              Math.floor(Math.random() * 3)
            ],
          },
        });
      })
  );

  const homeImages = await Promise.all(
    Array(10)
      .fill()
      .map(async (_, i) => {
        return prisma.homeImages.create({
          data: {
            adoptId: adopts[Math.floor(Math.random() * adopts.length)].id,
            url: HOME_IMAGES[i],
          },
        });
      })
  );
  // Add donation goals
  const donationGoals = await prisma.donationGoals.create({
    data: {
      year: 2024,
      targetAmount: 1000000,
      targetPets: 100,
      petsHelped: 45,
    },
  });

  // Add home content sections
  const homeContent = await prisma.homeContent.create({
    data: {
      image1: "/src/assets/dog.png",
      image2: DOG_IMAGES[0],
      image3: DOG_IMAGES[1],
      image4: DOG_IMAGES[2],
      content_en:
        "ADOPT ME,| PLEASE|" + // Hero section
        "FRIENDLY PAWS|" +
        "WELCOME TO OUR CLUB!|" + // Welcome section
        "Join our community of pet lovers and discover everything you need to know about pet care, health, and happiness.|" +
        "CARE ADVICE|Expert tips for keeping your pets healthy and happy|" + // Features section
        "VETERINARY HELP|Professional medical care when you need it most|" +
        "OUR TIPS|Daily guidance for better pet parenting|" +
        "Adoption Process|Learn about our simple and rewarding adoption process.|" + // Process section
        "Make a Difference Today|Your donation helps us provide food, shelter, and medical care to animals in need. Every contribution, no matter how small, can change a life.|" + // Donation section
        "VIEW MORE|DONATE NOW", // Action buttons
      content_th:
        "โปรด รักฉัน| ดูแลฉันหน่อยนะ|" + // Hero section
        "FRIENDLY PAWS|" +
        "ยินดีต้อนรับสู่คลับของเรา!|" + // Welcome section
        "เข้าร่วมชุมชนของคนรักสัตว์และค้นพบทุกสิ่งที่คุณต้องรู้เกี่ยวกับการดูแลสัตว์เลี้ยง สุขภาพ และความสุขของพวกเขา|" +
        "คำแนะนำการดูแล|คำแนะนำจากผู้เชี่ยวชาญเพื่อให้สัตว์เลี้ยงของคุณมีสุขภาพดีและมีความสุข|" + // Features section
        "ความช่วยเหลือจากสัตวแพทย์|การดูแลทางการแพทย์เมื่อคุณต้องการมากที่สุด|" +
        "เคล็ดลับของเรา|คำแนะนำประจำวันสำหรับการเลี้ยงสัตว์ที่ดียิ่งขึ้น|" +
        "กระบวนการรับเลี้ยง|เรียนรู้เกี่ยวกับกระบวนการรับเลี้ยงที่ง่ายและให้ผลตอบแทนของเรา|" + // Process section
        "สร้างความเปลี่ยนแปลงวันนี้|การบริจาคของคุณช่วยให้เราจัดหาอาหาร ที่พัก และการดูแลทางการแพทย์ให้กับสัตว์ที่ต้องการความช่วยเหลือ ทุกการสนับสนุน ไม่ว่าจะเล็กหรือใหญ่ สามารถเปลี่ยนชีวิตได้|" + // Donation section
        "ดูเพิ่มเติม|บริจาคเลย", // Action buttons
    },
  });

  const aboutContent = await prisma.aboutContent.create({
    data: {
      // Header content
      header_en: "... This is a charitable organization ... 🐶",
      header_th: "... พวกเราคือองค์กรการกุศล ... 🐶",

      description_en:
        "Since its founding in 2008, Friendly Paws has saved over 70,000 dogs! Our mission is to save 10,000 dogs per year, rehabilitate and find them warm homes, and educate people about proper dog care and the importance of spaying and neutering.",
      description_th:
        "นับตั้งแต่ก่อตั้งขึ้นในปี 2008 Friendly Paws ได้ช่วยชีวิตสุนัขกว่า 70,000 ตัว! ภารกิจของเราคือการช่วยชีวิตสุนัขให้ได้ 10,000 ตัวต่อปี รักษาและหาบ้านที่อบอุ่นให้กับพวกเขา รวมถึงให้ความรู้แก่ผู้คนเกี่ยวกับการดูแลสุนัขอย่างถูกต้องและความสำคัญของการทำหมันสุนัข",

      // Help section content
      help_title_en: "How Can We Help:",
      help_title_th: "พวกเราสามารถช่วยอะไรได้บ้าง:",

      help_content_en:
        "We rely on donations and support to help sick, abandoned, and abused dogs in our care. Every dog we rescue receives treatment, vaccinations, and spaying. We also rehabilitate, socialize, and work to find new homes for our dogs. But we can't do it alone.",
      help_content_th:
        "เราพึ่งพาการบริจาคและการสนับสนุนเพื่อช่วยเหลือสุนัขที่ป่วย ถูกทอดทิ้ง และถูกทารุณกรรมในความดูแลของเรา สุนัขทุกตัวที่เราช่วยเหลือได้รับการรักษา ฉีดวัคซีน และทำหมันแล้ว เรายังฟื้นฟู ฝึกสังคม และพยายามหาบ้านใหม่ให้กับสุนัขของเรา แต่เราทำคนเดียวไม่ได้",

      // Additional content that can be split using the '|' delimiter
      content_en: "Our Mission",
      content_th: "เป้าหมายของพวกเรา",

      // Additional content that can be split using the '|' delimiter
      content_detail_en : `
At Friendly Paws, our mission is to create a world where every dog and cat can experience love, safety, and dignity. We are dedicated to rescuing, rehabilitating, and rehoming abandoned, neglected, and homeless animals, while raising awareness about the importance of responsible pet ownership and animal welfare.

Through a network of compassionate volunteers and foster homes, we provide a safe haven for animals in need, ensuring they receive the medical care, nutrition, and affection they deserve. Friendly Paws believes that each animal has the right to a fulfilling life, and we work tirelessly to find loving forever homes where they can thrive.

Our goal extends beyond rescue. We strive to educate our community on animal welfare issues, promote spaying and neutering, and advocate for policies that protect animals from harm. By building a community of animal lovers, we aim to inspire compassion and change lives—both human and animal alike.

Together, we can create a brighter, kinder future for our four-legged friends.
`,

      content_detail_th : `
ที่ Friendly Paws ภารกิจของเราคือการสร้างโลกที่สุนัขและแมวทุกตัวสามารถสัมผัสถึงความรัก ความปลอดภัย และศักดิ์ศรี เราทุ่มเทเพื่อช่วยเหลือ ฟื้นฟู และหาบ้านใหม่ให้กับสัตว์ที่ถูกทอดทิ้ง ถูกละเลย และไร้บ้าน พร้อมทั้งสร้างความตระหนักรู้ถึงความสำคัญของการเป็นเจ้าของสัตว์อย่างมีความรับผิดชอบและสวัสดิภาพสัตว์

ผ่านเครือข่ายอาสาสมัครและบ้านอุปถัมภ์ที่มีความเมตตา เราจัดหาที่พักพิงที่ปลอดภัยให้กับสัตว์ที่ต้องการความช่วยเหลือ เพื่อให้พวกเขาได้รับการดูแลรักษาทางการแพทย์ โภชนาการ และความรักที่พวกเขาคู่ควร Friendly Paws เชื่อว่าสัตว์ทุกตัวมีสิทธิ์ในชีวิตที่สมบูรณ์ และเราทำงานอย่างไม่รู้จักเหน็ดเหนื่อยเพื่อหาบ้านที่รักและถาวรซึ่งพวกเขาสามารถเจริญเติบโตได้

เป้าหมายของเราไม่ใช่แค่การช่วยเหลือ แต่ยังรวมถึงการให้ความรู้แก่ชุมชนเกี่ยวกับสวัสดิภาพสัตว์ ส่งเสริมการทำหมันสัตว์ และสนับสนุนกฎระเบียบที่คุ้มครองสัตว์จากอันตราย โดยการสร้างชุมชนของคนรักสัตว์ เรามุ่งหวังที่จะสร้างแรงบันดาลใจในการมีเมตตาและเปลี่ยนแปลงชีวิตทั้งของมนุษย์และสัตว์

ร่วมกัน เราสามารถสร้างอนาคตที่สดใสและเมตตากรุณามากขึ้นให้กับเพื่อนสี่ขาของเรา
`,

      video_url: "https://www.youtube.com/watch?v=JnCYfcF19fI",
      image1:
        "https://cdn.pixabay.com/photo/2021/01/30/15/15/dog-5964181_1280.jpg",
      image2:
        "https://cdn.pixabay.com/photo/2024/07/31/06/12/stray-8933778_1280.png",
      image3:
        "https://cdn.pixabay.com/photo/2023/03/14/14/57/cat-box-7852492_1280.jpg",
      image4:
        "https://cdn.pixabay.com/photo/2020/11/17/18/20/dog-5753302_1280.jpg",
    },
  });

  const donationContent = await prisma.donationContent.create({
    data: {
      title_en: "Make a Difference Today",
      title_th: "ร่วมสร้างความเปลี่ยนแปลงวันนี้",
      description_en:
        "Join us in making a difference in the lives of animals in need. Your support helps provide food, shelter, and medical care.",
      description_th:
        "ร่วมเป็นส่วนหนึ่งในการช่วยเหลือสัตว์ที่ต้องการความช่วยเหลือ การสนับสนุนของคุณช่วยจัดหาที่พัก อาหาร และการรักษาพยาบาล",
      typing_en:
        "Your compassion could be a game changer|Every donation makes a difference|Help us give them a better life.",
      typing_th:
        "ความเมตตาของคุณสามารถเปลี่ยนชีวิตได้|การบริจาคทุกครั้งมีความหมาย|ช่วยเรามอบชีวิตใหม่ให้พวกเขา",
      form_title_en: "Make a Donation",
      form_title_th: "บริจาค",
      form_desc_en: "Support our furry friends in need",
      form_desc_th: "สนับสนุนเพื่อนขนฟูของเราที่ต้องการความช่วยเหลือ",
      donation_options: JSON.stringify([
        {
          amount: 200,
          benefit_en: "Provides food for 2 pets for a week",
          benefit_th: "จัดหาอาหารสำหรับสัตว์เลี้ยง 2 ตัวเป็นเวลา 1 สัปดาห์",
          icon: "🐱",
        },
        {
          amount: 500,
          benefit_en: "Covers basic veterinary check-up for 1 pet",
          benefit_th: "ครอบคลุมการตรวจสุขภาพพื้นฐานสำหรับสัตว์เลี้ยง 1 ตัว",
          icon: "💉",
        },
        {
          amount: 1000,
          benefit_en: "Supports vaccination and medicine for 2 pets",
          benefit_th: "สนับสนุนการฉีดวัคซีนและยาสำหรับสัตว์เลี้ยง 2 ตัว",
          icon: "🏥",
        },
      ]),
      custom_amount_en: "Custom Amount (THB)",
      custom_amount_th: "จำนวนเงินที่กำหนดเอง (บาท)",
      impact_message_en: "Your Impact:",
      impact_message_th: "สิ่งที่น้องจะได้รับจากคุณ:",
      donate_button_en: "Donate",
      donate_button_th: "บริจาค",
      close_button_en: "Close",
      close_button_th: "ปิด",
    },
  });

  const eventBanner = await prisma.eventBanner.create({
    data: {
      image1: BANNER_IMAGES[0],
      image2: BANNER_IMAGES[1],
      image3: BANNER_IMAGES[2],
    },
  });

  const contactInfo = await prisma.contactInfo.create({
    data: {
      // Header and main content
      header_en: "Get in Touch with Friendly Paws",
      header_th: "ติดต่อ Friendly Paws",

      content_en:
        "We're here to help and answer any questions you might have|Feel free to reach out to us anytime|Your feedback helps us improve our services",
      content_th:
        "เราพร้อมช่วยเหลือและตอบคำถามทุกข้อสงสัย|สามารถติดต่อเราได้ตลอดเวลา|ความคิดเห็นของคุณช่วยให้เราพัฒนาบริการให้ดียิ่งขึ้น",

      // Contact details
      generalInfo_en: "Animal Shelter and Adoption Center",
      generalInfo_th: "ศูนย์พักพิงและรับเลี้ยงสัตว์",

      email: "contact@friendlypaws.org",
      phone: "+66 2 123 4567",

      openingTimes_en: "Monday - Sunday: 9:00 AM - 6:00 PM",
      openingTimes_th: "จันทร์ - อาทิตย์: 9:00 น. - 18:00 น.",

      address_en: "123 Pet Street, Animal District, Bangkok 10XXX",
      address_th: "123 ถนนเพ็ท เขตแอนิมอล กรุงเทพฯ 10XXX",

      // Map coordinates

      latitude: "13.7583265",
      longitude: "100.5349709",
    },
  });

 
}
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log("Seed data created successfully!");
  });

