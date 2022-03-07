// const mongoose = require('mongoose')
// import { MongoMemoryServer } from 'mongodb-memory-server'
const jwt = require('jsonwebtoken')
const supertest = require('supertest')
const createServer = require('../utils/server')
const app = createServer()
export const userPayLoad = {
    email: "fawad4bros@gmail.com",
    password: "fawad4bros",
}
export const registerPayLoad = {
    username: "jawad",
    email: "jawad4bros@gmail.com",
    password: "jawad4bros",
}
export const itemPayLoad = {
    id:50,
    title:"Burger",
    name:"Cheese",
    price:650,
    description: "Value of money",
    featured: true,
    image: {
        image:"Fawad.png",
        imagePath:"",
    }
}
export const errItemPayLoad = {
    id:50,
    title:"Burger",
    name:"Cheese",
    description: "Value of money",
    featured: true,
    image: {
        image:"Fawad.png",
        imagePath:"",
    }
}

//itemControllers
describe("items",()=>{
    // time 11.9s
    // beforeAll(async () => {
    //     const mongoServer = await MongoMemoryServer
    //     .create();
    //     await mongoose.connect(mongoServer.getUri());
    // });
    // afterAll(async () => {
    //     await mongoose.disconnect();
    //     await mongoose.connection.close();
    // });

    //Post Item
    describe("post upload route",()=>{
        describe("user not loggedIn can't add item",()=>{
            it("Unauthorized/status 401/item not added",async ()=>{
                const {statusCode} = await supertest(app).post("/api/items/upload").send(itemPayLoad)
                expect(statusCode).toBe(401)
            })
        })
        describe("user is loggedIn added item",()=>{
            it("OK success/status 200/item added",async ()=>{
                const token = jwt.sign(userPayLoad, 'somethingSomething',{expiresIn: "1h"},)
                const {statusCode, body} = await supertest(app).post('/api/items/upload').set('Authorization', `Bearer ${token}`).send(itemPayLoad)
                expect(statusCode).toBe(201)
                expect(body).toBeTruthy()
            })
        })
        describe("user is loggedIn adding item",()=>{
            it("internal error/status 500/item not added",async ()=>{
                const token = jwt.sign(userPayLoad, 'somethingSomething',{expiresIn: "1h"},)
                const {statusCode, body} = await supertest(app).post('/api/items/upload').set('Authorization', `Bearer ${token}`).send(errItemPayLoad)
                expect(statusCode).toBe(500)
                expect(body).toBeTruthy()
            })
        })


    })

    //Get Items
    describe("get items route",()=>{
        describe("items exist in database",()=>{
            //supertest return a promise
            it("OK success/status 200/", async ()=>{
                const {statusCode, body} = await supertest(app).get(`/api/items/items`)
                expect(statusCode).toBe(200)
                expect(body).toBeTruthy()
            })
        })
    })
    
    //Update Item/:id
    describe("update item route",()=>{
        describe("item for update is not in database",()=>{
            it("Not Found/status 404/item does not exist", async ()=>{
                const itemId = '3'
                const {statusCode} = await supertest(app).get(`/api/items/update/${itemId}`).send(itemPayLoad)
                expect(statusCode).toBe(404)
            })
        })
        describe("item is in database",()=>{
            it("OK success/status 200/item updated", async ()=>{
                const itemId = '5'
                const {statusCode} = await supertest(app).get(`/api/items/update/${itemId}`).send(itemPayLoad)
                expect(statusCode).toBe(201)
            })
        })
    })
    //Get Item/:id
    describe("get item route",()=>{
        describe("item is not in database",()=>{
            //supertest return a promise
            it("Not Found/status 404/item does not exist", async ()=>{
                const itemId = '4545465444589787'
                await supertest(app).get(`/api/items/item/${itemId}`).expect(404)
            })
        })
        describe("item is in database",()=>{
            //supertest return a promise
            it("OK success/status 200/item does exist", async ()=>{
                const itemId = '54'
                await supertest(app).get(`/api/items/item/${itemId}`).expect(200)
            })
        })
    })
    //Delete Item/:id
    describe("delete item route",()=>{
        describe("item is not in database",()=>{
            it("Not Found/status 404/Item not deleted", async ()=>{
                const itemId = '797779778789787879879878979879'
                await supertest(app).get(`/api/items/delete/${itemId}`).expect(404)
            })
        })
        describe("item is in database",()=>{
            it("OK success/status 200/Item deleted", async ()=>{
                const token = jwt.sign(userPayLoad, 'somethingSomething',{expiresIn: "1h"},)
                const itemId = '50'
                const {statusCode} = await supertest(app).delete(`/api/items/delete/${itemId}`).set('Authorization', `Bearer ${token}`)
                expect(statusCode).toBe(200)
            })
        })
    })


})

//authControllers
describe("auth",()=>{
    describe("Login",()=>{
        describe("User LoggedIn",()=>{
            it("OK success/status 200/LoggedIn", async ()=>{
                const {statusCode} = await supertest(app).post('/api/auth/login').send(userPayLoad)
                expect(statusCode).toBe(200)
            })
        })
    })
    describe("Register",()=>{
        describe("User registered",()=>{
            it("OK success/status 200/Registered", async ()=>{
                const {statusCode} = await supertest(app).post('/api/auth/register').send(registerPayLoad)
                expect(statusCode).toBe(200)
            })
        })
    })
})
