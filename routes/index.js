var express = require('express');
var router = express.Router();
var Mock = require('mockjs');

var OpportunityList = require('../mock/opportunityListData.json');

var success = require('../mock/success.json');

router.get('/opportunity/list/', function(req, res, next) {
    res.json(Mock.mock(OpportunityList));
});

router.get('/opportunity/request/', function(req, res, next) {
    res.json(Mock.mock(success));
});
router.get('/opportunity/request/num/', function(req, res, next) {
    res.json(Mock.mock(success));
});
router.get('/call_center/out_call/', function(req, res, next) {
    res.json(Mock.mock(success));
});
router.post('/opportunity/create/', function(req, res, next) {
    res.json(Mock.mock(success));
});

module.exports = router;
