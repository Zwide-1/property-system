interface FooterProps {
  settings: any;
}

export default function Footer({
  settings
}: FooterProps) {
  return (
    <footer className="mt-10 border-t pt-6 text-white">
      <h3>{settings.company_name}</h3>

      <p>{settings.contact_email}</p>

      <p>{settings.contact_phone}</p>

      <p>{settings.address}</p>
    </footer>
  );
}