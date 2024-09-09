function every_second(items) {
    function creat_list(n, items) {
        return length(items)%2 === 1
                ? n === length(items)
                    ? null
                    : append(pair(list_ref(items, n),null), creat_list(n + 2, items))
                : n === length(items) + 1
                    ? null
                    : append(pair(list_ref(items, n), null), creat_list(n + 2, items));
    }
    return creat_list(1, items);
}

every_second(list("a","x","b","y","c",'z'));

// length(list("a","x","b","y","c",'z',"t"));

// Write a Source §2 function called sums that takes a list of 
//numbers as its only argument and returns a list of numbers, 
//containing two elements: the first is the sum of all even- ranked 
//numbers in the input list (ranks 0, 2, 4 etc), whereras the second element 
//is the sum of all odd-ranked elements in the input list (ranks 1, 3, 5 etc).
// Example call:
//   sums(list(1, 2, 3, 4, 5));
//   // Value: [9, [6, null]]
// We say that sums has the following type: sums: list of Number → list of Number




// sums_even(list(1, 2, 3, 4, 5));

const lst = list(1, 2, 3, 4, 5);

function sums(list) {
    function sums_odd(list) {
            function accumulate(op, initial, xs) { 
                return length(list)%2 === 1
                ? is_null(tail(xs))
                      ? initial + head(xs)
                      : op(head(xs), accumulate(op, initial, tail(tail(xs))))
                : is_null(xs)
                      ? initial
                      : op(head(xs), accumulate(op, initial, tail(tail(xs))));
                }
        return accumulate((x,y) => x+y, 0, list);
        }
    function sums_even(list) {
        function sums_odd(list) {
            function accumulate(op, initial, xs) { 
                return length(list)%2 === 1
                ? is_null(tail(xs))
                      ? initial + head(xs)
                      : op(head(xs), accumulate(op, initial, tail(tail(xs))))
                : is_null(xs)
                      ? initial
                      : op(head(xs), accumulate(op, initial, tail(tail(xs))));
                }
        return accumulate((x,y) => x+y, 0, list);
        } 
    return sums_odd(tail(list));
    } 
    return pair(sums_odd(lst), pair(sums_even(lst),null));
}

sums(lst);