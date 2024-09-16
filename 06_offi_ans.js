//Studio sheet

//Q1
function my_map(f, xs) {
    // Ahmad's solution
    return accumulate((x,y) => pair(f(x), y), null, xs);
}

//Q2
function remove_duplicates_with_filter(lst) {
    // Alice's solution
    function helper(xs) {
        return filter(x=> !equal(x, head(xs)), tail(xs));
    }
    return is_null(lst) ? null 
                        : pair(head(lst), remove_duplicates_with_filter(helper(lst)));
}


const x1 = list(1,1,1,1,1,1,1,1);
const x2 = list(list(1), list(1), list(1));
//remove_duplicates_with_filter(x2);

//Q3
function makeup_amount(x, coins) {
    if (x === 0) {
        return list(list());
    } else if (x < 0 || is_null(coins)) {
        return null;
    } else {
        // Combinations that do not use the head coin.
        const combi_A = makeup_amount(x, tail(coins));
        // Combinations that do not use the head coin
        // for the remaining amount.
        const combi_B = makeup_amount(x - head(coins), tail(coins)); // list(list) or list()
        // Combinations that use the head coin.
        const combi_C = map(ys => pair(head(coins), ys), combi_B); // list(pair(head(coins), null) equals list(list(head(coins)))
        return append(combi_A, combi_C);
    }
}


//display_list(makeup_amount(23, list(1,10,5,20,1,5,1,50,1)));

//in-class
function remove_duplicates_with_accumulate(lst) {
    // Hint: look at the "member" function provided
    return accumulate((x, ys) => is_null(member(x,ys)) ? pair(x,ys) : ys , null,lst);
}

function remove_duplicates_with_accumulate_fengming(lst) {
    // feng ming's solution
    function check(ele,lst1){
        if (is_null(member(ele, lst1))) {
            return list(ele);
        }
        else {
            return null;
        }
    }
    return accumulate((x,y)=>append(check(x,y),y),null,lst);
}

function remove_duplicates_with_accumulate_alice(lst) {
    // Alice's solution
    return accumulate((x, ys) => pair(x, remove(x,ys)), null, lst);
}

//remove_duplicates_with_accumulate(list(1,1,1,1,1,1,1,1));

function subsets(xs) {
    if (is_null(xs)) {
        return list(null);
    } else {
        const sub_result = subsets(tail(xs));
        const curr_result = map(ys => pair(head(xs), ys), sub_result);
        return append(curr_result, sub_result);
    }
}

//display_list(subsets(list(1, 2, 3)));
// Result: list(list(),
//             list(1), list(2), list(3),
//             list(1,2), list(1,3), list(2,3),
//             list(1,2,3))


function permutations(xs) {
    if (is_null(xs)) {
         return list(list());
    } else {
        function insert_helper(x, ys) {
            return pair(x, ys);
        }
        // for each item in the list
        // This map, added a layer of list because, for each element x, I am creating a list of list
        const result = map(x => 
            // insert ttem back to each list inside the list of list
            // We are not adding a layer of list here , 
            // we are just adding a layer of "pair" outside each list
            // which does not change the structure
            map(ys => insert_helper(x, ys),
                // permutate the remaining ==> list of list
                permutations(
                    // remove item
                    remove(x,xs)
                )
            ),
        xs);
        return accumulate(append,list(),result);
    }
}


display_list(permutations(list(1,2,3)));
// Result: list(list(1,2,3), list(1,3,2),
//          list(2,1,3), list(2,3,1),
//          list(3,1,2), list(3,2,1))
