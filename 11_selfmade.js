
function stream_map(f, s) {
    return is_null(s)
        ? null
        : pair(f(head(s)),
               () => stream_map(f, stream_tail(s)));
}

// () => stream_map(f, scale_stream(2, A))
// () => stream_map(f, stream_map(x => 2 * x, A))

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

const integers = pair(1, () => add_streams(ones, integers));

function scale_stream(c, stream) {
    return stream_map(x => c * x, stream);
}

const A = pair(1, () => scale_stream(3, A));

function mul_streams(a, b) { 
    return pair(head(a) * head(b),
                    () => mul_streams(stream_tail(a), stream_tail(b)));
}

const B = pair(1, () => mul_streams(B, integers));

eval_stream(A, 10);

eval_stream(B, 10);



