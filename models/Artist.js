import mongoose from "mongoose";

const Scheme = mongoose.Schema;

const ArtistScheme = new Scheme({
    name: {
        type: String,
        required: true,
    },
    information: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    }
});

const Artist = mongoose.model('Artist', ArtistScheme);

export default Artist;