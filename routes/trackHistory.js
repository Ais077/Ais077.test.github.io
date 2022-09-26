import mongoose from "mongoose";

const Schema = mongoose.Schema;

const TrackHistorySheme = new Schema ({ 
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    track: {
        type: Schema.Types.ObjectId,
        ref: 'Track',
        required: true
    },
    datetime: {
        type: Date,
        default: Date()
    },
})


const TrackHistory = mongoose.model('TrackHistory', TrackHistorySheme);


export default TrackHistory; 