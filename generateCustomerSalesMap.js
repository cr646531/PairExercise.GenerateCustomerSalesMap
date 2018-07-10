function generateCustomerSalesMap(salesData, customerData){
    
    //  Step #1: Create an object, which will be returned at the end of the function. It should contain each customer's name as a key, and the values will be used to store the total number of purchases
    let output = {};

    for(let i = 0; i < customerData.length; i++){
        output[customerData[i].name] = 0;
    }

    //Step #2: Loop through the salesData looking at each purchase. For each purchase, loop through the customerData and identify which customer made the purchase. Once the customer is identified, add the purchase to the customer's total
    for(let i = 0; i < salesData.length; i++){
        for(let j = 0; j < customerData.length; j++){     
            if(salesData[i].customerId === customerData[j].id){
                output[customerData[j].name] += salesData[i].total;
            }
        }
    }
    return output;
}

module.exports = generateCustomerSalesMap;