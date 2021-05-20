const express = require('express') //express를 설치했기 때문에 가져올 수 있다.
const app = express()

const KakaoStrategy = require('passport-kakao').Strategy
const passport = require('passport');


app.get('/', (req, res) => {
  res.send('Hello World!')
})

passport.use(new KakaoStrategy({
    clientID: '974d06dc1d9c335cc6d0fcd94ee7703a', // Rest API 키
    clientSecret: 'nywcIy2P3jLbAwRkq4XG2rI6eVCEX5Kf',
    callbackURL: 'http://localhost:3001/kakaoRedirect'// 리다이렉트 URL
  },(accessToken, refreshToken, profile, done) => {
    const profile_json = profile._json;
    console.log('josn데이터 확인: ',profile_json);
    done(null, profile.profile_json);
  }))

  app.get('/kakao', passport.authenticate('kakao'))
  app.get('/kakaoRedirect', passport.authenticate('kakao', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  }))

  app.get('/login', (req, res) => {
      res.send('kakao login 페이지')
  })

app.listen(3001);