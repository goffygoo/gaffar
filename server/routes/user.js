import express from 'express'
import passport from 'passport'
import '../config/passport.js'
import home from '../controllers/user_controller.js'

export default function (io) {
  const router = express.Router()
  console.log('User Router loaded')

  // router.post("/redskull");

  router.get('/', home(io).home)
  router.post('/createUser', home(io).createUser)
  // router.post(
  //   "/userInfo",
  //   passport.authenticate("jwt", { session: false }),
  //   userInfo
  // );
  router.post('/login', home(io).login)
  router.post('/updatePP', home(io).updatePP)
  router.post('/updateName', home(io).updatename)
  router.post('/getInfo', home(io).getInfo)
  router.post('/acceptInvite', home(io).acceptInvite)
  router.post('/rejectInvite', home(io).rejectInvite)
  return router
}

// for any further routes, access from here
// router.use('/routerName', require('./route'));
