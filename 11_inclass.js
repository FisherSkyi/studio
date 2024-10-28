// S11 Recap

/**
 * Streams
 * 
 * A stream is either the empty list, or a pair whose tail is a nullary
 * function that returns a stream
 */

//Are the following streams?

const ones = pair(1, () => ones); // Yes
//eval_stream(ones, 3);

const two_a = () => pair(2, two_a); // No
//eval_stream(two_a, 3);

const two = pair(2, () => two); // Yes
//eval_stream(two, 3);

const twos = pair(2, two_a); // Yes
//eval_stream(twos, 4);

function nuul() {
    return pair(null, () => nuuul);
}

const nuuul = pair(null, nuul); // Yes
//eval_stream(nuuul, 5);

const p = pair(123, () => null); // Yes

// =========================== Studio 11 sheet ==========================

//Q1
// Question: What is stream A and B

function scale_stream(c, stream) {
    return stream_map(x => c * x, stream);
}

const A = pair(1, () => scale_stream(2, A));

//eval_stream(A, 10);

// Geometric series with a factor of 2


function mul_streams(a,b) {
    return pair(head(a) * head(b),
                () => mul_streams(stream_tail(a), stream_tail(b)));
}

const B = pair(1, () => mul_streams(B, integers_from(1)));

eval_stream(B, 10);

// Elements are the factorial of the index


//========================================================

//Q2

/* With the given functions, define the following:

 - stream of alternating 1 and -1
 - stream of zeroes
 - The series S1
 - The series S2
*/
function add_streams(s1, s2) {
    return is_null(s1) ? s2
                       : is_null(s2) ? s1
                       : pair(head(s1) + head(s2),
                            () => add_streams(stream_tail(s1),
                                                stream_tail(s2)));
}
//Scale streams declared in Q1
const add_series = add_streams;
const scale_series = scale_stream;

function negate_series(s) {
    return scale_series(-1, s);
}

function coeffs_to_series(list_of_coeffs) {
    const zeros = pair(0, () => zeros);
    function iter(list) {
        return is_null(list) ? zeros
                             : pair(head(list),
                                    () => iter(tail(list)));
    }
    return iter(list_of_coeffs);
}

function fun_to_series(fun) {
    return stream_map(fun, integers_from(0));
}

// Answer/Activity space:

const alt_ones = pair(1, () => pair(-1, () => alt_ones));
const alt_ones_v1 = fun_to_series(x => x % 2 === 0 ? 1 : -1);
const alt_ones_v2 = pair(1, ()=> negate_series(alt_ones_v2));

const zeroes = pair(0, () => zeroes);
const zeroes_v1 = add_streams(alt_ones, stream_tail(alt_ones));
const zeroes_v2 = fun_to_series((x) => 0);
const zeroes_v3 = scale_stream(0, alt_ones);



const s1 = pair(1, () => s1);
const s2 = build_stream(x => x, Infinity);
const s2_v1 = integers_from(1);
const s2_v2 = pair(1, () => add_streams(s1, s2_v2));
// eval_stream(s2_v2, 20);



// ================== In class Sheet ====================

function stream_pairs(s) {
    return is_null(s)
                ? null
                : stream_append(
                    stream_map(
                        sn => pair(head(s), sn),
                        stream_tail(s)
                    ),
                    stream_pairs(stream_tail(s)));
}

const ints = pair(1, () => pair(2, () => pair(3, () => pair(4 , () => pair(5, () => null)))));
eval_stream(stream_pairs(ints), 10);

function stream_append_pickle(xs, ys) {
    return is_null(xs)
            ? ys()
            : pair(head(xs),
                () => stream_append_pickle(stream_tail(xs),
                ys));
}

function stream_pairs2(s) {
    return is_null(s)
                ? null
                : stream_append_pickle(
                    stream_map(
                        sn => pair(head(s), sn),
                        stream_tail(s)
                    ),
                    () => stream_pairs2(stream_tail(s)));

}
const x2 = stream_pairs2(integers_from(1));

// eval_stream(x2, 20);

function stream_append_interleave(xs, ys) {
    return is_null(xs)
            ? ys()
            : pair(head(xs),
                () => stream_append_interleave(ys(),
                () => stream_tail(xs)));
}

function stream_pairs3_v0(s) {
    return is_null(s)
                ? null
                : stream_append_interleave(
                    stream_map(
                        sn => pair(head(s), sn),
                        stream_tail(s)
                    ),
                    () => stream_pairs3_v0(stream_tail(s)));

}

eval_stream(stream_pairs3_v0(integers_from(1)), 200);


