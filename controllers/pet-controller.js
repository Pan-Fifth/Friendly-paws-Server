const { date } = require('joi')
const prisma = require('../configs/prisma')
const createError = require('../utils/createError')
const cloudinary = require('../configs/cloudinary')
const path = require('path')
const fs = require('fs/promises')


exports.aPets = async (req, res, next) => {
    try {
        console.log("query",req.query)
        const {gender,age,weight} = req.query
        const {count,page} = req.params

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
            skip: ((+page)-1)*count,
            select: {
                id: true,
                name_en: true,
                age: true,
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
        
        const { id } = req.params
        if (!id) {
            return createError(400, "pet id not provided")
        }
        const petInfo = await prisma.pets.findFirst({
            where: { id: +id },
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
                        url: true
                    }

                }
            },
        })
        if (!petInfo) {
            return createError(400, "This pet not found")
        }
        const birthDay = petInfo.age
        const age = (new Date() - birthDay) / 86400000
        petInfo.birthDay = birthDay
        petInfo.age = age

        res.json(petInfo)

    } catch (err) {
        next(err)
    }

}



exports.allPets = async(req,res,next) => {
    try {
        const user = req.user

        if(user.role !== "ADMIN"){
            return createError(400, "Unauthorized")
        }
    const getAllpets = await prisma.pets.findMany({
        include:{
            image:true
        }
        
        })

        res.json(getAllpets)
        
        } catch (err) {
            next(err)
        }
}




exports.createPets = async(req,res,next) => {
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
            userId,
            image
          } = req.body;


        if(req.user.role !== "ADMIN"){
            return createError(400, "Unauthorized")
        }

        const havefile = !!req.file
        let uploadResult = {} 
        if (havefile) {
            uploadResult = await cloudinary.uploader.upload(req.file.path, {
                overwrite: true,
                public_id: path.parse(req.file.path).name
            });
            fs.unlink(req.file.path);
        }
        
        
         const isVaccinated = is_vaccinated === 'true'
         const isNeutered = is_neutered === 'true'

        
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
              status: 'AVAILABLE',
              image: {
                    create: {
                        url: uploadResult.secure_url || ''
                    }
                },
                },
                include: {
                    image: true,
                 },
          });

          res.json({
            message: 'Pet created',
            newPet,
        });

        
    } catch (err) {
        console.log('Error creating pet:', err);
        next(err)
    }
}


exports.updatePets = async(req,res,next) => {
    try {
        const {id} = req.params
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
            image
          } = req.body;

        const havefile = !!req.file
        let uploadResult = {} 
        
        const petsData = await prisma.pets.findUnique({
            where : {
                id : +id
            }
        })

        if(!petsData) {
            return createError(400, "Pet not found")
        }

        if(havefile){
             uploadResult = await cloudinary.uploader.upload(req.file.path, {
                overwrite : true,
                public_id :path.parse(req.file.path).name
                
            })
            fs.unlink(req.file.path)
        }

        const isVaccinated = is_vaccinated === 'true'
        const isNeutered = is_neutered === 'true'

        const updatedPet = await prisma.pets.update({
            where: {
                id: +id
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
                image: havefile ? {
                    update: {
                        url: uploadResult.secure_url
                    }
                } : undefined
            },
            include: {
                image: true
            }
        });

        res.json({
            message: 'Pet updated successfully',
            updatedPet
        });

    } catch (err) {
        console.log('Error Update pet:', err);
        next(err)
    }
}

exports.deletePets = async(req,res,next) => {
    try {
        const {id} = req.params
        const petsData = await prisma.pets.findUnique({
            where : {
                id : +id
            }
        })
        if(!petsData) {
            return createError(400, "Pet not found")
        }   
        const deletePets = await prisma.pets.delete({
                where : {
                    id : +id
                }
            })
        res.json({message: 'Pet deleted successfully',deletePets})

    } catch (err) {
        next(err)
    }

}