Answer: State and props work together in this application to manage user input and control the rendering of components. The FilterableProductTable component maintains the state, while the SearchBar and ProductTable components receive props to reflect the current state and respond to user interactions

State: In the FilterableProductTable, two pieces of state are defined using useState:
filterText: Holds the current search input.
inStockOnly: A boolean indicating whether to show only in-stock products.
These states are updated through setFilterText and setInStockOnly, which are passed to the SearchBar component as props.

Props: The App component passes the PRODUCTS array to FilterableProductTable as a prop.
The FilterableProductTable passes filterText, inStockOnly, and their corresponding update functions to the SearchBar.
The ProductTable receives products, filterText, and inStockOnly to filter and display the appropriate products.