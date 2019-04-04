const request = require('supertest')
const app = require('../server')
const Post = require('../models/post')
const {
    userOneId,
    userOne,
    userTwoId,
    userTwo,
    postOne,
    postTwo,
    postThree,
    setupDatabase
} = require('./fixtures/db')

beforeEach(setupDatabase)

test('Should create post for user', async () => {
    const response = await request(app)
        .post('/posts')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            description: 'From my test'
        })
        .expect(201)
    const post = await Post.findById(response.body._id)
    expect(post).not.toBeNull()
    expect(post.completed).toEqual(false)
})

test('Should fetch user posts', async () => {
    const response = await request(app)
        .get('/posts')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
    expect(response.body.length).toEqual(2)
})

test('Should not delete other users posts', async () => {
    const response = await request(app)
        .delete(`/posts/${postOne._id}`)
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .send()
        .expect(404)
    const post = await Post.findById(postOne._id)
    expect(post).not.toBeNull()
})
