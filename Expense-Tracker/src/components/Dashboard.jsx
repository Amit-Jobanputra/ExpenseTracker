const Dashboard = () => {
  const expenses = [
    { id: 1, name: "Groceries", amount: 150, date: "2024-07-01" },
    { id: 2, name: "Utilities", amount: 80, date: "2024-06-28" },
    { id: 3, name: "Dining Out", amount: 65, date: "2024-06-25" },
    { id: 4, name: "Transportation", amount: 40, date: "2024-06-20" },
  ];
  return (
    <>
      <div className="min-h-[calc(100vh-80px)] bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark p-4 sm:p-8">
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <h2 className="text-3xl font-bold text-center text-teal-600 dark:text-cyan-400 mb-8">
            Your Dashboard
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-blue-50 dark:bg-blue-900 p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">
                Total Spent This Month
              </h3>
              <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                ₹335
              </p>
            </div>
            <div className="bg-green-50 dark:bg-green-900 p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-2">
                Budget Remaining
              </h3>
              <p className="text-4xl font-bold text-green-600 dark:text-green-400">
                ₹665
              </p>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-teal-600 dark:text-cyan-400 mb-6">
            Recent Expenses
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden">
              <thead className="bg-gray-100 dark:bg-gray-600">
                <tr>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                    Item
                  </th>
                  <th className="py-3 px-4 text-right text-sm font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                {expenses.map((expense) => (
                  <tr
                    key={expense.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-150 ease-in-out"
                  >
                    <td className="py-3 px-4 whitespace-nowrap text-gray-800 dark:text-gray-200">
                      {expense.date}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap text-gray-800 dark:text-gray-200">
                      {expense.name}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap text-right text-gray-800 dark:text-gray-200">
                      ₹{expense.amount.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 text-center">
            <button className="py-3 px-6 bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-semibold rounded-md shadow-md hover:from-teal-700 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition duration-300 ease-in-out">
              Add New Expense
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Dashboard;
