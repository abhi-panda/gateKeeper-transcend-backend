const express = require('express')
const router = express.Router();
const db = require('../db.js');

router.get('/:id', function (req,res) {
  console.log("request query" + req.params.id)
  db.Guest.findOne({
    where : {
      uid : req.params.id
    }
  }).then(
    guest => {
      if (!guest) {
        return res.status(404).send({message : "guest not found"});
      }
      return res.status(200).send(guest);
    }
  ).catch(err => {
    return res.status(400).send(err);
  });
});

router.get('/connection/verify',function (req,res){
  console.log("Verify Connection Request : Successful!")
  return res.status(200).send({"connection":"successful"});
})

router.get('/guestCount/totals', function (req,res) {
  console.log("request query totals" )
  db.Guest.findAll({
   
  }).then(
    guests => {

      var guestTotals = {};
      guestTotals.totalAdults= 0;
      guestTotals.totalKids= 0;
      guestTotals.totalAdultsArrived = 0;
      guestTotals.totalKidsArrived = 0;

      for (var i =0; i < guests.length; i++ ) {
        var guest = guests[i];
        guestTotals.totalAdults += guest.totalAdults;
        guestTotals.totalKids += guest.totalKids;
        guestTotals.totalAdultsArrived += guest.adultsArrived;
        guestTotals.totalKidsArrived += guest.kidsArrived;
      }
      
      return res.status(200).send(guestTotals);
    }
  ).catch(err => {
    return res.status(400).send(err);
  });
});

router.post('/', function (req,res) {
  db.Guest.create(req.body).then(
    guest => {
      return res.send(guest);
    }
  ).catch( err => {
    return res.status(400).send(err);
  });
});

router.put('/:id', function (req,res) {
  var guestChanged = db.Guest.build(req.body, {isNewRecord : false});
  var id = req.params.id;
  db.Guest.findOne({
    where : {
      uid : id
    }
  }).then (guest => {
    if (!guest) {
      return res.status(404).send("guest not found");
    }
    return guestChanged.save();
  }).then (guest => {
    return res.status(200).send(guest);
  }).catch ( err => {
    return res.status(400).send(err);
  });
});

router.delete('/:id', function (req,res) {
  db.Guest.findOne({
    where : {
      uid: req.params.id
    }
  }).then ( guest => {
    if (!guest) {
      return res.status(200).send({message: "guest not found"});
    }
    return guest.destroy();
  }).then( () => {
    return res.status(200).send({message: "guest deleted"});
  }).catch ( err => {
    return res.status(400).send(err);
  })
});

module.exports = router;
