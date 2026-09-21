export default function MapEmbed() {
  return (
    <div className="w-full rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800">
      <div className="relative w-full aspect-[4/3] sm:aspect-video">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3620.0!2d67.0!3d24.9!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sFederal+B+Area,+Karachi!5e0!3m2!1sen!2s!4v1"
          className="absolute inset-0 w-full h-full"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Restaurant Location"
        />
      </div>
    </div>
  );
}
