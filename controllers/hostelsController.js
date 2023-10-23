const imageMimeTypes = ['image/jpeg','image/png','image/ico']
const Hostel = require('../models/Hostel')  
const Booking = require('../models/Booking')  
const file = ""
const fileType = ""

//Index Page
module.exports.index = async (req,res)=>{
    try{        
        // Get all hostels
        const allHostels = await Hostel.find();
        res.render('hostels/index',{
            hostels:allHostels
        });
    }
    catch
    {
        res.render('/');
    }
}

//Book Hostel
module.exports.bookHostel = async (req,res)=>{
    const booking = new Booking({
        hostel:req.params.id,
        user:res.locals.user
    })
    try{
        const currentHostel = await booking.save();
        res.redirect('/hostels')
    }
    catch(e){res.send(e.message)}
}

//Single Hostel
module.exports.singleHostel = async (req,res)=>{
    const id =  req.params.id;
    const user = res.locals.user;

    try{
        const hostel = await Hostel.findById(id);
        res.render('hostels/single',{
            hostel:hostel
        })
    }catch{res.render('hostels')}
}



