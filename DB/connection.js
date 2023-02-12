import mongoose from 'mongoose';



const connectDB  = async ()=>{
    return  await mongoose.connect(`mongodb://localhost:27017/sarahaApp`)
    .then(result=>{
        console.log(`ConnectedDB`);
        
    }).catch(err=>console.log(`Fail to connect ${err}`))
}

export default connectDB