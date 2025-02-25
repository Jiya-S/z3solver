import { init } from 'z3-solver';

const { Context } = await init();
const { Solver, Int, And, Or, Distinct, Eq, Not } = new Context("main");

const solver = new Solver();

const bob = Int.const('bob');  // x is a Z3 integer
const mary = Int.const('mary');
const cathy = Int.const('cathy');
const sue = Int.const('sue');

const people = [bob, mary, cathy, sue];

//the people can have a value of 1-4
// cat = 1, dog = 2, bird = 3, fish = 4
people.forEach(person => {
    solver.add(Or(
        person.eq(1),
        person.eq(2),
        person.eq(3),
        person.eq(4),
    ));
});


//make each person's value distinct
solver.add(Distinct(bob, mary, cathy, sue));

//we know bob has a dog
solver.add(bob.eq(2));

//we know cathy has a bird
solver.add(sue.eq(3));

//mary does not have fish
solver.add(Not(mary.eq(4)));



// Run Z3 solver, find solution and sat/unsat

if (await solver.check() === "sat") {

    // Extract value for x
    let model = solver.model();

    const pets = ["cat", "dog", "bird", "fish"];
    
    console.log(`Bob   = ${pets[model.eval(bob)-1]}`);
    console.log(`Mary  = ${pets[model.eval(mary)-1]}`);
    console.log(`Cathy = ${pets[model.eval(cathy)-1]}`);
    console.log(`Sue   = ${pets[model.eval(sue)-1]}`);

} else {

    console.log("unsat. Could not find a valid value for x.");

}