import { useState } from "react";

export default function App() {
  const [description, setDescription] = useState("");

  const [quantity, setQuantity] = useState(1);

  const [items, setItems] = useState([]);

  function handleAddNewItemToArray(item) {
    setItems((items) => [...items, item]);
  }
  const allItemsCount = items.length;

  const packedItems = items.filter((item) => item.packed);

  const packedItemsCount = packedItems.length;

  return (
    <div className="app">
      <Logo />
      <Form
        items={items}
        setItems={setItems}
        addNewArr={handleAddNewItemToArray}
        description={description}
        setDescription={setDescription}
        quantity={quantity}
        setQuantity={setQuantity}
      />
      <PackingList items={items} setItems={setItems} />
      <Stats
        allItemsCount={allItemsCount}
        packedItemsCount={packedItemsCount}
      />
    </div>
  );
}

function Logo() {
  return <h1>Far Away</h1>;
}

function Form({
  addNewArr,
  description,
  setDescription,
  quantity,
  setQuantity,
  items,
  setItems,
}) {
  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newItem = {
      id: Date.now(),
      description: description,
      quantity: quantity,
      packed: false,
    };

    addNewArr(newItem);
    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </select>
      <input
        value={description}
        type="text"
        placeholder="Item..."
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
      <span className="clear" onClick={() => setItems([])}>
        Clear
      </span>
    </form>
  );
}

function PackingList({ items, setItems }) {
  function togglePacked(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function removeItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            key={item.id}
            item={item}
            removeItem={removeItem}
            togglePacked={togglePacked}
          />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, togglePacked, removeItem }) {
  return (
    <li style={{ cursor: "pointer" }}>
      <span
        onClick={() => togglePacked(item.id)}
        style={item.packed ? { textDecoration: "line-through" } : {}}
      >
        {item.quantity} {item.description}
      </span>{" "}
      <button onClick={() => removeItem(item.id)}>❌</button>
    </li>
  );
}

function Stats({ allItemsCount, packedItemsCount }) {
  const packedPercentage =
    packedItemsCount === 0
      ? 0
      : Math.ceil((packedItemsCount / allItemsCount) * 100);
  return (
    <footer className="stats">
      <em>
        You have {allItemsCount} items on your list,and you alreasy packed{" "}
        {packedItemsCount} ({packedPercentage}%)
      </em>
    </footer>
  );
}
