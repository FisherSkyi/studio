//Studio sheet

// Q1
function my_map(f, xs) {
    // ???
    return accumulate((x, y) => pair(f(x), y), null, xs);
    
}

//Q2
function remove_duplicates_with_filter(lst) {
    // ???
    function is_member(val,list){
        return is_null(list) ? false 
                : val===head(list) || is_member(val,tail(list));
    }

    function iter_list(list2,filtered){
        const filter_list2 = filter(x => !is_member(x,filtered), list2);
        return is_null(filter_list2) 
                ? filtered 
                : iter_list(tail(filter_list2), 
                pair(head(filter_list2),filtered));
    }
    
    return iter_list(lst,null);
}

//display_list(remove_duplicates_with_filter(list(1,2,3,4,3,2,1,2)));

function remove_duplicates_with_filter_v2(lst) {
    return is_null(lst)
           ? null
           : pair(head(lst),
                  remove_duplicates_with_filter_v2(
                      filter(x => x !== head(lst), 
                            tail(lst))
                      )
                );
}

//display_list(remove_duplicates_with_filter_v2(list(1,2,3,4,3,2,1,2)));

// //Q3
function makeup_amount(x, coins) {
    if (x === 0) {
        return list(list());
    } else if (x < 0 || is_null(coins)) {
        return list();
    } else {
        // Combinations that do not use the head coin.
        const combi_A = makeup_amount(x, tail(coins));
        // Combinations that do not use the head coin
        // for the remaining amount.
        const combi_B = makeup_amount(x - head(coins), tail(coins));
        // Combinations that use the head coin.
        const combi_C = map(xs => pair(head(coins), xs), combi_B);
        return append(combi_A, combi_C);
    }
}

display_list(makeup_amount(22, list(1, 10, 5, 20, 1, 5, 1, 50)));


//in-class
function remove_duplicates_with_accumulate(lst) {
    // Hint: look at the "member" function provided
    return accumulate(
        (x,  ys) => is_null(member(x, ys)) 
                    ? pair(x, ys)
                    : ys, 
        null, 
    lst);
}

function subsets(xs) {
    if (is_null(xs)) {
        return list(list());
    } else {
        // subsets without head element
        const combi_a = subsets(tail(xs));
        const combi_b = map(ys => pair(head(xs), ys), combi_a);
        return append(combi_a, combi_b);
    }
}

display_list(subsets(list(1, 2, 3)));
// Result: list(list(),
//             list(1), list(2), list(3),
//             list(1,2), list(1,3), list(2,3),
//             list(1,2,3))


function permutations(xs) {
    if (is_null(xs)) {
        return list(list());
    } else {
        // for each element in xs
        const ls = map(v => {
            // remove current element
            const without_ele = permutations(remove(v, xs));
            // put it back in
            const with_ele = map(sublist => pair(v, sublist), without_ele);
            return with_ele;
        }
        , xs);
            
        return accumulate(append, null, ls);
    }
}

display_list(permutations(list(1, 2, 3)));
// Result: list(list(1,2,3), list(1,3,2),
//          list(2,1,3), list(2,3,1),
//          list(3,1,2), list(3,2,1))
