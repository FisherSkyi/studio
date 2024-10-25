/**
 * Recap: L9
 * Searching & Sorting II, Memoization
 * 
 * Searching:
 * Linear search vs Binary search (Which is better)
 * 
 * Linear: Can be on unsorted list, O(N)
 * 
 * Binary: is faster but only sorted list O(lg(N))
 * 
 * 
 * Sorting:
 * 
 * Selection sort
 *      (sorted)(unsorted)
 *      Time complexity: O(N^2)
 *      # of swap: O(N)
 *      Find the smallest, put at the end of the new array
 * 
 * Insertion sort
 *      [1,2,3,4,10]
 *      (sorted)(unsorted)
 *      Take the first element of unsorted portion, find the position it belongs
 *      to in the sorted portion
 * 
 * Bubble sort (Studio Sheet 10, Q2)
 *      (unsorted)(sorted)
 * 
 * 
 * Merge sort
 *      (sorted 1)(sorted 2)(sorted 3)...(sorted N)
 *      Split the list into 2 and merge sort the sub lists
 *      then merge the 2 sub lists once they are sorted.
 */



/**
 * Memoization
 * 
 * Are these 2 functions examples of memoization? Why?
 */
function mfib1(n) { // No
    const mem = []; // ineffective memoization
    if(mem[n] !== undefined) {
        return mem[n];
    } else {
        const res = n < 2 ? n : mfib1(n - 1) + mfib1(n - 2);
        mem[n] = res;
        return res;
    }
}

function mfib2(n) { // Yes
    const mem = [];
    function fib(k) {
        if (mem[k] !== undefined) {
            return mem[k];
        } else {
            const res = k < 2 ? k : fib(k - 1) + fib(k - 2);
            mem[k] = res;
            return res;
        }
    }
    return fib(n);
}

/**
 * Streams
 * 
 * A stream is either the empty list, or a pair whose tail is a nullary
 * function that returns a stream
 */

//Are the following streams?

const ones = pair(1, () => ones); //Yes
//eval_stream(ones, 3);

const two_a = () => pair(2, two_a); //No
//eval_stream(two_a, 3);

const two = pair(2, () => two); //Y
//eval_stream(two, 3);

const twos = pair(2, two_a); //Y
//eval_stream(twos, 4);

function nuul() {
    return pair(null, () => nuuul);
}

const nuuul = pair(null, nuul); // Y
//eval_stream(nuuul, 5);

const p = pair(123, () => null);

is_stream(p); //Works for terminating streams

// doesnt work for infinite stream

//eval_stream(pair(3,null), 1);



// Studio Sheet 10:

// Q1 PM me on telegram

// Q2 Bubblesort_list (Without set_tail --> use ??)

function bubblesort_list(L) { //Dexter's solution
    
    const bubble = xs => {
        // if end of list without swaps, list is sorted. return true
        // Indicate if it is the end of sorting, stop and return
        if (is_null(xs) || is_null(tail(xs))){
            return true;
        } else {
            // compare element with next element,
            // if curr > next, set_head as next, set_head(tail) as curr, return false
            if (head(xs) > head(tail(xs))) {
                const tmp = head(xs);
                set_head(xs, head(tail(xs)));
                set_head(tail(xs), tmp);
                bubble(tail(xs));
                return false;
            } else {
                // else move on to next pair
                return bubble(tail(xs));
            }
        }
    };
    // loop until sorted
    return bubble(L) ? true : bubblesort_list(L);
}

function bubblesort_list_model(L) {
    const len = length(L);
    for (let i = len - 1; i >= 1; i = i - 1) {
        let p = L;
        for (let j = 0; j < i; j = j + 1) {
            if (head(p) > head(tail(p))) {
                const temp = head(p);
                set_head(p, head(tail(p)));
                set_head(tail(p), temp);
            }
            p = tail(p);
        }
    }
}


const LL = list(3,5,2,5,1);
display("Before:");
display_list(LL);
bubblesort_list(LL);
display("After:");
display_list(LL);

// Q3 Memoized cc

const mem = [];

function read(n, k) {
    return mem[n] === undefined
           ? undefined
           : mem[n][k];
}

function write(n, k, value) {
    if (mem[n] === undefined) {
        mem[n] = [];
    }
    mem[n][k] = value;
}

function first_denomination(kinds_of_coins) {
    return kinds_of_coins === 1 ?   5 :
           kinds_of_coins === 2 ?  10 :
           kinds_of_coins === 3 ?  20 :
           kinds_of_coins === 4 ?  50 :
           kinds_of_coins === 5 ? 100 : 0;
}

// The non-memoized version.
function cc(amount, kinds_of_coins) {
    return amount === 0
           ? 1
           : amount < 0 || kinds_of_coins === 0
           ? 0
           : cc(amount, kinds_of_coins - 1)
             +
             cc(amount - first_denomination(kinds_of_coins),
                kinds_of_coins);
}

// The memoized version.
// n is the amount in cents, and k is the number of denominations.
function mcc(n, k) {
    if (n >= 0 && k >=0 && read(n, k) !== undefined) {
        return read(n, k);
    } else {
        const result = n === 0 ? 1
                            : n < 0 || k === 0 ? 0
                            : mcc(n, k - 1) + mcc(n - first_denomination(k), k);
        if (n >= 0 && k >= 0) {
            write(n, k, result);
        }
        return result;
    }
}

mcc(365, 5);


// In class sheet

function rotate_matrix(M) {
    const n = array_length(M); // M is assumed n x n.
    function swap(r1, c1, r2, c2) {
        const temp = M[r1][c1];
        M[r1][c1] = M[r2][c2];
        M[r2][c2] = temp;
    }
    // Do a matrix transpose first.
    for (let r = 0; r < n; r = r + 1) {
        for (let c = r + 1; c < n; c = c + 1) {
            swap(r, c, c, r);
        }
    }
    // Then reverse each row.
    const half_n = math_floor(n / 2);
    for (let r = 0; r < n; r = r + 1) {
        for (let c = 0; c < half_n; c = c + 1) {
            swap(r, c, r, n - c - 1);
        }
    }
}


const mat = [[1,2,3,4],
             [5,6,7,8],
             [9,10,11,12],
             [13,14,15,16]];
             
rotate_matrix(mat);
mat;