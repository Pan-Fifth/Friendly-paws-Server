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
            status: ["AVAILABLE", "PENDING", "ADOPTED", "FOSTERED", "UNAVAILABLE"][
              Math.floor(Math.random() * 5)
            ],
            breed_en: isDog ? "Golden Retriever" : "Persian",
            breed_th: isDog ? "โกลเด้น รีทรีฟเวอร์" : "เปอร์เซีย",
            description_en: `Lovely ${isDog ? "dog" : "cat"} looking for a forever home`,
            description_th: `${isDog ? "สุนัข" : "แมว"}น่ารักกำลังมองหาบ้าน`,
            medical_history: "Healthy and vaccinated",
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
  const adopts = await Promise.all(
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
            approved_at: Math.random() > 0.5 ? new Date() : null,
            approved_by: Math.random() > 0.5 ? users[0].id : null,
            why: "Adoption reason here",
            home_image_checked: Math.random() > 0.5,
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
      header_en: "... is a charitable organization ... 🐶",
      header_th: "... คือองค์กรการกุศล ... 🐶",
      
      description_en: "Since its founding in 2008, Big Dog Ranch Rescue has saved over 70,000 dogs! Our mission is to save 10,000 dogs per year, rehabilitate and find them warm homes, and educate people about proper dog care and the importance of spaying and neutering.",
      description_th: "นับตั้งแต่ก่อตั้งขึ้นในปี 2008 Big Dog Ranch Rescue ได้ช่วยชีวิตสุนัขกว่า 70,000 ตัว! ภารกิจของเราคือการช่วยชีวิตสุนัขให้ได้ 10,000 ตัวต่อปี รักษาและหาบ้านที่อบอุ่นให้กับพวกเขา รวมถึงให้ความรู้แก่ผู้คนเกี่ยวกับการดูแลสุนัขอย่างถูกต้องและความสำคัญของการทำหมันสุนัข",
  
      // Help section content
      help_title_en: "How You Can Help:",
      help_title_th: "คุณสามารถช่วยได้อย่างไร:",
  
      help_content_en: "We rely on donations and support to help sick, abandoned, and abused dogs in our care. Every dog we rescue receives treatment, vaccinations, and spaying. We also rehabilitate, socialize, and work to find new homes for our dogs. But we can't do it alone.",
      help_content_th: "เราพึ่งพาการบริจาคและการสนับสนุนเพื่อช่วยเหลือสุนัขที่ป่วย ถูกทอดทิ้ง และถูกทารุณกรรมในความดูแลของเรา สุนัขทุกตัวที่เราช่วยเหลือได้รับการรักษา ฉีดวัคซีน และทำหมันแล้ว เรายังฟื้นฟู ฝึกสังคม และพยายามหาบ้านใหม่ให้กับสุนัขของเรา แต่เราทำคนเดียวไม่ได้",
  
      // Additional content that can be split using the '|' delimiter
      content_en: "Mission Statement|Vision|Values|Our Impact",
      content_th: "พันธกิจ|วิสัยทัศน์|ค่านิยม|ผลกระทบของเรา",

      video_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      image1 : "https://cdn.pixabay.com/photo/2021/01/30/15/15/dog-5964181_1280.jpg",
      image2 : "https://cdn.pixabay.com/photo/2024/07/31/06/12/stray-8933778_1280.png",
      image3 : "https://cdn.pixabay.com/photo/2023/03/14/14/57/cat-box-7852492_1280.jpg",
      image4 : "https://cdn.pixabay.com/photo/2020/11/17/18/20/dog-5753302_1280.jpg",
    }
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
          benefit: "Provides food for 2 pets for a week",
          icon: "🐱",
        },
        {
          amount: 500,
          benefit: "Covers basic veterinary check-up for 1 pet",
          icon: "💉",
        },
        {
          amount: 1000,
          benefit: "Supports vaccination and medicine for 2 pets",
          icon: "🏥",
        },
      ]),
      custom_amount_en: "Custom Amount (THB)",
      custom_amount_th: "จำนวนเงินที่กำหนดเอง (บาท)",
      impact_message_en: "Your Impact:",
      impact_message_th: "ผลกระทบของคุณ:",
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
      
      content_en: "We're here to help and answer any questions you might have|Feel free to reach out to us anytime|Your feedback helps us improve our services",
      content_th: "เราพร้อมช่วยเหลือและตอบคำถามทุกข้อสงสัย|สามารถติดต่อเราได้ตลอดเวลา|ความคิดเห็นของคุณช่วยให้เราพัฒนาบริการให้ดียิ่งขึ้น",
  
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
      longitude: "100.5349709"
    }
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
