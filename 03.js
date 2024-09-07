// S4 Studio Sheet

// Pascal Triangle
/*
1
1 1
1 2 1
1 3 3 1
1 4 6 4 1
1 5 10 10 5 1
*/

function pascal(row, pos) {
    // Your solution here
    return (pos === 0) || (pos === row)
            ? 1
            : pascal(row - 1, pos - 1) + pascal(row - 1, pos);
    
}

// If it pascal(5, 2) = pascal(4, 1) + pascal(4, 2)

pascal(5, 2);

function compose(f, g) {
    return x => f(g(x));
}


compose(math_sqrt, math_log)(math_E);// 1
compose(math_log, math_sqrt)(math_E * math_E); // 1


function thrice_1(f) {
    return compose(compose(f, f), f);
}

function repeated(f, n) {
    return n === 0 ? x => x // what is this lambda?
                   : compose(f, repeated(f, n - 1));
}

function thrice(f) {
    return repeated(f, 3);
}

thrice(thrice)(x => x + 1)(0);
