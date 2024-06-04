const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://Dayroflorez:_4284dayro@curso-full-stack.a1rlipp.mongodb.net/?retryWrites=true&w=majority&appName=Curso-full-stack";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export default client