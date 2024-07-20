import React from "react";

const sportsData = [
  {
    id: 1,
    category: "Football",
    popularity: 45,
    color: "bg-blue-500",
    barColor: "bg-blue-600",
  },
  {
    id: 2,
    category: "Badminton",
    popularity: 18,
    color: "bg-green-500",
    barColor: "bg-green-600",
  },
  {
    id: 3,
    category: "Volleyball",
    popularity: 29,
    color: "bg-purple-500",
    barColor: "bg-purple-600",
  },
  {
    id: 4,
    category: "Basketball",
    popularity: 25,
    color: "bg-orange-500",
    barColor: "bg-orange-600",
  },
];

export default function StaticChart() {
  return (
    <>
      <div className="container mx-auto">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6">Top Sports</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="text-left w-20 py-2">#</th>
                  <th className="text-left py-2">Sport Categories</th>
                  <th className="text-left py-2">Popularity</th>
                  <th className="text-left py-2 pl-10">Total</th>
                </tr>
              </thead>
              <tbody>
                {sportsData.map((sport, index) => (
                  <tr key={sport.id} className="border-t">
                    <td className="py-2">
                      {String(index + 1).padStart(2, "0")}
                    </td>
                    <td className="py-2">{sport.category}</td>
                    <td className="py-2">
                      <div className="relative w-full h-4 rounded-full bg-gray-200">
                        <div
                          className={`absolute top-0 h-4 rounded-full ${sport.color}`}
                          style={{ width: `${sport.popularity}%` }}
                        ></div>
                      </div>
                    </td>
                    <td className="py-2 pl-10">
                      <div
                        className={`text-center py-1 rounded-full text-white ${sport.barColor}`}
                        style={{ width: "4rem" }}
                      >
                        {sport.popularity}%
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
