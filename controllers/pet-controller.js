const { date } = require('joi')
const prisma = require('../configs/prisma')
const createError = require('../utils/createError')
const cloudinary = require('../configs/cloudinary')
const path = require('path')
const fs = require('fs/promises')
const nodemailer = require("nodemailer")


exports.aPets = async (req, res, next) => {
  try {
    console.log("query", req.query)
    const { gender, age, weight } = req.query
    const { count, page } = req.params

    let ageFilter = {};
    const now = new Date();
    const daysInMs = 24 * 60 * 60 * 1000;

    if (age) {
      switch (age) {
        case 'KID':
          ageFilter.age = {
            gte: new Date(now - (190 * daysInMs)),
            // lt: new Date(now )
          }
          break;
        case 'JUNIOR':
          ageFilter.age = {
            gte: new Date(now - (730 * daysInMs)),
            lt: new Date(now - (190 * daysInMs))
          };
          break;
        case 'SENIOR':
          ageFilter.age = {
            gte: new Date(now - (2557 * daysInMs)),
            lt: new Date(now - (730 * daysInMs))
          };
          break;
        case 'ADULT':
          ageFilter.age = { lt: new Date(now - (2557 * daysInMs)) };
          break;
      }
    }
    const allAvaiPets = await prisma.pets.findMany({
      where: {
        status: "AVAILABLE",
        gender,
        ...ageFilter,
        weight
      },
      take: parseInt(count),
      orderBy: { created_at: "desc" },
      skip: ((+page) - 1) * count,
      select: {
        id: true,
        name_en: true,
        name_th: true,
        age: true,
        breed_th: true,
        breed_en: true,
        gender: true,
        weight: true,
        image: {
          select: {
            url: true
          }
        }
      },
    })

    allAvaiPets.map((petInfo) => {
      console.log(petInfo)
      const birthDay = petInfo.age
      const age = (new Date() - birthDay) / 86400000
      petInfo.birthDay = birthDay
      petInfo.age = age
    })

    console.log("getApets")
    res.json(allAvaiPets)
    // res.json(count)
  } catch (err) {
    next(err)
  }
}



exports.pet = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return createError(400, "pet id not provided");
    }

    const petInfo = await prisma.pets.findFirst({
      where: {
        id: Number(id),
        deleted_at: null,
      },
      select: {
        id: true,
        age: true,
        color: true,
        gender: true,
        type: true,
        breed_en: true,
        breed_th: true,
        name_en: true,
        name_th: true,
        description_en: true,
        description_th: true,
        medical_history: true,
        is_vaccinated: true,
        is_neutered: true,
        weight: true,
        image: {
          select: {
            url: true,
          },
        },
      },
    });

    if (!petInfo) {
      return createError(400, "This pet not found");
    }

    const birthDay = petInfo.age;
    const age = (new Date() - birthDay) / 86400000;
    petInfo.birthDay = birthDay;
    petInfo.age = age;

    res.json(petInfo);
  } catch (err) {
    next(err);
  }
};

exports.allPets = async (req, res, next) => {
  try {
    const user = req.user
    const { page } = req.params
    if (user.role !== "ADMIN") {
      return createError(400, "Unauthorized")
    }
    const getAllpets = await prisma.pets.findMany({
      orderBy: { id: "asc" },
      take: 10,
      skip: ((+page) - 1) * 10,
      include: {
        image: true
      }

    })

    res.json(getAllpets)

  } catch (err) {
    next(err)
  }
}


exports.createPets = async (req, res, next) => {
  try {
    const {
      name_en,
      name_th,
      age,
      color,
      gender,
      type,
      breed_en,
      breed_th,
      description_en,
      description_th,
      medical_history,
      is_vaccinated,
      is_neutered,
      weight,
    } = req.body;

    console.log(req.files)

    if (req.user.role !== "ADMIN") {
      return createError(400, "Unauthorized")
    }


    const isVaccinated = is_vaccinated === "true";
    const isNeutered = is_neutered === "true";

    if (!name_en || !name_th || !age || !color || !gender || !type) {
      return res.status(400).json({ message: 'Missing required fields.' });
    }

    const newPet = await prisma.pets.create({
      data: {
        name_en,
        name_th,
        age: new Date(age),
        color,
        gender,
        type,
        breed_en,
        breed_th,
        description_en,
        description_th,
        medical_history,
        is_vaccinated: isVaccinated,
        is_neutered: isNeutered,
        weight: parseFloat(weight),
        status: "AVAILABLE",
      }
    });

    const havefile = !!req.files;
    let arrayUrl = []
    console.log(havefile, "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFf")
    if (havefile) {
      console.log(req.files)
      for (let file of req.files) {
        console.log("file", file)
        const promiseUrl = await cloudinary.uploader.upload(file.path)
        arrayUrl.push(promiseUrl)
      }
    }

    const imageArray = await Promise.all(arrayUrl)
    const result = await prisma.petImages.createMany({
      data: imageArray.map((el) => {
        console.log("Element", el)
        return ({
          petId: newPet.id,
          url: el.secure_url
        })
      })
    })

    console.log("Image object --------------------------------------", result)

    res.json({ message: "Pet created", newPet, result });
  } catch (err) {
    console.log("Error creating pet:", err);
    next(err);
  } finally {
    const deleteFile = req.files.map((file) => {
      fs.unlink(file.path);
    });
    await Promise.all(deleteFile);
  }
};

