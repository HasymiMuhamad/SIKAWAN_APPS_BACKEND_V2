// const assert = require('assert');

// var chai = require('chai')
// var chaiHttp = require('chai-http')
// var app = require('../../routes/school')
// var expect = chai.expect

// chai.use(chaiHttp)

// describe('Admin Route', function () {
//   describe('Root function', function () {
//     it('Should show list of student', function (done) {
//       this.timeout(5000)
//       chai.request(app)
//                 .post('/login')
//                 .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2FkZW1pY0RldGFpbHMiOnsidGVhY2hlcnMiOlsiNWNhNTE5Y2Q2NzhmMmYxNThmZmQ3ZGQwIiwiNWNhNzRhOWZkODdiYzEwMDI0YzhmOTMzIiwiNWNhOGQ4Y2E3NGZjOTMxNmI4YmFjYTBmIl0sIm51bU9mVGVhY2hlcnMiOjMsInN0dWRlbnRzIjpbIjVjYTUyZWRhMjk3MTQzMjY4ZDhiOTY5MSIsIjVjYTUyZWZiMjk3MTQzMjY4ZDhiOTY5MiIsIjVjYTUyZjBiMjk3MTQzMjY4ZDhiOTY5MyIsIjVjYTUyZjcxNzgxYTZlMjdkYjM1MzIxMSIsIjVjYTUyZmVmYTMzYTZjMjhhMWE0ODYyZSIsIjVjYTUzMGMzY2RiYWZmMjkzOTgzNDhlOSIsIjVjYTUzMTdhY2RiYWZmMjkzOTgzNDhlYSIsIjVjYTUzMWRmZGVlZTdlMjlkZTBiMzUxYSIsIjVjYTUzMmJlZGVlZTdlMjlkZTBiMzUxYyIsIjVjYTcyNDUwOGNmOGY5MTVkNWVkMGMwNyIsIjVjYTcyNDU5OGNmOGY5MTVkNWVkMGMwOSIsIjVjYTcyNjgxMDAxZTlmMTdkNDEwZjkyYyIsIjVjYTcyODFkNDU1ZDY1MTk3NWE2NGFlNSIsIjVjYTcyODIwNDU1ZDY1MTk3NWE2NGFlNyIsIjVjYTcyODJjNDU1ZDY1MTk3NWE2NGFlOSIsIjVjYTczMjg5NjRjMGEyMDAyNDVjMjcyYSIsIjVjYTc0ZThlZDg3YmMxMDAyNGM4ZjkzNSIsIjVjYTc0ZWEwZDg3YmMxMDAyNGM4ZjkzNyIsIjVjYTg3ZmFiYjFhZWJiMzVmN2YyN2MzNCIsIjVjYThkODg3NzRmYzkzMTZiOGJhY2EwZCIsIjVjYTlmZjA0Y2Y5YWQ4MjVhMjdiOThlZiIsIjVjYTlmZjFjY2Y5YWQ4MjVhMjdiOThmMSIsIjVjYTlmZjJjY2Y5YWQ4MjVhMjdiOThmMyIsIjVjYTlmZjMzY2Y5YWQ4MjVhMjdiOThmNSIsIjVjYTlmZjQ5Y2Y5YWQ4MjVhMjdiOThmNyIsIjVjYTlmZjU3Y2Y5YWQ4MjVhMjdiOThmOSIsIjVjYTlmZjg0Y2Y5YWQ4MjVhMjdiOThmYiIsIjVjYTlmZjkxY2Y5YWQ4MjVhMjdiOThmZCIsIjVjYTlmZjllY2Y5YWQ4MjVhMjdiOThmZiIsIjVjYTlmZmI1Y2Y5YWQ4MjVhMjdiOTkwMSJdLCJudW1PZlN0dWRlbnRzIjoyNSwiY2xhc3Nyb29tcyI6W119LCJnZW5lcmFsRGV0YWlscyI6eyJuYW1lIjoic2Nob29sYWRtaW4ifSwicm9sZSI6InNjaG9vbCIsIl9pZCI6IjVjYTRkMmEzYTNmOWUxMDAyNDA3MDU5MiIsImlhdCI6MTU1NDkwMTA3MX0.0aJwc29qnsvjMsx9e9TjIe6cXkAwWy1pzBlXDhbcDEc')
//                 .end(function (err, res) {
//           expect(res).to.have.status(200)
//           expect(res.body).to.have.property('success', true)

//           done()
//         })
//     })
//   })
// })
