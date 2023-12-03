"use client"

import { useState } from "react";

export default function Home() {

  const [items, setItems] = useState([
    { name: "Coffee", price: 12 },
    { name: "Bread", price: 15 },
    { name: "Banana", price: 29 },
  ])

  const [total, setTotal] = useState(0)

  return (
    <main className="flex min-h-screen flex-col items-center justify-between sm:p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex flex-col">
        <h1 className="text-4xl p-4 text-center">Expense Tracker</h1>
        <div className="bg-slate-800 p-4 rounded-lg">
          <form className="grid grid-cols-6 items-center text-black">
            <input
              className="col-span-3 p-3 border"
              type="text"
              placeholder="Enter item"
            />
            <input
              className="col-span-2 p-3 border mx-3"
              type="number"
              placeholder="Enter $"
            />
            <button
              type="submit"
              className="text-white bg-slate-950 hover:bg-slate-900 p-3 text-xl"
            >
              +
            </button>
          </form>
          <ul>
            {items.map((item, id) => (
              <li
                key={id}
                className="my-4 w-full flex justify-between bg-slate-950 text-white"
              >
                <div className="p-4 w-full flex justify-between">
                  <span className="capitalize">{item.name}</span>
                  <span className="ml-auto">${item.price}</span>
                </div>
                <button className="ml-8 p-4 border-l-2 border-slate-900 hover:bg-slate-900 w-16">
                  X
                </button>
              </li>
            ))}
          </ul>
          {
            items.length < 1 ? (''): (
              <div className="w-full text-end text-white px-2 space-x-4" >
                <span>Total</span>
                <span>${total}</span>
              </div>
            )
          }
        </div>
      </div>
    </main>
  );
}
