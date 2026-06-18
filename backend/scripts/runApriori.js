const fs = require('fs');
const csv = require('csv-parser');
const mongoose = require('mongoose');
const ProductRelationship = require('../src/models/ProductRelationship');
require('dotenv').config({ path: __dirname + '/../.env' });

const databaseLink = process.env.MONGO_URI;

// We will use this to group products by their Order ID. 
// Think of it like a bunch of shopping baskets.
let historicalCarts = {}; 
// We will use this to tally up how many times two items appear in the same basket.
let pairFrequencies = {}; 

// STEP 1: READ THE DATA
// We wrap this in a "Promise" so JavaScript waits for the whole file 
// to finish reading before moving on to Step 2.
function loadOrderData() {
    return new Promise((resolve) => {
        console.log("1. Reading Order Data...");

        fs.createReadStream(__dirname + '/../order_items_dataset.csv')
            .pipe(csv())
            .on('data', (row) => {
                let orderId = row.OrderID.trim();
                let productId = row.ProductID.trim();
                // If we haven't seen this order ID before, create a new empty basket (array)
                if (!historicalCarts[orderId]) {
                    historicalCarts[orderId] = [];
                }
                // Toss the product into that specific basket
                historicalCarts[orderId].push(productId);
            })
            .on('end', () => {
                console.log("-> Data successfully loaded into memory.");
                resolve(); // Tells the program: "Okay, I'm done reading!"
            });
    });
}

// STEP 2: FIND FREQUENTLY BOUGHT TOGETHER PAIRS
function calculateRelationships() {
    console.log("2. Finding pairs of items bought together...");

    // Look inside every single shopping cart we just created
    for (let orderId in historicalCarts) {
        let itemsInCart = historicalCarts[orderId];

        // We only care about carts that have 2 or more items
        if (itemsInCart.length > 1) {
            
            // Compare every item in the cart with every other item
            for (let i = 0; i < itemsInCart.length; i++) {
                for (let j = i + 1; j < itemsInCart.length; j++) {
                    let itemA = itemsInCart[i];
                    let itemB = itemsInCart[j];

                    // Create a unique name tag for the pair (e.g., "Apple---Banana")
                    let pairKey1 = itemA + "---" + itemB;
                    let pairKey2 = itemB + "---" + itemA;

                    // Add 1 to the tally for this specific pair
                    pairFrequencies[pairKey1] = (pairFrequencies[pairKey1] || 0) + 1;
                    pairFrequencies[pairKey2] = (pairFrequencies[pairKey2] || 0) + 1;
                }
            }
        }
    }
}

// STEP 3: CALCULATE SCORES AND SAVE TO DATABASE
async function saveToDatabase() {
    console.log("3. Connecting to Database...");
    await mongoose.connect(databaseLink);
    
    console.log("-> Clearing old relationships...");
    await ProductRelationship.deleteMany({}); 

    let bulkInsertArray = [];

    // Go through all the tallied pairs from Step 2
    for (let pair in pairFrequencies) {
        let [itemA, itemB] = pair.split("---");
        let timesBoughtTogether = pairFrequencies[pair];

        // Calculate a score (15 points per time bought together, maxing out at 100)
        let rawScore = timesBoughtTogether * 15; 
        let finalScore = rawScore > 100 ? 100 : rawScore;

        // Package the data up for the database
        bulkInsertArray.push({
            productid: itemA,
            relatedProductid: itemB,
            relationshipScore: finalScore 
        });
    }

    console.log(`-> Sending a batch of ${bulkInsertArray.length} relationships to MongoDB...`);
    // Save everything to the database in one big swoop!
    if (bulkInsertArray.length > 0) {
        await ProductRelationship.insertMany(bulkInsertArray);
    }
    console.log(`Success! Pipeline complete.`);
    process.exit();
}

// MAIN EXECUTION (This is where the program actually starts!)
async function runMachineLearningPipeline() {
    await loadOrderData();          // Wait for Step 1
    calculateRelationships();       // Run Step 2
    await saveToDatabase();         // Wait for Step 3
}
runMachineLearningPipeline();