const { date } = require('joi')
const prisma = require('../configs/prisma')
const createError = require('../utils/createError')

exports.aPets =async(req,res,next)=>{
    try {
        const allAvaiPets = await prisma.pets.findMany({
            where:{ 
                status : "AVAILABLE",
            },
            select:{
                id: true,
                name_en: true,
                name_th:true,
                age:true,
                gender:true,
                image:{
                    select:{
                        url:true
                    }

                }
            },
        })
        console.log("getApets")
        res.json(allAvaiPets)
    } catch (err) {
        next(err)
    }
}

exports.pet = async(req,res,next)=>{
    try {
        const {id}  = req.params
        if(!id){
            return createError(400,"pet id not provided")
        }
        const petInfo = await prisma.pets.findFirst({
            where:{id:+id},
            select:{
                id: true,
                age: true,
                color: true,
                gender: true,
                type: true,
                breed_en: true,
                breed_th: true,
                name_en: true,
                name_th:true,
                description_en:true,
                description_th:true,
                medical_history:true,
                is_vaccinated:true,
                is_neutered:true,
                weight:true,
                image:{
                    select:{
                        url:true
                    }

                }
            },
        })
        if(!petInfo){
            return createError(400,"This pet not found")
        }
        const birthDay = petInfo.age 
        const age = (new Date() - birthDay)/86400000
        petInfo.birthDay = birthDay
        petInfo.age = age

        res.json(petInfo)

    } catch (err) {
        next(err)
    }   

}