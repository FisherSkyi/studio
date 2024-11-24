
// function stream_map(f, s) {
//     return is_null(s)
//         ? null
//         : pair(f(head(s)),
//               () => stream_map(f, stream_tail(s)));
// }

// // () => stream_map(f, scale_stream(2, A))
// // () => stream_map(f, stream_map(x => 2 * x, A))

// function add_streams(s1, s2) {
//     return is_null(s1)
//         ? s2
//         : is_null(s2)
//         ? s1
//         : pair(head(s1) + head(s2),
//               () => add_streams(stream_tail(s1), 
//                                  stream_tail(s2)));
// }

// const ones = pair(1, () => ones);

// const integers = pair(1, () => add_streams(ones, integers));

// function scale_stream(c, stream) {
//     return stream_map(x => c * x, stream);
// }

// const A = pair(1, () => scale_stream(3, A));

// function mul_streams(a, b) { 
//     return pair(head(a) * head(b),
//                     () => mul_streams(stream_tail(a), stream_tail(b)));
// }

// const B = pair(1, () => mul_streams(B, integers));

// eval_stream(A, 10);

// eval_stream(B, 10);
function add_streams(s1, s2) { 
    return is_null(s1)

            ? s2
            : is_null(s2)
            ? s1
            : pair(head(s1) + head(s2),
                    () => add_streams(stream_tail(s1),
                                      stream_tail(s2)));
}

const ones = pair(1, () => ones);

function scale_stream(c, stream) {
    return stream_map(x => c * x, stream);
}

const minus_ones = scale_stream(-1, ones); // -1, -1, -1, ...

function integers_from(n) {
    return pair(n, () => integers_from(n + 1));
}

const non_neg_integers = integers_from(0); // 0, 1, 2, 3, ...

eval_stream(non_neg_integers, 10);

const add_series = add_streams; 
const scale_series = scale_stream;


function negate_series(s) { 
    return scale_series(-1, s);
}

function subtract_series(s1, s2) {
    return add_series(s1, negate_series(s2));
}

function coeffs_to_series(list_of_coeffs) {
    const zeros = pair(0, () => zeros);
    function iter(list) { 
        return is_null(list)
                ? zeros
                : pair(head(list),
                        () => iter(tail(list)));
    }
    return iter(list_of_coeffs); 
}

function list_to_inf_stream(xs) { 
    function helper(ys) {
        return is_null(ys)
            ? helper(xs) // the trick
            : pair(head(ys), () => helper(tail(ys)));
    }
    return is_null(xs) ? null : helper(xs); 
} 

function fun_to_series(fun) {
    return stream_map(fun, non_neg_integers);
}

// way 1
function alt_stream(n) {
    return pair(n % 2 === 1? 1 : -1, () => alt_stream(n + 1));
}

const alternating_ones = alt_stream(1);

eval_stream(alternating_ones, 10);

// way 2
function zip_list_of_streams(ss) {
    return pair(head(head(ss)), 
        () => zip_list_of_streams(append(tail(ss), 
                                        list(stream_tail(head(ss))))));
}
function alt_ones(s1, s2) {
    return zip_list_of_streams(list(s1, s2));
}
const alt_ones1 = alt_ones(ones, minus_ones);
eval_stream(alt_ones1, 10);

// way 3
const alt_ones2 = pair(1, 
                    () => pair(-1,
                            () => alt_ones2));
eval_stream(alt_ones2, 10);                         

// way 4

const alt_ones3 = list_to_inf_stream(list(1, -1));
eval_stream(alt_ones3, 10);

// way 5
const alt_ones4 = fun_to_series(x => 1);
eval_stream(alt_ones4, 10);

// zeros way 1
const zeros1 =  scale_stream(0, alternating_ones);
eval_stream(zeros1, 10);

// zero2
const zeros2 =  add_streams(alternating_ones, negate_series(alternating_ones));
eval_stream(zeros2, 10);

//zero3
const zeros3 = fun_to_series(x => 0);
eval_stream(zeros3, 10);

// zero 4
const zero4 = list_to_inf_stream(list(0));
eval_stream(zero4, 10);

// S1
// ones
let sum1 = 0;
function S1(x, n) {
    for (let i = n; i > -1; i = i -1) {
        sum1 = sum1 + stream_ref(ones, n - i) * math_pow(x, n - i);
    }
    return sum1;
}

S1(2,3); // 1 + 2 + 2^2 + 2^3

// S2
let sum2 = 0;
function S2(x, n) {
    for (let i = n; i > -1; i = i -1) {
        sum2 = sum2 + stream_ref(integers_from(1), n - i) * math_pow(x, n - i);
    }
    return sum2;
}

S2(2,3); // 1 + 2*2 + 3*4 + 4*8 = 49

const s1 = ones;
const s2 = integers_from(1);

function factorial(n) {
    function helper(n, already) {
        return n === 0 ? already : helper(n-1, already * n);
    }
    if (n >= 0) {
        return helper(n, 1);
    } else {
        return -1 * factorial(-n);
    }
    
    
}
// factorial(5);

const E_base = stream_map(x => 1 / factorial(x), integers_from(0));

function E_x(x, n) {
    let sum = 0;
    for (let i = 0; i < n; i = i + 1) {
        sum = sum + stream_ref(E_base, i) * math_pow(x, i);
    }
    return sum;
}

E_x(2,200); // e^2 = 7.389056

const jump = stream_filter(x => x%2 === 1, integers_from(1));
// eval_stream(jump, 10);
// const base = stream_map(x => 1/factorial(x), jump);
// eval_stream(base, 10);
const base2 = stream_map(x => (x+1)%4 === 0 ? (-x) : x, jump);
// eval_stream(base2, 10);
const base = stream_map(x => 1/factorial(x), base2);
// eval_stream(base, 10);
// factorial(-5);

const sin_base = alt_ones(zeros1, base);


function sin_x(x, n) {
    let sin_sum = 0;
    for (let i = n; i > -1; i = i -1) {
        sin_sum = sin_sum + stream_ref(sin_base, n - i) * math_pow(x, n - i);
    }
    return sin_sum;
}

sin_x(math_PI/3, 100); // 0.8660254

// const math_Sin =  x => sin_x(x, 100);

function Sin(x) {
    return sin_x(x, 100);
}

Sin(math_PI/3) === math_sin(math_PI/3);