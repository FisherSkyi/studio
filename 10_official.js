/*

Studio 10 Recap:

Types of Searching:

1. Linear Search (look at every single element to find what we want)


2. Binary Search
    - Only applicable if the given search area is sorted
    - Use known information such as Lowest at the Left and Highest at the Right
      To reduce search space by a proportion everytime
      

Sorting:

1. Quicksort (mission)
2. Selection sort (lecture)
    - Loop through to find the smallest put at the front
    - OR; Loop through to find the largest, put at the end
3. Insertion sort (lecture)
    - https://www.geeksforgeeks.org/insertion-sort/
    - The front sub-array is always sorted
4. Merge sort (lecture)
    - Divide and conquer
        - Divide recursively until the smallest pieces
        - Combine the pieces and ordering them bit by bit
5. Bubble sort (Studio today)[Similar: somewhat opposite of insertion sort]
    - https://www.geeksforgeeks.org/bubble-sort/
    - The end sub-array is always sorted

Resource: https://www.geeksforgeeks.org/time-complexities-of-all-sorting-algorithms/

Memoisation:

Save your result somewhere (usually arrays) to avoid re-calculation
    -  Trade space for time
*/

// Studio sheet contents

const arr = [9,8,7,6,5,4,3,2,1];
function bubblesort_array(A) {
    const len = array_length(A);
    for (let i = len - 1; i >= 1; i = i - 1) {
        for (let j = 0; j < i; j = j + 1) {
            if (A[j] > A[j + 1]) {
                const temp = A[j];
                A[j] = A[j + 1];
                A[j + 1] = temp;
            }
        }
    }
}
bubblesort_array(arr);
display(arr);
const ls = list(9,8,7,6,5,4,3,2,1);

function bubblesort_list(xs) {
    const len = length(xs);
    for (let i = len - 1; i >= 1; i = i - 1) {
        let curr = xs;
        for (let j = 0; j < i; j = j + 1) {
            const temp = head(curr);
            if (temp > head(tail(curr))) {
                set_head(curr, head(tail(curr)));
                set_head(tail(curr), temp);
            }
            curr = tail(curr);
        }
    }
}

function bubblesort_list2(xs) {
    for (let i = xs; !is_null(i); i = tail(i)) {
        let curr = xs;
        for (let j = 0; j < length(i) - 1; j = j + 1) {
            const temp = head(curr);
            if (temp > head(tail(curr))) {
                set_head(curr, head(tail(curr)));
                set_head(tail(curr), temp);
            }
            curr = tail(curr);
        }
    }
}
// Additional challenge: Write insertion sort using similar idea as bubblesort?
// I am not sure if it works :D, but please try it out 👍
bubblesort_list(ls);
display_list(ls);
const ls2 = list(10,9,8,7,6,5,4,3,2,1,0);
bubblesort_list2(ls2);
display_list(ls2);

//Q3
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
    if (read(n,k) !== undefined) {
        return read(n,k);
    } else {
        const ans = n === 0 ? 1
                            : n - first_denomination(k) < 0 
                            ? mcc(n, k - 1) 
                            : n < 0 || k === 0 ? 0
                            : mcc(n, k - 1) + mcc(n - first_denomination(k), k);
        write(n, k, ans);
        return ans;
    }
}

function mcc2(n, k) {
    if (n >= 0 && k >= 0 && read(n,k) !== undefined) {
        return read(n,k);
    } else {
        const ans = n === 0 ? 1
                            : n < 0 || k === 0 ? 0
                            : mcc(n, k - 1) + mcc(n - first_denomination(k), k);
        if (n >= 0 && k >= 0) {
            write(n, k, ans);
        }
        return ans;
    }
}

function mcc3(n, k) {
    if (n < 0 || k === 0) {
        return 0;
    } else if (read(n,k) !== undefined) {
        return read(n,k);
    } else {
        const ans = n === 0 ? 1
                            : mcc(n, k - 1) + mcc(n - first_denomination(k), k);
        write(n, k, ans);
        return ans;
    }
}

mcc(365, 5);  // Expected result: 1730
mcc2(365, 5);
mcc3(365, 5);

const my_matrix = [[1,2,3,4],
                   [5,6,7,8],
                   [9,10,11,12],
                   [13,14,15,16]
                  ];
function transpose(M) {
    for(let i = 0; i < array_length(M); i = i + 1) {
        for (let j = i; j < array_length(M[0]); j = j + 1) {
            const temp = M[i][j];
            M[i][j] = M[j][i];
            M[j][i] = temp;
        }
    }
}
function reverse_array(A) {
    const len = array_length(A);
    const half_len = math_floor(len / 2);
    let i = 0;
    while (i < half_len) {
        const j = len - 1 - i;
        const temp = A[j];
        A[j] = A[i];
        A[i] = temp;
        i = i + 1;
    }
}
function rotate_matrix(M) {
    transpose(M);
    for (let i = 0; i < array_length(M); i = i + 1) {
        reverse_array(M[i]);
    }
}
// rotate_matrix(my_matrix);
rotate_matrix(my_matrix);
display(my_matrix);

