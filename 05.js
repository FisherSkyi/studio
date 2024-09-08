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