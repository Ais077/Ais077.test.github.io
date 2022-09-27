import mongoose from "mongoose";
import Inc from "mongoose-sequence";

const AutoIncrement = Inc(mongoose); 

const Scheme = mongoose.Schema;

const TrackScheme = new Scheme({
    name: {
        type: String,
        required: true
    },
    album: {
        type: Scheme.Types.ObjectId,
        ref: 'Album',
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    counter: {
        type: Number,
        required: true,
        default: 1
    }
});

TrackScheme.plugin(AutoIncrement, {id: 'album', inc_field: 'counter', reference_fields: ['album']});

const Track = mongoose.model('Track', TrackScheme);

export default Track;