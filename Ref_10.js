function stream_tail(xs) {
    return tail(xs)();//apply see the next ele
}

function stream_ref(s, n) {
    return n === 0
        ? head(s)
        : stream_ref(stream_tail(s), n - 1);
}

function stream_map(f, s) {
    return is_null(s)
        ? null
        : pair(f(head(s)),
               () => stream_map(f, stream_tail(s)));
}

function enum_stream(start, end) {
    return start > end
        ? null
        : pair(start,
               () => enum_stream(start + 1, end));
}

const x = stream_map(display, enum_stream(0, 10));
// display number 0 when we construct x
// the head of stream is not protected
stream_ref(x, 1);
stream_ref(x, 2);



function zip_streams(lst) {
    function f(n) {
        return pair(stream_ref(list_ref(lst, n), n), () => f(n+1));
    }
    return f(0);
}
