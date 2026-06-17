const { MongoClient } = require("mongodb");

const uri =
 "mongodb+srv://sarath1236:srikanth@cluster0.qwjlgjn.mongodb.net/collegebusdb?retryWrites=true&w=majority&appName=Cluster0" ;

async function run() {
  try {
    const client = new MongoClient(uri);

    await client.connect();

    console.log("Connected!");
  } catch (err) {
    console.error(err);
  }
}

run();