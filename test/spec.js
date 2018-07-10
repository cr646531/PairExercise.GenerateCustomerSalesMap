
const expect = require('chai').expect;
const generateCustomerSalesMap = require('../generateCustomerSalesMap');

describe('GenerateCustomerSalesMap', ()=> {
    
    let customers = [ 
        { id: 1, name: 'Sydney' }, 
        { id: 2, name: 'Charlie' }, 
        { id: 3, name: 'Amber' }
    ];
    
    let sales = [
        { customerId: 1, orderId: 1, total: 2 },
        { customerId: 2, orderId: 2, total: 2 },
        { customerId: 2, orderId: 3, total: 2 },
        { customerId: 3, orderId: 4, total: 2 },
        { customerId: 3, orderId: 5, total: 2 },
        { customerId: 3, orderId: 6, total: 2 },
    ];

    let output = generateCustomerSalesMap(sales, customers);
    let solution = { Sydney: 2, Charlie: 4, Amber: 6 }; 

    //TESTING
    console.log("\n-------\nTESTING\n-------");
    

    it('The file exists', ()=> {
        expect(generateCustomerSalesMap).to.be.ok;
    });

    it('Returns an object, but not an array', ()=> {
        expect(typeof output).to.equal('object');
        expect(Array.isArray(output)).to.be.false;
    });

    it('Returns the correct output', ()=> {
        expect(output).to.eql(solution);
    });

    it('Works with empty arrays passed in', ()=> {
        //customerData is empty
        let output = generateCustomerSalesMap(sales, []);
        let solution = {};
        expect(output).to.eql(solution);

        //salesData is empty
        output = generateCustomerSalesMap([], customers);
        solution = { Sydney: 0, Charlie: 0, Amber: 0 };
        expect(output).to.eql(solution);
    });

    it("Ignores ID's that have no associated customer", ()=> {
        let salesCopy = JSON.parse(JSON.stringify(sales));
        salesCopy.push({ customerId: 4, orderId: 7, total: 2 });
        let output = generateCustomerSalesMap(salesCopy, customers);
        expect(output).to.eql(solution);
    });

    it("Works with repeated customer names", ()=> {
        let customersCopy = JSON.parse(JSON.stringify(customers));
        customersCopy.push({ id: 4, name: "Charlie" });
        let salesCopy = JSON.parse(JSON.stringify(sales));
        salesCopy.push({ customerId: 4, orderId: 7, total: 10 });
        let output = generateCustomerSalesMap(salesCopy, customersCopy);
        let solution = { Sydney: 2, Charlie: 14, Amber: 6 };
        expect(output).to.eql(solution);
    });

    it("Allows a credit transaction", ()=> {
        let salesCopy = JSON.parse(JSON.stringify(sales));
        salesCopy.push({ customerId: 3, orderId: "credit", total: -1 });
        let output = generateCustomerSalesMap(salesCopy, customers);
        let solution = { Sydney: 2, Charlie: 4, Amber: 5 };
        expect(output).to.eql(solution);
    });

    it("Returns the correct results for a bigger input", ()=> {
        let customersBigger = [ 
            { id: 1, name: 'Sydney' }, 
            { id: 2, name: 'Charlie' }, 
            { id: 3, name: 'Amber' },
            { id: 4, name: 'Nikki' },
            { id: 5, name: 'Jamie' }
        ];
        
        let salesBigger = [
            { customerId: 3, orderId: 1, total: 15 },
            { customerId: 4, orderId: 2, total: 75 },
            { customerId: 2, orderId: 3, total: 25 },
            { customerId: 2, orderId: 4, total: 10 },
            { customerId: 1, orderId: 5, total: 40 },
            { customerId: 3, orderId: 6, total: 30 },
            { customerId: 4, orderId: 7, total: 65 },
            { customerId: 5, orderId: 8, total: -80 },
            { customerId: 6, orderId: 9, total: -100 },
            { customerId: 7, orderId: 10, total: 100 },
            { customerId: 1, orderId: 11, total: -10 },
            { customerId: 3, orderId: 12, total: 0 },
        ];

        let output = generateCustomerSalesMap(salesBigger, customersBigger);
        let solution = { Sydney: 30, Charlie: 35, Amber: 45, Nikki: 140, Jamie: -80 }
        expect(output).to.eql(solution);
    });

    it('The testing protocols did not modify the original data', ()=> {
        let originalCustomers = [ 
            { id: 1, name: 'Sydney' }, 
            { id: 2, name: 'Charlie' }, 
            { id: 3, name: 'Amber' }
        ];
        
        let originalSales = [
            { customerId: 1, orderId: 1, total: 2 },
            { customerId: 2, orderId: 2, total: 2 },
            { customerId: 2, orderId: 3, total: 2 },
            { customerId: 3, orderId: 4, total: 2 },
            { customerId: 3, orderId: 5, total: 2 },
            { customerId: 3, orderId: 6, total: 2 },
        ];

        let originalSolution = { Sydney: 2, Charlie: 4, Amber: 6 };

        expect(customers).to.eql(originalCustomers);
        expect(sales).to.eql(originalSales);
        expect(solution).to.eql(originalSolution);
    });


});








/*

    
        const customers = [ 
            { id: 1, name: 'Sydney' }, 
            { id: 2, name: 'Charlie' }, 
            { id: 3, name: 'Amber' },
            { id: 4, name: 'Nikki' },
            { id: 
        ];
    
        const sales = [
            { customerId: 1, orderId: 1, total: 2 },
            { customerId: 2, orderId: 2, total: 2 },
            { customerId: 2, orderId: 3, total: 2 },
            { customerId: 3, orderId: 4, total: 2 },
            { customerId: 3, orderId: 5, total: 2 },
            { customerId: 3, orderId: 6, total: 2 },
            { customerId: 4, orderId: 7, total: 2 },
        ];
    
        //GENERATING OUTPUT DATA
        console.log("\n----------------------\nGENERATING OUTPUT DATA\n----------------------\n");

        const output = generateCustomerSalesMap(sales, customers);
        const solution = { Sydney: 2, Charlie: 4, Amber: 6 }; 

        //TESTING
        console.log("-------\nTESTING\n-------\n");
    
    });
    */