import { useState } from 'react';

// Main component that renders the filterable product table
function FilterableProductTable({ products }) {
  // State to hold the current filter text and in-stock-only checkbox status
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);

  return (
    <div>
      {/* Render the SearchBar component, passing necessary props */}
      <SearchBar 
        filterText={filterText} 
        inStockOnly={inStockOnly} 
        onFilterTextChange={setFilterText} 
        onInStockOnlyChange={setInStockOnly} />
      
      {/* Render the ProductTable component, passing the filtered products */}
      <ProductTable 
        products={products} 
        filterText={filterText}
        inStockOnly={inStockOnly} />
    </div>
  );
}

// Component to display the category of products
function ProductCategoryRow({ category }) {
  return (
    <tr>
      <th colSpan="2">
        {category}
      </th>
    </tr>
  );
}

// Component to display a single product row
function ProductRow({ product }) {
  // If the product is not in stock, display its name in red
  const name = product.stocked ? product.name :
    <span style={{ color: 'red' }}>
      {product.name}
    </span>;

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

// Component to display the table of products
function ProductTable({ products, filterText, inStockOnly }) {
  const rows = []; // Array to hold the rows of the table
  let lastCategory = null; // Variable to track the last category displayed

  // Iterate over the products to filter and organize them into rows
  products.forEach((product) => {
    // Check if the product name matches the filter text
    if (
      product.name.toLowerCase().indexOf(
        filterText.toLowerCase()
      ) === -1
    ) {
      return; // Skip this product if it doesn't match
    }
    // Check if we only want in-stock products
    if (inStockOnly && !product.stocked) {
      return; // Skip this product if it's not in stock
    }
    // If the product's category is different from the last one, add a category row
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category} />
      );
    }
    // Add the product row to the rows array
    rows.push(
      <ProductRow
        product={product}
        key={product.name} />
    );
    lastCategory = product.category; // Update the last category
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody> {/* Render the rows in the table body */}
    </table>
  );
}

// Component for the search bar and filter options
function SearchBar({
  filterText,
  inStockOnly,
  onFilterTextChange,
  onInStockOnlyChange
}) {
  return (
    <form>
      {/* Input field for the search text */}
      <input 
        type="text" 
        value={filterText} 
        placeholder="Search..." 
        onChange={(e) => onFilterTextChange(e.target.value)} />
      
      {/* Checkbox for filtering in-stock products */}
      <label>
        <input 
          type="checkbox" 
          checked={inStockOnly} 
          onChange={(e) => onInStockOnlyChange(e.target.checked)} />
        {' '}
        Only show products in stock
      </label>
    </form>
  );
}

// Sample product data
const PRODUCTS = [
  {category: "Fruits", price: "$1", stocked: true, name: "Apple"},
  {category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit"},
  {category: "Fruits", price: "$2", stocked: false, name: "Passionfruit"},
  {category: "Vegetables", price: "$2", stocked: true, name: "Spinach"},
  {category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin"},
  {category: "Vegetables", price: "$1", stocked: true, name: "Peas"}
];

// Main App component that renders the FilterableProductTable with products
export default function App() {
  return <FilterableProductTable products={PRODUCTS} />;
}