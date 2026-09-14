import ReservationForm from "@/components/reservation/ReservationForm";

export default function ReservationPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Reserve a Table</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Book your table for a memorable dining experience. We&apos;ll confirm your reservation shortly.
        </p>
      </div>

      <div className="card p-8">
        <ReservationForm />
      </div>
    </div>
  );
}
