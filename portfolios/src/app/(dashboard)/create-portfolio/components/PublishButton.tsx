"use client";

import { useRouter } from "next/navigation";
import { ReadonlyFormProps } from "../types";

export default function PublishButton({ formData }: ReadonlyFormProps) {
  const router = useRouter();

  const handlePublish = async () => {
    try {
      const res = await fetch("/api/portfolio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // assuming you store JWT in localStorage
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to publish");

      const data = await res.json();
      router.push(`/${data.username}`);
    } catch (err) {
      console.error(err);
      alert("Something went wrong while publishing.");
    }
  };

  return (
    <button
      onClick={handlePublish}
      className="w-full px-4 py-2 bg-green-600 text-white rounded text-lg"
    >
      Publish Portfolio
    </button>
  );
}
