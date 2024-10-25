/*
Studio 8 corrections / notes

Declaration (const / let) will return undefined because it will always
end with a "pop"

L7 (print) slide 53
assignment variable will return the value 
if that is the last statement of the program

Else an assignment statement will have a corresponding pop
thats why assignment statements can be chained / considered as
value producing
(L7 print page 54)


While loop (L7 print page 58)
For loop (L7 print page 60)
*/
const c = 1; // 1 assign 1 pop
let x = c + 2; // 1 assign 1 pop
const d = c + x; // 1 assign 1 pop
let y = 3; // 1 assign 1 pop
x = c; // 1 assign 1 pop
y = d; // 1 assign no pop


/*
Studio 9 recap

When to create frames?
- Evaluating program (program env)
- Evaluating function arguments
  - New frame points to frame where the function is binded
- Evaluating function body
  - New frame points to frame of its arguments / the frame where function
    is binded (if the frame with arguments does not exist)

 *** If the frame has no bindings, the frame is omitted

Summary slides:
L8 print page 15 (Evaluating blocks)
L8 print page 45,46,49,50 (Evaluating functions)
*/


// Q2
const xs = list(2,1,2,3,4,5,6,7,8,9,10, 0);

display_list(xs);

function d_filter(pred, xs) {
    if (is_null(xs)) {
        return xs;
    } else if (pred(head(xs))) {
        set_tail(xs, d_filter(pred, tail(xs)));
        return xs;
    } else {
        return d_filter(pred, tail(xs));
    }
}


display("After d_filter:");
display_list(d_filter(x => x % 2 === 0, xs));


const p = pair(1, 2);
const zs = pair(p, p); // return 2
const ys = pair(1, 1); // should only return 1
set_tail(ys, ys);
// In-class solution
function count_pairs(xs) {
    let m = null;
    
    // member + helper function
    function checker(xs) {
        if (is_pair(xs) && is_null(member(xs, m))) {
            m = pair(xs, m);
            checker(head(xs));
            checker(tail(xs));
        } else {}
    }
    checker(xs);
    return length(m);
}

count_pairs(ys);
