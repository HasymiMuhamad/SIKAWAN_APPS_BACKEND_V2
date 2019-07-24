const assert = require('assert');

var chai = require('chai')
var chaiHttp = require('chai-http')
var app = require('../../server')
var expect = chai.expect
var faker = require('faker')
var token = null
chai.use(chaiHttp)

describe('Doe Route', function () {
  describe('Root function', function () {
    it('Should Show Profile DOE', function (done) {
      this.timeout(10000)
      chai.request(app)
                .get('/doe/profile')
                .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmdWxsbmFtZSI6ImRpbmFzIHBlbmRpZGlrIGJhdGFtICIsImVtYWlsIjoiZGlzcGVuQGJ0bS5jb20iLCJzY2hvb2wiOlsiNWNiYzY5ZmRkMzJmNmIxNmE0OTFmZjA1Il0sInJvbGUiOiJkb2UiLCJfaWQiOiI1Y2I4MzJkYzVhNjczOTQ1Yzk1ZmYzYjgiLCJpYXQiOjE1NTYwNzk5NTgsImV4cCI6MTU1NjY4NDc1OH0.XyNamUG8niYvOTv-jPFlQDpO8PDNz6xywUdampJwa-E')
                .end(function (err, res) {
          expect(res).to.have.status(200)
          expect(res.body).to.have.property('success', true)
          expect(res.body).to.have.property('message')
          done()
        })
    })
  })
})

describe('Doe Route', function () {
  describe('Root function', function () {
    it('Should register School', function (done) {
      this.timeout(10000)
      chai.request(app)
                .post('/admin/addSchool')
                .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFuZHJpIiwicm9sZSI6ImFkbWluIiwiX2lkIjoiNWNiMzI3NjAxMDYyZjIxMWQ3NDIxMzE3IiwiaWF0IjoxNTU1OTg3NDU2LCJleHAiOjE1NTY1OTIyNTZ9.RJKRC1sFJZXCORZPcroTTaNK_aU-PJZR22D9nfgGUoA')
                .send({
                  fullname: faker.name.findName(),
                  email: faker.internet.email(),
                  npsn: faker.random.number(),
                  address: faker.address.streetAddress(),
                  doe: faker.random.alphaNumeric()
                })
                .end(function (err, res) {
          expect(res).to.have.status(200)
          expect(res.body).to.have.property('success', true)
          expect(res.body).to.have.property('message')
          done()
        })
    })
  })
})



//     // req.assert('email', 'Email is not valid').isEmail();
//     // req.assert('email', 'Email cannot be blank').notEmpty();
