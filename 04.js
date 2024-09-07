// Studio 3 Extra

function expt(b, n) {
    return n === 0 ? 1 : b * expt(b, n-1);
}
/*

• Let t1(n) be the time that it takes expt to compute b^n for a fixed b.

• Let s1(n) be the space that it takes expt to compute b^n for a fixed b.

• Let t2(b) be the time that it takes expt to compute b^n for a fixed n.

• Let s2(b) be the space that it takes expt to compute b^n for a fixed n.
*/

/*

t1 --> Θ(n).  --> n function calls
s1 --> Θ(n). --> n deferred operations

t2 --> Θ(1)
s2 --> Θ(1)
*/


function is_even(num) {
    return num % 2 === 0;
}

function square(num) {
    return num * num;
}

// Define another exponential function that is faster, running at O(log(n))
function fast_expt(b, n) {
    return n === 0 ? 1
                    : is_even(n)
                        ? square(fast_expt(b, n / 2))
                        : b * fast_expt(b, n - 1);
}


function fast_expt_iter(b, n, res) {
    return n === 0 ? res : is_even(n)
                            ? fast_expt_iter(b * b, n / 2, res)
                            : fast_expt_iter(b, n - 1, b * res);
}

function fast_expt2(b, n) {
    return fast_expt_iter(b, n, 1);
}

fast_expt_iter(2, 8, 1);

/* Useful functions
1. is_even
2. square
*/