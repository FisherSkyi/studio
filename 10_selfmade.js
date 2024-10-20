// function linear_search(A, v) {
//     const len = array_length(A);
//     let i = 0;
//     while (i < len && A[i] !== v) {
//         i = i + 1;
//     }
//     return (i < len);
// }

// // O(n)

// function make_search(A) {
//     return x => linear_search(A, x);
// }

const my_array = [3,41,20,1,5,16,4,0,14,6,17,8,4,0,2];
// const my_search = make_search(my_array);

// my_search(14); // returns true
// many more calls to my_search
// ...
// my_search(30); // returns false



function make_optimized_search(A) {
    let mem = [];
    function linear_search(A, v) {
        if (mem[v] !== undefined) {
            return true;
        } else {
            const len = array_length(A);
            let i = 0;
            while (i < len && A[i] !== v) {
                i = i + 1;
            }
            mem[v] = i;
            return (i < len);
        }
    }
    return x => linear_search(A, x);
}


make_optimized_search(my_array)(14);
make_optimized_search(my_array)(30);
// my_search(30);