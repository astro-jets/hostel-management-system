const mongoose = require('mongoose')

const hostelSchema = new mongoose.Schema({
    
    name:{
        type:String,
        required:[true,'Please enter a name']
    },
    description:{
        type:String,
        required:[true,'Please enter details']
    },
    thumbnail:{
        type:Buffer,
        required:true
    },

    thumbnailType:{
        type:String,
        required:true
    }
})

hostelSchema.virtual('thumbnailPath').get(function(){
  if(this.thumbnail != null && this.thumbnailType != null)
  {
    return `data:${this.thumbnailType};charset=utf-8;base64,${this.thumbnail.toString('base64')}`
  }
})

const hostel = mongoose.model('hostel',hostelSchema);
module.exports = hostel;