exports.updatePets = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      name_en,
      name_th,
      age,
      color,
      gender,
      type,
      breed_en,
      breed_th,
      description_en,
      description_th,
      medical_history,
      is_vaccinated,
      is_neutered,
      weight,
      status,
      deleteImage,
      deleteImageId,
    } = req.body;
    console.log("delete img", deleteImageId);
    const arrDeleteImage = deleteImage.split(",");
    const arrDeleteImageId = deleteImageId.includes(",") ? split(deleteImageId, ",") : [deleteImageId];

    arrDeleteImage.map(async (el) => {
      if (el.includes("cloudinary")) {
        console.log("delete", el)
        await cloudinary.uploader.destroy(el.match(/\/v\d+\/(.+)\.[a-z]+$/)[1]);

      }
    });
    arrDeleteImageId.map(async (el) => {
      try {
        console.log("delete", el)
        const image = await prisma.petImages.findUnique({
          where: {
            id: +el
          }
        });

        if (image) {
          await prisma.petImages.delete({
            where: {
              id: +el,
            },
          });
        }
      } catch (error) {
        console.log(`Failed to delete image with id ${el}:`, error);
      }
    })

    const havefile = !!req.files;
    let arrayUrl = []
    console.log(havefile, "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFf")
    if (havefile) {
      console.log(req.files)
      for (let file of req.files) {
        console.log("file", file)
        const promiseUrl = await cloudinary.uploader.upload(file.path)
        arrayUrl.push(promiseUrl)
        fs.unlink(file.path);
      }
    }

    const imageArray = await Promise.all(arrayUrl)
    const result = await prisma.petImages.createMany({
      data: imageArray.map((el) => {
        console.log("Element", el)
        return ({
          petId: +id,
          url: el.secure_url
        })
      })
    })

    const isVaccinated = is_vaccinated === "true";
    const isNeutered = is_neutered === "true";

    const petsData = await prisma.pets.findUnique({
      where: {
        id: +id,
      },
    });

    const updatedPet = await prisma.pets.update({
      where: {
        id: +id,
      },
      data: {
        name_en: name_en || petsData.name_en,
        name_th: name_th || petsData.name_th,
        age: age ? new Date(age) : petsData.age,
        color: color || petsData.color,
        gender: gender || petsData.gender,
        type: type || petsData.type,
        breed_en: breed_en || petsData.breed_en,
        breed_th: breed_th || petsData.breed_th,
        description_en: description_en || petsData.description_en,
        description_th: description_th || petsData.description_th,
        medical_history: medical_history || petsData.medical_history,
        is_vaccinated: isVaccinated,
        is_neutered: isNeutered,
        weight: weight ? parseFloat(weight) : petsData.weight,
        status: status || petsData.status,
      },
    });

    res.json({
      message: 'Pet updated',
      updatedPet,
    });


  } catch (err) {
    console.log('Error creating pet:', err);
    next(err)
  }
}


exports.deletePets = async (req, res, next) => {
  try {
    const { id } = req.params
    const petsData = await prisma.pets.findUnique({
      where: {
        id: +id
      }
    })
    if (!petsData) {
      return createError(400, "Pet not found")
    }
    const deletePets = await prisma.pets.delete({
      where: {
        id: +id
      }
    })
    res.json({ message: 'Pet deleted successfully', deletePets })

  } catch (err) {
    next(err)
  }

}

