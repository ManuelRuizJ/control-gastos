function Summary({ expenses }) {
  const total = expenses.reduce(
    (sum, expense) => sum + parseFloat(expense.amount),
    0
  );

  const categories = {};
  expenses.forEach((expense) => {
    if (categories[expense.category]) {
      categories[expense.category] += parseFloat(expense.amount);
    } else {
      categories[expense.category] = parseFloat(expense.amount);
    }
  });

  return (
    <div className="mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-blue-900 mb-4">Resumen</h2>
      <p className="text-xl text-blue-600 font-semibold mb-4">
        Total de gastos: ${total.toFixed(2)}
      </p>
      <ul className="space-y-2">
        {Object.keys(categories).map((category) => (
          <li
            key={category}
            className="flex justify-between text-lg text-gray-700"
          >
            <span>{category}</span>
            <span className="text-orange-500 font-semibold">
              ${categories[category].toFixed(2)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Summary;
