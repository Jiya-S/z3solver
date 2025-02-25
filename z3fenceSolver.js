import { init } from 'z3-solver';

const { Context } = await init();
const { Solver, Int, And, Or, Distinct, Eq, Not } = new Context("main");

const solver = new Solver();

console.log("inside the fence:");

const x = Int.const('x');
const y = Int.const('y');

solver.add(And(x.gt(5), x.lt(10)));
solver.add(And(y.gt(15), y.lt(25)));

//const randNum1 = Math.floor(Math.random() * 5) + 5;    // Random between 5-10
//const randNum2 = Math.floor(Math.random() * 10) + 15;  // Random between 15-25
//solver.add(x.eq(randNum1));
//solver.add(y.eq(randNum2));

if (await solver.check() === "sat") {
    // Extract value for x
    let model = solver.model();
    let xVal = parseInt(model.eval(x).toString());
    let yVal = parseInt(model.eval(y).toString());
    //console.log(xVal);
    //console.log(yVal);

    console.log(`x = ${xVal}`);
    console.log(`y = ${yVal}`);

} else {
    console.log("unsat. Could not find a valid value for x and y.");
}

solver.reset();

console.log("on the fence:");

const x2 = Int.const('x2');
const y2 = Int.const('y2');

const z = Math.floor(Math.random() * 4);

if (z == 0){
    solver.add(x2.eq(5));
    solver.add(And(y2.ge(15), y2.le(25)));
}

if (z == 1) {
    solver.add(x2.eq(10));
    solver.add(And(y2.ge(15), y2.le(25)));
}

if (z == 2) {
    solver.add(y2.eq(15));
    solver.add(And(x2.ge(5), x2.le(10)));
}

if (z == 3) {
    solver.add(y2.eq(25));
    solver.add(And(x2.ge(5), x2.le(10)));
}

if (await solver.check() === "sat") {
    // Extract value for x
    let model = solver.model();
    let xVal = parseInt(model.eval(x2).toString());
    let yVal = parseInt(model.eval(y2).toString());
    //console.log(xVal);
    //console.log(yVal);

    console.log(`x = ${xVal}`);
    console.log(`y = ${yVal}`);

} else {
    console.log("unsat. Could not find a valid value for x and y.");
}

solver.reset();

console.log("outside the fence:");

const x3 = Int.const('x3');
const y3 = Int.const('y3');

solver.add(x3.ge(8));
solver.add(y3.ge(20));


if (await solver.check() === "sat") {
    // Extract value for x
    let model = solver.model();
    let xVal = parseInt(model.eval(x3).toString());
    let yVal = parseInt(model.eval(y3).toString());
    //console.log(xVal);
    //console.log(yVal);

    console.log(`x = ${xVal}`);
    console.log(`y = ${yVal}`);

} else {
    console.log("unsat. Could not find a valid value for x and y.");
}