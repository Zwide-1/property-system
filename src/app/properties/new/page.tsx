import PropertyForm from "@/components/PropertyForm";

export default function NewPropertyPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Add Property</h1>
      <PropertyForm />
    </div>
  );
}