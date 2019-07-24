const assert = require('assert');

var chai = require('chai')
var chaiHttp = require('chai-http')
var app = require('../../server')
var expect = chai.expect
var faker = require('faker')
var token = null
chai.use(chaiHttp)

describe('Admin Route', function () {
  describe('Root function', function () {
    it('Should register Departement Of Education', function (done) {
      this.timeout(10000)
      chai.request(app)
        .post('/admin/addDoe')
        .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFuZHJpIiwicm9sZSI6ImFkbWluIiwiX2lkIjoiNWNiMzI3NjAxMDYyZjIxMWQ3NDIxMzE3IiwiaWF0IjoxNTU1OTg3NDU2LCJleHAiOjE1NTY1OTIyNTZ9.RJKRC1sFJZXCORZPcroTTaNK_aU-PJZR22D9nfgGUoA')
        .send({
          fullname: faker.name.findName(),
          email: faker.internet.email()
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


// describe('Admin Route', function (){
//   var token = null ;

//   before(function(done){
//     request(url)
//       .post('/login')
//       .send({
//         username:
//       })
//   })
// })
// describe('Admin Route', function () {
//   describe('Root function', function () {
//     it('Should register School', function (done) {
//       this.timeout(10000)
//       chai.request(app)
//         .post('/admin/addSchool')
//         .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFuZHJpIiwicm9sZSI6ImFkbWluIiwiX2lkIjoiNWNiMzI3NjAxMDYyZjIxMWQ3NDIxMzE3IiwiaWF0IjoxNTU1OTM5ODM0LCJleHAiOjE1NTY1NDQ2MzR9.aEYobJZeUF5Dny_JoutwwwWTAcQGXz3uwZhpXmaF_zA')
//         .send({
//           fullname: faker.name.findName(),
//           email: faker.internet.email(),
//           npsn: faker.random.number()
//           // address: faker.address.streetAddress(),
//           // doe: faker.random.alphaNumeric()
//         })
//         .end(function (err, res) {
//           console.log(res.send)
//           expect(res).to.have.status(200)
//           expect(res.body).to.have.property('success', true)

//           done()
//         })
//     })
//   })
// })

