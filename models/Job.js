const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const { required } = require('joi');

const JobSchema = new mongoose.Schema({
    company: {
        type: String,
        required: [true, 'Please provide company name'],
        maxlength: 50,
    },
    position: {
        type: String,
        required: [true, 'Please provide position'],
        maxlength: 50,
        
    },
    status: {
        type: String,
        enum: ['interview', 'declined', 'pending'],
        default: 'pending',
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'please provide user'],
    }
},{timestamps:true})

module.exports =  mongoose.model('Job', JobSchema)