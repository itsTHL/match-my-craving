import Image from "next/image";
import FoodPref from "@/components/FoodPref";

export default function startsession() {
  return (
    <>
      <Image src="/salad.jpg" alt="photo of a salad" width="150" height="150" />
      {/* COUNTER components */}
      <FoodPref />
      <button>Start the Session!</button>
    </>
  );
}
