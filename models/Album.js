import mongoose from "mongoose";

const Scheme = mongoose.Schema;

const AlbumScheme = new Scheme({
    name: {
        type: String,
        required: true
    },
    artist: {
        type: Scheme.Types.ObjectId,
        ref: 'Artist',
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    image: {
        type: String,
    }
});

const Album = mongoose.model('Album', AlbumScheme);

export default Album;