exports.createAdoptRequest = async (req, res, next) => {
  try {
    console.log("new", req.body)
    const {
      userId,
      petId,
      firstname,
      lastname,
      phone,
      address,
      career,
      workTime,
      workPlace,
      dayOff,
      salary,
      dateOfBirth,
      socialContact,
      currentPetCount,
      currentPetDetails,
      familyMemberCount,
      familyAlwaysHome,
      aloneHours,
      housingType,
      hasGarden,
      hasFence,
      canWalkDog,
      deliveryType,
      why,
    } = req.input;

    const hasAdopt = await prisma.adopts.findFirst({
      where: {
        userId: +userId,
        petId: +petId,
      },
    });

    if (hasAdopt) {
      return createError(400, "This pet you already has a request");
    }

    const user = await prisma.users.findFirst({
      where: {
        id: userId,
      },
    });

    const pet = await prisma.pets.findFirst({
      where: {
        id: +petId,
      },
      include: {
        image: true

      }
    });

    if (!user) {
      return createError(400, "This user not found");
    }

    const updateUser = await prisma.users.update({
      where: {
        id: userId,
      },
      data: {
        firstname,
        lastname,
        phone,

      },
    });

    const data = {
      userId,
      petId,
      address,
      career,
      workTime,
      workPlace,
      dayOff,
      salary,
      dateOfBirth,
      socialContact,
      currentPetCount,
      currentPetDetails,
      familyMemberCount,
      familyAlwaysHome,
      aloneHours,
      housingType,
      hasGarden,
      hasFence,
      canWalkDog,
      deliveryType,
      why,
    };

    const createAdoptRequest = await prisma.adopts.create({
      data: data,
    });

    if (req.files.length < 1) {
      return createError(400, "no file given")
    }
    const imagePromiseArray = []
    for (let file of req.files) {
      const promiseUrl = cloudinary.uploader.upload(file.path)
      imagePromiseArray.push(promiseUrl)
    }

    const imageArray = await Promise.all(imagePromiseArray);
    const homePics = await prisma.homeImages.createMany({
      data: imageArray.map((el) => ({
        adoptId: createAdoptRequest.id,
        url: el.secure_url,
      })),
    });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_ADMIN,
        pass: process.env.EMAIL_PASS
      }
    })

    await transporter.sendMail({
      to: updateUser.email,
      subject: "Adoption Request has been received to Friendly Paws",
      html: `
      <div>
      <img src="https://res.cloudinary.com/dqlfh6fxi/image/upload/v1731583303/v6myb7blzmbxqmf6fg2a.png" style="max-width: 200px;" alt="logo"/>
      <p><strong>Adopt Request Personal Details</strong></p>

<p><strong>Name:</strong> ${firstname} <span><strong>LastName:</strong> ${lastname}</span></p>
<p><strong>Career:</strong> ${career}</p>
<p><strong>Work Time:</strong> ${workTime} hours/day</p>
<p><strong>Day Off:</strong> ${dayOff} days/week</p>
<p><strong>Salary:</strong> ${salary} per month</p>
<p><strong>Date of Birth:</strong> ${dateOfBirth}</p>
<p><strong>Current Pet Count:</strong> ${currentPetCount}</p>
<p><strong>Family Member Count:</strong> ${familyMemberCount}</p>
<p><strong>Does family always stay home:</strong> ${familyAlwaysHome}</p>
<p><strong>Housing Type:</strong> ${housingType}</p>
<p><strong>Has a garden:</strong> ${hasGarden}</p>
<p><strong>Has a fence:</strong> ${hasFence}</p>
<p><strong>Can walk dog:</strong> ${canWalkDog}</p>
<p><strong>Reason for wanting to adopt a pet:</strong> ${why}</p>

<br/>

<p><strong>Adopt Request Pet Details</strong></p>
<p><strong>Pet's name:</strong> ${pet.name_en}</p>
<p><strong>Pet's Breed:</strong> ${pet.breed_en}</p>
<p><strong>Pet's Gender:</strong> ${pet.gender}</p>
<p><strong>Pet's Weight:</strong> ${pet.weight}</p>

<p><strong>Please keep in touch, our agent will contact you soon...</strong></p>

      </div>
      `,
      attachments: pet.image.map((img, index) => ({
        filename: `pet-image${index}.jpg`,
        path: img.url,
        cid: `pet-image-${img.id}`
      }))

    });


    res.json(updateUser, createAdoptRequest, homePics);
  } catch (err) {
    next(err);
  } finally {
    const deleteFile = req.files.map((file) => fs.unlink(file.path));
    await Promise.all(deleteFile);
  }
};

exports.getRandomPets = async (req, res, next) => {
  try {
    const allPets = await prisma.pets.findMany({
      where: {
        status: "AVAILABLE",
        deleted_at: null,
      },
      select: {
        id: true,
        name_en: true,
        name_th: true,
        breed_en: true,
        breed_th: true,
        image: {
          select: {
            url: true,
          },
        },
      },
    });

    // Shuffle the array using Fisher-Yates algorithm
    for (let i = allPets.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allPets[i], allPets[j]] = [allPets[j], allPets[i]];
    }

    // Take first 5 pets from shuffled array
    const randomPets = allPets.slice(0, 5);

    res.json(randomPets);
  } catch (err) {
    next(err);
  }
};
