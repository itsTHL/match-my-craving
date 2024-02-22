import Image from "next/image";
import FoodPref from "@/components/FoodPref";
import Counter from "@/components/Counter";

export default function startsession() {
  return (
    <>
      <Image src="/salad.jpg" alt="photo of a salad" width="150" height="150" />
      <Counter />
      <FoodPref />
      <button>Start the Session!</button>
    </>
  );
}
