const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('authentication/authenticated.ejs', {user : {"login":"ealionel","studentId":40845,"email":"lionel.ea@utt.fr","firstName":"LIONEL","lastName":"EA","fullName":"LIONEL EA","branch":"RT","level":"1","speciality":null,"phone":"0123456789","phonePrivacy":"private","sex":"male","sexPrivacy":"public","nationality":"France","nationalityPrivacy":"private","address":"12 Avenue du cheval","addressPrivacy":"private","postalCode":"94190","postalCodePrivacy":"private","city":"Troyes","cityPrivacy":"private","country":"France","countryPrivacy":"public","birthday":{"date":"1997-01-03 00:00:00.000000","timezone_type":3,"timezone":"GMT"},"birthdayPrivacy":"public","birthdayDisplayOnlyAge":false,"personnalMail":"helitobide@gmail.com","personnalMailPrivacy":"private","uvs":["SY04","LC01","GE28","SY06","IF01","GL02"],"surname":null,"website":null,"facebook":null,"twitter":null,"linkedin":null,"viadeo":null,"isStudent":true,"bdeMember":true,"bdeMembershipEnd":{"date":"2019-09-30 00:00:00.000000","timezone_type":3,"timezone":"GMT"},"_embed":{"badges":[1]},"_links":[{"rel":"self","uri":"/api/public/users/ealionel"},{"rel":"user.badges","uri":"/api/public/users/ealionel/badges"},{"rel":"user.image","uri":"/uploads/photos/ealionel_official.jpg"},{"rel":"user.official_image","uri":"/uploads/photos/ealionel_official.jpg"}]}})
});

router.get('/2', (req, res) => {
    res.render('authentication/failed.ejs');
});

module.exports = router;
