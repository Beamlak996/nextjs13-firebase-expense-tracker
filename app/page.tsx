"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {
  collection,
  addDoc,
  query,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "./firebase";

export default function Home() {
  const [items, setItems] = useState<Record<string, string>[]>([]);

  const [newItem, setNewItem] = useState({ name: "", price: "" });

  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false)

  const addItem = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true)
      if (newItem.name !== "" && newItem.price !== "") {
        // setItems([...items, newItem])
        await addDoc(collection(db, "items"), {
          name: newItem.name.trim(),
          price: newItem.price,
        });
        setNewItem({ name: "", price: "" });
      }
    } catch (error) {
      setIsLoading(true)
      console.log("Error on add item", error)
    } finally{
      setIsLoading(false)
    }
    
  };

  const deleteItem = async (id: string) => {
    try {
      setIsLoading(true)
      await deleteDoc(doc(db, "items", id));
    } catch (error) {
      setIsLoading(true)
      console.log("Error on delete item", error)
    } finally {
      setIsLoading(false)
    }
    
  };

  useEffect(() => {
    const itemsQuery = query(collection(db, "items"));
    const unsubscribe = onSnapshot(itemsQuery, (querySnapShot) => {
      let itemArr: Record<string, string>[] = [];
      querySnapShot.forEach((doc) => {
        itemArr.push({ ...doc.data(), id: doc.id });
      });
      setItems(itemArr);

      const calculateTotal = () => {
        const totalPrice = itemArr.reduce(
          (sum, item) => (sum += parseFloat(item.price)),
          0
        );
        setTotal(totalPrice);
      };
      calculateTotal();
      return () => unsubscribe();
    });
  }, []);

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
              value={newItem.name}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setNewItem({ ...newItem, name: e.target.value })
              }
            />
            <input
              className="col-span-2 p-3 border mx-3"
              type="text"
              placeholder="Enter $"
              value={newItem.price}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setNewItem({ ...newItem, price: e.target.value })
              }
            />
            <button
              onClick={addItem}
              type="submit"
              className={`text-white bg-slate-950 hover:bg-slate-900 p-3 text-xl ${isLoading && "cursor-not-allowed opacity-75"}`}
              disabled={isLoading}
            >
              X
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
                <button
                  onClick={() => deleteItem(item.id)}
                  className="ml-8 p-4 border-l-2 border-slate-900 hover:bg-slate-900 w-16"
                  disabled={isLoading}
                >
                  X
                </button>
              </li>
            ))}
          </ul>
          {items.length < 1 ? (
            ""
          ) : (
            <div className="w-full text-end text-white px-2 space-x-4">
              <span>Total</span>
              <span>${total}</span>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
