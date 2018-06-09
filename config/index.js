module.exports = {
    apiUri: "/api/v1",
    dbUri: "mongodb://abhishekwl:abcd1234@ds016108.mlab.com:16108/stem_api",
    port: process.env.PORT || 8000,
    firebaseConfig: {
        apiKey: "AIzaSyDG7gSPLRVSbnOiJ27_fKlcafY3xbN5Zmo",
        authDomain: "b-t-prototype.firebaseapp.com",
        databaseURL: "https://b-t-prototype.firebaseio.com",
        projectId: "b-t-prototype",
        storageBucket: "b-t-prototype.appspot.com",
        messagingSenderId: "430139558882"
    }
};
