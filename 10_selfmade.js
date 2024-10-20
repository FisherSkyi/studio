// // function linear_search(A, v) {
// //     const len = array_length(A);
// //     let i = 0;
// //     while (i < len && A[i] !== v) {
// //         i = i + 1;
// //     }
// //     return (i < len);
// // }

// // // O(n)

// // function make_search(A) {
// //     return x => linear_search(A, x);
// // }

// const my_array = [3,41,20,1,5,16,4,0,14,6,17,8,4,0,2];
// // const my_search = make_search(my_array);

// // my_search(14); // returns true
// // many more calls to my_search
// // ...
// // my_search(30); // returns false



// function make_optimized_search(A) {
//     let mem = [];
//     function linear_search(A, v) {
//         if (mem[v] !== undefined) {
//             return true;
//         } else {
//             const len = array_length(A);
//             let i = 0;
//             while (i < len && A[i] !== v) {
//                 i = i + 1;
//             }
//             mem[v] = i;
//             return (i < len);
//         }
//     }
//     return x => linear_search(A, x);
// }


// make_optimized_search(my_array)(14);
// make_optimized_search(my_array)(30);
// // my_search(30);





// function bubblesort_array(A) {
//     const len = array_length(A);
//     for (let i = len - 1; i >= 1; i = i - 1) {
//         for (let j = 0; j < i; j = j + 1) {
//             if (A[j] > A[j + 1]) {
//                 const temp = A[j];
//                 A[j] = A[j + 1];
//                 A[j + 1] = temp;
//             }
//         }
//     }
// }

// const AA = [3, 5, 2, 4, 1];
// bubblesort_array(AA);
// AA;


// (a) O(n^2)


// b

// function bubblesort_list(L) {
//     function get_element_n(n, xs) {
//         return n === 1 ? head(xs) : get_element_n(n-1, tail(xs));
//     }
//     function get_list_n(n, xs) {
//         return n === 1 ? xs : get_list_n(n-1, tail(xs));
//     }
//     const len = length(L);
//     for (let i = len; i >= 1; i = i - 1) {
//         for (let j = 1; j < i; j = j + 1) {
//             if (get_element_n(j, L) > get_element_n(j+1, L)) {
//                 const temp = get_element_n(j, L);
//                 set_head(get_list_n(j, L), get_element_n(j+1, L));
//                 set_head(get_list_n(j+1, L), temp);
//             }
//         }
//     }
// }

// const LL = list(3, 5, 2, 4, 1);
// bubblesort_list(LL);
// LL; // should show [1, [2, [3, [4, [5, null]]]]]

//3

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

function mchoose(n, k) {
    if (read(n, k) !== undefined) {
        return read(n, k);
    } else {
        const result = k > n
                       ? 0
                       : k === 0 || k === n
                       ? 1
                       : mchoose(n - 1, k) + mchoose(n - 1, k - 1);
        write(n, k, result);
        return result;
    }
}

mchoose(7, 4);




