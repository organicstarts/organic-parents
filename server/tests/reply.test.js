const request = require('supertest')
const app = require('../app')
const Reply = require('../models/reply')
const {
    userOneId,
    userOne,
    threadOneId,
    userTwoId,
    userTwo,
    replyOne,
    postTwo,
    postThree,
    setupDatabase
} = require('./fixtures/db')

beforeEach(setupDatabase)

test('Should create post for user', async () => {
    const response = await request(app)
        .post('/reply')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            content: 'From my test',
            thread: threadOneId
        })
        .expect(201)
    const reply = await Reply.findById(response.body._id)
    expect(reply).not.toBeNull()
    expect(reply.completed).toEqual(false)
})

test('Should fetch user posts', async () => {
    const response = await request(app)
        .get('/replies')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
    expect(response.body.length).toEqual(2)
})

test('Should not delete other users posts', async () => {
    const response = await request(app)
        .delete(`/replies/${replyOne._id}`)
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .send()
        .expect(404)
    const reply = await Reply.findById(replyOne._id)
    expect(reply).not.toBeNull()
})
