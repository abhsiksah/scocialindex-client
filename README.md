# Changes we need to do for re-designing this application (only client side)



## We need to do the following:


## Phase 1:


###  1. Use Custom Hooks to remove useEffect and varibales calculated away from the main component 

###  2. Fragment the Ui into functions that will return JSX

###  3. use UseMemo() and useCallbacks() properly

###  4.. add a Global css Lib or any other technique which allows global theme control


bugs

###  please solve Ui broken bugs as well !!!




## Phase 2: (more backend intensive work)



###  4. we will implement react query to save the state in url as query. So that on refresh we dont loose our state.
we could have done that with local storage or redux persist as well but we will use this as this is used by all big techs 


###  5. we will migrate our project to Next.js and utilize  server side rendering techniques to take our developmennt even further as we will be using our next servers to make downstream api calls.






