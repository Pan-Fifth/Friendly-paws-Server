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
];

async function main() {
    await prisma.$transaction([
        prisma.tableContact.deleteMany(),
        prisma.eventBanner.deleteMany(),
        prisma.aboutContent.deleteMany(),
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
    ])
    

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
          },
        });
      })
  );

  // Creating 20 pets (10 dogs, 10 cats)
  const pets = await Promise.all(
    Array(20)
      .fill()
      .map(async (_, i) => {
        const isDog = i < 10;
        return prisma.pets.create({
          data: {
            name_en: isDog ? `Dog${i + 1}` : `Cat${i - 9}`,
            name_th: isDog ? `สุนัข${i + 1}` : `แมว${i - 9}`,
            age: new Date(2020 + Math.floor(Math.random() * 3), Math.floor(Math.random() * 12), 1),
            color: ["Brown", "Black", "White", "Golden", "Grey"][Math.floor(Math.random() * 5)],
            gender: Math.random() > 0.5 ? "MALE" : "FEMALE",
            type: isDog ? "DOG" : "CAT",
            breed_en: isDog ? "Golden Retriever" : "Persian",
            breed_th: isDog ? "โกลเด้น รีทรีฟเวอร์" : "เปอร์เซีย",
            description_en: `Lovely ${isDog ? "dog" : "cat"} looking for a forever home`,
            description_th: `${isDog ? "สุนัข" : "แมว"}น่ารักกำลังมองหาบ้าน`,
            is_vaccinated: Math.random() > 0.3,
            is_neutered: Math.random() > 0.3,
            weight: 10 + Math.random() * 20,
            image: {
              create: [
                { url: isDog ? DOG_IMAGES[i] : CAT_IMAGES[i - 10] },
                { url: isDog ? DOG_IMAGES[(i + 1) % 10] : CAT_IMAGES[(i - 9) % 10] },
              ],
            },
          },
        });
      })
  );

  // Creating 12 adoption applications
  const adoptions = await Promise.all(
    Array(12)
      .fill()
      .map(async (_, i) => {
        return prisma.adopts.create({
          data: {
            userId: users[Math.floor(Math.random() * users.length)].id,
            petId: pets[Math.floor(Math.random() * pets.length)].id,
            status: ["PENDING", "ADOPTED", "FOSTERED"][Math.floor(Math.random() * 3)],
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
            accommodationImages: {
              create: [{ url: HOME_IMAGES[i % 10] }, { url: HOME_IMAGES[(i + 1) % 10] }],
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
            status: ["PENDING", "ACTIVE", "COMPLETED"][Math.floor(Math.random() * 3)],
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
              create: [{ name: "Pet Care" }, { name: "Dog Training" }, { name: "Cat Handling" }],
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
            payment_method: ["CREDIT", "PROMPTPAY"][Math.floor(Math.random() * 2)],
            transaction_id: `TRX${Date.now()}${i}`,
            is_recurring: Math.random() > 0.7,
            receipt_url: `https://example.com/receipt${i + 1}.pdf`,
            status: ["DONE", "PENDING", "CANCEL"][Math.floor(Math.random() * 3)],
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
        image2: "https://res.cloudinary.com/petrescue/image/upload/b_auto:predominant,c_pad,f_auto,h_648,w_648/x9vv6s9se8byqdikbza0.jpg",
        image3: "https://res.cloudinary.com/petrescue/image/upload/b_auto:predominant,c_pad,f_auto,h_648,w_648/x9vv6s9se8byqdikbza0.jpg",
        content_en: "WELCOME TO OUR CLUB!|Join our community of pet lovers and discover everything you need to know about pet care, health, and happiness.|Care Advice|Expert guidance for pet parents|Veterinary Help|Professional health support|Our Tips|Daily care best practices",
        content_th: "ยินดีต้อนรับสู่ชมรมของเรา!|เข้าร่วมชุมชนคนรักสัตว์เลี้ยงและค้นพบทุกสิ่งที่คุณต้องรู้เกี่ยวกับการดูแล สุขภาพ และความสุขของสัตว์เลี้ยง|คำแนะนำการดูแล|คำแนะนำจากผู้เชี่ยวชาญสำหรับผู้เลี้ยงสัตว์|ความช่วยเหลือด้านสัตวแพทย์|การสนับสนุนด้านสุขภาพจากมืออาชีพ|เคล็ดลับของเรา|แนวทางปฏิบัติที่ดีที่สุดในการดูแลประจำวัน"
    }
});


  // Add about content sections
  const aboutContent = await prisma.aboutContent.create({
    data: {
      image:
        "https://res.cloudinary.com/petrescue/image/upload/b_auto:predominant,c_pad,f_auto,h_648,w_648/x9vv6s9se8byqdikbza0.jpg",
      main_content_en: "Welcome to Friendly Paws",
      main_content_th: "ยินดีต้อนรับสู่ Friendly Paws",
      img_content_en: "Care Advice | Veterinary Help | Our Tips",
      img_content_th: "คำแนะนำการดูแล | ความช่วยเหลือด้านสัตวแพทย์ | เคล็ดลับของเรา",
    },
  });

  // Add event banner
  const eventBanner = await prisma.eventBanner.create({
    data: {
      image: "https://images.unsplash.com/photo-1539541417736-3d44c90da315",
    },
  });

  // Add table contact information
  const tableContact = await prisma.tableContact.create({
    data: {
      email: "contact@friendlypaws.com",
      phone: "+66 2 123 4567",
      address: "123 Pet Street, Bangkok 10110",
      hours: "Mon-Fri: 9:00-18:00, Sat-Sun: 10:00-16:00",
    },
  });

  console.log("Seed data created successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
