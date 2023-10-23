const express = require('express');
const Booking = require('../models/Booking');
const Hostel = require('../models/Hostel');

const router = express.Router();

const {requireAuth, currentUser} = require('../middleware/authMiddleware')
// All Routes
router.get("*",currentUser )
router.get("/",async (req,res)=>{    
    try{
        const allHostels = await Hostel.find();
        res.render('index',{
            hostels:allHostels
        });
    }
    catch(err)
    {
        res.send(err);
    }
})


//Users Bookings Hostel
router.get("/cancelreservation/:id",async (req,res)=>{
    try{
        const booking = await Booking.findOne({hostel:req.params.id});
        if(booking){
            booking.status="cancelled";
            await booking.save();
            res.redirect('/mybookings')
        }
    }catch(e){console.log(e.message);}
})

//Users Bookings Hostel
router.get("/mybookings",async (req,res)=>{    
    const id = res.locals.user._id;
    const data = []
    try{
        const booking = await Booking.find({user:id});
        if(booking){
            for (let i = 0; i < booking.length; i++) {
                const current = booking[i];
                const hostel = await Hostel.findById(current.hostel)
                data.push({
                    hostel:hostel,
                    status:current.status
                });                
            }
        }
        res.render('hostels/bookings',{
            applications:data
        })
    }catch(err){
        res.json({err})
    }
})
module.exports = router;